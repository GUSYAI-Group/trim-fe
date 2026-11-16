'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Info, Upload, Image as ImageIcon } from 'lucide-react';
import { Dropdown } from '@/components/ui';
import { useTrimStore } from '@/store/useTrimStore';

export default function ProductFormView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id'); // Menangkap ?id=... (contoh: ?id=pomade atau ?id=prd-1)
  const isEditMode = Boolean(editId);

  const products = useTrimStore((s) => s.products);
  const addProduct = useTrimStore((s) => s.addProduct);
  const updateProduct = useTrimStore((s) => s.updateProduct);

  // Form States
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Minyak Rambut');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('10');
  const [minStock, setMinStock] = useState('5');
  const [isActive, setIsActive] = useState(true);
  const [description, setDescription] = useState('');
  const [targetId, setTargetId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Systems Info States
  const [uuid, setUuid] = useState('Belum dibuat');
  const [createdAt, setCreatedAt] = useState('Belum dibuat');
  const [updatedAt, setUpdatedAt] = useState('Belum dibuat');

  // Auto-fill form jika masuk Mode Edit
  useEffect(() => {
    if (isEditMode && editId) {
      const found = products.find(
        (p) => p.rawId === editId || p.id === editId || p.id.toLowerCase() === editId.toLowerCase()
      );
      if (found) {
        setTargetId(found.id);
        setName(found.name);
        setCategory(found.category);
        setPrice(found.price.replace(/[^0-9]/g, ''));
        setStock(found.stock.toString());
        setMinStock(found.minStock.toString());
        setIsActive(found.isActive);
        setDescription(`${found.name} kualitas premium untuk perawatan rambut.`);
        setUuid(found.id.toUpperCase());
        setCreatedAt('14 Nov 2026, 08:00 WIB');
        setUpdatedAt('Hari ini');
      }
    }
  }, [isEditMode, editId, products]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Nama produk wajib diisi.');
      return;
    }

    const cleanPrice = parseInt(price.replace(/[^0-9]/g, ''), 10);
    if (isNaN(cleanPrice) || cleanPrice < 0) {
      setErrorMessage('Harga produk tidak boleh kosong atau negatif.');
      return;
    }

    const stockNum = parseInt(stock, 10);
    if (isNaN(stockNum) || stockNum < 0) {
      setErrorMessage('Stok produk harus berupa angka non-negatif.');
      return;
    }

    const minStockNum = parseInt(minStock, 10);
    if (isNaN(minStockNum) || minStockNum < 0) {
      setErrorMessage('Batas minimum stok harus berupa angka non-negatif.');
      return;
    }

    const formattedPrice = `Rp${cleanPrice.toLocaleString('id-ID')}`;
    const generatedRawId = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    if (isEditMode && targetId) {
      updateProduct(targetId, {
        name: name.trim(),
        category: category || 'Minyak Rambut',
        price: formattedPrice,
        stock: stockNum,
        minStock: minStockNum,
        isActive,
      });
    } else {
      addProduct({
        rawId: generatedRawId,
        name: name.trim(),
        category: category || 'Minyak Rambut',
        price: formattedPrice,
        stock: stockNum,
        minStock: minStockNum,
        isActive,
      });
    }

    router.push('/products');
  };

  return (
    <div className="space-y-6 pb-20 font-space-grotesk no-scrollbar selection:bg-secondary selection:text-white">
      {/* Breadcrumb & Header Dinamis */}
      <div className="space-y-1 font-outfit">
        <div className="flex items-center gap-2 text-xs md:text-[13px] text-text-muted">
          <Link href="/products" className="hover:text-white transition-colors">
            Produk
          </Link>
          <span>/</span>
          <span className="text-white font-medium">
            {isEditMode ? 'Edit Produk' : 'Tambah Produk'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div>
            <h1 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight">
              {isEditMode ? 'Edit Produk' : 'Tambah Produk'}
            </h1>
            <p className="text-text-muted text-sm md:text-base mt-1">
              {isEditMode
                ? `Perbarui informasi, harga, dan persediaan ${name || 'produk'}.`
                : 'Tambahkan produk ke katalog toko. Tanda * wajib diisi.'}
            </p>
          </div>

          <Link
            href="/products"
            className="bg-raised border border-border hover:bg-border text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all cursor-pointer w-fit shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke daftar</span>
          </Link>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-outfit text-sm">
          {errorMessage}
        </div>
      )}

      {/* Grid Content Utama */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Kolom Kiri: Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 md:p-8 rounded-2xl bg-surface border border-border space-y-6 shadow-md">
            <div className="flex justify-between items-center border-b border-border/60 pb-4">
              <div>
                <h2 className="text-[20px] font-bold text-white font-outfit">Informasi produk</h2>
                <p className="text-[14px] text-text-muted font-outfit mt-1">
                  Lengkapi data produk yang akan ditampilkan di katalog TRIM.
                </p>
              </div>
              <span className="text-[13px] text-text-muted font-outfit shrink-0">* Wajib diisi</span>
            </div>

            {/* Nama Produk */}
            <div className="space-y-1.5">
              <label className="block text-[14px] font-bold text-white font-outfit">
                Nama produk *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Pomade Water-based"
                required
                className="w-full bg-raised/60 border border-border/80 focus:border-secondary rounded-xl px-4 py-2.5 text-[14px] text-white placeholder:text-text-muted outline-none transition-colors font-outfit"
              />
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
                  'Minyak Rambut',
                  'Hair Spray',
                  'Powder',
                  'Hair Tonic',
                  'Serum',
                ]}
              />
            </div>

            {/* Harga & Stok */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[14px] font-bold text-white font-outfit">
                  Harga (Rp) *
                </label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="35000"
                  required
                  className="w-full bg-raised/60 border border-border/80 focus:border-secondary rounded-xl px-4 py-2.5 text-[14px] text-white placeholder:text-text-muted outline-none transition-colors font-outfit"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[14px] font-bold text-white font-outfit">
                  Stok saat ini *
                </label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="10"
                  min="0"
                  required
                  className="w-full bg-raised/60 border border-border/80 focus:border-secondary rounded-xl px-4 py-2.5 text-[14px] text-white placeholder:text-text-muted outline-none transition-colors font-outfit"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[14px] font-bold text-white font-outfit">
                  Batas min. stok *
                </label>
                <input
                  type="number"
                  value={minStock}
                  onChange={(e) => setMinStock(e.target.value)}
                  placeholder="5"
                  min="0"
                  required
                  className="w-full bg-raised/60 border border-border/80 focus:border-secondary rounded-xl px-4 py-2.5 text-[14px] text-white placeholder:text-text-muted outline-none transition-colors font-outfit"
                />
              </div>
            </div>

            {/* Deskripsi */}
            <div className="space-y-1.5">
              <label className="block text-[14px] font-bold text-white font-outfit">
                Deskripsi produk
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tuliskan manfaat, petunjuk pemakaian, dan keunggulan produk..."
                className="w-full bg-raised/60 border border-border/80 focus:border-secondary rounded-xl p-4 text-[14px] text-white placeholder:text-text-muted outline-none transition-colors font-outfit resize-none"
              />
            </div>

            {/* Status Aktif */}
            <div className="flex items-center justify-between border-t border-border/60 pt-4 font-outfit">
              <div>
                <p className="text-[14px] font-bold text-white">Status siap jual</p>
                <p className="text-[13px] text-text-muted mt-0.5">
                  Produk aktif dapat dipilih dan dijual langsung di kasir TRIM.
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
                {isEditMode ? 'Periksa kembali perubahan sebelum menyimpan.' : 'Periksa detail sebelum menyimpan.'}
              </span>
              <div className="flex items-center gap-3">
                <Link
                  href="/products"
                  className="px-5 py-2.5 rounded-xl bg-raised border border-border text-sm font-bold text-white hover:bg-border transition-colors cursor-pointer"
                >
                  Batal
                </Link>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary/90 text-sm font-bold text-white shadow-lg shadow-secondary/20 transition-all active:scale-95 cursor-pointer"
                >
                  {isEditMode ? 'Simpan perubahan' : 'Simpan produk'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan Sidebar */}
        <div className="space-y-6 font-outfit">
          {/* Panduan Pengisian */}
          <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
            <div className="flex items-center gap-2 text-secondary font-bold text-[15px] border-b border-border/60 pb-3">
              <Info className="w-5 h-5 text-secondary shrink-0" />
              <span>Panduan pengisian</span>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-white text-[14px]">Perhitungan status stok</h4>
              <p className="text-text-muted text-[13px] leading-relaxed">
                Status stok akan otomatis berstatus Aman jika stok &gt; batas minimum, Menipis jika ≤ batas minimum, atau Habis jika 0.
              </p>
            </div>
          </div>

          {/* Informasi Sistem */}
          <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
            <div>
              <h4 className="font-bold text-white text-[14px]">Informasi sistem</h4>
              <p className="text-text-muted text-[13px] mt-0.5">Otomatis oleh sistem • hanya baca</p>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-text-muted text-[13px]">ID produk</p>
                <p className="font-bold text-white text-[14px] break-all mt-0.5">{uuid}</p>
              </div>

              <div>
                <p className="text-text-muted text-[13px]">Tanggal dibuat</p>
                <p className="font-bold text-white text-[14px] mt-0.5">{createdAt}</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
