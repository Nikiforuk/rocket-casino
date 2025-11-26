import type { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';
import loginIcon from '../../assets/icons/login-white.svg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: boolean;
  background?: string;
  border?: string;
  height?: string;
  borderRadius?: string;
}

export default function Button({
  text,
  icon,
  background,
  border,
  height,
  borderRadius,
  type = 'button',
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={styles.button}
      onClick={onClick}
      style={{ background, border, borderRadius, height }}
      {...props}
    >
      {icon && <img src={loginIcon} className={styles.icon} alt="auth-icon" />}
      {text && <span>{text}</span>}
    </button>
  );
}
