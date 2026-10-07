import React from 'react';
import { X, Info, CheckCircle2, AlertTriangle } from 'lucide-react';

type ModalVariant = 'info' | 'confirmation' | 'destructive';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: ModalVariant;
  title: string;
  description: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  children?: React.ReactNode;
  hideHeaderBadge?: boolean;
}

const variantConfig: Record<ModalVariant, { icon: React.ReactNode; labelColor: string; primaryBtnClass: string }> = {
  info: {
    icon: <Info className="w-5 h-5 text-secondary" />,
    labelColor: 'text-text-muted',
    primaryBtnClass: 'bg-secondary text-text-main hover:brightness-110',
  },
  confirmation: {
    icon: <CheckCircle2 className="w-5 h-5 text-success" />,
    labelColor: 'text-success',
    primaryBtnClass: 'bg-secondary text-text-main hover:brightness-110',
  },
  destructive: {
    icon: <AlertTriangle className="w-5 h-5 text-danger" />,
    labelColor: 'text-danger',
    primaryBtnClass: 'bg-danger text-text-main hover:brightness-110',
  },
};

const variantLabel: Record<ModalVariant, string> = {
  info: 'INFORMASI',
  confirmation: 'KONFIRMASI',
  destructive: 'AKSI DESTRUKTIF',
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  variant = 'info',
  title,
  description,
  primaryLabel = 'Mengerti',
  secondaryLabel,
  onPrimary,
  onSecondary,
  children,
  hideHeaderBadge,
}) => {
  if (!isOpen) return null;

  const config = variantConfig[variant];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-primary/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-surface border border-border rounded-2xl p-6 w-full max-w-100 mx-4 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {!hideHeaderBadge && (
              <>
                {config.icon}
                <span className={`text-[12px] font-semibold uppercase tracking-wider ${config.labelColor}`}>
                  {variantLabel[variant]}
                </span>
              </>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-main transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <h2 className="text-[20px] font-bold text-text-main mb-2 font-outfit">{title}</h2>
        <p className="text-[14px] text-text-muted leading-relaxed mb-6">{description}</p>

        {/* Custom Children / Form */}
        {children && <div className="mb-8">{children}</div>}

        {/* Actions */}
        <div className="flex gap-3">
          {secondaryLabel && (
            <button
              onClick={onSecondary || onClose}
              className="flex-1 h-12 px-6 rounded-lg border border-border text-text-main font-semibold text-[14px] hover:bg-surface-hover transition-all cursor-pointer"
            >
              {secondaryLabel}
            </button>
          )}
          <button
            onClick={onPrimary || onClose}
            className={`flex-1 h-12 px-6 rounded-lg font-semibold text-[14px] transition-all cursor-pointer ${config.primaryBtnClass}`}
          >
            {primaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
