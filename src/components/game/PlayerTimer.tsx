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
  const isEmpty = timeLeft <= 0;

  return (
    <div
      className={[
        'relative flex flex-col items-center gap-4 px-10 py-8 rounded-2xl transition-all duration-300 flex-1',
        isActive && !isEmpty
          ? 'bg-zinc-800 ring-4 ring-yellow-400 shadow-[0_0_40px_rgba(250,204,21,0.15)]'
          : 'bg-zinc-900 ring-1 ring-zinc-800',
        !isActive ? 'opacity-50' : '',
      ].join(' ')}
    >
      {isActive && !isEmpty && (
        <span className="absolute top-3 text-yellow-400 text-[10px] font-bold tracking-[0.2em] uppercase">
          En jeu
        </span>
      )}

      <span className="text-zinc-400 text-sm font-semibold tracking-widest uppercase mt-3">
        {name}
      </span>

      <span
        className={[
          'text-8xl font-black font-mono tabular-nums leading-none transition-colors duration-300',
          isEmpty ? 'text-zinc-700' : isLow ? 'text-red-500' : 'text-white',
        ].join(' ')}
      >
        {formatTime(timeLeft)}
      </span>
    </div>
  );
}
