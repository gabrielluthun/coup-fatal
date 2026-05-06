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
    <div className="flex flex-col gap-1">
      <label className="text-zinc-400 text-sm font-medium">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Nom du ${label.toLowerCase()}`}
        maxLength={30}
        className="bg-zinc-800 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-zinc-600"
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
      <label className="text-zinc-400 text-sm font-medium">Durée initiale</label>
      <div className="flex gap-2">
        {DURATION_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={[
              'flex-1 py-2 rounded-lg text-sm font-semibold transition-colors duration-150',
              value === opt.value
                ? 'bg-yellow-400 text-zinc-900'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700',
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full max-w-md">
      <h1 className="text-3xl font-bold text-white text-center tracking-wide uppercase">
        Coup Fatal
      </h1>

      <div className="flex flex-col gap-4">
        <PlayerNameInput label="Joueur 1" value={player1Name} onChange={setPlayer1Name} />
        <PlayerNameInput label="Joueur 2" value={player2Name} onChange={setPlayer2Name} />
      </div>

      <DurationSelector value={duration} onChange={setDuration} />

      <Button type="submit" variant="primary" disabled={!canStart}>
        Lancer le duel
      </Button>
    </form>
  );
}
