import { ModrinthAPI, ModrinthProjectSchema } from "@/lib/api/modrinth";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data: project, headers } = await ModrinthAPI.fetchFromModrinth(
      `/project/${id}`,
      ModrinthProjectSchema
    );

    return Response.json(project, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        ...(headers.limit && { "X-Ratelimit-Limit": headers.limit }),
        ...(headers.remaining && { "X-Ratelimit-Remaining": headers.remaining }),
        ...(headers.reset && { "X-Ratelimit-Reset": headers.reset }),
      },
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return Response.json(
      { error: "Failed to fetch project" },
      { 
        status: 500,
        headers: {
          "Cache-Control": "public, max-age=300, s-maxage=300",
        }
      }
    );
  }
}
