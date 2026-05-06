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
        <div className="flex gap-6">
          <Button
            variant="primary"
            onClick={startTimer}
            className="px-14 py-5 text-lg shadow-[0_0_30px_rgba(250,204,21,0.25)]"
          >
            ▶ Lancer le chrono
          </Button>
          <Button
            variant="neutral"
            onClick={switchPlayer}
            className="px-10 py-5 text-lg"
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
    <div className="flex gap-6 justify-center">
      <Button variant="success" onClick={correctAnswer} className="px-20 py-5 text-lg">
        ✓ Bonne réponse
      </Button>
      <Button variant="danger" onClick={wrongAnswer} className="px-20 py-5 text-lg">
        ✗ Mauvaise réponse
      </Button>
    </div>
  );
}
