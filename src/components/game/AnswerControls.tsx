import { useGameStore } from '../../store/gameStore';
import { Button } from '../ui/Button';

export function AnswerControls() {
  const correctAnswer = useGameStore((s) => s.correctAnswer);
  const wrongAnswer = useGameStore((s) => s.wrongAnswer);
  const pass = useGameStore((s) => s.pass);

  return (
    <div className="flex gap-3 justify-center">
      <Button variant="success" onClick={correctAnswer}>
        Bonne réponse
      </Button>
      <Button variant="danger" onClick={wrongAnswer}>
        Mauvaise réponse
      </Button>
      <Button variant="neutral" onClick={pass}>
        Passe
      </Button>
    </div>
  );
}
