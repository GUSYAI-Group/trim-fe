import React from 'react';
import { ArrowRight } from 'lucide-react';
import {
  Badge,
  DataTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui';
import { TPayment } from '@/types';

const STATUS_LABELS: Record<TPayment['status'], string> = {
  lunas: 'Lunas',
  menunggu: 'Menunggu',
  gagal: 'Gagal',
  dikembalikan: 'Dikembalikan',
};

interface UnpaidPaymentsTableSectionProps {
  payments: TPayment[];
  onDetailClick: (payment: TPayment) => void;
}

export function UnpaidPaymentsTableSection({
  payments,
  onDetailClick,
}: UnpaidPaymentsTableSectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Badge variant="menunggu">Tanpa filter paid_at</Badge>
        <span className="text-[12px] text-text-muted font-mono">
          paid_at NULL • pending &amp; failed
        </span>
      </div>

      <DataTable>
        <TableHead>
          <tr>
            <TableCell isHeader>Referensi QRIS</TableCell>
            <TableCell isHeader>Booking ID</TableCell>
            <TableCell isHeader>Pelanggan</TableCell>
            <TableCell isHeader>paid_at</TableCell>
            <TableCell isHeader>Nominal</TableCell>
            <TableCell isHeader>Status</TableCell>
            <TableCell isHeader>Aksi</TableCell>
          </tr>
        </TableHead>
        <TableBody>
          {payments.map((p) => (
            <TableRow key={p.id}>
              <TableCell>
                <p className="text-[13px] font-bold text-white font-mono">{p.qrisRef}</p>
                <p className="text-[12px] text-text-muted mt-0.5 font-mono">{p.qrisId}</p>
              </TableCell>
              <TableCell className="text-[13px] text-text-muted font-mono">
                {p.bookingUuid}
              </TableCell>
              <TableCell className="text-[14px] font-bold text-white">{p.customer}</TableCell>
              <TableCell className="text-[13px] text-text-muted">—</TableCell>
              <TableCell className="text-[14px] font-medium text-white font-mono">
                {p.nominal}
              </TableCell>
              <TableCell>
                <Badge variant={p.status}>{STATUS_LABELS[p.status]}</Badge>
              </TableCell>
              <TableCell>
                <button
                  type="button"
                  onClick={() => onDetailClick(p)}
                  className="flex items-center gap-1 text-[13px] font-bold text-secondary hover:brightness-125 transition-all cursor-pointer"
                >
                  Detail <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
    </div>
  );
}

