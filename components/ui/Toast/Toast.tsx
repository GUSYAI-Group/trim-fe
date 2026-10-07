'use client';

import React, { useEffect } from 'react';
import { X, CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react';

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: ToastVariant;
  title: string;
  description?: string;
  autoClose?: number; // ms, default 5000
}

const toastConfig: Record<ToastVariant, { icon: React.ReactNode; borderColor: string; labelColor: string }> = {
  success: {
    icon: <CheckCircle2 className="w-5 h-5 text-success" />,
    borderColor: 'border-l-success',
    labelColor: 'text-success',
  },
  error: {
    icon: <XCircle className="w-5 h-5 text-danger" />,
    borderColor: 'border-l-danger',
    labelColor: 'text-danger',
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5 text-warning" />,
    borderColor: 'border-l-warning',
    labelColor: 'text-warning',
  },
  info: {
    icon: <Info className="w-5 h-5 text-text-muted" />,
    borderColor: 'border-l-text-muted',
    labelColor: 'text-text-muted',
  },
};

export const Toast: React.FC<ToastProps> = ({
  isOpen,
  onClose,
  variant = 'success',
  title,
  description,
  autoClose = 5000,
}) => {
  useEffect(() => {
    if (isOpen && autoClose > 0) {
      const timer = setTimeout(onClose, autoClose);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, onClose]);

  if (!isOpen) return null;

  const config = toastConfig[variant];

  return (
    <div
      className={`
        flex items-start gap-3
        bg-surface border border-border rounded-lg
        p-4 min-w-[320px] max-w-105
        shadow-lg shadow-black/20
      `}
    >
      <div className="shrink-0 mt-0.5">{config.icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-text-main">{title}</p>
        {description && (
          <p className="text-[12px] text-text-muted mt-0.5">{description}</p>
        )}
      </div>
      <button
        onClick={onClose}
        className="shrink-0 text-text-muted hover:text-text-main transition-colors cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
