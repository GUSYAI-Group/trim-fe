import React from 'react';
import { Wallet, Clock, XCircle } from 'lucide-react';
import { Card } from '@/components/ui';

interface PaymentSummarySectionProps {
  totalLunas: number;
  totalMenunggu: number;
  totalGagal: number;
  totalOmset?: string;
}

export function PaymentSummarySection({
  totalLunas,
  totalMenunggu,
  totalGagal,
  totalOmset,
}: PaymentSummarySectionProps) {
  const displayOmset = totalOmset || 'Rp0';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card variant="surface" padding="md" className="space-y-3">
        <div className="flex items-start justify-between">
          <span className="text-[14px] text-text-muted font-medium">Total pembayaran lunas</span>
          <Wallet className="w-5 h-5 text-secondary shrink-0" />
        </div>
        <div>
          <p className="text-[28px] font-extrabold text-text-main font-mono leading-none mb-2">
            {displayOmset}
          </p>
          <p className="text-[12px] text-success">{totalLunas} pembayaran lunas (paid)</p>
        </div>
      </Card>

      <Card variant="surface" padding="md" className="space-y-3">
        <div className="flex items-start justify-between">
          <span className="text-[14px] text-text-muted font-medium">Menunggu pembayaran</span>
          <Clock className="w-5 h-5 text-secondary shrink-0" />
        </div>
        <div>
          <p className="text-[28px] font-extrabold text-text-main font-mono leading-none mb-2">
            {totalMenunggu} transaksi
          </p>
          <p className="text-[12px] text-warning">Status pending / walk-in belum dibayar</p>
        </div>
      </Card>

      <Card variant="surface" padding="md" className="space-y-3">
        <div className="flex items-start justify-between">
          <span className="text-[14px] text-text-muted font-medium">Transaksi gagal</span>
          <XCircle className="w-5 h-5 text-secondary shrink-0" />
        </div>
        <div>
          <p className="text-[28px] font-extrabold text-text-main font-mono leading-none mb-2">
            {totalGagal} transaksi
          </p>
          <p className="text-[12px] text-text-muted">{totalGagal} gagal / dibatalkan</p>
        </div>
      </Card>
    </div>
  );
}

