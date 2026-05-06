type PlayerTimerProps = {
  name: string;
  timeLeft: number;
  isActive: boolean;
  timerRunning: boolean;
};

function formatTime(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function PlayerTimer({ name, timeLeft, isActive, timerRunning }: PlayerTimerProps) {
  const isLow     = timeLeft > 0 && timeLeft <= 10_000;
  const isEmpty   = timeLeft <= 0;
  const isRunning = isActive && timerRunning;

  return (
    <div className={[
      'relative flex flex-col items-center justify-between flex-1 h-full py-10 px-8 transition-all duration-500',
      isActive ? 'opacity-100' : 'opacity-30',
    ].join(' ')}>

      {/* Nom du joueur */}
      <span className="text-sm font-bold tracking-[0.25em] uppercase text-zinc-400">
        {name}
      </span>

      {/* Chrono principal */}
      <div className="flex flex-col items-center gap-4">
        {/* Boîte du chrono — style TV */}
        <div className={[
          'px-8 py-5 rounded-2xl transition-all duration-300',
          isActive
            ? 'bg-zinc-800 ring-2 ring-yellow-400 shadow-[0_0_60px_rgba(250,204,21,0.2)]'
            : 'bg-zinc-900 ring-1 ring-zinc-800',
        ].join(' ')}>
          <span className={[
            'text-[7rem] font-black font-mono tabular-nums leading-none block transition-colors duration-300',
            isEmpty   ? 'text-zinc-700'
            : isLow   ? 'animate-tick-flash'
            : isActive ? 'text-white'
                       : 'text-zinc-500',
          ].join(' ')}>
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* Indicateur d'état sous le chrono */}
        <span className={[
          'text-[10px] font-black tracking-[0.3em] uppercase transition-all duration-300',
          isRunning       ? 'text-yellow-400'
          : isActive      ? 'text-zinc-500'
                          : 'text-transparent',
        ].join(' ')}>
          {isRunning ? '● En cours' : isActive ? '◌ En attente' : '—'}
        </span>
      </div>

      {/* Spacer bas */}
      <div />
    </div>
  );
}
