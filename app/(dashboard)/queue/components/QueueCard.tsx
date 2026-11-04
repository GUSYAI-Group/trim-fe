import React from 'react';
import { Card } from '@/components/ui';

export interface QueueCardProps {
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
  onAction?: () => void;
}

export function QueueCard({
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
  onAction,
}: QueueCardProps) {
  return (
    <Card variant="surface" padding="sm" className="space-y-3">
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold text-secondary font-mono">{queueNo}</span>
        <span className="text-text-muted font-mono">{timeRange}</span>
      </div>

      <div>
        <p className="font-bold text-white text-sm">{customerName}</p>
        <p className="text-xs text-text-muted">{serviceDetail}</p>
      </div>

      <div className="p-2 rounded-xl bg-raised text-xs text-text-muted flex items-center gap-1.5">
        <span>✂️</span>
        <span className="font-medium text-white">{kapsterName}</span>
      </div>

      {progressMinutes && totalMinutes && (
        <div className="space-y-1">
          <div className="w-full bg-raised h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-secondary h-full rounded-full"
              style={{ width: `${(progressMinutes / totalMinutes) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-text-muted pt-0.5">
            <span>
              {progressMinutes} dari {totalMinutes} menit
            </span>
            {actionText && (
              <button
                type="button"
                onClick={onAction}
                className="text-secondary font-bold hover:underline cursor-pointer"
              >
                {actionText}
              </button>
            )}
          </div>
        </div>
      )}

      {statusFlowText && !progressMinutes && (
        <p className="text-[11px] text-text-muted">
          {statusText ? `${statusText} • ${statusFlowText}` : statusFlowText}
        </p>
      )}

      <div className="flex items-center justify-between pt-0.5 text-xs">
        {checkInTime && <span className="text-text-muted">{checkInTime}</span>}
        {paymentStatus === 'paid' && (
          <span className="text-emerald-400 font-semibold">Lunas (paid)</span>
        )}
        {paymentStatus === 'pending' && (
          <span className="text-amber-400 font-semibold">Menunggu bayar (pending)</span>
        )}
        {actionText && !progressMinutes && (
          <button
            type="button"
            onClick={onAction}
            className="text-secondary font-bold hover:underline cursor-pointer ml-auto"
          >
            {actionText}
          </button>
        )}
      </div>
    </Card>
  );
}

