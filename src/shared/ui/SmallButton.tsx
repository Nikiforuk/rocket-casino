import type { ButtonHTMLAttributes, CSSProperties } from 'react';

import styles from './SmallButton.module.scss';
import loginIcon from '../../assets/icons/login-gray.svg';
import settingsIcon from '../../assets/icons/settings.svg';
import walletIcon from '../../assets/icons/wallet.svg';

interface SmallButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  textStyle?: CSSProperties;
  icon?: 'wallet' | 'login' | 'settings';
  widthIcon?: string;
  heightIcon?: string;
  width?: string;
  background?: string;
  border?: string;
  height?: string;
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
  textStyle,
  widthIcon,
  heightIcon,
  background,
  border,
  width,
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
      style={{ background, border, borderRadius, width, height }}
      {...props}
    >
      {icon && (
        <img
          style={{ width: widthIcon, height: heightIcon }}
          src={iconMap[icon]}
          alt={`${icon}-icon`}
        />
      )}

      {text && <b style={textStyle}>{text}</b>}
    </button>
  );
}
