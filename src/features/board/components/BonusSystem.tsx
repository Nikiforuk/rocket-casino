import styles from './BonusSystem.module.scss';
import presentIcon from '../../../assets/icons/present.svg';
import timeIcon from '../../../assets/icons/time.svg';
import { GRADIENTS } from '../../../shared/styles/gradients';
import Button from '../../../shared/ui/Button';

export default function BonusSystem() {
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
            <p className={styles.rows_box_time}>0:53</p>
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
        text="Claim Now!"
        borderRadius="8px"
        textStyle={{
          fontSize: '14px',
          lineHeight: '20px',
          letterSpacing: '-0.15px',
          fontWeight: 500,
          color: 'white',
        }}
      />
    </div>
  );
}
