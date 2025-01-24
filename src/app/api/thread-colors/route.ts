import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rgbToHex } from "@/utils/colorUtils";
import { SelectedColor } from "@/types/thread";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const r = parseInt(searchParams.get("r") || "0");
    const g = parseInt(searchParams.get("g") || "0");
    const b = parseInt(searchParams.get("b") || "0");

    // 各メーカーごとに最も近い色を取得するRAW SQLクエリ
    const result = await prisma.$queryRaw`
      WITH RankedColors AS (
        SELECT 
          *,
          SQRT(
            POW(("rgbR" - ${r}), 2) + 
            POW(("rgbG" - ${g}), 2) + 
            POW(("rgbB" - ${b}), 2)
          ) as color_distance,
          ROW_NUMBER() OVER (
            PARTITION BY manufacturer 
            ORDER BY SQRT(
              POW(("rgbR" - ${r}), 2) + 
              POW(("rgbG" - ${g}), 2) + 
              POW(("rgbB" - ${b}), 2)
            )
          ) as rn
        FROM thread_colors
      )
      SELECT *
      FROM RankedColors
      WHERE rn = 1
      ORDER BY manufacturer;
    `;

    const formattedColors = (result as any[]).map((color) => ({
      manufacturer: color.manufacturer,
      colors: [
        {
          id: color.id,
          manufacturer: color.manufacturer,
          colorNumber: color.colorNumber,
          name: color.name,
          rgb: {
            r: color.rgbR,
            g: color.rgbG,
            b: color.rgbB,
          },
          hex: rgbToHex(color.rgbR, color.rgbG, color.rgbB),
          difference: Number(color.color_distance.toFixed(2)),
        },
      ],
    }));

    return NextResponse.json(formattedColors);
  } catch (error) {
    console.error("Error fetching thread colors:", error);
    return NextResponse.json(
      { error: "Failed to fetch thread colors" },
      { status: 500 }
    );
  }
}
