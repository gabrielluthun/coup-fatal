import { useGameStore } from '../../store/gameStore';
import { Button } from '../ui/Button';

function WinnerAnnouncement({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center gap-4 animate-scale-in">
      <div className="text-6xl select-none">🏆</div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.25em]">
          Vainqueur
        </p>
        <p className="text-5xl font-black text-yellow-400 text-center tracking-tight">
          {name}
        </p>
      </div>
    </div>
  );
}

function ReplayButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
      <Button variant="primary" onClick={onClick} className="px-10 py-3 text-base">
        Rejouer
      </Button>
    </div>
  );
}

export function GameResult() {
  const players = useGameStore((s) => s.players);
  const winner = useGameStore((s) => s.winner);
  const startGame = useGameStore((s) => s.startGame);
  const initialTime = useGameStore((s) => s.initialTime);

  const winnerPlayer = players.find((p) => p.id === winner);

  function handleReplay() {
    startGame(players[0].name, players[1].name, initialTime);
  }

  if (!winnerPlayer) return null;

  return (
    <div className="flex flex-col items-center gap-12 w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-12 shadow-2xl">
      <WinnerAnnouncement name={winnerPlayer.name} />
      <ReplayButton onClick={handleReplay} />
    </div>
  );
}
