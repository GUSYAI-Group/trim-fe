'use client';

import React, { useState } from 'react';
import { Card, Button } from '@/components/ui';
import { Plus, Pencil, Check } from 'lucide-react';

type DayStatus = 'buka' | 'tutup';

interface DaySchedule {
  day: string;
  subtitle?: string;
  status: DayStatus;
  open: string;
  close: string;
  locked?: boolean;
}

interface HolidayEntry {
  id: number;
  date: string;
  dateLabel: string;
  type: 'tanggal-libur' | 'rentang-libur';
  typeLabel: string;
  description: string;
}

interface StoreSetting {
  id: number;
  key: string;
  value: string;
  description: string;
}

const INITIAL_SCHEDULE: DaySchedule[] = [
  { day: 'Senin',  status: 'buka', open: '08:00', close: '18:00' },
  { day: 'Selasa', status: 'buka', open: '08:00', close: '18:00' },
  { day: 'Rabu',   status: 'buka', open: '08:00', close: '18:00' },
  { day: 'Kamis',  status: 'buka', open: '08:00', close: '18:00' },
  { day: 'Jumat',  status: 'buka', open: '08:00', close: '19:00' },
  { day: 'Sabtu',  status: 'buka', open: '09:00', close: '20:00' },
  { day: 'Minggu', subtitle: 'Tutup rutin', status: 'tutup', open: '—', close: '—', locked: true },
];

const INITIAL_HOLIDAYS: HolidayEntry[] = [
  { id: 1, date: '25 Desember 2026', dateLabel: 'Hari Raya Natal',   type: 'tanggal-libur', typeLabel: 'Tanggal libur', description: 'Libur Nasional — Hari Raya Natal' },
  { id: 2, date: '1 Januari 2027',   dateLabel: 'Tahun Baru Masehi', type: 'tanggal-libur', typeLabel: 'Tanggal libur', description: 'Libur Nasional — Tahun Baru Masehi' },
  { id: 3, date: '1–3 Januari 2027', dateLabel: 'Libur tahun baru',  type: 'rentang-libur', typeLabel: 'Rentang libur', description: 'Libur tahun baru — slot pelanggan ditutup selama rentang ini' },
];

const INITIAL_SETTINGS: StoreSetting[] = [
  { id: 1, key: 'is_store_closed', value: 'false',      description: 'Toko buka hari ini' },
  { id: 2, key: 'holiday_date',    value: '2026-12-25', description: 'Libur Nasional — Hari Raya Natal' },
];

function StatusBadge({ status, disabled, onClick }: { status: DayStatus; disabled?: boolean; onClick?: () => void }) {
  const isBuka = status === 'buka';
  const interactiveClasses = !disabled && onClick ? 'cursor-pointer hover:opacity-80 active:scale-95 transition-all' : '';
  
  return (
    <button 
      type="button"
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[13px] font-medium font-outfit ${interactiveClasses} ${isBuka ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isBuka ? 'bg-success' : 'bg-danger'}`} />
      {isBuka ? 'Buka' : 'Tutup'}
    </button>
  );
}

function HolidayTypeBadge({ type, label }: { type: string; label: string }) {
  const isRange = type === 'rentang-libur';
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[13px] font-medium font-outfit ${isRange ? 'bg-warning/10 text-warning' : 'bg-danger/10 text-danger'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isRange ? 'bg-warning' : 'bg-danger'}`} />
      {label}
    </span>
  );
}

function TimeInput({ value, disabled, onChange }: { value: string; disabled?: boolean; onChange?: (v: string) => void }) {
  return (
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
      className={`w-full bg-[#161616] border border-border rounded-lg px-4 py-2.5 text-[14px] font-outfit focus:outline-none focus:border-secondary transition-colors ${
        disabled ? 'text-text-muted cursor-not-allowed' : 'text-white'
      }`}
    />
  );
}

function JadwalOperasional() {
  const [schedule, setSchedule] = useState<DaySchedule[]>(INITIAL_SCHEDULE);
  const [editing, setEditing] = useState(false);

  function handleTimeChange(idx: number, field: 'open' | 'close', val: string) {
    setSchedule((prev) => prev.map((row, i) => (i === idx ? { ...row, [field]: val } : row)));
  }

  function handleStatusToggle(idx: number) {
    setSchedule((prev) => prev.map((row, i) => {
      if (i === idx) {
        return { ...row, status: row.status === 'buka' ? 'tutup' : 'buka' };
      }
      return row;
    }));
  }

  return (
    <Card className="bg-surface border-border p-0! overflow-hidden">
      <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border">
        <div className="space-y-1">
          <h2 className="text-[20px] font-bold text-white font-outfit">Jadwal Operasional</h2>
          <p className="text-[13px] text-text-muted">
            Jam buka–tutup per hari. Minggu = tutup rutin.{editing && <span className="text-warning"> Rancangan — belum disimpan.</span>}
          </p>
        </div>
        <Button variant="primary" className="shrink-0 h-10 px-5 text-[13px] font-bold" onClick={() => setEditing((v) => !v)}>
          {editing ? 'Simpan jadwal' : 'Ubah jadwal'}
        </Button>
      </div>
      
      <div className="p-6">
        {/* Header (hidden on very small screens) */}
        <div className="hidden sm:grid grid-cols-[100px_100px_1fr_1fr] gap-4 mb-4 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wide">
          <div>Hari</div>
          <div>Status</div>
          <div>Jam Buka</div>
          <div>Jam Tutup</div>
        </div>

        {/* Rows */}
        <div className="space-y-3">
          {schedule.map((row, idx) => (
            <div 
              key={row.day} 
              className={`border border-border rounded-xl p-4 flex flex-col sm:grid sm:grid-cols-[100px_100px_1fr_1fr] gap-4 items-center transition-all ${row.locked ? 'opacity-50' : 'hover:border-border/80'}`}
            >
              <div className="w-full sm:w-auto">
                <p className={`text-[14px] font-bold font-outfit ${row.locked ? 'text-text-muted' : 'text-white'}`}>{row.day}</p>
                {row.subtitle && <p className="text-[12px] text-text-muted mt-0.5">{row.subtitle}</p>}
              </div>
              <div className="w-full sm:w-auto">
                <StatusBadge 
                  status={row.status} 
                  disabled={row.locked || !editing} 
                  onClick={() => handleStatusToggle(idx)} 
                />
              </div>
              <div className="w-full sm:w-auto">
                <TimeInput value={row.open} disabled={row.locked || !editing} onChange={(v) => handleTimeChange(idx, 'open', v)} />
              </div>
              <div className="w-full sm:w-auto">
                <TimeInput value={row.close} disabled={row.locked || !editing} onChange={(v) => handleTimeChange(idx, 'close', v)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function HariLiburKhusus() {
  const [holidays, setHolidays] = useState<HolidayEntry[]>(INITIAL_HOLIDAYS);

  return (
    <Card className="bg-surface border-border p-0! overflow-hidden">
      <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border">
        <div className="space-y-1">
          <h2 className="text-[20px] font-bold text-white font-outfit">Hari Libur Khusus</h2>
          <p className="text-[13px] text-text-muted">Tanggal libur mengesampingkan jadwal mingguan. Slot pelanggan ditutup otomatis.</p>
        </div>
        <Button variant="primary" className="shrink-0 h-10 px-5 text-[13px] font-bold gap-2">
          <Plus className="w-3.5 h-3.5" />
          Tambah libur
        </Button>
      </div>

      <div className="p-6">
        {/* Header (hidden on very small screens) */}
        <div className="hidden sm:grid grid-cols-[1fr_120px_1.5fr_auto] gap-4 mb-4 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wide">
          <div>Tanggal</div>
          <div>Jenis</div>
          <div>Keterangan</div>
          <div className="text-right">Aksi</div>
        </div>

        {/* Rows */}
        <div className="space-y-3">
          {holidays.map((h) => (
            <div 
              key={h.id} 
              className="border border-border rounded-xl p-4 flex flex-col sm:grid sm:grid-cols-[1fr_120px_1.5fr_auto] gap-4 sm:items-center hover:border-border/80 transition-all"
            >
              <div className="w-full sm:w-auto">
                <p className="text-[14px] font-bold text-white font-outfit">{h.date}</p>
                <p className="text-[12px] text-text-muted mt-0.5">{h.dateLabel}</p>
              </div>
              <div className="w-full sm:w-auto">
                <HolidayTypeBadge type={h.type} label={h.typeLabel} />
              </div>
              <div className="w-full sm:w-auto text-[14px] text-text-main">
                {h.description}
              </div>
              <div className="w-full sm:w-auto flex items-center justify-end gap-4 mt-2 sm:mt-0">
                <button className="text-[13px] font-bold text-text-muted hover:text-white transition-colors bg-[#1A1A1A] border border-border px-4 py-2 rounded-lg">Edit</button>
                <button onClick={() => setHolidays((prev) => prev.filter((x) => x.id !== h.id))} className="text-[13px] font-bold text-danger hover:brightness-125 transition-all bg-[#241315] border border-danger/20 px-4 py-2 rounded-lg">Hapus</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="px-6 py-4 border-t border-border">
        <p className="text-[12px] text-text-muted">Contoh di atas adalah rancangan dan belum disimpan ke STORE_SETTINGS.</p>
      </div>
    </Card>
  );
}

function KonfigurasiLanjutan() {
  const [settings, setSettings] = useState<StoreSetting[]>(INITIAL_SETTINGS);
  const [selected, setSelected] = useState<StoreSetting>({ ...INITIAL_SETTINGS[1] });

  function handleFieldChange(field: keyof Omit<StoreSetting, 'id'>, value: string) {
    setSelected((prev) => ({ ...prev, [field]: value }));
  }

  function handleSave() {
    setSettings((prev) => prev.map((s) => (s.id === selected.id ? { ...selected } : s)));
  }

  return (
    <Card className="bg-surface border-border p-0! overflow-hidden">
      <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border">
        <div className="space-y-1">
          <h2 className="text-[20px] font-bold text-white font-outfit">Konfigurasi Lanjutan</h2>
          <p className="text-[13px] text-text-muted">Nilai aktif di STORE_SETTINGS. Perubahan tersimpan 6 Okt 2026 14:28 WIB.</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-success bg-success/10 px-3 py-1.5 rounded-lg self-start">
          <Check className="w-3.5 h-3.5" />
          Tersimpan
        </span>
      </div>
      <div className="p-6 flex flex-col lg:flex-row gap-6">
        <div className="flex-1 overflow-x-auto border border-border rounded-xl bg-raised/5">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#222225] border-b border-border">
                <th className="py-3 px-6 text-[12px] font-medium text-text-muted uppercase tracking-wide w-14">ID</th>
                <th className="py-3 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wide">Setting Key</th>
                <th className="py-3 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wide">Value</th>
                <th className="py-3 px-4 pr-6 text-[12px] font-medium text-text-muted uppercase tracking-wide">Description</th>
              </tr>
            </thead>
            <tbody>
              {settings.map((s) => {
                const isActive = selected.id === s.id;
                return (
                  <tr key={s.id} onClick={() => setSelected({ ...s })} className={`border-b border-border cursor-pointer transition-colors ${isActive ? 'bg-secondary/5' : 'hover:bg-raised/30'}`}>
                    <td className={`py-4 px-6 text-[13px] font-outfit text-text-muted ${isActive ? 'border-l-2 border-l-secondary' : ''}`}>{s.id}</td>
                    <td className="py-4 px-4 text-[13px] font-medium text-white font-outfit">{s.key}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-md text-[12px] font-medium font-outfit ${s.value === 'false' || s.value === 'true' ? 'bg-success/10 text-success' : 'bg-raised border border-border text-white'}`}>{s.value}</span>
                    </td>
                    <td className="py-4 px-4 pr-6 text-[13px] text-text-muted">{s.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="lg:w-80 xl:w-96 shrink-0 p-6 space-y-5 border border-border rounded-xl bg-raised/5">
          <h3 className="text-[15px] font-bold text-white font-outfit">Edit entri</h3>
          <div className="space-y-2">
            <label className="text-[12px] text-text-muted font-outfit">setting_key</label>
            <input type="text" value={selected.key} readOnly className="w-full bg-raised border border-border rounded-lg px-4 py-3 text-[13px] text-text-muted focus:outline-none font-outfit cursor-not-allowed" />
          </div>
          <div className="space-y-2">
            <label className="text-[12px] text-text-muted font-outfit">setting_value</label>
            <input type="text" value={selected.value} onChange={(e) => handleFieldChange('value', e.target.value)} className="w-full bg-raised border border-border rounded-lg px-4 py-3 text-[14px] text-white focus:outline-none focus:border-secondary transition-colors font-outfit" />
          </div>
          <div className="space-y-2">
            <label className="text-[12px] text-text-muted font-outfit">description</label>
            <input type="text" value={selected.description} onChange={(e) => handleFieldChange('description', e.target.value)} className="w-full bg-raised border border-border rounded-lg px-4 py-3 text-[14px] text-white focus:outline-none focus:border-secondary transition-colors font-outfit" />
          </div>
          <div className="space-y-2">
            <label className="text-[12px] text-text-muted font-outfit">updated_at (sistem)</label>
            <p className="text-[13px] text-text-muted px-1 py-2 font-outfit">6 Okt 2026 14:28 WIB</p>
          </div>
          <Button variant="primary" className="w-full font-bold" onClick={handleSave}>Simpan perubahan</Button>
          <p className="text-[11px] text-text-muted font-outfit">Konvensi nilai: holiday_date memakai format YYYY-MM-DD.</p>
        </div>
      </div>
    </Card>
  );
}

export function SettingsView() {
  return (
    <div className="space-y-8 pb-24 font-space-grotesk relative min-h-screen">
      <header className="space-y-2">
        <h1 className="text-[28px] font-extrabold text-white tracking-tight font-outfit">Pengaturan Toko</h1>
        <p className="text-text-muted">Kelola jam operasional, hari libur, dan konfigurasi TRIM Bandung.</p>
      </header>
      <JadwalOperasional />
      <HariLiburKhusus />
      <KonfigurasiLanjutan />
    </div>
  );
}