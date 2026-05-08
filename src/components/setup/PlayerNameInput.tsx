type PlayerNameInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export function PlayerNameInput({ label, value, onChange }: PlayerNameInputProps) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-zinc-500 text-sm font-bold tracking-[0.2em] uppercase">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Nom du ${label.toLowerCase()}`}
        maxLength={30}
        className="bg-zinc-900 text-white rounded-xl px-5 py-4 sm:px-8 sm:py-5 text-base sm:text-lg outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-zinc-700 transition-all"
      />
    </div>
  );
}
