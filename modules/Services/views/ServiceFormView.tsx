'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Info } from 'lucide-react';
import { Dropdown } from '@/components/ui';
import { useTrimStore } from '@/store/useTrimStore';

export default function ServiceFormView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id'); // Menangkap ?id=...
  const isEditMode = Boolean(editId);

  const services = useTrimStore((s) => s.services);
  const addService = useTrimStore((s) => s.addService);
  const updateService = useTrimStore((s) => s.updateService);

  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Potong rambut');
  const [isActive, setIsActive] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Auto-fill saat mode edit
  useEffect(() => {
    if (isEditMode && editId) {
      const found = services.find((s) => s.id === editId);
      if (found) {
        setName(found.name);
        setDuration(found.duration.toString());
        setPrice(found.price.toLocaleString('id-ID'));
        setCategory(found.category);
        setIsActive(found.isActive);
      }
    }
  }, [isEditMode, editId, services]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Nama layanan wajib diisi.');
      return;
    }

    const dur = parseInt(duration, 10);
    if (isNaN(dur) || dur <= 0) {
      setErrorMessage('Durasi layanan harus berupa angka positif dalam menit.');
      return;
    }

    const cleanPrice = parseInt(price.replace(/[^0-9]/g, ''), 10);
    if (isNaN(cleanPrice) || cleanPrice < 0) {
      setErrorMessage('Harga layanan tidak boleh kosong atau negatif.');
      return;
    }

    if (isEditMode && editId) {
      updateService(editId, {
        name: name.trim(),
        duration: dur,
        price: cleanPrice,
        category: category || 'Potong rambut',
        isActive,
      });
    } else {
      addService({
        name: name.trim(),
        duration: dur,
        price: cleanPrice,
        category: category || 'Potong rambut',
        isActive,
      });
    }

    router.push('/services');
  };

  return (
    <div className="space-y-6 pb-16 font-space-grotesk no-scrollbar selection:bg-secondary selection:text-white">
      {/* Breadcrumb & Header Dinamis */}
      <div className="space-y-1 font-outfit">
        <div className="flex items-center gap-2 text-xs md:text-[13px] text-text-muted">
          <Link href="/services" className="hover:text-white transition-colors">
            Kelola Layanan
          </Link>
          <span>/</span>
          <span className="text-white font-medium">
            {isEditMode ? 'Edit Layanan' : 'Tambah Layanan'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div>
            <h1 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight font-outfit">
              {isEditMode ? 'Edit layanan' : 'Tambah layanan'}
            </h1>
            <p className="text-text-muted text-sm md:text-base mt-1 font-outfit">
              {isEditMode
                ? `Perbarui nama, durasi, harga, kategori, dan status ${name || 'layanan'}.`
                : 'Buat layanan baru untuk menu TRIM Bandung.'}
            </p>
          </div>

          <Link
            href="/services"
            className="bg-raised border border-border hover:bg-border text-white px-5 py-2.5 rounded-xl text-sm font-bold font-outfit flex items-center gap-2 transition-all cursor-pointer w-fit shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke layanan</span>
          </Link>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-outfit text-sm">
          {errorMessage}
        </div>
      )}

      {/* Grid Content Utama */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Kolom Kiri: Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div className="p-6 md:p-8 rounded-2xl bg-surface border border-border space-y-6 shadow-md">
            <div className="flex justify-between items-center border-b border-border/60 pb-4">
              <div>
                <h2 className="text-[20px] font-bold text-white font-outfit">Informasi layanan</h2>
                <p className="text-[14px] text-text-muted font-outfit mt-1">
                  {isEditMode
                    ? `Perbarui detail ${name || 'layanan'} sesuai menu toko.`
                    : 'Lengkapi detail layanan yang akan ditampilkan kepada pelanggan.'}
                </p>
              </div>
              <span className="text-[13px] text-text-muted font-outfit shrink-0">* Wajib diisi</span>
            </div>

            {/* Nama Layanan */}
            <div className="space-y-1.5">
              <label className="block text-[14px] font-bold text-white font-outfit">
                Nama layanan *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Potong reguler"
                required
                className="w-full bg-raised/60 border border-border/80 focus:border-secondary rounded-xl px-4 py-2.5 text-[14px] text-white placeholder:text-text-muted outline-none transition-colors font-outfit"
              />
              <p className="text-[13px] text-text-muted font-outfit">
                Gunakan nama yang mudah dikenali pelanggan.
              </p>
            </div>

            {/* Durasi & Harga */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[14px] font-bold text-white font-outfit">
                  Durasi (menit) *
                </label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Contoh: 35"
                    required
                    className="w-full bg-raised/60 border border-border/80 focus:border-secondary rounded-xl pl-4 pr-16 py-2.5 text-[14px] text-white placeholder:text-text-muted outline-none transition-colors font-outfit"
                  />
                  <span className="absolute right-4 text-[14px] text-text-muted font-outfit pointer-events-none">
                    menit
                  </span>
                </div>
                <p className="text-[13px] text-text-muted font-outfit">
                  Estimasi waktu pengerjaan kapster.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[14px] font-bold text-white font-outfit">
                  Harga *
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-[14px] text-text-muted font-outfit pointer-events-none">
                    Rp
                  </span>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Contoh: 60.000"
                    required
                    className="w-full bg-raised/60 border border-border/80 focus:border-secondary rounded-xl pl-12 pr-4 py-2.5 text-[14px] text-white placeholder:text-text-muted outline-none transition-colors font-outfit"
                  />
                </div>
                <p className="text-[13px] text-text-muted font-outfit">
                  Harga tidak boleh negatif.
                </p>
              </div>
            </div>

            {/* Kategori */}
            <div className="space-y-1.5">
              <label className="block text-[14px] font-bold text-white font-outfit">
                Kategori *
              </label>
              <Dropdown
                value={category}
                onChange={setCategory}
                placeholder="Pilih kategori"
                variant="form"
                options={[
                  'Potong rambut',
                  'Paket',
                  'Perawatan',
                  'Styling',
                  'Pewarnaan',
                ]}
              />
              <p className="text-[13px] text-text-muted font-outfit">
                Pilih kelompok layanan pada katalog booking.
              </p>
            </div>

            {/* Status Aktif */}
            <div className="flex items-center justify-between border-t border-border/60 pt-4 font-outfit">
              <div>
                <p className="text-[14px] font-bold text-white">Status aktif</p>
                <p className="text-[13px] text-text-muted mt-0.5">
                  Layanan aktif tersedia untuk booking di aplikasi pelanggan.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
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
                <span className={`text-[13px] font-bold ${isActive ? 'text-emerald-400' : 'text-zinc-400'}`}>
                  {isActive ? 'Aktif' : 'Nonaktif'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-border/60 font-outfit">
              <span className="text-[13px] text-text-muted">
                Periksa detail sebelum menyimpan.
              </span>
              <div className="flex items-center gap-3">
                <Link
                  href="/services"
                  className="px-5 py-2.5 rounded-xl bg-raised border border-border text-sm font-bold text-white hover:bg-border transition-colors cursor-pointer"
                >
                  Batal
                </Link>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary/90 text-sm font-bold text-white shadow-lg shadow-secondary/20 transition-all active:scale-95 cursor-pointer"
                >
                  {isEditMode ? 'Simpan perubahan' : 'Simpan layanan'}
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Kolom Kanan: Panduan */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-surface border border-border space-y-4 shadow-md font-outfit">
            <h3 className="text-base font-bold text-white">Panduan Pengisian</h3>
            <div className="space-y-3 text-sm text-text-muted">
              <div>
                <p className="font-semibold text-white">1. Kategori & Durasi</p>
                <p className="text-xs mt-0.5">
                  Durasi menentukan slot waktu antrean dan ketersediaan kapster pada sistem booking otomatis.
                </p>
              </div>
              <div className="border-t border-border/60 pt-3">
                <p className="font-semibold text-white">2. Penetapan Tarif</p>
                <p className="text-xs mt-0.5">
                  Tarif baru akan langsung aktif dan berlaku untuk seluruh pemesanan yang dibuat selanjutnya.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
