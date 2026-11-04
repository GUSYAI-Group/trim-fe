import React from 'react';
import { Users, Scissors, Star } from 'lucide-react';
import { Card } from '@/components/ui';

interface BarberStatsSectionProps {
  totalCount: number;
  activeCount: number;
}

export function BarberStatsSection({ totalCount, activeCount }: BarberStatsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-6 flex flex-col justify-between gap-4">
        <div className="flex justify-between items-start">
          <span className="text-[14px] font-medium text-text-muted">Kapster terdaftar</span>
          <Users className="w-5 h-5 text-secondary shrink-0" />
        </div>
        <div>
          <h3 className="text-3xl font-extrabold text-text-main mb-1">{totalCount}</h3>
          <p className="text-[12px] text-success font-medium">{activeCount} profil kapster aktif</p>
        </div>
      </Card>

      <Card className="p-6 flex flex-col justify-between gap-4">
        <div className="flex justify-between items-start">
          <span className="text-[14px] font-medium text-text-muted">Sedang melayani</span>
          <Scissors className="w-5 h-5 text-secondary shrink-0" />
        </div>
        <div>
          <h3 className="text-3xl font-extrabold text-text-main mb-1">3</h3>
          <p className="text-[12px] text-text-muted">3 kursi sedang terisi</p>
        </div>
      </Card>

      <Card className="p-6 flex flex-col justify-between gap-4">
        <div className="flex justify-between items-start">
          <span className="text-[14px] font-medium text-text-muted">Rata-rata rating</span>
          <Star className="w-5 h-5 text-secondary shrink-0" />
        </div>
        <div>
          <h3 className="text-3xl font-extrabold text-text-main mb-1">4,9 / 5</h3>
          <p className="text-[12px] text-success font-medium">126 ulasan pelanggan bulan ini</p>
        </div>
      </Card>
    </div>
  );
}

