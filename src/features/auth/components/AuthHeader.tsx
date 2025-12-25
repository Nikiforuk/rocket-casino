import styles from './AuthHeader.module.scss';
import logoIcon from '../../../assets/icons/rocket.svg';

export default function AuthHeader() {
  return (
    <>
      <div className={styles.container}>
        <img className={styles.logo} src={logoIcon} alt="logo-image" />
      </div>
      <div className={styles.content}>
        <h1 className={styles.content_title}>Rocket Casino</h1>
        <p className={styles.content_text}>Welcome back!</p>
      </div>
    </>
  );
}
