'use client';

import React from 'react';
import { Download, Wallet, Scissors, Star, Calendar, ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, Button, TableRow, TableHead, TableCell, DataTable } from '@/components/ui';
import Image from 'next/image';

export function DashboardView() {
  // Fungsi aktif untuk mengunduh laporan CSV yang Rapi & Standar Microsoft Excel
  const handleDownloadReport = () => {
    const now = new Date();

    // 1. Format Live Waktu & Tanggal Ekspor (Format Standar Indonesia tanpa simbol khusus)
    const liveDateString = now.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    
    const liveTimeString = now.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }) + ' WIB';

    // 2. Hitung Otomatis Periode Mingguan (7 Hari Terakhir)
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

    // 3. Format Tanggal ISO untuk Nama File (YYYY-MM-DD_HHmm)
    const fileTimestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;

    // 4. Struktur Baris CSV yang Bersih, Rapi, & Anti-Karakter Rusak di Excel
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
      ['7b2d9e4f', 'Muhammad Lefi', 'Classic & pompadour', '36', '4.9 Star', 'Rp 2.520.000'],
      ['8c1a5b6d', 'Muhammad Zidan', 'Texture & crop', '31', '4.8 Star', 'Rp 2.170.000'],
      ['-------------------------------------------------------------------------'],
      [`Diunduh secara otomatis dari TRIM Barbershop System pada ${liveDateString} pukul ${liveTimeString}.`],
    ];

    // Convert array ke format CSV menggunakan pemisah titik koma (;) & Sanitize Quote
    const csvString = reportRows
      .map((row) => row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(';'))
      .join('\r\n');

    // Gunakan BOM UTF-8 (\uFEFF) agar simbol & karakter bahasa Indonesia terbaca sempurna di Excel
    const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Laporan_TRIM_${fileTimestamp}.csv`);
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 pb-12 font-space-grotesk no-scrollbar selection:bg-secondary selection:text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-2">
        <header className="space-y-1">
          <h1 className="text-[28px] font-extrabold text-white tracking-tight font-outfit">Beranda & Analitik</h1>
          <p className="text-text-muted text-[14px]">
            Pantau ritme toko, performa tim, dan pendapatan dalam satu tempat.
          </p>
        </header>

        {/* Tombol Unduh Laporan */}
        <Button
          onClick={handleDownloadReport}
          variant="secondary"
          className="gap-2 shrink-0 bg-surface border border-border hover:bg-raised text-text-main text-[14px] font-bold px-4 py-2.5 rounded-xl transition-all active:scale-95 cursor-pointer"
        >
          <Download className="w-4 h-4 text-text-main" />
          <span>Unduh laporan</span>
        </Button>
      </div>

      {/* Hero Banner */}
      <div className="relative rounded-2xl bg-surface border border-border overflow-hidden flex flex-col md:flex-row h-auto md:h-44 shadow-lg">
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center relative z-10">
          <p className="text-secondary text-[12px] font-bold uppercase tracking-widest mb-2 font-outfit">
            TOKO BUKA / is_store_closed = false
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2 uppercase font-outfit">
            GAYA JALANAN. BISNIS JALAN.
          </h2>
          <p className="text-text-muted text-[14px] font-outfit">
            Halo, aditya@trim.id. 6 kapster aktif hari ini.
          </p>
        </div>
        <div className="w-full md:w-96 h-36 md:h-full relative shrink-0 bg-neutral-900 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-surface via-surface/70 to-transparent z-10 hidden md:block"></div>
          <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/70 to-transparent z-10 md:hidden"></div>
          <Image 
            src="/login/barber-bg.jpg.png" 
            alt="Trim Barbershop Banner" 
            fill 
            className="object-cover object-center grayscale contrast-125 brightness-75"
            priority
          />
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <Card className="p-5 flex flex-col justify-between gap-4 border-border bg-surface rounded-2xl">
          <div className="flex justify-between items-start">
            <p className="text-text-muted text-[14px] font-medium">Pendapatan hari ini</p>
            <Wallet className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="text-[28px] font-extrabold text-white font-outfit">Rp1.200.000</h3>
            <p className="text-success text-[12px] mt-1 font-normal font-outfit">Pembayaran paid • paid_at hari ini</p>
          </div>
        </Card>

        {/* Card 2 */}
        <Card className="p-5 flex flex-col justify-between gap-4 border-border bg-surface rounded-2xl">
          <div className="flex justify-between items-start">
            <p className="text-text-muted text-[14px] font-medium">Cukuran selesai hari ini</p>
            <Scissors className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="text-[28px] font-extrabold text-white font-outfit">18</h3>
            <p className="text-success text-[12px] mt-1 font-normal font-outfit">Booking completed • tanggal hari ini</p>
          </div>
        </Card>

        {/* Card 3 */}
        <Card className="p-5 flex flex-col justify-between gap-4 border-border bg-surface rounded-2xl">
          <div className="flex justify-between items-start">
            <p className="text-text-muted text-[14px] font-medium">Rata-rata rating kapster</p>
            <Star className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="text-[28px] font-extrabold text-white font-outfit">4,9 / 5</h3>
            <p className="text-success text-[12px] mt-1 font-normal font-outfit">BARBERS.average_rating • 126 ulasan</p>
          </div>
        </Card>

        {/* Card 4 */}
        <Card className="p-5 flex flex-col justify-between gap-4 border-border bg-surface rounded-2xl">
          <div className="flex justify-between items-start">
            <p className="text-text-muted text-[14px] font-medium">Booking hari ini</p>
            <Calendar className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="text-[28px] font-extrabold text-white font-outfit">28</h3>
            <p className="text-warning text-[12px] mt-1 font-normal font-outfit">2 booking confirmed belum check-in</p>
          </div>
        </Card>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Chart Pendapatan Mingguan */}
        <Card className="lg:col-span-2 p-6 md:p-8 border-border bg-surface rounded-2xl flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Pendapatan mingguan</h2>
            <p className="text-[13px] text-text-muted mb-6 font-outfit">30 Sep–6 Okt 2026 • PAYMENTS.status = paid</p>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6">
              <h3 className="text-4xl font-extrabold text-white font-outfit">Rp10.250.000</h3>
              <div className="bg-success/10 text-success text-[13px] font-normal px-3 py-1.5 rounded-md flex items-center gap-2 w-fit font-outfit border border-success/20">
                <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                <span>↑ 18,4% minggu lalu</span>
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="w-full overflow-x-auto pt-2 pb-2 no-scrollbar">
            <div className="min-w-125 h-56 relative flex flex-col justify-between">
              {/* Guide Lines */}
              <div className="absolute inset-0 flex flex-col justify-between text-[12px] text-text-muted font-outfit pt-2 pb-8 pointer-events-none">
                <div className="flex items-center leading-none"><span>2,1 jt</span></div>
                <div className="flex items-center leading-none"><span>1 jt</span></div>
                <div className="flex items-center leading-none"><span>0</span></div>
              </div>

              {/* Batang Grafik */}
              <div className="absolute inset-0 flex justify-between items-end pl-12 pr-2 pt-8 pb-8 z-10">
                {[
                  { label: '30 Sep', height: '45%', val: '950 rb', active: false },
                  { label: '1 Okt', height: '55%', val: '1,15 jt', active: false },
                  { label: '2 Okt', height: '64%', val: '1,35 jt', active: false },
                  { label: '3 Okt', height: '81%', val: '1,7 jt', active: false },
                  { label: '4 Okt', height: '100%', val: '2,1 jt', active: false },
                  { label: '5 Okt', height: '86%', val: '1,8 jt', active: false },
                  { label: '6 Okt', height: '57%', val: '1,2 jt', active: true },
                ].map((bar, i) => (
                  <div key={i} className="flex flex-col items-center justify-end w-full px-2 h-full relative group">
                    <div 
                      className={`w-full max-w-10 rounded-t-xl transition-all relative flex flex-col items-center ${
                        bar.active ? 'bg-secondary' : 'bg-[#612c12]'
                      }`} 
                      style={{ height: bar.height }}
                    >
                      <span className={`absolute -top-6 text-[12px] font-medium whitespace-nowrap font-outfit ${
                        bar.active ? 'text-secondary font-bold' : 'text-text-muted'
                      }`}>
                        {bar.val}
                      </span>
                    </div>
                    <span className="text-[12px] text-text-muted absolute -bottom-6 whitespace-nowrap font-outfit">
                      {bar.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Right: Lantai toko sekarang */}
        <Card className="p-6 md:p-8 border-border bg-surface rounded-2xl flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Lantai toko, sekarang</h2>
            <p className="text-[13px] text-text-muted mb-8 font-outfit">Selasa, 6 Oktober • 14:30 WIB</p>
            
            <div className="space-y-6 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-text-muted text-[15px]">Menunggu</span>
                <span className="text-warning text-3xl font-bold font-outfit">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-muted text-[15px]">Sedang cukur</span>
                <span className="text-secondary text-3xl font-bold font-outfit">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-muted text-[15px]">Selesai</span>
                <span className="text-success text-3xl font-bold font-outfit">18</span>
              </div>
            </div>

            <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 mb-6">
              <h4 className="text-warning font-bold text-[14px] mb-1 font-outfit">2 booking melewati jadwal</h4>
              <p className="text-text-muted text-[13px] leading-relaxed">
                Rizky & Fajar belum check-in. Admin dapat melakukan Skip.
              </p>
            </div>
          </div>

          <a 
            href="/queue" 
            className="w-fit px-5 py-2.5 rounded-xl bg-transparent border border-border text-text-main hover:bg-raised text-[14px] font-bold flex items-center gap-2 transition-all"
          >
            <ArrowUpRight className="w-4 h-4 text-text-main" />
            <span>Buka monitor antrean</span>
          </a>
        </Card>
      </div>

      {/* Tabel Kapster Paling Tajam Minggu Ini */}
      <div className="pt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white font-outfit">Kapster paling tajam minggu ini</h2>
          <a href="/barbers" className="text-secondary text-[14px] font-bold hover:underline flex items-center gap-1 group">
            Lihat semua 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="rounded-2xl border border-border bg-surface overflow-hidden">
          <DataTable 
            columns={
              <>
                <TableHead className="pl-6 text-[12px] text-text-muted uppercase">Kapster</TableHead>
                <TableHead className="text-[12px] text-text-muted uppercase">Spesialisasi</TableHead>
                <TableHead className="text-[12px] text-text-muted uppercase">Cukuran minggu ini</TableHead>
                <TableHead className="text-[12px] text-text-muted uppercase">Rating</TableHead>
                <TableHead className="pr-6 text-[12px] text-text-muted uppercase">Pendapatan</TableHead>
              </>
            }
          >
            {[
              { id: '6f3a1c7e', name: 'Gus Farhan', initials: 'GF', specialty: 'Fade & taper', cuts: 42, rating: '4,9', income: 'Rp2.940.000' },
              { id: '7b2d9e4f', name: 'Muhammad Lefi', initials: 'ML', specialty: 'Classic & pompadour', cuts: 36, rating: '4,9', income: 'Rp2.520.000' },
              { id: '8c1a5b6d', name: 'Muhammad Zidan', initials: 'MZ', specialty: 'Texture & crop', cuts: 31, rating: '4,8', income: 'Rp2.170.000' }
            ].map((kapster, idx) => (
              <TableRow key={idx} className="border-b border-border/50 hover:bg-raised/50 transition-colors">
                <TableCell className="pl-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-raised border border-border/50 flex items-center justify-center text-secondary font-bold text-[12px] shrink-0 font-outfit">
                      {kapster.initials}
                    </div>
                    <div>
                      <p className="font-bold text-white text-[14px]">{kapster.name}</p>
                      <p className="text-[12px] text-text-muted font-outfit">UUID singkat: {kapster.id}...</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-white text-[14px]">{kapster.specialty}</TableCell>
                <TableCell className="font-bold text-white text-[14px] font-outfit">{kapster.cuts}</TableCell>
                <TableCell className="font-bold text-white text-[14px] font-outfit">
                  <span className="flex items-center gap-1">
                    ★ {kapster.rating}
                  </span>
                </TableCell>
                <TableCell className="font-bold text-white text-[14px] font-outfit pr-6">{kapster.income}</TableCell>
              </TableRow>
            ))}
          </DataTable>

          {/* Table Footer */}
          <div className="px-6 py-4 border-t border-border flex items-center justify-between text-[12px] text-text-muted font-outfit">
            <span>3 kapster terbaik • Periode 30 Sep–6 Okt 2026</span>
            <div className="flex items-center gap-2">
              <button className="p-1 text-text-muted hover:text-white rounded border border-border disabled:opacity-50" disabled>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="w-6 h-6 rounded bg-secondary text-white font-bold flex items-center justify-center text-[12px]">
                1
              </span>
              <button className="p-1 text-text-muted hover:text-white rounded border border-border disabled:opacity-50" disabled>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}