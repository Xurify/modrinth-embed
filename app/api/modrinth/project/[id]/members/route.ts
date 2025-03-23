import { z } from "zod";
import { ModrinthAPI, TeamMemberSchema } from "@/lib/api/modrinth";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data: members, headers } = await ModrinthAPI.fetchFromModrinth(
      `/project/${id}/members`,
      z.array(TeamMemberSchema)
    );

    return Response.json(members, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        ...(headers.limit && { "X-Ratelimit-Limit": headers.limit }),
        ...(headers.remaining && { "X-Ratelimit-Remaining": headers.remaining }),
        ...(headers.reset && { "X-Ratelimit-Reset": headers.reset }),
      },
    });
  } catch (error) {
    console.error("Error fetching team members:", error);
    return Response.json(
      { error: "Failed to fetch team members" },
      { 
        status: 500,
        headers: {
          "Cache-Control": "public, max-age=300, s-maxage=300",
        }
      }
    );
  }
}
