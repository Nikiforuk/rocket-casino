export enum EMinesState {
  IDLE = 'IDLE',
  PLAYING = 'PLAYING',
  LOST = 'LOST',
  ENDED = 'ENDED',
}

export enum EMinesTileStatus {
  HIDDEN = 'HIDDEN',
  SAFE = 'SAFE',
  MINE = 'MINE',
}

export interface MinesTile {
  index: number;
  status: EMinesTileStatus;
}

export type MinesGrid = MinesTile[];

export interface MinesGameData {
  amount: string;
}

export interface MinesStartResponse {
  game_id: string;
}

export interface MinesRevealResponse {
  mined: boolean;
  revealed_safe_count: number;
  current_multiplier?: number;
}

export interface MinesCashoutResponse {
  payout_amount: number;
}
