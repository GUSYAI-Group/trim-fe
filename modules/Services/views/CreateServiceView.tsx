'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, Info } from 'lucide-react';

export default function CreateServiceView() {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Layanan "${name}" berhasil dibuat!`);
  };

  return (
    <div className="space-y-6 pb-16 font-space-grotesk no-scrollbar selection:bg-secondary selection:text-white">
      {/* Breadcrumb & Top Bar */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs text-text-muted font-outfit">
          <Link href="/services" className="hover:text-white transition-colors">
            Kelola Layanan
          </Link>
          <span>›</span>
          <span className="text-white font-medium">Tambah layanan</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div>
            <h1 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight font-outfit">
              Tambah layanan
            </h1>
            <p className="text-text-muted text-xs md:text-sm mt-0.5 font-outfit">
              Buat layanan baru untuk menu TRIM Bandung.
            </p>
          </div>

          <Link href="/services">
            <button className="bg-raised border border-border hover:bg-border text-white px-4 py-2.5 rounded-xl text-xs font-bold font-outfit flex items-center gap-2 transition-all cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke layanan</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Grid Content Utama */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Kolom Kiri: Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div className="p-6 md:p-8 rounded-2xl bg-surface border border-border space-y-6 shadow-md">
            <div className="flex justify-between items-center border-b border-border/60 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white font-outfit">Informasi layanan</h2>
                <p className="text-xs text-text-muted font-outfit mt-0.5">
                  Lengkapi detail layanan yang akan ditampilkan kepada pelanggan.
                </p>
              </div>
              <span className="text-[11px] text-text-muted font-outfit">* Wajib diisi</span>
            </div>

            {/* Nama Layanan */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-white font-outfit">
                Nama layanan *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Potong reguler"
                required
                className="w-full bg-raised/60 border border-border/80 focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-text-muted outline-none transition-colors font-outfit"
              />
              <p className="text-[11px] text-text-muted font-outfit">
                Gunakan nama yang mudah dikenali pelanggan.
              </p>
            </div>

            {/* Durasi & Harga */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-white font-outfit">
                  Durasi (menit) *
                </label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Contoh: 35"
                    required
                    className="w-full bg-raised/60 border border-border/80 focus:border-secondary rounded-xl pl-4 pr-12 py-2.5 text-xs text-white placeholder:text-text-muted outline-none transition-colors font-outfit"
                  />
                  <span className="absolute right-4 text-xs text-text-muted font-outfit pointer-events-none">
                    menit
                  </span>
                </div>
                <p className="text-[11px] text-text-muted font-outfit">
                  duration_minutes dalam menit.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-white font-outfit">
                  Harga *
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-xs text-text-muted font-outfit pointer-events-none">
                    Rp
                  </span>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Contoh: 60.000"
                    required
                    className="w-full bg-raised/60 border border-border/80 focus:border-secondary rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-text-muted outline-none transition-colors font-outfit"
                  />
                </div>
                <p className="text-[11px] text-text-muted font-outfit">
                  Harga tidak boleh negatif.
                </p>
              </div>
            </div>

            {/* Kategori */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-white font-outfit">
                Kategori *
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full appearance-none bg-raised/60 border border-border/80 focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-white outline-none transition-colors cursor-pointer font-outfit"
                >
                  <option value="" disabled className="bg-surface text-text-muted">
                    Pilih kategori
                  </option>
                  <option value="Potong rambut" className="bg-surface text-white">
                    Potong rambut
                  </option>
                  <option value="Paket" className="bg-surface text-white">
                    Paket
                  </option>
                  <option value="Perawatan" className="bg-surface text-white">
                    Perawatan
                  </option>
                  <option value="Styling" className="bg-surface text-white">
                    Styling
                  </option>
                  <option value="Pewarnaan" className="bg-surface text-white">
                    Pewarnaan
                  </option>
                </select>
                <ChevronDown className="w-4 h-4 text-text-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <p className="text-[11px] text-text-muted font-outfit">
                Pilih kategori yang sesuai dengan layanan.
              </p>
            </div>

            {/* Status Aktif */}
            <div className="flex items-center justify-between border-t border-border/60 pt-4">
              <div>
                <p className="text-xs font-bold text-white font-outfit">Status aktif</p>
                <p className="text-[11px] text-text-muted font-outfit mt-0.5">
                  Layanan aktif tersedia untuk booking di aplikasi pelanggan.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsActive(!isActive)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    isActive ? 'bg-secondary' : 'bg-raised border border-border'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      isActive ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className="text-xs font-bold text-emerald-400 font-outfit">
                  {isActive ? 'Aktif' : 'Nonaktif'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-border/60">
              <span className="text-[11px] text-text-muted font-outfit">
                Periksa detail sebelum menyimpan.
              </span>
              <div className="flex items-center gap-3">
                <Link href="/services">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl bg-raised border border-border text-xs font-bold text-white hover:bg-border transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                </Link>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/90 text-xs font-bold text-white shadow-lg shadow-secondary/20 transition-all active:scale-95 cursor-pointer"
                >
                  Simpan layanan
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Kolom Kanan: Panduan Pengisian */}
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-surface border border-border space-y-4 text-xs font-outfit">
            <div className="flex items-center gap-2 text-secondary font-bold text-sm border-b border-border/60 pb-3">
              <Info className="w-4 h-4 text-secondary shrink-0" />
              <span>Panduan pengisian</span>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-white">Durasi untuk penjadwalan</h4>
              <p className="text-text-muted leading-relaxed">
                Isi duration_minutes dalam menit. Gunakan perkiraan waktu yang dibutuhkan untuk menyelesaikan layanan.
              </p>
            </div>

            <hr className="border-border/50" />

            <div className="space-y-1">
              <h4 className="font-bold text-white">Harga dalam rupiah</h4>
              <p className="text-text-muted leading-relaxed">
                Harga tidak boleh negatif. Tarif ini ditampilkan di aplikasi pelanggan untuk booking baru.
              </p>
            </div>

            <hr className="border-border/50" />

            <div className="space-y-1.5">
              <h4 className="font-bold text-white">Kategori yang tersedia</h4>
              <ul className="space-y-1 text-text-muted pl-3">
                <li className="list-disc text-secondary">
                  <span className="text-text-muted">Potong rambut</span>
                </li>
                <li className="list-disc text-secondary">
                  <span className="text-text-muted">Paket</span>
                </li>
                <li className="list-disc text-secondary">
                  <span className="text-text-muted">Perawatan</span>
                </li>
                <li className="list-disc text-secondary">
                  <span className="text-text-muted">Styling</span>
                </li>
                <li className="list-disc text-secondary">
                  <span className="text-text-muted">Pewarnaan</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border space-y-2 text-xs font-outfit">
            <h4 className="font-bold text-white">Siap tampil di menu</h4>
            <p className="text-text-muted leading-relaxed">
              Aktifkan layanan agar dapat dipilih pelanggan. Nonaktifkan jika layanan belum siap menerima booking.
            </p>
          </div>
        </div>
      </div>

      {/* Warning Rule Banner */}
      <div className="bg-[#1c120c] border border-secondary/20 rounded-2xl p-4 flex items-start gap-3 shadow-md">
        <Info className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
        <div className="text-xs font-outfit space-y-1">
          <h4 className="text-secondary font-bold">
            Harga booking tidak berubah saat tarif layanan diperbarui
          </h4>
          <p className="text-text-muted leading-relaxed">
            Harga tersimpan di BOOKING_SERVICES.price_at_booking. Jadwal berada di BOOKINGS.start_time/end_time. Harga tidak boleh negatif.
          </p>
        </div>
      </div>
    </div>
  );
}