import { clamp, distance } from './math';
import type { Peg } from './pegLayout';
import { BALL_RADIUS, PEG_RADIUS, GRAVITY, DAMPING, BOUNCE } from '../constants/plinko';
import { MULTIPLIER_LINE_Y } from '../constants/plinko';

export interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  locked: boolean;
}

export interface Bounds {
  width: number;
  height: number;
}

export const stepBall = (ball: Ball, pegs: Peg[], bounds: Bounds, dt: number) => {
  if (ball.locked) return;

  const dampingFactor = Math.pow(DAMPING, dt * 60);

  ball.vy += GRAVITY * dt;
  ball.x += ball.vx * dt;
  ball.y += ball.vy * dt;

  for (const peg of pegs) {
    const dist = distance(ball.x, ball.y, peg.x, peg.y);
    const minDist = BALL_RADIUS + PEG_RADIUS;
    if (dist < minDist) {
      const nx = (ball.x - peg.x) / dist;
      const ny = (ball.y - peg.y) / dist;

      const overlap = minDist - dist;
      ball.x += nx * overlap;
      ball.y += ny * overlap;

      const dot = ball.vx * nx + ball.vy * ny;
      ball.vx = (ball.vx - 2 * dot * nx) * BOUNCE;
      ball.vy = (ball.vy - 2 * dot * ny) * BOUNCE;

      const randomKick = (Math.random() - 0.5) * 0.6;
      ball.vx += randomKick;
    }
  }

  if (ball.x < BALL_RADIUS) {
    ball.x = BALL_RADIUS;
    ball.vx = Math.abs(ball.vx) * BOUNCE;
  } else if (ball.x > bounds.width - BALL_RADIUS) {
    ball.x = bounds.width - BALL_RADIUS;
    ball.vx = -Math.abs(ball.vx) * BOUNCE;
  }

  if (ball.y < BALL_RADIUS) {
    ball.y = BALL_RADIUS;
    ball.vy = Math.abs(ball.vy) * BOUNCE;
  }

  ball.vx *= dampingFactor;
  ball.vy *= dampingFactor;

  if (ball.y + BALL_RADIUS >= MULTIPLIER_LINE_Y) {
    ball.y = MULTIPLIER_LINE_Y - BALL_RADIUS;
    ball.vy = 0;
    ball.vx = 0;
  }

  ball.x = clamp(ball.x, BALL_RADIUS, bounds.width - BALL_RADIUS);
  ball.y = clamp(ball.y, BALL_RADIUS, bounds.height - BALL_RADIUS);
};
