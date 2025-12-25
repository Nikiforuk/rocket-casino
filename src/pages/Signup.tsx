import styles from './Auth.module.scss';
import SignUpForm from '../features/auth/components/forms/SignupForm';

export default function SignUp() {
  return (
    <div className={styles.container}>
      <SignUpForm />
    </div>
  );
}
