import styles from './LeaderCard.module.scss';

interface LeaderCardProps {
  icon?: string;
  title?: string;
  sum?: string;
  currency?: string;
  persents?: string;
}

export default function LeaderCard({ icon, title, sum, currency, persents }: LeaderCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.sumGames}>
        <img src={icon} className={styles.sumGames_icon} alt="position-icon" />
        {/* <p className={styles.sumGames_position}>#4</p> */}
        <div>
          <h3 className={styles.sumGames_title}>{title}</h3>
          <p className={styles.sumGames_sum}>{sum}</p>
        </div>
      </div>
      <div className={styles.sumWin}>
        <b className={styles.sumWin_currency}>{currency}</b>
        <p className={styles.sumWin_percents}>{persents} win</p>
      </div>
    </div>
  );
}
