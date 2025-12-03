import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

import styles from './Auth.module.scss';
import { ROUTES } from '../../../app/routes';
import rocketIcon from '../../../assets/icons/rocket.svg';
import { GRADIENTS } from '../../../shared/styles/gradients';
import type { SignUpFormData } from '../../../shared/types/auth';
import Button from '../../../shared/ui/Button';
import Input from '../../../shared/ui/Input';
import { useAuthSession } from '../hooks/useAuthSession';
import { useSignUp } from '../hooks/useSignUp';
import { signUpSchema } from '../schemas/signUpSchema';

export default function SignUpForm() {
  useAuthSession();
  const { loading, errorMessage, handleSignUp } = useSignUp();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    handleSignUp(data.username, data.email, data.password);
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
            name="username"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                labelText="Username"
                placeholder="Enter username"
                type="text"
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
          {errors.username && <p className={styles.errorBlock_text}>{errors.username.message}</p>}
        </div>
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
      {errorMessage && (
        <div className={styles.errorBlock}>
          <p className={styles.errorBlock_text}>{errorMessage}</p>
        </div>
      )}
      <Button
        text={loading ? 'Loading...' : 'Sign Up'}
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
      />

      <div className={styles.lower}>
        <a href={ROUTES.SIGNIN} className={styles.lower_link}>
          Already have an account? Login
        </a>
        <div className={styles.lower_line} />
        <p className={styles.lower_text}>Your account data is stored locally in your browser</p>
      </div>
    </form>
  );
}
