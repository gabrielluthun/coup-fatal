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
    <div className="flex flex-col gap-2">
      <label className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Entrez un nom"
        maxLength={30}
        className="bg-zinc-900 border border-zinc-800 text-white rounded-xl px-5 py-3.5 text-sm outline-none focus:border-yellow-400 placeholder:text-zinc-700 transition-colors"
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
      <label className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase">
        Durée initiale
      </label>
      <div className="flex gap-2">
        {DURATION_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={[
              'flex-1 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-150',
              value === opt.value
                ? 'bg-yellow-400 text-zinc-900 shadow-[0_0_20px_rgba(250,204,21,0.3)]'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300',
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
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-6">
      {/* Titre */}
      <div className="flex flex-col items-center gap-2 mb-12">
        <h1 className="text-6xl font-black text-white tracking-[0.15em] uppercase">
          Coup Fatal
        </h1>
        <p className="text-zinc-600 text-xs tracking-[0.3em] uppercase">
          Les 12 coups de midi
        </p>
      </div>

      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-2xl p-8"
      >
        <PlayerNameInput label="Joueur 1" value={player1Name} onChange={setPlayer1Name} />
        <PlayerNameInput label="Joueur 2" value={player2Name} onChange={setPlayer2Name} />

        <div className="border-t border-zinc-800 pt-6">
          <DurationSelector value={duration} onChange={setDuration} />
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={!canStart}
          className="w-full py-4 text-base mt-2"
        >
          Lancer le duel
        </Button>
      </form>
    </div>
  );
}
