import type { ButtonHTMLAttributes, CSSProperties } from 'react';

import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  textStyle?: CSSProperties;
  icon?: string;
  background?: string;
  border?: string;
  height?: string;
  borderRadius?: string;
  width?: string;
}

export default function Button({
  text,
  textStyle,
  icon,
  background,
  border,
  height,
  borderRadius,
  width,
  type = 'button',
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={styles.button}
      onClick={onClick}
      style={{ background, border, borderRadius, width, height }}
      {...props}
    >
      {icon && <img src={icon} className={styles.icon} alt="button-icon" />}
      {text && <p style={textStyle}>{text}</p>}
    </button>
  );
}
