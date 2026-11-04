import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  helperText?: string;
  errorText?: string;
  isError?: boolean;
  options: SelectOption[];
  placeholder?: string;
  size?: 'sm' | 'md';
  containerClassName?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  helperText,
  errorText,
  isError = false,
  options,
  placeholder,
  size = 'md',
  required,
  disabled,
  className = '',
  containerClassName = '',
  id,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]+/g, '-') : undefined);
  const sizeClass = size === 'sm' ? 'h-10 pl-3.5 pr-9 text-[13px]' : 'h-12 pl-4 pr-10 text-[14px]';

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label htmlFor={selectId} className="text-[14px] font-medium text-text-main">
          {label} {required && <span className="text-secondary">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          required={required}
          disabled={disabled}
          className={`
            w-full appearance-none font-medium
            bg-raised/60 border rounded-xl
            text-text-main outline-none transition-all duration-200 cursor-pointer
            ${sizeClass}
            ${isError
              ? 'border-danger focus:ring-2 focus:ring-danger/30'
              : 'border-border focus:border-secondary focus:ring-2 focus:ring-secondary/20'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${className}
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="bg-surface text-text-muted">
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-surface text-text-main">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-text-muted absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
      {isError && errorText ? (
        <span className="text-[12px] text-danger font-medium">{errorText}</span>
      ) : helperText ? (
        <span className="text-[12px] text-text-muted">{helperText}</span>
      ) : null}
    </div>
  );
};

