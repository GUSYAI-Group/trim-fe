'use client';

import React from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import {
  Card,
  TextField,
  SelectField,
  Switch,
  TextareaField,
  Button,
} from '@/components/ui';

interface ProductMainFormSectionProps {
  isEditMode: boolean;
  name: string;
  onNameChange: (val: string) => void;
  category: string;
  onCategoryChange: (val: string) => void;
  price: string;
  onPriceChange: (val: string) => void;
  stock: string;
  onStockChange: (val: string) => void;
  minStock: string;
  onMinStockChange: (val: string) => void;
  isActive: boolean;
  onActiveChange: (val: boolean) => void;
  description: string;
  onDescriptionChange: (val: string) => void;
}

export function ProductMainFormSection({
  isEditMode,
  name,
  onNameChange,
  category,
  onCategoryChange,
  price,
  onPriceChange,
  stock,
  onStockChange,
  minStock,
  onMinStockChange,
  isActive,
  onActiveChange,
  description,
  onDescriptionChange,
}: ProductMainFormSectionProps) {
  return (
    <Card variant="surface" padding="lg" className="space-y-6">
      <div className="flex justify-between items-center border-b border-border/60 pb-4">
        <div>
          <h2 className="text-[20px] font-bold text-text-main">Informasi produk</h2>
          <p className="text-[14px] text-text-muted mt-0.5">
            {isEditMode
              ? `Perbarui detail ${name || 'produk'} sesuai katalog toko.`
              : 'Lengkapi detail produk yang akan ditampilkan kepada pelanggan.'}
          </p>
        </div>
        <span className="text-[12px] text-text-muted">* Wajib diisi</span>
      </div>

      <TextField
        label="Nama produk"
        required
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Contoh: Pomade"
        helperText="Gunakan nama yang mudah dikenali pelanggan."
      />

      <SelectField
        label="Kategori"
        required
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        placeholder="Pilih kategori produk"
        options={[
          { value: 'Minyak Rambut', label: 'Minyak Rambut' },
          { value: 'Hair Spray', label: 'Hair Spray' },
          { value: 'Powder', label: 'Powder' },
          { value: 'Hair Tonic', label: 'Hair Tonic' },
          { value: 'Serum', label: 'Serum' },
          { value: 'Styling', label: 'Styling' },
          { value: 'Perawatan', label: 'Perawatan' },
          ...(category && !['Minyak Rambut', 'Hair Spray', 'Powder', 'Hair Tonic', 'Serum', 'Styling', 'Perawatan'].includes(category)
            ? [{ value: category, label: category }]
            : []),
        ]}
        helperText="Pilihan: Minyak Rambut, Hair Spray, Powder, Hair Tonic, Serum, Styling."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <TextField
          label="Harga unit"
          className="font-mono"
          value={price}
          onChange={(e) => onPriceChange(e.target.value)}
          placeholder="Contoh: 35000"
          leftAddon="Rp"
          helperText="Harga dalam Rupiah • nilai decimal nonnegatif, contoh: 35000,50."
        />

        <TextField
          label={isEditMode ? 'Stok saat ini' : 'Stok awal'}
          type="number"
          className="font-mono"
          value={stock}
          onChange={(e) => onStockChange(e.target.value)}
          placeholder="Contoh: 12"
          rightAddon="unit"
          helperText="Bilangan bulat ≥ 0."
        />

        <TextField
          label="Ambang stok minimum"
          type="number"
          className="font-mono"
          value={minStock}
          onChange={(e) => onMinStockChange(e.target.value)}
          placeholder="Contoh: 5"
          rightAddon="unit"
          helperText="Bilangan bulat ≥ 0."
        />
      </div>

      <div className="flex items-center justify-between border-t border-border/60 pt-4">
        <div>
          <p className="text-[14px] font-bold text-text-main">Status aktif</p>
          <p className="text-[12px] text-text-muted mt-0.5">
            Produk aktif tersedia di katalog toko.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={isActive} onChange={onActiveChange} />
          <span className={`text-[12px] font-bold ${isActive ? 'text-success' : 'text-text-muted'}`}>
            {isActive ? 'Aktif' : 'Nonaktif'}
          </span>
        </div>
      </div>

      <TextareaField
        label="Deskripsi"
        rows={4}
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder="Masukkan deskripsi produk..."
        helperText="Boleh dikosongkan. Disimpan sebagai description."
      />

      {!isEditMode && (
        <div className="space-y-2 border-t border-border/60 pt-4">
          <label className="block text-[14px] font-medium text-text-main">Foto produk</label>
          <div className="p-8 border-2 border-dashed border-border/80 hover:border-secondary/50 rounded-2xl bg-raised/30 flex flex-col items-center justify-center text-center space-y-3 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-raised border border-border flex items-center justify-center text-text-muted">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <p className="text-[12px] text-text-muted">Belum ada foto diunggah</p>
              <label className="cursor-pointer inline-block pt-1">
                <input type="file" className="hidden" />
                <div className="h-11 px-5 bg-raised hover:bg-border border border-border rounded-xl text-[14px] font-bold text-white flex items-center gap-2 transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>Pilih foto</span>
                </div>
              </label>
            </div>
            <p className="text-[12px] text-text-muted">Format JPG atau PNG</p>
          </div>
          <p className="text-[12px] text-text-muted">
            URL foto disimpan pada image_url setelah unggahan berhasil.
          </p>
        </div>
      )}
    </Card>
  );
}

