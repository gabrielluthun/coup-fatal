import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';

const TICK_INTERVAL_MS = 100;

export function useGameTimer() {
  const status = useGameStore((s) => s.status);
  const timerRunning = useGameStore((s) => s.timerRunning);
  const tick = useGameStore((s) => s.tick);
  const lastTickAtRef = useRef<number>(Date.now());

  useEffect(() => {
    if (status !== 'playing' || !timerRunning) return;

    lastTickAtRef.current = Date.now();

    const intervalId = setInterval(() => {
      lastTickAtRef.current = tick(lastTickAtRef.current);
    }, TICK_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [status, timerRunning, tick]);
}
