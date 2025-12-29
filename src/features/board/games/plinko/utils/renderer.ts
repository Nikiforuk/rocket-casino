import type { Peg } from './pegLayout';
import type { Ball } from './physics';
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  PEG_RADIUS,
  MULTIPLIER_LINE_Y,
  BALL_RADIUS,
} from '../constants/plinko';

const COLORS = {
  blue100: '#8EC5FF',
  blue200: '#51A2FF',
  blue300: '#2B7FFF',
  blue500: '#155DFC',
  green100: '#00BC7D',
  green200: '#00D492',
  green600: '#05DF72',
  purple100: '#C27AFF',
  purple200: '#9810FA',
  red100: '#FF6467',
  red200: '#D4183D',
  gold200: '#edc34e',
  gold300: '#F0B100',
  gray700: '#1D293D',
  gray900: '#0F172B',
};

const NEON_BLUE = 'rgba(43, 127, 255, 0.8)';
const NEON_BLUE_SOFT = 'rgba(81, 162, 255, 0.5)';
const NEON_CYAN = 'rgba(0, 212, 146, 0.8)';

let backgroundImage: HTMLImageElement | null = null;
let backgroundLoaded = false;

const loadBackgroundImage = () => {
  if (backgroundImage) return;
  backgroundImage = new Image();
  backgroundImage.onload = () => {
    backgroundLoaded = true;
  };
  backgroundImage.src = '/src/assets/images/plinko-bg.png';
};

loadBackgroundImage();

const activePegs = new Map<string, number>();

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
  const context = canvas.getContext('2d');
  if (!context) return;
  context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

  context.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

  if (backgroundLoaded && backgroundImage) {
    context.drawImage(backgroundImage, 0, 0, BOARD_WIDTH, BOARD_HEIGHT);
  } else {
    const bgGradient = context.createLinearGradient(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
    bgGradient.addColorStop(0, COLORS.gray900);
    bgGradient.addColorStop(0.5, '#0d1829');
    bgGradient.addColorStop(1, '#1a1040');
    context.fillStyle = bgGradient;
    context.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
  }

  context.strokeStyle = 'rgba(43, 127, 255, 0.3)';
  context.lineWidth = 2;
  context.strokeRect(2, 2, BOARD_WIDTH - 4, BOARD_HEIGHT - 4);

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

  pegs.forEach((peg) => {
    const pegKey = `${peg.x}-${peg.y}`;
    const isActive = activePegs.has(pegKey);

    if (isActive) {
      const glowIntensity = 1 - (now - (activePegs.get(pegKey) || now)) / 300;
      context.save();
      context.shadowColor = NEON_CYAN;
      context.shadowBlur = 15 * glowIntensity;
      context.fillStyle = COLORS.green200;
      context.beginPath();
      context.arc(peg.x, peg.y, PEG_RADIUS + 1, 0, Math.PI * 2);
      context.fill();
      context.restore();

      context.save();
      context.globalAlpha = 0.4 * glowIntensity;
      context.strokeStyle = NEON_CYAN;
      context.lineWidth = 2;
      context.beginPath();
      context.arc(peg.x, peg.y, PEG_RADIUS + 6, 0, Math.PI * 2);
      context.stroke();
      context.restore();
    }

    const pegGradient = context.createRadialGradient(
      peg.x - 2,
      peg.y - 2,
      0,
      peg.x,
      peg.y,
      PEG_RADIUS,
    );
    pegGradient.addColorStop(0, isActive ? COLORS.green200 : '#ffffff');
    pegGradient.addColorStop(1, isActive ? COLORS.green100 : '#c0c0c0');
    context.fillStyle = pegGradient;
    context.beginPath();
    context.arc(peg.x, peg.y, PEG_RADIUS, 0, Math.PI * 2);
    context.fill();
  });

  const binWidth = BOARD_WIDTH / multipliers.length;
  const cornerRadius = 14;

  const colorFor = (m: number): { bg: string; glow: string } => {
    if (m === 0) return { bg: '#1a1a2e', glow: 'rgba(100, 100, 100, 0.3)' };
    if (m >= 50) return { bg: COLORS.purple200, glow: 'rgba(152, 16, 250, 0.6)' };
    if (m >= 10) return { bg: COLORS.red200, glow: 'rgba(212, 24, 61, 0.5)' };
    if (m >= 5) return { bg: COLORS.gold300, glow: 'rgba(240, 177, 0, 0.5)' };
    if (m >= 2) return { bg: COLORS.blue300, glow: 'rgba(43, 127, 255, 0.4)' };
    if (m >= 1) return { bg: COLORS.green100, glow: 'rgba(0, 188, 125, 0.4)' };
    return { bg: '#2d3748', glow: 'rgba(100, 100, 100, 0.2)' };
  };

  multipliers.forEach((multiplier, index) => {
    const x = index * binWidth;
    const isActive = activeMultiplierIndex === index;
    const colors = colorFor(multiplier);

    const left = x + 2;
    const baseTop = MULTIPLIER_LINE_Y;
    const pressOffset = isActive ? multiplierPressOffset : 0;
    const top = baseTop + pressOffset;
    const width = binWidth - 4;
    const height = BOARD_HEIGHT - MULTIPLIER_LINE_Y - 2 - pressOffset;

    if (isActive) {
      context.save();
      context.shadowColor = colors.glow;
      context.shadowBlur = 20;
      context.restore();
    }

    const cellGradient = context.createLinearGradient(left, top, left, top + height);
    if (isActive) {
      cellGradient.addColorStop(0, COLORS.green200);
      cellGradient.addColorStop(1, COLORS.green100);
    } else {
      cellGradient.addColorStop(0, colors.bg);
      cellGradient.addColorStop(1, shadeColor(colors.bg, -20));
    }
    context.fillStyle = cellGradient;

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

    context.fillStyle = multiplier === 0 ? '#666' : '#ffffff';
    context.font = 'bold 12px Inter, system-ui';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    const cellCenterY = top + height / 2;
    const displayText = multiplier === 0 ? '0x' : `${multiplier}x`;
    context.fillText(displayText, x + binWidth / 2, cellCenterY);
  });

  if (ball) {
    let nearPeg = false;
    for (const peg of pegs) {
      const dx = ball.x - peg.x;
      const dy = ball.y - peg.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d <= BALL_RADIUS + PEG_RADIUS + 5) {
        nearPeg = true;
        break;
      }
    }

    const nearMultiplier = ball.y >= MULTIPLIER_LINE_Y - 20;

    context.save();
    if (nearPeg || nearMultiplier) {
      context.shadowColor = NEON_BLUE;
      context.shadowBlur = 25;
    } else {
      context.shadowColor = NEON_BLUE_SOFT;
      context.shadowBlur = 15;
    }

    const ballGradient = context.createRadialGradient(
      ball.x - BALL_RADIUS * 0.3,
      ball.y - BALL_RADIUS * 0.3,
      0,
      ball.x,
      ball.y,
      BALL_RADIUS,
    );
    ballGradient.addColorStop(0, COLORS.blue100);
    ballGradient.addColorStop(0.4, COLORS.blue200);
    ballGradient.addColorStop(0.8, COLORS.blue300);
    ballGradient.addColorStop(1, COLORS.blue500);

    context.fillStyle = ballGradient;
    context.beginPath();
    context.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
    context.fill();

    context.beginPath();
    const highlightGradient = context.createRadialGradient(
      ball.x - BALL_RADIUS * 0.4,
      ball.y - BALL_RADIUS * 0.4,
      0,
      ball.x - BALL_RADIUS * 0.2,
      ball.y - BALL_RADIUS * 0.2,
      BALL_RADIUS * 0.5,
    );
    highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
    highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    context.fillStyle = highlightGradient;
    context.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
    context.fill();

    context.restore();
  }
};

function shadeColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
  return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
}
