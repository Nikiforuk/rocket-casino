import styles from './CaseButton.module.scss';

interface CaseButtonProps {
  key?: number;
  icon?: string;
  text?: string;
  price?: string;

  onClick: () => void;
}

export default function CaseButton({ icon, text, price, onClick }: CaseButtonProps) {
  return (
    <button onClick={onClick} type="button" className={styles.button}>
      <img className={styles.button_icon} src={icon} alt="case" />
      <span className={styles.button_text}>{text}</span>
      <span className={styles.button_price}>{price}</span>
    </button>
  );
}
