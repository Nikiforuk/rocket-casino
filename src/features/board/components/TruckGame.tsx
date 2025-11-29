import { useCallback, useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import styles from './TruckGame.module.scss';
import policeCar1Img from '../../../assets/images/car-police-1.png';
import policeCar2Img from '../../../assets/images/car-police-2.png';
import cityImg from '../../../assets/images/city.png';
import roadImg from '../../../assets/images/road.png';
import truckImg from '../../../assets/images/truck.png';
import winImg from '../../../assets/images/win.png';
import { GRADIENTS } from '../../../shared/styles/gradients';
import type { RocketGameData } from '../../../shared/types/board';
import Button from '../../../shared/ui/Button';
import Input from '../../../shared/ui/Input';
import { useBoardStore } from '../boardStore';
import { useBet } from '../hooks/useBet';

type GameState = 'idle' | 'accelerating' | 'moving' | 'crashed' | 'escaped';

export default function TruckGame() {
  const { startBet, cashOut, loading: isBetting } = useBet();
  const { balance } = useBoardStore();
  const { control, handleSubmit, setValue } = useForm<RocketGameData>({
    defaultValues: { amount: '' },
  });

  const [gameState, setGameState] = useState<GameState>('idle');
  const [currentMultiplier, setCurrentMultiplier] = useState(1.0);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState(0);

  const generateCrashAt = useCallback((): number => {
    const r = Math.random();
    return Number((1 / (1 - r)).toFixed(2));
  }, []);

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  const onSubmit = async (data: RocketGameData) => {
    const amount = Number(data.amount);

    if (gameState === 'moving' || gameState === 'accelerating') {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      const totalPayout = Math.floor(betAmount * currentMultiplier);
      const profit = totalPayout - betAmount;
      const result = await cashOut(profit);
      if (!result.success) {
        alert(result.error ?? 'Something went wrong');
        return;
      }
      setGameState('escaped');
      return;
    }

    const result = await startBet(amount);
    if (!result.success) {
      alert(result.error ?? 'Something went wrong');
      return;
    }

    setBetAmount(amount);
    const crashMultiplier = generateCrashAt();
    setCurrentMultiplier(1.0);
    setGameState('accelerating');

    setTimeout(() => {
      setGameState('moving');
      const id = setInterval(() => {
        setCurrentMultiplier((prev) => {
          const next = Number((prev + 0.01).toFixed(2));
          if (next >= crashMultiplier) {
            clearInterval(id);
            setIntervalId(null);
            setGameState('crashed');
            return prev;
          }
          return next;
        });
      }, 30);
      setIntervalId(id);
    }, 1200);
  };

  const resetGame = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setGameState('idle');
    setCurrentMultiplier(1.0);
  };

  const getButtonText = () => {
    if (isBetting) return 'Starting...';
    if (gameState === 'accelerating' || gameState === 'moving') return 'Cash Out';
    if (gameState === 'crashed' || gameState === 'escaped') return 'Play Again';
    return 'Start';
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (gameState === 'crashed' || gameState === 'escaped') {
      resetGame();
      return;
    }
    await handleSubmit(onSubmit)();
  };

  const isActive = gameState === 'accelerating' || gameState === 'moving';
  const isCashOutActive = gameState === 'moving' || gameState === 'accelerating';

  return (
    <div className={styles.container}>
      {(gameState === 'escaped' || gameState === 'crashed') && (
        <div
          className={`${styles.resultTitle} ${gameState === 'escaped' ? styles.resultTitle_win : styles.resultTitle_fail}`}
        >
          {gameState === 'escaped' ? 'WIN' : 'FAIL'}
        </div>
      )}
      <div
        className={`${styles.screen} ${gameState === 'crashed' ? styles.screen_crashed : gameState === 'idle' ? styles.screen_idle : ''}`}
      >
        {gameState === 'idle' && (
          <div className={styles.splashScreen}>
            <img src={truckImg} alt="Truck" className={styles.splashTruck} />
            <div className={styles.splashText}>
              <p className={styles.splashTitle}>Press Start to Launch</p>
              <p className={styles.splashSubtitle}>Try the game</p>
            </div>
          </div>
        )}
        {gameState !== 'idle' && (
          <div
            className={`${styles.multiplier} ${gameState === 'crashed' ? styles.multiplier_fail : gameState === 'escaped' ? styles.multiplier_win : styles.multiplier_active}`}
          >
            {currentMultiplier.toFixed(2)}
          </div>
        )}
        <div className={styles.gameContent}>
          {gameState === 'escaped' && (
            <>
              <img src={cityImg} alt="City" className={styles.cityBackground} />
              <img src={roadImg} alt="Road" className={styles.roadBackground} />
              <img src={truckImg} alt="Truck" className={styles.truck} />
              <div className={styles.winOverlay}>
                <img src={winImg} alt="Win" className={styles.winImage} />
              </div>
            </>
          )}
          {gameState === 'crashed' && (
            <>
              <img src={roadImg} alt="Road" className={styles.roadBackground} />
              <img src={truckImg} alt="Truck" className={styles.truck} />
              <img
                src={policeCar1Img}
                alt="Police Car 1"
                className={`${styles.policeCar} ${styles.policeCar_left}`}
              />
              <img
                src={policeCar2Img}
                alt="Police Car 2"
                className={`${styles.policeCar} ${styles.policeCar_right}`}
              />
            </>
          )}
          {isActive && (
            <>
              <img src={cityImg} alt="City" className={styles.cityBackground} />
              <img src={roadImg} alt="Road" className={styles.roadBackground} />
              <img
                src={truckImg}
                alt="Truck"
                className={`${styles.truck} ${gameState === 'accelerating' ? styles.truck_accelerating : styles.truck_moving}`}
              />
            </>
          )}
        </div>
      </div>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <p className={styles.form_text}>Bet Amount</p>
        <div className={styles.form_box}>
          <Controller
            control={control}
            name="amount"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Your bet"
                type="text"
                value={field.value}
                onChange={(e) => {
                  let val = e.target.value.replace(/^0+(?=\d)/, '');
                  field.onChange(val);
                }}
                background="rgba(15, 23, 43, 0.3)"
                border="1px solid rgba(15, 23, 43, 0.1)"
                padding="8px 12px"
                borderRadius="8px"
                textStyle={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '-0.15px',
                  fontWeight: '400',
                }}
                disabled={gameState !== 'idle'}
              />
            )}
          />
          <div className={`${styles.form_start} ${isCashOutActive ? styles.form_start_glow : ''}`}>
            <Button
              type="submit"
              border="1px solid rgba(49, 65, 88, 0.1)"
              height="36px"
              background={isCashOutActive ? GRADIENTS.greenToGreen : 'rgba(193, 193, 193, 1)'}
              text={getButtonText()}
              borderRadius="8px"
              disabled={isBetting && gameState === 'idle'}
              textStyle={{
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '-0.15px',
                fontWeight: 500,
                color: isCashOutActive ? 'white' : undefined,
              }}
            />
          </div>
        </div>
        <div className={styles.form_groupButtons}>
          {[10, 50, 100, 500].map((v) => (
            <Button
              key={v}
              type="button"
              text={`$${v}`}
              height="36px"
              background="rgba(15, 23, 43, 0.2)"
              borderRadius="4px"
              border="1px solid rgba(49, 65, 88, 0.1)"
              textStyle={{
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '-0.15px',
                fontWeight: 500,
                color: '#90A1B9',
              }}
              onClick={() => setValue('amount', String(v))}
              disabled={gameState !== 'idle'}
            />
          ))}
          <Button
            type="button"
            text="Max"
            height="36px"
            background="rgba(15, 23, 43, 0.2)"
            borderRadius="4px"
            border="1px solid rgba(49, 65, 88, 0.1)"
            textStyle={{
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '-0.15px',
              fontWeight: 500,
              color: '#90A1B9',
            }}
            onClick={() => setValue('amount', String(Math.floor(balance)))}
            disabled={gameState !== 'idle'}
          />
        </div>
      </form>
    </div>
  );
}
