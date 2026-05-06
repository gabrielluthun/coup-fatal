type PlayerTimerProps = {
  name: string;
  timeLeft: number; // en millisecondes
  isActive: boolean;
};

function formatTime(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function PlayerTimer({ name, timeLeft, isActive }: PlayerTimerProps) {
  const isLow = timeLeft <= 10_000;

  return (
    <div
      className={[
        'flex flex-col items-center gap-3 p-6 rounded-2xl transition-all duration-300',
        isActive
          ? 'ring-4 ring-yellow-400 bg-zinc-800'
          : 'ring-1 ring-zinc-700 bg-zinc-900 opacity-60',
      ].join(' ')}
    >
      <span className="text-zinc-300 text-lg font-medium tracking-wide uppercase">
        {name}
      </span>
      <span
        className={[
          'text-7xl font-mono font-bold tabular-nums transition-colors duration-300',
          isLow ? 'text-red-500' : 'text-white',
        ].join(' ')}
      >
        {formatTime(timeLeft)}
      </span>
      {isActive && (
        <span className="text-yellow-400 text-xs font-semibold tracking-widest uppercase">
          En jeu
        </span>
      )}
    </div>
  );
}
