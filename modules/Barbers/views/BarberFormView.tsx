'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, Info, ChevronDown, ArrowUpRight, User } from 'lucide-react';
import { Card, Button } from '@/components/ui';

export function BarberFormView() {
  const [status, setStatus] = useState<'aktif' | 'nonaktif'>('aktif');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState('');

  return (
    <div className="pb-12 font-space-grotesk relative min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <header className="space-y-2">
          <h1 className="text-[28px] font-extrabold text-white tracking-tight font-outfit">Tambah Kapster</h1>
          <p className="text-text-muted">
            Lengkapi profil dan tautkan akun barber untuk mendaftarkan kapster.
          </p>
        </header>
        <Link href="/barbers">
          <Button variant="secondary" className="gap-2 shrink-0 bg-transparent border border-border text-text-main hover:bg-raised">
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
              <p className="text-[14px] text-text-muted">Data yang tampil pada profil kapster. Tanda <span className="text-secondary">*</span> wajib diisi.</p>
            </div>

            {/* Photo Upload */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-raised border border-border flex items-center justify-center shrink-0">
                <User className="w-8 h-8 text-text-muted" />
              </div>
              <div className="space-y-3">
                <p className="text-[14px] font-medium text-white">Foto profil <span className="text-text-muted font-normal">(opsional)</span></p>
                <label className="cursor-pointer">
                  <input 
                    type="file" 
                    accept="image/png, image/jpeg" 
                    className="hidden" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file && file.size > 2 * 1024 * 1024) {
                        alert('Ukuran file maksimal 2 MB');
                        e.target.value = ''; // Reset
                      }
                    }}
                  />
                  <div className="flex items-center justify-center h-10 px-4 rounded-lg font-bold gap-2 bg-transparent border border-border hover:bg-raised text-white transition-colors text-[14px] w-fit">
                    <Upload className="w-4 h-4" />
                    <span>Unggah foto</span>
                  </div>
                </label>
                <p className="text-[13px] text-text-muted">JPG atau PNG, maks. 2 MB. Gunakan foto persegi.</p>
              </div>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[14px] font-medium text-white">Nama lengkap <span className="text-secondary">*</span></label>
                <input 
                  type="text" 
                  placeholder="Masukkan nama kapster"
                  className="w-full bg-transparent border border-border rounded-lg px-4 py-3 text-[14px] text-white placeholder:text-text-muted focus:outline-none focus:border-secondary transition-colors"
                />
                <p className="text-[13px] text-text-muted">Gunakan nama yang dikenali pelanggan.</p>
              </div>
              <div className="space-y-3">
                <label className="text-[14px] font-medium text-white">Nomor telepon <span className="text-secondary">*</span></label>
                <input 
                  type="text" 
                  placeholder="Contoh: 081234567890"
                  className="w-full bg-transparent border border-border rounded-lg px-4 py-3 text-[14px] text-white placeholder:text-text-muted focus:outline-none focus:border-secondary transition-colors"
                />
                <p className="text-[13px] text-text-muted">Nomor aktif, hanya angka; tanpa spasi.</p>
              </div>
            </div>

            {/* Spesialisasi */}
            <div className="space-y-3">
              <label className="text-[14px] font-medium text-white">Spesialisasi <span className="text-secondary">*</span></label>
              <input 
                type="text" 
                placeholder="Contoh: Fade & taper"
                className="w-full bg-transparent border border-border rounded-lg px-4 py-3 text-[14px] text-white placeholder:text-text-muted focus:outline-none focus:border-secondary transition-colors"
              />
              <p className="text-[13px] text-text-muted">Tulis keahlian utama, misalnya classic, crop, atau beard.</p>
            </div>

            {/* Warning Alert */}
            <div className="flex items-start gap-3 pt-2">
              <Info className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <p className="text-[13px] text-text-muted leading-relaxed">
                Nomor telepon harus unik. Saat disimpan, nomor akan diperiksa agar tidak digunakan profil kapster lain.
              </p>
            </div>
          </Card>

          {/* Card 2: Akun login */}
          <Card className="p-6 md:p-8 space-y-8 bg-surface border-border">
            <div className="space-y-2">
              <h2 className="text-[20px] font-bold text-white font-outfit">Akun login</h2>
              <p className="text-[14px] text-text-muted">Tautkan profil ke akun pengguna melalui email.</p>
            </div>

            <div className="space-y-3">
              <label className="text-[14px] font-medium text-white">Email akun barber <span className="text-secondary">*</span></label>
              <div className="relative">
                <button 
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full text-left bg-transparent border rounded-lg pl-4 pr-10 py-3 text-[14px] transition-colors appearance-none flex items-center justify-between ${
                    isDropdownOpen ? 'border-secondary' : 'border-border hover:border-text-muted/30'
                  } ${selectedEmail ? 'text-white' : 'text-text-muted'}`}
                >
                  <span className="truncate">{selectedEmail || 'Pilih akun berdasarkan email'}</span>
                  <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#1A1A1A] border border-border rounded-xl overflow-hidden z-50 shadow-2xl shadow-black/50">
                    <div className="max-h-56 overflow-y-auto p-1.5 space-y-0.5">
                      {['budi@trim.id', 'raka@trim.id', 'dion@trim.id', 'yoga@trim.id'].map((email) => (
                        <button
                          key={email}
                          type="button"
                          onClick={() => {
                            setSelectedEmail(email);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-[14px] transition-colors flex items-center justify-between group ${
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
                {/* Invisible overlay to close dropdown when clicking outside */}
                {isDropdownOpen && (
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsDropdownOpen(false)}
                  ></div>
                )}
              </div>
              <p className="text-[13px] text-text-muted">Cari email, misalnya nama@trim.id. Hanya akun dengan role barber yang belum tertaut dapat dipilih.</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <p className="text-[13px] text-text-muted">Satu akun hanya dapat terhubung ke satu profil kapster.</p>
              <Button variant="secondary" className="gap-2 shrink-0 bg-transparent border border-border text-text-main hover:bg-raised h-10">
                <ArrowUpRight className="w-4 h-4" />
                <span>Kelola akun</span>
              </Button>
            </div>
          </Card>

        </div>

        {/* Right Column (Cards + Alert) */}
        <div className="space-y-6">
          
          {/* Card 3: Status profil */}
          <Card className="p-6 space-y-8 bg-surface border-border">
            <div className="space-y-2">
              <h2 className="text-[20px] font-bold text-white font-outfit">Status profil</h2>
              <p className="text-[14px] text-text-muted">Pilih status awal kapster.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Aktif Radio */}
              <button 
                onClick={() => setStatus('aktif')}
                className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                  status === 'aktif' ? 'border-secondary bg-[#2C1A0D]' : 'border-border bg-transparent hover:bg-raised'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  status === 'aktif' ? 'border-secondary' : 'border-text-muted'
                }`}>
                  {status === 'aktif' && <div className="w-2 h-2 rounded-full bg-secondary" />}
                </div>
                <span className={`text-[14px] font-bold ${status === 'aktif' ? 'text-white' : 'text-text-muted'}`}>Aktif</span>
              </button>

              {/* Nonaktif Radio */}
              <button 
                onClick={() => setStatus('nonaktif')}
                className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                  status === 'nonaktif' ? 'border-secondary bg-[#2C1A0D]' : 'border-border bg-transparent hover:bg-raised'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  status === 'nonaktif' ? 'border-secondary' : 'border-text-muted'
                }`}>
                  {status === 'nonaktif' && <div className="w-2 h-2 rounded-full bg-secondary" />}
                </div>
                <span className={`text-[14px] font-bold ${status === 'nonaktif' ? 'text-white' : 'text-text-muted'}`}>Nonaktif</span>
              </button>
            </div>

            <p className="text-[13px] text-text-muted leading-relaxed">
              Mengatur keaktifan profil, bukan ketersediaan di antrean. Status sedang melayani dihitung dari booking.
            </p>
          </Card>

          {/* Card 4: Informasi Sistem */}
          <Card className="p-6 space-y-8 bg-surface border-border">
            <div className="space-y-2">
              <h2 className="text-[20px] font-bold text-white font-outfit">Informasi sistem</h2>
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

          {/* Alert Sebelum menyimpan */}
          <div className="bg-[#24130A] border-l-4 border-secondary rounded-lg p-5 space-y-2">
            <h4 className="text-secondary font-bold text-[14px]">Sebelum menyimpan</h4>
            <p className="text-text-muted text-[13px] leading-relaxed">
              Pastikan nama, nomor telepon, spesialisasi, dan akun barber sudah terisi. Profil belum dibuat sebelum disimpan.
            </p>
          </div>

        </div>

      </div>

      {/* Bottom Action Footer */}
      <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-[13px] text-text-muted hidden sm:block">
          Lengkapi field wajib sebelum menyimpan.
        </p>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link href="/barbers" className="flex-1 sm:flex-none">
            <Button variant="secondary" className="w-full sm:w-auto bg-transparent hover:bg-raised border border-border text-white font-bold px-8 h-11">
              Batal
            </Button>
          </Link>
          <Button variant="primary" className="flex-1 sm:flex-none px-8 font-bold h-11">
            Simpan kapster
          </Button>
        </div>
      </div>

    </div>
  );
}
