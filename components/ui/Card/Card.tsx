import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'interactive' | 'highlighted';
  className?: string;
  onClick?: () => void;
}

const variantStyles = {
  default: 'border-border',
  interactive: 'border-border hover:border-secondary focus-within:border-secondary cursor-pointer',
  highlighted: 'border-secondary',
};

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-surface border rounded-2xl p-6
        transition-all duration-200
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
