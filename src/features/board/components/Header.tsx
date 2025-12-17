import { useSearchParams } from 'react-router-dom';

import styles from './Header.module.scss';
import gobletIcon from '../../../assets/icons/goblet-white.svg';
import { GRADIENTS } from '../../../shared/styles/gradients';
import SmallButton from '../../../shared/ui/SmallButton';
import { useAuthStore } from '../../auth/authStore';
import { useSignOut } from '../../auth/hooks/useSignOut';
import { useBoardStore } from '../boardStore';
import { formatNumber } from '../utils/numberHelpers';

export default function Header() {
  const handleSignOut = useSignOut();
  const username = useAuthStore((state) => state.getUsername());
  const { balance, setIsModal } = useBoardStore();
  const [searchParams] = useSearchParams();
  const game = searchParams.get('game') ?? 'truck';
  return (
    <header className={styles.container}>
      <div className={`${styles.content} ${game === 'mines' ? styles.contentMines : ''}`}>
        <div className={styles.leftBlock}>
          <div className={styles.gradientBlock}>
            <img src={gobletIcon} className={styles.gradientBlock_icon} alt="goblet-white" />
          </div>
          <p className={styles.leftBlock_text}>{username}</p>
        </div>
        <div className={styles.rightBlock}>
          <SmallButton
            text={`$${formatNumber(balance)}`}
            icon="wallet"
            background={GRADIENTS.overlayMix}
            borderRadius="10px"
            border="1px solid rgba(0, 122, 85, 0.5)"
            width="140px"
            height="42px"
            widthIcon="16px"
            heightIcon="16px"
          />
          <SmallButton
            icon="settings"
            background="rgba(29, 41, 61, 0.5)"
            borderRadius="50%"
            border="1px solid rgba(0, 122, 85, 0.5)"
            width="42px"
            height="42px"
            widthIcon="18px"
            heightIcon="18px"
            onClick={() => setIsModal(true)}
          />
          <SmallButton
            text="Logout"
            icon="login"
            background="rgba(29, 41, 61, 0.5)"
            borderRadius="10px"
            border="1px solid rgba(0, 122, 85, 0.5)"
            width="100px"
            height="42px"
            widthIcon="16px"
            heightIcon="16px"
            onClick={handleSignOut}
          />
        </div>
      </div>
    </header>
  );
}
