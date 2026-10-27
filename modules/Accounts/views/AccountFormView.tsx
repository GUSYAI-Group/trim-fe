'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Info, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

// Mockup Data untuk Auto-fill Mode Edit (Matching Figma Gambar 1)
const DUMMY_ACCOUNTS: Record<
  string,
  {
    email: string;
    role: 'admin' | 'barber' | 'customer';
    uuid: string;
    createdAt: string;
    updatedAt: string;
  }
> = {
  'dimas': {
    email: 'dimas@trim.id',
    role: 'admin',
    uuid: '9b1a...c7f2',
    createdAt: '12 Sep 2026',
    updatedAt: '6 Okt 2026',
  },
  'arief': {
    email: 'arief@trim.id',
    role: 'barber',
    uuid: '4f88...a11c',
    createdAt: '15 Aug 2026',
    updatedAt: '5 Okt 2026',
  },
};

export default function AccountFormView() {
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');
  const isEditMode = Boolean(editId);

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'admin' | 'barber' | 'customer'>('admin');

  // System Info States
  const [uuid, setUuid] = useState('Belum dibuat');
  const [createdAt, setCreatedAt] = useState('Belum dibuat');
  const [updatedAt, setUpdatedAt] = useState('Belum dibuat');

  // Auto-fill saat Edit Mode
  useEffect(() => {
    if (isEditMode && editId && DUMMY_ACCOUNTS[editId]) {
      const data = DUMMY_ACCOUNTS[editId];
      setEmail(data.email);
      setRole(data.role);
      setUuid(data.uuid);
      setCreatedAt(data.createdAt);
      setUpdatedAt(data.updatedAt);
      setPassword('');
    } else {
      // Reset jika Tambah Baru
      setEmail('');
      setPassword('');
      setRole('admin');
      setUuid('Belum dibuat');
      setCreatedAt('Belum dibuat');
      setUpdatedAt('Belum dibuat');
    }
  }, [isEditMode, editId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      isEditMode
        ? `Akun "${email}" berhasil diperbarui!`
        : `Akun "${email}" berhasil dibuat!`
    );
  };

  return (
    <div className="space-y-6 pb-20 font-space-grotesk no-scrollbar selection:bg-secondary selection:text-white">
      {/* Breadcrumb & Header Dinamis */}
      <div className="space-y-1 font-outfit">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <Link href="/accounts" className="hover:text-white transition-colors">
            Manajemen Akun
          </Link>
          <span>/</span>
          <span className="text-white font-medium">
            {isEditMode ? 'Edit Akun Pengguna' : 'Tambah Akun Pengguna'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div>
            <h1 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight">
              {isEditMode ? 'Edit Akun Pengguna' : 'Tambah Akun Pengguna'}
            </h1>
            <p className="text-text-muted text-xs md:text-sm mt-0.5">
              {isEditMode
                ? `Perbarui email dan hak akses ${email || 'pengguna'}. Kamu masuk sebagai Owner.`
                : 'Buat akun login dengan email, kata sandi, dan peran. Kamu masuk sebagai Owner.'}
            </p>
          </div>

          <Link
            href="/accounts"
            className="bg-raised border border-border hover:bg-border text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke daftar</span>
          </Link>
        </div>
      </div>

      {/* Warning Alert Banner */}
      <div className="p-4 rounded-2xl bg-[#1c120c] border border-secondary/30 flex items-start gap-3 shadow-md font-outfit">
        <Info className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
        <div className="space-y-0.5 text-xs">
          <h4 className="font-bold text-secondary">Akses sesuai peran, bisnis tetap aman</h4>
          <p className="text-text-muted leading-relaxed">
            Role: customer, barber, admin, owner. Admin biasa tidak dapat menghapus akun Owner; pembatasan diterapkan oleh aplikasi.
          </p>
        </div>
      </div>

      {/* Form Main Layout */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Kolom Kiri Utama */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Informasi Akun Login */}
          <div className="p-6 md:p-8 rounded-2xl bg-surface border border-border space-y-6 shadow-md font-outfit">
            <div>
              <h2 className="text-lg font-bold text-white">Informasi akun login</h2>
              <p className="text-xs text-text-muted mt-0.5">
                Akun pengguna untuk masuk ke TRIM. Tanda * wajib diisi.
              </p>
            </div>

            {/* Avatar & Sub-badge (Hanya Tampil pada Mode Edit - Match Figma 1) */}
            {isEditMode && (
              <div className="p-4 rounded-2xl bg-raised/50 border border-border/80 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-raised border border-border flex items-center justify-center font-bold text-secondary text-xs">
                  DS
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{email}</h4>
                  <p className="text-[11px] text-text-muted mt-0.5">
                    Peran saat ini: {role.charAt(0).toUpperCase() + role.slice(1)} • role: {role}
                  </p>
                </div>
              </div>
            )}

            {/* Input Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-white">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isEditMode ? '' : 'Masukkan email, contoh: niko@trim.id'}
                required
                className="w-full bg-raised/60 border border-border/80 focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-text-muted outline-none transition-colors"
              />
              <p className="text-[11px] text-text-muted">Gunakan alamat email untuk login akun pengguna.</p>
            </div>

            {/* Input Kata Sandi */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-white">
                {isEditMode ? 'Kata sandi baru (opsional)' : 'Kata sandi *'}
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={
                    isEditMode
                      ? 'Masukkan kata sandi baru jika ingin mengubah'
                      : 'Masukkan kata sandi'
                  }
                  required={!isEditMode}
                  className="w-full bg-raised/60 border border-border/80 focus:border-secondary rounded-xl pl-4 pr-11 py-2.5 text-xs text-white placeholder:text-text-muted outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-text-muted hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-text-muted">
                {isEditMode
                  ? 'Biarkan kosong untuk mempertahankan kata sandi saat ini. Jika diisi, minimal 8 karakter dengan huruf dan angka.'
                  : 'Minimal 8 karakter, kombinasi huruf dan angka.'}
              </p>
            </div>
          </div>

          {/* Card 2: Hak Akses Akun */}
          <div className="p-6 md:p-8 rounded-2xl bg-surface border border-border space-y-6 shadow-md font-outfit">
            <div>
              <h2 className="text-lg font-bold text-white">Hak akses akun</h2>
              <p className="text-xs text-text-muted mt-0.5">Pilih satu peran sesuai kebutuhan pengguna.</p>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-white">Peran akun *</label>

              {/* Grid Option Roles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Admin */}
                <div
                  onClick={() => setRole('admin')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex justify-between items-start ${
                    role === 'admin'
                      ? 'bg-[#1c120c] border-secondary'
                      : 'bg-raised/40 border-border hover:border-border/80'
                  }`}
                >
                  <div>
                    <h4 className="text-xs font-bold text-white">Admin</h4>
                    <p className="text-[11px] text-text-muted mt-1">Kelola operasional dan staf.</p>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 ${
                      role === 'admin' ? 'border-secondary bg-secondary' : 'border-border'
                    }`}
                  >
                    {role === 'admin' && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                </div>

                {/* Barber */}
                <div
                  onClick={() => setRole('barber')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex justify-between items-start ${
                    role === 'barber'
                      ? 'bg-[#1c120c] border-secondary'
                      : 'bg-raised/40 border-border hover:border-border/80'
                  }`}
                >
                  <div>
                    <h4 className="text-xs font-bold text-white">Barber</h4>
                    <p className="text-[11px] text-text-muted mt-1">Layanan potong rambut dan jadwal.</p>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 ${
                      role === 'barber' ? 'border-secondary bg-secondary' : 'border-border'
                    }`}
                  >
                    {role === 'barber' && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                </div>

                {/* Customer */}
                <div
                  onClick={() => setRole('customer')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex justify-between items-start sm:col-span-2 ${
                    role === 'customer'
                      ? 'bg-[#1c120c] border-secondary'
                      : 'bg-raised/40 border-border hover:border-border/80'
                  }`}
                >
                  <div>
                    <h4 className="text-xs font-bold text-white">Customer</h4>
                    <p className="text-[11px] text-text-muted mt-1">Booking, profil, dan riwayat layanan.</p>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 ${
                      role === 'customer' ? 'border-secondary bg-secondary' : 'border-border'
                    }`}
                  >
                    {role === 'customer' && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-text-muted pt-1">
                Role valid: customer, barber, admin, owner. Owner tidak dipilih untuk akun staf.
              </p>
            </div>
          </div>
        </div>

        {/* Kolom Kanan Sidebar */}
        <div className="space-y-6 font-outfit">
          {/* Card Informasi Sistem */}
          <div className="p-6 rounded-2xl bg-surface border border-border space-y-4 text-xs">
            <div>
              <h4 className="font-bold text-white">Informasi sistem</h4>
              <p className="text-text-muted text-[11px] mt-0.5">Otomatis oleh sistem • hanya baca</p>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-text-muted text-[11px]">
                  {isEditMode ? 'ID akun (UUID singkat)' : 'ID akun (UUID)'}
                </p>
                <p className="font-bold text-white break-all mt-0.5">{uuid}</p>
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
          </div>

          {/* Card Penyimpanan Akun Pengguna */}
          <div className="p-4 rounded-2xl bg-[#1c120c] border border-secondary/20 space-y-1 shadow-md text-xs">
            <div className="flex items-center gap-1.5 text-secondary font-bold">
              <Info className="w-4 h-4 shrink-0" />
              <span>Penyimpanan akun pengguna</span>
            </div>
            <p className="text-text-muted text-[11px] leading-relaxed pt-1">
              Kata sandi disimpan sebagai hash dan tidak ditampilkan. Form ini hanya menyimpan akun login. Profil CUSTOMERS/BARBERS ditautkan melalui user_id dan tidak otomatis dibuat.
            </p>
          </div>

          {/* Card Sebelum Membuat / Perubahan Akun */}
          <div className="p-6 rounded-2xl bg-surface border border-border space-y-2 text-xs">
            <h4 className="font-bold text-white">
              {isEditMode ? 'Perubahan akun' : 'Sebelum membuat akun'}
            </h4>
            <p className="text-text-muted leading-relaxed text-[11px]">
              {isEditMode
                ? 'Perubahan email, peran, dan kata sandi baru diterapkan setelah disimpan. Kata sandi lama tidak ditampilkan.'
                : 'Pastikan email, kata sandi, dan peran sudah sesuai. Akun belum dibuat sebelum disimpan.'}
            </p>
          </div>
        </div>
      </form>

      {/* Sticky Bottom Bar */}
      <div className="p-4 rounded-2xl bg-surface border border-border flex flex-col sm:flex-row items-center justify-between gap-4 font-outfit shadow-xl">
        <span className="text-xs text-text-muted">
          {isEditMode
            ? 'Periksa kembali perubahan akun sebelum menyimpan.'
            : 'Lengkapi email, kata sandi, dan peran sebelum membuat akun.'}
        </span>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <Link
            href="/accounts"
            className="px-5 py-2.5 rounded-xl bg-raised border border-border text-xs font-bold text-white hover:bg-border transition-colors cursor-pointer text-center"
          >
            Batal
          </Link>
          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary/90 text-xs font-bold text-white shadow-lg shadow-secondary/20 transition-all active:scale-95 cursor-pointer text-center"
          >
            {isEditMode ? 'Simpan perubahan' : 'Buat akun'}
          </button>
        </div>
      </div>
    </div>
  );
}