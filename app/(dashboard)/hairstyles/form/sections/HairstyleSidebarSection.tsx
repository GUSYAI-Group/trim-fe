import React from 'react';
import { Card, Alert } from '@/components/ui';

interface HairstyleSidebarSectionProps {
  isEditMode: boolean;
  name: string;
  status: 'aktif' | 'nonaktif';
  onStatusChange: (val: 'aktif' | 'nonaktif') => void;
  uuid: string;
}

export function HairstyleSidebarSection({
  isEditMode,
  name,
  status,
  onStatusChange,
  uuid,
}: HairstyleSidebarSectionProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-5">
        <div className="space-y-1">
          <h3 className="text-[18px] font-bold text-text-main">Status model</h3>
          <p className="text-[13px] text-text-muted">
            {isEditMode ? `${name || 'Model'} saat ini ${status}.` : 'Pilih status awal model rambut.'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onStatusChange('aktif')}
            className={`p-3.5 rounded-xl border text-[13px] font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
              status === 'aktif'
                ? 'bg-secondary/15 border-secondary text-secondary shadow-sm'
                : 'bg-raised/40 border-border text-text-muted hover:text-text-main'
            }`}
          >
            <div
              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                status === 'aktif' ? 'border-secondary bg-secondary' : 'border-text-muted'
              }`}
            >
              {status === 'aktif' && <div className="w-1.5 h-1.5 rounded-full bg-text-main" />}
            </div>
            <span>Aktif</span>
          </button>

          <button
            type="button"
            onClick={() => onStatusChange('nonaktif')}
            className={`p-3.5 rounded-xl border text-[13px] font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
              status === 'nonaktif'
                ? 'bg-danger/15 border-danger text-danger shadow-sm'
                : 'bg-raised/40 border-border text-text-muted hover:text-text-main'
            }`}
          >
            <div
              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                status === 'nonaktif' ? 'border-danger bg-danger' : 'border-text-muted'
              }`}
            >
              {status === 'nonaktif' && <div className="w-1.5 h-1.5 rounded-full bg-text-main" />}
            </div>
            <span>Nonaktif</span>
          </button>
        </div>

        <p className="text-[12px] text-text-muted leading-relaxed">
          Model aktif dapat digunakan untuk rekomendasi AI. Model nonaktif tidak ditampilkan pada rekomendasi.
        </p>
      </Card>

      <Card className="p-6 space-y-4">
        <div className="space-y-1">
          <h3 className="text-[18px] font-bold text-text-main">Informasi sistem</h3>
          <p className="text-[13px] text-text-muted">
            {isEditMode ? 'Identitas model • hanya baca' : 'Diisi otomatis, bukan bagian dari form.'}
          </p>
        </div>

        <div className="space-y-1.5">
          <p className="text-[12px] text-text-muted">ID model (UUID)</p>
          <p className="text-[13px] font-bold text-text-main break-all font-mono">
            {isEditMode ? uuid : 'Dibuat setelah disimpan'}
          </p>
          {isEditMode && <p className="text-[12px] text-text-muted">Contoh ID model • tidak dapat diedit.</p>}
        </div>
      </Card>

      <Alert
        variant="accent"
        title={isEditMode ? 'Perubahan model' : 'Sebelum menyimpan'}
        description={
          isEditMode
            ? 'Perubahan baru diterapkan setelah disimpan. Simpan perubahan hanya memperbarui atribut model, bukan pemetaan wajah.'
            : 'Pastikan nama dan foto referensi terisi. Simpan model hanya menyimpan atribut model, bukan pemetaan wajah.'
        }
      />
    </div>
  );
}

