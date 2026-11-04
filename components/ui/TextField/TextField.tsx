import React from 'react';
import { AlertCircle } from 'lucide-react';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
  isError?: boolean;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  containerClassName?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  helperText,
  errorText,
  isError = false,
  disabled,
  required,
  leftAddon,
  rightAddon,
  className = '',
  containerClassName = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]+/g, '-') : undefined);

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label htmlFor={inputId} className="text-[14px] font-medium text-text-main">
          {label} {required && <span className="text-secondary">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {leftAddon && (
          <div className="absolute left-4 text-[14px] text-text-muted pointer-events-none flex items-center">
            {leftAddon}
          </div>
        )}
        <input
          id={inputId}
          required={required}
          className={`
            w-full h-12 px-4 text-[14px] font-medium
            bg-raised/60 border rounded-xl
            text-text-main placeholder:text-text-muted
            outline-none transition-all duration-200
            ${leftAddon ? 'pl-11' : ''}
            ${rightAddon || isError ? 'pr-12' : ''}
            ${isError
              ? 'border-danger focus:ring-2 focus:ring-danger/30'
              : 'border-border focus:border-secondary focus:ring-2 focus:ring-secondary/20'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed bg-raised/30' : ''}
            ${className}
          `}
          disabled={disabled}
          {...props}
        />
        {isError && !rightAddon ? (
          <AlertCircle className="w-4 h-4 text-danger absolute right-4 pointer-events-none" />
        ) : rightAddon ? (
          <div className="absolute right-3.5 text-[13px] text-text-muted flex items-center">
            {rightAddon}
          </div>
        ) : null}
      </div>
      {isError && errorText ? (
        <span className="text-[12px] text-danger font-medium">{errorText}</span>
      ) : helperText ? (
        <span className="text-[12px] text-text-muted">{helperText}</span>
      ) : null}
    </div>
  );
};
