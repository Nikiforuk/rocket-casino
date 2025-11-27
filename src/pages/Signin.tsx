import styles from './Auth.module.scss';
import SigninForm from '../features/auth/components/SigninForm';

export default function Signin() {
  return (
    <div className={styles.container}>
      <SigninForm />
    </div>
  );
}
