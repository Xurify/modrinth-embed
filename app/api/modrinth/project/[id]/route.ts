import { ModrinthAPI, ModrinthProjectSchema } from "@/lib/api/modrinth";
import { handleModrinthRoute } from "../../handler";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return handleModrinthRoute(
    ModrinthAPI.fetchFromModrinth(`/project/${id}`, ModrinthProjectSchema),
    "Failed to fetch project"
  );
}
