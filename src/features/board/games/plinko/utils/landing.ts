import type { Ball } from './physics';
import { MULTIPLIER_LINE_Y, BOARD_WIDTH, BALL_RADIUS } from '../constants/plinko';

export interface LandingResult {
  landed: boolean;
  index: number | null;
}

export const snapBallToMultiplier = (ball: Ball, multipliers: number[]): LandingResult => {
  if (ball.locked) return { landed: false, index: null };
  if (ball.y < MULTIPLIER_LINE_Y - BALL_RADIUS) return { landed: false, index: null };

  const binWidth = BOARD_WIDTH / multipliers.length;
  const index = Math.max(0, Math.min(multipliers.length - 1, Math.floor(ball.x / binWidth)));
  ball.locked = true;
  return { landed: true, index };
};
