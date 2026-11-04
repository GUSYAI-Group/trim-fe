import React from 'react';
import { Info, Upload, Image as ImageIcon } from 'lucide-react';
import { Card, Alert } from '@/components/ui';

interface ProductSidebarSectionProps {
  isEditMode: boolean;
  uuid: string;
  createdAt: string;
  updatedAt: string;
}

export function ProductSidebarSection({
  isEditMode,
  uuid,
  createdAt,
  updatedAt,
}: ProductSidebarSectionProps) {
  return (
    <div className="space-y-6">
      <Card variant="surface" padding="md" className="space-y-4 text-xs">
        <div className="flex items-center gap-2 text-secondary font-bold text-sm border-b border-border/60 pb-3">
          <Info className="w-4 h-4 text-secondary shrink-0" />
          <span>Panduan pengisian</span>
        </div>

        <div className="space-y-1">
          <h4 className="font-bold text-white">Harga dalam rupiah</h4>
          <p className="text-text-muted leading-relaxed">
            {isEditMode
              ? 'Harga tidak boleh negatif. Tarif ini ditampilkan di katalog untuk penjualan baru.'
              : 'Harga tidak boleh negatif. Gunakan nilai decimal nonnegatif, contoh: 35000,50.'}
          </p>
        </div>

        {!isEditMode && (
          <>
            <hr className="border-border/50" />
            <div className="space-y-1">
              <h4 className="font-bold text-white">Persediaan</h4>
              <p className="text-text-muted leading-relaxed">
                Stok awal dan ambang minimum menggunakan bilangan bulat ≥ 0.
              </p>
            </div>
          </>
        )}

        <hr className="border-border/50" />

        <div className="space-y-1.5">
          <h4 className="font-bold text-white">Kategori yang tersedia</h4>
          <ul className="space-y-1 text-text-muted pl-3">
            <li className="list-disc text-secondary"><span className="text-text-muted">Minyak Rambut</span></li>
            <li className="list-disc text-secondary"><span className="text-text-muted">Hair Spray</span></li>
            <li className="list-disc text-secondary"><span className="text-text-muted">Powder</span></li>
            <li className="list-disc text-secondary"><span className="text-text-muted">Hair Tonic</span></li>
            <li className="list-disc text-secondary"><span className="text-text-muted">Serum</span></li>
          </ul>
        </div>
      </Card>

      {isEditMode && (
        <Card variant="surface" padding="md" className="space-y-3 text-xs">
          <div className="space-y-0.5">
            <h4 className="font-bold text-white">Foto produk</h4>
            <p className="text-text-muted text-[11px]">Opsional • image_url</p>
          </div>

          <div className="p-6 border-2 border-dashed border-border/80 rounded-2xl bg-raised/30 flex flex-col items-center justify-center text-center space-y-2">
            <div className="w-8 h-8 rounded-lg bg-raised border border-border flex items-center justify-center text-text-muted">
              <ImageIcon className="w-4 h-4" />
            </div>
            <p className="text-[11px] text-text-muted">Foto belum tersedia</p>
            <label className="cursor-pointer inline-block pt-1">
              <input type="file" className="hidden" />
              <div className="px-3 py-1.5 bg-raised hover:bg-border border border-border rounded-xl text-[11px] font-bold text-white flex items-center gap-1.5 transition-colors">
                <Upload className="w-3 h-3" />
                <span>Pilih foto</span>
              </div>
            </label>
            <p className="text-[10px] text-text-muted">Format JPG atau PNG</p>
          </div>

          <p className="text-[11px] text-text-muted">
            URL foto disimpan pada image_url setelah unggahan berhasil.
          </p>
        </Card>
      )}

      <Card variant="surface" padding="md" className="space-y-2 text-xs">
        <h4 className="font-bold text-white">Siap tampil di menu</h4>
        <p className="text-text-muted leading-relaxed">
          Aktifkan produk agar tampil di katalog. Nonaktifkan jika produk belum siap ditawarkan.
        </p>
      </Card>

      <Card variant="surface" padding="md" className="space-y-4 text-xs">
        <div>
          <h4 className="font-bold text-white">Informasi sistem</h4>
          <p className="text-text-muted text-[11px] mt-0.5">Otomatis oleh sistem • hanya baca</p>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-text-muted text-[11px]">ID produk (UUID)</p>
            <p className="font-bold text-white font-mono break-all mt-0.5">{uuid}</p>
          </div>

          <div>
            <p className="text-text-muted text-[11px]">Tanggal dibuat</p>
            <p className="font-bold text-white mt-0.5">{createdAt}</p>
          </div>

          <div>
            <p className="text-text-muted text-[11px]">Terakhir diperbarui</p>
            <p className="font-bold text-white mt-0.5">{updatedAt}</p>
          </div>
        </div>

        <p className="text-[10px] text-text-muted leading-relaxed border-t border-border/50 pt-3">
          {isEditMode
            ? 'ID tidak diubah. Waktu pembaruan dikelola sistem setelah perubahan disimpan.'
            : 'UUID dan waktu otomatis belum dibuat. Sistem mengisinya setelah produk berhasil disimpan.'}
        </p>
      </Card>

      <Alert
        variant="accent"
        title="Aturan status stok"
        description="Aman: stok > ambang minimum. Menipis: 0 < stok ≤ ambang. Habis: stok = 0. Status ini dihitung, bukan diisi manual."
      />

      <Card variant="surface" padding="md" className="space-y-2 text-xs">
        <h4 className="font-bold text-white">
          {isEditMode ? 'Sebelum menyimpan perubahan' : 'Sebelum membuat produk'}
        </h4>
        <p className="text-text-muted leading-relaxed">
          {isEditMode
            ? 'Periksa kembali harga, stok, dan ambang minimum. Perubahan hanya diterapkan setelah Simpan perubahan.'
            : 'Periksa data produk sebelum menyimpan. Produk belum dibuat; foto dan deskripsi boleh dikosongkan.'}
        </p>
      </Card>
    </div>
  );
}

