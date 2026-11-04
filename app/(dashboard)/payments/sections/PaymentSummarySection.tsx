import React from 'react';
import { Wallet, Clock, XCircle } from 'lucide-react';
import { Card } from '@/components/ui';

interface PaymentSummarySectionProps {
  totalLunas: number;
  totalMenunggu: number;
  totalGagal: number;
}

export function PaymentSummarySection({
  totalLunas,
  totalMenunggu,
  totalGagal,
}: PaymentSummarySectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card variant="surface" padding="md" className="space-y-3">
        <div className="flex items-start justify-between">
          <span className="text-[14px] text-text-muted font-medium">Total pembayaran lunas</span>
          <Wallet className="w-5 h-5 text-secondary shrink-0" />
        </div>
        <div>
          <p className="text-[28px] font-extrabold text-white font-mono leading-none mb-2">
            Rp10.250.000
          </p>
          <p className="text-[13px] text-success">{totalLunas} pembayaran paid • 30 Sep–6 Okt</p>
        </div>
      </Card>

      <Card variant="surface" padding="md" className="space-y-3">
        <div className="flex items-start justify-between">
          <span className="text-[14px] text-text-muted font-medium">Menunggu pembayaran</span>
          <Clock className="w-5 h-5 text-secondary shrink-0" />
        </div>
        <div>
          <p className="text-[28px] font-extrabold text-white leading-none mb-2">
            {totalMenunggu} transaksi
          </p>
          <p className="text-[13px] text-warning">Tanpa filter paid_at</p>
        </div>
      </Card>

      <Card variant="surface" padding="md" className="space-y-3">
        <div className="flex items-start justify-between">
          <span className="text-[14px] text-text-muted font-medium">Transaksi gagal</span>
          <XCircle className="w-5 h-5 text-secondary shrink-0" />
        </div>
        <div>
          <p className="text-[28px] font-extrabold text-white leading-none mb-2">
            {totalGagal} transaksi
          </p>
          <p className="text-[13px] text-text-muted">{totalGagal} failed • tanpa filter paid_at</p>
        </div>
      </Card>
    </div>
  );
}

