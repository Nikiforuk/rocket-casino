import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { RefObject } from 'react';

import { BALL_RADIUS, BOARD_HEIGHT, BOARD_WIDTH } from '../constants/plinko';
import { clampBallInsideTriangle } from '../utils/bounds';
import { snapBallToMultiplier } from '../utils/landing';
import { createPegLayout, type Peg } from '../utils/pegLayout';
import { type Ball, stepBall } from '../utils/physics';
import { renderFrame } from '../utils/renderer';

export interface PlinkoEngineState {
  pegs: Peg[];
  balls: Ball[];
  activeMultiplierIndex: number | null;
}

export interface PlinkoEngineApi {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  state: PlinkoEngineState;
  dropBall: () => void;
  dropBalls: (count: number) => void;
  reset: () => void;
}

export const usePlinkoEngine = (
  onBallLanded: (index: number) => void,
  multipliers: number[],
  lines: number = 9,
): PlinkoEngineApi => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const scoredRef = useRef<WeakSet<Ball>>(new WeakSet());

  // Recreate pegs when lines change
  const pegs = useMemo(() => createPegLayout(BOARD_HEIGHT, lines), [lines]);

  const [balls, setBalls] = useState<Ball[]>([]);
  const [activeMultiplierIndex, setActiveMultiplierIndex] = useState<number | null>(null);

  // Multiplier press animation state
  const [multiplierPressOffset, setMultiplierPressOffset] = useState(0);
  const pressAnimationRef = useRef<number | null>(null);

  // Animate multiplier press when ball lands
  const animateMultiplierPress = useCallback(() => {
    const startTime = performance.now();
    const duration = 200; // ms
    const maxPress = 8; // pixels

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Bounce easing: press down then spring back
      let offset: number;
      if (progress < 0.4) {
        // Press down
        offset = maxPress * (progress / 0.4);
      } else {
        // Spring back
        const springProgress = (progress - 0.4) / 0.6;
        offset = maxPress * (1 - springProgress) * Math.cos(springProgress * Math.PI * 0.5);
      }

      setMultiplierPressOffset(Math.max(0, offset));

      if (progress < 1) {
        pressAnimationRef.current = requestAnimationFrame(animate);
      } else {
        setMultiplierPressOffset(0);
        pressAnimationRef.current = null;
      }
    };

    if (pressAnimationRef.current) {
      cancelAnimationFrame(pressAnimationRef.current);
    }
    pressAnimationRef.current = requestAnimationFrame(animate);
  }, []);

  const draw = useCallback(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    renderFrame(
      canvasElement,
      pegs,
      balls.length ? balls[balls.length - 1] : null,
      activeMultiplierIndex,
      multipliers,
      multiplierPressOffset,
    );
    const ctx = canvasElement.getContext('2d');
    if (!ctx) return;
    // Draw additional balls with blue gradient (matching main ball style)
    balls.slice(0, -1).forEach((b) => {
      const ballGradient = ctx.createRadialGradient(
        b.x - BALL_RADIUS * 0.3,
        b.y - BALL_RADIUS * 0.3,
        0,
        b.x,
        b.y,
        BALL_RADIUS,
      );
      ballGradient.addColorStop(0, '#8EC5FF');
      ballGradient.addColorStop(0.4, '#51A2FF');
      ballGradient.addColorStop(0.8, '#2B7FFF');
      ballGradient.addColorStop(1, '#155DFC');
      ctx.fillStyle = ballGradient;
      ctx.beginPath();
      ctx.arc(b.x, b.y, BALL_RADIUS, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [pegs, balls, activeMultiplierIndex, multipliers, multiplierPressOffset]);

  const step = useCallback(
    (dt: number) => {
      if (!balls.length) return;
      let idxLanded: number | null = null;
      const nextBalls = balls.map((b) => {
        stepBall(b, pegs, { width: BOARD_WIDTH, height: BOARD_HEIGHT }, dt);
        clampBallInsideTriangle(b, pegs);
        const landing = snapBallToMultiplier(b, multipliers);
        if (landing.landed && landing.index !== null && !scoredRef.current.has(b)) {
          scoredRef.current.add(b);
          idxLanded = landing.index;
          b.locked = true;
        }
        return { ...b };
      });
      if (idxLanded !== null) {
        setActiveMultiplierIndex(idxLanded);
        animateMultiplierPress(); // Trigger press animation
        onBallLanded(idxLanded);
      }
      setBalls(nextBalls);
    },
    [balls, pegs, onBallLanded, multipliers, animateMultiplierPress],
  );

  useEffect(() => {
    const raf = () => {
      const now = performance.now();
      const last = lastTsRef.current ?? now;
      const dt = Math.min(0.033, (now - last) / 1000);
      lastTsRef.current = now;
      draw();
      step(dt);
      animationRef.current = requestAnimationFrame(raf);
    };
    animationRef.current = requestAnimationFrame(raf);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [draw, step]);

  const dropBall = useCallback(() => {
    setActiveMultiplierIndex(null);
    const centerX = BOARD_WIDTH / 2;
    const spawnY = BALL_RADIUS + 8;
    setBalls([{ x: centerX, y: spawnY, vx: (Math.random() - 0.5) * 30, vy: 0, locked: false }]);
    scoredRef.current = new WeakSet();
  }, []);

  const dropBalls = useCallback((count: number) => {
    setActiveMultiplierIndex(null);
    const centerX = BOARD_WIDTH / 2;
    const baseY = BALL_RADIUS + 8;
    const cluster: Ball[] = Array.from({ length: Math.max(1, count) }, () => {
      const jitterX = (Math.random() - 0.5) * 12;
      const jitterY = (Math.random() - 0.5) * 4;
      const vx = (Math.random() - 0.5) * 30;
      return { x: centerX + jitterX, y: baseY + jitterY, vx, vy: 0, locked: false };
    });
    setBalls(cluster);
    scoredRef.current = new WeakSet();
  }, []);

  const reset = useCallback(() => {
    setActiveMultiplierIndex(null);
    setBalls([]);
    scoredRef.current = new WeakSet();
  }, []);

  return {
    canvasRef,
    state: { pegs, balls, activeMultiplierIndex },
    dropBall,
    dropBalls,
    reset,
  };
};
