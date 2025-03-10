import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import sharp from "sharp";
import { ModrinthAPI } from "@/lib/api/modrinth";
import { truncate } from "@/lib/api/utils/utils";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);
    const theme = searchParams.get("theme") || "light";
    const showDownloads = searchParams.get("showDownloads") !== "false";
    const showVersion = searchParams.get("showVersion") !== "false";
    const showButton = searchParams.get("showButton") !== "false";
    const showPadding = searchParams.get("showPadding") === "true";

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
        background: "#ffffff",
        background2: "#f9fafb",
        text: "#1f2937",
        secondaryText: "#6b7280",
        border: "#e5e7eb",
        button: "#10B981",
        buttonText: "#ffffff",
      },
      dark: {
        background: "#26292F",
        background2: "#16181C",
        text: "#ffffff",
        secondaryText: "#9ca3af",
        border: "#374151",
        button: "#10B981",
        buttonText: "#ffffff",
      },
    };

    const themeColors = theme === "dark" ? colors.dark : colors.light;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: showPadding ? themeColors.background2 : "transparent",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "100%",
              width: "900px",
              backgroundColor: themeColors.background,
              borderRadius: "12px",
              padding: "32px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "flex-start", gap: "24px" }}
            >
              {/* Logo */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "110px",
                  height: "110px",
                  background:
                    "linear-gradient(180deg, #10B981 0%, #157a59 100%)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                {iconUrl ? (
                  <img
                    src={iconUrl || "/placeholder.svg"}
                    width="100%"
                    height="100%"
                    style={{
                      objectFit: "contain",
                      imageRendering: "crisp-edges",
                    }}
                    alt="Mod logo"
                  />
                ) : (
                  <div
                    style={{
                      fontSize: "48px",
                      fontWeight: "bold",
                      color: themeColors.text,
                    }}
                  >
                    {project.title.substring(0, 1)}
                  </div>
                )}
              </div>

              {/* Title and Author */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <h1
                  style={{
                    fontSize: "48px",
                    fontWeight: "bold",
                    color: themeColors.text,
                    textWrap: "balance",
                    margin: 0,
                  }}
                >
                  {truncate(project.title, 22)}
                </h1>
                <p
                  style={{
                    fontSize: "24px",
                    color: themeColors.secondaryText,
                    margin: 0,
                  }}
                >
                  by {truncate(ModrinthAPI.getAuthor(project), 50)}
                </p>
              </div>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: "24px",
                color: themeColors.text,
                marginTop: "24px",
                marginBottom: "24px",
                lineHeight: 1.5,
              }}
            >
              {project.description}
            </p>

            {/* Stats */}
            <div
              style={{
                display: "flex",
                gap: "24px",
                color: themeColors.secondaryText,
                fontSize: "20px",
              }}
            >
              {showDownloads && (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <span>Downloads:</span>
                  <span>{ModrinthAPI.formatDownloads(project.downloads)}</span>
                </div>
              )}
              {showVersion && latestVersion && (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <span>Latest:</span>
                  <span>{latestVersion?.version_number || "N/A"}</span>
                </div>
              )}
            </div>

            {/* Button */}
            {showButton && (
              <div
                style={{
                  marginTop: showDownloads || showVersion ? "24px" : "0px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    backgroundColor: "#10B981",
                    color: "white",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    fontSize: "20px",
                    fontWeight: "500",
                    width: "100%",
                  }}
                >
                  View on Modrinth
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      ),
      {
        width: showPadding ? 1200 : 900,
        height: showPadding ? 600 : 400,
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
