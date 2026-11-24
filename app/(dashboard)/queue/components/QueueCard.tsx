'use client';

import React, { useState } from 'react';
import { GripVertical, Clock, Scissors, Trash2, ArrowRight, RotateCcw } from 'lucide-react';
import { Card } from '@/components/ui';

export interface QueueCardProps {
  id?: string;
  queueNo: string;
  timeRange: string;
  customerName: string;
  serviceDetail: string;
  kapsterName: string;
  statusText?: string;
  statusFlowText: string;
  checkInTime?: string;
  actionText?: string;
  progressMinutes?: number;
  totalMinutes?: number;
  paymentStatus?: 'paid' | 'pending';
  columnStatus?: 'waiting' | 'in_progress' | 'completed';
  onAction?: () => void;
  onSecondaryAction?: () => void;
  secondaryActionText?: string;
  onDetailClick?: () => void;
  onDeleteClick?: () => void;
  isDraggable?: boolean;
}

export function QueueCard({
  id,
  queueNo,
  timeRange,
  customerName,
  serviceDetail,
  kapsterName,
  statusText,
  statusFlowText,
  checkInTime,
  actionText,
  progressMinutes,
  totalMinutes,
  paymentStatus,
  columnStatus = 'waiting',
  onAction,
  onSecondaryAction,
  secondaryActionText,
  onDetailClick,
  onDeleteClick,
  isDraggable = true,
}: QueueCardProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData(
      'application/json',
      JSON.stringify({
        id,
        queueNo,
        columnStatus,
        customerName,
      })
    );
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`group transition-all duration-150 ${
        isDragging
          ? 'opacity-40 scale-95 ring-2 ring-secondary ring-dashed rounded-2xl cursor-grabbing'
          : 'cursor-grab active:cursor-grabbing hover:-translate-y-0.5'
      }`}
    >
      <Card
        variant="surface"
        padding="sm"
        className="space-y-3 border-border hover:border-secondary/40 shadow-sm relative overflow-hidden"
      >
        {/* Header: Grip Handle, Queue Number, Time, and Actions */}
        <div className="flex justify-between items-center text-[12px]">
          <div className="flex items-center gap-1.5">
            <span
              title="Seret kartu untuk memindahkan kolom"
              className="text-text-muted/40 group-hover:text-secondary transition-colors -ml-1 cursor-grab"
            >
              <GripVertical className="w-4 h-4" />
            </span>
            <span className="font-bold text-secondary font-mono text-[16px]">{queueNo}</span>
          </div>

          <div className="flex items-center gap-2">
            {onDetailClick && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDetailClick();
                }}
                className="text-text-muted hover:text-secondary text-[11px] font-semibold transition-colors cursor-pointer px-1.5 py-0.5 rounded hover:bg-raised"
              >
                Detail
              </button>
            )}
            {onDeleteClick && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteClick();
                }}
                title="Batalkan / Hapus Antrean"
                className="text-text-muted/60 hover:text-danger text-[11px] transition-colors cursor-pointer p-0.5 rounded hover:bg-danger/10"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
            <span className="text-text-muted font-mono text-[12px] flex items-center gap-1">
              <Clock className="w-3 h-3 text-text-muted/70" />
              {timeRange}
            </span>
          </div>
        </div>

        {/* Customer & Services */}
        <div
          onClick={onDetailClick}
          className="cursor-pointer group/title"
          title="Klik untuk melihat detail lengkap"
        >
          <p className="font-bold text-text-main text-[14px] group-hover/title:text-secondary transition-colors">
            {customerName}
          </p>
          <p className="text-[12px] text-text-muted line-clamp-1">{serviceDetail}</p>
        </div>

        {/* Assigned Barber */}
        <div className="p-2 rounded-xl bg-raised text-[12px] text-text-muted flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Scissors className="w-3.5 h-3.5 text-secondary" />
            <span className="font-medium text-text-main">{kapsterName}</span>
          </div>
          {checkInTime && <span className="font-mono text-[11px] text-text-muted">{checkInTime}</span>}
        </div>

        {/* In-progress progress bar if active */}
        {progressMinutes !== undefined && totalMinutes !== undefined && (
          <div className="space-y-1">
            <div className="w-full bg-raised h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-secondary h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (progressMinutes / totalMinutes) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-text-muted pt-0.5 font-mono">
              <span>
                {progressMinutes} dari {totalMinutes} mnt
              </span>
              <span>{Math.round((progressMinutes / totalMinutes) * 100)}%</span>
            </div>
          </div>
        )}

        {/* Status text if not progress */}
        {statusFlowText && progressMinutes === undefined && (
          <p className="text-[12px] text-text-muted flex items-center justify-between">
            <span>{statusText || statusFlowText}</span>
            {paymentStatus === 'paid' && (
              <span className="text-success text-[11px] font-semibold">Lunas</span>
            )}
            {paymentStatus === 'pending' && (
              <span className="text-warning text-[11px] font-semibold">Menunggu bayar</span>
            )}
          </p>
        )}

        {/* Card Footer Actions */}
        <div className="flex items-center justify-between pt-1 border-t border-border/50 text-[12px]">
          {onSecondaryAction && secondaryActionText ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSecondaryAction();
              }}
              className="text-text-muted hover:text-text-main text-[11px] font-medium flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              {secondaryActionText}
            </button>
          ) : (
            <span className="text-[11px] text-text-muted/60 font-mono">
              {columnStatus === 'waiting' && 'Tarik ke tengah →'}
              {columnStatus === 'in_progress' && 'Tarik ke kanan →'}
              {columnStatus === 'completed' && 'Selesai'}
            </span>
          )}

          {actionText && onAction && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onAction();
              }}
              className="text-secondary hover:text-secondary/80 font-semibold text-[12px] flex items-center gap-1 hover:underline cursor-pointer ml-auto"
            >
              <span>{actionText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </Card>
    </div>
  );
}
