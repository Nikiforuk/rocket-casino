import styles from './MineButton.module.scss';
import defeatIcon from '../../../../assets/icons/defeat.svg';
import diamondIcon from '../../../../assets/icons/diamond.svg';
import { EMinesTileStatus } from '../../../../shared/types/mines';

export default function MineButton({
  status,
  onClick,
}: {
  status: EMinesTileStatus;
  onClick: () => void;
}) {
  const isSafe = status === EMinesTileStatus.SAFE;
  const isMine = status === EMinesTileStatus.MINE;
  const isHidden = status === EMinesTileStatus.HIDDEN;
  const cls = `${styles.button} ${isSafe ? styles.buttonDiamond : ''} ${isMine ? styles.buttonDefeat : ''}`;
  return (
    <button className={cls} type="button" onClick={onClick} disabled={!isHidden}>
      {isSafe && <img className={styles.icon} src={diamondIcon} alt="diamond-icon" />}
      {isMine && <img className={styles.icon} src={defeatIcon} alt="defeat-icon" />}
    </button>
  );
}
