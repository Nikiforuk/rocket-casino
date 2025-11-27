import styles from './Auth.module.scss';
import SignInForm from '../features/auth/components/SigninForm';

export default function Signin() {
  return (
    <div className={styles.container}>
      <SignInForm />
    </div>
  );
}
