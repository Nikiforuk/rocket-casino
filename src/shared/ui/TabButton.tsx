import styles from './TabButton.module.scss';

interface TabButtonProps {
  icon?: string;
  text?: string;
}

export default function TabButton({ icon, text }: TabButtonProps) {
  return (
    <>
      <button className={styles.button}>
        {icon && <img className={styles.icon} src={icon} alt="tab-icon" />}
        <p className={styles.text}>{text}</p>
      </button>
    </>
  );
}
