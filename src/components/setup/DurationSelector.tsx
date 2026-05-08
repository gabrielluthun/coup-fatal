import { MAX_CUSTOM_SECONDS, MIN_CUSTOM_SECONDS } from './useDurationField';

const DURATION_OPTIONS = [
  { label: '30 s', value: 30_000 },
  { label: '60 s', value: 60_000 },
  { label: '90 s', value: 90_000 },
];

type DurationButtonProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

function DurationButton({ label, selected, onClick }: DurationButtonProps) {
  const baseClass =
    'flex-1 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-150';
  const stateClass = selected
    ? 'bg-yellow-400 text-zinc-900 shadow-[0_0_20px_rgba(250,204,21,0.25)]'
    : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300';

  return (
    <button type="button" onClick={onClick} className={`${baseClass} ${stateClass}`}>
      {label}
    </button>
  );
}

type CustomDurationInputProps = {
  value: string;
  onChange: (value: string) => void;
};

function CustomDurationInput({ value, onChange }: CustomDurationInputProps) {
  return (
    <div className="flex items-center gap-3 mt-1">
      <input
        type="number"
        inputMode="numeric"
        min={MIN_CUSTOM_SECONDS}
        max={MAX_CUSTOM_SECONDS}
        step={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Entre ${MIN_CUSTOM_SECONDS} et ${MAX_CUSTOM_SECONDS}`}
        className="flex-1 bg-zinc-900 text-white rounded-xl px-5 py-3.5 text-base outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-zinc-700 transition-all"
      />
      <span className="text-zinc-500 text-sm font-bold tracking-[0.2em] uppercase">
        sec
      </span>
    </div>
  );
}

type DurationSelectorProps = {
  value: number;
  onSelectPreset: (value: number) => void;
  isCustom: boolean;
  onSelectCustom: () => void;
  customSeconds: string;
  onCustomSecondsChange: (value: string) => void;
};

export function DurationSelector({
  value,
  onSelectPreset,
  isCustom,
  onSelectCustom,
  customSeconds,
  onCustomSecondsChange,
}: DurationSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-zinc-500 text-[11px] font-bold tracking-[0.2em] uppercase">
        Durée initiale
      </label>
      <div className="flex gap-3">
        {DURATION_OPTIONS.map((opt) => (
          <DurationButton
            key={opt.value}
            label={opt.label}
            selected={!isCustom && value === opt.value}
            onClick={() => onSelectPreset(opt.value)}
          />
        ))}
        <DurationButton label="Perso" selected={isCustom} onClick={onSelectCustom} />
      </div>
      {isCustom && (
        <CustomDurationInput value={customSeconds} onChange={onCustomSecondsChange} />
      )}
    </div>
  );
}
