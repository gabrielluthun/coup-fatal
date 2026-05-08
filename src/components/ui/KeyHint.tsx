type KeyHintProps = {
  keys: string | string[];
  className?: string;
};

export function KeyHint({ keys, className = '' }: KeyHintProps) {
  const list = Array.isArray(keys) ? keys : [keys];
  return (
    <span
      aria-hidden
      className={`inline-flex items-center justify-center gap-1 text-[9px] tracking-[0.25em] uppercase text-zinc-600 ${className}`}
    >
      {list.map((label, i) => (
        <kbd
          key={i}
          className="px-1.5 py-0.5 rounded-md bg-zinc-800/60 border border-zinc-700/60 font-mono text-[10px] text-zinc-400"
        >
          {label}
        </kbd>
      ))}
    </span>
  );
}
