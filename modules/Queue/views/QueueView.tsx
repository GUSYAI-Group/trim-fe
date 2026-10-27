'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, AlertTriangle, SkipForward, ChevronDown } from 'lucide-react';

interface QueueCardProps {
  queueNo: string;
  timeRange: string;
  customerName: string;
  serviceDetail: string;
  kapsterName: string;
  statusText?: string;
  statusFlowText: string;
  checkInTime?: string;
  actionText?: string;
  actionColor?: string;
  progressMinutes?: number;
  totalMinutes?: number;
  paymentStatus?: 'paid' | 'pending';
}

function LiveHeader() {
  const [timeString, setTimeString] = useState<string>('');
  const [dateString, setDateString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTimeString(`${hours}:${minutes}:${seconds} WIB`);

      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      };
      setDateString(now.toLocaleDateString('id-ID', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2.5 font-outfit">
      {/* Badge Live + Jam Real-time */}
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/40 border border-emerald-500/20 text-emerald-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Live • {timeString || '14:30:00 WIB'}</span>
      </span>

      {/* Tanggal Real-time */}
      <span className="text-[11px] md:text-xs text-text-muted font-medium">
        {dateString || 'Selasa, 6 Oktober 2026'}
      </span>
    </div>
  );
}

export default function QueueView() {
  return (
    <div className="space-y-6 pb-12 font-space-grotesk no-scrollbar selection:bg-secondary selection:text-white">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-outfit">
        <div>
          <h1 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight">
            Monitor Antrean Langsung
          </h1>
          <p className="text-text-muted text-xs md:text-sm mt-1">
            28 booking • 5 menunggu, 3 sedang cukur, 18 selesai, 2 confirmed belum check-in.
          </p>
        </div>

        {/* Link Menggantikan Button untuk Berpindah ke Form Tambah Antrean */}
        <Link
          href="/queue/form"
          className="bg-secondary hover:bg-secondary/90 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-secondary/20 transition-all active:scale-95 cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah walk-in</span>
        </Link>
      </div>

      {/* Live Indicator & Dropdown Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-outfit">
        <LiveHeader />

        <div className="flex items-center gap-2">
          <div className="relative">
            <select className="appearance-none bg-surface border border-border text-text-muted text-xs font-medium rounded-xl pl-3 pr-8 py-1.5 focus:outline-none focus:border-secondary cursor-pointer">
              <option className="bg-surface text-white">Semua kapster</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-text-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <div className="relative">
            <select className="appearance-none bg-surface border border-border text-text-muted text-xs font-medium rounded-xl pl-3 pr-8 py-1.5 focus:outline-none focus:border-secondary cursor-pointer">
              <option className="bg-surface text-white">Dilewati (0)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-text-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Warning Alert Container */}
      <div className="p-4 rounded-2xl bg-[#1c120c] border border-secondary/20 space-y-3 shadow-md font-outfit">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-secondary font-bold text-xs md:text-sm">
            <AlertTriangle className="w-4 h-4 text-secondary shrink-0" />
            <span>Belum check-in setelah jadwal • Perlu tindakan Admin</span>
          </div>
          <span className="text-[11px] text-text-muted">Admin: dimas@trim.id</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-surface border border-border flex justify-between items-center">
            <div>
              <p className="font-bold text-white text-xs">Rizky Maulana</p>
              <p className="text-[11px] text-text-muted mt-0.5">A-024 • Jadwal 14:00 • Belum check-in</p>
              <p className="text-[11px] text-rose-400 font-semibold mt-1">confirmed • terlambat 30 menit</p>
            </div>
            <button className="px-3 py-1.5 rounded-xl bg-raised border border-border text-xs font-bold text-white hover:bg-border transition-colors flex items-center gap-1 cursor-pointer">
              <SkipForward className="w-3 h-3 text-secondary" /> Skip
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-surface border border-border flex justify-between items-center">
            <div>
              <p className="font-bold text-white text-xs">Fajar Nugroho</p>
              <p className="text-[11px] text-text-muted mt-0.5">A-025 • Jadwal 14:15 • Belum check-in</p>
              <p className="text-[11px] text-rose-400 font-semibold mt-1">confirmed • terlambat 15 menit</p>
            </div>
            <button className="px-3 py-1.5 rounded-xl bg-raised border border-border text-xs font-bold text-white hover:bg-border transition-colors flex items-center gap-1 cursor-pointer">
              <SkipForward className="w-3 h-3 text-secondary" /> Skip
            </button>
          </div>
        </div>

        <p className="text-[11px] text-text-muted">
          Record QUEUES sudah ditautkan 1:1 ke booking. Belum check-in tidak masuk papan aktif. Skip → queue skipped + booking no_show.
        </p>
      </div>

      {/* 3 Columns Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        {/* Kolom 1: Menunggu */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1 font-outfit">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> Menunggu
            </span>
            <span className="text-xs font-bold text-text-muted">5</span>
          </div>

          <div className="space-y-3">
            <QueueCard
              queueNo="A-019"
              timeRange="14:35–15:10"
              customerName="Andi Wijaya"
              serviceDetail="Potong reguler • 35 menit"
              kapsterName="Arief Nugraha"
              statusText="Tunggu 5 menit"
              statusFlowText="waiting / in_queue"
              checkInTime="Check-in 14:20"
              actionText="Mulai cukur →"
            />
            <QueueCard
              queueNo="A-020"
              timeRange="14:45–15:30"
              customerName="Kevin Pratama"
              serviceDetail="Skin fade • 45 menit"
              kapsterName="Raka Putra"
              statusText="Tunggu 15 menit"
              statusFlowText="waiting / in_queue"
              checkInTime="Check-in 14:25"
              actionText="Mulai cukur →"
            />
            <QueueCard
              queueNo="A-021"
              timeRange="15:00–15:35"
              customerName="Rian Hidayat"
              serviceDetail="Potong reguler • 35 menit"
              kapsterName="Dion Mahendra"
              statusText="Tunggu 30 menit"
              statusFlowText="waiting / in_queue"
              checkInTime="Check-in 14:28"
              actionText="Mulai cukur →"
            />
          </div>
        </div>

        {/* Kolom 2: Sedang Cukur */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1 font-outfit">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary"></span> Sedang Cukur
            </span>
            <span className="text-xs font-bold text-text-muted">3</span>
          </div>

          <div className="space-y-3">
            <QueueCard
              queueNo="A-018"
              timeRange="14:00–14:45"
              customerName="Daffa Saputra"
              serviceDetail="Skin fade • 45 menit"
              kapsterName="Raka Putra"
              statusFlowText="Queue / Booking: in_progress / in_service"
              progressMinutes={30}
              totalMinutes={45}
              actionText="Selesaikan →"
            />
            <QueueCard
              queueNo="A-017"
              timeRange="14:05–15:05"
              customerName="Naufal Ramadhan"
              serviceDetail="Potong + beard trim • 60 menit"
              kapsterName="Bima Saputra"
              statusFlowText="Queue / Booking: in_progress / in_service"
              progressMinutes={25}
              totalMinutes={60}
              actionText="Selesaikan →"
            />
          </div>
        </div>

        {/* Kolom 3: Selesai */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1 font-outfit">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Selesai
            </span>
            <span className="text-xs font-bold text-text-muted">18</span>
          </div>

          <div className="space-y-3">
            <QueueCard
              queueNo="A-015"
              timeRange="Selesai 14:00"
              customerName="Rangga Utama"
              serviceDetail="Potong reguler • Rp60.000"
              kapsterName="Bima Saputra"
              statusFlowText="Queue / Booking: completed / completed"
              paymentStatus="paid"
            />
            <QueueCard
              queueNo="A-014"
              timeRange="Selesai 13:30"
              customerName="Bagas Putra"
              serviceDetail="Skin fade • Rp75.000"
              kapsterName="Raka Putra"
              statusFlowText="Queue / Booking: completed / completed"
              paymentStatus="pending"
            />

            <div className="p-4 rounded-2xl bg-surface border border-border space-y-1 font-outfit">
              <p className="text-xs font-bold text-white">+15 pelanggan selesai sebelumnya</p>
              <button className="text-xs font-bold text-secondary hover:underline cursor-pointer">
                Lihat seluruh riwayat →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QueueCard({
  queueNo,
  timeRange,
  customerName,
  serviceDetail,
  kapsterName,
  statusText,
  statusFlowText,
  checkInTime,
  actionText,
  progressMinutes,
  totalMinutes,
  paymentStatus,
}: QueueCardProps) {
  return (
    <div className="p-4 rounded-2xl bg-surface border border-border space-y-3">
      <div className="flex justify-between items-center text-xs font-outfit">
        <span className="font-bold text-secondary">{queueNo}</span>
        <span className="text-text-muted">{timeRange}</span>
      </div>

      <div>
        <p className="font-bold text-white text-sm font-outfit">{customerName}</p>
        <p className="text-xs text-text-muted font-outfit">{serviceDetail}</p>
      </div>

      <div className="p-2 rounded-xl bg-raised text-xs text-text-muted font-outfit flex items-center gap-1.5">
        <span>✂️</span>
        <span className="font-medium text-white">{kapsterName}</span>
      </div>

      {progressMinutes && totalMinutes && (
        <div className="space-y-1">
          <div className="w-full bg-raised h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-secondary h-full rounded-full"
              style={{ width: `${(progressMinutes / totalMinutes) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[11px] text-text-muted font-outfit pt-0.5">
            <span>{progressMinutes} dari {totalMinutes} menit</span>
            {actionText && (
              <button className="text-secondary font-bold hover:underline cursor-pointer">
                {actionText}
              </button>
            )}
          </div>
        </div>
      )}

      {statusFlowText && !progressMinutes && (
        <p className="text-[11px] text-text-muted font-outfit">
          {statusText ? `${statusText} • ${statusFlowText}` : statusFlowText}
        </p>
      )}

      <div className="flex items-center justify-between pt-0.5 text-xs font-outfit">
        {checkInTime && <span className="text-text-muted">{checkInTime}</span>}
        {paymentStatus === 'paid' && (
          <span className="text-emerald-400 font-semibold">Lunas (paid)</span>
        )}
        {paymentStatus === 'pending' && (
          <span className="text-amber-400 font-semibold">Menunggu bayar (pending)</span>
        )}
        {actionText && !progressMinutes && (
          <button className="text-secondary font-bold hover:underline cursor-pointer ml-auto">
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
}