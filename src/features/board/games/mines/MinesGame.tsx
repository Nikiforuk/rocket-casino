import styles from './MinesGame.module.scss';
// import MinesScreen from './MinesScreen';
import MinesSettings from './MinesSettings';
import MinesSplashScreen from './MinesSplashScreen';

export default function MinesGame() {
  return (
    <div className={styles.container}>
      <div className={styles.compartments}>
        <MinesSplashScreen />
        {/* <MinesScreen /> */}
        <MinesSettings />
      </div>
    </div>
  );
}
