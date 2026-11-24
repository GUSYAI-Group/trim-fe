'use client';

import React, { useState } from 'react';
import { QueueCard, QueueCardProps } from '../components/QueueCard';
import { Scissors, CheckCircle2, Clock, Inbox, RefreshCw } from 'lucide-react';

export interface KanbanItem extends QueueCardProps {
  id?: string;
  customerPhone?: string;
  totalPrice?: number;
}

interface QueueKanbanSectionProps {
  selectedKapster: string;
  searchQuery?: string;
  waitingItems?: KanbanItem[];
  inProgressItems?: KanbanItem[];
  doneItems?: KanbanItem[];
  onStartCut?: (item: KanbanItem) => void;
  onFinishCut?: (item: KanbanItem) => void;
  onRevertToWaiting?: (item: KanbanItem) => void;
  onRevertToProgress?: (item: KanbanItem) => void;
  onDeleteRequest?: (item: KanbanItem) => void;
  onMoveItem?: (itemId: string, targetStatus: 'waiting' | 'in_progress' | 'completed') => void;
  onDetailRequest?: (item: KanbanItem) => void;
  onRefresh?: () => void;
}

export function QueueKanbanSection({
  selectedKapster,
  searchQuery = '',
  waitingItems = [],
  inProgressItems = [],
  doneItems = [],
  onStartCut,
  onFinishCut,
  onRevertToWaiting,
  onRevertToProgress,
  onDeleteRequest,
  onMoveItem,
  onDetailRequest,
  onRefresh,
}: QueueKanbanSectionProps) {
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  const filterItems = (items: KanbanItem[]) => {
    return items.filter((item) => {
      const matchKapster =
        selectedKapster === 'Semua kapster' ||
        item.kapsterName.toLowerCase() === selectedKapster.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.customerName.toLowerCase().includes(q) ||
        item.queueNo.toLowerCase().includes(q) ||
        item.serviceDetail.toLowerCase().includes(q);

      return matchKapster && matchSearch;
    });
  };

  const waitingFiltered = filterItems(waitingItems);
  const inProgressFiltered = filterItems(inProgressItems);
  const doneFiltered = filterItems(doneItems);

  // Drag over handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, colName: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverColumn !== colName) {
      setDragOverColumn(colName);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    // Only clear if leaving the drop container
    const related = e.relatedTarget as Node | null;
    if (!e.currentTarget.contains(related)) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetCol: 'waiting' | 'in_progress' | 'completed') => {
    e.preventDefault();
    setDragOverColumn(null);

    try {
      const dataStr = e.dataTransfer.getData('application/json');
      if (!dataStr) return;
      const data = JSON.parse(dataStr);
      if (data.id && data.columnStatus !== targetCol) {
        onMoveItem?.(data.id, targetCol);
      }
    } catch (_err) {
      // ignore
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* Kolom 1: Menunggu */}
      <div
        onDragOver={(e) => handleDragOver(e, 'waiting')}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, 'waiting')}
        className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col gap-3 min-h-[350px] ${
          dragOverColumn === 'waiting'
            ? 'border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/30'
            : 'border-border/70 bg-surface/40'
        }`}
      >
        <div className="flex justify-between items-center px-1 pb-1 border-b border-border/40">
          <span className="text-[14px] font-bold text-text-main flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <Clock className="w-4 h-4 text-amber-500" />
            Menunggu
          </span>
          <span className="text-[12px] font-bold font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            {waitingFiltered.length}
          </span>
        </div>

        {waitingFiltered.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-border/60 rounded-xl">
            <Inbox className="w-8 h-8 text-text-muted/40 mb-2" />
            <p className="text-[13px] font-semibold text-text-muted">Tidak ada antrean menunggu</p>
            <p className="text-[11px] text-text-muted/70 mt-1 max-w-[200px]">
              Tarik kartu ke sini atau klik Tambah Walk-in di atas.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {waitingFiltered.map((item) => (
              <QueueCard
                key={item.id || item.queueNo}
                {...item}
                columnStatus="waiting"
                actionText="Mulai cukur"
                onAction={() => onStartCut?.(item)}
                onDetailClick={() => onDetailRequest?.(item)}
                onDeleteClick={() => onDeleteRequest?.(item)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Kolom 2: Sedang Cukur */}
      <div
        onDragOver={(e) => handleDragOver(e, 'in_progress')}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, 'in_progress')}
        className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col gap-3 min-h-[350px] ${
          dragOverColumn === 'in_progress'
            ? 'border-secondary bg-secondary/10 ring-2 ring-secondary/30'
            : 'border-border/70 bg-surface/40'
        }`}
      >
        <div className="flex justify-between items-center px-1 pb-1 border-b border-border/40">
          <span className="text-[14px] font-bold text-text-main flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
            <Scissors className="w-4 h-4 text-secondary" />
            Sedang Cukur
          </span>
          <span className="text-[12px] font-bold font-mono px-2 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
            {inProgressFiltered.length}
          </span>
        </div>

        {inProgressFiltered.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-border/60 rounded-xl">
            <Scissors className="w-8 h-8 text-text-muted/40 mb-2" />
            <p className="text-[13px] font-semibold text-text-muted">Kursi kapster sedang kosong</p>
            <p className="text-[11px] text-text-muted/70 mt-1 max-w-[200px]">
              Tarik antrean dari kolom Menunggu untuk memulai proses potong rambut.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {inProgressFiltered.map((item) => (
              <QueueCard
                key={item.id || item.queueNo}
                {...item}
                columnStatus="in_progress"
                actionText="Selesaikan"
                onAction={() => onFinishCut?.(item)}
                secondaryActionText="Kembalikan"
                onSecondaryAction={() => onRevertToWaiting?.(item)}
                onDetailClick={() => onDetailRequest?.(item)}
                onDeleteClick={() => onDeleteRequest?.(item)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Kolom 3: Selesai */}
      <div
        onDragOver={(e) => handleDragOver(e, 'completed')}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, 'completed')}
        className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col gap-3 min-h-[350px] ${
          dragOverColumn === 'completed'
            ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/30'
            : 'border-border/70 bg-surface/40'
        }`}
      >
        <div className="flex justify-between items-center px-1 pb-1 border-b border-border/40">
          <span className="text-[14px] font-bold text-text-main flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Selesai
          </span>
          <span className="text-[12px] font-bold font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {doneFiltered.length}
          </span>
        </div>

        {doneFiltered.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-border/60 rounded-xl">
            <CheckCircle2 className="w-8 h-8 text-text-muted/40 mb-2" />
            <p className="text-[13px] font-semibold text-text-muted">Belum ada layanan selesai</p>
            <p className="text-[11px] text-text-muted/70 mt-1 max-w-[200px]">
              Tarik kartu ke sini setelah kapster selesai memberikan pelayanan.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {doneFiltered.map((item) => (
              <QueueCard
                key={item.id || item.queueNo}
                {...item}
                columnStatus="completed"
                secondaryActionText="Buka kembali"
                onSecondaryAction={() => onRevertToProgress?.(item)}
                onDetailClick={() => onDetailRequest?.(item)}
                onDeleteClick={() => onDeleteRequest?.(item)}
              />
            ))}
          </div>
        )}

        {/* Quick Refresh card */}
        <div className="mt-auto pt-3 border-t border-border/40 flex items-center justify-between text-[12px] text-text-muted">
          <span>Sinkron otomatis live</span>
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              className="text-secondary hover:text-secondary/80 font-semibold flex items-center gap-1.5 cursor-pointer py-1 px-2 rounded-lg hover:bg-raised transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Segarkan</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
