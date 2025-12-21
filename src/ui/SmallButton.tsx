import type { ButtonHTMLAttributes } from 'react';

import styles from './SmallButton.module.scss';
import loginIcon from '../../assets/icons/login-gray.svg';
import settingsIcon from '../../assets/icons/settings.svg';
import walletIcon from '../../assets/icons/wallet.svg';

interface SmallButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: 'wallet' | 'login' | 'settings';
  width?: string;
  height?: string;
  widthIcon?: string;
  heightIcon?: string;
  background?: string;
  border?: string;
  borderRadius?: string;

  onClick?: () => void;
}

const iconMap = {
  wallet: walletIcon,
  login: loginIcon,
  settings: settingsIcon,
} as const;

export default function SmallButton({
  text,
  icon,
  widthIcon,
  width,
  heightIcon,
  background,
  border,
  height,
  borderRadius,
  type = 'button',
  onClick,
  ...props
}: SmallButtonProps) {
  return (
    <button
      type={type}
      className={styles.button}
      onClick={onClick}
      style={{ background, border, borderRadius, height, width }}
      {...props}
    >
      {icon && (
        <img
          style={{ width: widthIcon, height: heightIcon }}
          src={iconMap[icon]}
          alt={`${icon}-icon`}
        />
      )}
      {text && <b className={styles.text}>{text}</b>}
    </button>
  );
}
