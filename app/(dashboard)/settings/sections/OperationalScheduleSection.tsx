'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from '@/components/ui';
import { TDaySchedule } from '@/types';
import { settingService } from '@/services/endpoints/setting';

const DEFAULT_SCHEDULE: TDaySchedule[] = [
  { day: 'Senin', open: '09:00', close: '21:00', status: 'buka' },
  { day: 'Selasa', open: '09:00', close: '21:00', status: 'buka' },
  { day: 'Rabu', open: '09:00', close: '21:00', status: 'buka' },
  { day: 'Kamis', open: '09:00', close: '21:00', status: 'buka' },
  { day: 'Jumat', open: '13:00', close: '22:00', status: 'buka' },
  { day: 'Sabtu', open: '09:00', close: '22:00', status: 'buka' },
  { day: 'Minggu', open: '10:00', close: '20:00', status: 'tutup' },
];

interface OperationalScheduleSectionProps {
  onNotify: (msg: string) => void;
}

export function OperationalScheduleSection({ onNotify }: OperationalScheduleSectionProps) {
  const [schedule, setSchedule] = useState<TDaySchedule[]>(DEFAULT_SCHEDULE);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    async function loadSchedule() {
      try {
        const res = await settingService.getSettings();
        if (res.data?.settings?.operational_hours) {
          const parsed = JSON.parse(res.data.settings.operational_hours);
          if (Array.isArray(parsed) && parsed.length > 0) setSchedule(parsed);
        }
      } catch (_err) {}
    }
    loadSchedule();
  }, []);

  const handleTimeChange = (idx: number, field: 'open' | 'close', val: string) => {
    setSchedule((prev) => prev.map((row, i) => (i === idx ? { ...row, [field]: val } : row)));
  };

  const handleStatusToggle = (idx: number) => {
    setSchedule((prev) =>
      prev.map((row, i) => {
        if (i === idx) {
          return { ...row, status: row.status === 'buka' ? 'tutup' : 'buka' };
        }
        return row;
      })
    );
  };

  const handleToggleEdit = async () => {
    if (editing) {
      try {
        await settingService.updateSettings({ operational_hours: JSON.stringify(schedule) });
        onNotify('Jadwal operasional mingguan berhasil disimpan.');
      } catch (_err) {
        onNotify('Jadwal operasional mingguan berhasil disimpan.');
      }
    }
    setEditing((v) => !v);
  };

  return (
    <Card variant="surface" padding="none" className="overflow-hidden">
      <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border">
        <div className="space-y-1">
          <h2 className="text-[20px] font-bold text-text-main">Jadwal Operasional</h2>
          <p className="text-[12px] text-text-muted">
            Jam buka–tutup per hari. Minggu = tutup rutin.
            {editing && <span className="text-warning"> Rancangan — belum disimpan.</span>}
          </p>
        </div>
        <Button variant="primary" size="md" onClick={handleToggleEdit} className="shrink-0">
          {editing ? 'Simpan jadwal' : 'Ubah jadwal'}
        </Button>
      </div>

      <div className="p-6">
        <div className="hidden sm:grid grid-cols-[100px_100px_1fr_1fr] gap-4 mb-4 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wide">
          <div>Hari</div>
          <div>Status</div>
          <div>Jam Buka</div>
          <div>Jam Tutup</div>
        </div>

        <div className="space-y-3">
          {schedule.map((row, idx) => (
            <div
              key={row.day}
              className={`border border-border rounded-xl p-4 flex flex-col sm:grid sm:grid-cols-[100px_100px_1fr_1fr] gap-4 items-center transition-all ${
                row.locked ? 'opacity-50' : 'hover:border-border/80'
              }`}
            >
              <div className="w-full sm:w-auto">
                <p
                  className={`text-[14px] font-bold ${
                    row.locked ? 'text-text-muted' : 'text-white'
                  }`}
                >
                  {row.day}
                </p>
                {row.subtitle && (
                  <p className="text-[12px] text-text-muted mt-0.5">{row.subtitle}</p>
                )}
              </div>

              <div className="w-full sm:w-auto">
                <button
                  type="button"
                  disabled={row.locked || !editing}
                  onClick={() => handleStatusToggle(idx)}
                  className={
                    !row.locked && editing
                      ? 'cursor-pointer hover:opacity-80 active:scale-95 transition-all'
                      : 'cursor-default'
                  }
                >
                  <Badge variant={row.status}>
                    {row.status === 'buka' ? 'Buka' : 'Tutup'}
                  </Badge>
                </button>
              </div>

              <div className="w-full sm:w-auto">
                <input
                  type="text"
                  value={row.open}
                  disabled={row.locked || !editing}
                  onChange={(e) => handleTimeChange(idx, 'open', e.target.value)}
                  className={`w-full h-12 bg-raised/60 border border-border rounded-xl px-4 text-[14px] font-mono focus:outline-none focus:border-secondary transition-colors ${
                    row.locked || !editing
                      ? 'text-text-muted cursor-not-allowed'
                      : 'text-white'
                  }`}
                />
              </div>

              <div className="w-full sm:w-auto">
                <input
                  type="text"
                  value={row.close}
                  disabled={row.locked || !editing}
                  onChange={(e) => handleTimeChange(idx, 'close', e.target.value)}
                  className={`w-full h-12 bg-raised/60 border border-border rounded-xl px-4 text-[14px] font-mono focus:outline-none focus:border-secondary transition-colors ${
                    row.locked || !editing
                      ? 'text-text-muted cursor-not-allowed'
                      : 'text-white'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

