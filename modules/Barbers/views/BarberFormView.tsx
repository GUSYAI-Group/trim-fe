'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Upload, Info, Lock, Star, User } from 'lucide-react';
import { Card, Button, Dropdown } from '@/components/ui';
import { useTrimStore } from '@/store/useTrimStore';

export function BarberFormView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id'); // e.g. phone with or without spaces
  const isEditMode = Boolean(editId);

  const kapsters = useTrimStore((s) => s.kapsters);
  const accounts = useTrimStore((s) => s.accounts);
  const addKapster = useTrimStore((s) => s.addKapster);
  const updateKapster = useTrimStore((s) => s.updateKapster);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [status, setStatus] = useState<'aktif' | 'nonaktif'>('aktif');
  const [rating, setRating] = useState('5,0');
  const [finished, setFinished] = useState(0);
  const [origPhone, setOrigPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Auto-fill form jika dalam mode edit
  useEffect(() => {
    if (isEditMode && editId) {
      const cleanEditId = editId.replace(/\s+/g, '');
      const found = kapsters.find((k) => k.phone.replace(/\s+/g, '') === cleanEditId);
      if (found) {
        setName(found.name);
        setPhone(found.phone);
        setOrigPhone(found.phone);
        setSpecialty(found.specialty);
        setStatus(found.statusText === 'Aktif' ? 'aktif' : 'nonaktif');
        setRating(found.rating);
        setFinished(found.finished);
        setSelectedEmail(found.name.toLowerCase().replace(/\s+/g, '') + '@trim.id');
      }
    }
  }, [isEditMode, editId, kapsters]);

  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '';

  // Get barber accounts for dropdown
  const barberEmails = accounts
    .filter((a) => a.role === 'barber' || a.roleBadge === 'Barber')
    .map((a) => a.email);

  const fallbackEmails = barberEmails.length > 0 
    ? barberEmails 
    : ['farhan@trim.id', 'lefi@trim.id', 'zidan@trim.id', 'ridho@trim.id', 'yoga@trim.id'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Nama lengkap kapster wajib diisi.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Nomor telepon kapster wajib diisi.');
      return;
    }
    if (!specialty.trim()) {
      setErrorMessage('Spesialisasi kapster wajib diisi.');
      return;
    }

    if (isEditMode) {
      updateKapster(origPhone || phone, {
        name: name.trim(),
        phone: phone.trim(),
        specialty: specialty.trim(),
        statusText: status === 'aktif' ? 'Aktif' : 'Nonaktif',
        badgeType: status === 'aktif' ? 'success' : 'muted',
        initials: initials || 'KP',
      });
    } else {
      // Check phone uniqueness
      const exists = kapsters.some((k) => k.phone.replace(/\s+/g, '') === phone.replace(/\s+/g, ''));
      if (exists) {
        setErrorMessage('Nomor telepon sudah terdaftar pada kapster lain.');
        return;
      }

      addKapster({
        name: name.trim(),
        phone: phone.trim(),
        specialty: specialty.trim(),
        statusText: status === 'aktif' ? 'Aktif' : 'Nonaktif',
        badgeType: status === 'aktif' ? 'success' : 'muted',
        rating: '5,0',
        finished: 0,
        initials: initials || 'KP',
      });
    }

    router.push('/barbers');
  };

  return (
    <form onSubmit={handleSubmit} className="pb-12 font-space-grotesk relative min-h-screen">
      {/* Breadcrumb & Header Dinamis */}
      <div className="space-y-1 font-outfit mb-8">
        <div className="flex items-center gap-2 text-xs md:text-[13px] text-text-muted">
          <Link href="/barbers" className="hover:text-white transition-colors">
            Kelola Kapster
          </Link>
          <span>/</span>
          <span className="text-white font-medium">
            {isEditMode ? 'Edit Kapster' : 'Tambah Kapster'}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-1">
          <header className="space-y-2">
            <h1 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight">
              {isEditMode ? 'Edit Kapster' : 'Tambah Kapster'}
            </h1>
            <p className="text-text-muted text-sm md:text-base">
              {isEditMode
                ? `Perbarui profil ${name || 'kapster'}, spesialisasi, dan status aktifnya.`
                : 'Lengkapi profil dan tautkan akun barber untuk mendaftarkan kapster.'}
            </p>
          </header>
          <Link href="/barbers">
            <Button
              type="button"
              variant="secondary"
              className="gap-2 shrink-0 bg-transparent border border-border text-text-main hover:bg-raised cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke daftar</span>
            </Button>
          </Link>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-outfit text-sm">
          {errorMessage}
        </div>
      )}

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cards) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Informasi Kapster */}
          <Card className="p-6 md:p-8 space-y-10 bg-surface border-border">
            <div className="space-y-2">
              <h2 className="text-[20px] font-bold text-white font-outfit">Informasi kapster</h2>
              <p className="text-[14px] text-text-muted">
                Data yang tampil pada profil kapster. Tanda <span className="text-secondary">*</span> wajib diisi.
              </p>
            </div>

            {/* Photo Upload / Initial Avatar */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-raised border border-border flex items-center justify-center shrink-0 font-bold text-secondary text-2xl font-outfit">
                {initials || <User className="w-8 h-8 text-text-muted" />}
              </div>
              <div className="space-y-3">
                <p className="text-[14px] font-medium text-white">
                  Foto profil <span className="text-text-muted font-normal">(opsional)</span>
                </p>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file && file.size > 2 * 1024 * 1024) {
                        alert('Ukuran file maksimal 2 MB');
                        e.target.value = '';
                      }
                    }}
                  />
                  <div className="flex items-center justify-center h-10 px-4 rounded-lg font-bold gap-2 bg-transparent border border-border hover:bg-raised text-white transition-colors text-[14px] w-fit">
                    <Upload className="w-4 h-4" />
                    <span>{isEditMode ? 'Ganti foto' : 'Unggah foto'}</span>
                  </div>
                </label>
                <p className="text-[13px] text-text-muted">JPG atau PNG, maks. 2 MB. Gunakan foto persegi.</p>
              </div>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[14px] font-medium text-white">
                  Nama lengkap <span className="text-secondary">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama kapster"
                  className="w-full bg-transparent border border-border rounded-lg px-4 py-3 text-[14px] text-white placeholder:text-text-muted focus:outline-none focus:border-secondary transition-colors font-outfit"
                />
                <p className="text-[13px] text-text-muted">Gunakan nama yang dikenali pelanggan.</p>
              </div>
              <div className="space-y-3">
                <label className="text-[14px] font-medium text-white">
                  Nomor telepon <span className="text-secondary">*</span>
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Contoh: 0812 3456 7890"
                  className="w-full bg-transparent border border-border rounded-lg px-4 py-3 text-[14px] text-white placeholder:text-text-muted focus:outline-none focus:border-secondary transition-colors font-outfit"
                />
                <p className="text-[13px] text-text-muted">Nomor kontak kapster untuk jadwal & pelanggan.</p>
              </div>
            </div>

            {/* Spesialisasi */}
            <div className="space-y-3">
              <label className="text-[14px] font-medium text-white">
                Spesialisasi <span className="text-secondary">*</span>
              </label>
              <input
                type="text"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                placeholder="Contoh: Fade & taper"
                className="w-full bg-transparent border border-border rounded-lg px-4 py-3 text-[14px] text-white placeholder:text-text-muted focus:outline-none focus:border-secondary transition-colors font-outfit"
              />
              <p className="text-[13px] text-text-muted">Tulis keahlian utama, misalnya classic, crop, atau beard.</p>
            </div>

            {/* Warning Alert */}
            <div className="flex items-start gap-3 pt-2">
              <Info className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <p className="text-[13px] text-text-muted leading-relaxed font-outfit">
                Nomor telepon harus unik. Data tersimpan secara otomatis dan dapat diedit sewaktu-waktu.
              </p>
            </div>
          </Card>

          {/* Card 2: Akun login */}
          <Card className="p-6 md:p-8 space-y-8 bg-surface border-border">
            <div className="space-y-2">
              <h2 className="text-[20px] font-bold text-white font-outfit">
                {isEditMode ? 'Akun login tertaut' : 'Akun login'}
              </h2>
              <p className="text-[14px] text-text-muted">
                {isEditMode
                  ? 'Akun pengguna yang terhubung dengan profil ini.'
                  : 'Tautkan profil ke akun pengguna melalui email.'}
              </p>
            </div>

            {isEditMode ? (
              <div className="p-4 rounded-xl bg-raised/40 border border-border/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lock className="w-4 h-4 text-text-muted shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-white font-outfit">{selectedEmail || 'farhan@trim.id'}</p>
                    <p className="text-[11px] text-text-muted font-outfit mt-0.5">Role: Barber</p>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-text-muted font-outfit bg-surface px-2.5 py-1 rounded-lg border border-border">
                  Hanya baca
                </span>
              </div>
            ) : (
              <div className="space-y-3">
                <label className="text-[14px] font-medium text-white">
                  Email akun barber <span className="text-secondary">*</span>
                </label>
                <Dropdown
                  value={selectedEmail}
                  onChange={setSelectedEmail}
                  placeholder="Pilih akun berdasarkan email"
                  variant="form"
                  options={fallbackEmails}
                />
                <p className="text-[13px] text-text-muted">
                  Cari email, misalnya nama@trim.id. Hanya akun dengan role barber yang dapat dipilih.
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Card 3: Status Profil */}
          <Card className="p-6 space-y-8 bg-surface border-border">
            <div className="space-y-2">
              <h2 className="text-[20px] font-bold text-white font-outfit">Status profil</h2>
              <p className="text-[14px] text-text-muted">
                {isEditMode ? `${name || 'Kapster'} saat ini ${status}.` : 'Pilih status awal kapster.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 font-outfit">
              <button
                type="button"
                onClick={() => setStatus('aktif')}
                className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  status === 'aktif'
                    ? 'border-secondary bg-[#2C1A0D]'
                    : 'border-border bg-transparent hover:bg-raised'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    status === 'aktif' ? 'border-secondary' : 'border-text-muted'
                  }`}
                >
                  {status === 'aktif' && <div className="w-2 h-2 rounded-full bg-secondary" />}
                </div>
                <span className={`text-[14px] font-bold ${status === 'aktif' ? 'text-white' : 'text-text-muted'}`}>
                  Aktif
                </span>
              </button>

              <button
                type="button"
                onClick={() => setStatus('nonaktif')}
                className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  status === 'nonaktif'
                    ? 'border-secondary bg-[#2C1A0D]'
                    : 'border-border bg-transparent hover:bg-raised'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    status === 'nonaktif' ? 'border-secondary' : 'border-text-muted'
                  }`}
                >
                  {status === 'nonaktif' && <div className="w-2 h-2 rounded-full bg-secondary" />}
                </div>
                <span className={`text-[14px] font-bold ${status === 'nonaktif' ? 'text-white' : 'text-text-muted'}`}>
                  Nonaktif
                </span>
              </button>
            </div>

            <p className="text-[13px] text-text-muted leading-relaxed font-outfit">
              Mengatur keaktifan profil di antrean booking kapster.
            </p>
          </Card>

          {/* Card 4: Ringkasan Performa (Edit) / Informasi Sistem (Tambah) */}
          {isEditMode ? (
            <Card className="p-6 space-y-6 bg-surface border-border font-outfit">
              <div className="space-y-1">
                <h2 className="text-[20px] font-bold text-white">Ringkasan performa</h2>
                <p className="text-[13px] text-text-muted">Data terhitung • real-time</p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-[13px] text-text-muted">Rata-rata rating</p>
                  <div className="flex items-center gap-1 text-2xl font-extrabold text-white mt-1">
                    <Star className="w-5 h-5 text-secondary fill-secondary" /> {rating} / 5.0
                  </div>
                </div>

                <hr className="border-border/60" />

                <div>
                  <p className="text-[13px] text-text-muted">Selesai hari ini</p>
                  <p className="text-2xl font-extrabold text-white mt-1">
                    {finished} <span className="text-xs font-normal text-text-muted">booking selesai</span>
                  </p>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-6 space-y-8 bg-surface border-border font-outfit">
              <div className="space-y-2">
                <h2 className="text-[20px] font-bold text-white">Informasi sistem</h2>
                <p className="text-[14px] text-text-muted">Diisi otomatis, bukan bagian dari form.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-1.5">
                  <p className="text-[13px] text-text-muted">ID profil</p>
                  <p className="text-[14px] text-white font-medium">Dibuat otomatis setelah disimpan</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[13px] text-text-muted">Rata-rata rating awal</p>
                  <p className="text-[14px] text-white font-medium">5,0 (Bintang penuh)</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-outfit">
        <p className="text-[13px] text-text-muted hidden sm:block">
          Periksa kembali informasi sebelum menyimpan.
        </p>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link href="/barbers" className="flex-1 sm:flex-none">
            <Button
              type="button"
              variant="secondary"
              className="w-full sm:w-auto bg-transparent hover:bg-raised border border-border text-white font-bold px-8 h-11 cursor-pointer"
            >
              Batal
            </Button>
          </Link>
          <Button
            type="submit"
            variant="primary"
            className="flex-1 sm:flex-none px-8 font-bold h-11 cursor-pointer"
          >
            {isEditMode ? 'Simpan perubahan' : 'Simpan kapster'}
          </Button>
        </div>
      </div>
    </form>
  );
}
