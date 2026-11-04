import React from 'react';
import { Card, Alert } from '@/components/ui';

interface AccountSidebarSectionProps {
  isEditMode: boolean;
  uuid: string;
  createdAt: string;
  updatedAt: string;
}

export function AccountSidebarSection({
  isEditMode,
  uuid,
  createdAt,
  updatedAt,
}: AccountSidebarSectionProps) {
  return (
    <div className="space-y-6">
      <Card variant="surface" padding="md" className="space-y-4 text-xs">
        <div>
          <h4 className="font-bold text-white">Informasi sistem</h4>
          <p className="text-text-muted text-[11px] mt-0.5">Otomatis oleh sistem • hanya baca</p>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-text-muted text-[11px]">
              {isEditMode ? 'ID akun (UUID singkat)' : 'ID akun (UUID)'}
            </p>
            <p className="font-bold text-white font-mono break-all mt-0.5">{uuid}</p>
          </div>

          <div>
            <p className="text-text-muted text-[11px]">Tanggal dibuat</p>
            <p className="font-bold text-white mt-0.5">{createdAt}</p>
          </div>

          <div>
            <p className="text-text-muted text-[11px]">Terakhir diupdate</p>
            <p className="font-bold text-white mt-0.5">{updatedAt}</p>
          </div>
        </div>

        <p className="text-[10px] text-text-muted leading-relaxed border-t border-border/50 pt-3">
          {isEditMode
            ? 'ID dan tanggal dibuat tidak berubah. Waktu update diperbarui sistem setelah Simpan perubahan.'
            : 'ID (UUID), tanggal dibuat, dan waktu update dibuat otomatis setelah akun disimpan.'}
        </p>
      </Card>

      <Alert
        variant="accent"
        title="Penyimpanan akun pengguna"
        description="Kata sandi disimpan sebagai hash dan tidak ditampilkan. Form ini hanya menyimpan akun login. Profil CUSTOMERS/BARBERS ditautkan melalui user_id dan tidak otomatis dibuat."
      />

      <Card variant="surface" padding="md" className="space-y-2 text-xs">
        <h4 className="font-bold text-white">
          {isEditMode ? 'Perubahan akun' : 'Sebelum membuat akun'}
        </h4>
        <p className="text-text-muted leading-relaxed text-[11px]">
          {isEditMode
            ? 'Perubahan email, peran, dan kata sandi baru diterapkan setelah disimpan. Kata sandi lama tidak ditampilkan.'
            : 'Pastikan email, kata sandi, dan peran sudah sesuai. Akun belum dibuat sebelum disimpan.'}
        </p>
      </Card>
    </div>
  );
}

