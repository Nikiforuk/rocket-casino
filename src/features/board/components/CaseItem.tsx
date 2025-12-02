import styles from './CaseItem.module.scss';
import type { Rarity } from '../../../shared/types/cases';

export interface CaseItemProps {
  id: number;
  emoji: string;
  rarity: Rarity;
  caseType: 'animal' | 'space' | 'food' | 'sports';
}

export default function CaseItem({ emoji, rarity }: CaseItemProps) {
  return (
    <>
      <div className={`${styles.container} ${styles[rarity]}`}>
        <span className={styles.emoji}>{emoji}</span>
      </div>
    </>
  );
}
