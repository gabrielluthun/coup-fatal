import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'success' | 'danger' | 'neutral';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const variantClasses: Record<Variant, string> = {
  primary: 'bg-blue-600 hover:bg-blue-500 text-white',
  success: 'bg-green-600 hover:bg-green-500 text-white',
  danger:  'bg-red-600 hover:bg-red-500 text-white',
  neutral: 'bg-zinc-600 hover:bg-zinc-500 text-white',
};

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={[
        'px-5 py-2.5 rounded-lg font-semibold text-sm tracking-wide',
        'transition-colors duration-150 cursor-pointer',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        variantClasses[variant],
        className,
      ].join(' ')}
    >
      {children}
    </button>
  );
}
