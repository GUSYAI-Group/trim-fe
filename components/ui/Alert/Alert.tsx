import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react';

type AlertVariant = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  variant?: AlertVariant;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const alertConfig: Record<AlertVariant, { icon: React.ReactNode; bg: string; border: string }> = {
  success: {
    icon: <CheckCircle2 className="w-5 h-5 text-success" />,
    bg: 'bg-success/15',
    border: 'border-l-success',
  },
  error: {
    icon: <XCircle className="w-5 h-5 text-danger" />,
    bg: 'bg-danger/15',
    border: 'border-l-danger',
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5 text-warning" />,
    bg: 'bg-warning/15',
    border: 'border-l-warning',
  },
  info: {
    icon: <Info className="w-5 h-5 text-text-muted" />,
    bg: 'bg-surface-hover',
    border: 'border-l-text-muted',
  },
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  description,
  action,
}) => {
  const config = alertConfig[variant];

  return (
    <div
      className={`
        flex items-start gap-3
        ${config.bg} rounded-r-lg
        border-l-4 ${config.border}
        p-4 w-full
      `}
    >
      <div className="shrink-0 mt-0.5">{config.icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-text-main">{title}</p>
        {description && (
          <p className="text-[12px] text-text-muted mt-0.5 leading-relaxed">{description}</p>
        )}
        {action && (
          <div className="mt-2">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};
