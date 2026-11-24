import React from 'react';
import { ListFilter, Scissors, Clock } from 'lucide-react';
import { Card } from '@/components/ui';

interface ServiceStatsSectionProps {
  activeCount: number;
  popularServiceName?: string;
  popularServiceBookings?: number;
  avgDuration?: number;
}

export function ServiceStatsSection({
  activeCount,
  popularServiceName = 'Belum ada data',
  popularServiceBookings = 0,
  avgDuration = 0,
}: ServiceStatsSectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card variant="surface" padding="md" className="flex flex-col justify-between gap-4 h-full">
        <div className="flex items-center justify-between text-text-muted">
          <span className="text-[14px] font-medium">Layanan aktif</span>
          <ListFilter className="w-5 h-5 text-secondary shrink-0" />
        </div>
        <div>
          <span className="text-[28px] font-extrabold font-mono text-text-main block mb-1">
            {activeCount}
          </span>
          <p className="text-[12px] text-success font-medium">
            Layanan aktif tersedia untuk booking
          </p>
        </div>
      </Card>

      <Card variant="surface" padding="md" className="flex flex-col justify-between gap-4 h-full">
        <div className="flex items-center justify-between text-text-muted">
          <span className="text-[14px] font-medium">Layanan paling populer</span>
          <Scissors className="w-5 h-5 text-secondary shrink-0" />
        </div>
        <div>
          <h3
            title={popularServiceName}
            className="text-[20px] md:text-[22px] font-extrabold text-text-main block mb-1 leading-tight line-clamp-2 break-words"
          >
            {popularServiceName}
          </h3>
          <p className="text-[12px] text-text-muted">
            {popularServiceBookings > 0 ? `${popularServiceBookings} booking tercatat` : 'Belum ada riwayat booking'}
          </p>
        </div>
      </Card>

      <Card variant="surface" padding="md" className="flex flex-col justify-between gap-4 h-full sm:col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between text-text-muted">
          <span className="text-[14px] font-medium">Rata-rata durasi layanan</span>
          <Clock className="w-5 h-5 text-secondary shrink-0" />
        </div>
        <div>
          <span className="text-[28px] font-extrabold font-mono text-text-main block mb-1">
            {avgDuration > 0 ? `${avgDuration} menit` : '0 menit'}
          </span>
          <p className="text-[12px] text-text-muted">
            {avgDuration > 0 ? 'Rata-rata durasi pengerjaan layanan aktif' : 'Belum ada layanan aktif'}
          </p>
        </div>
      </Card>
    </div>
  );
}

