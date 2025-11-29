import styles from './Modal.module.scss';
import crossIcon from '../../../assets/icons/cross.svg';
import { GRADIENTS } from '../../../shared/styles/gradients';
import Button from '../../../shared/ui/Button';
import Input from '../../../shared/ui/Input';
import { useAuthStore } from '../../auth/authStore';
import { useBoardStore } from '../../board/boardStore';

export default function Modal() {
  const username = useAuthStore((state) => state.getUsername());
  const { balance, setIsModal } = useBoardStore();
  return (
    <div onClick={() => setIsModal(false)} className={styles.overlay}>
      <div onClick={(e) => e.stopPropagation()} className={styles.container}>
        <button onClick={() => setIsModal(false)} className={styles.closeBtn}>
          <img src={crossIcon} className={styles.closeBtn_icon} alt="cross-icon" />
        </button>
        <div className={styles.top}>
          <h6 className={styles.top_title}>Profile Settings</h6>
          <p className={styles.top_subtitle}>Customize your profile and manage your account</p>
        </div>
        <form className={styles.form}>
          <Input
            icon={true}
            labelText="Username"
            placeholder={`Your name: ${username}`}
            type="text"
            name="username"
            background="#1D293D"
            border="1px solid #314158"
            padding="9.5px 12px"
            borderRadius="8px"
            textStyle={{
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: '-0.15px',
              fontWeight: '400',
            }}
          />
        </form>
        <div className={styles.infoBlock}>
          <p className={styles.infoBlock_text}>4/20</p>
          <p className={styles.infoBlock_text}>characters</p>
          <div className={styles.stats}>
            <h4 className={styles.stats_title}>Account Stats</h4>
            <div className={styles.row}>
              <div className={styles.row_column}>
                <p className={styles.row_column_firstText}>Balance</p>
                <p className={styles.row_column_secondText}>${balance.toFixed(2)}</p>
              </div>
              <div className={styles.row_column}>
                <p className={styles.row_column_firstText}>Games Played</p>
                <p className={styles.row_column_secondText}>2</p>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.row_column}>
                <p className={styles.row_column_firstText}>Total Wagered</p>
                <p className={styles.row_column_secondText}>$20.00</p>
              </div>
              <div className={styles.row_column}>
                <p className={styles.row_column_firstText}>Total Won</p>
                <p className={styles.row_column_secondText}>$45.54</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.groupButtons}>
          <Button
            text="Save Changes"
            textStyle={{
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '-0.15px',
            }}
            border="none"
            borderRadius="8px"
            height="36px"
            background={GRADIENTS.blueToPurple}
            type="button"
            onClick={() => null}
          />
          <Button
            text="Reset Account"
            textStyle={{
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '-0.15px',
            }}
            border="none"
            borderRadius="8px"
            height="36px"
            background="#D4183D"
            type="button"
            onClick={() => null}
          />
        </div>
      </div>
    </div>
  );
}
