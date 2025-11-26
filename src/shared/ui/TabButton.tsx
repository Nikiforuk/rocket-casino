import styles from './TabButton.module.scss';

interface TabButtonProps {
  text?: string;
}

export default function TabButton({ text }: TabButtonProps) {
  return (
    <>
      <button className={styles.button}>{text}</button>
    </>
  );
}
