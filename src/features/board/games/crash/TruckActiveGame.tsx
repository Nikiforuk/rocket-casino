import styles from './TruckActiveGame.module.scss';
import cityImg from '../../../../assets/images/city.png';
import roadImg from '../../../../assets/images/road.png';
import truckImg from '../../../../assets/images/truck.png';
import { EGameState } from './types/truck';

interface TruckActiveGameProps {
  gameState: EGameState;
}

export default function TruckActiveGame({ gameState }: TruckActiveGameProps) {
  return (
    <>
      <img src={cityImg} alt="City" className={styles.cityBackground} />
      <img src={roadImg} alt="Road" className={styles.roadBackground} />
      <img
        src={truckImg}
        alt="Truck"
        className={`${styles.truck} ${gameState === EGameState.Accelerating ? styles.truck_accelerating : styles.truck_moving}`}
      />
    </>
  );
}
