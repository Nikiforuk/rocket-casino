import styles from './MinesCurrentGame.module.scss';

export default function MinesCurrentGame() {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Current Game</h4>
      <div className={styles.rows}>
        <div className={styles.rows_row}>
          <p className={styles.rows_row_text}>Bet Amount:</p>
          <b className={styles.rows_row_sum}>$10.00</b>
        </div>
        <div className={styles.rows_row}>
          <p className={styles.rows_row_text}>Current Value:</p>
          <b className={`${styles.rows_row_sum} ${styles.rows_row_sum_greenColor}`}>$101.41</b>
        </div>
        <div className={styles.rows_line} />
        <div className={styles.rows_row}>
          <p className={styles.rows_row_text}>Safe Tiles Left:</p>
          <b className={`${styles.rows_row_sum} ${styles.rows_row_sum_blueColor}`}>22</b>
        </div>
      </div>
    </div>
  );
}
