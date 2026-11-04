import React from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-secondary text-text-main hover:brightness-110 active:brightness-95',
  secondary:
    'bg-cyber-yellow text-primary hover:brightness-110 active:brightness-95',
  outline:
    'bg-transparent text-text-main border border-border hover:bg-surface-hover active:bg-raised',
  ghost:
    'bg-transparent text-text-main hover:bg-surface-hover active:bg-raised',
  danger:
    'bg-danger text-text-main hover:brightness-110 active:brightness-95',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  isLoading = false,
  fullWidth = false,
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        h-12 px-6 text-[14px] font-semibold
        rounded-lg
        transition-all duration-180 ease-[cubic-bezier(0.16,1,0.3,1)]
        active:scale-[0.97] motion-reduce:transform-none
        cursor-pointer select-none
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
        ${className}
      `}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : icon ? (
        <span className="w-5 h-5 transition-transform duration-180 group-hover:scale-105 flex items-center justify-center">
          {icon}
        </span>
      ) : null}
      {isLoading ? 'Memproses...' : children}
    </button>
  );
};