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
      <div className="flex justify-between items-center text-[12px]">
        <span className="font-bold text-secondary font-mono text-[16px]">{queueNo}</span>
        <span className="text-text-muted font-mono text-[12px]">{timeRange}</span>
      </div>

      <div>
        <p className="font-bold text-text-main text-[14px]">{customerName}</p>
        <p className="text-[12px] text-text-muted">{serviceDetail}</p>
      </div>

      <div className="p-2 rounded-xl bg-raised text-[12px] text-text-muted flex items-center gap-1.5">
        <span>✂️</span>
        <span className="font-medium text-text-main">{kapsterName}</span>
      </div>

      {progressMinutes && totalMinutes && (
        <div className="space-y-1">
          <div className="w-full bg-raised h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-secondary h-full rounded-full"
              style={{ width: `${(progressMinutes / totalMinutes) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[12px] text-text-muted pt-0.5">
            <span className="font-mono">
              {progressMinutes} dari {totalMinutes} menit
            </span>
            {actionText && (
              <button
                type="button"
                onClick={onAction}
                className="text-secondary font-semibold text-[12px] hover:underline cursor-pointer"
              >
                {actionText}
              </button>
            )}
          </div>
        </div>
      )}

      {statusFlowText && !progressMinutes && (
        <p className="text-[12px] text-text-muted">
          {statusText ? `${statusText} • ${statusFlowText}` : statusFlowText}
        </p>
      )}

      <div className="flex items-center justify-between pt-0.5 text-[12px]">
        {checkInTime && <span className="text-text-muted font-mono">{checkInTime}</span>}
        {paymentStatus === 'paid' && (
          <span className="text-success font-semibold">Lunas (paid)</span>
        )}
        {paymentStatus === 'pending' && (
          <span className="text-warning font-semibold">Menunggu bayar (pending)</span>
        )}
        {actionText && !progressMinutes && (
          <button
            type="button"
            onClick={onAction}
            className="text-secondary font-semibold text-[12px] hover:underline cursor-pointer ml-auto"
          >
            {actionText}
          </button>
        )}
      </div>
    </Card>
  );
}

