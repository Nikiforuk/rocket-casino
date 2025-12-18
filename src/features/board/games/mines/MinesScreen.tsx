import MineButton from './MineButton';
import MinesErrorBlock from './MinesErrorBlock';
import styles from './MinesScreen.module.scss';
import { MINES_CONFIG } from '../../../../shared/constants/config';
import { EMinesTileStatus } from '../../../../shared/types/mines';
import { EMinesState } from '../../../../shared/types/mines';
import { useGameController } from '../../hooks/useGameController';
import { useMultiplier } from '../../hooks/useMultiplier';
import { useMinesStore } from '../../mineStore/minesStore';

export default function MinesScreen() {
  const { grid, state } = useMinesStore();
  const { multiplier } = useMultiplier();
  const { onReveal } = useGameController();
  const revealed = grid.filter((t) => t.status === EMinesTileStatus.SAFE).length;
  const color =
    multiplier < 1.5 ? 'var(--green-200)' : multiplier < 3 ? 'var(--yellow-200)' : 'var(--red-200)';
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h3 className={styles.top_title}>Mines</h3>
        <div className={styles.top_labels}>
          <div className={styles.top_side}>
            <p className={styles.top_side_text}>Revealed:</p>
            <b className={styles.top_side_num}>{revealed}</b>
          </div>
          <div className={styles.top_side}>
            <p className={styles.top_side_text}>Multiplier:</p>
            <b
              className={`${styles.top_side_num} ${styles.top_side_num_secondColor}`}
              style={{
                color,
                transition: `color ${MINES_CONFIG.animations.multiplierDurationMs}ms ease`,
              }}
            >
              {multiplier.toFixed(6)}x
            </b>
          </div>
        </div>
      </div>
      <div className={styles.screen}>
        <div className={`${styles.mines} ${state === EMinesState.LOST ? styles.shake : ''}`}>
          {grid.map((tile) => (
            <MineButton
              key={tile.index}
              status={tile.status}
              onClick={() => onReveal(tile.index)}
            />
          ))}
        </div>
      </div>
      <MinesErrorBlock />
    </div>
  );
}
