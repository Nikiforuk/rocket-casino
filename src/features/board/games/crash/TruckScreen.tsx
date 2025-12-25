import TruckActiveGame from './TruckActiveGame';
import TruckCrashed from './TruckCrashed';
import TruckEscaped from './TruckEscaped';
import TruckMultiplier from './TruckMultiplier';
import styles from './TruckScreen.module.scss';
import TruckSplashScreen from './TruckSplashScreen';
import { EGameState } from './types/truck';

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
        {gameState === EGameState.Idle && <TruckSplashScreen />}
        {gameState !== EGameState.Idle && (
          <TruckMultiplier gameState={gameState} currentMultiplier={currentMultiplier} />
        )}
        <div className={styles.gameContent}>
          {gameState === EGameState.Escaped && <TruckEscaped />}
          {gameState === EGameState.Crashed && <TruckCrashed />}
          {isActive && <TruckActiveGame gameState={gameState} />}
        </div>
      </div>
    </>
  );
}
