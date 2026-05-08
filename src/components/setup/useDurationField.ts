import { useState } from 'react';

export const MIN_CUSTOM_SECONDS = 5;
export const MAX_CUSTOM_SECONDS = 3600;

export type DurationField = {
  durationMs: number;
  isCustom: boolean;
  customSeconds: string;
  isValid: boolean;
  selectPreset: (ms: number) => void;
  selectCustom: () => void;
  setCustomSeconds: (value: string) => void;
};

function parseSeconds(value: string): number | null {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return null;
  if (parsed < MIN_CUSTOM_SECONDS || parsed > MAX_CUSTOM_SECONDS) return null;
  return parsed;
}

export function useDurationField(initialMs = 60_000): DurationField {
  const [durationMs, setDurationMs] = useState(initialMs);
  const [isCustom, setIsCustom] = useState(false);
  const [customSeconds, setCustomSecondsState] = useState(
    String(Math.round(initialMs / 1000)),
  );

  const parsed = parseSeconds(customSeconds);
  const isCustomValid = parsed !== null;
  const isValid = !isCustom || isCustomValid;

  function selectPreset(ms: number) {
    setIsCustom(false);
    setDurationMs(ms);
  }

  function selectCustom() {
    setIsCustom(true);
    if (parsed !== null) setDurationMs(parsed * 1000);
  }

  function setCustomSeconds(value: string) {
    setCustomSecondsState(value);
    const next = parseSeconds(value);
    if (next !== null) setDurationMs(next * 1000);
  }

  return {
    durationMs,
    isCustom,
    customSeconds,
    isValid,
    selectPreset,
    selectCustom,
    setCustomSeconds,
  };
}
