import { BALL_RADIUS, PEG_RADIUS, MULTIPLIER_LINE_Y } from '../../constants/plinko';
import type { Peg } from '../pegLayout';
import type { Ball } from '../physics';
import { COLORS, NEON_BLUE, NEON_BLUE_SOFT } from './colors';

export const renderBall = (ctx: CanvasRenderingContext2D, ball: Ball, pegs: Peg[]) => {
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

  ctx.save();
  if (nearPeg || nearMultiplier) {
    ctx.shadowColor = NEON_BLUE;
    ctx.shadowBlur = 25;
  } else {
    ctx.shadowColor = NEON_BLUE_SOFT;
    ctx.shadowBlur = 15;
  }

  const ballGradient = ctx.createRadialGradient(
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

  ctx.fillStyle = ballGradient;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  const highlightGradient = ctx.createRadialGradient(
    ball.x - BALL_RADIUS * 0.4,
    ball.y - BALL_RADIUS * 0.4,
    0,
    ball.x - BALL_RADIUS * 0.2,
    ball.y - BALL_RADIUS * 0.2,
    BALL_RADIUS * 0.5,
  );
  highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
  highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = highlightGradient;
  ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
};

export const renderSimpleBall = (ctx: CanvasRenderingContext2D, ball: Ball) => {
  const ballGradient = ctx.createRadialGradient(
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

  ctx.fillStyle = ballGradient;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
  ctx.fill();
};
