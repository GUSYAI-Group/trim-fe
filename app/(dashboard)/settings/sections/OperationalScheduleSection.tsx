'use client';

import React, { useState } from 'react';
import { Card, Button, Badge } from '@/components/ui';
import { MOCK_SCHEDULE } from '@/utils/mocks/mockData';
import { TDaySchedule } from '@/types';

interface OperationalScheduleSectionProps {
  onNotify: (msg: string) => void;
}

export function OperationalScheduleSection({ onNotify }: OperationalScheduleSectionProps) {
  const [schedule, setSchedule] = useState<TDaySchedule[]>(MOCK_SCHEDULE);
  const [editing, setEditing] = useState(false);

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

  const handleToggleEdit = () => {
    if (editing) {
      onNotify('Jadwal operasional mingguan berhasil disimpan.');
    }
    setEditing((v) => !v);
  };

  return (
    <Card variant="surface" padding="none" className="overflow-hidden">
      <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border">
        <div className="space-y-1">
          <h2 className="text-[20px] font-bold text-white">Jadwal Operasional</h2>
          <p className="text-[13px] text-text-muted">
            Jam buka–tutup per hari. Minggu = tutup rutin.
            {editing && <span className="text-warning"> Rancangan — belum disimpan.</span>}
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={handleToggleEdit} className="shrink-0">
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
                  className={`w-full bg-raised border border-border rounded-lg px-4 py-2.5 text-[14px] font-mono focus:outline-none focus:border-secondary transition-colors ${
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
                  className={`w-full bg-raised border border-border rounded-lg px-4 py-2.5 text-[14px] font-mono focus:outline-none focus:border-secondary transition-colors ${
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

