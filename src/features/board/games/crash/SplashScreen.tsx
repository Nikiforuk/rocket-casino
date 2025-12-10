import styles from './TruckGame.module.scss';
import truckImg from '../../../../assets/images/truck.png';

export default function TruckSplashScreen() {
  return (
    <div className={styles.splashScreen}>
      <img src={truckImg} alt="Truck" className={styles.splashTruck} />
      <div className={styles.splashText}>
        <p className={styles.splashTitle}>Press Start to Launch</p>
        <p className={styles.splashSubtitle}>Try the game</p>
      </div>
    </div>
  );
}
