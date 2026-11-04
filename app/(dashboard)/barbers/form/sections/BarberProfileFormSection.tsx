import React from 'react';
import { Upload, Info, Lock, ArrowUpRight } from 'lucide-react';
import { Card, TextField, SelectField, Button, Avatar } from '@/components/ui';

interface BarberProfileFormSectionProps {
  isEditMode: boolean;
  name: string;
  onNameChange: (val: string) => void;
  phone: string;
  onPhoneChange: (val: string) => void;
  specialty: string;
  onSpecialtyChange: (val: string) => void;
  selectedEmail: string;
  onEmailChange: (val: string) => void;
}

const BARBER_EMAIL_OPTIONS = [
  { value: 'farhan@trim.id', label: 'farhan@trim.id' },
  { value: 'lefi@trim.id', label: 'lefi@trim.id' },
  { value: 'zidan@trim.id', label: 'zidan@trim.id' },
  { value: 'ridho@trim.id', label: 'ridho@trim.id' },
  { value: 'yoga@trim.id', label: 'yoga@trim.id' },
  { value: 'reza@trim.id', label: 'reza@trim.id' },
];

export function BarberProfileFormSection({
  isEditMode,
  name,
  onNameChange,
  phone,
  onPhoneChange,
  specialty,
  onSpecialtyChange,
  selectedEmail,
  onEmailChange,
}: BarberProfileFormSectionProps) {
  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Card 1: Informasi Kapster */}
      <Card className="p-6 md:p-8 space-y-8">
        <div className="space-y-1">
          <h2 className="text-[20px] font-bold text-text-main">Informasi kapster</h2>
          <p className="text-[14px] text-text-muted">
            Data yang tampil pada profil kapster. Tanda <span className="text-secondary">*</span> wajib diisi.
          </p>
        </div>

        {/* Photo Upload / Initial Avatar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <Avatar name={name} size={88} shape="rounded" variant="surface" />
          <div className="space-y-2.5">
            <p className="text-[14px] font-medium text-text-main">
              Foto profil <span className="text-text-muted font-normal">(opsional)</span>
            </p>
            <label className="cursor-pointer inline-block">
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
              />
              <div className="flex items-center justify-center h-10 px-4 rounded-xl font-bold gap-2 bg-raised border border-border hover:bg-surface-hover text-text-main transition-colors text-[13px] w-fit">
                <Upload className="w-4 h-4" />
                <span>{isEditMode ? 'Ganti foto' : 'Unggah foto'}</span>
              </div>
            </label>
            <p className="text-[12px] text-text-muted">JPG atau PNG, maks. 2 MB. Gunakan foto persegi.</p>
          </div>
        </div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            label="Nama lengkap"
            required
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Masukkan nama kapster"
            helperText="Gunakan nama yang dikenali pelanggan."
          />
          <TextField
            label="Nomor telepon"
            required
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="Contoh: 081234567890"
            helperText="Nomor aktif, hanya angka; tanpa spasi."
          />
        </div>

        <TextField
          label="Spesialisasi"
          required
          value={specialty}
          onChange={(e) => onSpecialtyChange(e.target.value)}
          placeholder="Contoh: Fade & taper"
          helperText="Tulis keahlian utama, misalnya classic, crop, atau beard."
        />

        <div className="flex items-start gap-3 pt-2 border-t border-border/60">
          <Info className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
          <p className="text-[13px] text-text-muted leading-relaxed">
            Nomor telepon harus unik. Saat disimpan, nomor akan diperiksa agar tidak digunakan profil kapster lain.
          </p>
        </div>
      </Card>

      {/* Card 2: Akun login */}
      <Card className="p-6 md:p-8 space-y-6">
        <div className="space-y-1">
          <h2 className="text-[20px] font-bold text-text-main">
            {isEditMode ? 'Akun login tertaut' : 'Akun login'}
          </h2>
          <p className="text-[14px] text-text-muted">
            {isEditMode
              ? 'Akun pengguna yang terhubung dengan profil ini.'
              : 'Tautkan profil ke akun pengguna melalui email.'}
          </p>
        </div>

        {isEditMode ? (
          <div className="p-4 rounded-xl bg-raised/60 border border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="w-4 h-4 text-text-muted shrink-0" />
              <div>
                <p className="text-[14px] font-bold text-text-main">{selectedEmail || 'farhan@trim.id'}</p>
                <p className="text-[12px] text-text-muted mt-0.5">Role: barber</p>
              </div>
            </div>
            <span className="text-[12px] font-medium text-text-muted bg-surface px-3 py-1 rounded-lg border border-border">
              Hanya baca
            </span>
          </div>
        ) : (
          <SelectField
            label="Email akun barber"
            required
            value={selectedEmail}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="Pilih akun berdasarkan email"
            options={BARBER_EMAIL_OPTIONS}
            helperText="Cari email, misalnya nama@trim.id. Hanya akun dengan role barber yang belum tertaut dapat dipilih."
          />
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-border/60">
          <p className="text-[13px] text-text-muted">
            {isEditMode
              ? 'Tautan akun tidak dapat diubah di halaman ini.'
              : 'Satu akun hanya dapat terhubung ke satu profil kapster.'}
          </p>
          <Button
            href="/accounts"
            variant="outline"
            size="sm"
            icon={<ArrowUpRight className="w-4 h-4" />}
          >
            Kelola akun
          </Button>
        </div>
      </Card>
    </div>
  );
}

