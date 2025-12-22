import styles from './PlinkoSplashScreen.module.scss';
import plinkoIcon from '../../../../assets/images/plinko.png';

export default function PlinkoSplashScreen() {
  return (
    <div className={styles.container}>
      <div className={styles.splashScreen}>
        <img className={styles.splashScreen_icon} src={plinkoIcon} alt="plinko-logo" />
        <p className={styles.splashScreen_text}>Drop the Ball</p>
      </div>
    </div>
  );
}
