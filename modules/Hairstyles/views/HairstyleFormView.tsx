'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Upload, AlertCircle, Image as ImageIcon } from 'lucide-react';

// Data Mockup untuk Auto-Fill Mode Edit
const DUMMY_HAIRSTYLE: Record<
  string,
  {
    name: string;
    description: string;
    hairType: string;
    careLevel: string;
    imageUrl: string;
    imageName: string;
    status: 'aktif' | 'nonaktif';
    uuid: string;
  }
> = {
  'skin-fade': {
    name: 'Skin fade',
    description: 'Potongan rapi dengan transisi halus dari kulit ke rambut bagian atas.',
    hairType: 'Lurus',
    careLevel: '2',
    imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=300',
    imageName: 'skin-fade.jpg',
    status: 'aktif',
    uuid: '7ad26b3e-9f12-4ca8-b0d3-82f5b157c490',
  },
};

export default function HairstyleFormView() {
  const searchParams = useSearchParams();
  const editId = searchParams.get('id'); // Menangkap query ?id=... (contoh: ?id=skin-fade)
  const isEditMode = Boolean(editId);

  // Form States
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [hairType, setHairType] = useState('');
  const [careLevel, setCareLevel] = useState('');
  const [status, setStatus] = useState<'aktif' | 'nonaktif'>('aktif');
  const [imageName, setImageName] = useState('');
  const [uuid, setUuid] = useState('');

  // Pemetaan Bentuk Wajah States
  const [faceShapes, setFaceShapes] = useState({
    oval: false,
    bulat: false,
    persegi: false,
    lonjong: false,
    berlian: false,
    segitiga: false,
  });

  // Validation Error States
  const [hasErrors, setHasErrors] = useState(false);
  const [errors, setErrors] = useState<{
    imageUrl?: string;
    name?: string;
    careLevel?: string;
  }>({});

  // Auto-fill form jika masuk Mode Edit
  useEffect(() => {
    if (isEditMode && editId && DUMMY_HAIRSTYLE[editId]) {
      const data = DUMMY_HAIRSTYLE[editId];
      setName(data.name);
      setDescription(data.description);
      setHairType(data.hairType);
      setCareLevel(data.careLevel);
      setImageUrl(data.imageUrl);
      setImageName(data.imageName);
      setStatus(data.status);
      setUuid(data.uuid);
    }
  }, [isEditMode, editId]);

  // Handler Submit dengan Validasi Persis Figma
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    // 1. Validasi URL Gambar
    if (imageUrl && !imageUrl.startsWith('https://')) {
      newErrors.imageUrl = 'URL gambar tidak valid. Gunakan alamat lengkap seperti https://domain.com/foto.jpg';
    }

    // 2. Validasi Nama Model
    if (!name.trim()) {
      newErrors.name = 'Nama model wajib diisi.';
    }

    // 3. Validasi Level Perawatan (Harus Bilangan Bulat)
    if (careLevel && (!Number.isInteger(Number(careLevel)) || Number(careLevel) <= 0 || careLevel.includes('.'))) {
      newErrors.careLevel = `Level perawatan harus bilangan bulat, bukan ${careLevel}.`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setHasErrors(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setErrors({});
      setHasErrors(false);
      alert(isEditMode ? 'Model rambut berhasil diperbarui!' : 'Model rambut berhasil disimpan!');
    }
  };

  const toggleFaceShape = (shape: keyof typeof faceShapes) => {
    setFaceShapes((prev) => ({ ...prev, [shape]: !prev[shape] }));
  };

  return (
    <div className="space-y-6 pb-20 font-space-grotesk no-scrollbar selection:bg-secondary selection:text-white">
      {/* Breadcrumb & Top Bar */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs text-text-muted font-outfit">
          <Link href="/hairstyles" className="hover:text-white transition-colors">
            Kelola Model Rambut
          </Link>
          <span>/</span>
          <span className="text-white font-medium">
            {isEditMode ? 'Edit Model Rambut' : 'Tambah Model Rambut'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div>
            <h1 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight font-outfit">
              {isEditMode ? 'Edit Model Rambut' : 'Tambah Model Rambut'}
            </h1>
            <p className="text-text-muted text-xs md:text-sm mt-0.5 font-outfit">
              {isEditMode
                ? `Perbarui foto referensi, karakteristik potongan, dan status aktif ${name || 'model rambut'}.`
                : 'Lengkapi foto referensi dan karakteristik potongan untuk menambah model ke katalog.'}
            </p>
          </div>

          <Link href="/hairstyles">
            <button className="bg-raised border border-border hover:bg-border text-white px-4 py-2.5 rounded-xl text-xs font-bold font-outfit flex items-center gap-2 transition-all cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke daftar</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Top Banner Error Validation (Tampilan 3 Figma) */}
      {hasErrors && (
        <div className="p-4 rounded-2xl bg-[#2a1215] border border-rose-500/40 flex items-start gap-3 shadow-lg font-outfit">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-rose-400 text-sm">Model rambut belum dapat disimpan</h4>
            <p className="text-rose-200/80 font-medium">Periksa kembali field yang ditandai.</p>
            <p className="text-text-muted text-[11px] leading-relaxed">
              3 field perlu diperbaiki: Nama model, URL gambar, dan Level perawatan. Data input tetap dipertahankan. Perbaiki field yang ditandai, lalu coba simpan kembali.
            </p>
          </div>
        </div>
      )}

      {/* Main Form Grid */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Kolom Kiri Utama */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Informasi Model Rambut */}
          <div className="p-6 md:p-8 rounded-2xl bg-surface border border-border space-y-6 shadow-md">
            <div>
              <h2 className="text-lg font-bold text-white font-outfit">Informasi model rambut</h2>
              <p className="text-xs text-text-muted font-outfit mt-0.5">
                Data yang tampil pada katalog. Tanda * wajib diisi pada form ini.
              </p>
            </div>

            {/* Upload Foto Referensi */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-white font-outfit">
                Foto referensi <span className="text-secondary">*</span>
              </label>

              {isEditMode && imageName ? (
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-raised border border-border/80 overflow-hidden shrink-0 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-white font-outfit">{imageName}</p>
                    <label className="cursor-pointer inline-block">
                      <input type="file" className="hidden" />
                      <div className="px-3.5 py-1.5 bg-raised hover:bg-border border border-border rounded-xl text-xs font-bold text-white font-outfit flex items-center gap-1.5 transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Ganti gambar</span>
                      </div>
                    </label>
                    <p className="text-[11px] text-text-muted font-outfit">
                      Foto referensi saat ini tetap digunakan jika tidak diganti.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-raised/60 border border-border/80 flex flex-col items-center justify-center shrink-0 text-text-muted">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-white font-outfit">Unggah referensi model rambut</p>
                    <label className="cursor-pointer inline-block">
                      <input type="file" className="hidden" />
                      <div className="px-3.5 py-1.5 bg-raised hover:bg-border border border-border rounded-xl text-xs font-bold text-white font-outfit flex items-center gap-1.5 transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Unggah gambar</span>
                      </div>
                    </label>
                    <p className="text-[11px] text-text-muted font-outfit">
                      Gunakan foto yang memperlihatkan potongan dengan jelas.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* URL Gambar */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-white font-outfit">
                {isEditMode ? 'URL gambar pengganti' : 'Atau gunakan URL gambar'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className={`w-full bg-raised/60 border rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-text-muted outline-none transition-colors font-outfit ${
                    errors.imageUrl ? 'border-rose-500 pr-10' : 'border-border/80 focus:border-secondary'
                  }`}
                />
                {errors.imageUrl && (
                  <AlertCircle className="w-4 h-4 text-rose-400 absolute right-3 top-1/2 -translate-y-1/2" />
                )}
              </div>
              {errors.imageUrl ? (
                <p className="text-[11px] text-rose-400 font-outfit font-medium">{errors.imageUrl}</p>
              ) : (
                <p className="text-[11px] text-text-muted font-outfit">
                  Unggahan atau URL gambar akan mengisi image_url.
                </p>
              )}
            </div>

            {/* Nama Model */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-white font-outfit">
                Nama model <span className="text-secondary">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama model rambut"
                  className={`w-full bg-raised/60 border rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-text-muted outline-none transition-colors font-outfit ${
                    errors.name ? 'border-rose-500 pr-10' : 'border-border/80 focus:border-secondary'
                  }`}
                />
                {errors.name && (
                  <AlertCircle className="w-4 h-4 text-rose-400 absolute right-3 top-1/2 -translate-y-1/2" />
                )}
              </div>
              {errors.name ? (
                <p className="text-[11px] text-rose-400 font-outfit font-medium">{errors.name}</p>
              ) : (
                <p className="text-[11px] text-text-muted font-outfit">
                  Gunakan nama yang mudah dikenali pelanggan.
                </p>
              )}
            </div>

            {/* Deskripsi */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-white font-outfit">Deskripsi</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Jelaskan karakteristik potongan rambut"
                className="w-full bg-raised/60 border border-border/80 focus:border-secondary rounded-xl p-4 text-xs text-white placeholder:text-text-muted outline-none transition-colors font-outfit resize-none"
              />
              <p className="text-[11px] text-text-muted font-outfit">
                Jelaskan bentuk potongan dan karakteristik utamanya.
              </p>
            </div>

            {/* Tipe Rambut & Level Perawatan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-white font-outfit">Tipe rambut</label>
                <input
                  type="text"
                  value={hairType}
                  onChange={(e) => setHairType(e.target.value)}
                  placeholder="Contoh: Lurus"
                  className="w-full bg-raised/60 border border-border/80 focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-text-muted outline-none transition-colors font-outfit"
                />
                <p className="text-[11px] text-text-muted font-outfit">Contoh: Lurus, Bergelombang, atau Keriting.</p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-white font-outfit">Level perawatan</label>
                <div className="relative">
                  <input
                    type="text"
                    value={careLevel}
                    onChange={(e) => setCareLevel(e.target.value)}
                    placeholder="Masukkan bilangan bulat"
                    className={`w-full bg-raised/60 border rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-text-muted outline-none transition-colors font-outfit ${
                      errors.careLevel ? 'border-rose-500 pr-10' : 'border-border/80 focus:border-secondary'
                    }`}
                  />
                  {errors.careLevel && (
                    <AlertCircle className="w-4 h-4 text-rose-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  )}
                </div>
                {errors.careLevel ? (
                  <p className="text-[11px] text-rose-400 font-outfit font-medium">{errors.careLevel}</p>
                ) : (
                  <p className="text-[11px] text-text-muted font-outfit">
                    Bilangan bulat; skala dan rentang level belum ditentukan.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Card 2: Pemetaan Bentuk Wajah */}
          <div className="p-6 md:p-8 rounded-2xl bg-surface border border-border space-y-4 shadow-md font-outfit">
            <div>
              <h2 className="text-lg font-bold text-white">Pemetaan bentuk wajah</h2>
              <p className="text-xs text-text-muted mt-0.5">Rancangan saja • tidak wajib dan tidak disimpan</p>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              {(['oval', 'bulat', 'persegi', 'lonjong', 'berlian', 'segitiga'] as const).map((shape) => (
                <button
                  type="button"
                  key={shape}
                  onClick={() => toggleFaceShape(shape)}
                  className={`px-3.5 py-2 rounded-xl border text-xs font-medium capitalize flex items-center gap-2 cursor-pointer transition-all ${
                    faceShapes[shape]
                      ? 'bg-secondary/10 border-secondary text-secondary'
                      : 'bg-raised/40 border-border/80 text-text-muted hover:text-white'
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                      faceShapes[shape] ? 'border-secondary bg-secondary' : 'border-text-muted'
                    }`}
                  >
                    {faceShapes[shape] && <div className="w-1.5 h-1.5 bg-white rounded-sm" />}
                  </div>
                  <span>{shape}</span>
                </button>
              ))}
            </div>

            <p className="text-[11px] text-text-muted leading-relaxed pt-2">
              Relasi HAIRSTYLES-FACE_SHAPES M:N belum memiliki tabel penghubung. Pilihan di atas hanya contoh rancangan, bukan data tersimpan.
            </p>
          </div>
        </div>

        {/* Kolom Kanan Sidebar */}
        <div className="space-y-6 font-outfit">
          {/* Status Model */}
          <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white">Status model</h3>
              <p className="text-xs text-text-muted mt-0.5">
                {isEditMode ? `${name || 'Model'} saat ini ${status}.` : 'Pilih status awal model rambut.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStatus('aktif')}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  status === 'aktif'
                    ? 'bg-secondary/10 border-secondary text-secondary shadow-sm'
                    : 'bg-raised/40 border-border text-text-muted hover:text-white'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                    status === 'aktif' ? 'border-secondary bg-secondary' : 'border-text-muted'
                  }`}
                >
                  {status === 'aktif' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <span>Aktif</span>
              </button>

              <button
                type="button"
                onClick={() => setStatus('nonaktif')}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  status === 'nonaktif'
                    ? 'bg-rose-950/30 border-rose-500/50 text-rose-400 shadow-sm'
                    : 'bg-raised/40 border-border text-text-muted hover:text-white'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                    status === 'nonaktif' ? 'border-rose-400 bg-rose-400' : 'border-text-muted'
                  }`}
                >
                  {status === 'nonaktif' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <span>Nonaktif</span>
              </button>
            </div>

            <p className="text-[11px] text-text-muted leading-relaxed">
              Model aktif dapat digunakan untuk rekomendasi AI. Model nonaktif tidak ditampilkan pada rekomendasi.
            </p>
          </div>

          {/* Informasi Sistem */}
          <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white">Informasi sistem</h3>
              <p className="text-xs text-text-muted mt-0.5">
                {isEditMode ? 'Identitas model • hanya baca' : 'Diisi otomatis, bukan bagian dari form.'}
              </p>
            </div>

            <div className="space-y-1.5">
              <p className="text-[11px] text-text-muted">ID model (UUID)</p>
              <p className="text-xs font-bold text-white break-all">
                {isEditMode ? uuid : 'Dibuat setelah disimpan'}
              </p>
              {isEditMode && <p className="text-[10px] text-text-muted">Contoh ID model • tidak dapat diedit.</p>}
            </div>
          </div>

          {/* Banner Info Bawah (Cokelat Figma) */}
          <div className="p-4 rounded-2xl bg-[#1c120c] border border-secondary/20 space-y-1 shadow-md">
            <h4 className="text-xs font-bold text-secondary">
              {isEditMode ? 'Perubahan model' : 'Sebelum menyimpan'}
            </h4>
            <p className="text-[11px] text-text-muted leading-relaxed">
              {isEditMode
                ? 'Perubahan baru diterapkan setelah disimpan. Simpan perubahan hanya memperbarui atribut model, bukan pemetaan wajah.'
                : 'Pastikan nama dan foto referensi terisi. Simpan model hanya menyimpan atribut model, bukan pemetaan wajah.'}
            </p>
          </div>
        </div>

        {/* Action Controls Footer */}
        <div className="lg:col-span-3 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/60 font-outfit">
          <p className="text-xs text-text-muted">
            {hasErrors
              ? 'Perbaiki 3 field yang ditandai, lalu simpan kembali. Data input tetap dipertahankan, Model belum dibuat.'
              : 'Lengkapi nama dan foto referensi sebelum menyimpan.'}
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link href="/hairstyles" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-raised border border-border text-xs font-bold text-white hover:bg-border transition-colors cursor-pointer"
              >
                Batal
              </button>
            </Link>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary/90 text-xs font-bold text-white shadow-lg shadow-secondary/20 transition-all active:scale-95 cursor-pointer"
            >
              {isEditMode ? 'Simpan perubahan' : 'Simpan model'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}