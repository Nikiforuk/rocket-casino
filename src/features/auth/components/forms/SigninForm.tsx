import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import styles from './Auth.module.scss';
import { ROUTES } from '../../../../app/routes';
import loginIcon from '../../../../assets/icons/login-white.svg';
import { GRADIENTS } from '../../../../shared/styles/gradients';
import type { SignInFormData } from '../../../../shared/types/auth';
import Button from '../../../../shared/ui/Button';
import Input from '../../../../shared/ui/Input';
import { useAuthSession } from '../../hooks/useAuthSession';
import { useSignIn } from '../../hooks/useSignIn';
import { signInSchema } from '../../schemas/signInSchema';
import AuthErrorBlock from '../AuthErrorBlock';
import AuthFieldBox from '../AuthFieldBox';
import AuthFooter from '../AuthFooter';
import AuthHeader from '../AuthHeader';

export default function SignInForm() {
  useAuthSession();
  const { isLoading, errorMessage, handleSignIn } = useSignIn();
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
      <AuthHeader />
      <div className={styles.fields}>
        <AuthFieldBox<SignInFormData>
          name="email"
          control={control}
          errors={errors}
          renderInput={(field) => (
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

        <AuthFieldBox<SignInFormData>
          name="password"
          control={control}
          errors={errors}
          renderInput={(field) => (
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
      </div>
      {errorMessage ? <AuthErrorBlock errorMessage={errorMessage} /> : null}
      <Button
        icon={loginIcon}
        text={isLoading ? 'Loading...' : 'Login'}
        border="none"
        borderRadius="8px"
        height="36px"
        background={GRADIENTS.greenToBlue}
        type="submit"
        onClick={handleSubmit(onSubmit)}
      />
      <AuthFooter path={ROUTES.SIGNUP} textLink="Don't have an account? Register" />
    </form>
  );
}
