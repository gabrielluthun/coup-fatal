import { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { Button } from '../ui/Button';

const DURATION_OPTIONS = [
  { label: '30 s', value: 30_000 },
  { label: '60 s', value: 60_000 },
  { label: '90 s', value: 90_000 },
];

type PlayerNameInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function PlayerNameInput({ label, value, onChange }: PlayerNameInputProps) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-zinc-500 text-sm font-bold tracking-[0.2em] uppercase">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Nom du ${label.toLowerCase()}`}
        maxLength={30}
        className="bg-zinc-900 text-white rounded-xl px-5 py-4 sm:px-8 sm:py-5 text-base sm:text-lg outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-zinc-700 transition-all"
      />
    </div>
  );
}

type DurationSelectorProps = {
  value: number;
  onChange: (value: number) => void;
};

function DurationSelector({ value, onChange }: DurationSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-zinc-500 text-[11px] font-bold tracking-[0.2em] uppercase">
        Durée initiale
      </label>
      <div className="flex gap-3">
        {DURATION_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={[
              'flex-1 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-150',
              value === opt.value
                ? 'bg-yellow-400 text-zinc-900 shadow-[0_0_20px_rgba(250,204,21,0.25)]'
                : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300',
            ].join(' ')}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function GameSetup() {
  const startGame = useGameStore((s) => s.startGame);

  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [duration, setDuration] = useState(60_000);

  const canStart = player1Name.trim() !== '' && player2Name.trim() !== '';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canStart) return;
    startGame(player1Name.trim(), player2Name.trim(), duration);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center min-h-screen w-full px-4 sm:px-6 gap-10 sm:gap-16 lg:gap-20"
    >
      {/* Titre */}
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-[0.15em] uppercase">
          Coup Fatal
        </h1>
        <p className="text-zinc-600 text-xs sm:text-s tracking-[0.35em] sm:tracking-[0.55em] uppercase">
          Les 12 coups de midi
        </p>
      </div>

      {/* Champs */}
      <div className="flex flex-col gap-5 sm:gap-7 w-full max-w-xl bg-zinc-950 border-zinc-800/60 rounded-3xl sm:rounded-4xl p-6 sm:p-8">
        <PlayerNameInput label="Joueur 1" value={player1Name} onChange={setPlayer1Name} />
        <PlayerNameInput label="Joueur 2" value={player2Name} onChange={setPlayer2Name} />
        <div className="border-zinc-800" />
        <DurationSelector value={duration} onChange={setDuration} />
      </div>

      {/* Bouton */}
      <div className="w-full max-w-xl">
        <Button
          type="submit"
          variant="primary"
          disabled={!canStart}
          className="w-full py-3.5 text-lg"
        >
          Lancer le duel
        </Button>
      </div>
    </form>
  );
}
