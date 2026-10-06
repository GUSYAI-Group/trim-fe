import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
}) => {
  return (
    <label
      className={`inline-flex items-center gap-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`
          w-5 h-5 rounded flex items-center justify-center
          border transition-all duration-200 cursor-pointer
          ${checked
            ? 'bg-secondary border-secondary'
            : 'bg-transparent border-border hover:border-text-muted'
          }
          ${disabled ? 'cursor-not-allowed' : ''}
        `}
      >
        {checked && <Check className="w-3.5 h-3.5 text-text-main" strokeWidth={3} />}
      </button>
      {label && <span className="text-[14px] text-text-main">{label}</span>}
    </label>
  );
};
