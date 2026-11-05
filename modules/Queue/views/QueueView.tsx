'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, AlertTriangle, SkipForward, X, Check, Clock, User, Scissors, History, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dropdown } from '@/components/ui';

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
  onActionClick?: () => void;
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
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/40 border border-emerald-500/20 text-emerald-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Live • {timeString || '14:30:00 WIB'}</span>
      </span>

      <span className="text-[11px] md:text-xs text-text-muted font-medium">
        {dateString || 'Selasa, 6 Oktober 2026'}
      </span>
    </div>
  );
}

interface WaitingItem {
  queueNo: string;
  timeRange: string;
  customerName: string;
  serviceDetail: string;
  kapsterName: string;
  statusText: string;
  statusFlowText: string;
  checkInTime: string;
}

interface InProgressItem {
  queueNo: string;
  timeRange: string;
  customerName: string;
  serviceDetail: string;
  kapsterName: string;
  statusFlowText: string;
  progressMinutes: number;
  totalMinutes: number;
}

interface CompletedItem {
  queueNo: string;
  timeRange: string;
  customerName: string;
  serviceDetail: string;
  kapsterName: string;
  statusFlowText: string;
  paymentStatus: 'paid' | 'pending';
}

export default function QueueView() {
  const [selectedBarber, setSelectedBarber] = useState('Semua kapster');
  const [selectedSkipStatus, setSelectedSkipStatus] = useState('Dilewati (0)');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Active state for Late Check-ins
  const [lateCheckins, setLateCheckins] = useState([
    { id: 1, name: 'Rizky Maulana', queueNo: 'A-024', time: '14:00', late: '30 menit', kapster: 'Gus Farhan' },
    { id: 2, name: 'Fajar Nugroho', queueNo: 'A-025', time: '14:15', late: '15 menit', kapster: 'Ridho Arman' },
  ]);
  const [skippedCount, setSkippedCount] = useState(0);

  // Active state for columns
  const [waitingList, setWaitingList] = useState<WaitingItem[]>([
    {
      queueNo: 'A-019',
      timeRange: '14:35–15:10',
      customerName: 'Andi Wijaya',
      serviceDetail: 'Potong reguler • 35 menit',
      kapsterName: 'Gus Farhan',
      statusText: 'Tunggu 5 menit',
      statusFlowText: 'waiting / in_queue',
      checkInTime: 'Check-in 14:20',
    },
    {
      queueNo: 'A-020',
      timeRange: '14:45–15:30',
      customerName: 'Kevin Pratama',
      serviceDetail: 'Skin fade • 45 menit',
      kapsterName: 'Lefi Dian',
      statusText: 'Tunggu 15 menit',
      statusFlowText: 'waiting / in_queue',
      checkInTime: 'Check-in 14:25',
    },
    {
      queueNo: 'A-021',
      timeRange: '15:00–15:35',
      customerName: 'Rian Hidayat',
      serviceDetail: 'Potong reguler • 35 menit',
      kapsterName: 'Zidan Alex',
      statusText: 'Tunggu 30 menit',
      statusFlowText: 'waiting / in_queue',
      checkInTime: 'Check-in 14:28',
    },
  ]);

  const [inProgressList, setInProgressList] = useState<InProgressItem[]>([
    {
      queueNo: 'A-018',
      timeRange: '14:00–14:45',
      customerName: 'Daffa Saputra',
      serviceDetail: 'Skin fade • 45 menit',
      kapsterName: 'Ridho Arman',
      statusFlowText: 'Queue / Booking: in_progress / in_service',
      progressMinutes: 30,
      totalMinutes: 45,
    },
    {
      queueNo: 'A-017',
      timeRange: '14:05–15:05',
      customerName: 'Naufal Ramadhan',
      serviceDetail: 'Potong + beard trim • 60 menit',
      kapsterName: 'Gus Farhan',
      statusFlowText: 'Queue / Booking: in_progress / in_service',
      progressMinutes: 25,
      totalMinutes: 60,
    },
  ]);

  const [completedList, setCompletedList] = useState<CompletedItem[]>([
    {
      queueNo: 'A-015',
      timeRange: 'Selesai 14:00',
      customerName: 'Rangga Utama',
      serviceDetail: 'Potong reguler • Rp60.000',
      kapsterName: 'Lefi Dian',
      statusFlowText: 'Queue / Booking: completed / completed',
      paymentStatus: 'paid',
    },
    {
      queueNo: 'A-014',
      timeRange: 'Selesai 13:30',
      customerName: 'Bagas Putra',
      serviceDetail: 'Skin fade • Rp75.000',
      kapsterName: 'Zidan Alex',
      statusFlowText: 'Queue / Booking: completed / completed',
      paymentStatus: 'pending',
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSkip = (id: number, name: string, queueNo: string) => {
    setLateCheckins((prev) => prev.filter((item) => item.id !== id));
    setSkippedCount((prev) => {
      const next = prev + 1;
      setSelectedSkipStatus(`Dilewati (${next})`);
      return next;
    });
    showToast(`Antrean ${queueNo} (${name}) di-skip dan ditandai no_show`);
  };

  const handleStartCut = (queueNo: string) => {
    const target = waitingList.find((w) => w.queueNo === queueNo);
    if (!target) return;

    setWaitingList((prev) => prev.filter((w) => w.queueNo !== queueNo));
    setInProgressList((prev) => [
      {
        queueNo: target.queueNo,
        timeRange: '14:30–15:10',
        customerName: target.customerName,
        serviceDetail: target.serviceDetail,
        kapsterName: target.kapsterName,
        statusFlowText: 'Queue / Booking: in_progress / in_service',
        progressMinutes: 5,
        totalMinutes: 40,
      },
      ...prev,
    ]);
    showToast(`${target.customerName} (${target.queueNo}) mulai dicukur oleh ${target.kapsterName}`);
  };

  const handleFinishCut = (queueNo: string) => {
    const target = inProgressList.find((p) => p.queueNo === queueNo);
    if (!target) return;

    setInProgressList((prev) => prev.filter((p) => p.queueNo !== queueNo));
    setCompletedList((prev) => [
      {
        queueNo: target.queueNo,
        timeRange: 'Selesai Baru Saja',
        customerName: target.customerName,
        serviceDetail: target.serviceDetail,
        kapsterName: target.kapsterName,
        statusFlowText: 'Queue / Booking: completed / completed',
        paymentStatus: 'paid',
      },
      ...prev,
    ]);
    showToast(`Layanan ${target.customerName} (${target.queueNo}) selesai & lunas!`);
  };

  // Filtered lists
  const filterByBarber = <T extends { kapsterName: string }>(items: T[]) => {
    if (selectedBarber === 'Semua kapster') return items;
    return items.filter((item) => item.kapsterName.toLowerCase().includes(selectedBarber.toLowerCase()));
  };

  const filteredWaiting = filterByBarber(waitingList);
  const filteredInProgress = filterByBarber(inProgressList);
  const filteredCompleted = filterByBarber(completedList);

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-outfit">
        <div>
          <h1 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight">
            Monitor Antrean Langsung
          </h1>
          <p className="text-sm md:text-base text-text-muted mt-1 font-outfit">
            {waitingList.length + inProgressList.length + completedList.length + lateCheckins.length} booking • {waitingList.length} menunggu, {inProgressList.length} sedang cukur, {completedList.length + 15} selesai, {lateCheckins.length} confirmed belum check-in.
          </p>
        </div>

        <Link
          href="/queue/form"
          className="bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-secondary/20 transition-all active:scale-95 cursor-pointer self-start sm:self-auto shrink-0 font-outfit"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah walk-in</span>
        </Link>
      </div>

      {/* Live Indicator & Dropdown Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-outfit">
        <LiveHeader />

        <div className="flex items-center gap-3">
          <Dropdown
            value={selectedBarber}
            onChange={setSelectedBarber}
            options={[
              'Semua kapster',
              'Gus Farhan',
              'Lefi Dian',
              'Zidan Alex',
              'Ridho Arman',
            ]}
          />
          <Dropdown
            value={selectedSkipStatus}
            onChange={setSelectedSkipStatus}
            options={[
              `Dilewati (${skippedCount})`,
              'Semua antrean',
            ]}
          />
        </div>
      </div>

      {/* Warning Alert Container */}
      {lateCheckins.length > 0 ? (
        <div className="bg-[#24130A] border-l-4 border-secondary rounded-lg p-5 shadow-md font-outfit space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-secondary font-bold text-[14px]">
              <AlertTriangle className="w-4 h-4 text-secondary shrink-0" />
              <span>Belum check-in setelah jadwal • Perlu tindakan Admin ({lateCheckins.length} pelanggan)</span>
            </div>
            <span className="text-[13px] text-text-muted">Admin: dimas@trim.id</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lateCheckins.map((lc) => (
              <div key={lc.id} className="p-4 rounded-xl bg-surface border border-border flex justify-between items-center">
                <div>
                  <p className="font-bold text-white text-[14px]">{lc.name}</p>
                  <p className="text-[13px] text-text-muted mt-0.5">{lc.queueNo} • Jadwal {lc.time} • Kapster: {lc.kapster}</p>
                  <p className="text-[12px] text-rose-400 font-semibold mt-1">confirmed • terlambat {lc.late}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleSkip(lc.id, lc.name, lc.queueNo)}
                  className="px-4 py-2 rounded-xl bg-raised border border-border text-xs font-bold text-white hover:bg-border transition-colors flex items-center gap-1.5 cursor-pointer font-outfit active:scale-95 hover:border-secondary/40"
                  title="Tandai skip & no_show"
                >
                  <SkipForward className="w-3.5 h-3.5 text-secondary" /> Skip
                </button>
              </div>
            ))}
          </div>

          <p className="text-[13px] text-text-muted leading-relaxed font-outfit">
            Record QUEUES sudah ditautkan 1:1 ke booking. Belum check-in tidak masuk papan aktif. Klik Skip → antrean skipped + status booking no_show.
          </p>
        </div>
      ) : (
        <div className="bg-[#122216] border-l-4 border-emerald-500 rounded-lg p-4 shadow-md font-outfit flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-emerald-400 text-[14px] font-semibold">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Semua pelanggan yang terjadwal telah melakukan check-in tepat waktu ({skippedCount} dilewati).</span>
          </div>
        </div>
      )}

      {/* 3 Columns Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Kolom 1: Menunggu */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1 font-outfit">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> Menunggu
            </span>
            <span className="text-xs font-bold text-text-muted">{filteredWaiting.length}</span>
          </div>

          <div className="space-y-3.5">
            {filteredWaiting.map((item) => (
              <QueueCard
                key={item.queueNo}
                queueNo={item.queueNo}
                timeRange={item.timeRange}
                customerName={item.customerName}
                serviceDetail={item.serviceDetail}
                kapsterName={item.kapsterName}
                statusText={item.statusText}
                statusFlowText={item.statusFlowText}
                checkInTime={item.checkInTime}
                actionText="Mulai cukur →"
                onActionClick={() => handleStartCut(item.queueNo)}
              />
            ))}
            {filteredWaiting.length === 0 && (
              <div className="p-8 rounded-2xl bg-surface/50 border border-border/60 text-center text-text-muted text-[13px] font-outfit">
                Tidak ada antrean menunggu untuk filter ini.
              </div>
            )}
          </div>
        </div>

        {/* Kolom 2: Sedang Cukur */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1 font-outfit">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary"></span> Sedang Cukur
            </span>
            <span className="text-xs font-bold text-text-muted">{filteredInProgress.length}</span>
          </div>

          <div className="space-y-3.5">
            {filteredInProgress.map((item) => (
              <QueueCard
                key={item.queueNo}
                queueNo={item.queueNo}
                timeRange={item.timeRange}
                customerName={item.customerName}
                serviceDetail={item.serviceDetail}
                kapsterName={item.kapsterName}
                statusFlowText={item.statusFlowText}
                progressMinutes={item.progressMinutes}
                totalMinutes={item.totalMinutes}
                actionText="Selesaikan →"
                onActionClick={() => handleFinishCut(item.queueNo)}
              />
            ))}
            {filteredInProgress.length === 0 && (
              <div className="p-8 rounded-2xl bg-surface/50 border border-border/60 text-center text-text-muted text-[13px] font-outfit">
                Tidak ada kapster yang sedang mencukur.
              </div>
            )}
          </div>
        </div>

        {/* Kolom 3: Selesai */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1 font-outfit">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Selesai
            </span>
            <span className="text-xs font-bold text-text-muted">{filteredCompleted.length + 15}</span>
          </div>

          <div className="space-y-3.5">
            {filteredCompleted.map((item) => (
              <QueueCard
                key={item.queueNo}
                queueNo={item.queueNo}
                timeRange={item.timeRange}
                customerName={item.customerName}
                serviceDetail={item.serviceDetail}
                kapsterName={item.kapsterName}
                statusFlowText={item.statusFlowText}
                paymentStatus={item.paymentStatus}
              />
            ))}

            <div className="p-5 rounded-2xl bg-surface border border-border space-y-1.5 font-outfit text-center">
              <p className="text-[14px] font-bold text-white">+15 pelanggan selesai sebelumnya</p>
              <button
                type="button"
                onClick={() => setIsHistoryOpen(true)}
                className="text-[13px] font-bold text-secondary hover:underline cursor-pointer active:scale-95 transition-transform"
              >
                Lihat seluruh riwayat →
              </button>
            </div>
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
              className="relative w-full max-w-2xl bg-[#161616] border border-border rounded-2xl shadow-2xl overflow-hidden font-outfit z-10 max-h-[85vh] flex flex-col"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
                    <History className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Riwayat Antrean Selesai Hari Ini</h3>
                    <p className="text-xs text-text-muted mt-0.5">Daftar transaksi dan pangkas yang telah tuntas</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsHistoryOpen(false)}
                  className="p-2 text-text-muted hover:text-white rounded-lg hover:bg-surface"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-3">
                {[
                  { no: 'A-013', name: 'Dimas Anggara', service: 'Gentlemen Cut', barber: 'Gus Farhan', time: '13:00 - 13:40', price: 'Rp60.000', status: 'Lunas' },
                  { no: 'A-012', name: 'Bayu Wicaksono', service: 'Hair Styling + Wash', barber: 'Lefi Dian', time: '12:20 - 13:00', price: 'Rp70.000', status: 'Lunas' },
                  { no: 'A-011', name: 'Surya Kencana', service: 'Beard Grooming', barber: 'Zidan Alex', time: '11:45 - 12:15', price: 'Rp40.000', status: 'Lunas' },
                  { no: 'A-010', name: 'Fikri Haikal', service: 'Classic Pompadour', barber: 'Ridho Arman', time: '11:00 - 11:40', price: 'Rp65.000', status: 'Lunas' },
                  { no: 'A-009', name: 'Ilham Syahputra', service: 'Buzz Cut + Wash', barber: 'Gus Farhan', time: '10:15 - 10:50', price: 'Rp55.000', status: 'Lunas' },
                  { no: 'A-008', name: 'Hendra Setiawan', service: 'Fade Haircut', barber: 'Lefi Dian', time: '09:30 - 10:10', price: 'Rp60.000', status: 'Lunas' },
                ].map((item) => (
                  <div key={item.no} className="p-4 rounded-xl bg-surface border border-border/80 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-secondary text-sm">{item.no}</span>
                        <span className="font-bold text-white text-sm">• {item.name}</span>
                      </div>
                      <p className="text-xs text-text-muted mt-1">{item.service} • Kapster: {item.barber} • {item.time}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded-full">{item.status}</span>
                      <p className="text-xs font-bold text-white mt-1">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border flex justify-end bg-surface/30">
                <button
                  type="button"
                  onClick={() => setIsHistoryOpen(false)}
                  className="px-5 py-2 rounded-xl bg-raised border border-border text-xs font-bold text-white hover:bg-border transition-colors cursor-pointer"
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
  onActionClick,
}: QueueCardProps) {
  return (
    <div className="p-5 rounded-2xl bg-surface border border-border space-y-3.5 shadow-sm transition-all hover:border-border/80">
      <div className="flex justify-between items-center text-[13px] font-outfit">
        <span className="font-bold text-secondary">{queueNo}</span>
        <span className="text-text-muted">{timeRange}</span>
      </div>

      <div>
        <p className="font-bold text-white text-[15px] font-outfit">{customerName}</p>
        <p className="text-[13px] text-text-muted font-outfit mt-0.5">{serviceDetail}</p>
      </div>

      <div className="px-3.5 py-2 rounded-xl bg-raised text-[13px] text-text-muted font-outfit flex items-center gap-2">
        <span>✂️</span>
        <span className="font-medium text-white">{kapsterName}</span>
      </div>

      {progressMinutes && totalMinutes && (
        <div className="space-y-1.5">
          <div className="w-full bg-raised h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-secondary h-full rounded-full transition-all duration-500"
              style={{ width: `${(progressMinutes / totalMinutes) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[12px] text-text-muted font-outfit pt-0.5">
            <span>{progressMinutes} dari {totalMinutes} menit</span>
            {actionText && (
              <button
                type="button"
                onClick={onActionClick}
                className="text-secondary font-bold hover:underline cursor-pointer active:scale-95 transition-transform"
              >
                {actionText}
              </button>
            )}
          </div>
        </div>
      )}

      {statusFlowText && !progressMinutes && (
        <p className="text-[12px] text-text-muted font-outfit">
          {statusText ? `${statusText} • ${statusFlowText}` : statusFlowText}
        </p>
      )}

      <div className="flex items-center justify-between pt-1 text-[13px] font-outfit">
        {checkInTime && <span className="text-text-muted">{checkInTime}</span>}
        {paymentStatus === 'paid' && (
          <span className="text-emerald-400 font-semibold">Lunas (paid)</span>
        )}
        {paymentStatus === 'pending' && (
          <span className="text-amber-400 font-semibold">Menunggu bayar (pending)</span>
        )}
        {actionText && !progressMinutes && (
          <button
            type="button"
            onClick={onActionClick}
            className="text-secondary font-bold hover:underline cursor-pointer ml-auto active:scale-95 transition-transform"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
}
