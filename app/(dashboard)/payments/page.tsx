'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Download, Printer, CheckCircle2 } from 'lucide-react';
import { Button, Alert, Toast, Modal, Badge } from '@/components/ui';
import { paymentService } from '@/services/endpoints/payment';
import { TPayment } from '@/types';
import { PaymentSummarySection } from './sections/PaymentSummarySection';
import { PaidPaymentsTableSection } from './sections/PaidPaymentsTableSection';
import { UnpaidPaymentsTableSection } from './sections/UnpaidPaymentsTableSection';

export default function PaymentsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [paymentDetail, setPaymentDetail] = useState<TPayment | null>(null);
  const [receiptPayment, setReceiptPayment] = useState<TPayment | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [allPayments, setAllPayments] = useState<TPayment[]>([]);
  const [totalOmset, setTotalOmset] = useState<string>('Rp0');
  const [summaryCounts, setSummaryCounts] = useState({ totalLunas: 0, totalMenunggu: 0, totalGagal: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const receiptRef = useRef<HTMLDivElement>(null);

  const fetchPayments = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await paymentService.getPayments({
        search,
        status: statusFilter === 'all' ? undefined : statusFilter,
      });
      setAllPayments(res.data);
      if (res.meta?.summary) {
        setSummaryCounts({
          totalLunas: res.meta.summary.totalLunas ?? 0,
          totalMenunggu: res.meta.summary.totalMenunggu ?? 0,
          totalGagal: res.meta.summary.totalGagal ?? 0,
        });
        setTotalOmset(res.meta.summary.totalOmset ?? 'Rp0');
      } else if (res.meta?.totalOmset) {
        setTotalOmset(res.meta.totalOmset);
        setSummaryCounts({
          totalLunas: res.meta.paidCount ?? res.data.filter((p) => p.status === 'lunas').length,
          totalMenunggu: res.meta.pendingCount ?? res.data.filter((p) => p.status === 'menunggu').length,
          totalGagal: res.data.filter((p) => p.status === 'gagal').length,
        });
      } else {
        const sum = res.data
          .filter((p: any) => p.status === 'lunas')
          .reduce((acc: number, curr: any) => acc + (curr.rawNominal || 0), 0);
        setTotalOmset(`Rp${sum.toLocaleString('id-ID')}`);
        setSummaryCounts({
          totalLunas: res.data.filter((p) => p.status === 'lunas').length,
          totalMenunggu: res.data.filter((p) => p.status === 'menunggu').length,
          totalGagal: res.data.filter((p) => p.status === 'gagal').length,
        });
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Gagal memuat riwayat pembayaran');
    } finally {
      setIsLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPayments();
    }, 250);

    return () => clearTimeout(timer);
  }, [fetchPayments]);

  const paidPayments = allPayments.filter((p) => p.status === 'lunas' || p.status === 'dikembalikan');
  const unpaidPayments = allPayments.filter((p) => p.status === 'menunggu' || p.status === 'gagal');

  const totalLunas = summaryCounts.totalLunas;
  const totalMenunggu = summaryCounts.totalMenunggu;
  const totalGagal = summaryCounts.totalGagal;

  const handleResetFilters = () => {
    setSearch('');
    setStatusFilter('all');
  };

  const handleDetailClick = (payment: TPayment) => {
    setPaymentDetail(payment);
  };

  const handleMarkAsPaid = async (payment: TPayment, method: string = 'cash') => {
    setIsProcessing(true);
    try {
      const idToPay = payment.paymentId || payment.qrisRef;
      await paymentService.markAsPaid(idToPay, method);
      setToastMsg(`Pembayaran ${payment.qrisRef} berhasil ditandai lunas (${method.toUpperCase()}).`);
      setPaymentDetail(null);
      await fetchPayments();
    } catch (err) {
      setToastMsg(err instanceof Error ? err.message : 'Gagal melunasi pembayaran');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExportCsv = () => {
    if (allPayments.length === 0) {
      setToastMsg('Tidak ada data pembayaran untuk diekspor');
      return;
    }

    const headers = [
      'No',
      'Referensi QRIS',
      'ID Pembayaran',
      'ID Booking',
      'Nama Pelanggan',
      'Kapster',
      'Layanan',
      'Nominal (Rp)',
      'Status',
      'Waktu Pelunasan',
    ];

    const rows = allPayments.map((p, idx) => [
      idx + 1,
      `"${p.qrisRef}"`,
      `"${p.paymentId || p.qrisId}"`,
      `"${p.rawBookingId || p.bookingUuid}"`,
      `"${(p.customer || '').replace(/"/g, '""')}"`,
      `"${(p.barber || '').replace(/"/g, '""')}"`,
      `"${(p.services || '').replace(/"/g, '""')}"`,
      p.rawNominal || p.nominal.replace(/[^0-9]/g, ''),
      `"${p.status}"`,
      `"${p.paidAt || '-'}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `laporan-transaksi-trim-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToastMsg('Laporan transaksi berhasil diekspor ke file CSV.');
  };

  const handlePrintReceipt = () => {
    if (!receiptRef.current) return;
    const printWindow = window.open('', '', 'width=400,height=600');
    if (!printWindow) {
      window.print();
      return;
    }
    printWindow.document.write(`
      <html>
        <head>
          <title>Struk Pembayaran - ${receiptPayment?.qrisRef || 'TRIM Barbershop'}</title>
          <style>
            body { font-family: monospace; padding: 20px; font-size: 13px; color: #000; line-height: 1.4; }
            .text-center { text-align: center; }
            .divider { border-top: 1px dashed #000; margin: 10px 0; }
            .flex-between { display: flex; justify-content: space-between; }
            .font-bold { font-weight: bold; }
            .text-lg { font-size: 16px; }
            .mt-2 { margin-top: 8px; }
          </style>
        </head>
        <body>
          ${receiptRef.current.innerHTML}
          <script>
            window.onload = function() {
              window.print();
              window.close();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-8 relative">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <header className="space-y-1">
          <h1 className="text-[28px] font-extrabold text-text-main tracking-tight">
            Riwayat Pembayaran
          </h1>
          <p className="text-text-muted text-[14px]">
            Riwayat pembayaran QRIS &amp; Tunai Kasir, ditautkan ke booking dan pelanggan. Semua nominal dalam Rupiah.
          </p>
        </header>
        <Button
          variant="outline"
          size="md"
          icon={<Download className="w-4 h-4" />}
          onClick={handleExportCsv}
          className="shrink-0"
        >
          Ekspor transaksi (CSV)
        </Button>
      </div>

      {errorMsg && (
        <Alert
          variant="error"
          title="Gagal mengambil data pembayaran"
          description={errorMsg}
        />
      )}

      <PaymentSummarySection
        totalLunas={totalLunas}
        totalMenunggu={totalMenunggu}
        totalGagal={totalGagal}
        totalOmset={totalOmset}
      />

      <div className={isLoading ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
        <PaidPaymentsTableSection
          payments={paidPayments}
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onResetFilters={handleResetFilters}
          onDetailClick={handleDetailClick}
        />

        <div className="mt-8">
          <UnpaidPaymentsTableSection
            payments={unpaidPayments}
            onDetailClick={handleDetailClick}
            onMarkPaid={(p) => handleMarkAsPaid(p, 'cash')}
            isProcessing={isProcessing}
          />
        </div>
      </div>

      <Alert
        variant="accent"
        title="Pembayaran dan booking terhubung 1:1"
        description="Data riwayat transaksi ditarik secara real-time dari tabel PAYMENTS dan BOOKINGS di database MySQL."
      />

      {paymentDetail && (
        <Modal
          isOpen={true}
          onClose={() => setPaymentDetail(null)}
          title={`Detail Pembayaran • ${paymentDetail.qrisRef}`}
          description="Informasi referensi QRIS Pakkasir, nominal pembayaran, status pelunasan, dan data booking."
        >
          <div className="space-y-4 py-1">
            <div className="grid grid-cols-2 gap-4 text-sm bg-surface p-4 rounded-xl border border-border">
              <div>
                <p className="text-text-muted text-xs">Nomor Referensi QRIS</p>
                <p className="font-semibold font-mono text-secondary mt-0.5">{paymentDetail.qrisRef}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">ID Pembayaran Internal</p>
                <p className="font-mono text-xs text-text-muted mt-0.5">{paymentDetail.paymentId || paymentDetail.qrisId}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Nama Pelanggan</p>
                <p className="font-semibold text-text-main mt-0.5">{paymentDetail.customer}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Kapster</p>
                <p className="font-semibold text-text-main mt-0.5">{paymentDetail.barber || 'Kapster Bebas'}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Layanan</p>
                <p className="font-semibold text-text-main mt-0.5">{paymentDetail.services || 'Layanan Barbershop'}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">ID Booking</p>
                <p className="font-mono text-xs text-text-muted mt-0.5">{paymentDetail.rawBookingId || paymentDetail.bookingUuid}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Total Pembayaran</p>
                <p className="font-semibold font-mono text-success text-[16px] mt-0.5">{paymentDetail.nominal}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Status Pembayaran</p>
                <div className="mt-1">
                  <Badge variant={paymentDetail.status as any}>{paymentDetail.status.toUpperCase()}</Badge>
                </div>
              </div>
              <div className="col-span-2">
                <p className="text-text-muted text-xs">Waktu Pelunasan (Paid At)</p>
                <p className="font-mono text-xs text-text-main mt-0.5">
                  {paymentDetail.paidAt || 'Menunggu konfirmasi pembayaran QRIS / Kasir'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div>
                {paymentDetail.status === 'lunas' && (
                  <Button
                    variant="outline"
                    icon={<Printer className="w-4 h-4" />}
                    onClick={() => {
                      setReceiptPayment(paymentDetail);
                    }}
                  >
                    Cetak Struk
                  </Button>
                )}
                {paymentDetail.status === 'menunggu' && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="primary"
                      icon={<CheckCircle2 className="w-4 h-4" />}
                      disabled={isProcessing}
                      onClick={() => handleMarkAsPaid(paymentDetail, 'cash')}
                    >
                      Lunaskan (Tunai)
                    </Button>
                    <Button
                      variant="outline"
                      disabled={isProcessing}
                      onClick={() => handleMarkAsPaid(paymentDetail, 'qris')}
                    >
                      Lunaskan (QRIS)
                    </Button>
                  </div>
                )}
              </div>
              <Button variant="outline" onClick={() => setPaymentDetail(null)}>
                Tutup
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal Cetak Struk */}
      {receiptPayment && (
        <Modal
          isOpen={true}
          onClose={() => setReceiptPayment(null)}
          title="Struk Pembayaran Barbershop"
          description="Format struk siap cetak untuk pelanggan kasir."
        >
          <div className="space-y-4">
            <div
              ref={receiptRef}
              className="bg-white text-black p-6 rounded-lg border border-neutral-300 font-mono text-xs max-w-sm mx-auto shadow-sm"
            >
              <div className="text-center space-y-1">
                <h2 className="text-base font-bold tracking-wider">TRIM BARBERSHOP</h2>
                <p className="text-[11px] text-neutral-600">Jl. Barbershop No. 1, Kota</p>
                <p className="text-[11px] text-neutral-600">Telp: 0812-3456-7890</p>
              </div>

              <div className="border-t border-dashed border-neutral-400 my-3" />

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Ref QRIS:</span>
                  <span className="font-bold">{receiptPayment.qrisRef}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tanggal:</span>
                  <span>{receiptPayment.paidAt || 'Terkonfirmasi Lunas'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pelanggan:</span>
                  <span>{receiptPayment.customer}</span>
                </div>
                <div className="flex justify-between">
                  <span>Kapster:</span>
                  <span>{receiptPayment.barber || 'Kapster Bebas'}</span>
                </div>
              </div>

              <div className="border-t border-dashed border-neutral-400 my-3" />

              <div className="space-y-1.5">
                <div className="flex justify-between font-bold">
                  <span>Layanan</span>
                  <span>Harga</span>
                </div>
                <div className="flex justify-between text-neutral-700">
                  <span>{receiptPayment.services || 'Potong Rambut'}</span>
                  <span>{receiptPayment.nominal}</span>
                </div>
              </div>

              <div className="border-t border-dashed border-neutral-400 my-3" />

              <div className="space-y-1 text-sm">
                <div className="flex justify-between font-bold">
                  <span>TOTAL:</span>
                  <span>{receiptPayment.nominal}</span>
                </div>
                <div className="flex justify-between text-xs text-neutral-600">
                  <span>Status:</span>
                  <span className="font-bold uppercase text-green-700">LUNAS</span>
                </div>
              </div>

              <div className="border-t border-dashed border-neutral-400 my-3" />

              <div className="text-center space-y-1 text-[11px] text-neutral-600">
                <p>Terima kasih atas kunjungan Anda!</p>
                <p>Kerapian Anda, Prioritas Kami.</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setReceiptPayment(null)}>
                Batal
              </Button>
              <Button
                variant="primary"
                icon={<Printer className="w-4 h-4" />}
                onClick={handlePrintReceipt}
              >
                Cetak Struk Sekarang
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {toastMsg && (
        <Toast
          isOpen={true}
          title="Informasi Transaksi"
          description={toastMsg}
          onClose={() => setToastMsg(null)}
        />
      )}
    </div>
  );
}
