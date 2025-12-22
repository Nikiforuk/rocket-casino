import { memo } from 'react';

import styles from './Leaderboard.module.scss';
import LeaderCard from './LeaderCard';
import gobletIcon from '../../../../assets/icons/goblet-gradient.svg';
import { useLeaderboard } from '../../hooks/useLeaderboard';

function Leaderboard() {
  const { players, currentUserRank } = useLeaderboard();

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
        {players.length > 0 ? (
          players.map((player) => (
            <LeaderCard
              key={player.id}
              rank={player.rank}
              username={player.username}
              gamesPlayed={player.gamesPlayed}
              totalWon={player.totalWon}
              winPercentage={player.winPercentage}
              isCurrentUser={player.isCurrentUser}
              isTopPlayer={player.rank <= 3}
              isWinner={player.isWinner}
            />
          ))
        ) : (
          <p className={styles.noPlayers}>No players yet</p>
        )}
      </div>
      <div className={styles.line} />
      <div className={styles.rank}>
        <p className={styles.rank_text}>
          Your rank: {currentUserRank ? `#${currentUserRank}` : 'N/A'}
        </p>
      </div>
    </div>
  );
}

export default memo(Leaderboard);
