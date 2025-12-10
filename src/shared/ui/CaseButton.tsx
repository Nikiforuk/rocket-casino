import styles from './CaseButton.module.scss';

interface CaseButtonProps {
  key?: number;
  icon?: string;
  text?: string;
  price?: string;
  disabled?: boolean;
  active?: boolean;

  onClick: () => void;
}

export default function CaseButton({
  icon,
  text,
  price,
  disabled,
  active,
  onClick,
}: CaseButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
      className={`${styles.button} ${active ? styles.button_active : ''} ${disabled ? styles.disabled : ''}`}
      aria-selected={active}
    >
      {icon && <img className={styles.button_icon} src={icon} alt="case-icon" />}
      {text && <span className={styles.button_text}>{text}</span>}
      {price && <span className={styles.button_price}>{price}</span>}
    </button>
  );
}
