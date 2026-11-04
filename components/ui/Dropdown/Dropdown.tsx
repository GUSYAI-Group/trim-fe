'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps {
  options: (DropdownOption | string)[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  align?: 'left' | 'right';
  variant?: 'filter' | 'form';
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  id?: string;
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
  fullWidth = false,
  align = 'left',
  variant = 'filter',
  className = '',
  triggerClassName = '',
  menuClassName = '',
  id,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // Normalisasi opsi ke bentuk { value, label }
  const normalizedOptions: DropdownOption[] = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);
  const displayText = selectedOption?.label || placeholder || normalizedOptions[0]?.label || '';

  // Handle klik di luar untuk menutup dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle tombol keyboard (Escape, ArrowDown, ArrowUp, Enter)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < normalizedOptions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : normalizedOptions.length - 1
        );
      } else if (e.key === 'Enter' && highlightedIndex >= 0) {
        e.preventDefault();
        const selected = normalizedOptions[highlightedIndex];
        if (selected && !selected.disabled) {
          onChange?.(selected.value);
          setIsOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, highlightedIndex, normalizedOptions, onChange]);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const isFormVariant = variant === 'form' || fullWidth;

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative ${isFormVariant ? 'w-full' : 'inline-block'} ${className}`}
    >
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            setIsOpen((prev) => !prev);
            const activeIdx = normalizedOptions.findIndex((o) => o.value === value);
            setHighlightedIndex(activeIdx >= 0 ? activeIdx : 0);
          }
        }}
        className={
          isFormVariant
            ? `w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-raised/60 border text-[14px] font-medium text-white transition-all active:scale-[0.99] cursor-pointer font-outfit select-none ${
                isOpen
                  ? 'border-secondary ring-1 ring-secondary/20'
                  : 'border-border/80 hover:border-secondary/50'
              } ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${triggerClassName}`
            : `inline-flex items-center justify-between gap-3 px-4 py-2 rounded-xl bg-surface border text-[14px] font-medium text-white transition-all active:scale-[0.98] cursor-pointer font-outfit select-none ${
                isOpen
                  ? 'border-secondary'
                  : 'border-border hover:border-secondary/50'
              } ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${triggerClassName}`
        }
      >
        <span className="truncate">{displayText}</span>
        <ChevronDown
          className={`w-4 h-4 text-text-muted transition-transform duration-200 shrink-0 ml-1.5 ${
            isOpen ? 'rotate-180 text-white' : ''
          }`}
        />
      </button>

      {/* Popover Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute top-full mt-2 bg-[#1C1C1F] border border-border/80 rounded-2xl p-1.5 z-50 shadow-2xl shadow-black/80 font-outfit ${
              isFormVariant
                ? 'left-0 right-0 max-h-60 overflow-y-auto no-scrollbar'
                : 'min-w-44'
            } ${align === 'right' ? 'right-0' : 'left-0'} ${menuClassName}`}
          >
            <div className="space-y-1">
              {normalizedOptions.map((opt, index) => {
                const isActive = opt.value === value;
                const isHighlighted = highlightedIndex === index;

                return (
                  <button
                    key={opt.value}
                    type="button"
                    disabled={opt.disabled}
                    onClick={() => handleSelect(opt.value)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] font-bold font-outfit transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#2A1E19] text-secondary'
                        : isHighlighted
                        ? 'text-white bg-raised'
                        : 'text-white hover:bg-raised'
                    } ${opt.disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

