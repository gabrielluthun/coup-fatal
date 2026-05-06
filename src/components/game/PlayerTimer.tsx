type PlayerTimerProps = {
  name: string;
  timeLeft: number;
  isActive: boolean;
  timerRunning: boolean;
};

function formatTime(ms: number): string {
  const seconds     = Math.floor(ms / 1000);
  const centiseconds = Math.floor((ms % 1000) / 10);
  return `${String(seconds).padStart(2, '0')}:${String(centiseconds).padStart(2, '0')}`;
}

export function PlayerTimer({ name, timeLeft, isActive, timerRunning }: PlayerTimerProps) {
  const isLow     = timeLeft > 0 && timeLeft <= 10_000;
  const isEmpty   = timeLeft <= 0;
  const isRunning = isActive && timerRunning;

  return (
    <div className={[
      'relative flex flex-col items-center justify-center flex-1 h-full',
      'gap-4 sm:gap-6 lg:gap-8',
      'py-4 px-3 sm:py-6 sm:px-6 lg:py-10 lg:px-8',
      'transition-all duration-500',
      isActive ? 'opacity-100' : 'opacity-30',
    ].join(' ')}>

      {/* Nom du joueur */}
      <span className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-zinc-400">
        {name}
      </span>

      {/* Chrono principal */}
      <div className="flex flex-col items-center gap-3 sm:gap-4">
        {/* Boîte du chrono — style TV */}
        <div className={[
          'px-3 py-2 sm:px-5 sm:py-3 lg:px-8 lg:py-5 rounded-2xl transition-all duration-300',
          isActive
            ? 'bg-zinc-800 ring-2 ring-yellow-400 shadow-[0_0_60px_rgba(250,204,21,0.2)]'
            : 'bg-zinc-900 ring-1 ring-zinc-800',
        ].join(' ')}>
          <span className={[
            'text-[2.5rem] sm:text-[4rem] lg:text-[7rem]',
            'font-black font-mono tabular-nums leading-none block transition-colors duration-300',
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
          'text-[8px] sm:text-[10px] font-black tracking-[0.3em] uppercase transition-all duration-300',
          isRunning       ? 'text-yellow-400'
          : isActive      ? 'text-zinc-500'
                          : 'text-transparent',
        ].join(' ')}>
          {isRunning ? '● En cours' : isActive ? '◌ En attente' : '—'}
        </span>
      </div>
    </div>
  );
}
