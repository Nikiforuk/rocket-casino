export const BOARD_WIDTH = 621;
export const BOARD_HEIGHT = 552;
export const PEG_RADIUS = 6;
export const BALL_RADIUS = Math.round(PEG_RADIUS * 1.5);
export const GRAVITY = 1800;
export const DAMPING = 0.995;
export const BOUNCE = 0.9;
export const MULTIPLIERS: number[] = [10, 5, 2, 1, 0.5, 1, 2, 5, 10];
export const MULTIPLIER_LINE_Y = BOARD_HEIGHT - 40;

export const PEG_ROWS: number[] = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const MULTIPLIER_COLORS: string[] = [
  '#ef4444',
  '#f59e0b',
  '#f59e0b',
  '#22c55e',
  '#60a5fa',
  '#22c55e',
  '#f59e0b',
  '#f59e0b',
  '#ef4444',
];
