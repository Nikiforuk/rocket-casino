import styles from './CasesRarityGuide.module.scss';
import { rarityGuide } from './constants/cases';

export default function CasesRarityGuide() {
  return (
    <div className={styles.rarityGuide}>
      <div>
        <h4 className={styles.rarityGuide_title}>Rarity Guide</h4>
      </div>
      <div className={styles.rarityGuide_net}>
        {rarityGuide.map((item) => (
          <div key={item.id} className={styles.rarityGuide_column}>
            <div
              style={{ background: item.circleColor }}
              className={styles.rarityGuide_column_circle}
            />
            <p className={styles.rarityGuide_column_text}>{item.text}</p>
            <p className={styles.rarityGuide_column_percents}>{item.percents}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
