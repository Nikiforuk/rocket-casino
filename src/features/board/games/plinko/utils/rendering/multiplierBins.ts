import { COLORS, shadeColor, getMultiplierColors } from './colors';
import { BOARD_WIDTH, BOARD_HEIGHT, MULTIPLIER_LINE_Y } from '../../constants/plinko';

const CORNER_RADIUS = 14;

export const renderMultiplierBins = (
  ctx: CanvasRenderingContext2D,
  multipliers: number[],
  activeMultiplierIndex: number | null,
  multiplierPressOffset: number = 0,
) => {
  const binWidth = BOARD_WIDTH / multipliers.length;

  multipliers.forEach((multiplier, index) => {
    const x = index * binWidth;
    const isActive = activeMultiplierIndex === index;
    const colors = getMultiplierColors(multiplier);

    const left = x + 2;
    const baseTop = MULTIPLIER_LINE_Y;
    const pressOffset = isActive ? multiplierPressOffset : 0;
    const top = baseTop + pressOffset;
    const width = binWidth - 4;
    const height = BOARD_HEIGHT - MULTIPLIER_LINE_Y - 2 - pressOffset;

    if (isActive) {
      ctx.save();
      ctx.shadowColor = colors.glow;
      ctx.shadowBlur = 20;
      ctx.restore();
    }

    const cellGradient = ctx.createLinearGradient(left, top, left, top + height);
    if (isActive) {
      cellGradient.addColorStop(0, COLORS.green200);
      cellGradient.addColorStop(1, COLORS.green100);
    } else {
      cellGradient.addColorStop(0, colors.bg);
      cellGradient.addColorStop(1, shadeColor(colors.bg, -20));
    }
    ctx.fillStyle = cellGradient;

    if (index === 0 || index === multipliers.length - 1) {
      const rBL = index === 0 ? CORNER_RADIUS : 0;
      const rBR = index === multipliers.length - 1 ? CORNER_RADIUS : 0;
      ctx.beginPath();
      ctx.moveTo(left, top);
      ctx.lineTo(left + width, top);
      ctx.lineTo(left + width, top + height - rBR);
      if (rBR > 0) {
        ctx.quadraticCurveTo(left + width, top + height, left + width - rBR, top + height);
      }
      ctx.lineTo(left + rBL, top + height);
      if (rBL > 0) {
        ctx.quadraticCurveTo(left, top + height, left, top + height - rBL);
      }
      ctx.lineTo(left, top);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillRect(left, top, width, height);
    }

    ctx.fillStyle = multiplier === 0 ? '#666' : '#ffffff';
    ctx.font = 'bold 12px Inter, system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const cellCenterY = top + height / 2;
    const displayText = multiplier === 0 ? '0x' : `${multiplier}x`;
    ctx.fillText(displayText, x + binWidth / 2, cellCenterY);
  });
};
