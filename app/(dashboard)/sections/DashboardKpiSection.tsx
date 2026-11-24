import React from 'react';
import { Wallet, Scissors, Star, Calendar } from 'lucide-react';
import { Card } from '@/components/ui';

interface DashboardKpiSectionProps {
  kpi?: {
    today_revenue?: string | number;
    today_appointments?: number;
    today_customers?: number;
    completed_services?: number;
    currently_in_queue?: number;
    average_rating?: number | string;
    total_reviews?: number;
    pending_checkins?: number;
    active_barbers_count?: number;
    total_all_time_revenue?: number;
  };
}

export function DashboardKpiSection({ kpi }: DashboardKpiSectionProps) {
  const formattedRevenue =
    kpi?.today_revenue !== undefined
      ? `Rp${Number(kpi.today_revenue).toLocaleString('id-ID')}`
      : 'Rp0';

  const completedCuts = kpi?.completed_services !== undefined ? kpi.completed_services : 0;
  const totalReviews = kpi?.total_reviews !== undefined ? kpi.total_reviews : 0;
  const ratingText =
    totalReviews > 0 && kpi?.average_rating !== undefined && Number(kpi.average_rating) > 0
      ? `${Number(kpi.average_rating).toFixed(1)} / 5`
      : '0.0 / 5';
  const appointmentsCount = kpi?.today_appointments !== undefined ? kpi.today_appointments : 0;
  const inQueueCount = kpi?.currently_in_queue !== undefined ? kpi.currently_in_queue : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-5 flex flex-col justify-between gap-4">
        <div className="flex justify-between items-start">
          <p className="text-text-muted text-[14px] font-medium">Pendapatan hari ini</p>
          <Wallet className="w-5 h-5 text-secondary shrink-0" />
        </div>
        <div>
          <h3 className="text-[28px] font-extrabold text-text-main font-mono leading-tight">{formattedRevenue}</h3>
          <p className="text-success text-[12px] mt-1">Pembayaran paid • paid_at hari ini</p>
        </div>
      </Card>

      <Card className="p-5 flex flex-col justify-between gap-4">
        <div className="flex justify-between items-start">
          <p className="text-text-muted text-[14px] font-medium">Cukuran selesai hari ini</p>
          <Scissors className="w-5 h-5 text-secondary shrink-0" />
        </div>
        <div>
          <h3 className="text-[28px] font-extrabold text-text-main font-mono leading-tight">{completedCuts}</h3>
          <p className="text-success text-[12px] mt-1">Booking completed • tanggal hari ini</p>
        </div>
      </Card>

      <Card className="p-5 flex flex-col justify-between gap-4">
        <div className="flex justify-between items-start">
          <p className="text-text-muted text-[14px] font-medium">Rata-rata rating kapster</p>
          <Star className="w-5 h-5 text-secondary shrink-0" />
        </div>
        <div>
          <h3 className="text-[28px] font-extrabold text-text-main font-mono leading-tight">{ratingText}</h3>
          <p className="text-text-muted text-[12px] mt-1">{totalReviews} ulasan terverifikasi</p>
        </div>
      </Card>

      <Card className="p-5 flex flex-col justify-between gap-4">
        <div className="flex justify-between items-start">
          <p className="text-text-muted text-[14px] font-medium">Booking hari ini</p>
          <Calendar className="w-5 h-5 text-secondary shrink-0" />
        </div>
        <div>
          <h3 className="text-[28px] font-extrabold text-text-main font-mono leading-tight">{appointmentsCount}</h3>
          <p className="text-warning text-[12px] mt-1">{inQueueCount} dalam antrean lantai toko</p>
        </div>
      </Card>
    </div>
  );
}
