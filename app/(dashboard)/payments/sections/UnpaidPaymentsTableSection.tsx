import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import {
  Badge,
  DataTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
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
  onMarkPaid?: (payment: TPayment, method: string) => void;
  isProcessing?: boolean;
}

export function UnpaidPaymentsTableSection({
  payments,
  onDetailClick,
  onMarkPaid,
  isProcessing = false,
}: UnpaidPaymentsTableSectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Badge variant="menunggu">Menunggu Pembayaran Kasir</Badge>
        <span className="text-[12px] text-text-muted font-mono">
          Pending / Menunggu Pembayaran
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
          {payments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-text-muted">
                Tidak ada pembayaran yang tertunda
              </TableCell>
            </TableRow>
          ) : (
            payments.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <p className="text-[14px] font-bold text-text-main font-mono">{p.qrisRef}</p>
                  <p className="text-[12px] text-text-muted mt-0.5 font-mono">{p.qrisId}</p>
                </TableCell>
                <TableCell className="text-[12px] text-text-muted font-mono">
                  {p.bookingUuid}
                </TableCell>
                <TableCell className="text-[14px] font-bold text-text-main">{p.customer}</TableCell>
                <TableCell className="text-[12px] text-text-muted">—</TableCell>
                <TableCell className="text-[14px] font-bold text-text-main font-mono">
                  {p.nominal}
                </TableCell>
                <TableCell>
                  <Badge variant={p.status}>{STATUS_LABELS[p.status]}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {onMarkPaid && p.status === 'menunggu' && (
                      <Button
                        size="sm"
                        variant="primary"
                        disabled={isProcessing}
                        icon={<CheckCircle2 className="w-3.5 h-3.5" />}
                        onClick={() => onMarkPaid(p, 'cash')}
                        className="py-1 px-2.5 text-xs"
                      >
                        Tandai Lunas
                      </Button>
                    )}
                    <button
                      type="button"
                      onClick={() => onDetailClick(p)}
                      className="flex items-center gap-1 text-[12px] font-semibold text-secondary hover:brightness-125 transition-all cursor-pointer"
                    >
                      Detail <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </DataTable>
    </div>
  );
}

