import styles from './Auth.module.scss';
import Login from '../features/auth/components/Login';

export default function Auth() {
  return (
    <div className={styles.container}>
      <Login />
    </div>
  );
}
