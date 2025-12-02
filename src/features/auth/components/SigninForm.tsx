import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import styles from './Auth.module.scss';
import { ROUTES } from '../../../app/routes';
import rocketIcon from '../../../assets/icons/rocket.svg';
import { GRADIENTS } from '../../../shared/styles/gradients';
import type { SignInFormData } from '../../../shared/types/auth';
import Button from '../../../shared/ui/Button';
import Input from '../../../shared/ui/Input';
import { useAuthSession } from '../hooks/useAuthSession';
import { useSignIn } from '../hooks/useSignIn';
import { signInSchema } from '../schemas/signInSchema';

export default function SignInForm() {
  useAuthSession();
  const { loading, errorMessage, handleSignIn } = useSignIn();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignInFormData) => {
    handleSignIn(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <div className={styles.gradientBlock}>
        <img className={styles.gradientBlock_logo} src={rocketIcon} alt="logo-image" />
      </div>
      <div className={styles.top}>
        <h1 className={styles.top_title}>Rocket Casino</h1>
        <p className={styles.top_text}>Welcome back!</p>
      </div>
      <div className={styles.fields}>
        <div className={styles.fields_box}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                labelText="Email"
                placeholder="Enter email"
                type="email"
                name="email"
                background="#0F172B"
                border="1px solid #314158"
                padding="9.5px 12px"
                borderRadius="8px"
                textStyle={{
                  fontSize: '14px',
                  lineHeight: '100%',
                  letterSpacing: '-0.15px',
                  fontWeight: '400',
                }}
              />
            )}
          />
          {errors.email && <p className={styles.errorBlock_text}>{errors.email.message}</p>}
        </div>
        <div className={styles.fields_box}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                labelText="Password"
                placeholder="Enter password"
                type="password"
                name="password"
                background="#0F172B"
                border="1px solid #314158"
                padding="9.5px 12px"
                borderRadius="8px"
                textStyle={{
                  fontSize: '14px',
                  lineHeight: '100%',
                  letterSpacing: '-0.15px',
                  fontWeight: '400',
                }}
              />
            )}
          />
          {errors.password && <p className={styles.errorBlock_text}>{errors.password.message}</p>}
        </div>
      </div>
      {errorMessage ? (
        <div className={styles.errorBlock}>
          <p className={styles.errorBlock_text}>{errorMessage}</p>
        </div>
      ) : null}
      <Button
        icon={'login'}
        text={loading ? 'Loading...' : 'Login'}
        textStyle={{
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '20px',
          letterSpacing: '-0.15px',
        }}
        border="none"
        borderRadius="8px"
        height="36px"
        background={GRADIENTS.greenToBlue}
        type="submit"
        onClick={handleSubmit(onSubmit)}
      />
      <div className={styles.lower}>
        <a href={ROUTES.SIGNUP} className={styles.lower_link}>
          Don&apos;t have an account? Register
        </a>
        <div className={styles.lower_line} />
        <p className={styles.lower_text}>Your account data is stored locally in your browser</p>
      </div>
    </form>
  );
}
