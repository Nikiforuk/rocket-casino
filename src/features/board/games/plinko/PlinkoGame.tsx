import { usePlinkoGame } from './hooks/usePlinkoGame';
import styles from './PlinkoGame.module.scss';
import PlinkoHistory from './PlinkoHistory';
import PlinkoLaunch from './PlinkoLaunch';
import PlinkoScreen from './PlinkoScreen';

export default function PlinkoGame() {
  const game = usePlinkoGame();
  return (
    <div className={styles.container}>
      <aside className={styles.aside}>
        <PlinkoLaunch
          onDrop={game.drop}
          onReset={game.resetBalance}
          disabledDrop={game.engine.state.balls.some((b) => !b.locked)}
          controlsLocked={game.started}
          ballsCount={game.ballsCount}
          setBalls={game.setBalls}
          risk={game.risk}
          increaseRisk={game.increaseRisk}
          decreaseRisk={game.decreaseRisk}
          lines={game.lines}
          setLines={game.setLines}
          bet={game.bet}
        />
      </aside>
      <div className={styles.game}>
        <PlinkoScreen winnings={game.winnings} canvasRef={game.engine.canvasRef} />
        <PlinkoHistory />
      </div>
    </div>
  );
}
