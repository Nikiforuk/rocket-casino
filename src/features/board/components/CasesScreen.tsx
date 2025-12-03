import styles from './CasesGame.module.scss';
import caseImg from '../../../assets/images/case-game.png';

interface Item {
  emoji: string;
  name: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'gold';
  price?: string;
}

interface Props {
  items: Item[];
  offset: number;
  showSplash: boolean;
  reelRef?: React.RefObject<HTMLDivElement | null>;
  trackRef?: React.RefObject<HTMLDivElement | null>;
}

export default function CasesScreen({ items, offset, reelRef, trackRef, showSplash }: Props) {
  return (
    <>
      <div className={styles.screen}>
        {showSplash ? (
          <>
            <img src={caseImg} className={styles.screen_img} alt="case-image" />
            <p className={styles.screen_text}>Select a case and click Open to start</p>
          </>
        ) : (
          <>
            <div className={styles.reel} id="cases-reel" ref={reelRef}>
              <div
                className={styles.track}
                style={{ transform: `translateX(-${Math.round(offset)}px)` }}
                ref={trackRef}
              >
                {items.map((e, i) => (
                  <div
                    key={`${e.emoji}-${i}`}
                    className={`${styles.itemBox} ${styles[`rarity_${e.rarity}`]}`}
                    data-role="reel-item"
                  >
                    <span className={styles.itemEmoji}>{e.emoji}</span>
                    <span className={styles.itemLabel}>{e.name}</span>
                    <span className={styles.itemLabel}>{e.price}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.indicator} />
          </>
        )}
      </div>
    </>
  );
}
