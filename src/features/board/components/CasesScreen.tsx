import styles from './CasesGame.module.scss';
import caseImg from '../../../assets/images/case-game.png';

export default function CasesScreen() {
  return (
    <div className={styles.screen}>
      <img src={caseImg} className={styles.screen_img} alt="case-image" />
      <p className={styles.screen_text}>Select a case and click Open to start</p>
    </div>
  );
}
