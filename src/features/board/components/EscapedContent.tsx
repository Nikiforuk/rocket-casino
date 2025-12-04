import styles from './TruckGame.module.scss';
import cityImg from '../../../assets/images/city.png';
import roadImg from '../../../assets/images/road.png';
import truckImg from '../../../assets/images/truck.png';
import winImg from '../../../assets/images/win.png';

export default function EscapedContent() {
  return (
    <>
      <img src={cityImg} alt="City" className={styles.cityBackground} />
      <img src={roadImg} alt="Road" className={styles.roadBackground} />
      <img src={truckImg} alt="Truck" className={styles.truck} />
      <div className={styles.winOverlay}>
        <img src={winImg} alt="Win" className={styles.winImage} />
      </div>
    </>
  );
}
