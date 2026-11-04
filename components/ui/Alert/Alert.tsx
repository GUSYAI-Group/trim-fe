import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react';

export type AlertVariant = 'success' | 'error' | 'warning' | 'info' | 'accent';

interface AlertProps {
  variant?: AlertVariant;
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const alertConfig: Record<AlertVariant, { icon: React.ReactNode; bg: string; border: string; titleColor: string }> = {
  success: {
    icon: <CheckCircle2 className="w-5 h-5 text-success" />,
    bg: 'bg-success/15',
    border: 'border-l-success',
    titleColor: 'text-text-main',
  },
  error: {
    icon: <XCircle className="w-5 h-5 text-danger" />,
    bg: 'bg-danger/15',
    border: 'border-l-danger',
    titleColor: 'text-danger',
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5 text-warning" />,
    bg: 'bg-warning/15',
    border: 'border-l-warning',
    titleColor: 'text-warning',
  },
  info: {
    icon: <Info className="w-5 h-5 text-text-muted" />,
    bg: 'bg-surface-hover',
    border: 'border-l-text-muted',
    titleColor: 'text-text-main',
  },
  accent: {
    icon: <Info className="w-5 h-5 text-secondary" />,
    bg: 'bg-secondary/10 border border-secondary/20',
    border: 'border-l-secondary',
    titleColor: 'text-secondary',
  },
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  description,
  action,
  icon,
  className = '',
}) => {
  const config = alertConfig[variant];

  return (
    <div
      className={`
        flex items-start gap-3.5
        ${config.bg} rounded-xl
        border-l-4 ${config.border}
        p-4 md:p-5 w-full
        ${className}
      `}
    >
      <div className="shrink-0 mt-0.5">{icon || config.icon}</div>
      <div className="flex-1 min-w-0">
        <p className={`text-[14px] font-bold ${config.titleColor}`}>{title}</p>
        {description && (
          <p className="text-[13px] text-text-muted mt-1 leading-relaxed">{description}</p>
        )}
        {action && <div className="mt-2.5">{action}</div>}
      </div>
    </div>
  );
};
