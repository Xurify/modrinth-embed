import { NextResponse } from "next/server";
import { z } from "zod";
import { ModrinthAPI, ModrinthVersionSchema } from "@/lib/api/modrinth";

export const runtime = "edge";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const versions = await ModrinthAPI.fetchFromModrinth(
      `/project/${params.id}/version`,
      z.array(ModrinthVersionSchema)
    );
    
    return NextResponse.json(versions, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (error) {
    console.error("Error fetching versions:", error);
    return NextResponse.json(
      { error: "Failed to fetch versions" },
      { status: 500 }
    );
  }
} 