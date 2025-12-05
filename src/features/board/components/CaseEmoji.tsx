import styles from './CaseEmogi.module.scss';
import type { Rarity } from '../../../shared/types/cases';

export interface CaseEmojiProps {
  id: number;
  emoji: string;
  rarity: Rarity;
  caseType: 'animal' | 'space' | 'food' | 'sports';
}

export default function CaseEmoji({ emoji, rarity }: CaseEmojiProps) {
  return (
    <>
      <div className={`${styles.container} ${styles[rarity]}`}>
        <span className={styles.emoji}>{emoji}</span>
      </div>
    </>
  );
}
