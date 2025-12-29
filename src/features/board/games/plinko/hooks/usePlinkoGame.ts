import { useCallback, useMemo, useRef, useState } from 'react';

import { usePlinkoEngine } from './usePlinkoEngine';
import { usePlinkoHistoryStore, type BallResult } from '../store/historyStore';
import { generateMultipliers, type Risk } from '../utils/multipliers';

const useGameState = () => {
  const [winnings, setWinnings] = useState(0);
  const [bet, setBet] = useState(2);
  const [started, setStarted] = useState(false);

  const resetWinnings = useCallback(() => setWinnings(0), []);
  const addWinnings = useCallback((amount: number) => {
    setWinnings((prev) => prev + amount);
  }, []);

  return { winnings, bet, setBet, started, setStarted, resetWinnings, addWinnings };
};

const useBallSettings = () => {
  const [ballsCount, setBallsCount] = useState(1);

  const setBalls = useCallback((c: number) => {
    setBallsCount(c);
  }, []);

  return { ballsCount, setBalls };
};

const useRiskSettings = () => {
  const [risk, setRisk] = useState<Risk>('Medium');

  const increaseRisk = useCallback(() => {
    setRisk((prev) => (prev === 'Low' ? 'Medium' : prev === 'Medium' ? 'High' : 'High'));
  }, []);

  const decreaseRisk = useCallback(() => {
    setRisk((prev) => (prev === 'High' ? 'Medium' : prev === 'Medium' ? 'Low' : 'Low'));
  }, []);

  const setRiskLevel = useCallback((r: Risk) => {
    setRisk(r);
  }, []);

  return { risk, increaseRisk, decreaseRisk, setRiskLevel };
};

const useLinesSettings = () => {
  const [lines, setLines] = useState(9);

  const setLinesCount = useCallback((l: number) => {
    setLines(l);
  }, []);

  return { lines, setLinesCount };
};

export const usePlinkoGame = () => {
  const gameState = useGameState();
  const ballSettings = useBallSettings();
  const riskSettings = useRiskSettings();
  const linesSettings = useLinesSettings();

  const landedRef = useRef(0);
  const ballResultsRef = useRef<BallResult[]>([]);
  const sessionBetRef = useRef(0);

  const multipliers = useMemo(
    () => generateMultipliers(linesSettings.lines, riskSettings.risk),
    [linesSettings.lines, riskSettings.risk],
  );
  const addHistory = usePlinkoHistoryStore((s) => s.add);

  const onBallLanded = useCallback(
    (index: number) => {
      const multi = multipliers[index] ?? 1;

      ballResultsRef.current.push({
        landedIndex: index,
        multiplier: multi,
      });

      gameState.addWinnings(sessionBetRef.current * multi);

      landedRef.current += 1;

      if (landedRef.current >= ballSettings.ballsCount) {
        const totalMultiplier = ballResultsRef.current.reduce((sum, r) => sum + r.multiplier, 0);
        const totalWin = sessionBetRef.current * totalMultiplier;

        addHistory({
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          ts: Date.now(),
          risk: riskSettings.risk,
          lines: linesSettings.lines,
          ballsCount: ballSettings.ballsCount,
          betAmount: sessionBetRef.current,
          ballResults: [...ballResultsRef.current],
          totalMultiplier,
          totalWin,
        });

        gameState.setStarted(false);
      }
    },
    [
      gameState,
      multipliers,
      addHistory,
      riskSettings.risk,
      linesSettings.lines,
      ballSettings.ballsCount,
    ],
  );

  const engine = usePlinkoEngine(onBallLanded, multipliers, linesSettings.lines);

  const drop = useCallback(() => {
    gameState.setStarted(true);
    landedRef.current = 0;
    ballResultsRef.current = [];
    sessionBetRef.current = gameState.bet;
    engine.dropBalls(ballSettings.ballsCount);
  }, [engine, ballSettings.ballsCount, gameState]);

  const resetBalance = useCallback(() => {
    gameState.resetWinnings();
    engine.reset();
    gameState.setStarted(false);
  }, [engine, gameState]);

  return {
    winnings: gameState.winnings,
    bet: gameState.bet,
    setBet: gameState.setBet,
    drop,
    resetBalance,
    engine,
    started: gameState.started,
    ballsCount: ballSettings.ballsCount,
    setBalls: ballSettings.setBalls,
    risk: riskSettings.risk,
    increaseRisk: riskSettings.increaseRisk,
    decreaseRisk: riskSettings.decreaseRisk,
    setRiskLevel: riskSettings.setRiskLevel,
    lines: linesSettings.lines,
    setLines: linesSettings.setLinesCount,
    multipliers,
  };
};
