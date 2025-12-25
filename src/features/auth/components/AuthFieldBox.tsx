import type { ReactElement } from 'react';

import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
  type ControllerRenderProps,
} from 'react-hook-form';

import styles from './AuthFieldBox.module.scss';

interface AuthFieldBoxProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errors?: FieldErrors<T>;
  renderInput: (field: ControllerRenderProps<T, Path<T>>) => ReactElement;
}

export default function AuthFieldBox<T extends FieldValues>({
  name,
  control,
  errors,
  renderInput,
}: AuthFieldBoxProps<T>) {
  const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <div className={styles.container}>
      <Controller name={name} control={control} render={({ field }) => renderInput(field)} />
      {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
    </div>
  );
}
