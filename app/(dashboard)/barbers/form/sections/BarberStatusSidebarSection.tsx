import React from 'react';
import { Star } from 'lucide-react';
import { Card, Alert } from '@/components/ui';

interface BarberStatusSidebarSectionProps {
  isEditMode: boolean;
  name: string;
  status: 'aktif' | 'nonaktif';
  onStatusChange: (val: 'aktif' | 'nonaktif') => void;
  rating: string;
  finished: number;
}

export function BarberStatusSidebarSection({
  isEditMode,
  name,
  status,
  onStatusChange,
  rating,
  finished,
}: BarberStatusSidebarSectionProps) {
  return (
    <div className="space-y-6">
      {/* Card 3: Status Profil */}
      <Card className="p-6 space-y-6">
        <div className="space-y-1">
          <h2 className="text-[20px] font-bold text-text-main">Status profil</h2>
          <p className="text-[14px] text-text-muted">
            {isEditMode ? `${name || 'Kapster'} saat ini ${status}.` : 'Pilih status awal kapster.'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {(['aktif', 'nonaktif'] as const).map((item) => {
            const isSelected = status === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => onStatusChange(item)}
                className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-secondary bg-secondary/15'
                    : 'border-border bg-transparent hover:bg-raised'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-secondary' : 'border-text-muted'
                  }`}
                >
                  {isSelected && <div className="w-2 h-2 rounded-full bg-secondary" />}
                </div>
                <span className={`text-[14px] font-bold capitalize ${isSelected ? 'text-text-main' : 'text-text-muted'}`}>
                  {item}
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-[13px] text-text-muted leading-relaxed">
          Mengatur keaktifan profil, bukan ketersediaan di antrean. Status sedang melayani dihitung dari booking.
        </p>
      </Card>

      {/* Card 4: Ringkasan Performa (Edit) / Informasi Sistem (Tambah) */}
      {isEditMode ? (
        <Card className="p-6 space-y-5">
          <div className="space-y-1">
            <h2 className="text-[20px] font-bold text-text-main">Ringkasan performa</h2>
            <p className="text-[13px] text-text-muted">Data terhitung • hanya baca</p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-[13px] text-text-muted">Rata-rata rating</p>
              <div className="flex items-center gap-1.5 text-2xl font-extrabold text-text-main mt-1">
                <Star className="w-5 h-5 text-secondary fill-secondary" />
                <span>{rating} / 5</span>
              </div>
            </div>

            <hr className="border-border/60" />

            <div>
              <p className="text-[13px] text-text-muted">Selesai hari ini</p>
              <p className="text-2xl font-extrabold text-text-main mt-1">
                {finished} <span className="text-[13px] font-normal text-text-muted">booking selesai</span>
              </p>
            </div>
          </div>

          <p className="text-[12px] text-text-muted leading-relaxed pt-2 border-t border-border/60">
            Rating berasal dari ulasan; jumlah selesai dihitung dari booking hari ini.
          </p>
        </Card>
      ) : (
        <Card className="p-6 space-y-5">
          <div className="space-y-1">
            <h2 className="text-[20px] font-bold text-text-main">Informasi sistem</h2>
            <p className="text-[13px] text-text-muted">Diisi otomatis, bukan bagian dari form.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-[12px] text-text-muted">ID profil (UUID)</p>
              <p className="text-[14px] text-text-main font-bold">Dibuat setelah disimpan</p>
            </div>
            <div className="space-y-1">
              <p className="text-[12px] text-text-muted">Tanggal dibuat</p>
              <p className="text-[14px] text-text-main font-bold">Dicatat otomatis oleh sistem</p>
            </div>
            <div className="space-y-1">
              <p className="text-[12px] text-text-muted">Rata-rata rating</p>
              <p className="text-[14px] text-text-main font-bold">Belum ada ulasan</p>
            </div>
          </div>
        </Card>
      )}

      <Alert
        variant="accent"
        title={isEditMode ? 'Perubahan profil' : 'Sebelum menyimpan'}
        description={
          isEditMode
            ? 'Perubahan baru diterapkan setelah disimpan. Rating dan riwayat booking tidak dapat diedit di form ini.'
            : 'Pastikan nama, nomor telepon, spesialisasi, dan akun barber sudah terisi. Profil belum dibuat sebelum disimpan.'
        }
      />
    </div>
  );
}

