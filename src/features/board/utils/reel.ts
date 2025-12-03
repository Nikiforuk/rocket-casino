import type { RefObject } from 'react';

export const pickRarity = (weights: Record<string, number>, order: string[]) => {
  const r = Math.random();
  let acc = 0;
  for (const k of order) {
    acc += weights[k];
    if (r <= acc) return k;
  }
  return order[0];
};

export const animateToOffset = (
  trackRef: RefObject<HTMLDivElement | null>,
  startOffset: number,
  targetOffset: number,
  totalMs: number,
  onFinish: () => void,
) => {
  const start = performance.now();
  const step = (t: number) => {
    const p = Math.min(Math.max((t - start) / totalMs, 0), 1);
    const next = startOffset + (targetOffset - startOffset) * (1 - Math.pow(1 - p, 3));
    if (trackRef.current) trackRef.current.style.transform = `translateX(-${next}px)`;
    if (p >= 1) {
      if (trackRef.current) trackRef.current.style.transform = `translateX(-${targetOffset}px)`;
      onFinish();
      return;
    }
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

export const findCenterItem = <T extends { emoji: string }>(
  reelRef: RefObject<HTMLDivElement | null>,
  items: T[],
): T => {
  let selected = items[0];
  const rect = reelRef.current?.getBoundingClientRect();
  const cx = rect ? rect.left + rect.width / 2 : 0;
  const nodes = reelRef.current?.querySelectorAll('[data-role="reel-item"]') as
    | NodeListOf<HTMLElement>
    | undefined;
  if (nodes && nodes.length) {
    for (let i = 0; i < nodes.length; i++) {
      const r = nodes[i].getBoundingClientRect();
      if (cx >= r.left && cx <= r.right) {
        selected = items[i % items.length];
        break;
      }
    }
  }
  return selected;
};

export const align = (cw: number, stride: number, itemWidth: number, idx: number) => {
  return idx * stride - (cw / 2 - itemWidth / 2);
};

export const DEFAULT_RARITY_ORDER = [
  'common',
  'uncommon',
  'rare',
  'epic',
  'legendary',
  'gold',
] as const;
export const DEFAULT_RARITY_WEIGHTS: Record<(typeof DEFAULT_RARITY_ORDER)[number], number> = {
  common: 0.55,
  uncommon: 0.25,
  rare: 0.12,
  epic: 0.05,
  legendary: 0.025,
  gold: 0.005,
};

export const selectTargetLocalIndex = <T extends { rarity: string }>(
  items: T[],
  weights: Record<string, number>,
  order: ReadonlyArray<string>,
) => {
  const desired = pickRarity(weights, [...order]);
  const pool: number[] = [];
  items.forEach((it, idx) => {
    if (it.rarity === desired) pool.push(idx);
  });
  if (pool.length === 0) return 0;
  return pool[Math.floor(Math.random() * pool.length)];
};
