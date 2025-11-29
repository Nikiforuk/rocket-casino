import styles from './TruckGame.module.scss';
import policeCar1Img from '../../../assets/images/car-police-1.png';
import policeCar2Img from '../../../assets/images/car-police-2.png';
import cityImg from '../../../assets/images/city.png';
import roadImg from '../../../assets/images/road.png';
import truckImg from '../../../assets/images/truck.png';
import winImg from '../../../assets/images/win.png';

type GameState = 'idle' | 'accelerating' | 'moving' | 'crashed' | 'escaped';

interface GameScreenProps {
  gameState: GameState;
  currentMultiplier: number;
  isActive: boolean;
}

export default function GameScreen({ gameState, currentMultiplier, isActive }: GameScreenProps) {
  return (
    <>
      {(gameState === 'escaped' || gameState === 'crashed') && (
        <div
          className={`${styles.resultTitle} ${gameState === 'escaped' ? styles.resultTitle_win : styles.resultTitle_fail}`}
        >
          {gameState === 'escaped' ? 'WIN' : 'FAIL'}
        </div>
      )}
      <div
        className={`${styles.screen} ${gameState === 'crashed' ? styles.screen_crashed : gameState === 'idle' ? styles.screen_idle : ''}`}
      >
        {gameState === 'idle' && (
          <div className={styles.splashScreen}>
            <img src={truckImg} alt="Truck" className={styles.splashTruck} />
            <div className={styles.splashText}>
              <p className={styles.splashTitle}>Press Start to Launch</p>
              <p className={styles.splashSubtitle}>Try the game</p>
            </div>
          </div>
        )}
        {gameState !== 'idle' && (
          <div
            className={`${styles.multiplier} ${gameState === 'crashed' ? styles.multiplier_fail : gameState === 'escaped' ? styles.multiplier_win : styles.multiplier_active}`}
          >
            {currentMultiplier.toFixed(2)}
          </div>
        )}
        <div className={styles.gameContent}>
          {gameState === 'escaped' && (
            <>
              <img src={cityImg} alt="City" className={styles.cityBackground} />
              <img src={roadImg} alt="Road" className={styles.roadBackground} />
              <img src={truckImg} alt="Truck" className={styles.truck} />
              <div className={styles.winOverlay}>
                <img src={winImg} alt="Win" className={styles.winImage} />
              </div>
            </>
          )}
          {gameState === 'crashed' && (
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
          )}
          {isActive && (
            <>
              <img src={cityImg} alt="City" className={styles.cityBackground} />
              <img src={roadImg} alt="Road" className={styles.roadBackground} />
              <img
                src={truckImg}
                alt="Truck"
                className={`${styles.truck} ${gameState === 'accelerating' ? styles.truck_accelerating : styles.truck_moving}`}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
