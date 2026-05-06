import { useGameStore } from '../../store/gameStore';
import { useGameTimer } from '../../hooks/useGameTimer';
import { PlayerTimer } from './PlayerTimer';
import { AnswerControls } from './AnswerControls';

export function GameBoard() {
  useGameTimer();

  const players = useGameStore((s) => s.players);
  const activeTurn = useGameStore((s) => s.activeTurn);

  const [player1, player2] = players;

  return (
    <div className="flex flex-col items-center gap-10 w-full">
      <div className="flex gap-6 w-full justify-center">
        <PlayerTimer
          name={player1.name}
          timeLeft={player1.timeLeft}
          isActive={activeTurn === 'player1'}
        />
        <PlayerTimer
          name={player2.name}
          timeLeft={player2.timeLeft}
          isActive={activeTurn === 'player2'}
        />
      </div>

      <AnswerControls />
    </div>
  );
}
