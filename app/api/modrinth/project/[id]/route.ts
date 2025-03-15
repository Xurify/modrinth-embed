import { NextResponse } from "next/server";
import { ModrinthAPI, ModrinthProjectSchema } from "@/lib/api/modrinth";

export const runtime = "edge";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const project = await ModrinthAPI.fetchFromModrinth(
      `/project/${id}`,
      ModrinthProjectSchema
    );

    //const cacheDuration = ModrinthAPI.getCacheDuration(project.downloads);

    return NextResponse.json(project, {
      headers: {
        // "Cache-Control": `public, s-maxage=${cacheDuration}, stale-while-revalidate=${
        //   cacheDuration * 2
        // }`,
        "Cache-Control": `public, max-age=3600, s-maxage=3600, stale-while-revalidate=7200`,
      },
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { 
        status: 500,
        headers: {
          "Cache-Control": `public, max-age=300, s-maxage=300`,
        }
      }
    );
  }
}
