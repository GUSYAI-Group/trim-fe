import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: 'default' | 'active' | 'disabled';
  tooltip?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'default',
  tooltip,
  disabled,
  className = '',
  ...props
}) => {
  const isDisabled = variant === 'disabled' || disabled;

  const variantStyles = {
    default: 'text-text-muted hover:text-text-main hover:bg-surface-hover',
    active: 'text-secondary bg-secondary/15',
    disabled: 'text-text-muted opacity-40 cursor-not-allowed',
  };

  return (
    <button
      title={tooltip}
      disabled={isDisabled}
      className={`
        w-12 h-12 rounded-lg
        flex items-center justify-center
        transition-all duration-150 ease-out cursor-pointer
        active:scale-[0.96] motion-reduce:transform-none
        ${variantStyles[variant]}
        ${isDisabled ? 'pointer-events-none' : ''}
        ${className}
      `}
      {...props}
    >
      {icon}
    </button>
  );
};
