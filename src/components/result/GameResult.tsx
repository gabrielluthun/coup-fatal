import { useGameStore } from '../../store/gameStore';
import { Button } from '../ui/Button';

function WinnerAnnouncement({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6 animate-scale-in">
      <div className="text-5xl sm:text-7xl select-none">🏆</div>
      <div className="flex flex-col items-center gap-3">
        <p className="text-zinc-600 text-xs sm:text-[16px] font-bold tracking-[0.3em] uppercase">
          Vainqueur du Coup Fatal
        </p>
        <p className="text-4xl sm:text-6xl font-black text-yellow-400 text-center tracking-tight leading-none">
          {name}
        </p>
      </div>
    </div>
  );
}

type ResultActionsProps = {
  onReplay: () => void;
  onMenu: () => void;
};

function ResultActions({ onReplay, onMenu }: ResultActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 animate-fade-up" style={{ animationDelay: '0.35s' }}>
      <Button variant="primary" onClick={onReplay} className="px-8 py-3 sm:px-12 sm:py-4 text-base sm:text-lg">
        Rejouer
      </Button>
      <Button variant="neutral" onClick={onMenu} className="px-8 py-3 sm:px-12 sm:py-4 text-base sm:text-lg">
        ← Menu
      </Button>
    </div>
  );
}

export function GameResult() {
  const players     = useGameStore((s) => s.players);
  const winner      = useGameStore((s) => s.winner);
  const startGame   = useGameStore((s) => s.startGame);
  const resetGame   = useGameStore((s) => s.resetGame);
  const initialTime = useGameStore((s) => s.initialTime);

  const winnerPlayer = players.find((p) => p.id === winner);

  function handleReplay() {
    startGame(players[0].name, players[1].name, initialTime);
  }

  if (!winnerPlayer) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10 sm:gap-16 px-4">
      <WinnerAnnouncement name={winnerPlayer.name} />
      <ResultActions onReplay={handleReplay} onMenu={resetGame} />
    </div>
  );
}
