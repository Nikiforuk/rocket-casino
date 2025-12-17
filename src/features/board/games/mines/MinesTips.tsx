import styles from './MinesTips.module.scss';

export default function MinesTips() {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <span>💡</span>
        <p className={styles.top_title}>Tips</p>
      </div>
      <ul className={styles.list}>
        <li className={styles.list_item}>• More mines = higher multiplier</li>
        <li className={styles.list_item}>Cash out anytime to secure wins</li>
        <li className={styles.list_item}>Each safe tile increases payout</li>
        <li className={styles.list_item}>One mine ends the game</li>
      </ul>
    </div>
  );
}
