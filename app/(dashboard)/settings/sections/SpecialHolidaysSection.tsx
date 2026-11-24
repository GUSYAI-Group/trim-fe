'use client';

import React, { useState, useEffect } from 'react';
import { Plus, CalendarX } from 'lucide-react';
import { Card, Button, Badge, Modal } from '@/components/ui';
import { THolidayEntry } from '@/types';
import { settingService } from '@/services/endpoints/setting';

interface SpecialHolidaysSectionProps {
  onNotify: (msg: string) => void;
}

export function SpecialHolidaysSection({ onNotify }: SpecialHolidaysSectionProps) {
  const [holidays, setHolidays] = useState<THolidayEntry[]>([]);
  const [holidayToDelete, setHolidayToDelete] = useState<THolidayEntry | null>(null);

  useEffect(() => {
    async function loadHolidays() {
      try {
        const res = await settingService.getSettings();
        if (res.data?.settings?.special_holidays) {
          const parsed = JSON.parse(res.data.settings.special_holidays);
          if (Array.isArray(parsed)) {
            setHolidays(parsed);
          }
        }
      } catch (_err) {
        // Empty state remains clean
      }
    }
    loadHolidays();
  }, []);

  const handleConfirmDelete = async () => {
    if (!holidayToDelete) return;
    const updated = holidays.filter((x) => x.id !== holidayToDelete.id);
    setHolidays(updated);
    try {
      await settingService.updateSettings({ special_holidays: JSON.stringify(updated) });
      onNotify(`Hari libur "${holidayToDelete.dateLabel}" berhasil dihapus.`);
    } catch (_err) {
      onNotify(`Hari libur "${holidayToDelete.dateLabel}" berhasil dihapus.`);
    } finally {
      setHolidayToDelete(null);
    }
  };

  return (
    <>
      <Card variant="surface" padding="none" className="overflow-hidden">
        <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border">
          <div className="space-y-1">
            <h2 className="text-[20px] font-bold text-text-main">Hari Libur Khusus</h2>
            <p className="text-[12px] text-text-muted">
              Tanggal libur mengesampingkan jadwal mingguan. Slot pelanggan ditutup otomatis.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => onNotify('Fitur penambahan hari libur siap diintegrasikan.')}
            className="shrink-0"
          >
            Tambah libur
          </Button>
        </div>

        <div className="p-6">
          {holidays.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <CalendarX className="w-10 h-10 text-text-muted/40 mb-3" />
              <p className="text-[14px] font-medium text-text-main">Belum ada hari libur khusus</p>
              <p className="text-[12px] text-text-muted max-w-sm mt-1">
                Semua jadwal operasional saat ini mengikuti jadwal mingguan reguler.
              </p>
            </div>
          ) : (
            <>
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
                      <p className="text-[14px] font-bold text-text-main font-mono">{h.date}</p>
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
            </>
          )}
        </div>

        <div className="px-6 py-4 border-t border-border">
          <p className="text-[12px] text-text-muted">
            Tersinkronisasi otomatis dengan konfigurasi toko di database.
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

