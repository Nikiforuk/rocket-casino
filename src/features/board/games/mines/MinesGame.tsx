import styles from './MinesGame.module.scss';
import MinesScreen from './MinesScreen';
import MinesSettings from './MinesSettings';
import MinesSplashScreen from './MinesSplashScreen';
import { EMinesState } from '../../../../shared/types/mines';
import { useMinesStore } from '../../mineStore/minesStore';

export default function MinesGame() {
  const { state } = useMinesStore();
  return (
    <div className={styles.container}>
      <div className={styles.compartments}>
        {state === EMinesState.IDLE ? <MinesSplashScreen /> : <MinesScreen />}
        <MinesSettings />
      </div>
    </div>
  );
}
