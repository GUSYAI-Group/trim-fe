import React from 'react';
import { Check, X, Clock, AlertTriangle } from 'lucide-react';

export type BadgeVariant =
  | 'draft'
  | 'lunas'
  | 'selesai'
  | 'batal'
  | 'error'
  | 'pending'
  | 'ngantre'
  | 'ngangtre'
  | 'aktif'
  | 'nonaktif'
  | 'aman'
  | 'menipis'
  | 'habis'
  | 'buka'
  | 'tutup'
  | 'menunggu'
  | 'gagal'
  | 'dikembalikan'
  | 'owner'
  | 'admin'
  | 'barber'
  | 'customer'
  | 'success'
  | 'warning'
  | 'danger'
  | 'muted'
  | 'accent';

interface BadgeProps {
  variant: BadgeVariant;
  label?: string;
  children?: React.ReactNode;
  showDot?: boolean;
  className?: string;
}

const badgeConfig: Record<
  BadgeVariant,
  { bg: string; text: string; dot: string; defaultLabel: string; icon?: React.ReactNode }
> = {
  draft: {
    bg: 'bg-border/40 border border-border',
    text: 'text-text-muted',
    dot: 'bg-text-muted',
    defaultLabel: 'Draft',
    icon: <Clock className="w-3 h-3" />,
  },
  lunas: {
    bg: 'bg-success/15 border border-success/20',
    text: 'text-success',
    dot: 'bg-success',
    defaultLabel: 'Lunas',
    icon: <Check className="w-3 h-3" />,
  },
  selesai: {
    bg: 'bg-success/15 border border-success/20',
    text: 'text-success',
    dot: 'bg-success',
    defaultLabel: 'Selesai',
    icon: <Check className="w-3 h-3" />,
  },
  batal: {
    bg: 'bg-danger/15 border border-danger/20',
    text: 'text-danger',
    dot: 'bg-danger',
    defaultLabel: 'Batal',
    icon: <X className="w-3 h-3" />,
  },
  error: {
    bg: 'bg-danger/15 border border-danger/20',
    text: 'text-danger',
    dot: 'bg-danger',
    defaultLabel: 'Error',
    icon: <X className="w-3 h-3" />,
  },
  pending: {
    bg: 'bg-warning/15 border border-warning/20',
    text: 'text-warning',
    dot: 'bg-warning',
    defaultLabel: 'Pending',
    icon: <Clock className="w-3 h-3" />,
  },
  ngantre: {
    bg: 'bg-warning/15 border border-warning/20',
    text: 'text-warning',
    dot: 'bg-warning',
    defaultLabel: 'Ngantre',
    icon: <AlertTriangle className="w-3 h-3" />,
  },
  ngangtre: {
    bg: 'bg-warning/15 border border-warning/20',
    text: 'text-warning',
    dot: 'bg-warning',
    defaultLabel: 'Ngantre',
    icon: <AlertTriangle className="w-3 h-3" />,
  },
  aktif: {
    bg: 'bg-success/15 border border-success/20',
    text: 'text-success',
    dot: 'bg-success',
    defaultLabel: 'Aktif',
  },
  nonaktif: {
    bg: 'bg-raised border border-border',
    text: 'text-text-muted',
    dot: 'bg-text-muted',
    defaultLabel: 'Nonaktif',
  },
  aman: {
    bg: 'bg-success/15 border border-success/20',
    text: 'text-success',
    dot: 'bg-success',
    defaultLabel: 'Aman',
  },
  menipis: {
    bg: 'bg-warning/15 border border-warning/20',
    text: 'text-warning',
    dot: 'bg-warning',
    defaultLabel: 'Menipis',
  },
  habis: {
    bg: 'bg-danger/15 border border-danger/20',
    text: 'text-danger',
    dot: 'bg-danger',
    defaultLabel: 'Habis',
  },
  buka: {
    bg: 'bg-success/15 border border-success/20',
    text: 'text-success',
    dot: 'bg-success',
    defaultLabel: 'Buka',
  },
  tutup: {
    bg: 'bg-danger/15 border border-danger/20',
    text: 'text-danger',
    dot: 'bg-danger',
    defaultLabel: 'Tutup',
  },
  menunggu: {
    bg: 'bg-warning/15 border border-warning/20',
    text: 'text-warning',
    dot: 'bg-warning',
    defaultLabel: 'Menunggu',
  },
  gagal: {
    bg: 'bg-danger/15 border border-danger/20',
    text: 'text-danger',
    dot: 'bg-danger',
    defaultLabel: 'Gagal',
  },
  dikembalikan: {
    bg: 'bg-secondary/15 border border-secondary/30',
    text: 'text-secondary',
    dot: 'bg-secondary',
    defaultLabel: 'Dikembalikan',
  },
  owner: {
    bg: 'bg-secondary/15 border border-secondary/30',
    text: 'text-secondary',
    dot: 'bg-secondary',
    defaultLabel: 'Owner',
  },
  admin: {
    bg: 'bg-raised border border-border',
    text: 'text-text-muted',
    dot: 'bg-text-muted',
    defaultLabel: 'Admin',
  },
  barber: {
    bg: 'bg-raised border border-border',
    text: 'text-text-muted',
    dot: 'bg-text-muted',
    defaultLabel: 'Barber',
  },
  customer: {
    bg: 'bg-raised border border-border',
    text: 'text-text-muted',
    dot: 'bg-text-muted',
    defaultLabel: 'Customer',
  },
  success: {
    bg: 'bg-success/15 border border-success/20',
    text: 'text-success',
    dot: 'bg-success',
    defaultLabel: 'Sukses',
  },
  warning: {
    bg: 'bg-warning/15 border border-warning/20',
    text: 'text-warning',
    dot: 'bg-warning',
    defaultLabel: 'Peringatan',
  },
  danger: {
    bg: 'bg-danger/15 border border-danger/20',
    text: 'text-danger',
    dot: 'bg-danger',
    defaultLabel: 'Bahaya',
  },
  muted: {
    bg: 'bg-raised border border-border',
    text: 'text-text-muted',
    dot: 'bg-text-muted',
    defaultLabel: 'Nonaktif',
  },
  accent: {
    bg: 'bg-secondary/15 border border-secondary/30',
    text: 'text-secondary',
    dot: 'bg-secondary',
    defaultLabel: 'Aksen',
  },
};

export const Badge: React.FC<BadgeProps> = ({
  variant,
  label,
  children,
  showDot,
  className = '',
}) => {
  const config = badgeConfig[variant];
  const displayLabel = children ?? label ?? config.defaultLabel;
  const useDot = showDot ?? !config.icon;

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-3 py-1 rounded-full
        text-[12px] font-semibold w-fit
        ${config.bg} ${config.text} ${className}
      `}
    >
      {useDot ? (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
      ) : (
        config.icon
      )}
      <span>{displayLabel}</span>
    </span>
  );
};
