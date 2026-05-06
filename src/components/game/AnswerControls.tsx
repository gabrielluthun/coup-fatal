import { useGameStore } from '../../store/gameStore';
import { Button } from '../ui/Button';

export function AnswerControls() {
  const timerRunning  = useGameStore((s) => s.timerRunning);
  const startTimer    = useGameStore((s) => s.startTimer);
  const switchPlayer  = useGameStore((s) => s.switchPlayer);
  const correctAnswer = useGameStore((s) => s.correctAnswer);
  const wrongAnswer   = useGameStore((s) => s.wrongAnswer);

  if (!timerRunning) {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
          <Button
            variant="primary"
            onClick={startTimer}
            className="px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg shadow-[0_0_30px_rgba(250,204,21,0.25)]"
          >
            ▶ Lancer le chrono
          </Button>
          <Button
            variant="neutral"
            onClick={switchPlayer}
            className="px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg"
          >
            ⇄ Changer de joueur
          </Button>
        </div>
        <span className="text-zinc-600 text-xs tracking-widest uppercase">
          Posez la question puis lancez
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center">
      <Button variant="success" onClick={correctAnswer} className="px-8 py-3 sm:px-12 sm:py-4 text-base sm:text-lg">
        ✓ Bonne réponse
      </Button>
      <Button variant="danger" onClick={wrongAnswer} className="px-8 py-3 sm:px-12 sm:py-4 text-base sm:text-lg">
        ✗ Mauvaise réponse
      </Button>
    </div>
  );
}
