export type Risk = 'Low' | 'Medium' | 'High';

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export const generateMultipliers = (lines: number, risk: Risk): number[] => {
  const length = clamp(Math.round(lines), 3, 24);
  const centerIndex = Math.floor(length / 2);

  const extremes = risk === 'High' ? [60, 120] : risk === 'Medium' ? [20, 40] : [6, 12];
  const midMax = risk === 'High' ? 6 : risk === 'Medium' ? 3 : 2;
  const centerMin = risk === 'High' ? 0.3 : risk === 'Medium' ? 0.5 : 0.8;
  const centerMax = risk === 'High' ? 1.2 : risk === 'Medium' ? 1.5 : 1.8;

  const arr = new Array<number>(length).fill(1);

  for (let i = 0; i < length; i++) {
    const dist = Math.abs(i - centerIndex);
    const t = dist / centerIndex;
    if (dist === 0 || (length % 2 === 0 && dist === 1 && i === centerIndex)) {
      arr[i] = +(centerMin + Math.random() * (centerMax - centerMin)).toFixed(2);
    } else if (t > 0.8) {
      const [minE, maxE] = extremes;
      const val = minE + Math.random() * (maxE - minE);
      arr[i] = +val.toFixed(0);
    } else if (t > 0.4) {
      const val = 2 + Math.random() * (midMax - 2);
      arr[i] = +val.toFixed(1);
    } else {
      const val = 1 + Math.random() * 0.6;
      arr[i] = +val.toFixed(1);
    }
  }

  for (let i = 0; i < centerIndex; i++) {
    arr[length - 1 - i] = arr[i];
  }
  return arr;
};
