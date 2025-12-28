import type { Peg } from './pegLayout';
import type { Ball } from './physics';
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  PEG_RADIUS,
  MULTIPLIER_LINE_Y,
  BALL_RADIUS,
} from '../constants/plinko';

export const renderFrame = (
  canvas: HTMLCanvasElement,
  pegs: Peg[],
  ball: Ball | null,
  activeMultiplierIndex: number | null,
  multipliers: number[],
) => {
  const devicePixelRatio = window.devicePixelRatio || 1;
  canvas.width = BOARD_WIDTH * devicePixelRatio;
  canvas.height = BOARD_HEIGHT * devicePixelRatio;
  const context = canvas.getContext('2d');
  if (!context) return;
  context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

  context.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
  context.fillStyle = '#1b2430';
  context.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
  context.strokeStyle = '#2a3444';
  context.lineWidth = 2;
  context.strokeRect(2, 2, BOARD_WIDTH - 4, BOARD_HEIGHT - 4);

  context.fillStyle = '#ffffff';
  pegs.forEach((peg) => {
    context.beginPath();
    context.arc(peg.x, peg.y, PEG_RADIUS, 0, Math.PI * 2);
    context.fill();
  });

  if (ball) {
    let closest: { x: number; y: number; dist: number } | null = null;
    for (const peg of pegs) {
      const dx = ball.x - peg.x;
      const dy = ball.y - peg.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (!closest || d < closest.dist) closest = { x: peg.x, y: peg.y, dist: d };
    }
    const minDist = BALL_RADIUS + PEG_RADIUS;
    if (closest && closest.dist <= minDist + 1) {
      context.save();
      context.globalAlpha = 0.35;
      context.strokeStyle = '#fbbf24';
      context.lineWidth = 3;
      context.beginPath();
      context.arc(closest.x, closest.y, PEG_RADIUS + 6, 0, Math.PI * 2);
      context.stroke();
      context.restore();
    }
  }

  const binWidth = BOARD_WIDTH / multipliers.length;
  const cornerRadius = 14;

  const colorFor = (m: number): string => {
    if (m >= 10) return '#ef4444';
    if (m >= 5) return '#f59e0b';
    if (m >= 2) return '#60a5fa';
    if (m >= 1) return '#22c55e';
    return '#10b981';
  };

  multipliers.forEach((multiplier, index) => {
    const x = index * binWidth;
    const isActive = activeMultiplierIndex === index;
    const baseColor = colorFor(multiplier);
    context.fillStyle = isActive ? '#34d399' : baseColor;

    const left = x + 2;
    const top = MULTIPLIER_LINE_Y;
    const width = binWidth - 4;
    const height = BOARD_HEIGHT - MULTIPLIER_LINE_Y - 2;

    if (index === 0 || index === multipliers.length - 1) {
      const rBL = index === 0 ? cornerRadius : 0;
      const rBR = index === multipliers.length - 1 ? cornerRadius : 0;
      context.beginPath();
      context.moveTo(left, top);
      context.lineTo(left + width, top);
      context.lineTo(left + width, top + height - rBR);
      if (rBR > 0) {
        context.quadraticCurveTo(left + width, top + height, left + width - rBR, top + height);
      }
      context.lineTo(left + rBL, top + height);
      if (rBL > 0) {
        context.quadraticCurveTo(left, top + height, left, top + height - rBL);
      }
      context.lineTo(left, top);
      context.closePath();
      context.fill();
    } else {
      context.fillRect(left, top, width, height);
    }
    context.fillStyle = '#ffffff';
    context.font = '12px Inter, system-ui';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    const cellCenterY = MULTIPLIER_LINE_Y + (BOARD_HEIGHT - MULTIPLIER_LINE_Y) / 2;
    context.fillText(`${multiplier}x`, x + binWidth / 2, cellCenterY);
  });

  if (ball) {
    context.fillStyle = '#fbbf24';
    context.beginPath();
    context.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
    context.fill();
  }
};
