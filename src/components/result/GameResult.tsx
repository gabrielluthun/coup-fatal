import { useGameStore } from '../../store/gameStore';
import { Button } from '../ui/Button';

function WinnerAnnouncement({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center gap-6 animate-scale-in">
      <div className="text-7xl select-none">🏆</div>
      <div className="flex flex-col items-center gap-3">
        <p className="text-zinc-600 text-[10px] font-bold tracking-[0.3em] uppercase">
          Vainqueur du Coup Fatal
        </p>
        <p className="text-6xl font-black text-yellow-400 text-center tracking-tight leading-none">
          {name}
        </p>
      </div>
    </div>
  );
}

function ReplayButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="animate-fade-up" style={{ animationDelay: '0.35s' }}>
      <Button variant="primary" onClick={onClick} className="px-12 py-4 text-base">
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
    <div className="flex flex-col items-center justify-center min-h-screen gap-16">
      <WinnerAnnouncement name={winnerPlayer.name} />
      <ReplayButton onClick={handleReplay} />
    </div>
  );
}
