'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Info, Eye, EyeOff, CheckCircle2, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTrimStore, Role } from '@/store/useTrimStore';

export default function AccountFormView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');
  const isEditMode = Boolean(editId);

  const accounts = useTrimStore((s) => s.accounts);
  const addAccount = useTrimStore((s) => s.addAccount);
  const updateAccount = useTrimStore((s) => s.updateAccount);

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<Role>('admin');
  const [targetId, setTargetId] = useState<number | null>(null);

  // System Info States
  const [uuid, setUuid] = useState('Dikelola sistem');
  const [createdAt, setCreatedAt] = useState('Otomatis saat disimpan');
  const [updatedAt, setUpdatedAt] = useState('Otomatis saat disimpan');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-fill saat Edit Mode
  useEffect(() => {
    if (isEditMode && editId) {
      const found = accounts.find(
        (a) => a.slug.toLowerCase() === editId.toLowerCase() || String(a.id) === editId || a.email.toLowerCase().includes(editId.toLowerCase())
      );
      if (found) {
        setTargetId(found.id);
        setEmail(found.email);
        setRole(found.role);
        setUuid(found.uuid);
        setCreatedAt(found.createdAt);
        setUpdatedAt(found.updatedAt);
        setPassword('');
      }
    } else {
      // Reset jika Tambah Baru
      setTargetId(null);
      setEmail('');
      setPassword('');
      setRole('admin');
      setUuid('Dikelola sistem');
      setCreatedAt('Otomatis saat disimpan');
      setUpdatedAt('Otomatis saat disimpan');
    }
  }, [isEditMode, editId, accounts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    if (isEditMode && targetId) {
      updateAccount(targetId, {
        email: email.trim(),
        role,
        displayName: email.split('@')[0],
      });
      setToastMessage(`Akun "${email}" berhasil diperbarui!`);
    } else {
      addAccount({
        email: email.trim(),
        role,
        displayName: email.split('@')[0],
        password: password || undefined,
      });
      setToastMessage(`Akun baru "${email}" berhasil dibuat!`);
    }

    setTimeout(() => {
      router.push('/accounts');
    }, 800);
  };

  return (
    <div className="space-y-6 pb-20 font-space-grotesk no-scrollbar selection:bg-secondary selection:text-white">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#1E1E22] border border-secondary/40 shadow-2xl shadow-secondary/20 font-outfit text-[14px] text-white"
          >
            <div className="w-2 h-2 rounded-full bg-secondary animate-ping" />
            <span className="font-semibold">{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="ml-2 text-text-muted hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breadcrumb & Header Dinamis */}
      <div className="space-y-1 font-outfit">
        <div className="flex items-center gap-2 text-xs md:text-[13px] text-text-muted">
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
            Role: customer, barber, admin, owner. Akun yang dibuat akan langsung tersimpan dan dapat digunakan untuk masuk ke TRIM.
          </p>
        </div>
      </div>

      {/* Form Main Layout */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start font-outfit">
        {/* Kolom Kiri Utama */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Informasi Akun Login */}
          <div className="p-6 md:p-8 rounded-2xl bg-surface border border-border space-y-6 shadow-md">
            <div>
              <h2 className="text-lg font-bold text-white">Informasi akun login</h2>
              <p className="text-xs text-text-muted mt-0.5">
                Akun pengguna untuk masuk ke TRIM. Tanda * wajib diisi.
              </p>
            </div>

            {/* Input Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-white">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email, contoh: staf@trim.id"
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
                      : 'Masukkan kata sandi login'
                  }
                  required={!isEditMode}
                  className="w-full bg-raised/60 border border-border/80 focus:border-secondary rounded-xl pl-4 pr-10 py-2.5 text-xs text-white placeholder:text-text-muted outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-text-muted hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-text-muted">
                {isEditMode
                  ? 'Kosongkan bila tidak ingin mengubah kata sandi akun pengguna.'
                  : 'Minimal 6 karakter kombinasi huruf dan angka.'}
              </p>
            </div>

            {/* Pilihan Peran (Role) */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-white">Peran (Role) *</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { r: 'admin', label: 'Admin', desc: 'Kelola operasional & transaksi' },
                  { r: 'barber', label: 'Barber', desc: 'Kelola antrean & potong rambut' },
                  { r: 'customer', label: 'Customer', desc: 'Pelanggan & reservasi online' },
                ].map((item) => (
                  <button
                    key={item.r}
                    type="button"
                    onClick={() => setRole(item.r as Role)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      role === item.r
                        ? 'bg-secondary/15 border-secondary text-white shadow-sm shadow-secondary/10'
                        : 'bg-raised/40 border-border text-text-muted hover:text-white hover:bg-raised'
                    }`}
                  >
                    <p className={`text-sm font-bold ${role === item.r ? 'text-secondary' : 'text-white'}`}>
                      {item.label}
                    </p>
                    <p className="text-[11px] text-text-muted mt-1 leading-snug">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Metadata Sistem & Action */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-surface border border-border space-y-4 shadow-md font-outfit">
            <h3 className="text-sm font-bold text-white border-b border-border/60 pb-3">
              Informasi Metadata
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-text-muted block">UUID Akun</span>
                <span className="font-mono text-white text-[11px] mt-0.5 block">{uuid}</span>
              </div>
              <div>
                <span className="text-text-muted block">Tanggal Dibuat</span>
                <span className="text-white mt-0.5 block">{createdAt}</span>
              </div>
              <div>
                <span className="text-text-muted block">Terakhir Diperbarui</span>
                <span className="text-white mt-0.5 block">{updatedAt}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border/60 space-y-2">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-bold text-xs shadow-lg shadow-secondary/20 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isEditMode ? 'Simpan Perubahan' : 'Buat Akun Sekarang'}</span>
              </button>

              <Link
                href="/accounts"
                className="w-full py-2.5 rounded-xl bg-raised border border-border hover:bg-border text-text-muted hover:text-white font-medium text-xs transition-colors block text-center cursor-pointer"
              >
                Batal
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
