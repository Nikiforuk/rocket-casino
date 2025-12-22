import styles from './PlinkoLaunch.module.scss';
import Button from '../../../../ui/Button';

export default function PlinkoLaunch() {
  return (
    <div className={styles.container}>
      <Button border="none" text="Drop Ball ($1)" />
      <Button border="none" text="Reset Balance" />
    </div>
  );
}
