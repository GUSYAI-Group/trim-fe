import React from 'react';

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
  isError?: boolean;
  containerClassName?: string;
}

export const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  helperText,
  errorText,
  isError = false,
  required,
  disabled,
  rows = 3,
  className = '',
  containerClassName = '',
  id,
  ...props
}) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]+/g, '-') : undefined);

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label htmlFor={textareaId} className="text-[14px] font-medium text-text-main">
          {label} {required && <span className="text-secondary">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        required={required}
        disabled={disabled}
        className={`
          w-full p-4 text-[14px] font-medium
          bg-raised/60 border rounded-xl
          text-text-main placeholder:text-text-muted
          outline-none transition-all duration-200 resize-none
          ${isError
            ? 'border-danger focus:ring-2 focus:ring-danger/30'
            : 'border-border focus:border-secondary focus:ring-2 focus:ring-secondary/20'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}
        `}
        {...props}
      />
      {isError && errorText ? (
        <span className="text-[12px] text-danger font-medium">{errorText}</span>
      ) : helperText ? (
        <span className="text-[12px] text-text-muted">{helperText}</span>
      ) : null}
    </div>
  );
};

