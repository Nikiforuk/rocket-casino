import type { Peg } from './pegLayout';
import type { Ball } from './physics';
import {
  renderBackground,
  updateActivePegs,
  renderPegs,
  renderMultiplierBins,
  renderBall,
} from './rendering';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../constants/plinko';

export const renderFrame = (
  canvas: HTMLCanvasElement,
  pegs: Peg[],
  ball: Ball | null,
  activeMultiplierIndex: number | null,
  multipliers: number[],
  multiplierPressOffset: number = 0,
) => {
  const devicePixelRatio = window.devicePixelRatio || 1;
  canvas.width = BOARD_WIDTH * devicePixelRatio;
  canvas.height = BOARD_HEIGHT * devicePixelRatio;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

  renderBackground(ctx);
  updateActivePegs(ball, pegs);
  renderPegs(ctx, pegs);
  renderMultiplierBins(ctx, multipliers, activeMultiplierIndex, multiplierPressOffset);

  if (ball) {
    renderBall(ctx, ball, pegs);
  }
};
