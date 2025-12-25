import { useRef, useState, useCallback } from 'react';

import type CasesItem from '../types/cases';
import { createAudio, startTick, playChime } from '../utils/reelAudio';

const ANIMATION_CONFIG = {
  totalDuration: 6000,
  accelPhase: 0.15,
  constantPhase: 0.55,
  decelPhase: 0.3,
  randomOffsetRange: 60,
};

const RESPONSIVE_CONFIG = [
  { maxWidth: 400, gap: 6, itemWidth: 68 },
  { maxWidth: 480, gap: 8, itemWidth: 78 },
  { maxWidth: 600, gap: 10, itemWidth: 90 },
  { maxWidth: 768, gap: 12, itemWidth: 104 },
  { maxWidth: Infinity, gap: 16, itemWidth: 130 },
];

const getResponsiveValues = (): { gap: number; itemWidth: number } => {
  const width = window.innerWidth;
  const config = RESPONSIVE_CONFIG.find((bp) => width <= bp.maxWidth) ?? RESPONSIVE_CONFIG.at(-1)!;
  return { gap: config.gap, itemWidth: config.itemWidth };
};

const cs2Easing = (t: number): number => {
  const { accelPhase, constantPhase } = ANIMATION_CONFIG;
  const decelStart = accelPhase + constantPhase;

  if (t <= accelPhase) {
    const localT = t / accelPhase;
    return accelPhase * (1 - Math.cos((localT * Math.PI) / 2)) * 0.5;
  } else if (t <= decelStart) {
    const accelDistance = accelPhase * 0.5;
    const linearT = (t - accelPhase) / constantPhase;
    return accelDistance + linearT * constantPhase;
  } else {
    const accelDistance = accelPhase * 0.5;
    const constantDistance = constantPhase;
    const localT = (t - decelStart) / ANIMATION_CONFIG.decelPhase;
    const decelDistance = ANIMATION_CONFIG.decelPhase * Math.sin((localT * Math.PI) / 2);
    return accelDistance + constantDistance + decelDistance * 0.5;
  }
};

const normalizedCs2Easing = (t: number): number => {
  const maxValue = cs2Easing(1);
  return cs2Easing(t) / maxValue;
};

const calculateCenteredOffset = (
  containerWidth: number,
  itemWidth: number,
  gap: number,
  targetIndex: number,
): number => {
  const stride = itemWidth + gap;
  return targetIndex * stride + itemWidth / 2 - containerWidth / 2;
};

const findItemAtIndicator = (
  reelRef: React.RefObject<HTMLDivElement | null>,
  items: CasesItem[],
  reelItems: CasesItem[],
): CasesItem => {
  if (!reelRef.current) return items[0];

  const reelRect = reelRef.current.getBoundingClientRect();
  const indicatorX = reelRect.left + reelRect.width / 2;

  const itemElements = reelRef.current.querySelectorAll('[data-role="reel-item"]');
  if (!itemElements.length) return items[0];

  let closestIndex = 0;
  let closestDistance = Infinity;

  itemElements.forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    const itemCenter = rect.left + rect.width / 2;
    const distance = Math.abs(itemCenter - indicatorX);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = i;
    }
  });

  const selectedElement = itemElements[closestIndex] as HTMLElement;
  const dataIndex = selectedElement?.getAttribute('data-index');

  if (dataIndex !== null) {
    const idx = parseInt(dataIndex, 10);
    if (idx >= 0 && idx < reelItems.length) {
      return reelItems[idx];
    }
  }

  return items[0];
};

export const useCaseAnimation = () => {
  const reelRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  const animateTo = useCallback(
    (
      items: CasesItem[],
      targetIndex: number,
      onDone: (finalOffset: number, selected: CasesItem) => void,
      reelItems: CasesItem[],
    ) => {
      const ac = createAudio();
      const tickController = startTick(ac, 5);

      const containerWidth = reelRef.current?.clientWidth ?? 610;
      const sampleItem = reelRef.current?.querySelector(
        '[data-role="reel-item"]',
      ) as HTMLElement | null;
      const responsive = getResponsiveValues();
      const itemWidth = sampleItem?.getBoundingClientRect().width ?? responsive.itemWidth;
      const gap = responsive.gap;
      const stride = itemWidth + gap;

      const startCycles = 3;
      const baseOffset = items.length * startCycles * stride;

      const randomOffset = (Math.random() - 0.5) * ANIMATION_CONFIG.randomOffsetRange;

      const targetOffset =
        calculateCenteredOffset(containerWidth, itemWidth, gap, targetIndex) + randomOffset;

      const travelDistance = targetOffset - baseOffset;

      setOffset(baseOffset);
      if (trackRef.current) {
        trackRef.current.style.transition = 'none';
        trackRef.current.style.transform = `translateX(-${baseOffset}px)`;
      }

      const startTime = performance.now();
      const { totalDuration } = ANIMATION_CONFIG;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const t = Math.min(elapsed / totalDuration, 1);

        const progress = normalizedCs2Easing(t);
        const currentOffset = baseOffset + travelDistance * progress;

        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(-${currentOffset}px)`;
        }

        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          const finalOffset = targetOffset;
          if (trackRef.current) {
            trackRef.current.style.transform = `translateX(-${finalOffset}px)`;
          }
          setOffset(finalOffset);
          requestAnimationFrame(() => {
            const selectedItem = findItemAtIndicator(reelRef, items, reelItems);
            tickController.stop();
            playChime(ac);
            onDone(finalOffset, selectedItem);
          });
        }
      };

      requestAnimationFrame(animate);
    },
    [],
  );

  return { reelRef, trackRef, offset, setOffset, animateTo };
};
