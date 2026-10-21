'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Upload, Info, ChevronDown, ArrowUpRight, User, Lock, Star } from 'lucide-react';
import { Card, Button } from '@/components/ui';

// Data Mockup untuk Auto-Fill Mode Edit
const DUMMY_KAPSTER_MAP: Record<string, { name: string; phone: string; specialty: string; email: string; status: 'aktif' | 'nonaktif'; rating: string; finished: number }> = {
  '081234567890': { name: 'Gus Farhan', phone: '0812 3456 7890', specialty: 'Fade & taper', email: 'farhan@trim.id', status: 'aktif', rating: '4,9', finished: 8 },
  '081377889900': { name: 'Lefi Dian', phone: '0813 7788 9900', specialty: 'Classic & pompadour', email: 'lefi@trim.id', status: 'aktif', rating: '4,9', finished: 6 },
  '082144556677': { name: 'Zidan Alex', phone: '0821 4455 6677', specialty: 'Texture & crop', email: 'zidan@trim.id', status: 'aktif', rating: '4,8', finished: 4 },
  '085722113344': { name: 'Ridho Arman', phone: '0857 2211 3344', specialty: 'Buzz cut & beard', email: 'ridho@trim.id', status: 'aktif', rating: '5,0', finished: 0 },
  '081966778899': { name: 'Yoga Prasetyo', phone: '0819 6677 8899', specialty: 'Mullet & wolf cut', email: 'yoga@trim.id', status: 'nonaktif', rating: '4,7', finished: 0 },
  '087811225566': { name: 'Reza Firmansyah', phone: '0878 1122 5566', specialty: 'Hair tattoo & color', email: 'reza@trim.id', status: 'nonaktif', rating: '4,6', finished: 0 },
};

export function BarberFormView() {
  const searchParams = useSearchParams();
  const editId = searchParams.get('id'); // Mengambil query ?id=...
  const isEditMode = Boolean(editId);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [status, setStatus] = useState<'aktif' | 'nonaktif'>('aktif');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [rating, setRating] = useState('4,9');
  const [finished, setFinished] = useState(0);

  // Auto-fill form jika dalam mode edit
  useEffect(() => {
    if (isEditMode && editId && DUMMY_KAPSTER_MAP[editId]) {
      const data = DUMMY_KAPSTER_MAP[editId];
      setName(data.name);
      setPhone(data.phone);
      setSpecialty(data.specialty);
      setSelectedEmail(data.email);
      setStatus(data.status);
      setRating(data.rating);
      setFinished(data.finished);
    }
  }, [isEditMode, editId]);

  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : '';

  return (
    <div className="pb-12 font-space-grotesk relative min-h-screen">
      {/* Header Dinamis (Tambah Kapster vs Edit Kapster) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <header className="space-y-2">
          <h1 className="text-[28px] font-extrabold text-white tracking-tight font-outfit">
            {isEditMode ? 'Edit Kapster' : 'Tambah Kapster'}
          </h1>
          <p className="text-text-muted">
            {isEditMode
              ? `Perbarui profil ${name || 'kapster'}, spesialisasi, dan status aktifnya.`
              : 'Lengkapi profil dan tautkan akun barber untuk mendaftarkan kapster.'}
          </p>
        </header>
        <Link href="/barbers">
          <Button
            variant="secondary"
            className="gap-2 shrink-0 bg-transparent border border-border text-text-main hover:bg-raised cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke daftar</span>
          </Button>
        </Link>
      </div>

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
                  placeholder="Contoh: 081234567890"
                  className="w-full bg-transparent border border-border rounded-lg px-4 py-3 text-[14px] text-white placeholder:text-text-muted focus:outline-none focus:border-secondary transition-colors font-outfit"
                />
                <p className="text-[13px] text-text-muted">Nomor aktif, hanya angka; tanpa spasi.</p>
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
                Nomor telepon harus unik. Saat disimpan, nomor akan diperiksa agar tidak digunakan profil kapster lain.
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
                    <p className="text-[11px] text-text-muted font-outfit mt-0.5">Role: barber</p>
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
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full text-left bg-transparent border rounded-lg pl-4 pr-10 py-3 text-[14px] transition-colors appearance-none flex items-center justify-between font-outfit cursor-pointer ${
                      isDropdownOpen ? 'border-secondary' : 'border-border hover:border-text-muted/30'
                    } ${selectedEmail ? 'text-white' : 'text-text-muted'}`}
                  >
                    <span className="truncate">{selectedEmail || 'Pilih akun berdasarkan email'}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-text-muted transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-[#1A1A1A] border border-border rounded-xl overflow-hidden z-50 shadow-2xl shadow-black/50 font-outfit">
                      <div className="max-h-56 overflow-y-auto p-1.5 space-y-0.5">
                        {['farhan@trim.id', 'lefi@trim.id', 'zidan@trim.id', 'ridho@trim.id', 'yoga@trim.id'].map((email) => (
                          <button
                            key={email}
                            type="button"
                            onClick={() => {
                              setSelectedEmail(email);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2.5 rounded-lg text-[14px] transition-colors flex items-center justify-between group cursor-pointer ${
                              selectedEmail === email
                                ? 'bg-secondary/10 text-secondary font-medium'
                                : 'text-white hover:bg-raised'
                            }`}
                          >
                            {email}
                            {selectedEmail === email && (
                              <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {isDropdownOpen && (
                    <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
                  )}
                </div>
                <p className="text-[13px] text-text-muted">
                  Cari email, misalnya nama@trim.id. Hanya akun dengan role barber yang belum tertaut dapat dipilih.
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <p className="text-[13px] text-text-muted">
                {isEditMode
                  ? 'Tautan akun tidak dapat diubah di halaman ini.'
                  : 'Satu akun hanya dapat terhubung ke satu profil kapster.'}
              </p>
              <Button
                variant="secondary"
                className="gap-2 shrink-0 bg-transparent border border-border text-text-main hover:bg-raised h-10 cursor-pointer"
              >
                <ArrowUpRight className="w-4 h-4" />
                <span>Kelola akun</span>
              </Button>
            </div>
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
              Mengatur keaktifan profil, bukan ketersediaan di antrean. Status sedang melayani dihitung dari booking.
            </p>
          </Card>

          {/* Card 4: Ringkasan Performa (Edit) / Informasi Sistem (Tambah) */}
          {isEditMode ? (
            <Card className="p-6 space-y-6 bg-surface border-border font-outfit">
              <div className="space-y-1">
                <h2 className="text-[20px] font-bold text-white">Ringkasan performa</h2>
                <p className="text-[13px] text-text-muted">Data terhitung • hanya baca</p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-[13px] text-text-muted">Rata-rata rating</p>
                  <div className="flex items-center gap-1 text-2xl font-extrabold text-white mt-1">
                    <Star className="w-5 h-5 text-secondary fill-secondary" /> {rating} / 5
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

              <p className="text-[12px] text-text-muted leading-relaxed pt-2">
                Rating berasal dari ulasan; jumlah selesai dihitung dari booking hari ini.
              </p>
            </Card>
          ) : (
            <Card className="p-6 space-y-8 bg-surface border-border font-outfit">
              <div className="space-y-2">
                <h2 className="text-[20px] font-bold text-white">Informasi sistem</h2>
                <p className="text-[14px] text-text-muted">Diisi otomatis, bukan bagian dari form.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-1.5">
                  <p className="text-[13px] text-text-muted">ID profil (UUID)</p>
                  <p className="text-[14px] text-white font-medium">Dibuat setelah disimpan</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[13px] text-text-muted">Tanggal dibuat</p>
                  <p className="text-[14px] text-white font-medium">Dicatat otomatis oleh sistem</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[13px] text-text-muted">Rata-rata rating</p>
                  <p className="text-[14px] text-white font-medium">Belum ada ulasan</p>
                </div>
              </div>
            </Card>
          )}

          {/* Alert Sebelum menyimpan */}
          <div className="bg-[#24130A] border-l-4 border-secondary rounded-lg p-5 space-y-2 font-outfit">
            <h4 className="text-secondary font-bold text-[14px]">
              {isEditMode ? 'Perubahan profil' : 'Sebelum menyimpan'}
            </h4>
            <p className="text-text-muted text-[13px] leading-relaxed">
              {isEditMode
                ? 'Perubahan baru diterapkan setelah disimpan. Rating dan riwayat booking tidak dapat diedit di form ini.'
                : 'Pastikan nama, nomor telepon, spesialisasi, dan akun barber sudah terisi. Profil belum dibuat sebelum disimpan.'}
            </p>
          </div>
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
              variant="secondary"
              className="w-full sm:w-auto bg-transparent hover:bg-raised border border-border text-white font-bold px-8 h-11 cursor-pointer"
            >
              Batal
            </Button>
          </Link>
          <Button variant="primary" className="flex-1 sm:flex-none px-8 font-bold h-11 cursor-pointer">
            {isEditMode ? 'Simpan perubahan' : 'Simpan kapster'}
          </Button>
        </div>
      </div>
    </div>
  );
}