import styles from './TruckCrashed.module.scss';
import policeCar1Img from '../../../../assets/images/car-police-1.png';
import policeCar2Img from '../../../../assets/images/car-police-2.png';
import roadImg from '../../../../assets/images/road.png';
import truckImg from '../../../../assets/images/truck.png';

export default function TruckCrashed() {
  return (
    <>
      <img src={roadImg} alt="Road" className={styles.roadBackground} />
      <img src={truckImg} alt="Truck" className={styles.truck} />
      <img
        src={policeCar1Img}
        alt="Police Car 1"
        className={`${styles.policeCar} ${styles.policeCar_left}`}
      />
      <img
        src={policeCar2Img}
        alt="Police Car 2"
        className={`${styles.policeCar} ${styles.policeCar_right}`}
      />
    </>
  );
}
