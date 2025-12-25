import type { Peg } from './pegLayout';
import type { Ball } from './physics';
import { BALL_RADIUS } from '../constants/plinko';

export const clampBallInsideTriangle = (ball: Ball, pegs: Peg[]) => {
  const uniqueRowY = Array.from(new Set(pegs.map((peg) => Math.round(peg.y)))).sort(
    (a, b) => a - b,
  );
  if (uniqueRowY.length < 2) return;

  const topY = uniqueRowY[0];
  const baseY = uniqueRowY[uniqueRowY.length - 1];
  const topRow = pegs.filter((peg) => Math.round(peg.y) === topY);
  const baseRow = pegs.filter((peg) => Math.round(peg.y) === baseY);
  const minXTop = Math.min(...topRow.map((peg) => peg.x));
  const maxXTop = Math.max(...topRow.map((peg) => peg.x));
  const minXBase = Math.min(...baseRow.map((peg) => peg.x));
  const maxXBase = Math.max(...baseRow.map((peg) => peg.x));

  const progress = Math.max(0, Math.min(1, (ball.y - topY) / (baseY - topY)));
  const leftEdge = minXTop + (minXBase - minXTop) * progress + BALL_RADIUS;
  const rightEdge = maxXTop + (maxXBase - maxXTop) * progress - BALL_RADIUS;
  if (ball.x < leftEdge) ball.x = leftEdge;
  if (ball.x > rightEdge) ball.x = rightEdge;
};
