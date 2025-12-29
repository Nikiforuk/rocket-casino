import styles from './PlinkoHistory.module.scss';
import { usePlinkoHistoryStore } from './store/historyStore';
import { formatNumber } from '../../utils/numberHelpers';

export default function PlinkoHistory() {
  const entries = usePlinkoHistoryStore((s) => s.entries);
  return (
    <div className={styles.container}>
      <div className={styles.title}>PLINKO HISTORY</div>
      {entries.map((e) => {
        if (!e || !e.id) return null;
        return (
          <div key={e.id} className={styles.item}>
            <div className={styles.flexbox}>
              <div className={styles.multiplier}>
                {(e.ballsCount ?? 1) > 1 ? `${e.ballsCount}x ` : ''}
                {formatNumber(e.totalMultiplier, 1)}x
              </div>
              <div>{e.ts ? new Date(e.ts).toLocaleTimeString() : ''}</div>
            </div>
            <div className={styles.win}>${formatNumber(e.totalWin, 2)}</div>
          </div>
        );
      })}
    </div>
  );
}
