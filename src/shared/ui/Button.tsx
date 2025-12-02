import type { ButtonHTMLAttributes, CSSProperties } from 'react';

import styles from './Button.module.scss';
import boxIcon from '../../assets/icons/box.svg';
import loginIcon from '../../assets/icons/login-white.svg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  textStyle?: CSSProperties;
  icon?: 'login' | 'case';
  background?: string;
  border?: string;
  height?: string;
  borderRadius?: string;
}

export default function Button({
  text,
  textStyle,
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
      {icon === 'login' && <img src={loginIcon} className={styles.icon} alt="auth-icon" />}
      {icon === 'case' && <img src={boxIcon} className={styles.icon} alt="auth-icon" />}
      {text && <p style={textStyle}>{text}</p>}
    </button>
  );
}
