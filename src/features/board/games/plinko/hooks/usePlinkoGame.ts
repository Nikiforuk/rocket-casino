import { useCallback, useMemo, useRef, useState } from 'react';

import { usePlinkoEngine } from './usePlinkoEngine';
import { usePlinkoHistoryStore } from '../store/historyStore';
import { generateMultipliers, type Risk } from '../utils/multipliers';

export const usePlinkoGame = () => {
  const [winnings, setWinnings] = useState(0);
  const [bet, setBet] = useState(2);
  const [started, setStarted] = useState(false);
  const [ballsCount, setBallsCount] = useState(1);
  const [risk, setRisk] = useState<Risk>('Medium');
  const [lines, setLines] = useState(9);
  const landedRef = useRef(0);
  const multipliers = useMemo(() => generateMultipliers(lines, risk), [lines, risk]);
  const addHistory = usePlinkoHistoryStore((s) => s.add);

  const onBallLanded = useCallback(
    (index: number) => {
      const multi = multipliers[index] ?? 1;
      setWinnings((prev) => prev + bet * multi);
      addHistory({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        ts: Date.now(),
        risk,
        lines,
        ballsCount,
        landedIndex: index,
        multiplier: multi,
        win: bet * multi,
      });
      landedRef.current += 1;
      if (landedRef.current >= ballsCount) setStarted(false);
    },
    [bet, multipliers, addHistory, risk, lines, ballsCount],
  );

  const engine = usePlinkoEngine(onBallLanded, multipliers);

  const drop = useCallback(() => {
    setStarted(true);
    landedRef.current = 0;
    engine.dropBalls(ballsCount);
  }, [engine, ballsCount]);

  const resetBalance = useCallback(() => {
    setWinnings(0);
    engine.reset();
    setStarted(false);
  }, [engine]);

  const increaseRisk = useCallback(() => {
    setRisk((prev) => (prev === 'Low' ? 'Medium' : prev === 'Medium' ? 'High' : 'High'));
  }, []);

  const decreaseRisk = useCallback(() => {
    setRisk((prev) => (prev === 'High' ? 'Medium' : prev === 'Medium' ? 'Low' : 'Low'));
  }, []);

  const setRiskLevel = useCallback((r: Risk) => {
    setRisk(r);
  }, []);

  const setLinesCount = useCallback((l: number) => {
    setLines(l);
  }, []);

  const setBalls = useCallback((c: number) => {
    setBallsCount(c);
  }, []);

  return useMemo(
    () => ({
      winnings,
      bet,
      setBet,
      drop,
      resetBalance,
      engine,
      started,
      ballsCount,
      setBalls,
      risk,
      increaseRisk,
      decreaseRisk,
      setRiskLevel,
      lines,
      setLines: setLinesCount,
      multipliers,
    }),
    [
      winnings,
      bet,
      drop,
      resetBalance,
      engine,
      started,
      ballsCount,
      setBalls,
      risk,
      increaseRisk,
      decreaseRisk,
      setRiskLevel,
      lines,
      setLinesCount,
      multipliers,
    ],
  );
};
