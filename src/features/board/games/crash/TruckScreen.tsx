import ActiveGameContent from './ActiveGameContent';
import CrashedContent from './CrashedContent';
import EscapedContent from './EscapedContent';
import Multiplier from './Multiplier';
import SplashScreen from './SplashScreen';
import styles from './TruckGame.module.scss';
import { EGameState } from '../../../../shared/types/truck';

interface TruckScreenProps {
  gameState: EGameState;
  currentMultiplier: number;
  isActive: boolean;
}

export default function TruckScreen({ gameState, currentMultiplier, isActive }: TruckScreenProps) {
  return (
    <>
      {(gameState === EGameState.Escaped || gameState === EGameState.Crashed) && (
        <div
          className={`${styles.resultTitle} ${gameState === EGameState.Escaped ? styles.resultTitle_win : styles.resultTitle_fail}`}
        >
          {gameState === EGameState.Escaped ? 'WIN' : 'FAIL'}
        </div>
      )}
      <div
        className={`${styles.screen} ${gameState === EGameState.Crashed ? styles.screen_crashed : gameState === EGameState.Idle ? styles.screen_idle : ''}`}
      >
        {gameState === EGameState.Idle && <SplashScreen />}
        {gameState !== EGameState.Idle && (
          <Multiplier gameState={gameState} currentMultiplier={currentMultiplier} />
        )}
        <div className={styles.gameContent}>
          {gameState === EGameState.Escaped && <EscapedContent />}
          {gameState === EGameState.Crashed && <CrashedContent />}
          {isActive && <ActiveGameContent gameState={gameState} />}
        </div>
      </div>
    </>
  );
}
