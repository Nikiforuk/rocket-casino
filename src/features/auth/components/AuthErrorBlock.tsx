import styles from './AuthErrorBlock.module.scss';

interface AuthErrorBlockProps {
  errorMessage: string;
}

export default function AuthErrorBlock({ errorMessage }: AuthErrorBlockProps) {
  return (
    <div className={styles.container}>
      <p className={styles.text}>{errorMessage}</p>
    </div>
  );
}
