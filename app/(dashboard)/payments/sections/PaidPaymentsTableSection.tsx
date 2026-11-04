'use client';

import React from 'react';
import { CalendarDays, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  SearchBar,
  SelectField,
  Badge,
  DataTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  EmptyState,
} from '@/components/ui';
import { TPayment } from '@/types';

const STATUS_LABELS: Record<TPayment['status'], string> = {
  lunas: 'Lunas',
  menunggu: 'Menunggu',
  gagal: 'Gagal',
  dikembalikan: 'Dikembalikan',
};

interface PaidPaymentsTableSectionProps {
  payments: TPayment[];
  search: string;
  onSearchChange: (val: string) => void;
  statusFilter: string;
  onStatusFilterChange: (val: string) => void;
  onResetFilters: () => void;
  onDetailClick: (payment: TPayment) => void;
}

export function PaidPaymentsTableSection({
  payments,
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onResetFilters,
  onDetailClick,
}: PaidPaymentsTableSectionProps) {
  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            className="flex items-center gap-2 bg-raised border border-border rounded-xl px-4 py-2 text-white hover:bg-border transition-colors text-xs font-medium cursor-pointer"
          >
            <CalendarDays className="w-4 h-4 text-text-muted" />
            <span>30 Sep 2026 – 6 Okt 2026</span>
          </button>

          <SelectField
            size="sm"
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            options={[
              { value: 'all', label: 'Semua status' },
              { value: 'lunas', label: 'Lunas' },
              { value: 'menunggu', label: 'Menunggu' },
              { value: 'gagal', label: 'Gagal' },
              { value: 'dikembalikan', label: 'Dikembalikan' },
            ]}
          />
        </div>

        <div className="w-full sm:w-72">
          <SearchBar
            size="sm"
            value={search}
            onChange={onSearchChange}
            placeholder="Cari ID / nama pelanggan"
          />
        </div>
      </div>

      {/* Sync status bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-[20px] font-bold text-white">Riwayat Pembayaran • 30 Sep–6 Okt</h2>
          <Badge variant="aktif">Pakkasir terhubung</Badge>
        </div>
        <span className="text-[12px] text-text-muted">Sinkronisasi terakhir 14:30 WIB</span>
      </div>

      {/* Main Table */}
      <div className="rounded-2xl border border-border bg-surface overflow-hidden">
        {payments.length === 0 ? (
          <EmptyState
            title="Transaksi tidak ditemukan"
            description="Tidak ada transaksi pembayaran yang sesuai dengan kata kunci atau filter status."
            actionText="Reset Filter"
            onAction={onResetFilters}
          />
        ) : (
          <DataTable className="border-0 rounded-none">
            <TableHead>
              <tr>
                <TableCell isHeader>Referensi QRIS</TableCell>
                <TableCell isHeader>Booking UUID singkat</TableCell>
                <TableCell isHeader>Pelanggan</TableCell>
                <TableCell isHeader>paid_at</TableCell>
                <TableCell isHeader>Nominal</TableCell>
                <TableCell isHeader>Status pembayaran</TableCell>
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
                  <TableCell className="text-[13px] text-text-main">{p.paidAt}</TableCell>
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
        )}

        <div className="px-6 py-4 border-t border-border flex items-center justify-between text-[13px]">
          <span className="text-text-muted">
            148 paid • 1 refunded • UUID ditampilkan singkat
          </span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-1 text-text-muted hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="w-7 h-7 rounded-md bg-secondary/20 flex items-center justify-center text-secondary font-medium text-[13px]">
              1
            </div>
            <button
              type="button"
              className="p-1 text-text-muted hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
