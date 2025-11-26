import styles from './Login.module.scss';
import rocketIcon from '../../../assets/icons/rocket.svg';
import { GRADIENTS } from '../../../shared/styles/gradients';
import Button from '../../../shared/ui/Button';
import InputAuth from '../../../shared/ui/InputAuth';

export default function Login() {
  return (
    <form className={styles.container}>
      <div className={styles.gradientBlock}>
        <img className={styles.gradientBlock_logo} src={rocketIcon} alt="logo-image" />
      </div>
      <div className={styles.top}>
        <h1 className={styles.top_title}>Rocket Casino</h1>
        <p className={styles.top_text}>Welcome back!</p>
      </div>
      <div className={styles.fields}>
        <div className={styles.fields_box}>
          <InputAuth labelText="Username" placeholder="Enter username" type="text" name="name" />
        </div>
        <div className={styles.fields_box}>
          <InputAuth labelText="Email" placeholder="Enter email" type="email" name="email" />
        </div>
        <div className={styles.fields_box}>
          <InputAuth
            labelText="Password"
            placeholder="Enter password"
            type="password"
            name="password"
          />
        </div>
      </div>
      <Button
        icon={true}
        text="Login"
        border="none"
        borderRadius="8px"
        height="36px"
        background={GRADIENTS.greenToBlue}
        type="submit"
        onClick={() => null}
      />
      <div className={styles.lower}>
        <a href="#" className={styles.lower_link}>
          Don&apos;t have an account? Register
        </a>
        <div className={styles.lower_line} />
        <p className={styles.lower_text}>Your account data is stored locally in your browser</p>
      </div>
    </form>
  );
}
