import React from 'react';
import { AlertTriangle, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui';

export interface LateCheckInItem {
  id: string;
  customerName: string;
  queueNo: string;
  scheduledTime: string;
  lateMinutes: number;
}

interface LateCheckInSectionProps {
  items: LateCheckInItem[];
  onSkip: (item: LateCheckInItem) => void;
}

export function LateCheckInSection({ items, onSkip }: LateCheckInSectionProps) {
  if (items.length === 0) return null;

  return (
    <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/20 space-y-3 shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-secondary font-bold text-xs md:text-sm">
          <AlertTriangle className="w-4 h-4 text-secondary shrink-0" />
          <span>Belum check-in setelah jadwal • Perlu tindakan Admin</span>
        </div>
        <span className="text-[11px] text-text-muted font-mono">Admin: dimas@trim.id</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-xl bg-surface border border-border flex justify-between items-center"
          >
            <div>
              <p className="font-bold text-white text-xs">{item.customerName}</p>
              <p className="text-[11px] text-text-muted mt-0.5">
                {item.queueNo} • Jadwal {item.scheduledTime} • Belum check-in
              </p>
              <p className="text-[11px] text-rose-400 font-semibold mt-1">
                confirmed • terlambat {item.lateMinutes} menit
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<SkipForward className="w-3 h-3 text-secondary" />}
              onClick={() => onSkip(item)}
            >
              Skip
            </Button>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-text-muted">
        Record QUEUES sudah ditautkan 1:1 ke booking. Belum check-in tidak masuk papan aktif. Skip → queue skipped + booking no_show.
      </p>
    </div>
  );
}

