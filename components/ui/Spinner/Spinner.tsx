import React from 'react';
import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-10 h-10',
};

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', label }) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <Loader2 className={`${sizeMap[size]} text-secondary animate-spin`} />
      {label && (
        <p className="text-[14px] text-text-muted">{label}</p>
      )}
    </div>
  );
};
