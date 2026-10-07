'use client';

import React from 'react';
import { Download, Wallet, Scissors, Star, Calendar, ArrowUpRight, ArrowRight } from 'lucide-react';
import { Card, Button, TableRow, TableHead, TableCell, DataTable } from '@/components/ui';
import Image from 'next/image';

export function DashboardView() {
  return (
    <div className="space-y-8 pb-12 font-space-grotesk">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <header className="space-y-2">
          <h1 className="text-[28px] font-extrabold text-white tracking-tight font-outfit">Beranda & Analitik</h1>
          <p className="text-text-muted">
            Pantau ritme toko, performa tim, dan pendapatan dalam satu tempat.
          </p>
        </header>
        <Button variant="secondary" className="gap-2 shrink-0 bg-surface border border-border hover:bg-raised text-text-main">
          <Download className="w-4 h-4" />
          <span>Unduh laporan</span>
        </Button>
      </div>

      {/* Hero Banner */}
      <div className="relative rounded-2xl bg-[#141416] border border-border overflow-hidden flex flex-col md:flex-row h-auto md:h-45">
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center relative z-10">
          <p className="text-secondary text-[12px] font-bold uppercase tracking-widest mb-3">TOKO BUKA / is_store_closed = false</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2 uppercase font-outfit">GAYA JALANAN. BISNIS JALAN.</h1>
          <p className="text-text-muted text-[14px] font-outfit">Halo, aditya@trim.id. 6 kapster aktif hari ini.</p>
        </div>
        <div className="w-full md:w-100 h-30 md:h-full relative shrink-0">
          <div className="absolute inset-0 bg-linear-to-r from-[#141416] to-transparent z-10 hidden md:block"></div>
          <div className="absolute inset-0 bg-linear-to-t from-[#141416] to-transparent z-10 md:hidden"></div>
          {/* Hero Image */}
          <Image 
            src="/beranda/banner-beranda.png" 
            alt="Trim Barbershop Banner" 
            fill 
            className="object-cover object-center md:object-right"
            priority
          />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <Card className="p-5 flex flex-col gap-4 border-border bg-surface">
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
        <Card className="p-5 flex flex-col gap-4 border-border bg-surface">
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
        <Card className="p-5 flex flex-col gap-4 border-border bg-surface">
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
        <Card className="p-5 flex flex-col gap-4 border-border bg-surface">
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
        {/* Left: Chart */}
        <Card className="lg:col-span-2 p-6 md:p-8 border-border bg-surface flex flex-col">
          <div className="mb-10">
            <h2 className="text-xl font-bold text-white mb-2">Pendapatan mingguan</h2>
            <p className="text-[13px] text-text-muted mb-6 font-outfit">30 Sep–6 Okt 2026 • PAYMENTS.status = paid</p>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
              <h3 className="text-4xl font-extrabold text-white font-outfit">Rp10.250.000</h3>
              <div className="bg-success/10 text-success text-[13px] font-normal px-3 py-1.5 rounded-md flex items-center gap-2 w-fit font-outfit">
                <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                <span>↑ 18,4% minggu lalu</span>
              </div>
            </div>
          </div>
          
          {/* Simple CSS Bar Chart Mockup */}
          {/* Wrapper for responsive scrolling on mobile */}
          <div className="w-full overflow-x-auto mt-4 pb-2">
            <div className="flex-1 w-150 md:w-full min-h-65 relative">
              {/* Guide Lines */}
              <div className="absolute inset-0 flex flex-col justify-between text-[12px] text-text-muted font-outfit pt-10 pb-8 pointer-events-none">
                <div className="flex items-center leading-none"><span>2,1 jt</span></div>
                <div className="flex items-center leading-none"><span>1 jt</span></div>
                <div className="flex items-center leading-none"><span>0</span></div>
              </div>

              {/* Bars */}
              <div className="absolute inset-0 flex justify-between items-end pl-12 pr-2 pt-10 pb-8 z-10">
                {[
                  { label: '30 Sep', height: '45%', val: '950 rb', active: false },
                  { label: '1 Okt', height: '55%', val: '1,15 jt', active: false },
                  { label: '2 Okt', height: '64%', val: '1,35 jt', active: false },
                  { label: '3 Okt', height: '81%', val: '1,7 jt', active: false },
                  { label: '4 Okt', height: '100%', val: '2,1 jt', active: false },
                  { label: '5 Okt', height: '86%', val: '1,8 jt', active: false },
                  { label: '6 Okt', height: '57%', val: '1,2 jt', active: true },
                ].map((bar, i) => (
                  <div key={i} className="flex flex-col items-center justify-end w-full px-1.5 md:px-3 h-full relative group">
                    <div 
                      className={`w-full rounded-t-xl transition-all relative flex flex-col items-center ${bar.active ? 'bg-secondary' : 'bg-[#612c12]'}`} 
                      style={{ height: bar.height }}
                    >
                      <span className={`absolute -top-6 text-[12px] font-medium whitespace-nowrap font-outfit ${bar.active ? 'text-secondary' : 'text-text-muted'}`}>
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

        {/* Right: Floor Status */}
        <Card className="p-6 md:p-8 border-border bg-surface flex flex-col">
          <h2 className="text-xl font-bold text-white mb-2">Lantai toko, sekarang</h2>
          <p className="text-[13px] text-text-muted mb-10 font-outfit">Selasa, 6 Oktober • 14:30 WIB</p>
          
          <div className="space-y-6 mb-10 flex-1">
            <div className="flex justify-between items-center">
              <span className="text-text-muted text-[15px]">Menunggu</span>
              <span className="text-warning text-3xl font-bold">5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-muted text-[15px]">Sedang cukur</span>
              <span className="text-[#F97316] text-3xl font-bold">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-muted text-[15px]">Selesai</span>
              <span className="text-success text-3xl font-bold">18</span>
            </div>
          </div>

          <div className="bg-warning/10 rounded-xl p-4 md:p-5 mb-6">
            <h4 className="text-warning font-bold text-[14px] mb-2 font-outfit">2 booking melewati jadwal</h4>
            <p className="text-text-muted text-[13px] leading-relaxed">
              Rizky & Fajar belum check-in. Admin dapat melakukan Skip.
            </p>
          </div>

          <Button variant="secondary" className="w-[60%] sm:w-fit justify-start gap-2 bg-transparent border border-border text-text-main hover:bg-raised mt-auto px-5">
            <ArrowUpRight className="w-4 h-4" />
            <span>Buka monitor antrean</span>
          </Button>
        </Card>
      </div>

      {/* Table Section */}
      <div className="pt-4">
        <div className="flex justify-end mb-4">
          <button className="text-secondary text-[14px] font-bold hover:text-white transition-colors flex items-center gap-1 group">
            Lihat semua 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <DataTable 
          columns={
            <>
              <TableHead className="pl-6">Kapster</TableHead>
              <TableHead>Spesialisasi</TableHead>
              <TableHead>Cukuran minggu ini</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="pr-6">Pendapatan</TableHead>
            </>
          }
          pagination={{
            text: "3 kapster terbaik • Periode 30 Sep–6 Okt 2026",
            currentPage: 1
          }}
        >
          {[
            { id: '6f3a1c7e', name: 'Raka Putra', initials: 'RP', specialty: 'Fade & taper', cuts: 42, rating: '4,9', income: 'Rp2.940.000' },
            { id: '7b2d9e4f', name: 'Bima Saputra', initials: 'BS', specialty: 'Classic & pompadour', cuts: 36, rating: '4,9', income: 'Rp2.520.000' },
            { id: '8c1a5b6d', name: 'Dion Mahendra', initials: 'DM', specialty: 'Texture & crop', cuts: 31, rating: '4,8', income: 'Rp2.170.000' }
          ].map((kapster, idx) => (
            <TableRow key={idx}>
              <TableCell className="pl-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-raised border border-border/50 flex items-center justify-center text-secondary font-bold text-[12px] shrink-0 font-outfit">
                    {kapster.initials}
                  </div>
                  <div>
                    <p className="font-bold text-white">{kapster.name}</p>
                    <p className="text-[12px] text-text-muted font-outfit">UUID singkat: {kapster.id}...</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-medium">{kapster.specialty}</TableCell>
              <TableCell className="font-medium font-outfit">{kapster.cuts}</TableCell>
              <TableCell className="font-medium flex items-center gap-1 font-outfit pt-5.5 pb-4">
                <Star className="w-3.5 h-3.5 fill-white" /> {kapster.rating}
              </TableCell>
              <TableCell className="font-medium font-outfit pr-6">{kapster.income}</TableCell>
            </TableRow>
          ))}
        </DataTable>
      </div>

    </div>
  );
}
