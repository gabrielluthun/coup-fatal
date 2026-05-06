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
    <div className="flex flex-col gap-1.5">
      <label className="text-zinc-400 text-xs font-semibold uppercase tracking-widest">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Nom du ${label.toLowerCase()}`}
        maxLength={30}
        className="bg-zinc-900 border border-zinc-700 text-white rounded-lg px-4 py-3 text-base outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 placeholder:text-zinc-600 transition-colors"
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
    <div className="flex flex-col gap-2">
      <label className="text-zinc-400 text-xs font-semibold uppercase tracking-widest">
        Durée initiale
      </label>
      <div className="flex gap-2">
        {DURATION_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={[
              'flex-1 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-colors duration-150',
              value === opt.value
                ? 'bg-yellow-400 text-zinc-900'
                : 'bg-zinc-900 border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200',
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
      className="flex flex-col gap-8 w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl"
    >
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-4xl font-black text-white tracking-widest uppercase">
          Coup Fatal
        </h1>
        <p className="text-zinc-500 text-xs tracking-widest uppercase">
          Les 12 coups de midi
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <PlayerNameInput label="Joueur 1" value={player1Name} onChange={setPlayer1Name} />
        <PlayerNameInput label="Joueur 2" value={player2Name} onChange={setPlayer2Name} />
      </div>

      <DurationSelector value={duration} onChange={setDuration} />

      <Button type="submit" variant="primary" disabled={!canStart} className="w-full py-3 text-base">
        Lancer le duel
      </Button>
    </form>
  );
}
