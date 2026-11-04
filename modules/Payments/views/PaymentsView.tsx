'use client';

import React, { useState } from 'react';
import { Dropdown } from '@/components/ui';
import {
  Search, ChevronDown, ChevronLeft, ChevronRight,
  Download, Clock, XCircle, ArrowRight, Info, CalendarDays, Wallet
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
  { id: 1, qrisRef: 'QRIS-20261006-8A3F', qrisId: 'id: e3a1b2c4...', bookingUuid: '7f2a1d9e...', customer: 'Gus Zidan', paidAt: '6 Okt 2026 • 14:02', nominal: 'Rp60.000', status: 'lunas', hasPaidAt: true },
  { id: 2, qrisRef: 'QRIS-20261006-C7D2', qrisId: 'id: a1f4c8b2...', bookingUuid: '3c9e5a7b...', customer: 'Gus Farhan', paidAt: '6 Okt 2026 • 13:17', nominal: 'Rp100.000', status: 'lunas', hasPaidAt: true },
  { id: 3, qrisRef: 'QRIS-20261006-4E9A', qrisId: 'id: 9d2e6f3c...', bookingUuid: '5a8d2c1f...', customer: 'Gus Ridho', paidAt: '6 Okt 2026 • 12:45', nominal: 'Rp75.000', status: 'lunas', hasPaidAt: true },
  { id: 4, qrisRef: 'QRIS-20261005-2B7E', qrisId: 'id: c4b8e1a7...', bookingUuid: '1e4f9b3d...', customer: 'Gus Lefi', paidAt: '5 Okt 2026 • 16:30', nominal: 'Rp75.000', status: 'dikembalikan', hasPaidAt: true },
  { id: 5, qrisRef: 'QRIS-20261005-F1C3', qrisId: 'id: b7a3d9e5...', bookingUuid: '8b2f4e6a...', customer: 'Yusuf Pratama', paidAt: '5 Okt 2026 • 11:52', nominal: 'Rp60.000', status: 'lunas', hasPaidAt: true },
  { id: 6, qrisRef: 'QRIS-20261004-9D4B', qrisId: 'id: f2c5a8d1...', bookingUuid: '6c3a7f2e...', customer: 'Agung Saputra', paidAt: '4 Okt 2026 • 15:20', nominal: 'Rp75.000', status: 'lunas', hasPaidAt: true },
  { id: 7, qrisRef: 'QRIS-20261003-6A2D', qrisId: 'id: 3e9b1f7a...', bookingUuid: '4d7e2b9c...', customer: 'Satria Wibowo', paidAt: '3 Okt 2026 • 09:30', nominal: 'Rp100.000', status: 'lunas', hasPaidAt: true },
  { id: 8, qrisRef: 'QRIS-20261001-3F8C', qrisId: 'id: 7a4c2e9b...', bookingUuid: '2f6a8d4c...', customer: 'Bagas Putra', paidAt: '1 Okt 2026 • 10:15', nominal: 'Rp60.000', status: 'lunas', hasPaidAt: true },
];

const UNPAID_PAYMENTS: Payment[] = [
  { id: 9, qrisRef: 'QRIS-20261006-A1B2', qrisId: 'id: d5e2f8c4...', bookingUuid: '9a1c3e5f...', customer: 'Bagas Putra', paidAt: '', nominal: 'Rp75.000', status: 'menunggu', hasPaidAt: false },
  { id: 10, qrisRef: 'QRIS-20261005-C3D4', qrisId: 'id: e8b1a4f2...', bookingUuid: '7b5d9e1a...', customer: 'Fikri Ananda', paidAt: '', nominal: 'Rp60.000', status: 'menunggu', hasPaidAt: false },
  { id: 11, qrisRef: 'QRIS-20261004-E5F6', qrisId: 'id: 4c7f3b8e...', bookingUuid: '3e8a5c2d...', customer: 'Rangga Utama', paidAt: '', nominal: 'Rp75.000', status: 'gagal', hasPaidAt: false },
  { id: 12, qrisRef: 'QRIS-20261003-G7H8', qrisId: 'id: 6d1e9a3f...', bookingUuid: '5f2b7d9e...', customer: 'Agung Saputra', paidAt: '', nominal: 'Rp60.000', status: 'gagal', hasPaidAt: false },
  { id: 13, qrisRef: 'QRIS-20261002-I9J0', qrisId: 'id: 2a5f7c1d...', bookingUuid: '8d4e1f6b...', customer: 'Yusuf Pratama', paidAt: '', nominal: 'Rp100.000', status: 'menunggu', hasPaidAt: false },
];

/* ─────────────────── Status badge helper ─────────────────── */
type BadgeConfig = { bg: string; dot: string; text: string; label: string };

const STATUS_CONFIG: Record<PayStatus, BadgeConfig> = {
  lunas: { bg: 'bg-emerald-950/40 border border-emerald-500/20', dot: 'bg-emerald-400', text: 'text-emerald-400', label: 'Lunas' },
  menunggu: { bg: 'bg-amber-950/40 border border-amber-500/20', dot: 'bg-amber-400', text: 'text-amber-400', label: 'Menunggu' },
  gagal: { bg: 'bg-rose-950/40 border border-rose-500/20', dot: 'bg-rose-400', text: 'text-rose-400', label: 'Gagal' },
  dikembalikan: { bg: 'bg-[#3B2F8A]/30 border border-[#818CF8]/20', dot: 'bg-[#818CF8]', text: 'text-[#818CF8]', label: 'Dikembalikan' },
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

  const STATUS_OPTIONS = [
    { value: 'all', label: 'Semua status' },
    { value: 'lunas', label: 'Lunas' },
    { value: 'menunggu', label: 'Menunggu' },
    { value: 'gagal', label: 'Gagal' },
    { value: 'dikembalikan', label: 'Dikembalikan' },
  ];

  const filteredPaid = PAID_PAYMENTS.filter((p) => {
    const matchSearch = p.customer.toLowerCase().includes(search.toLowerCase()) || p.qrisRef.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalLunas = PAID_PAYMENTS.filter((p) => p.status === 'lunas').length;
  const totalMenunggu = UNPAID_PAYMENTS.filter((p) => p.status === 'menunggu').length;
  const totalGagal = UNPAID_PAYMENTS.filter((p) => p.status === 'gagal').length;

  return (
    <div className="space-y-6 text-white font-space-grotesk no-scrollbar selection:bg-secondary selection:text-white pb-16">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight font-outfit">Riwayat Pembayaran</h1>
          <p className="text-sm md:text-base text-text-muted mt-1 font-outfit">
            Riwayat pembayaran QRIS Pakkasir, ditautkan ke booking dan pelanggan. Semua nominal dalam Rupiah.
          </p>
        </div>
        <button className="bg-surface border border-border hover:bg-raised text-white px-5 py-2.5 rounded-xl text-sm font-bold font-outfit flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer self-start sm:self-auto shrink-0">
          <Download className="w-4 h-4 text-white" />
          <span>Ekspor transaksi</span>
        </button>
      </div>

      {/* ── Summary Cards (Disempurnakan agar tidak offside) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Lunas */}
        <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col justify-between gap-4 h-auto min-h-[140px] transition-all duration-200 hover:-translate-y-0.5 hover:border-border/80">
          <div className="flex items-center justify-between text-text-muted">
            <span className="text-[15px] font-medium font-outfit">Total pembayaran lunas</span>
            <Wallet className="w-5 h-5 text-secondary shrink-0" />
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-white mb-1 font-outfit leading-none">Rp10.250.000</h3>
            <p className="text-[13px] text-emerald-400 font-medium font-outfit">{totalLunas} pembayaran paid • 30 Sep–6 Okt</p>
          </div>
        </div>

        {/* Menunggu */}
        <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col justify-between gap-4 h-auto min-h-[140px] transition-all duration-200 hover:-translate-y-0.5 hover:border-border/80">
          <div className="flex items-center justify-between text-text-muted">
            <span className="text-[15px] font-medium font-outfit">Menunggu pembayaran</span>
            <Clock className="w-5 h-5 text-secondary shrink-0" />
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-white mb-1 font-outfit leading-none">{totalMenunggu} transaksi</h3>
            <p className="text-[13px] text-amber-400 font-medium font-outfit">Tanpa filter paid_at</p>
          </div>
        </div>

        {/* Gagal */}
        <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col justify-between gap-4 h-auto min-h-[140px] transition-all duration-200 hover:-translate-y-0.5 hover:border-border/80">
          <div className="flex items-center justify-between text-text-muted">
            <span className="text-[15px] font-medium font-outfit">Transaksi gagal</span>
            <XCircle className="w-5 h-5 text-secondary shrink-0" />
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-white mb-1 font-outfit leading-none">{totalGagal} transaksi</h3>
            <p className="text-[13px] text-text-muted font-outfit">{totalGagal} failed • tanpa filter paid_at</p>
          </div>
        </div>
      </div>

      {/* ── Main Section: Filter Bar & Main Table ── */}
      <div className="space-y-4 pt-1">
        {/* Filter Bar (Posisi Pencarian Disesuaikan Ringkas di Sisi Kanan) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Left: date + status */}
          <div className="flex items-center gap-2 flex-wrap">
            <button className="flex items-center gap-2 bg-surface border border-border rounded-xl px-4 py-2 text-white hover:bg-raised transition-all active:scale-[0.98] font-outfit text-[14px] font-medium cursor-pointer">
              <CalendarDays className="w-4 h-4 text-text-muted" />
              <span>30 Sep 2026 – 6 Okt 2026</span>
            </button>

            {/* Status dropdown */}
            <Dropdown
              value={statusFilter}
              onChange={(val) => setStatusFilter(val)}
              options={STATUS_OPTIONS}
            />
          </div>

          {/* Right: compact search bar */}
          <div className="relative w-full sm:w-64 sm:ml-auto">
            <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari ID / nama pelanggan"
              className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-2 text-[14px] text-white placeholder:text-text-muted focus:outline-none focus:border-secondary transition-colors font-outfit"
            />
          </div>
        </div>

        {/* Sync status bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-3">
            <h2 className="text-lg md:text-[20px] font-bold text-white font-outfit">Riwayat Pembayaran • 30 Sep–6 Okt</h2>
            <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-success bg-[#132A20] px-2.5 py-1 rounded-md border-0 font-outfit">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              Pakkasir terhubung
            </span>
          </div>
          <span className="text-[12px] text-text-muted font-outfit">Sinkronisasi terakhir 14:30 WIB</span>
        </div>

        {/* ── Main Table: transactions with paid_at ── */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#222225] border-b border-border">
                <tr>
                  <th className="py-4 px-6 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">Referensi QRIS</th>
                  <th className="py-4 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit w-40">Booking UUID singkat</th>
                  <th className="py-4 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit w-36">Pelanggan</th>
                  <th className="py-4 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit w-44">paid_at</th>
                  <th className="py-4 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit w-32">Nominal</th>
                  <th className="py-4 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit w-36">Status pembayaran</th>
                  <th className="py-4 px-6 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-text-main">
                {filteredPaid.map((p) => (
                  <tr key={p.id} className="hover:bg-raised/40 transition-colors duration-150">
                    <td className="py-4 px-6">
                      <p className="text-[13px] font-bold text-white font-outfit">{p.qrisRef}</p>
                      <p className="text-[12px] text-text-muted mt-0.5 font-outfit">{p.qrisId}</p>
                    </td>
                    <td className="py-4 px-4 text-[13px] text-text-muted font-outfit">{p.bookingUuid}</td>
                    <td className="py-4 px-4 text-[14px] font-bold text-white font-outfit">{p.customer}</td>
                    <td className="py-4 px-4 text-[13px] text-text-main font-outfit">{p.paidAt}</td>
                    <td className="py-4 px-4 text-[14px] font-medium text-white font-outfit">{p.nominal}</td>
                    <td className="py-4 px-4"><StatusBadge status={p.status} /></td>
                    <td className="py-4 px-6 text-right">
                      <button className="inline-flex items-center gap-1 text-[13px] font-bold text-secondary hover:brightness-125 transition-all font-outfit cursor-pointer group">
                        Detail <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 md:px-6 border-t border-border flex items-center justify-between text-[13px] text-text-muted font-outfit">
            <span>148 paid • 1 refunded • UUID ditampilkan singkat</span>
            <div className="flex items-center gap-3">
              <button className="p-1 rounded text-text-muted hover:text-white disabled:opacity-40 transition-colors" disabled>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="w-7 h-7 rounded-md bg-secondary text-white font-bold flex items-center justify-center text-[13px]">
                1
              </span>
              <button className="p-1 rounded text-text-muted hover:text-white disabled:opacity-40 transition-colors" disabled>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Info Banner ── */}
      <div className="bg-[#24130A] border-l-4 border-secondary rounded-lg p-5 flex items-start gap-4 shadow-md font-outfit transition-transform hover:translate-x-1 duration-200">
        <Info className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-secondary font-bold text-[14px] font-outfit">Pembayaran dan booking terhubung 1:1</h4>
          <p className="text-text-muted text-[13px] leading-relaxed font-outfit">
            Rentang mengikuti paid_at. Total Rp10.250.000 berasal dari status paid, tidak termasuk refunded. Pending/failed tanpa paid_at tersedia pada daftar Belum dibayar.
          </p>
        </div>
      </div>

      {/* ── Secondary Table: tanpa paid_at ── */}
      <div className="space-y-4 pt-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-3">
            <h2 className="text-lg md:text-[20px] font-bold text-white font-outfit">Transaksi Belum Dibayar</h2>
            <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-warning bg-warning/10 px-2.5 py-1 rounded-md border border-warning/20 font-outfit">
              <span className="w-1.5 h-1.5 rounded-full bg-warning" />
              Tanpa filter paid_at
            </span>
          </div>
          <span className="text-[12px] text-text-muted font-outfit">paid_at NULL • pending &amp; failed</span>
        </div>

        <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#222225] border-b border-border">
                <tr>
                  <th className="py-4 px-6 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">Referensi QRIS</th>
                  <th className="py-4 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit w-40">Booking ID</th>
                  <th className="py-4 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit w-36">Pelanggan</th>
                  <th className="py-4 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit w-32">paid_at</th>
                  <th className="py-4 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit w-32">Nominal</th>
                  <th className="py-4 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit w-32">Status</th>
                  <th className="py-4 px-6 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-text-main">
                {UNPAID_PAYMENTS.map((p) => (
                  <tr key={p.id} className="hover:bg-raised/40 transition-colors duration-150">
                    <td className="py-4 px-6">
                      <p className="text-[13px] font-bold text-white font-outfit">{p.qrisRef}</p>
                      <p className="text-[12px] text-text-muted mt-0.5 font-outfit">{p.qrisId}</p>
                    </td>
                    <td className="py-4 px-4 text-[13px] text-text-muted font-outfit">{p.bookingUuid}</td>
                    <td className="py-4 px-4 text-[14px] font-bold text-white font-outfit">{p.customer}</td>
                    <td className="py-4 px-4 text-[13px] text-text-muted font-outfit">—</td>
                    <td className="py-4 px-4 text-[14px] font-medium text-white font-outfit">{p.nominal}</td>
                    <td className="py-4 px-4"><StatusBadge status={p.status} /></td>
                    <td className="py-4 px-6 text-right">
                      <button className="inline-flex items-center gap-1 text-[13px] font-bold text-secondary hover:brightness-125 transition-all font-outfit cursor-pointer group">
                        Detail <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}