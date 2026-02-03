import { ImageResponse, ImageResponseOptions } from "@takumi-rs/image-response";
import { NextRequest } from "next/server";
import { join } from "path";
import { readFile } from "fs/promises";
import sharp from "sharp";
import crypto from "crypto";
import { ModrinthAPI, ModrinthProject } from "../../../../lib/api/modrinth";
import DefaultVariant from "./variants/DefaultVariant";
import FullVariant from "./variants/FullVariant";
import CompactVariant from "./variants/CompactVariant";
import { truncate } from "../../../../lib/utils";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { searchParams } = new URL(request.url);
  const { projectId } = await params;
  const data = await ModrinthAPI.getProject(projectId);

  const variant = searchParams.get("variant") as "default" | "full" | "compact" || "default";
  const theme = searchParams.get("theme") as "dark" | "light" || "dark";
  const showDownloads = searchParams.get("showDownloads") !== "false";
  const showVersionParam = searchParams.get("showVersion");
  const showVersion =
    variant === "compact"
      ? showVersionParam === "true"
      : showVersionParam !== "false";
  const showButton = searchParams.get("showButton") !== "false";
  const showPadding = searchParams.get("showPadding") === "true";

  // ETag for cache revalidation: project data + query params
  const contentHash = crypto
    .createHash('md5')
    .update(JSON.stringify({
      project: {
        downloads: data?.downloads,
        title: data?.title,
        icon: data?.icon_url,
      },
      params: {
        variant,
        theme,
        showDownloads,
        showVersion,
        showButton,
        showPadding,
      }
    }))
    .digest('hex');

  const etag = `"${projectId}-${contentHash}"`;

  try {
    if (request.headers.get('if-none-match') === etag) {
      return new Response(null, {
        status: 304,
        headers: {
          'ETag': etag,
        },
      });
    }

    if (!data) {
      return new Response("Project not found", { 
        status: 404,
        headers: {
          "Cache-Control": "public, max-age=300, s-maxage=300",
          "ETag": etag,
        }
      });
    }

    const versions = showVersion
      ? await ModrinthAPI.getVersions(projectId)
      : [];
    const latestVersion = versions[0];

    const modName = data.title;
    const downloads = data.downloads.toString();
    const author = ModrinthAPI.getAuthor(data);

    // Convert WebP icons to PNG data URL for compatibility
    let iconUrl = data.icon_url || undefined;
    if (iconUrl?.toLowerCase().endsWith(".webp")) {
      const response = await fetch(iconUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch icon");
      }
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const pngBuffer = await sharp(buffer)
        .resize(280, 280, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer();

      iconUrl = `data:image/png;base64,${pngBuffer.toString("base64")}`;
    }

    const formattedDownloads = ModrinthAPI.formatNumber(parseInt(downloads, 10));
    // Cache duration could be derived from download count: ModrinthAPI.getCacheDuration(parseInt(downloads, 10))

    const generateCompactDimensions = (project: ModrinthProject) => {
      const height = 32;
      const fontSize = 15;
      const paddingX = 12;
      const iconSize = 20;
      const gap = 8;
      const textGap = 8;
      const avgCharWidth = fontSize * 0.65; // Slightly wider for bold

      const titleWidth = truncate(project.title, 20).length * avgCharWidth;
      const downloadsWidth = showDownloads
        ? ModrinthAPI.formatNumber(project.downloads).length * (fontSize * 0.55)
        : 0;
      const versionWidth =
        showVersion && latestVersion
          ? (`v${latestVersion.version_number}`).length * (fontSize * 0.55)
          : 0;

      let width = paddingX * 2 + titleWidth;

      if (project.icon_url) width += iconSize + gap;
      if (showDownloads) width += downloadsWidth + textGap;
      if (showVersion && latestVersion) width += versionWidth + textGap;

      return { width: Math.ceil(width), height };
    };

    const fullLayout = {
      paddingY: 56,
      gap: 24,
      headerHeight: 140,
      descriptionHeight: 80,
      statsHeight: 52,
      buttonHeight: 56,
      innerBorderWidth: 2,
      outerPaddingY: showPadding ? 48 : 0,
    };
    const fullInnerHeight =
      fullLayout.paddingY * 2 +
      fullLayout.headerHeight +
      fullLayout.descriptionHeight +
      fullLayout.statsHeight +
      fullLayout.gap * (showButton ? 3 : 2) +
      (showButton ? fullLayout.buttonHeight : 0) +
      fullLayout.innerBorderWidth * 2;
    const fullHeight = fullInnerHeight + fullLayout.outerPaddingY * 2;

    // Image dimensions per variant (full height is computed from layout)
    const compactDimensions = generateCompactDimensions(data);
    const OPTIONS: Record<string, ImageResponseOptions> = {
      default: { width: 680, height: 164 },
      full: { width: showPadding ? 936 : 840, height: fullHeight },
      compact: { width: compactDimensions.width, height: compactDimensions.height },
    };

    const getVariant = () => {
      switch (variant) {
        case "default":
          return (
            <DefaultVariant
              iconUrl={iconUrl}
              modName={modName}
              author={author}
              downloads={formattedDownloads}
              theme={theme}
            />
          );
        case "full":
          return (
            <FullVariant
              iconUrl={iconUrl}
              project={data}
              showPadding={showPadding}
              showDownloads={showDownloads}
              showVersion={showVersion}
              showButton={showButton}
              versionNumber={latestVersion?.version_number || ""}
            />
          );
        case "compact":
          return (
            <CompactVariant
              iconUrl={iconUrl}
              project={data}
              showDownloads={showDownloads}
              showVersion={showVersion}
              versionNumber={latestVersion?.version_number || ""}
              width={compactDimensions.width}
            />
          );
        default:
          return null;
      }
    };
    const component = getVariant();

    if (!component) {
      return new Response("Invalid variant", { status: 400 });
    }

    // Load Jost for badge text (used by all variants)
    const fontsDir = join(process.cwd(), "public/assets/fonts");
    const [jost400, jost700] = await Promise.all([
      readFile(join(fontsDir, "Jost-Regular.ttf")),
      readFile(join(fontsDir, "Jost-Bold.ttf")),
    ]);

    return new ImageResponse(component, {
      ...OPTIONS[variant],
      fonts: [
        {
          name: "Jost",
          data: jost400,
          weight: 400,
          style: "normal",
        },
        {
          name: "Jost",
          data: jost700,
          weight: 700,
          style: "normal",
        },
      ],
      headers: {
        "Cache-Control": `public, max-age=86400, s-maxage=86400, stale-while-revalidate=${86400 * 1.5}`,
        "ETag": etag,
        "Vary": "Accept, Accept-Encoding",
      },
    });
  } catch (error) {
    console.error("Error generating badge", error);
    return new Response(`Failed to generate badge: ${error}`, { 
      status: 500,
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=300",
        "ETag": etag,
      }
    });
  }
}
