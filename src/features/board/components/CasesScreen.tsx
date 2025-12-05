import caseImg from '../../../assets/images/case-game.png';
import styles from '../styles/CasesItems.module.scss';
import screen from '../styles/CasesScreen.module.scss';

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
      <div className={screen.screen}>
        {showSplash ? (
          <>
            <img src={caseImg} className={screen.screen_img} alt="case-image" />
            <p className={screen.screen_text}>Select a case and click Open to start</p>
          </>
        ) : (
          <>
            <div className={screen.reel} id="cases-reel" ref={reelRef}>
              <div
                className={screen.track}
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
            <div className={screen.indicator} />
          </>
        )}
      </div>
    </>
  );
}
