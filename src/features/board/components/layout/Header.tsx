import { useSearchParams } from 'react-router-dom';

import styles from './Header.module.scss';
import gobletIcon from '../../../../assets/icons/goblet-white.svg';
import { GRADIENTS } from '../../../../styles/gradients';
import SmallButton from '../../../../ui/SmallButton';
import { useSignOut } from '../../../auth/hooks/useSignOut';
import { useAuthStore } from '../../../auth/store/authStore';
import { useModalStore } from '../../../modal/store/modalStore';
import { useBoardStore } from '../../store/boardStore';
import { GameKey } from '../../types/game';
import { formatNumber } from '../../utils/numberHelpers';

export default function Header() {
  const handleSignOut = useSignOut();
  const username = useAuthStore((state) => state.getUsername());
  const { balance } = useBoardStore();
  const setOpen = useModalStore((state) => state.setOpen);
  const [searchParams] = useSearchParams();
  const gameParam = searchParams.get('game');
  const game =
    gameParam === GameKey.Mines ||
    gameParam === GameKey.Cases ||
    gameParam === GameKey.Truck ||
    gameParam === GameKey.Plinko
      ? gameParam
      : GameKey.Truck;
  return (
    <header className={styles.container}>
      <div
        className={`${styles.content} ${game === GameKey.Mines || game === GameKey.Plinko ? styles.contentMines : ''}`}
      >
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
            onClick={() => setOpen(true)}
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
