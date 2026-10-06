import React from 'react';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  errorText?: string;
  isError?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  helperText,
  errorText,
  isError = false,
  disabled,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="text-[14px] font-medium text-text-main">
        {label}
      </label>
      <input
        id={inputId}
        className={`
          h-[48px] px-4 text-[14px] font-medium
          bg-transparent border rounded-lg
          text-text-main placeholder-text-muted
          outline-none transition-all duration-200
          ${isError
            ? 'border-danger focus:ring-2 focus:ring-danger/30'
            : 'border-border focus:border-secondary focus:ring-2 focus:ring-secondary/30'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}
        `}
        disabled={disabled}
        {...props}
      />
      {isError && errorText ? (
        <span className="text-[12px] text-danger">{errorText}</span>
      ) : helperText ? (
        <span className="text-[12px] text-text-muted">{helperText}</span>
      ) : null}
    </div>
  );
};
