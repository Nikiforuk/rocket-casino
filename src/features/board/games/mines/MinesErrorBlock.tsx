import { useGameController } from './hooks/useGameController';
import styles from './MinesErrorBlock.module.scss';
import { useMinesStore } from './store/minesStore';
import { EMinesState } from './types/mines';
import blastIcon from '../../../../assets/images/blast.png';
import { GRADIENTS } from '../../../../styles/gradients';
import Button from '../../../../ui/Button';

export default function MinesErrorBlock() {
  const { state } = useMinesStore();
  const { onNewGame } = useGameController();
  if (state !== EMinesState.LOST) return null;
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
        type="button"
        onClick={onNewGame}
      />
    </div>
  );
}
