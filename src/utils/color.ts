import { SelectOption } from "notion-types";

import { NotionColorMap } from "@/constants";

export function hexToRgb(hex: string): number[] {
  if (!hex) return [];
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result?.length) return [];
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ];
}

export const getFontColor = (color: string) => {
  const rgb = hexToRgb(color);
  if (!rgb) return "black";

  const [r, g, b] = rgb;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "black" : "white";
};

export function getOptionColor({
  value,
  options,
}: {
  value: string | undefined;
  options: SelectOption[] | undefined;
}) {
  if (!value || !options) return undefined;

  const option = options.find((option) => option.value === value);
  if (!option) return undefined;

  return NotionColorMap[option.color];
}
