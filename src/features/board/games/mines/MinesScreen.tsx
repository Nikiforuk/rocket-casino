import MineButton from './MineButton';
import styles from './MinesScreen.module.scss';

export default function MinesScreen() {
  const mine = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
  ];
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h3 className={styles.top_title}>Mines</h3>
        <div className={styles.top_labels}>
          <div className={styles.top_side}>
            <p className={styles.top_side_text}>Revealed:</p>
            <b className={styles.top_side_num}>1</b>
          </div>
          <div className={styles.top_side}>
            <p className={styles.top_side_text}>Multiplier:</p>
            <b className={`${styles.top_side_num} ${styles.top_side_num_secondColor}`}>1.10x</b>
          </div>
        </div>
      </div>
      <div className={styles.screen}>
        <div className={styles.mines}>
          {mine.map((_, i) => (
            <MineButton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
