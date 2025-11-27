import styles from './Auth.module.scss';
import SignupForm from '../features/auth/components/SignupForm';

export default function Signup() {
  return (
    <div className={styles.container}>
      <SignupForm />
    </div>
  );
}
