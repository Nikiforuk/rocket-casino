import styles from './CasesItems.module.scss';
import type CasesItem from './types/cases';

interface CasesItemsProps {
  item: CasesItem;
}

export default function CasesItems({ item }: CasesItemsProps) {
  return (
    <>
      {item && (
        <div className={`${styles.itemBox} ${styles[`rarity_${item.rarity}`]}`}>
          <span className={styles.itemEmoji}>{item.emoji}</span>
          <span className={styles.itemLabel}>{item.name}</span>
          <span className={styles.itemLabel}>{item.price}</span>
        </div>
      )}
    </>
  );
}
