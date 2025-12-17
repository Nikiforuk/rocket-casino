import styles from './MinesGame.module.scss';
import MinesScreen from './MinesScreen';
import MinesSettings from './MinesSettings';

export default function MinesGame() {
  return (
    <div className={styles.container}>
      <div className={styles.compartments}>
        <MinesScreen />
        <MinesSettings />
      </div>
    </div>
  );
}
