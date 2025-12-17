import styles from './TruckGame.module.scss';
import { EGameState } from '../../../../shared/types/truck';
import { formatNumber } from '../../utils/numberHelpers';

interface MultiplierProps {
  gameState: EGameState;
  currentMultiplier: number;
}

export default function Multiplier({ gameState, currentMultiplier }: MultiplierProps) {
  return (
    <div
      className={`${styles.multiplier} ${gameState === EGameState.Crashed ? styles.multiplier_fail : gameState === EGameState.Escaped ? styles.multiplier_win : styles.multiplier_active}`}
    >
      {formatNumber(currentMultiplier)}
    </div>
  );
}
