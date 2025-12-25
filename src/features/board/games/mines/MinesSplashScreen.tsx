import styles from './/MinesSplashScreen.module.scss';
import MinesErrorBlock from './MinesErrorBlock';
import amazingIcon from '../../../../assets/images/amazing.png';
import moneyBombIcon from '../../../../assets/images/money-bomb.png';

export default function MinesSplashScreen() {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h3 className={styles.top_title}>Mines</h3>
        <img className={styles.top_icon} src={amazingIcon} alt="amazing-icon" />
      </div>
      <div className={styles.splashScreen}>
        <img className={styles.splashScreen_icon} src={moneyBombIcon} alt="money-bomb-icon" />
        <p className={styles.splashScreen_text}>Place a bet to start</p>
      </div>
      <MinesErrorBlock />
    </div>
  );
}
