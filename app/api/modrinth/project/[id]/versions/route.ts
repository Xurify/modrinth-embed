import { z } from "zod";
import { ModrinthAPI, ModrinthVersionSchema } from "@/lib/api/modrinth";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data: versions, headers } = await ModrinthAPI.fetchFromModrinth(
      `/project/${id}/version`,
      z.array(ModrinthVersionSchema)
    );

    return Response.json(versions, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        ...(headers.limit && { "X-Ratelimit-Limit": headers.limit }),
        ...(headers.remaining && { "X-Ratelimit-Remaining": headers.remaining }),
        ...(headers.reset && { "X-Ratelimit-Reset": headers.reset }),
      },
    });
  } catch (error) {
    console.error("Error fetching versions:", error);
    return Response.json(
      { error: "Failed to fetch versions" },
      { 
        status: 500,
        headers: {
          "Cache-Control": "public, max-age=300, s-maxage=300",
        }
      }
    );
  }
}
