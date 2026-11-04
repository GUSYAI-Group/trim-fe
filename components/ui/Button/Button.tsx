import React from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-secondary text-text-main hover:brightness-110 active:brightness-90 shadow-lg shadow-secondary/20',
  secondary:
    'bg-cyber-yellow text-primary hover:brightness-110 active:brightness-90',
  outline:
    'bg-surface text-text-main border border-border hover:bg-raised active:bg-surface-hover',
  ghost:
    'bg-transparent text-text-main hover:bg-surface-hover active:bg-raised',
  danger:
    'bg-danger text-text-main hover:brightness-110 active:brightness-90',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-[13px] rounded-lg',
  md: 'h-11 px-5 text-[14px] rounded-xl',
  lg: 'h-12 px-6 text-[14px] rounded-lg',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'lg',
  isLoading = false,
  fullWidth = false,
  icon,
  leftIcon,
  rightIcon,
  href,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const isDisabled = disabled || isLoading;
  const resolvedLeftIcon = icon ?? leftIcon;

  const classes = `
    inline-flex items-center justify-center gap-2
    font-semibold
    transition-all duration-200 ease-in-out
    cursor-pointer shrink-0
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'active:scale-[0.98]'}
    ${className}
  `.trim();

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : resolvedLeftIcon ? (
        <span className="inline-flex items-center justify-center shrink-0">{resolvedLeftIcon}</span>
      ) : null}
      <span>{isLoading ? 'Memproses' : children}</span>
      {!isLoading && rightIcon ? (
        <span className="inline-flex items-center justify-center shrink-0">{rightIcon}</span>
      ) : null}
    </>
  );

  if (href && !isDisabled) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      disabled={isDisabled}
      {...props}
    >
      {content}
    </button>
  );
};
