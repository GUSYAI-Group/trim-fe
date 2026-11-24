'use client';

import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { Button, Toast } from '@/components/ui';
import { dashboardService, DashboardStats } from '@/services/endpoints/dashboard';
import { DashboardHeroSection } from './sections/DashboardHeroSection';
import { DashboardKpiSection } from './sections/DashboardKpiSection';
import { DashboardRevenueQueueSection } from './sections/DashboardRevenueQueueSection';
import { DashboardTopBarbersSection } from './sections/DashboardTopBarbersSection';

export default function DashboardPage() {
  const [toastOpen, setToastOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await dashboardService.getStats();
        if (res.data) setStats(res.data);
      } catch (_err) {
        // Fallback to static if backend not responding
      }
    }
    loadStats();
    const interval = setInterval(loadStats, 15000); // Refresh live every 15s
    return () => clearInterval(interval);
  }, []);

  const handleDownloadReport = () => {
    const now = new Date();
    const liveDateString = now.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const liveTimeString =
      now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }) + ' WIB';

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 6);

    const startDateString = sevenDaysAgo.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
    });
    const endDateString = now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const livePeriodString = `${startDateString} s/d ${endDateString}`;

    const fileTimestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;

    const kpi = stats?.kpi;
    const topBarbersList =
      Array.isArray(stats?.topBarbers) && stats.topBarbers.length > 0
        ? stats.topBarbers.map((b) => [
            b.barber_id ? b.barber_id.slice(0, 8) : 'id',
            b.barber_name || b.name || 'Kapster',
            b.specialty || 'General Cut',
            String(b.total_completed_services || 0),
            `${Number(b.average_rating || 5.0).toFixed(1)} Star`,
            `Rp ${Number(b.total_revenue_generated || 0).toLocaleString('id-ID')}`,
          ])
        : [['-', 'Belum ada data aktivitas kapster', '-', '0', '-', 'Rp 0']];

    const reportRows = [
      ['sep=;'],
      ['========================================================================='],
      [' LAPORAN BERANDA & ANALITIK - TRIM BARBERSHOP '],
      ['========================================================================='],
      ['Tanggal Ekspor', liveDateString],
      ['Waktu Ekspor', liveTimeString],
      ['Periode Data', livePeriodString],
      [],
      ['1. METRIK KINERJA UTAMA'],
      ['-------------------------------------------------------------------------'],
      ['Metrik Operasional', 'Nilai Saat Ini', 'Keterangan Status'],
      ['Pendapatan Hari Ini', `Rp ${Number(kpi?.today_revenue || 0).toLocaleString('id-ID')}`, `Pembayaran paid - Status per ${liveTimeString}`],
      ['Cukuran Selesai Hari Ini', `${kpi?.completed_services ?? 0} Cukuran`, 'Booking completed - Tanggal hari ini'],
      ['Rata-rata Rating Kapster', `${Number(kpi?.average_rating || 0).toFixed(1)} / 5.0`, 'BARBERS.average_rating'],
      ['Booking Hari Ini', `${kpi?.today_appointments ?? 0} Booking`, 'Status antrean & booking live'],
      ['Total Pendapatan Mingguan', stats?.weeklyRevenue?.formattedTotal || `Rp ${Number(kpi?.today_revenue || 0).toLocaleString('id-ID')}`, `Sinkron database MySQL`],
      [],
      ['2. RINGKASAN LANTAI TOKO (STATUS ANTREAN)'],
      ['-------------------------------------------------------------------------'],
      ['Status Antrean', 'Jumlah Pelanggan', 'Keterangan'],
      ['Antrean Aktif', `${kpi?.currently_in_queue ?? 0} Pelanggan`, 'Menunggu giliran di ruang tunggu / kursi'],
      ['Pelanggan Hari Ini', `${kpi?.today_customers ?? 0} Pelanggan`, 'Tercatat di sistem hari ini'],
      ['Layanan Selesai', `${kpi?.completed_services ?? 0} Layanan`, 'Selesai dan terbayar'],
      [],
      ['3. PERFORMA KAPSTER TERBAIK MINGGU INI'],
      ['-------------------------------------------------------------------------'],
      ['UUID Singkat', 'Nama Kapster', 'Spesialisasi', 'Jumlah Cukuran', 'Rating', 'Pendapatan'],
      ...topBarbersList,
      ['-------------------------------------------------------------------------'],
      [`Diunduh secara otomatis dari TRIM Barbershop System pada ${liveDateString} pukul ${liveTimeString}.`],
    ];

    const csvString = reportRows
      .map((row) => row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(';'))
      .join('\r\n');

    const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Laporan_TRIM_${fileTimestamp}.csv`);
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setToastOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <header className="space-y-1">
          <h1 className="text-[28px] font-extrabold text-text-main tracking-tight">
            Beranda & Analitik
          </h1>
          <p className="text-text-muted text-[14px]">
            Pantau ritme toko, performa tim, dan pendapatan dalam satu tempat.
          </p>
        </header>

        <Button
          onClick={handleDownloadReport}
          variant="outline"
          size="md"
          icon={<Download className="w-4 h-4" />}
        >
          Unduh laporan
        </Button>
      </div>

      <DashboardHeroSection activeBarbersCount={stats?.kpi?.active_barbers_count} />
      <DashboardKpiSection kpi={stats?.kpi} />
      <DashboardRevenueQueueSection
        kpi={stats?.kpi}
        weeklyRevenue={stats?.weeklyRevenue}
        floorStatus={stats?.floorStatus}
      />
      <DashboardTopBarbersSection topBarbers={stats?.topBarbers} />

      <div className="fixed bottom-6 right-6 z-50">
        <Toast
          isOpen={toastOpen}
          onClose={() => setToastOpen(false)}
          variant="success"
          title="Laporan berhasil diunduh"
          description="File CSV Laporan Beranda & Analitik siap dibuka di Excel."
        />
      </div>
    </div>
  );
}
