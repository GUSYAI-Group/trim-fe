import React from 'react';
import { Card } from '@/components/ui';
import { QueueCard } from '../components/QueueCard';

interface QueueKanbanSectionProps {
  selectedKapster: string;
  onCardAction: (msg: string) => void;
}

const WAITING_ITEMS = [
  {
    queueNo: 'A-019',
    timeRange: '14:35–15:10',
    customerName: 'Andi Wijaya',
    serviceDetail: 'Potong reguler • 35 menit',
    kapsterName: 'Arief Nugraha',
    statusText: 'Tunggu 5 menit',
    statusFlowText: 'waiting / in_queue',
    checkInTime: 'Check-in 14:20',
    actionText: 'Mulai cukur →',
  },
  {
    queueNo: 'A-020',
    timeRange: '14:45–15:30',
    customerName: 'Kevin Pratama',
    serviceDetail: 'Skin fade • 45 menit',
    kapsterName: 'Raka Putra',
    statusText: 'Tunggu 15 menit',
    statusFlowText: 'waiting / in_queue',
    checkInTime: 'Check-in 14:25',
    actionText: 'Mulai cukur →',
  },
  {
    queueNo: 'A-021',
    timeRange: '15:00–15:35',
    customerName: 'Rian Hidayat',
    serviceDetail: 'Potong reguler • 35 menit',
    kapsterName: 'Dion Mahendra',
    statusText: 'Tunggu 30 menit',
    statusFlowText: 'waiting / in_queue',
    checkInTime: 'Check-in 14:28',
    actionText: 'Mulai cukur →',
  },
];

const IN_PROGRESS_ITEMS = [
  {
    queueNo: 'A-018',
    timeRange: '14:00–14:45',
    customerName: 'Daffa Saputra',
    serviceDetail: 'Skin fade • 45 menit',
    kapsterName: 'Raka Putra',
    statusFlowText: 'Queue / Booking: in_progress / in_service',
    progressMinutes: 30,
    totalMinutes: 45,
    actionText: 'Selesaikan →',
  },
  {
    queueNo: 'A-017',
    timeRange: '14:05–15:05',
    customerName: 'Naufal Ramadhan',
    serviceDetail: 'Potong + beard trim • 60 menit',
    kapsterName: 'Bima Saputra',
    statusFlowText: 'Queue / Booking: in_progress / in_service',
    progressMinutes: 25,
    totalMinutes: 60,
    actionText: 'Selesaikan →',
  },
];

const DONE_ITEMS = [
  {
    queueNo: 'A-015',
    timeRange: 'Selesai 14:00',
    customerName: 'Rangga Utama',
    serviceDetail: 'Potong reguler • Rp60.000',
    kapsterName: 'Bima Saputra',
    statusFlowText: 'Queue / Booking: completed / completed',
    paymentStatus: 'paid' as const,
  },
  {
    queueNo: 'A-014',
    timeRange: 'Selesai 13:30',
    customerName: 'Bagas Putra',
    serviceDetail: 'Skin fade • Rp75.000',
    kapsterName: 'Raka Putra',
    statusFlowText: 'Queue / Booking: completed / completed',
    paymentStatus: 'pending' as const,
  },
];

export function QueueKanbanSection({ selectedKapster, onCardAction }: QueueKanbanSectionProps) {
  const filterByKapster = <T extends { kapsterName: string }>(items: T[]) =>
    selectedKapster === 'Semua kapster'
      ? items
      : items.filter((item) => item.kapsterName === selectedKapster);

  const waitingFiltered = filterByKapster(WAITING_ITEMS);
  const inProgressFiltered = filterByKapster(IN_PROGRESS_ITEMS);
  const doneFiltered = filterByKapster(DONE_ITEMS);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
      {/* Kolom 1: Menunggu */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <span className="text-xs font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Menunggu
          </span>
          <span className="text-xs font-bold text-text-muted">5</span>
        </div>

        <div className="space-y-3">
          {waitingFiltered.map((item) => (
            <QueueCard
              key={item.queueNo}
              {...item}
              onAction={() => onCardAction(`Antrean ${item.queueNo} (${item.customerName}) dimulai!`)}
            />
          ))}
        </div>
      </div>

      {/* Kolom 2: Sedang Cukur */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <span className="text-xs font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary" /> Sedang Cukur
          </span>
          <span className="text-xs font-bold text-text-muted">3</span>
        </div>

        <div className="space-y-3">
          {inProgressFiltered.map((item) => (
            <QueueCard
              key={item.queueNo}
              {...item}
              onAction={() => onCardAction(`Antrean ${item.queueNo} (${item.customerName}) diselesaikan!`)}
            />
          ))}
        </div>
      </div>

      {/* Kolom 3: Selesai */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <span className="text-xs font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Selesai
          </span>
          <span className="text-xs font-bold text-text-muted">18</span>
        </div>

        <div className="space-y-3">
          {doneFiltered.map((item) => (
            <QueueCard key={item.queueNo} {...item} />
          ))}

          <Card variant="surface" padding="sm" className="space-y-1">
            <p className="text-xs font-bold text-white">+15 pelanggan selesai sebelumnya</p>
            <button
              type="button"
              onClick={() => onCardAction('Menampilkan seluruh riwayat selesai hari ini.')}
              className="text-xs font-bold text-secondary hover:underline cursor-pointer"
            >
              Lihat seluruh riwayat →
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}

