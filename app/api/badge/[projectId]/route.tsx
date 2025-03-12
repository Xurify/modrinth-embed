import { ImageResponse } from "next/og";
import { ImageResponseOptions, NextRequest } from "next/server";
import { ModrinthAPI, ModrinthProject } from "../../../../lib/api/modrinth";
import sharp from "sharp";
import DefaultVariant from "./variants/DefaultVariant";
import FullVariant from "./variants/FullVariant";
import { CompactVariant } from "./variants/CompactVariant";
import { join } from "path";
import { readFile } from "fs/promises";
import fs from "fs";

//const jost400 = fs.readFileSync("./public/assets/fonts/Jost-Regular.ttf");

export const runtime = "nodejs";

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { searchParams } = new URL(request.url);
  const { projectId } = await params;

  try {
    const data = await ModrinthAPI.getProject(projectId);
    if (!data) {
      return new Response("Project not found", { status: 404 });
    }

    const variant =
      (searchParams.get("variant") as "default" | "full" | "compact") ||
      "default";
    const theme = (searchParams.get("theme") as "dark" | "light") || "dark";
    const showDownloads = searchParams.get("showDownloads") !== "false";
    const showVersion = searchParams.get("showVersion") !== "false";
    const showButton = searchParams.get("showButton") !== "false";
    const showPadding = searchParams.get("showPadding") === "true";

    const versions = showVersion
      ? await ModrinthAPI.getVersions(projectId)
      : [];
    const latestVersion = versions[0];

    const modName = data.title;
    const downloads = data.downloads.toString();
    const author = ModrinthAPI.getAuthor(data);

    let iconUrl = data.icon_url || undefined;
    if (iconUrl?.toLowerCase().endsWith(".webp")) {
      const response = await fetch(iconUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch icon");
      }
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const pngBuffer = await sharp(buffer).png().toBuffer();

      iconUrl = `data:image/png;base64,${pngBuffer.toString("base64")}`;
    }

    const formattedDownloads = ModrinthAPI.formatNumber(
      parseInt(downloads, 10)
    );
    const cacheDuration = ModrinthAPI.getCacheDuration(parseInt(downloads, 10));

    const headers = {
      "Cache-Control": `public, immutable, no-transform, max-age=${cacheDuration}`,
    };

    const generateCompactDimensions = (project: ModrinthProject) => {
      const height = 32;
      const fontSize = 14;
      const padding = 12;
      const iconSize = 24;
      let width = padding * 2 + project.title.length * (fontSize * 0.6);
      if (project.icon_url) width += iconSize + 8;
      if (showDownloads)
        width +=
          ModrinthAPI.formatNumber(project.downloads).length *
            (fontSize * 0.6) +
          16;
      if (showVersion && latestVersion)
        width += latestVersion.version_number.length * (fontSize * 0.6) + 24;

      return { width, height };
    };

    const OPTIONS: Record<string, ImageResponseOptions> = {
      default: {
        width: 680,
        height: 160,
        headers,
      },
      full: {
        width: showPadding ? 1200 : 900,
        height: showPadding ? 600 : 400,
        headers,
      },
      compact: {
        width: generateCompactDimensions(data).width,
        height: generateCompactDimensions(data).height,
        headers,
      },
    };

    const options = OPTIONS[variant];

    const colors = {
      light: {
        background: "#ffffff",
        background2: "#f9fafb",
        text: "#1f2937",
        secondaryText: "#585858",
        border: "#e5e7eb",
        button: "#10B981",
        buttonText: "#ffffff",
      },
      dark: {
        background: "#2D2D2D",
        background2: "#16181C",
        text: "#ffffff",
        secondaryText: "#9BA0A4",
        border: "#404040",
        button: "#10B981",
        buttonText: "#ffffff",
      },
    };

    const themeColors = theme === "dark" ? colors.dark : colors.light;

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
              themeColors={themeColors}
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
              themeColors={themeColors}
              showDownloads={showDownloads}
              showVersion={showVersion}
              versionNumber={latestVersion?.version_number || ""}
              width={generateCompactDimensions(data).width}
            />
          );
      }
    };
    const component = getVariant();

    const jost400 = await readFile(
      join(process.cwd(), "public/assets/fonts/Jost-Regular.ttf")
    );
    const jost700 = await readFile(
      join(process.cwd(), "public/assets/fonts/Jost-Bold.ttf")
    );

    return new ImageResponse(component, {
      ...options,
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
        "Cache-Control": `public, immutable, no-transform, max-age=${cacheDuration}`,
      },
    });
  } catch (error) {
    console.log("Error generating badge", error);
    return new Response("Project not found", { status: 404 });
  }
}
