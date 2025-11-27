import styles from './Login.module.scss';
import rocketIcon from '../../../assets/icons/rocket.svg';
import { GRADIENTS } from '../../../shared/styles/gradients';
import Button from '../../../shared/ui/Button';
import Input from '../../../shared/ui/Input';

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
          <Input
            labelText="Username"
            placeholder="Enter username"
            type="text"
            name="username"
            background="#0F172B"
            border="1px solid #314158"
            padding="9.5px 12px"
            borderRadius="8px"
            textStyle={{
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: '-0.15px',
              fontWeight: '400',
            }}
          />
        </div>
        <div className={styles.fields_box}>
          <Input
            labelText="Email"
            placeholder="Enter email"
            type="email"
            name="email"
            background="#0F172B"
            border="1px solid #314158"
            padding="9.5px 12px"
            borderRadius="8px"
            textStyle={{
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: '-0.15px',
              fontWeight: '400',
            }}
          />
        </div>
        <div className={styles.fields_box}>
          <Input
            labelText="Password"
            placeholder="Enter password"
            type="password"
            name="password"
            background="#0F172B"
            border="1px solid #314158"
            padding="9.5px 12px"
            borderRadius="8px"
            textStyle={{
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: '-0.15px',
              fontWeight: '400',
            }}
          />
        </div>
      </div>
      <Button
        icon={true}
        text="Login"
        textStyle={{
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '20px',
          letterSpacing: '-0.15px',
        }}
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
