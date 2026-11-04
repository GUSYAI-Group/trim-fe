import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  activeLabel = 'Aktif',
  inactiveLabel = 'Nonaktif',
}) => {
  return (
    <div className="inline-flex items-center gap-2.5">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`
          w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer
          ${checked ? 'bg-secondary' : 'bg-raised border border-border'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <div
          className={`
            bg-text-main w-4 h-4 rounded-full shadow-md transform transition-transform
            ${checked ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
      {(activeLabel || inactiveLabel) && (
        <span className={`text-[13px] font-bold ${checked ? 'text-success' : 'text-text-muted'}`}>
          {checked ? activeLabel : inactiveLabel}
        </span>
      )}
    </div>
  );
};

