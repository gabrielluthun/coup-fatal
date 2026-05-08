import { useGameStore } from '../../store/gameStore';
import { Button } from '../ui/Button';
import { KeyHint } from '../ui/KeyHint';

type ButtonWithHintProps = {
  children: React.ReactNode;
  hint: string;
};

function ButtonWithHint({ children, hint }: ButtonWithHintProps) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      {children}
      <KeyHint keys={hint} />
    </div>
  );
}

export function AnswerControls() {
  const timerRunning  = useGameStore((s) => s.timerRunning);
  const startTimer    = useGameStore((s) => s.startTimer);
  const switchPlayer  = useGameStore((s) => s.switchPlayer);
  const correctAnswer = useGameStore((s) => s.correctAnswer);
  const wrongAnswer   = useGameStore((s) => s.wrongAnswer);

  if (!timerRunning) {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-center">
          <ButtonWithHint hint="Espace">
            <Button
              variant="primary"
              onClick={startTimer}
              className="px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg shadow-[0_0_30px_rgba(250,204,21,0.25)]"
            >
              ▶ Lancer le chrono
            </Button>
          </ButtonWithHint>
          <ButtonWithHint hint="S">
            <Button
              variant="neutral"
              onClick={switchPlayer}
              className="px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg"
            >
              ⇄ Changer de joueur
            </Button>
          </ButtonWithHint>
        </div>
        <span className="text-zinc-600 text-xs tracking-widest uppercase">
          Lancez, puis posez la question
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-center">
      <ButtonWithHint hint="Espace">
        <Button variant="success" onClick={correctAnswer} className="px-8 py-3 sm:px-12 sm:py-4 text-base sm:text-lg">
          ✓ Bonne réponse
        </Button>
      </ButtonWithHint>
      <ButtonWithHint hint="X">
        <Button variant="danger" onClick={wrongAnswer} className="px-8 py-3 sm:px-12 sm:py-4 text-base sm:text-lg">
          ✗ Mauvaise réponse
        </Button>
      </ButtonWithHint>
    </div>
  );
}
