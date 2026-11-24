import React from 'react';
import { Users, Scissors, Star } from 'lucide-react';
import { Card } from '@/components/ui';

interface BarberStatsSectionProps {
  totalCount: number;
  activeCount: number;
  inServiceCount?: number;
  averageRating?: string;
  totalReviews?: number;
}

export function BarberStatsSection({
  totalCount,
  activeCount,
  inServiceCount = 0,
  averageRating = '0.0',
  totalReviews = 0,
}: BarberStatsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-6 flex flex-col justify-between gap-4">
        <div className="flex justify-between items-start">
          <span className="text-[14px] font-medium text-text-muted">Kapster terdaftar</span>
          <Users className="w-5 h-5 text-secondary shrink-0" />
        </div>
        <div>
          <h3 className="text-[28px] font-extrabold font-mono text-text-main mb-1">{totalCount}</h3>
          <p className="text-[12px] text-success font-medium">{activeCount} profil kapster aktif</p>
        </div>
      </Card>

      <Card className="p-6 flex flex-col justify-between gap-4">
        <div className="flex justify-between items-start">
          <span className="text-[14px] font-medium text-text-muted">Sedang melayani</span>
          <Scissors className="w-5 h-5 text-secondary shrink-0" />
        </div>
        <div>
          <h3 className="text-[28px] font-extrabold font-mono text-text-main mb-1">{inServiceCount}</h3>
          <p className="text-[12px] text-text-muted">{inServiceCount} kursi sedang aktif melayani</p>
        </div>
      </Card>

      <Card className="p-6 flex flex-col justify-between gap-4">
        <div className="flex justify-between items-start">
          <span className="text-[14px] font-medium text-text-muted">Rata-rata rating</span>
          <Star className="w-5 h-5 text-secondary shrink-0" />
        </div>
        <div>
          <h3 className="text-[28px] font-extrabold font-mono text-text-main mb-1">
            {totalReviews > 0 ? `${averageRating} / 5` : '0.0 / 5'}
          </h3>
          <p className="text-[12px] text-text-muted font-medium">{totalReviews} ulasan terverifikasi</p>
        </div>
      </Card>
    </div>
  );
}

