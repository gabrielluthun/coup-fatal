import { useGameStore } from './store/gameStore';
import { GameSetup } from './components/setup/GameSetup';
import { GameBoard } from './components/game/GameBoard';
import { GameResult } from './components/result/GameResult';

export default function App() {
  const status = useGameStore((s) => s.status);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {status === 'setup'    && <GameSetup />}
      {status === 'playing'  && <GameBoard />}
      {status === 'finished' && <GameResult />}
    </div>
  );
}
