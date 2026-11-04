import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'surface' | 'interactive' | 'highlighted';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

const variantStyles = {
  default: 'border-border',
  surface: 'border-border',
  interactive: 'border-border hover:border-secondary focus-within:border-secondary cursor-pointer',
  highlighted: 'border-secondary',
};

const paddingStyles = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-6 md:p-8',
};

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-surface border rounded-2xl
        transition-all duration-200
        ${paddingStyles[padding]}
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
