import styles from './MinesErrorBlock.module.scss';
import blastIcon from '../../../../assets/images/blast.png';
import { GRADIENTS } from '../../../../shared/styles/gradients';
import Button from '../../../../shared/ui/Button';

export default function MinesErrorBlock() {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <img className={styles.inner_icon} src={blastIcon} alt="blast-icon" />
        <p className={styles.inner_text}>You hit a mine!</p>
      </div>
      <Button
        text="New Game"
        border="none"
        borderRadius="8px"
        width="200px"
        height="36px"
        background={GRADIENTS.casesLegendary}
        type="submit"
      />
    </div>
  );
}
