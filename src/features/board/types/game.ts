export enum GameKey {
  Truck = 'truck',
  Cases = 'cases',
  Mines = 'mines',
}

export const isGameKey = (value: string | null): value is GameKey =>
  value === GameKey.Truck || value === GameKey.Cases || value === GameKey.Mines;
