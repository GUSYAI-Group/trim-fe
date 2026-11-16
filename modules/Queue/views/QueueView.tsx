'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  AlertTriangle,
  SkipForward,
  X,
  Check,
  Clock,
  User,
  Scissors,
  History,
  CheckCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dropdown } from '@/components/ui';
import { useTrimStore } from '@/store/useTrimStore';

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
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/40 border border-emerald-500/20 text-emerald-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>Live • {timeString || '14:30:00 WIB'}</span>
      </span>

      <span className="text-[11px] md:text-xs text-text-muted font-medium">
        {dateString || 'Hari ini'}
      </span>
    </div>
  );
}

export default function QueueView() {
  const kapsters = useTrimStore((s) => s.kapsters);
  const waitingList = useTrimStore((s) => s.waitingList);
  const inProgressList = useTrimStore((s) => s.inProgressList);
  const completedList = useTrimStore((s) => s.completedList);
  const lateCheckins = useTrimStore((s) => s.lateCheckins);
  const skippedCount = useTrimStore((s) => s.skippedCount);

  const startQueueCut = useTrimStore((s) => s.startQueueCut);
  const finishQueueCut = useTrimStore((s) => s.finishQueueCut);
  const skipLateCheckin = useTrimStore((s) => s.skipLateCheckin);

  const [selectedBarber, setSelectedBarber] = useState('Semua kapster');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSkip = (id: number, name: string, queueNo: string) => {
    skipLateCheckin(id);
    showToast(`Antrean ${queueNo} (${name}) di-skip dan ditandai no_show`);
  };

  const handleStart = (queueNo: string, customerName: string, kapsterName: string) => {
    startQueueCut(queueNo);
    showToast(`${customerName} (${queueNo}) mulai dicukur oleh ${kapsterName}`);
  };

  const handleFinish = (queueNo: string, customerName: string) => {
    finishQueueCut(queueNo);
    showToast(`Layanan ${customerName} (${queueNo}) selesai & tercatat lunas!`);
  };

  // Filtered lists
  const filterByBarber = <T extends { kapsterName: string }>(items: T[]) => {
    if (selectedBarber === 'Semua kapster') return items;
    return items.filter((item) =>
      item.kapsterName.toLowerCase().includes(selectedBarber.toLowerCase())
    );
  };

  const filteredWaiting = filterByBarber(waitingList);
  const filteredInProgress = filterByBarber(inProgressList);
  const filteredCompleted = filterByBarber(completedList);

  const barberOptions = ['Semua kapster', ...kapsters.map((k) => k.name)];

  return (
    <div className="space-y-6 text-white font-space-grotesk no-scrollbar selection:bg-secondary selection:text-white pb-16">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#1E1E22] border border-secondary/40 shadow-2xl shadow-secondary/20 font-outfit text-[14px] text-white"
          >
            <div className="w-2 h-2 rounded-full bg-secondary animate-ping" />
            <span className="font-semibold">{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="ml-2 text-text-muted hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight font-outfit">
              Monitor Antrean
            </h1>
            <LiveHeader />
          </div>
          <p className="text-sm md:text-base text-text-muted mt-1 font-outfit">
            Pantau dan kelola antrean langsung pelanggan hari ini di TRIM Bandung.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsHistoryOpen(true)}
            className="p-2.5 rounded-xl bg-surface border border-border text-text-muted hover:text-white hover:bg-raised transition-colors flex items-center gap-2 text-xs font-bold font-outfit cursor-pointer"
          >
            <History className="w-4 h-4" />
            <span>Riwayat Selesai ({completedList.length})</span>
          </button>
          <Link
            href="/queue/form"
            className="bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold font-outfit flex items-center justify-center gap-2 shadow-lg shadow-secondary/20 transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Antrean</span>
          </Link>
        </div>
      </div>

      {/* Late Check-in Alert Section */}
      {lateCheckins.length > 0 && (
        <div className="bg-[#24130A] border-l-4 border-amber-500 rounded-lg p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-outfit shadow-md">
          <div className="flex items-start gap-3.5">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[14px] font-bold text-amber-400">
                Peringatan: {lateCheckins.length} Pelanggan Terlambat Check-in
              </h4>
              <p className="text-[13px] text-text-muted mt-0.5">
                Pelanggan telah melewati jadwal booking. Anda dapat melewati antrean jika pelanggan tidak hadir.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {lateCheckins.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 p-2 px-3 rounded-xl bg-surface border border-border text-xs"
              >
                <div>
                  <span className="font-bold text-white">{item.queueNo}</span>{' '}
                  <span className="text-text-muted">({item.name})</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleSkip(item.id, item.name, item.queueNo)}
                  className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 font-bold hover:bg-amber-500/30 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <SkipForward className="w-3 h-3" />
                  Lewati
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-3 font-outfit text-sm">
          <span className="text-text-muted">Filter Kapster:</span>
          <Dropdown
            value={selectedBarber}
            onChange={setSelectedBarber}
            options={barberOptions}
          />
        </div>

        <div className="flex items-center gap-4 text-xs text-text-muted font-outfit">
          <span>
            Total Menunggu:{' '}
            <strong className="text-white">{filteredWaiting.length}</strong>
          </span>
          <span>•</span>
          <span>
            Sedang Dilayani:{' '}
            <strong className="text-white">{filteredInProgress.length}</strong>
          </span>
          <span>•</span>
          <span>
            Dilewati: <strong className="text-amber-400">{skippedCount}</strong>
          </span>
        </div>
      </div>

      {/* Kanban Board 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-outfit">
        {/* Kolom 1: Menunggu */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-surface border border-border">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>Menunggu ({filteredWaiting.length})</span>
            </div>
            <span className="text-xs text-text-muted">in_queue</span>
          </div>

          <div className="space-y-3">
            {filteredWaiting.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-surface/50 border border-border/60 text-xs text-text-muted">
                Tidak ada antrean yang sedang menunggu.
              </div>
            ) : (
              filteredWaiting.map((item) => (
                <div
                  key={item.queueNo}
                  className="p-5 rounded-2xl bg-surface border border-border hover:border-secondary/50 transition-all space-y-4 shadow-sm"
                >
                  <div className="flex items-center justify-between border-b border-border/50 pb-3">
                    <span className="text-base font-extrabold text-secondary">
                      {item.queueNo}
                    </span>
                    <span className="text-xs text-text-muted font-medium">
                      {item.timeRange}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-white text-sm">{item.customerName}</h3>
                    <p className="text-xs text-text-muted">{item.serviceDetail}</p>
                    <div className="flex items-center gap-1.5 text-xs text-secondary font-medium pt-1">
                      <Scissors className="w-3.5 h-3.5" />
                      <span>{item.kapsterName}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <span className="text-[11px] text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/20">
                      {item.checkInTime}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleStart(item.queueNo, item.customerName, item.kapsterName)}
                      className="px-3.5 py-1.5 rounded-xl bg-secondary text-white font-bold text-xs hover:bg-secondary/90 transition-all active:scale-95 shadow-md shadow-secondary/20 cursor-pointer"
                    >
                      Mulai Cukur
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Kolom 2: Sedang Dilayani */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-surface border border-border">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
              <span>Sedang Dilayani ({filteredInProgress.length})</span>
            </div>
            <span className="text-xs text-text-muted">in_progress</span>
          </div>

          <div className="space-y-3">
            {filteredInProgress.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-surface/50 border border-border/60 text-xs text-text-muted">
                Tidak ada pemotongan yang sedang berlangsung.
              </div>
            ) : (
              filteredInProgress.map((item) => {
                const percent = Math.min(
                  100,
                  Math.round((item.progressMinutes / item.totalMinutes) * 100)
                );
                return (
                  <div
                    key={item.queueNo}
                    className="p-5 rounded-2xl bg-surface border border-secondary/40 space-y-4 shadow-md shadow-secondary/5"
                  >
                    <div className="flex items-center justify-between border-b border-border/50 pb-3">
                      <span className="text-base font-extrabold text-secondary">
                        {item.queueNo}
                      </span>
                      <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 animate-spin" />
                        {item.progressMinutes}/{item.totalMinutes} mnt
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-bold text-white text-sm">{item.customerName}</h3>
                      <p className="text-xs text-text-muted">{item.serviceDetail}</p>
                      <div className="flex items-center gap-1.5 text-xs text-secondary font-medium pt-1">
                        <Scissors className="w-3.5 h-3.5" />
                        <span>{item.kapsterName}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="w-full h-2 rounded-full bg-raised overflow-hidden">
                        <div
                          className="h-full bg-secondary rounded-full transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-text-muted">
                        <span>Pengerjaan</span>
                        <span>{percent}%</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border/50 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleFinish(item.queueNo, item.customerName)}
                        className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all active:scale-95 shadow-md shadow-emerald-600/20 cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Tandai Selesai
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Kolom 3: Selesai Hari Ini */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-surface border border-border">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Selesai ({filteredCompleted.length})</span>
            </div>
            <span className="text-xs text-text-muted">completed</span>
          </div>

          <div className="space-y-3">
            {filteredCompleted.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-surface/50 border border-border/60 text-xs text-text-muted">
                Belum ada antrean selesai hari ini.
              </div>
            ) : (
              filteredCompleted.slice(0, 5).map((item) => (
                <div
                  key={item.queueNo}
                  className="p-4 rounded-2xl bg-surface/60 border border-border space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-white text-sm">{item.queueNo}</span>
                    <span className="text-emerald-400 font-bold">{item.timeRange}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{item.customerName}</h4>
                    <p className="text-text-muted mt-0.5">{item.serviceDetail}</p>
                    <p className="text-[11px] text-text-muted mt-1">Kapster: {item.kapsterName}</p>
                  </div>
                  <div className="pt-2 border-t border-border/50 flex items-center justify-between">
                    <span className="text-emerald-400 font-medium">✓ Pembayaran Lunas</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* History Modal */}
      <AnimatePresence>
        {isHistoryOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHistoryOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-[#161616] border border-border rounded-2xl shadow-2xl overflow-hidden font-outfit z-10 p-6 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
                    <History className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Riwayat Antrean Selesai</h3>
                    <p className="text-xs text-text-muted">Total: {completedList.length} layanan dituntaskan</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsHistoryOpen(false)}
                  className="p-2 text-text-muted hover:text-white rounded-lg hover:bg-surface cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto space-y-2 pr-1 no-scrollbar">
                {completedList.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-surface border border-border flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-secondary text-sm mr-2">{item.queueNo}</span>
                      <span className="font-bold text-white">{item.customerName}</span>
                      <p className="text-text-muted mt-0.5">
                        {item.serviceDetail} • {item.kapsterName}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-emerald-400 font-bold block">{item.timeRange}</span>
                      <span className="text-[11px] text-text-muted">Lunas</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-border flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsHistoryOpen(false)}
                  className="px-5 py-2 rounded-xl bg-surface border border-border text-xs font-bold text-white hover:bg-raised"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
