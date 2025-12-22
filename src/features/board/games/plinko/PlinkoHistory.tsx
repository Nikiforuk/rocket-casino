import styles from './PlinkoHistory.module.scss';
import { usePlinkoHistoryStore } from './store/historyStore';

export default function PlinkoHistory() {
  const entries = usePlinkoHistoryStore((s) => s.entries);
  return (
    <div className={styles.container}>
      <div className={styles.title}>PLINKO HISTORY</div>
      {entries.map((e) => (
        <div key={e.id} className={styles.item}>
          <div className={styles.flexbox}>
            <div className={styles.multiplier}>{e.multiplier}x</div>
            <div>{new Date(e.ts).toLocaleTimeString()}</div>
          </div>
          <div className={styles.win}>${e.win.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
}
