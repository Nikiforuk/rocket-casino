import styles from './Header.module.scss';
import gobletIcon from '../../../assets/icons/goblet-white.svg';
import { GRADIENTS } from '../../../shared/styles/gradients';
import SmallButton from '../../../shared/ui/SmallButton';
import { useSignOut } from '../../auth/hooks/useSignOut';

export default function Header() {
  const handleSignOut = useSignOut();
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <div className={styles.leftBlock}>
          <div className={styles.gradientBlock}>
            <img src={gobletIcon} className={styles.gradientBlock_icon} alt="goblet-white" />
          </div>
          <p className={styles.leftBlock_text}>Rocket Casino</p>
        </div>
        <div className={styles.rightBlock}>
          <SmallButton
            text="$1007.34"
            textStyle={{
              color: 'white',
              fontWeight: 700,
              fontSize: '16px',
              lineHeight: '24px',
              letterSpacing: '-0.31px',
            }}
            icon="wallet"
            background={GRADIENTS.overlayMix}
            border="1px solid rgba(0, 122, 85, 0.5)"
            borderRadius="10px"
            width="135px"
            height="42px"
            widthIcon="16px"
            heightIcon="16px"
          />
          <SmallButton
            icon="settings"
            background="transparent"
            border="none"
            width="36px"
            height="36px"
            widthIcon="16px"
            heightIcon="16px"
          />
          <SmallButton
            text="Logout"
            textStyle={{
              color: '#CAD5E2',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '-0.15px',
            }}
            icon="login"
            background="rgba(29, 41, 61, 0.5)"
            border="1px solid rgba(49, 65, 88, 1)"
            borderRadius="10px"
            width="98px"
            height="32px"
            widthIcon="16px"
            heightIcon="16px"
            onClick={handleSignOut}
          />
        </div>
      </div>
    </header>
  );
}
