import styles from './CasinoLoader.module.scss';
import wrapperStyles from './CasinoLoaderWrapper.module.scss';

type LoaderVariant = 'tabList' | 'bonus' | 'header' | 'leaderboard' | 'game' | 'modal' | 'none';

interface CasinoLoaderProps {
  variant?: LoaderVariant;
}

const variantClassMap: Record<LoaderVariant, string> = {
  tabList: wrapperStyles.tabListLoader,
  bonus: wrapperStyles.bonusLoader,
  header: wrapperStyles.headerLoader,
  leaderboard: wrapperStyles.leaderboardLoader,
  game: wrapperStyles.gameLoader,
  modal: wrapperStyles.modalLoader,
  none: '',
};

export default function CasinoLoader({ variant = 'none' }: CasinoLoaderProps) {
  const wrapperClass = variantClassMap[variant];

  return (
    <div className={wrapperClass}>
      <div className={`${styles.loaderWrapper} ${styles.small}`}>
        <div className={styles.chips}>
          <div className={`${styles.chip} ${styles.chip1}`}>
            <div className={styles.chipInner} />
          </div>
          <div className={`${styles.chip} ${styles.chip2}`}>
            <div className={styles.chipInner} />
          </div>
          <div className={`${styles.chip} ${styles.chip3}`}>
            <div className={styles.chipInner} />
          </div>
        </div>
        <div className={styles.glow} />
      </div>
    </div>
  );
}
