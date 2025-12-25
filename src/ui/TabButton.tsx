import styles from './TabButton.module.scss';

interface TabButtonProps {
  icon?: string;
  text?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}

export default function TabButton({ icon, text, onClick, active, disabled }: TabButtonProps) {
  return (
    <>
      <button
        className={`${styles.button} ${active ? styles.button_active : ''}`}
        onClick={onClick}
        aria-selected={active}
        disabled={disabled}
      >
        {icon && <img className={styles.icon} src={icon} alt="tab-icon" />}
        <p className={styles.text}>{text}</p>
      </button>
    </>
  );
}
