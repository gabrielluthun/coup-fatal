import { useGameStore } from '../../store/gameStore';
import { useGameTimer } from '../../hooks/useGameTimer';
import { PlayerTimer } from './PlayerTimer';
import { AnswerControls } from './AnswerControls';

export function GameBoard() {
  useGameTimer();

  const players      = useGameStore((s) => s.players);
  const activeTurn   = useGameStore((s) => s.activeTurn);
  const timerRunning = useGameStore((s) => s.timerRunning);
  const feedback     = useGameStore((s) => s.feedback);
  const resetGame    = useGameStore((s) => s.resetGame);

  const [player1, player2] = players;
  const player1Feedback = feedback?.player === 'player1' ? feedback : null;
  const player2Feedback = feedback?.player === 'player2' ? feedback : null;

  return (
    <div className="relative flex flex-col h-screen w-full select-none">

      {/* Bouton retour — actif uniquement quand le chrono est en pause */}
      <button
        onClick={resetGame}
        disabled={timerRunning}
        className={[
          'absolute top-4 left-4 flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-150',
          timerRunning
            ? 'text-zinc-800 cursor-not-allowed'
            : 'text-zinc-500 hover:text-white hover:bg-zinc-800 cursor-pointer',
        ].join(' ')}
        aria-label="Retour au menu"
      >
        ←
      </button>

      {/* En-tête */}
      <header className="flex items-center justify-center pt-6 pb-2 gap-3">
        <div className="h-px flex-1 bg-zinc-800 max-w-32" />
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-sm font-black tracking-[0.3em] uppercase text-white">
            Coup Fatal
          </span>
          <span className="text-[9px] tracking-[0.25em] uppercase text-zinc-600">
            Les 12 coups de midi
          </span>
        </div>
        <div className="h-px flex-1 bg-zinc-800 max-w-32" />
      </header>

      {/* Split-screen timers */}
      <div className="flex flex-col sm:flex-row flex-1 min-h-0">
        <PlayerTimer
          name={player1.name}
          timeLeft={player1.timeLeft}
          isActive={activeTurn === 'player1'}
          timerRunning={timerRunning}
          feedback={player1Feedback}
        />

        {/* Séparateur — horizontal sur mobile, vertical sur sm+ */}
        <div className="flex sm:flex-col items-center justify-center gap-2 px-4 sm:px-4 py-2 sm:py-0">
          <div className="h-px sm:h-auto sm:w-px flex-1 bg-zinc-800" />
          <span className="text-zinc-700 text-xs font-black tracking-widest">VS</span>
          <div className="h-px sm:h-auto sm:w-px flex-1 bg-zinc-800" />
        </div>

        <PlayerTimer
          name={player2.name}
          timeLeft={player2.timeLeft}
          isActive={activeTurn === 'player2'}
          timerRunning={timerRunning}
          feedback={player2Feedback}
        />
      </div>

      {/* Contrôles hôte */}
      <footer className="flex items-center justify-center min-h-16 sm:min-h-20 lg:min-h-24 border-t border-zinc-800/60">
        <AnswerControls />
      </footer>
    </div>
  );
}
