import styles from './Leaderboard.module.scss';
import LeaderCard from './LeaderCard';
import gobletIcon from '../../../assets/icons/goblet-gradient.svg';
import medalIcon from '../../../assets/icons/medal.svg';

export default function Leaderboard() {
  const players = [1, 2, 3];
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.gradientBlock}>
          <img src={gobletIcon} className={styles.gradientBlock_icon} alt="goblet-icon" />
        </div>
        <div className={styles.sideBlock}>
          <h3 className={styles.sideBlock_title}>Leaderboard</h3>
          <p className={styles.sideBlock_subtitle}>Top players</p>
        </div>
      </div>
      <div className={styles.players}>
        {players.map((_, i) => (
          <LeaderCard
            key={i}
            icon={medalIcon}
            title="RocketKing"
            sum="250 games"
            currency="$5000"
            persents="53%"
          />
        ))}
      </div>
      <div className={styles.line} />
      <div className={styles.rank}>
        <p className={styles.rank_text}>Your rank: #1</p>
      </div>
    </div>
  );
}
