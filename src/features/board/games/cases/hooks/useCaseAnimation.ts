import { useRef, useState, useCallback } from 'react';

import type CasesItem from '../types/cases';
import { createAudio, startTick, playChime } from '../utils/reelAudio';

// Constants for CS2-like animation behavior
const ANIMATION_CONFIG = {
  // Total animation duration in ms
  totalDuration: 6000,
  // Phase 1: Acceleration (ease-in) - 15% of total time
  accelPhase: 0.15,
  // Phase 2: Constant max speed - 55% of total time
  constantPhase: 0.55,
  // Phase 3: Deceleration (ease-out) - 30% of total time
  decelPhase: 0.30,
  // Add random offset variation to stop position (in pixels)
  // This makes each spin look different while maintaining mathematical accuracy
  randomOffsetRange: 60,
};

/**
 * CS2-like easing function with smooth acceleration, constant speed, then smooth deceleration
 * Returns a value from 0 to 1 representing progress through the animation
 */
const cs2Easing = (t: number): number => {
  const { accelPhase, constantPhase } = ANIMATION_CONFIG;
  const decelStart = accelPhase + constantPhase;

  if (t <= accelPhase) {
    // Phase 1: Acceleration (ease-in using sine)
    const localT = t / accelPhase;
    // Sine ease-in: starts slow, accelerates
    return accelPhase * (1 - Math.cos((localT * Math.PI) / 2)) * 0.5;
  } else if (t <= decelStart) {
    // Phase 2: Constant speed (linear)
    const accelDistance = accelPhase * 0.5;
    const linearT = (t - accelPhase) / constantPhase;
    return accelDistance + linearT * constantPhase;
  } else {
    // Phase 3: Deceleration (ease-out using sine)
    const accelDistance = accelPhase * 0.5;
    const constantDistance = constantPhase;
    const localT = (t - decelStart) / ANIMATION_CONFIG.decelPhase;
    // Sine ease-out: starts fast, decelerates smoothly
    const decelDistance = ANIMATION_CONFIG.decelPhase * Math.sin((localT * Math.PI) / 2);
    return accelDistance + constantDistance + decelDistance * 0.5;
  }
};

// Normalize the easing output to 0-1 range
const normalizedCs2Easing = (t: number): number => {
  const maxValue = cs2Easing(1);
  return cs2Easing(t) / maxValue;
};

/**
 * Get the current gap size based on screen width
 * Must match the CSS media queries in CasesScreen.module.scss
 */
const getResponsiveGap = (): number => {
  const width = window.innerWidth;
  if (width <= 400) return 6;
  if (width <= 480) return 8;
  if (width <= 600) return 10;
  if (width <= 768) return 12;
  return 16;
};

/**
 * Get the current item width based on screen width
 * Must match the CSS media queries in CasesItems.module.scss
 */
const getResponsiveItemWidth = (): number => {
  const width = window.innerWidth;
  if (width <= 400) return 68;
  if (width <= 480) return 78;
  if (width <= 600) return 90;
  if (width <= 768) return 104;
  return 130;
};

/**
 * Calculate the precise offset to center an item under the indicator
 * The indicator is always at the center of the reel container
 */
const calculateCenteredOffset = (
  containerWidth: number,
  itemWidth: number,
  gap: number,
  targetIndex: number
): number => {
  const stride = itemWidth + gap;
  // Calculate position to center the target item under the indicator
  // Item center = targetIndex * stride + itemWidth / 2
  // Container center = containerWidth / 2
  // Offset needed = itemCenter - containerCenter
  return targetIndex * stride + itemWidth / 2 - containerWidth / 2;
};

/**
 * Find the item whose center is closest to the indicator (center of container)
 */
const findItemAtIndicator = (
  reelRef: React.RefObject<HTMLDivElement | null>,
  items: CasesItem[],
  reelItems: CasesItem[]
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

  // Map back to original items array using the data-index attribute
  const selectedElement = itemElements[closestIndex] as HTMLElement;
  const dataIndex = selectedElement?.getAttribute('data-index');

  if (dataIndex !== null) {
    const idx = parseInt(dataIndex, 10);
    if (idx >= 0 && idx < reelItems.length) {
      // Return the corresponding item from the base items array
      return reelItems[idx];
    }
  }

  return items[0];
};

export const useCaseAnimation = () => {
  const reelRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  const animateTo = useCallback((
    items: CasesItem[],
    targetIndex: number,
    onDone: (finalOffset: number, selected: CasesItem) => void,
    reelItems: CasesItem[]
  ) => {
    const ac = createAudio();
    const tickController = startTick(ac, 5);

    // Get responsive dimensions
    const containerWidth = reelRef.current?.clientWidth ?? 610;
    const sampleItem = reelRef.current?.querySelector('[data-role="reel-item"]') as HTMLElement | null;
    const itemWidth = sampleItem?.getBoundingClientRect().width ?? getResponsiveItemWidth();
    const gap = getResponsiveGap();
    const stride = itemWidth + gap;

    // Calculate starting position (a few cycles into the reel)
    const startCycles = 3;
    const baseOffset = items.length * startCycles * stride;

    // Add random offset within item bounds to vary where in the item we stop
    // This makes each spin feel different while still being mathematically correct
    const randomOffset = (Math.random() - 0.5) * ANIMATION_CONFIG.randomOffsetRange;

    // Calculate the precise target offset to center the winning item
    const targetOffset = calculateCenteredOffset(containerWidth, itemWidth, gap, targetIndex) + randomOffset;

    // Total travel distance
    const travelDistance = targetOffset - baseOffset;

    // Set initial position
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

      // Apply CS2-like easing
      const progress = normalizedCs2Easing(t);
      const currentOffset = baseOffset + travelDistance * progress;

      // Update transform directly for smooth animation (bypass React state during animation)
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${currentOffset}px)`;
      }

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation complete - ensure we're at exact final position
        const finalOffset = targetOffset;
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(-${finalOffset}px)`;
        }
        setOffset(finalOffset);

        // Use DOM-based selection to find the item under the indicator
        // This is deterministic based on final visual position
        requestAnimationFrame(() => {
          const selectedItem = findItemAtIndicator(reelRef, items, reelItems);
          tickController.stop();
          playChime(ac);
          onDone(finalOffset, selectedItem);
        });
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return { reelRef, trackRef, offset, setOffset, animateTo };
};
