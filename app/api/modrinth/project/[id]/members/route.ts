import { z } from "zod";
import { ModrinthAPI, TeamMemberSchema } from "@/lib/api/modrinth";

export const runtime = "edge";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const members = await ModrinthAPI.fetchFromModrinth(
      `/project/${id}/members`,
      z.array(TeamMemberSchema)
    );

    return Response.json(members, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (error) {
    console.error("Error fetching team members:", error);
    return Response.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}
