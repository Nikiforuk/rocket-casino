import styles from './TruckMultiplier.module.scss';
import { EGameState } from './types/truck';
import { formatNumber } from '../../utils/numberHelpers';

interface TruckMultiplierProps {
  gameState: EGameState;
  currentMultiplier: number;
}

export default function TruckMultiplier({ gameState, currentMultiplier }: TruckMultiplierProps) {
  return (
    <div
      className={`${styles.multiplier} ${gameState === EGameState.Crashed ? styles.multiplier_fail : gameState === EGameState.Escaped ? styles.multiplier_win : styles.multiplier_active}`}
    >
      {formatNumber(currentMultiplier)}
    </div>
  );
}
