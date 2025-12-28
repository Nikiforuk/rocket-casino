import CasesItems from './CasesItems';
import styles from './CasesResult.module.scss';
import type CasesItem from './types/cases';

interface CasesResultProps {
  winningItem: CasesItem | null;
}

export default function CasesResult({ winningItem }: CasesResultProps) {
  return (
    <>
      {winningItem && (
        <div className={`${styles.result} ${styles[`result_${winningItem.rarity}`]}`}>
          <div className={styles.result_card}>
            <p className={styles.result_title}>You won</p>
            <CasesItems item={winningItem} />
          </div>
        </div>
      )}
    </>
  );
}
