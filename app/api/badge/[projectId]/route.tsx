import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { ModrinthAPI } from "@/lib/api/modrinth";
import sharp from "sharp";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);
    const theme = searchParams.get("theme") || "light";
    const style = searchParams.get("style") || "default";
    const showDownloads = searchParams.get("showDownloads") !== "false";
    const showVersion = searchParams.get("showVersion") !== "false";

    const { projectId } = await params;
    const project = await ModrinthAPI.getProject(projectId);
    const versions = showVersion
      ? await ModrinthAPI.getVersions(projectId)
      : [];
    const latestVersion = versions[0];

    if (!project) {
      return new Response("Project not found", { status: 404 });
    }

    let iconUrl = project.icon_url || undefined;
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

    const colors = {
      light: {
        bg: "#ffffff",
        text: "#1f2937",
        secondaryText: "#6b7280",
        border: "#e5e7eb",
      },
      dark: {
        bg: "#1f2937",
        text: "#ffffff",
        secondaryText: "#9ca3af",
        border: "#374151",
      },
    };

    const themeColors = theme === "dark" ? colors.dark : colors.light;
    const height = style === "compact" ? 24 : 32;
    const fontSize = style === "compact" ? 12 : 14;
    const padding = style === "compact" ? 8 : 12;
    const iconSize = style === "compact" ? 16 : 24;

    let width = padding * 2 + project.title.length * (fontSize * 0.6);
    if (project.icon_url) width += iconSize + 8;
    if (showDownloads)
      width +=
        ModrinthAPI.formatDownloads(project.downloads).length *
          (fontSize * 0.6) +
        16;
    if (showVersion && latestVersion)
      width += latestVersion.version_number.length * (fontSize * 0.6) + 24;

    return new ImageResponse(
      (
        <div
          style={{
            height,
            width,
            display: "flex",
            alignItems: "center",
            padding,
            backgroundColor: themeColors.bg,
            border: `1px solid ${themeColors.border}`,
            borderRadius: 6,
          }}
        >
          {project.icon_url && (
            <img
              src={iconUrl}
              alt=""
              width={iconSize}
              height={iconSize}
              style={{
                borderRadius: 4,
                marginRight: 8,
              }}
            />
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: themeColors.text,
              fontSize,
              fontWeight: 500,
            }}
          >
            <span>{project.title}</span>
            {showDownloads && (
              <span style={{ color: themeColors.secondaryText }}>
                {ModrinthAPI.formatDownloads(project.downloads)}
              </span>
            )}
            {showVersion && latestVersion && (
              <span style={{ color: themeColors.secondaryText }}>
                v{latestVersion.version_number}
              </span>
            )}
          </div>
        </div>
      ),
      {
        width,
        height,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error ? error.message : "Failed to generate badge",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
