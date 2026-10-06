import React from 'react';
import { Search, X, Loader2 } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Cari produk atau pesanan...',
  isLoading = false,
}) => {
  return (
    <div className="relative flex items-center">
      <Search className="absolute left-4 w-5 h-5 text-text-muted" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full h-12 pl-12 pr-10
          bg-transparent border border-border rounded-lg
          text-[14px] text-text-main placeholder-text-muted
          outline-none transition-all duration-200
          focus:border-secondary focus:ring-2 focus:ring-secondary/30
        "
      />
      {isLoading ? (
        <Loader2 className="absolute right-4 w-5 h-5 text-secondary animate-spin" />
      ) : value ? (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 text-text-muted hover:text-text-main transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      ) : null}
    </div>
  );
};
