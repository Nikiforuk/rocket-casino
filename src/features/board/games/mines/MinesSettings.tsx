import MinesCurrentGame from './MinesCurrentGame';
import MinesForm from './MinesForm';
import styles from './MinesSettings.module.scss';
import MinesTips from './MinesTips';

export default function MinesSettings() {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h3 className={styles.top_title}>Game Settings</h3>
      </div>
      <div className={styles.inner}>
        <MinesForm />
        <MinesCurrentGame />
        <MinesTips />
      </div>
    </div>
  );
}
