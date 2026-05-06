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
    <div className="flex flex-col items-center gap-12 w-full max-w-4xl">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-2xl font-black text-white tracking-widest uppercase">
          Coup Fatal
        </h1>
        <p className="text-zinc-600 text-xs tracking-widest uppercase">
          Les 12 coups de midi
        </p>
      </div>

      <div className="flex gap-6 w-full">
        <PlayerTimer
          name={player1.name}
          timeLeft={player1.timeLeft}
          isActive={activeTurn === 'player1'}
        />
        <div className="flex items-center text-zinc-700 font-black text-3xl select-none">
          VS
        </div>
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
