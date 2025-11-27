import styles from './Auth.module.scss';
import SignUpForm from '../features/auth/components/SignupForm';

export default function SignUp() {
  return (
    <div className={styles.container}>
      <SignUpForm />
    </div>
  );
}
