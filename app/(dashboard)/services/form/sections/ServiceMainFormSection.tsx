import React from 'react';
import { Card, TextField, SelectField, Switch, Button } from '@/components/ui';

interface ServiceMainFormSectionProps {
  isEditMode: boolean;
  name: string;
  onNameChange: (val: string) => void;
  duration: string;
  onDurationChange: (val: string) => void;
  price: string;
  onPriceChange: (val: string) => void;
  category: string;
  onCategoryChange: (val: string) => void;
  isActive: boolean;
  onActiveChange: (val: boolean) => void;
}

const SERVICE_CATEGORY_OPTIONS = [
  { value: 'Potong rambut', label: 'Potong rambut' },
  { value: 'Paket', label: 'Paket' },
  { value: 'Perawatan', label: 'Perawatan' },
  { value: 'Styling', label: 'Styling' },
  { value: 'Pewarnaan', label: 'Pewarnaan' },
];

export function ServiceMainFormSection({
  isEditMode,
  name,
  onNameChange,
  duration,
  onDurationChange,
  price,
  onPriceChange,
  category,
  onCategoryChange,
  isActive,
  onActiveChange,
}: ServiceMainFormSectionProps) {
  return (
    <Card className="lg:col-span-2 p-6 md:p-8 space-y-6">
      <div className="flex justify-between items-center border-b border-border/60 pb-4">
        <div>
          <h2 className="text-[20px] font-bold text-text-main">Informasi layanan</h2>
          <p className="text-[14px] text-text-muted mt-0.5">
            {isEditMode
              ? `Perbarui detail ${name || 'layanan'} sesuai menu toko.`
              : 'Lengkapi detail layanan yang akan ditampilkan kepada pelanggan.'}
          </p>
        </div>
        <span className="text-[12px] text-text-muted">* Wajib diisi</span>
      </div>

      <TextField
        label="Nama layanan"
        required
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Contoh: Potong reguler"
        helperText="Gunakan nama yang mudah dikenali pelanggan."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <TextField
          label="Durasi (menit)"
          type="number"
          required
          value={duration}
          onChange={(e) => onDurationChange(e.target.value)}
          placeholder="Contoh: 35"
          rightAddon="menit"
          helperText="duration_minutes dalam menit."
        />

        <TextField
          label="Harga"
          required
          value={price}
          onChange={(e) => onPriceChange(e.target.value)}
          placeholder="Contoh: 60.000"
          leftAddon="Rp"
          helperText="Harga tidak boleh negatif."
        />
      </div>

      <SelectField
        label="Kategori"
        required
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        placeholder="Pilih kategori"
        options={SERVICE_CATEGORY_OPTIONS}
        helperText="Pilih kategori yang sesuai dengan layanan."
      />

      <div className="flex items-center justify-between border-t border-border/60 pt-5">
        <div>
          <p className="text-[14px] font-bold text-text-main">Status aktif</p>
          <p className="text-[12px] text-text-muted mt-0.5">
            Layanan aktif tersedia untuk booking di aplikasi pelanggan.
          </p>
        </div>
        <Switch checked={isActive} onChange={onActiveChange} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-border/60">
        <span className="text-[13px] text-text-muted">
          Periksa detail sebelum menyimpan.
        </span>
        <div className="flex items-center gap-3 justify-end">
          <Button href="/services" variant="outline" size="md">
            Batal
          </Button>
          <Button type="submit" variant="primary" size="md">
            {isEditMode ? 'Simpan perubahan' : 'Simpan layanan'}
          </Button>
        </div>
      </div>
    </Card>
  );
}

