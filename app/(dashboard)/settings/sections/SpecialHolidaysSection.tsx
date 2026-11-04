'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Card, Button, Badge, Modal } from '@/components/ui';
import { MOCK_HOLIDAYS } from '@/utils/mocks/mockData';
import { THolidayEntry } from '@/types';

interface SpecialHolidaysSectionProps {
  onNotify: (msg: string) => void;
}

export function SpecialHolidaysSection({ onNotify }: SpecialHolidaysSectionProps) {
  const [holidays, setHolidays] = useState<THolidayEntry[]>(MOCK_HOLIDAYS);
  const [holidayToDelete, setHolidayToDelete] = useState<THolidayEntry | null>(null);

  const handleConfirmDelete = () => {
    if (!holidayToDelete) return;
    setHolidays((prev) => prev.filter((x) => x.id !== holidayToDelete.id));
    onNotify(`Hari libur "${holidayToDelete.dateLabel}" berhasil dihapus.`);
    setHolidayToDelete(null);
  };

  return (
    <>
      <Card variant="surface" padding="none" className="overflow-hidden">
        <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border">
          <div className="space-y-1">
            <h2 className="text-[20px] font-bold text-white">Hari Libur Khusus</h2>
            <p className="text-[13px] text-text-muted">
              Tanggal libur mengesampingkan jadwal mingguan. Slot pelanggan ditutup otomatis.
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            onClick={() => onNotify('Form tambah hari libur khusus siap diisi.')}
            className="shrink-0"
          >
            Tambah libur
          </Button>
        </div>

        <div className="p-6">
          <div className="hidden sm:grid grid-cols-[1fr_140px_1.5fr_auto] gap-4 mb-4 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wide">
            <div>Tanggal</div>
            <div>Jenis</div>
            <div>Keterangan</div>
            <div className="text-right">Aksi</div>
          </div>

          <div className="space-y-3">
            {holidays.map((h) => (
              <div
                key={h.id}
                className="border border-border rounded-xl p-4 flex flex-col sm:grid sm:grid-cols-[1fr_140px_1.5fr_auto] gap-4 sm:items-center hover:border-border/80 transition-all"
              >
                <div className="w-full sm:w-auto">
                  <p className="text-[14px] font-bold text-white">{h.date}</p>
                  <p className="text-[12px] text-text-muted mt-0.5">{h.dateLabel}</p>
                </div>
                <div className="w-full sm:w-auto">
                  <Badge variant={h.type === 'rentang-libur' ? 'warning' : 'danger'}>
                    {h.typeLabel}
                  </Badge>
                </div>
                <div className="w-full sm:w-auto text-[14px] text-text-main">
                  {h.description}
                </div>
                <div className="w-full sm:w-auto flex items-center justify-end gap-3 mt-2 sm:mt-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onNotify(`Mengedit jadwal libur: ${h.dateLabel}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setHolidayToDelete(h)}
                  >
                    Hapus
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-border">
          <p className="text-[12px] text-text-muted">
            Contoh di atas adalah rancangan dan belum disimpan ke STORE_SETTINGS.
          </p>
        </div>
      </Card>

      <Modal
        isOpen={Boolean(holidayToDelete)}
        onClose={() => setHolidayToDelete(null)}
        title="Hapus Hari Libur Khusus"
        description={`Apakah Anda yakin ingin menghapus hari libur "${holidayToDelete?.dateLabel ?? ''}" (${holidayToDelete?.date ?? ''})?`}
        variant="destructive"
        confirmText="Ya, Hapus"
        cancelText="Batal"
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

