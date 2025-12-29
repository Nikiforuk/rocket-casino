import { COLORS } from './colors';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../../constants/plinko';

let backgroundImage: HTMLImageElement | null = null;
let backgroundLoaded = false;

export const loadBackgroundImage = () => {
  if (backgroundImage) return;
  backgroundImage = new Image();
  backgroundImage.onload = () => {
    backgroundLoaded = true;
  };
  backgroundImage.src = '/src/assets/images/plinko-bg.png';
};

loadBackgroundImage();

export const renderBackground = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

  if (backgroundLoaded && backgroundImage) {
    ctx.drawImage(backgroundImage, 0, 0, BOARD_WIDTH, BOARD_HEIGHT);
  } else {
    const bgGradient = ctx.createLinearGradient(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
    bgGradient.addColorStop(0, COLORS.gray900);
    bgGradient.addColorStop(0.5, '#0d1829');
    bgGradient.addColorStop(1, '#1a1040');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
  }

  ctx.strokeStyle = 'rgba(43, 127, 255, 0.3)';
  ctx.lineWidth = 2;
  ctx.strokeRect(2, 2, BOARD_WIDTH - 4, BOARD_HEIGHT - 4);
};
