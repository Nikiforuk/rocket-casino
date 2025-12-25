import styles from './BonusSystem.module.scss';
import presentIcon from '../../../../assets/icons/present.svg';
import timeIcon from '../../../../assets/icons/time.svg';
import { GRADIENTS } from '../../../../styles/gradients';
import Button from '../../../../ui/Button';
import { useBonusSystem } from '../../hooks/useBonusSystem';

export default function BonusSystem() {
  const { formattedTime, canClaim, claimBonus, isClaiming } = useBonusSystem();

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.gradientBlock}>
          <img className={styles.gradientBlock_icon} src={presentIcon} alt="present-icon" />
        </div>
        <div className={styles.top_infoBlock}>
          <p className={styles.top_infoBlock_firstText}>Claim Bonus</p>
          <p className={styles.top_infoBlock_secondText}>Free money every minute</p>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.rows}>
          <p className={styles.rows_name}>Next claim:</p>
          <div className={styles.rows_box}>
            <img className={styles.rows_box_icon} src={timeIcon} alt="time-icon" />
            <p className={styles.rows_box_time}>{formattedTime}</p>
          </div>
        </div>
        <div className={styles.rows}>
          <p className={styles.rows_name}>Amount:</p>
          <p className={styles.rows_priceTag}>$10</p>
        </div>
      </div>
      <Button
        border="1px solid rgba(49, 65, 88, 0.1)"
        type="button"
        height="36px"
        background={GRADIENTS.greenToGreen}
        text={isClaiming ? 'Claiming...' : canClaim ? 'Claim Now!' : 'Wait...'}
        borderRadius="8px"
        onClick={claimBonus}
        disabled={!canClaim || isClaiming}
      />
    </div>
  );
}
