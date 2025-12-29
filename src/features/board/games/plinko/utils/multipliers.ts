export type Risk = 'Low' | 'Medium' | 'High';

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export const generateMultipliers = (lines: number, risk: Risk): number[] => {
  const length = clamp(Math.round(lines), 3, 24);
  const centerIndex = Math.floor(length / 2);

  const extremeMultipliers = risk === 'High' ? [50, 100] : risk === 'Medium' ? [15, 30] : [5, 10];
  const midMultipliers = risk === 'High' ? [3, 8] : risk === 'Medium' ? [2, 5] : [1.5, 3];
  const centerMultipliers =
    risk === 'High' ? [0.2, 0.5] : risk === 'Medium' ? [0.3, 0.7] : [0.5, 1];
  const loseChance = risk === 'High' ? 0.3 : risk === 'Medium' ? 0.2 : 0.1;

  const arr = new Array<number>(length).fill(1);

  for (let i = 0; i < length; i++) {
    const dist = Math.abs(i - centerIndex);
    const t = centerIndex > 0 ? dist / centerIndex : 0;

    if (dist === 0 || (length % 2 === 0 && dist <= 1)) {
      const [minC, maxC] = centerMultipliers;
      arr[i] = +(minC + Math.random() * (maxC - minC)).toFixed(2);
    } else if (t > 0.85) {
      if (Math.random() < loseChance) {
        arr[i] = 0;
      } else {
        const [minE, maxE] = extremeMultipliers;
        arr[i] = +Math.round(minE + Math.random() * (maxE - minE));
      }
    } else if (t > 0.6) {
      if (Math.random() < loseChance * 0.5) {
        arr[i] = 0;
      } else {
        const [minM, maxM] = midMultipliers;
        const val = minM + Math.random() * (maxM - minM);
        arr[i] = +val.toFixed(1);
      }
    } else if (t > 0.3) {
      const val = 0.8 + Math.random() * 1.2;
      arr[i] = +val.toFixed(1);
    } else {
      const [minC, maxC] = centerMultipliers;
      const val = minC + Math.random() * (maxC - minC) * 1.5;
      arr[i] = +Math.min(val, 1).toFixed(2);
    }
  }

  for (let i = 0; i < centerIndex; i++) {
    arr[length - 1 - i] = arr[i];
  }
  return arr;
};
