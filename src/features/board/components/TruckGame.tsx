import BetForm from './BetForm';
import GameScreen from './GameScreen';
import styles from './TruckGame.module.scss';
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

  const handleFormSubmit = async (amount: number) => {
    if (gameState === 'moving' || gameState === 'accelerating') {
      return await handleCashOut();
    }
    return await handleStartBet(amount);
  };

  return (
    <div className={styles.container}>
      <GameScreen gameState={gameState} currentMultiplier={currentMultiplier} isActive={isActive} />
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
