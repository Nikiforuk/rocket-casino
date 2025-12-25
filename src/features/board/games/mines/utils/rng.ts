const strToSeed = (s: string): number => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return h >>> 0;
};

const xorshift32 = (seed: number) => {
  let x = seed || 123456789;
  return () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return (x >>> 0) / 0xffffffff;
  };
};

export const pickUniqueIndices = (count: number, total: number, seed?: string): number[] => {
  const rnd = seed ? xorshift32(strToSeed(seed)) : Math.random;
  const set = new Set<number>();
  while (set.size < count && set.size < total) {
    set.add(Math.floor(rnd() * total));
  }
  return Array.from(set.values());
};
