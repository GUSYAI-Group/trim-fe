'use client';

import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Button, Toast } from '@/components/ui';
import { DashboardHeroSection } from './sections/DashboardHeroSection';
import { DashboardKpiSection } from './sections/DashboardKpiSection';
import { DashboardRevenueQueueSection } from './sections/DashboardRevenueQueueSection';
import { DashboardTopBarbersSection } from './sections/DashboardTopBarbersSection';

export default function DashboardPage() {
  const [toastOpen, setToastOpen] = useState(false);

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
      ['Pendapatan Hari Ini', 'Rp 1.200.000', `Pembayaran paid - Status per ${liveTimeString}`],
      ['Cukuran Selesai Hari Ini', '18 Cukuran', 'Booking completed - Tanggal hari ini'],
      ['Rata-rata Rating Kapster', '4.9 / 5.0', 'BARBERS.average_rating (126 ulasan)'],
      ['Booking Hari Ini', '28 Booking', '2 booking confirmed belum check-in'],
      ['Total Pendapatan Mingguan', 'Rp 10.250.000', `Periode ${livePeriodString} (+18.4% minggu lalu)`],
      [],
      ['2. RINGKASAN LANTAI TOKO (STATUS ANTREAN)'],
      ['-------------------------------------------------------------------------'],
      ['Status Antrean', 'Jumlah Pelanggan', 'Keterangan'],
      ['Menunggu', '5 Pelanggan', 'Menunggu giliran di ruang tunggu'],
      ['Sedang Cukur', '3 Pelanggan', 'Dalam proses pengerjaan oleh kapster'],
      ['Selesai Hari Ini', '18 Pelanggan', 'Selesai dan terbayar'],
      ['Peringatan Jadwal', '2 Booking', 'Rizky & Fajar melewatkan jadwal check-in'],
      [],
      ['3. PERFORMA KAPSTER TERBAIK MINGGU INI'],
      ['-------------------------------------------------------------------------'],
      ['UUID Singkat', 'Nama Kapster', 'Spesialisasi', 'Jumlah Cukuran', 'Rating', 'Pendapatan'],
      ['6f3a1c7e', 'Gus Farhan', 'Fade & taper', '42', '4.9 Star', 'Rp 2.940.000'],
      ['7b2d9e4f', 'Lefi Dian', 'Classic & pompadour', '36', '4.9 Star', 'Rp 2.520.000'],
      ['8c1a5b6d', 'Zidan Alex', 'Texture & crop', '31', '4.8 Star', 'Rp 2.170.000'],
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

      <DashboardHeroSection />
      <DashboardKpiSection />
      <DashboardRevenueQueueSection />
      <DashboardTopBarbersSection />

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
