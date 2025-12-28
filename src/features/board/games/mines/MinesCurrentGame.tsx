import styles from './MinesCurrentGame.module.scss';
import { useMinesStore } from './store/minesStore';
import ghostIcon from '../../../../assets/images/ghost.png';
import { formatNumber } from '../../utils/numberHelpers';

export default function MinesCurrentGame() {
  const { betAmount, currentValue, safeTilesLeft } = useMinesStore();
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h4 className={styles.top_title}>Current Game</h4>
        <img className={styles.top_icon} src={ghostIcon} alt="bandit-icon" />
      </div>
      <div className={styles.rows}>
        <div className={styles.rows_row}>
          <p className={styles.rows_row_text}>Bet Amount:</p>
          <b className={styles.rows_row_sum}>${betAmount.toFixed(2)}</b>
        </div>
        <div className={styles.rows_row}>
          <p className={styles.rows_row_text}>Current Value:</p>
          <b className={`${styles.rows_row_sum} ${styles.rows_row_sum_greenColor}`}>
            ${formatNumber(currentValue)}
          </b>
        </div>
        <div className={styles.rows_line} />
        <div className={styles.rows_row}>
          <p className={styles.rows_row_text}>Safe Tiles Left:</p>
          <b className={`${styles.rows_row_sum} ${styles.rows_row_sum_blueColor}`}>
            {safeTilesLeft}
          </b>
        </div>
      </div>
    </div>
  );
}
