import styles from './PlinkoGame.module.scss';
import PlinkoLaunch from './PlinkoLaunch';
import PlinkoScreen from './PlinkoScreen';
// import PlinkoSplashScreen from './PlinkoSplashScreen';

export default function PlinkoGame() {
  return (
    <div className={styles.container}>
      {/* <PlinkoSplashScreen /> */}
      <PlinkoScreen />
      <PlinkoLaunch />
    </div>
  );
}
