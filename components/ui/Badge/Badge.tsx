import React from 'react';
import { Check, X, Clock, AlertTriangle } from 'lucide-react';

type BadgeVariant = 'draft' | 'lunas' | 'selesai' | 'batal' | 'error' | 'pending' | 'ngangtre';

interface BadgeProps {
  variant: BadgeVariant;
  label?: string;
}

const badgeConfig: Record<BadgeVariant, { bg: string; text: string; icon: React.ReactNode }> = {
  draft: {
    bg: 'bg-border/30',
    text: 'text-text-muted',
    icon: <Clock className="w-3 h-3" />,
  },
  lunas: {
    bg: 'bg-success/15',
    text: 'text-success',
    icon: <Check className="w-3 h-3" />,
  },
  selesai: {
    bg: 'bg-success/15',
    text: 'text-success',
    icon: <Check className="w-3 h-3" />,
  },
  batal: {
    bg: 'bg-danger/15',
    text: 'text-danger',
    icon: <X className="w-3 h-3" />,
  },
  error: {
    bg: 'bg-danger/15',
    text: 'text-danger',
    icon: <X className="w-3 h-3" />,
  },
  pending: {
    bg: 'bg-warning/15',
    text: 'text-warning',
    icon: <Clock className="w-3 h-3" />,
  },
  ngangtre: {
    bg: 'bg-warning/15',
    text: 'text-warning',
    icon: <AlertTriangle className="w-3 h-3" />,
  },
};

export const Badge: React.FC<BadgeProps> = ({ variant, label }) => {
  const config = badgeConfig[variant];
  const displayLabel = label || variant.charAt(0).toUpperCase() + variant.slice(1);

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-3 py-1 rounded-full
        text-[12px] font-medium
        ${config.bg} ${config.text}
      `}
    >
      {config.icon}
      {displayLabel}
    </span>
  );
};
