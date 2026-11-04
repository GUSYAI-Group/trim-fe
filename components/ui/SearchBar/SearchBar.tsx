import React from 'react';
import { Search, X, Loader2 } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Cari produk atau pesanan...',
  isLoading = false,
  size = 'md',
  className = '',
}) => {
  const heightClass = size === 'sm' ? 'h-10 pl-10 pr-9 text-[13px]' : 'h-12 pl-11 pr-10 text-[14px]';
  const iconLeftClass = size === 'sm' ? 'left-3.5 w-4 h-4' : 'left-4 w-5 h-5';

  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className={`absolute ${iconLeftClass} text-text-muted pointer-events-none`} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`
          w-full ${heightClass}
          bg-raised/60 border border-border rounded-xl
          text-text-main placeholder:text-text-muted font-medium
          outline-none transition-all duration-200
          focus:border-secondary focus:ring-2 focus:ring-secondary/20
        `}
      />
      {isLoading ? (
        <Loader2 className="absolute right-3.5 w-4 h-4 text-secondary animate-spin" />
      ) : value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3.5 text-text-muted hover:text-text-main transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      ) : null}
    </div>
  );
};
