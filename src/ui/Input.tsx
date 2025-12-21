import React from 'react';

import styles from './Input.module.scss';
import userIcon from '../../assets/icons/profile.svg';

interface InputProps {
  icon?: boolean;
  label?: boolean;
  labelText?: string;
  name?: string;
  type?: string;
  placeholder?: string | null;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;

  textStyle?: React.CSSProperties;
  background?: string;
  padding?: string;
  border?: string;
  borderRadius?: string;
  width?: string;
  height?: string;
  className?: string;
  style?: React.CSSProperties;
  cssVars?: Record<`--${string}`, string | number>;
}

export default function Input({
  icon,
  label = true,
  labelText,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled,
  textStyle,
  background,
  padding,
  border,
  borderRadius,
  width,
  height,
  className,
  style,
  cssVars,
}: InputProps) {
  return (
    <>
      {(icon || label) && (
        <div className={styles.elements}>
          {icon && <img src={userIcon} className={styles.elements_icon} alt="profile-icon" />}
          {label && <label className={styles.label}>{labelText}</label>}
        </div>
      )}
      <input
        className={`${styles.input} ${className || ''}`}
        name={name}
        type={type}
        placeholder={placeholder ? placeholder : ''}
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={{
          background,
          padding,
          border,
          borderRadius,
          width,
          height,
          ...textStyle,
          ...style,
          ...cssVars,
        }}
      />
    </>
  );
}
