import styles from './Auth.module.scss';
import SignInForm from '../features/auth/components/forms/SigninForm';

export default function SignIn() {
  return (
    <div className={styles.container}>
      <SignInForm />
    </div>
  );
}
