'use client';

import React, { useState } from 'react';
import { Card, Button } from '@/components/ui';
import {
  Search, ChevronDown, ChevronLeft, ChevronRight,
  Download, CheckCircle2, Clock, XCircle, ArrowRight, Info, CalendarDays, Wallet
} from 'lucide-react';

/* ─────────────────── Types ─────────────────── */
type PayStatus = 'lunas' | 'menunggu' | 'gagal' | 'dikembalikan';

interface Payment {
  id: number;
  qrisRef: string;
  qrisId: string;
  bookingUuid: string;
  customer: string;
  paidAt: string;        // empty string = NULL
  nominal: string;
  status: PayStatus;
  hasPaidAt: boolean;
}

/* ─────────────────── Static data ─────────────────── */
const PAID_PAYMENTS: Payment[] = [
  { id: 1,  qrisRef: 'QRIS-20261006-8A3F', qrisId: 'id: e3a1b2c4...', bookingUuid: '7f2a1d9e...', customer: 'Rangga Utama',   paidAt: '6 Okt 2026 • 14:02', nominal: 'Rp60.000',  status: 'lunas',         hasPaidAt: true },
  { id: 2,  qrisRef: 'QRIS-20261006-C7D2', qrisId: 'id: a1f4c8b2...', bookingUuid: '3c9e5a7b...', customer: 'Farhan Akbar',   paidAt: '6 Okt 2026 • 13:17', nominal: 'Rp100.000', status: 'lunas',         hasPaidAt: true },
  { id: 3,  qrisRef: 'QRIS-20261006-4E9A', qrisId: 'id: 9d2e6f3c...', bookingUuid: '5a8d2c1f...', customer: 'Iqbal Fauzi',   paidAt: '6 Okt 2026 • 12:45', nominal: 'Rp75.000',  status: 'lunas',         hasPaidAt: true },
  { id: 4,  qrisRef: 'QRIS-20261005-2B7E', qrisId: 'id: c4b8e1a7...', bookingUuid: '1e4f9b3d...', customer: 'Dimas Saputra', paidAt: '5 Okt 2026 • 16:30', nominal: 'Rp75.000',  status: 'dikembalikan',  hasPaidAt: true },
  { id: 5,  qrisRef: 'QRIS-20261005-F1C3', qrisId: 'id: b7a3d9e5...', bookingUuid: '8b2f4e6a...', customer: 'Yusuf Pratama', paidAt: '5 Okt 2026 • 11:52', nominal: 'Rp60.000',  status: 'lunas',         hasPaidAt: true },
  { id: 6,  qrisRef: 'QRIS-20261004-9D4B', qrisId: 'id: f2c5a8d1...', bookingUuid: '6c3a7f2e...', customer: 'Agung Saputra', paidAt: '4 Okt 2026 • 15:20', nominal: 'Rp75.000',  status: 'lunas',         hasPaidAt: true },
  { id: 7,  qrisRef: 'QRIS-20261003-6A2D', qrisId: 'id: 3e9b1f7a...', bookingUuid: '4d7e2b9c...', customer: 'Satria Wibowo', paidAt: '3 Okt 2026 • 09:30', nominal: 'Rp100.000', status: 'lunas',         hasPaidAt: true },
  { id: 8,  qrisRef: 'QRIS-20261001-3F8C', qrisId: 'id: 7a4c2e9b...', bookingUuid: '2f6a8d4c...', customer: 'Bagas Putra',   paidAt: '1 Okt 2026 • 10:15', nominal: 'Rp60.000',  status: 'lunas',         hasPaidAt: true },
];

const UNPAID_PAYMENTS: Payment[] = [
  { id: 9,  qrisRef: 'QRIS-20261006-A1B2', qrisId: 'id: d5e2f8c4...', bookingUuid: '9a1c3e5f...', customer: 'Bagas Putra',   paidAt: '', nominal: 'Rp75.000',  status: 'menunggu', hasPaidAt: false },
  { id: 10, qrisRef: 'QRIS-20261005-C3D4', qrisId: 'id: e8b1a4f2...', bookingUuid: '7b5d9e1a...', customer: 'Fikri Ananda',  paidAt: '', nominal: 'Rp60.000',  status: 'menunggu', hasPaidAt: false },
  { id: 11, qrisRef: 'QRIS-20261004-E5F6', qrisId: 'id: 4c7f3b8e...', bookingUuid: '3e8a5c2d...', customer: 'Rangga Utama',  paidAt: '', nominal: 'Rp75.000',  status: 'gagal',    hasPaidAt: false },
  { id: 12, qrisRef: 'QRIS-20261003-G7H8', qrisId: 'id: 6d1e9a3f...', bookingUuid: '5f2b7d9e...', customer: 'Agung Saputra', paidAt: '', nominal: 'Rp60.000',  status: 'gagal',    hasPaidAt: false },
  { id: 13, qrisRef: 'QRIS-20261002-I9J0', qrisId: 'id: 2a5f7c1d...', bookingUuid: '8d4e1f6b...', customer: 'Yusuf Pratama', paidAt: '', nominal: 'Rp100.000', status: 'menunggu', hasPaidAt: false },
];

/* ─────────────────── Status badge helper ─────────────────── */
type BadgeConfig = { bg: string; dot: string; text: string; label: string };

const STATUS_CONFIG: Record<PayStatus, BadgeConfig> = {
  lunas:        { bg: 'bg-success/10',  dot: 'bg-success',  text: 'text-success',  label: 'Lunas' },
  menunggu:     { bg: 'bg-warning/10',  dot: 'bg-warning',  text: 'text-warning',  label: 'Menunggu' },
  gagal:        { bg: 'bg-danger/10',   dot: 'bg-danger',   text: 'text-danger',   label: 'Gagal' },
  dikembalikan: { bg: 'bg-[#3B2F8A]/30', dot: 'bg-[#818CF8]', text: 'text-[#818CF8]', label: 'Dikembalikan' },
};

function StatusBadge({ status }: { status: PayStatus }) {
  const c = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[13px] font-medium font-outfit ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}

/* ─────────────────── Main View ─────────────────── */
export function PaymentsView() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [statusDropOpen, setStatusDropOpen] = useState(false);

  const STATUS_OPTIONS = [
    { value: 'all',          label: 'Semua status' },
    { value: 'lunas',        label: 'Lunas' },
    { value: 'menunggu',     label: 'Menunggu' },
    { value: 'gagal',        label: 'Gagal' },
    { value: 'dikembalikan', label: 'Dikembalikan' },
  ];

  const filteredPaid = PAID_PAYMENTS.filter((p) => {
    const matchSearch = p.customer.toLowerCase().includes(search.toLowerCase()) || p.qrisRef.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalLunas   = PAID_PAYMENTS.filter((p) => p.status === 'lunas').length;
  const totalMenunggu = UNPAID_PAYMENTS.filter((p) => p.status === 'menunggu').length;
  const totalGagal    = UNPAID_PAYMENTS.filter((p) => p.status === 'gagal').length;

  return (
    <div className="space-y-8 pb-24 font-space-grotesk relative min-h-screen">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <header className="space-y-2">
          <h1 className="text-[28px] font-extrabold text-white tracking-tight font-outfit">Riwayat Pembayaran</h1>
          <p className="text-text-muted">Riwayat pembayaran QRIS Pakkasir, ditautkan ke booking dan pelanggan. Semua nominal dalam Rupiah.</p>
        </header>
        <button className="flex items-center gap-2 shrink-0 h-10 px-4 font-bold text-[13px] bg-[#1A1A1A] border border-border rounded-lg text-white hover:bg-border transition-colors font-outfit">
          <Download className="w-4 h-4" />
          Ekspor transaksi
        </button>
      </div>

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Lunas */}
        <Card className="bg-surface border-border p-6 space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-[14px] text-text-muted font-medium">Total pembayaran lunas</span>
            <Wallet className="w-5 h-5 text-secondary shrink-0" />
          </div>
          <div>
            <p className="text-[28px] font-extrabold text-white font-outfit leading-none mb-2">Rp10.250.000</p>
            <p className="text-[13px] text-success">{totalLunas} pembayaran paid • 30 Sep–6 Okt</p>
          </div>
        </Card>

        {/* Menunggu */}
        <Card className="bg-surface border-border p-6 space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-[14px] text-text-muted font-medium">Menunggu pembayaran</span>
            <Clock className="w-5 h-5 text-secondary shrink-0" />
          </div>
          <div>
            <p className="text-[28px] font-extrabold text-white font-outfit leading-none mb-2">{totalMenunggu} transaksi</p>
            <p className="text-[13px] text-warning">Tanpa filter paid_at</p>
          </div>
        </Card>

        {/* Gagal */}
        <Card className="bg-surface border-border p-6 space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-[14px] text-text-muted font-medium">Transaksi gagal</span>
            <XCircle className="w-5 h-5 text-secondary shrink-0" />
          </div>
          <div>
            <p className="text-[28px] font-extrabold text-white font-outfit leading-none mb-2">{totalGagal} transaksi</p>
            <p className="text-[13px] text-text-muted">{totalGagal} failed • tanpa filter paid_at</p>
          </div>
        </Card>
      </div>

      {/* ── Filter Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: date + status */}
        <div className="flex items-center gap-2 flex-wrap">
          <button className="flex items-center gap-2 bg-raised border border-border rounded-lg px-4 py-2.5 text-white hover:bg-border transition-colors font-outfit text-[14px] font-medium">
            <CalendarDays className="w-4 h-4 text-text-muted" />
            <span>30 Sep 2026 – 6 Okt 2026</span>
          </button>

          {/* Status dropdown */}
          <div className="relative">
            <button
              onClick={() => setStatusDropOpen((v) => !v)}
              className="flex items-center gap-2 bg-raised border border-border rounded-lg px-4 py-2.5 text-white hover:bg-border transition-colors font-outfit text-[14px] font-medium"
            >
              <span>{STATUS_OPTIONS.find((o) => o.value === statusFilter)?.label}</span>
              <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${statusDropOpen ? 'rotate-180' : ''}`} />
            </button>
            {statusDropOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setStatusDropOpen(false)} />
                <div className="absolute top-full left-0 mt-2 w-44 bg-[#1A1A1A] border border-border rounded-xl overflow-hidden z-50 shadow-2xl shadow-black/50">
                  <div className="p-1.5 space-y-0.5">
                    {STATUS_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setStatusFilter(opt.value); setStatusDropOpen(false); }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-[14px] transition-colors flex items-center justify-between font-outfit ${
                          statusFilter === opt.value ? 'bg-secondary/10 text-secondary font-medium' : 'text-white hover:bg-raised'
                        }`}
                      >
                        {opt.label}
                        {statusFilter === opt.value && <span className="w-1.5 h-1.5 rounded-full bg-secondary" />}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right: search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari ID / nama pelanggan"
            className="w-full bg-raised border border-border rounded-lg pl-9 pr-4 py-2.5 text-[14px] text-white placeholder:text-text-muted focus:outline-none focus:border-secondary transition-colors font-outfit"
          />
        </div>
      </div>

      {/* ── Sync status bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-[20px] font-bold text-white font-outfit">Riwayat Pembayaran • 30 Sep–6 Okt</h2>
          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-success bg-[#132A20] px-2.5 py-1 rounded-md border-0 font-outfit">
            <span className="w-1.5 h-1.5 rounded-full bg-success" />
            Pakkasir terhubung
          </span>
        </div>
        <span className="text-[12px] text-text-muted font-outfit">Sinkronisasi terakhir 14:30 WIB</span>
      </div>

      {/* ── Main Table: transactions with paid_at ── */}
      <Card className="bg-surface border-border p-0! overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 px-6 text-[12px] font-medium text-text-muted uppercase tracking-wide">Referensi QRIS</th>
                <th className="py-3 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wide w-40">Booking UUID singkat</th>
                <th className="py-3 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wide w-36">Pelanggan</th>
                <th className="py-3 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wide w-44">paid_at</th>
                <th className="py-3 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wide w-32">Nominal</th>
                <th className="py-3 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wide w-36">Status pembayaran</th>
                <th className="py-3 px-4 pr-6 text-[12px] font-medium text-text-muted uppercase tracking-wide">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredPaid.map((p) => (
                <tr key={p.id} className="border-b border-border hover:bg-raised/30 transition-colors">
                  <td className="py-4 px-6">
                    <p className="text-[13px] font-bold text-white font-outfit">{p.qrisRef}</p>
                    <p className="text-[12px] text-text-muted mt-0.5 font-outfit">{p.qrisId}</p>
                  </td>
                  <td className="py-4 px-4 text-[13px] text-text-muted font-outfit">{p.bookingUuid}</td>
                  <td className="py-4 px-4 text-[14px] font-bold text-white font-outfit">{p.customer}</td>
                  <td className="py-4 px-4 text-[13px] text-text-main font-outfit">{p.paidAt}</td>
                  <td className="py-4 px-4 text-[14px] font-medium text-white font-outfit">{p.nominal}</td>
                  <td className="py-4 px-4"><StatusBadge status={p.status} /></td>
                  <td className="py-4 px-4 pr-6">
                    <button className="flex items-center gap-1 text-[13px] font-bold text-secondary hover:brightness-125 transition-all font-outfit">
                      Detail <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between text-[13px]">
          <span className="text-text-muted font-outfit">
            148 paid • 1 refunded • UUID ditampilkan singkat
          </span>
          <div className="flex items-center gap-4">
            <button className="p-1 text-text-muted hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="w-7 h-7 rounded-md bg-[#612c12] flex items-center justify-center text-secondary font-medium font-outfit text-[13px]">1</div>
            <button className="p-1 text-text-muted hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>

      {/* ── Info Banner ── */}
      <div className="bg-[#24130A] border-l-4 border-secondary rounded-lg p-5 flex items-start gap-4">
        <Info className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
        <div>
          <h4 className="text-secondary font-bold text-[14px] mb-1">Pembayaran dan booking terhubung 1:1</h4>
          <p className="text-text-muted text-[13px] leading-relaxed">
            Rentang mengikuti paid_at. Total Rp10.250.000 berasal dari status paid, tidak termasuk refunded. Pending/failed tanpa paid_at tersedia pada daftar Belum dibayar.
          </p>
        </div>
      </div>

      {/* ── Secondary Table: tanpa paid_at ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-warning bg-warning/10 px-3 py-1.5 rounded-lg border border-warning/20 font-outfit">
            <span className="w-1.5 h-1.5 rounded-full bg-warning" />
            Tanpa filter paid_at
          </span>
          <span className="text-[12px] text-text-muted font-outfit">paid_at NULL • pending &amp; failed</span>
        </div>

        <Card className="bg-surface border-border p-0! overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#222225] border-b border-border">
                  <th className="py-3 px-6 text-[12px] font-medium text-text-muted uppercase tracking-wide">Referensi QRIS</th>
                  <th className="py-3 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wide w-40">Booking ID</th>
                  <th className="py-3 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wide w-36">Pelanggan</th>
                  <th className="py-3 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wide w-32">paid_at</th>
                  <th className="py-3 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wide w-32">Nominal</th>
                  <th className="py-3 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wide w-32">Status</th>
                  <th className="py-3 px-4 pr-6 text-[12px] font-medium text-text-muted uppercase tracking-wide">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {UNPAID_PAYMENTS.map((p) => (
                  <tr key={p.id} className="border-b border-border hover:bg-raised/30 transition-colors">
                    <td className="py-4 px-6">
                      <p className="text-[13px] font-bold text-white font-outfit">{p.qrisRef}</p>
                      <p className="text-[12px] text-text-muted mt-0.5 font-outfit">{p.qrisId}</p>
                    </td>
                    <td className="py-4 px-4 text-[13px] text-text-muted font-outfit">{p.bookingUuid}</td>
                    <td className="py-4 px-4 text-[14px] font-bold text-white font-outfit">{p.customer}</td>
                    <td className="py-4 px-4 text-[13px] text-text-muted font-outfit">—</td>
                    <td className="py-4 px-4 text-[14px] font-medium text-white font-outfit">{p.nominal}</td>
                    <td className="py-4 px-4"><StatusBadge status={p.status} /></td>
                    <td className="py-4 px-4 pr-6">
                      <button className="flex items-center gap-1 text-[13px] font-bold text-secondary hover:brightness-125 transition-all font-outfit">
                        Detail <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

    </div>
  );
}