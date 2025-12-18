import styles from './MineButton.module.scss';
// import diamongImg from '../../../../assets/icons/diamond.svg';
// import defeatImg from '../../../../assets/icons/mine.svg';

export default function MineButton() {
  return (
    <button
      className={`${styles.button} ${styles.buttonDiamond} ${styles.buttonDefeat}`}
      type="button"
    >
      {/* <img className={styles.gradientBlock_logo} src={diamongImg} alt="diamong-image" /> */}
      {/* <img className={styles.gradientBlock_logo} src={mineImg} alt="mine-image" /> */}
    </button>
  );
}
