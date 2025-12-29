import { PEG_RADIUS, BALL_RADIUS } from '../../constants/plinko';
import type { Peg } from '../pegLayout';
import type { Ball } from '../physics';
import { COLORS, NEON_CYAN } from './colors';

const activePegs = new Map<string, number>();

export const updateActivePegs = (ball: Ball | null, pegs: Peg[]) => {
  const now = Date.now();

  activePegs.forEach((timestamp, key) => {
    if (now - timestamp > 300) {
      activePegs.delete(key);
    }
  });

  if (ball) {
    for (const peg of pegs) {
      const dx = ball.x - peg.x;
      const dy = ball.y - peg.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      const minDist = BALL_RADIUS + PEG_RADIUS;
      if (d <= minDist + 2) {
        activePegs.set(`${peg.x}-${peg.y}`, now);
      }
    }
  }
};

export const renderPegs = (ctx: CanvasRenderingContext2D, pegs: Peg[]) => {
  const now = Date.now();

  pegs.forEach((peg) => {
    const pegKey = `${peg.x}-${peg.y}`;
    const isActive = activePegs.has(pegKey);

    if (isActive) {
      const glowIntensity = 1 - (now - (activePegs.get(pegKey) || now)) / 300;
      ctx.save();
      ctx.shadowColor = NEON_CYAN;
      ctx.shadowBlur = 15 * glowIntensity;
      ctx.fillStyle = COLORS.green200;
      ctx.beginPath();
      ctx.arc(peg.x, peg.y, PEG_RADIUS + 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.globalAlpha = 0.4 * glowIntensity;
      ctx.strokeStyle = NEON_CYAN;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(peg.x, peg.y, PEG_RADIUS + 6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    const pegGradient = ctx.createRadialGradient(peg.x - 2, peg.y - 2, 0, peg.x, peg.y, PEG_RADIUS);
    pegGradient.addColorStop(0, isActive ? COLORS.green200 : '#ffffff');
    pegGradient.addColorStop(1, isActive ? COLORS.green100 : '#c0c0c0');
    ctx.fillStyle = pegGradient;
    ctx.beginPath();
    ctx.arc(peg.x, peg.y, PEG_RADIUS, 0, Math.PI * 2);
    ctx.fill();
  });
};
