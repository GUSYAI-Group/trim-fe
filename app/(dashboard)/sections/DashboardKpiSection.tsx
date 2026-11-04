import React from 'react';
import { Wallet, Scissors, Star, Calendar } from 'lucide-react';
import { Card } from '@/components/ui';

export function DashboardKpiSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-5 flex flex-col justify-between gap-4">
        <div className="flex justify-between items-start">
          <p className="text-text-muted text-[14px] font-medium">Pendapatan hari ini</p>
          <Wallet className="w-5 h-5 text-secondary shrink-0" />
        </div>
        <div>
          <h3 className="text-[28px] font-extrabold text-text-main leading-tight">Rp1.200.000</h3>
          <p className="text-success text-[12px] mt-1">Pembayaran paid • paid_at hari ini</p>
        </div>
      </Card>

      <Card className="p-5 flex flex-col justify-between gap-4">
        <div className="flex justify-between items-start">
          <p className="text-text-muted text-[14px] font-medium">Cukuran selesai hari ini</p>
          <Scissors className="w-5 h-5 text-secondary shrink-0" />
        </div>
        <div>
          <h3 className="text-[28px] font-extrabold text-text-main leading-tight">18</h3>
          <p className="text-success text-[12px] mt-1">Booking completed • tanggal hari ini</p>
        </div>
      </Card>

      <Card className="p-5 flex flex-col justify-between gap-4">
        <div className="flex justify-between items-start">
          <p className="text-text-muted text-[14px] font-medium">Rata-rata rating kapster</p>
          <Star className="w-5 h-5 text-secondary shrink-0" />
        </div>
        <div>
          <h3 className="text-[28px] font-extrabold text-text-main leading-tight">4,9 / 5</h3>
          <p className="text-success text-[12px] mt-1">BARBERS.average_rating • 126 ulasan</p>
        </div>
      </Card>

      <Card className="p-5 flex flex-col justify-between gap-4">
        <div className="flex justify-between items-start">
          <p className="text-text-muted text-[14px] font-medium">Booking hari ini</p>
          <Calendar className="w-5 h-5 text-secondary shrink-0" />
        </div>
        <div>
          <h3 className="text-[28px] font-extrabold text-text-main leading-tight">28</h3>
          <p className="text-warning text-[12px] mt-1">2 booking confirmed belum check-in</p>
        </div>
      </Card>
    </div>
  );
}

