import { ThreadColor, SelectedColor } from "../types/thread";

export const rgbToHex = (r: number, g: number, b: number): string => {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
};

export const calculateColorDifference = (
  color1: SelectedColor,
  color2: ThreadColor
): number => {
  const r1 = color1.rgb.r;
  const g1 = color1.rgb.g;
  const b1 = color1.rgb.b;
  const r2 = color2.rgb.r;
  const g2 = color2.rgb.g;
  const b2 = color2.rgb.b;

  // ユークリッド距離を使用して色の差を計算
  return Math.sqrt(
    Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2)
  );
};

export const findClosestColors = (
  selectedColor: SelectedColor,
  threadColors: ThreadColor[],
  limit: number = 5
): ThreadColor[] => {
  const colorMatches = threadColors
    .map((threadColor) => ({
      threadColor,
      difference: calculateColorDifference(selectedColor, threadColor),
    }))
    .sort((a, b) => a.difference - b.difference)
    .slice(0, limit);

  return colorMatches.map((match) => match.threadColor);
};
