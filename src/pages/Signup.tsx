import styles from './Auth.module.scss';
import SignUpForm from '../features/auth/components/SignUpForm';

export default function SignUp() {
  return (
    <div className={styles.container}>
      <SignUpForm />
    </div>
  );
}
