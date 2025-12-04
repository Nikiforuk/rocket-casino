import styles from './LeaderCard.module.scss';
import { formatNumber } from '../utils/numberHelpers';

interface LeaderCardProps {
  rank: number;
  username: string;
  gamesPlayed: number;
  totalWon: number;
  winPercentage: number;
  isCurrentUser: boolean;
  isTopPlayer: boolean;
  isWinner: boolean;
}

export default function LeaderCard({
  rank,
  username,
  gamesPlayed,
  totalWon,
  winPercentage,
  isCurrentUser,
}: LeaderCardProps) {
  return (
    <div className={`${styles.container} ${isCurrentUser ? styles.container_highlighted : ''}`}>
      <div className={styles.sumGames}>
        <p className={styles.sumGames_position}>#{rank}</p>
        <div>
          <h3 className={styles.sumGames_title}>{username}</h3>
          <p className={styles.sumGames_sum}>{gamesPlayed} games</p>
        </div>
      </div>
      <div className={styles.sumWin}>
        <b className={styles.sumWin_currency}>${formatNumber(totalWon)}</b>
        <p className={styles.sumWin_percents}>{winPercentage}% win</p>
      </div>
    </div>
  );
}
