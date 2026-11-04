import React from 'react';
import { ListFilter, Scissors, Clock } from 'lucide-react';
import { Card } from '@/components/ui';

interface ServiceStatsSectionProps {
  activeCount: number;
}

export function ServiceStatsSection({ activeCount }: ServiceStatsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-6 flex flex-col justify-between gap-4">
        <div className="flex items-center justify-between text-text-muted">
          <span className="text-[14px] font-medium">Layanan aktif</span>
          <ListFilter className="w-5 h-5 text-secondary shrink-0" />
        </div>
        <div>
          <span className="text-3xl font-extrabold text-text-main block mb-1">
            {activeCount}
          </span>
          <p className="text-[12px] text-success font-medium">
            Layanan aktif tersedia untuk booking
          </p>
        </div>
      </Card>

      <Card className="p-6 flex flex-col justify-between gap-4">
        <div className="flex items-center justify-between text-text-muted">
          <span className="text-[14px] font-medium">Layanan paling populer</span>
          <Scissors className="w-5 h-5 text-secondary shrink-0" />
        </div>
        <div>
          <span className="text-2xl font-extrabold text-text-main block mb-1">
            Potong reguler
          </span>
          <p className="text-[12px] text-text-muted">12 booking hari ini</p>
        </div>
      </Card>

      <Card className="p-6 flex flex-col justify-between gap-4">
        <div className="flex items-center justify-between text-text-muted">
          <span className="text-[14px] font-medium">Rata-rata durasi layanan</span>
          <Clock className="w-5 h-5 text-secondary shrink-0" />
        </div>
        <div>
          <span className="text-3xl font-extrabold text-text-main block mb-1">41 menit</span>
          <p className="text-[12px] text-text-muted">
            Rata-rata duration_minutes layanan aktif
          </p>
        </div>
      </Card>
    </div>
  );
}

