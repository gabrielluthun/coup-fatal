import { useGameStore } from '../../store/gameStore';
import { Button } from '../ui/Button';

function WinnerAnnouncement({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-zinc-400 text-sm uppercase tracking-widest">Vainqueur</p>
      <p className="text-5xl font-bold text-yellow-400 text-center">{name}</p>
    </div>
  );
}

function ReplayButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="primary" onClick={onClick}>
      Rejouer
    </Button>
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
    <div className="flex flex-col items-center gap-10">
      <WinnerAnnouncement name={winnerPlayer.name} />
      <ReplayButton onClick={handleReplay} />
    </div>
  );
}
