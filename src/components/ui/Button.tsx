import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'success' | 'danger' | 'neutral';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const variantClasses: Record<Variant, string> = {
  primary: 'bg-yellow-400 hover:bg-yellow-300 text-zinc-900',
  success: 'bg-emerald-500 hover:bg-emerald-400 text-white',
  danger:  'bg-red-500 hover:bg-red-400 text-white',
  neutral: 'bg-zinc-700 hover:bg-zinc-600 text-zinc-200',
};

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={[
        'px-6 py-3 rounded-xl font-bold text-sm tracking-wide uppercase',
        'transition-all duration-150 cursor-pointer',
        'disabled:opacity-30 disabled:cursor-not-allowed',
        variantClasses[variant],
        className,
      ].join(' ')}
    >
      {children}
    </button>
  );
}
