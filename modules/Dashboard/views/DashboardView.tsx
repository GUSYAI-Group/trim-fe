'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Wallet, Scissors, Star, Calendar, ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, Button, TableRow, TableHead, TableCell, DataTable } from '@/components/ui';
import Image from 'next/image';

/* Helper component: Count-up animation for numbers */
function AnimatedCounter({
  value,
  duration = 800,
  prefix = '',
  suffix = '',
  format = (n: number) => n.toLocaleString('id-ID'),
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  format?: (n: number) => string;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrent(value);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Apple / easeOutExpo easing curve
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const val = Math.round(ease * value);
      setCurrent(val);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCurrent(value);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration]);

  return (
    <span>
      {prefix}
      {format(current)}
      {suffix}
    </span>
  );
}

/* Helper component: Count-up for decimal numbers like 4,9 */
function AnimatedDecimal({
  value,
  duration = 800,
  decimals = 1,
  suffix = '',
}: {
  value: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrent(value);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const val = ease * value;
      setCurrent(val);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCurrent(value);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration]);

  return (
    <span>
      {current.toFixed(decimals).replace('.', ',')}
      {suffix}
    </span>
  );
}

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
    <div className="space-y-6 text-white font-space-grotesk no-scrollbar selection:bg-secondary selection:text-white pb-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight font-outfit">Beranda & Analitik</h1>
          <p className="text-sm md:text-base text-text-muted mt-1 font-outfit">
            Pantau ritme toko, performa tim, dan pendapatan dalam satu tempat.
          </p>
        </div>

        {/* Tombol Unduh Laporan */}
        <Button
          onClick={handleDownloadReport}
          variant="secondary"
          className="bg-surface border border-border hover:bg-raised text-white px-5 py-2.5 rounded-xl text-sm font-bold font-outfit flex items-center justify-center gap-2 shadow-sm transition-all duration-150 active:scale-[0.98] cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Download className="w-4 h-4 text-white" />
          <span>Unduh laporan</span>
        </Button>
      </motion.div>

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl bg-surface border border-border overflow-hidden flex flex-col md:flex-row h-auto md:h-44 shadow-lg transition-colors hover:border-border/80"
      >
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center relative z-10">
          <p className="text-secondary text-[12px] font-bold uppercase tracking-widest mb-2 font-outfit">
            TOKO BUKA / is_store_closed = false
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2 uppercase font-outfit">
            GAYA JALANAN. BISNIS JALAN.
          </h2>
          <p className="text-text-muted text-sm md:text-base font-outfit">
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
            className="object-cover object-center grayscale contrast-125 brightness-75 transition-transform duration-700 hover:scale-105"
            priority
          />
        </div>
      </motion.div>

      {/* 4 KPI Cards (Staggered entrance + Count-up animations) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="p-5 rounded-2xl flex flex-col justify-between gap-3 h-auto min-h-[140px] border-border bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-border/80">
            <div className="flex justify-between items-start text-text-muted gap-2">
              <span className="text-[14px] font-medium font-outfit leading-tight">Pendapatan hari ini</span>
              <Wallet className="w-5 h-5 text-secondary shrink-0" />
            </div>
            <div>
              <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-1 font-outfit">
                <AnimatedCounter value={1200000} prefix="Rp" />
              </h3>
              <p className="text-success text-[12px] lg:text-[13px] font-medium font-outfit truncate" title="Pembayaran paid • paid_at hari ini">
                Pembayaran paid • paid_at hari ini
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="p-5 rounded-2xl flex flex-col justify-between gap-3 h-auto min-h-[140px] border-border bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-border/80">
            <div className="flex justify-between items-start text-text-muted gap-2">
              <span className="text-[14px] font-medium font-outfit leading-tight">Cukuran selesai hari ini</span>
              <Scissors className="w-5 h-5 text-secondary shrink-0" />
            </div>
            <div>
              <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-1 font-outfit">
                <AnimatedCounter value={18} />
              </h3>
              <p className="text-success text-[12px] lg:text-[13px] font-medium font-outfit truncate" title="Booking completed • tanggal hari ini">
                Booking completed • tanggal hari ini
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="p-5 rounded-2xl flex flex-col justify-between gap-3 h-auto min-h-[140px] border-border bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-border/80">
            <div className="flex justify-between items-start text-text-muted gap-2">
              <span className="text-[14px] font-medium font-outfit leading-tight">Rata-rata rating kapster</span>
              <Star className="w-5 h-5 text-secondary shrink-0" />
            </div>
            <div>
              <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-1 font-outfit">
                <AnimatedDecimal value={4.9} suffix=" / 5" />
              </h3>
              <p className="text-success text-[12px] lg:text-[13px] font-medium font-outfit truncate" title="BARBERS.average_rating • 126 ulasan">
                BARBERS.average_rating • 126 ulasan
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Card 4 */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.20, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="p-5 rounded-2xl flex flex-col justify-between gap-3 h-auto min-h-[140px] border-border bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-border/80">
            <div className="flex justify-between items-start text-text-muted gap-2">
              <span className="text-[14px] font-medium font-outfit leading-tight">Booking hari ini</span>
              <Calendar className="w-5 h-5 text-secondary shrink-0" />
            </div>
            <div>
              <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-1 font-outfit">
                <AnimatedCounter value={28} />
              </h3>
              <p className="text-warning text-[12px] lg:text-[13px] font-medium font-outfit truncate" title="2 booking confirmed belum check-in">
                2 booking confirmed belum check-in
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Main Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Left: Chart Pendapatan Mingguan */}
        <Card className="lg:col-span-2 p-6 md:p-8 border-border bg-surface rounded-2xl flex flex-col justify-between shadow-md">
          <div>
            <h2 className="text-lg md:text-[20px] font-bold text-white mb-1 font-outfit">Pendapatan mingguan</h2>
            <p className="text-[13px] text-text-muted mb-6 font-outfit">30 Sep–6 Okt 2026 • PAYMENTS.status = paid</p>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6">
              <h3 className="text-4xl font-extrabold text-white font-outfit">
                <AnimatedCounter value={10250000} prefix="Rp" />
              </h3>
              <div className="bg-success/10 text-success text-[13px] font-medium px-3 py-1.5 rounded-md flex items-center gap-2 w-fit font-outfit border border-success/20">
                <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                <span>↑ 18,4% minggu lalu</span>
              </div>
            </div>
          </div>

          {/* Bar Chart with Smooth Height Growth */}
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
                  <div key={i} className="flex flex-col items-center justify-end w-full px-2 h-full relative group cursor-pointer">
                    <motion.div
                      initial={{ height: 0, opacity: 0.4 }}
                      animate={{ height: bar.height, opacity: 1 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.2 + i * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`w-full max-w-10 rounded-t-xl transition-colors duration-200 group-hover:brightness-125 ${bar.active ? 'bg-secondary' : 'bg-[#612c12]'
                        }`}
                    >
                      <span className={`absolute -top-6 left-1/2 -translate-x-1/2 text-[12px] font-medium whitespace-nowrap font-outfit transition-colors group-hover:text-white ${bar.active ? 'text-secondary font-bold' : 'text-text-muted'
                        }`}>
                        {bar.val}
                      </span>
                    </motion.div>
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
        <Card className="p-6 md:p-8 border-border bg-surface rounded-2xl flex flex-col justify-between shadow-md">
          <div>
            <h2 className="text-lg md:text-[20px] font-bold text-white mb-1 font-outfit">Lantai toko, sekarang</h2>
            <p className="text-[13px] text-text-muted mb-8 font-outfit">Selasa, 6 Oktober • 14:30 WIB</p>

            <div className="space-y-6 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-text-muted text-[15px]">Menunggu</span>
                <span className="text-warning text-3xl font-bold font-outfit">
                  <AnimatedCounter value={5} duration={600} />
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-muted text-[15px]">Sedang cukur</span>
                <span className="text-secondary text-3xl font-bold font-outfit">
                  <AnimatedCounter value={3} duration={600} />
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-muted text-[15px]">Selesai</span>
                <span className="text-success text-3xl font-bold font-outfit">
                  <AnimatedCounter value={18} duration={700} />
                </span>
              </div>
            </div>

            <div className="bg-[#24130A] border-l-4 border-warning rounded-lg p-5 mb-6 shadow-md font-outfit transition-all hover:translate-x-1 duration-200">
              <h4 className="text-warning font-bold text-[14px] mb-1 font-outfit">2 booking melewati jadwal</h4>
              <p className="text-text-muted text-[13px] leading-relaxed font-outfit">
                Rizky & Fajar belum check-in. Admin dapat melakukan Skip.
              </p>
            </div>
          </div>

          <a
            href="/queue"
            className="w-fit px-5 py-2.5 rounded-xl bg-transparent border border-border text-white hover:bg-raised text-sm font-bold flex items-center gap-2 transition-all active:scale-[0.98] cursor-pointer font-outfit"
          >
            <ArrowUpRight className="w-4 h-4 text-white" />
            <span>Buka monitor antrean</span>
          </a>
        </Card>
      </motion.div>

      {/* Tabel Kapster Paling Tajam Minggu Ini */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4 pt-1"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg md:text-[20px] font-bold text-white font-outfit">Kapster paling tajam minggu ini</h2>
          <a href="/barbers" className="text-secondary text-[14px] font-bold hover:underline flex items-center gap-1 group font-outfit self-start sm:self-auto">
            <span>Lihat semua</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-md">
          <DataTable
            columns={
              <>
                <TableHead className="py-4 px-6 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">Kapster</TableHead>
                <TableHead className="py-4 px-5 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">Spesialisasi</TableHead>
                <TableHead className="py-4 px-5 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">Cukuran minggu ini</TableHead>
                <TableHead className="py-4 px-5 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">Rating</TableHead>
                <TableHead className="py-4 px-6 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit pr-6">Pendapatan</TableHead>
              </>
            }
          >
            {[
              { id: '6f3a1c7e', name: 'Gus Farhan', initials: 'GF', specialty: 'Fade & taper', cuts: 42, rating: '4,9', income: 'Rp2.940.000' },
              { id: '7b2d9e4f', name: 'Muhammad Lefi', initials: 'LD', specialty: 'Classic & pompadour', cuts: 36, rating: '4,9', income: 'Rp2.520.000' },
              { id: '8c1a5b6d', name: 'Muhammad Zidan', initials: 'MZ', specialty: 'Texture & crop', cuts: 31, rating: '4,8', income: 'Rp2.170.000' }
            ].map((kapster, idx) => (
              <TableRow key={idx} className="border-b border-border/50 hover:bg-raised/60 transition-colors duration-150">
                <TableCell className="pl-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-raised border border-border/50 flex items-center justify-center text-secondary font-bold text-[12px] shrink-0 font-outfit transition-transform hover:scale-105">
                      {kapster.initials}
                    </div>
                    <div>
                      <p className="font-bold text-white text-[15px] font-outfit">{kapster.name}</p>
                      <p className="text-[13px] text-text-muted font-outfit mt-0.5">UUID singkat: {kapster.id}...</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-5 font-medium text-white text-[14px] font-outfit">{kapster.specialty}</TableCell>
                <TableCell className="py-4 px-5 font-bold text-white text-[14px] font-outfit">{kapster.cuts}</TableCell>
                <TableCell className="py-4 px-5 font-bold text-white text-[14px] font-outfit">
                  <span className="flex items-center gap-1">
                    ★ {kapster.rating}
                  </span>
                </TableCell>
                <TableCell className="py-4 px-6 font-bold text-white text-[14px] font-outfit pr-6">{kapster.income}</TableCell>
              </TableRow>
            ))}
          </DataTable>

          {/* Table Footer */}
          <div className="p-4 md:px-6 border-t border-border flex items-center justify-between text-[13px] text-text-muted font-outfit">
            <span>3 kapster terbaik • Periode 30 Sep–6 Okt 2026</span>
            <div className="flex items-center gap-3">
              <button className="p-1 rounded text-text-muted hover:text-white disabled:opacity-40 transition-colors cursor-not-allowed" disabled>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="w-7 h-7 rounded-md bg-secondary text-white font-bold flex items-center justify-center text-[13px]">
                1
              </span>
              <button className="p-1 rounded text-text-muted hover:text-white disabled:opacity-40 transition-colors cursor-not-allowed" disabled>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
