export interface TruckGameData {
  amount: string;
}

export enum EGameState {
  Idle = 'idle',
  Accelerating = 'accelerating',
  Moving = 'moving',
  Crashed = 'crashed',
  Escaped = 'escaped',
}
