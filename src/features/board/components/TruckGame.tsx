import BetForm from './BetForm';
import styles from './TruckGame.module.scss';
import TruckScreen from './TruckScreen';
import { EGameState } from '../../../shared/types/board';
import { useTruckGameLogic } from '../hooks/useTruckGameLogic';

export default function TruckGame() {
  const {
    gameState,
    currentMultiplier,
    isBetting,
    isActive,
    isCashOutActive,
    handleStartBet,
    handleCashOut,
    resetGame,
    getButtonText,
  } = useTruckGameLogic();

  const handleFormSubmit = async (amount: number): Promise<boolean> => {
    if (gameState === EGameState.Moving || gameState === EGameState.Accelerating) {
      await handleCashOut();
      return true;
    }
    await handleStartBet(amount);
    return true;
  };

  return (
    <div className={styles.container}>
      <TruckScreen
        gameState={gameState}
        currentMultiplier={currentMultiplier}
        isActive={isActive}
      />
      <BetForm
        gameState={gameState}
        isBetting={isBetting}
        isCashOutActive={isCashOutActive}
        buttonText={getButtonText()}
        onSubmit={handleFormSubmit}
        onReset={resetGame}
      />
    </div>
  );
}
