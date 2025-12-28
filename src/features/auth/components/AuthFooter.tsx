import styles from './AuthFooter.module.scss';

interface AuthFooterProps {
  path: string;
  textLink: string;
}

export default function AuthFooter({ path, textLink }: AuthFooterProps) {
  return (
    <div className={styles.container}>
      <a href={path} className={styles.link}>
        {textLink}
      </a>
      <div className={styles.line} />
      <p className={styles.text}>Your account data is stored locally in your browser</p>
    </div>
  );
}
