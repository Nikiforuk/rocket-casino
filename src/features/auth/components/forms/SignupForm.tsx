import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import styles from './Auth.module.scss';
import { ROUTES } from '../../../../app/routes';
import { GRADIENTS } from '../../../../styles/gradients';
import Button from '../../../../ui/Button';
import Input from '../../../../ui/Input';
import { useAuthSession } from '../../hooks/useAuthSession';
import { useSignUp } from '../../hooks/useSignUp';
import { signUpSchema } from '../../schemas/signUpSchema';
import type { SignUpFormData } from '../../types/auth';
import AuthErrorBlock from '../AuthErrorBlock';
import AuthFieldBox from '../AuthFieldBox';
import AuthFooter from '../AuthFooter';
import AuthHeader from '../AuthHeader';

export default function SignUpForm() {
  useAuthSession();
  const { isLoading, errorMessage, handleSignUp } = useSignUp();
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
      <AuthHeader />
      <div className={styles.fields}>
        <AuthFieldBox<SignUpFormData>
          name="username"
          control={control}
          errors={errors}
          renderInput={(field) => (
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
        <AuthFieldBox<SignUpFormData>
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
        <AuthFieldBox<SignUpFormData>
          name="password"
          control={control}
          errors={errors}
          renderInput={(field) => (
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
      </div>
      {errorMessage && <AuthErrorBlock errorMessage={errorMessage} />}
      <Button
        text={isLoading ? 'Loading...' : 'Sign Up'}
        border="none"
        borderRadius="8px"
        height="36px"
        background={GRADIENTS.greenToBlue}
        type="submit"
      />
      <AuthFooter path={ROUTES.SIGNIN} textLink={'Already have an account? Login'} />
    </form>
  );
}
