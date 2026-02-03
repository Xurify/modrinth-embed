import { z } from "zod";
import { ModrinthAPI, TeamMemberSchema } from "@/lib/api/modrinth";
import { handleModrinthRoute } from "../../../handler";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return handleModrinthRoute(
    ModrinthAPI.fetchFromModrinth(`/project/${id}/members`, z.array(TeamMemberSchema)),
    "Failed to fetch team members"
  );
}
