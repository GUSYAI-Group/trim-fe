'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Card, TextField, Avatar } from '@/components/ui';
import { TRole } from '@/store/useAuthStore';

interface AccountMainFormSectionProps {
  isEditMode: boolean;
  initials: string;
  email: string;
  onEmailChange: (val: string) => void;
  password: string;
  onPasswordChange: (val: string) => void;
  role: TRole;
  onRoleChange: (val: TRole) => void;
}

export function AccountMainFormSection({
  isEditMode,
  initials,
  email,
  onEmailChange,
  password,
  onPasswordChange,
  role,
  onRoleChange,
}: AccountMainFormSectionProps) {
  const [showPassword, setShowPassword] = useState(false);

  const roleOptions: { value: TRole; title: string; subtitle: string; fullSpan?: boolean }[] = [
    {
      value: 'admin',
      title: 'Admin',
      subtitle: 'Kelola operasional dan staf.',
    },
    {
      value: 'barber',
      title: 'Barber',
      subtitle: 'Layanan potong rambut dan jadwal.',
    },
    {
      value: 'customer',
      title: 'Customer',
      subtitle: 'Booking, profil, dan riwayat layanan.',
      fullSpan: true,
    },
  ];

  return (
    <div className="space-y-6">
      <Card variant="surface" padding="lg" className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white">Informasi akun login</h2>
          <p className="text-xs text-text-muted mt-0.5">
            Akun pengguna untuk masuk ke TRIM. Tanda * wajib diisi.
          </p>
        </div>

        {isEditMode && (
          <div className="p-4 rounded-2xl bg-raised/50 border border-border/80 flex items-center gap-3.5">
            <Avatar initials={initials || 'US'} shape="rounded" variant="surface" size="md" />
            <div>
              <h4 className="text-xs font-bold text-white">{email}</h4>
              <p className="text-[11px] text-text-muted mt-0.5">
                Peran saat ini: {role.charAt(0).toUpperCase() + role.slice(1)} • role: {role}
              </p>
            </div>
          </div>
        )}

        <TextField
          label="Email"
          required
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder={isEditMode ? '' : 'Masukkan email, contoh: niko@trim.id'}
          helperText="Gunakan alamat email untuk login akun pengguna."
        />

        <TextField
          label={isEditMode ? 'Kata sandi baru (opsional)' : 'Kata sandi'}
          required={!isEditMode}
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          placeholder={
            isEditMode
              ? 'Masukkan kata sandi baru jika ingin mengubah'
              : 'Masukkan kata sandi'
          }
          rightAddon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-text-muted hover:text-white transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
          helperText={
            isEditMode
              ? 'Biarkan kosong untuk mempertahankan kata sandi saat ini. Jika diisi, minimal 8 karakter dengan huruf dan angka.'
              : 'Minimal 8 karakter, kombinasi huruf dan angka.'
          }
        />
      </Card>

      <Card variant="surface" padding="lg" className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white">Hak akses akun</h2>
          <p className="text-xs text-text-muted mt-0.5">
            Pilih satu peran sesuai kebutuhan pengguna.
          </p>
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-bold text-white">Peran akun *</label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {roleOptions.map((opt) => {
              const isSelected = role === opt.value;
              return (
                <div
                  key={opt.value}
                  onClick={() => onRoleChange(opt.value)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex justify-between items-start ${
                    opt.fullSpan ? 'sm:col-span-2' : ''
                  } ${
                    isSelected
                      ? 'bg-secondary/10 border-secondary'
                      : 'bg-raised/40 border-border hover:border-border/80'
                  }`}
                >
                  <div>
                    <h4 className="text-xs font-bold text-white">{opt.title}</h4>
                    <p className="text-[11px] text-text-muted mt-1">{opt.subtitle}</p>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 ${
                      isSelected ? 'border-secondary bg-secondary' : 'border-border'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-text-muted pt-1">
            Role valid: customer, barber, admin, owner. Owner tidak dipilih untuk akun staf.
          </p>
        </div>
      </Card>
    </div>
  );
}

