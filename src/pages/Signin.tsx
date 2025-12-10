import styles from './Auth.module.scss';
import SignInForm from '../features/auth/components/SignInForm';

export default function SignIn() {
  return (
    <div className={styles.container}>
      <SignInForm />
    </div>
  );
}
