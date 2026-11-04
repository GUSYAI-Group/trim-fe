'use client';

import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Button, Alert, Toast } from '@/components/ui';
import { MOCK_PAID_PAYMENTS, MOCK_UNPAID_PAYMENTS } from '@/utils/mocks/mockData';
import { TPayment } from '@/types';
import { PaymentSummarySection } from './sections/PaymentSummarySection';
import { PaidPaymentsTableSection } from './sections/PaidPaymentsTableSection';
import { UnpaidPaymentsTableSection } from './sections/UnpaidPaymentsTableSection';

export default function PaymentsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const filteredPaid = MOCK_PAID_PAYMENTS.filter((p) => {
    const matchSearch =
      p.customer.toLowerCase().includes(search.toLowerCase()) ||
      p.qrisRef.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalLunas = MOCK_PAID_PAYMENTS.filter((p) => p.status === 'lunas').length;
  const totalMenunggu = MOCK_UNPAID_PAYMENTS.filter((p) => p.status === 'menunggu').length;
  const totalGagal = MOCK_UNPAID_PAYMENTS.filter((p) => p.status === 'gagal').length;

  const handleResetFilters = () => {
    setSearch('');
    setStatusFilter('all');
  };

  const handleDetailClick = (payment: TPayment) => {
    setToastMsg(`Menampilkan detail referensi ${payment.qrisRef} (${payment.customer}).`);
  };

  return (
    <div className="space-y-8 pb-24 relative min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <header className="space-y-2">
          <h1 className="text-[28px] font-extrabold text-white tracking-tight">
            Riwayat Pembayaran
          </h1>
          <p className="text-text-muted">
            Riwayat pembayaran QRIS Pakkasir, ditautkan ke booking dan pelanggan. Semua nominal dalam Rupiah.
          </p>
        </header>
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<Download className="w-4 h-4" />}
          onClick={() => setToastMsg('Laporan transaksi sedang diekspor ke CSV...')}
          className="shrink-0"
        >
          Ekspor transaksi
        </Button>
      </div>

      <PaymentSummarySection
        totalLunas={totalLunas}
        totalMenunggu={totalMenunggu}
        totalGagal={totalGagal}
      />

      <PaidPaymentsTableSection
        payments={filteredPaid}
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onResetFilters={handleResetFilters}
        onDetailClick={handleDetailClick}
      />

      <Alert
        variant="accent"
        title="Pembayaran dan booking terhubung 1:1"
        description="Rentang mengikuti paid_at. Total Rp10.250.000 berasal dari status paid, tidak termasuk refunded. Pending/failed tanpa paid_at tersedia pada daftar Belum dibayar."
      />

      <UnpaidPaymentsTableSection
        payments={MOCK_UNPAID_PAYMENTS}
        onDetailClick={handleDetailClick}
      />

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast
            variant="info"
            title="Informasi Transaksi"
            description={toastMsg}
            onClose={() => setToastMsg(null)}
          />
        </div>
      )}
    </div>
  );
}
