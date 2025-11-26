import React from 'react';

import styles from './InputAuth.module.scss';

interface InputAuthProps {
  label?: boolean;
  labelText?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputAuth({
  label = true,
  labelText,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
}: InputAuthProps) {
  return (
    <>
      {label ? <label className={styles.label}>{labelText}</label> : null}
      <input
        className={styles.input}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
}
