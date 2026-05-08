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

function normalizeSecondsInput(value: string): string {
  return value.trim().replace(',', '.');
}

/** États de saisie incomplets (ex. « 60. » en cours de frappe). */
function isIncompleteSecondsInput(normalized: string): boolean {
  if (normalized === '' || normalized === '-' || normalized === '.' || normalized === '-.') {
    return true;
  }
  if (/[.,]$/.test(normalized)) return true;
  return false;
}

function parseSeconds(value: string): number | null {
  const normalized = normalizeSecondsInput(value);
  if (isIncompleteSecondsInput(normalized)) return null;
  const parsed = Number.parseFloat(normalized);
  if (!Number.isFinite(parsed)) return null;
  if (parsed < MIN_CUSTOM_SECONDS || parsed > MAX_CUSTOM_SECONDS) return null;
  return parsed;
}

function msFromSeconds(seconds: number): number {
  return Math.round(seconds * 1000);
}

function formatInitialSecondsFromMs(ms: number): string {
  const seconds = Math.round((ms / 1000) * 100) / 100;
  if (Number.isInteger(seconds)) return String(seconds);
  return seconds.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
}

export function useDurationField(initialMs = 60_000): DurationField {
  const [durationMs, setDurationMs] = useState(initialMs);
  const [isCustom, setIsCustom] = useState(false);
  const [customSeconds, setCustomSecondsState] = useState(() =>
    formatInitialSecondsFromMs(initialMs),
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
    if (parsed !== null) setDurationMs(msFromSeconds(parsed));
  }

  function setCustomSeconds(value: string) {
    setCustomSecondsState(value);
    const next = parseSeconds(value);
    if (next !== null) setDurationMs(msFromSeconds(next));
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
