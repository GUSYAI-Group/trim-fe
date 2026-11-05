'use client';

import React, { useState } from 'react';
import { Plus, Check, X, Calendar, Edit2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[13px] font-medium font-outfit ${interactiveClasses} ${isBuka ? 'bg-emerald-950/40 border border-emerald-500/20 text-emerald-400' : 'bg-rose-950/40 border border-rose-500/20 text-rose-400'}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isBuka ? 'bg-emerald-400' : 'bg-rose-400'}`} />
      {isBuka ? 'Buka' : 'Tutup'}
    </button>
  );
}

function HolidayTypeBadge({ type, label }: { type: string; label: string }) {
  const isRange = type === 'rentang-libur';
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[13px] font-medium font-outfit ${isRange ? 'bg-amber-950/40 border border-amber-500/20 text-amber-400' : 'bg-rose-950/40 border border-rose-500/20 text-rose-400'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isRange ? 'bg-amber-400' : 'bg-rose-400'}`} />
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
      className={`w-full bg-[#161616] border border-border rounded-xl px-4 py-2 text-[14px] font-outfit focus:outline-none focus:border-secondary transition-colors ${
        disabled ? 'text-text-muted cursor-not-allowed' : 'text-white'
      }`}
    />
  );
}

function JadwalOperasional({ onNotify }: { onNotify: (msg: string) => void }) {
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

  function handleToggleEdit() {
    if (editing) {
      // Save
      setEditing(false);
      onNotify('Jadwal operasional mingguan berhasil disimpan ke sistem TRIM!');
    } else {
      setEditing(true);
    }
  }

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-md">
      <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border">
        <div>
          <h2 className="text-lg md:text-[20px] font-bold text-white font-outfit">Jadwal Operasional</h2>
          <p className="text-sm text-text-muted mt-1 font-outfit">
            Jam buka–tutup per hari. Minggu = tutup rutin.{editing && <span className="text-amber-400 font-semibold"> (Mode Pengeditan Aktif — klik Buka/Tutup atau sesuaikan jam)</span>}
          </p>
        </div>
        <button
          onClick={handleToggleEdit}
          className="bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold font-outfit flex items-center justify-center gap-2 shadow-lg shadow-secondary/20 transition-all active:scale-95 cursor-pointer self-start sm:self-auto shrink-0"
        >
          {editing ? 'Simpan jadwal' : 'Ubah jadwal'}
        </button>
      </div>
      
      <div className="p-6">
        {/* Header */}
        <div className="hidden sm:grid grid-cols-[120px_120px_1fr_1fr] gap-4 mb-4 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">
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
              className={`border border-border rounded-xl p-4 flex flex-col sm:grid sm:grid-cols-[120px_120px_1fr_1fr] gap-4 items-center transition-all bg-raised/10 ${row.locked ? 'opacity-50' : 'hover:border-border/80'}`}
            >
              <div className="w-full sm:w-auto">
                <p className={`text-[15px] font-bold font-outfit ${row.locked ? 'text-text-muted' : 'text-white'}`}>{row.day}</p>
                {row.subtitle && <p className="text-[12px] text-text-muted mt-0.5 font-outfit">{row.subtitle}</p>}
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
    </div>
  );
}

function HariLiburKhusus({ onNotify }: { onNotify: (msg: string) => void }) {
  const [holidays, setHolidays] = useState<HolidayEntry[]>(INITIAL_HOLIDAYS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<HolidayEntry | null>(null);

  // Form State
  const [formDate, setFormDate] = useState('');
  const [formLabel, setFormLabel] = useState('');
  const [formType, setFormType] = useState<'tanggal-libur' | 'rentang-libur'>('tanggal-libur');
  const [formDesc, setFormDesc] = useState('');

  const openAddModal = () => {
    setEditingItem(null);
    setFormDate('');
    setFormLabel('');
    setFormType('tanggal-libur');
    setFormDesc('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: HolidayEntry) => {
    setEditingItem(item);
    setFormDate(item.date);
    setFormLabel(item.dateLabel);
    setFormType(item.type);
    setFormDesc(item.description);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formDate.trim() || !formLabel.trim()) return;

    if (editingItem) {
      setHolidays((prev) =>
        prev.map((h) =>
          h.id === editingItem.id
            ? {
                ...h,
                date: formDate,
                dateLabel: formLabel,
                type: formType,
                typeLabel: formType === 'rentang-libur' ? 'Rentang libur' : 'Tanggal libur',
                description: formDesc || formLabel,
              }
            : h
        )
      );
      onNotify(`Hari libur "${formLabel}" berhasil diperbarui!`);
    } else {
      const newEntry: HolidayEntry = {
        id: Date.now(),
        date: formDate,
        dateLabel: formLabel,
        type: formType,
        typeLabel: formType === 'rentang-libur' ? 'Rentang libur' : 'Tanggal libur',
        description: formDesc || formLabel,
      };
      setHolidays((prev) => [newEntry, ...prev]);
      onNotify(`Hari libur baru "${formLabel}" berhasil ditambahkan!`);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: number, label: string) => {
    setHolidays((prev) => prev.filter((x) => x.id !== id));
    onNotify(`Hari libur "${label}" berhasil dihapus.`);
  };

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-md">
      <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border">
        <div>
          <h2 className="text-lg md:text-[20px] font-bold text-white font-outfit">Hari Libur Khusus</h2>
          <p className="text-sm text-text-muted mt-1 font-outfit">Tanggal libur mengesampingkan jadwal mingguan. Slot pelanggan ditutup otomatis.</p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold font-outfit flex items-center justify-center gap-2 shadow-lg shadow-secondary/20 transition-all active:scale-95 cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah libur</span>
        </button>
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="hidden sm:grid grid-cols-[1fr_120px_1.5fr_auto] gap-4 mb-4 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">
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
              className="border border-border rounded-xl p-4 flex flex-col sm:grid sm:grid-cols-[1fr_120px_1.5fr_auto] gap-4 sm:items-center hover:border-border/80 transition-all bg-raised/10"
            >
              <div className="w-full sm:w-auto">
                <p className="text-[15px] font-bold text-white font-outfit">{h.date}</p>
                <p className="text-[12px] text-text-muted mt-0.5 font-outfit">{h.dateLabel}</p>
              </div>
              <div className="w-full sm:w-auto">
                <HolidayTypeBadge type={h.type} label={h.typeLabel} />
              </div>
              <div className="w-full sm:w-auto text-[14px] text-text-main font-outfit">
                {h.description}
              </div>
              <div className="w-full sm:w-auto flex items-center justify-end gap-3 mt-2 sm:mt-0">
                <button
                  type="button"
                  onClick={() => openEditModal(h)}
                  className="text-[13px] font-bold text-text-muted hover:text-white transition-colors bg-surface border border-border px-4 py-2 rounded-xl font-outfit cursor-pointer active:scale-95"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(h.id, h.dateLabel)}
                  className="text-[13px] font-bold text-rose-400 hover:brightness-125 transition-all bg-rose-950/20 border border-rose-500/20 px-4 py-2 rounded-xl font-outfit cursor-pointer active:scale-95"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
          {holidays.length === 0 && (
            <div className="p-8 text-center text-text-muted text-[14px] font-outfit border border-dashed border-border rounded-xl">
              Belum ada hari libur khusus yang ditambahkan.
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4 md:px-6 border-t border-border">
        <p className="text-[13px] text-text-muted font-outfit">Data hari libur langsung tersimpan di STORE_SETTINGS dan disinkronkan ke kalender pemesanan.</p>
      </div>

      {/* Add / Edit Holiday Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-[#161616] border border-border rounded-2xl shadow-2xl overflow-hidden font-outfit z-10 p-6 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {editingItem ? 'Edit Hari Libur Khusus' : 'Tambah Hari Libur Khusus'}
                    </h3>
                    <p className="text-xs text-text-muted">Atur tanggal penutupan slot pelanggan</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-text-muted hover:text-white rounded-lg hover:bg-surface cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-text-muted font-medium">Tanggal / Rentang Tanggal</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 17 Agustus 2027 atau 1–3 Januari 2027"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-secondary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-text-muted font-medium">Nama Hari Libur</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Hari Kemerdekaan RI"
                    value={formLabel}
                    onChange={(e) => setFormLabel(e.target.value)}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-secondary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-text-muted font-medium">Jenis Libur</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormType('tanggal-libur')}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                        formType === 'tanggal-libur'
                          ? 'bg-rose-950/30 border-rose-500/50 text-rose-400'
                          : 'bg-surface border-border text-text-muted hover:text-white'
                      }`}
                    >
                      Tanggal Libur (1 Hari)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormType('rentang-libur')}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                        formType === 'rentang-libur'
                          ? 'bg-amber-950/30 border-amber-500/50 text-amber-400'
                          : 'bg-surface border-border text-text-muted hover:text-white'
                      }`}
                    >
                      Rentang Libur (Beberapa Hari)
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-text-muted font-medium">Keterangan / Deskripsi</label>
                  <input
                    type="text"
                    placeholder="Contoh: Libur Nasional — slot antrean ditutup"
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-secondary"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-surface border border-border text-xs font-bold text-white hover:bg-raised cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-secondary text-white text-xs font-bold hover:bg-secondary/90 transition-all active:scale-95 shadow-md shadow-secondary/20 cursor-pointer"
                  >
                    {editingItem ? 'Simpan Perubahan' : 'Tambahkan Libur'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function KonfigurasiLanjutan({ onNotify }: { onNotify: (msg: string) => void }) {
  const [settings, setSettings] = useState<StoreSetting[]>(INITIAL_SETTINGS);
  const [selected, setSelected] = useState<StoreSetting>({ ...INITIAL_SETTINGS[1] });
  const [lastSaved, setLastSaved] = useState('6 Okt 2026 14:28 WIB');

  function handleFieldChange(field: keyof Omit<StoreSetting, 'id'>, value: string) {
    setSelected((prev) => ({ ...prev, [field]: value }));
  }

  function handleSave() {
    setSettings((prev) => prev.map((s) => (s.id === selected.id ? { ...selected } : s)));
    const now = new Date();
    const timeFormatted = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} WIB`;
    setLastSaved(`Hari ini ${timeFormatted}`);
    onNotify(`Konfigurasi key "${selected.key}" berhasil diperbarui!`);
  }

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-md">
      <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border">
        <div>
          <h2 className="text-lg md:text-[20px] font-bold text-white font-outfit">Konfigurasi Lanjutan</h2>
          <p className="text-sm text-text-muted mt-1 font-outfit">Nilai aktif di STORE_SETTINGS. Terakhir disimpan: {lastSaved}.</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-3 py-1.5 rounded-xl self-start sm:self-auto font-outfit">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          Tersimpan
        </span>
      </div>
      <div className="p-6 flex flex-col lg:flex-row gap-6">
        <div className="flex-1 overflow-x-auto border border-border rounded-xl bg-surface">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#222225] border-b border-border">
                <th className="py-4 px-6 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit w-14">ID</th>
                <th className="py-4 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">Setting Key</th>
                <th className="py-4 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">Value</th>
                <th className="py-4 px-6 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-text-main">
              {settings.map((s) => {
                const isActive = selected.id === s.id;
                return (
                  <tr key={s.id} onClick={() => setSelected({ ...s })} className={`hover:bg-raised/40 cursor-pointer transition-colors ${isActive ? 'bg-secondary/10' : ''}`}>
                    <td className={`py-4 px-6 text-[13px] font-outfit text-text-muted ${isActive ? 'border-l-2 border-l-secondary' : ''}`}>{s.id}</td>
                    <td className="py-4 px-4 text-[14px] font-medium text-white font-outfit">{s.key}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-md text-[12px] font-medium font-outfit ${s.value === 'false' || s.value === 'true' ? 'bg-emerald-950/40 border border-emerald-500/20 text-emerald-400' : 'bg-raised border border-border text-white'}`}>{s.value}</span>
                    </td>
                    <td className="py-4 px-6 text-[13px] text-text-muted font-outfit">{s.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="lg:w-80 xl:w-96 shrink-0 p-6 space-y-4 border border-border rounded-xl bg-surface">
          <h3 className="text-[16px] font-bold text-white font-outfit">Edit entri</h3>
          <div className="space-y-1.5">
            <label className="text-[12px] text-text-muted font-outfit">setting_key</label>
            <input type="text" value={selected.key} readOnly className="w-full bg-raised border border-border rounded-xl px-4 py-2.5 text-[13px] text-text-muted focus:outline-none font-outfit cursor-not-allowed" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[12px] text-text-muted font-outfit">setting_value</label>
            <input type="text" value={selected.value} onChange={(e) => handleFieldChange('value', e.target.value)} className="w-full bg-raised border border-border rounded-xl px-4 py-2.5 text-[14px] text-white focus:outline-none focus:border-secondary transition-colors font-outfit" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[12px] text-text-muted font-outfit">description</label>
            <input type="text" value={selected.description} onChange={(e) => handleFieldChange('description', e.target.value)} className="w-full bg-raised border border-border rounded-xl px-4 py-2.5 text-[14px] text-white focus:outline-none focus:border-secondary transition-colors font-outfit" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[12px] text-text-muted font-outfit">updated_at (sistem)</label>
            <p className="text-[13px] text-text-muted px-1 py-1 font-outfit">{lastSaved}</p>
          </div>
          <button
            onClick={handleSave}
            className="w-full bg-secondary hover:bg-secondary/90 text-white py-2.5 rounded-xl font-bold font-outfit shadow-lg shadow-secondary/20 transition-all active:scale-95 cursor-pointer text-sm"
          >
            Simpan perubahan
          </button>
          <p className="text-[11px] text-text-muted font-outfit">Konvensi nilai: holiday_date memakai format YYYY-MM-DD.</p>
        </div>
      </div>
    </div>
  );
}

export function SettingsView() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

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

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight font-outfit">Pengaturan Toko</h1>
          <p className="text-sm md:text-base text-text-muted mt-1 font-outfit">
            Kelola jam operasional, hari libur, dan konfigurasi TRIM Bandung.
          </p>
        </div>
      </div>
      <JadwalOperasional onNotify={showToast} />
      <HariLiburKhusus onNotify={showToast} />
      <KonfigurasiLanjutan onNotify={showToast} />
    </div>
  );
}
