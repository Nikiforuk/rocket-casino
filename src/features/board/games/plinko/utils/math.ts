export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export const distance = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
};

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
