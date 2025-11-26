import React from 'react';

import styles from './InputField.module.scss';

interface InputFieldProps {
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <>
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
