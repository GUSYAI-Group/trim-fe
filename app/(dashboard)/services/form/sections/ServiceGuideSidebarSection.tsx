import React from 'react';
import { Info } from 'lucide-react';
import { Card } from '@/components/ui';

interface ServiceGuideSidebarSectionProps {
  isEditMode: boolean;
}

export function ServiceGuideSidebarSection({ isEditMode }: ServiceGuideSidebarSectionProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2 text-secondary font-bold text-[15px] border-b border-border/60 pb-3">
          <Info className="w-4 h-4 text-secondary shrink-0" />
          <span>Panduan pengisian</span>
        </div>

        <div className="space-y-1">
          <h4 className="font-bold text-text-main text-[14px]">Durasi untuk penjadwalan</h4>
          <p className="text-text-muted text-[13px] leading-relaxed">
            Isi duration_minutes dalam menit. Gunakan perkiraan waktu yang dibutuhkan untuk menyelesaikan layanan.
          </p>
        </div>

        <hr className="border-border/50" />

        <div className="space-y-1">
          <h4 className="font-bold text-text-main text-[14px]">Harga dalam rupiah</h4>
          <p className="text-text-muted text-[13px] leading-relaxed">
            Harga tidak boleh negatif. Tarif ini ditampilkan di aplikasi pelanggan untuk booking baru.
          </p>
        </div>

        <hr className="border-border/50" />

        <div className="space-y-1.5">
          <h4 className="font-bold text-text-main text-[14px]">Kategori yang tersedia</h4>
          <ul className="space-y-1 text-text-muted text-[13px] pl-4">
            <li className="list-disc text-secondary"><span className="text-text-muted">Potong rambut</span></li>
            <li className="list-disc text-secondary"><span className="text-text-muted">Paket</span></li>
            <li className="list-disc text-secondary"><span className="text-text-muted">Perawatan</span></li>
            <li className="list-disc text-secondary"><span className="text-text-muted">Styling</span></li>
            <li className="list-disc text-secondary"><span className="text-text-muted">Pewarnaan</span></li>
          </ul>
        </div>
      </Card>

      <Card className="p-6 space-y-2">
        <h4 className="font-bold text-text-main text-[15px]">
          {isEditMode ? 'Perubahan layanan' : 'Siap tampil di menu'}
        </h4>
        <p className="text-text-muted text-[13px] leading-relaxed">
          {isEditMode
            ? 'Perubahan berlaku setelah disimpan. Menonaktifkan layanan akan menyembunyikannya dari pilihan booking baru.'
            : 'Aktifkan layanan agar dapat dipilih pelanggan. Nonaktifkan jika layanan belum siap menerima booking.'}
        </p>
      </Card>
    </div>
  );
}

