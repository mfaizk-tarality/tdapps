export const adjustOpacity = (rgbaString, newOpacity) => {
  const rgbaRegex = /rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([0-9\.]*)\)/i;
  const match = rgbaString.match(rgbaRegex);

  if (!match) {
    throw new Error("Invalid RGBA format");
  }

  const r = match[1];
  const g = match[2];
  const b = match[3];

  const alpha = Math.max(0, Math.min(1, newOpacity));

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
