'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ChevronDown, Info, Upload, Image as ImageIcon } from 'lucide-react';

// Data Mockup Lengkap untuk 6 Produk (Match Tabel Katalog Produk)
const DUMMY_PRODUCTS: Record<
  string,
  {
    name: string;
    category: string;
    price: string;
    stock: string;
    minStock: string;
    isActive: boolean;
    description: string;
    uuid: string;
    createdAt: string;
    updatedAt: string;
  }
> = {
  'pomade': {
    name: 'Pomade',
    category: 'Minyak Rambut',
    price: '35000',
    stock: '12',
    minStock: '5',
    isActive: true,
    description: 'Pomade dengan formula ringan dan tahan lama, cocok untuk semua jenis rambut. Memberikan hasil rambut terlihat basah rapi, berkilau, dan mudah ditata.',
    uuid: 'UUID dari sistem',
    createdAt: 'Dikelola sistem',
    updatedAt: 'Dikelola sistem',
  },
  'hair-spray': {
    name: 'Hair Spray',
    category: 'Hair Spray',
    price: '45000',
    stock: '15',
    minStock: '5',
    isActive: true,
    description: 'Hair spray dengan daya kunci tinggi untuk menjaga tatanan rambut tetap maksimal sepanjang hari.',
    uuid: 'PRD-77B21C90-891A',
    createdAt: 'Dikelola sistem',
    updatedAt: 'Dikelola sistem',
  },
  'hair-powder': {
    name: 'Hair Powder',
    category: 'Powder',
    price: '50000',
    stock: '0',
    minStock: '5',
    isActive: true,
    description: 'Bedak penataan rambut untuk memberikan volume ekstra dan efek matte natural tanpa rasa lengket.',
    uuid: 'PRD-34E98D12-55C4',
    createdAt: 'Dikelola sistem',
    updatedAt: 'Dikelola sistem',
  },
  'hair-tonic': {
    name: 'Hair Tonic',
    category: 'Hair Tonic',
    price: '65000',
    stock: '10',
    minStock: '5',
    isActive: true,
    description: 'Nutrisi kulit kepala untuk memperkuat akar rambut, mengurangi kerontokan, dan memberikan sensasi segar.',
    uuid: 'PRD-12A55F67-99E1',
    createdAt: 'Dikelola sistem',
    updatedAt: 'Dikelola sistem',
  },
  'clay': {
    name: 'Clay',
    category: 'Minyak Rambut',
    price: '30000',
    stock: '3',
    minStock: '5',
    isActive: true,
    description: 'Clay pembuat tekstur rambut dengan daya pegang kuat dan hasil akhir natural matte.',
    uuid: 'PRD-66C43D88-11A0',
    createdAt: 'Dikelola sistem',
    updatedAt: 'Dikelola sistem',
  },
  'vitamin': {
    name: 'Vitamin',
    category: 'Serum',
    price: '55000',
    stock: '9',
    minStock: '5',
    isActive: true,
    description: 'Serum vitamin rambut kaya kelembapan untuk menutrisi rambut kering dan rusak agar kembali lembut.',
    uuid: 'PRD-90E11B34-44F2',
    createdAt: 'Dikelola sistem',
    updatedAt: 'Dikelola sistem',
  },
};

export default function ProductFormView() {
  const searchParams = useSearchParams();
  const editId = searchParams.get('id'); // Menangkap ?id=... (contoh: ?id=pomade)
  const isEditMode = Boolean(editId);

  // Form States
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [minStock, setMinStock] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [description, setDescription] = useState('');

  // Systems Info States
  const [uuid, setUuid] = useState('Belum dibuat');
  const [createdAt, setCreatedAt] = useState('Belum dibuat');
  const [updatedAt, setUpdatedAt] = useState('Belum dibuat');

  // Auto-fill form jika masuk Mode Edit
  useEffect(() => {
    if (isEditMode && editId && DUMMY_PRODUCTS[editId]) {
      const data = DUMMY_PRODUCTS[editId];
      setName(data.name);
      setCategory(data.category);
      setPrice(data.price);
      setStock(data.stock);
      setMinStock(data.minStock);
      setIsActive(data.isActive);
      setDescription(data.description);
      setUuid(data.uuid);
      setCreatedAt(data.createdAt);
      setUpdatedAt(data.updatedAt);
    } else {
      // Reset form jika Mode Tambah
      setName('');
      setCategory('');
      setPrice('');
      setStock('');
      setMinStock('');
      setIsActive(true);
      setDescription('');
      setUuid('Belum dibuat');
      setCreatedAt('Belum dibuat');
      setUpdatedAt('Belum dibuat');
    }
  }, [isEditMode, editId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      isEditMode
        ? `Perubahan produk "${name}" berhasil disimpan!`
        : `Produk "${name}" berhasil ditambahkan!`
    );
  };

  return (
    <div className="space-y-6 pb-20 font-space-grotesk no-scrollbar selection:bg-secondary selection:text-white">
      {/* Breadcrumb & Header Dinamis */}
      <div className="space-y-1 font-outfit">
        <div className="flex items-center gap-2 text-xs text-text-muted">
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
            <p className="text-text-muted text-xs md:text-sm mt-0.5">
              {isEditMode
                ? `Perbarui informasi, harga, dan persediaan ${name || 'produk'}.`
                : 'Tambahkan produk ke katalog toko. Tanda * wajib diisi.'}
            </p>
          </div>

          <Link
            href="/products"
            className="bg-raised border border-border hover:bg-border text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke daftar</span>
          </Link>
        </div>
      </div>

      {/* Top Banner Warning Info */}
      <div className="p-4 rounded-2xl bg-[#1c120c] border border-secondary/30 flex items-start gap-3 shadow-md font-outfit">
        <Info className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
        <div className="space-y-0.5 text-xs">
          <h4 className="font-bold text-secondary">
            {isEditMode
              ? 'Perubahan stok dicatat sebagai penyesuaian persediaan'
              : 'Harga dan persediaan harus nonnegatif'}
          </h4>
          <p className="text-text-muted leading-relaxed">
            {isEditMode
              ? 'Aturan rancangan: jika stok diubah, perubahan perlu dicatat sebagai adjustment pada INVENTORY_TRANSACTIONS. Belum ada perubahan yang disimpan.'
              : 'Gunakan harga unit decimal ≥ 0, serta stok dan ambang minimum berupa bilangan bulat ≥ 0. Foto dan deskripsi bersifat opsional.'}
          </p>
        </div>
      </div>

      {/* Main Form Grid */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Kolom Kiri Utama */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 md:p-8 rounded-2xl bg-surface border border-border space-y-6 shadow-md font-outfit">
            <div className="flex justify-between items-center border-b border-border/60 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">Informasi produk</h2>
                <p className="text-xs text-text-muted mt-0.5">
                  {isEditMode
                    ? `Perbarui detail ${name || 'produk'} sesuai katalog toko.`
                    : 'Lengkapi detail produk yang akan ditampilkan kepada pelanggan.'}
                </p>
              </div>
              <span className="text-[11px] text-text-muted">* Wajib diisi</span>
            </div>

            {/* Nama Produk */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-white">
                Nama produk *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Pomade"
                required
                className="w-full bg-raised/60 border border-border/80 focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-text-muted outline-none transition-colors"
              />
              <p className="text-[11px] text-text-muted">
                Gunakan nama yang mudah dikenali pelanggan.
              </p>
            </div>

            {/* Kategori */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-white">
                Kategori *
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full appearance-none bg-raised/60 border border-border/80 focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-white outline-none transition-colors cursor-pointer"
                >
                  <option value="" disabled className="bg-surface text-text-muted">
                    Pilih kategori produk
                  </option>
                  <option value="Minyak Rambut" className="bg-surface text-white">
                    Minyak Rambut
                  </option>
                  <option value="Hair Spray" className="bg-surface text-white">
                    Hair Spray
                  </option>
                  <option value="Powder" className="bg-surface text-white">
                    Powder
                  </option>
                  <option value="Hair Tonic" className="bg-surface text-white">
                    Hair Tonic
                  </option>
                  <option value="Serum" className="bg-surface text-white">
                    Serum
                  </option>
                </select>
                <ChevronDown className="w-4 h-4 text-text-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <p className="text-[11px] text-text-muted">
                Pilihan: Minyak Rambut, Hair Spray, Powder, Hair Tonic, Serum.
              </p>
            </div>

            {/* Harga, Stok, & Ambang Minimum */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Harga Unit */}
              <div className="space-y-1.5 sm:col-span-1">
                <label className="block text-xs font-bold text-white">
                  Harga unit
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-xs text-text-muted pointer-events-none">
                    Rp
                  </span>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Contoh: 35000"
                    className="w-full bg-raised/60 border border-border/80 focus:border-secondary rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-text-muted outline-none transition-colors"
                  />
                </div>
                <p className="text-[10px] text-text-muted leading-tight">
                  Harga dalam Rupiah • nilai decimal nonnegatif, contoh: 35000,50.
                </p>
              </div>

              {/* Stok Awal / Stok Saat Ini */}
              <div className="space-y-1.5 sm:col-span-1">
                <label className="block text-xs font-bold text-white">
                  {isEditMode ? 'Stok saat ini' : 'Stok awal'}
                </label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="Contoh: 12"
                    className="w-full bg-raised/60 border border-border/80 focus:border-secondary rounded-xl pl-4 pr-12 py-2.5 text-xs text-white placeholder:text-text-muted outline-none transition-colors"
                  />
                  <span className="absolute right-4 text-xs text-text-muted pointer-events-none">
                    unit
                  </span>
                </div>
                <p className="text-[10px] text-text-muted">Bilangan bulat ≥ 0.</p>
              </div>

              {/* Ambang Stok Minimum */}
              <div className="space-y-1.5 sm:col-span-1">
                <label className="block text-xs font-bold text-white">
                  Ambang stok minimum
                </label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    value={minStock}
                    onChange={(e) => setMinStock(e.target.value)}
                    placeholder="Contoh: 5"
                    className="w-full bg-raised/60 border border-border/80 focus:border-secondary rounded-xl pl-4 pr-12 py-2.5 text-xs text-white placeholder:text-text-muted outline-none transition-colors"
                  />
                  <span className="absolute right-4 text-xs text-text-muted pointer-events-none">
                    unit
                  </span>
                </div>
                <p className="text-[10px] text-text-muted">Bilangan bulat ≥ 0.</p>
              </div>
            </div>

            {/* Status Aktif */}
            <div className="flex items-center justify-between border-t border-border/60 pt-4">
              <div>
                <p className="text-xs font-bold text-white">Status aktif</p>
                <p className="text-[11px] text-text-muted mt-0.5">
                  Produk aktif tersedia di katalog toko.
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
                <span className="text-xs font-bold text-emerald-400">
                  {isActive ? 'Aktif' : 'Nonaktif'}
                </span>
              </div>
            </div>

            {/* Deskripsi */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-white">Deskripsi</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Masukkan deskripsi produk..."
                className="w-full bg-raised/60 border border-border/80 focus:border-secondary rounded-xl p-4 text-xs text-white placeholder:text-text-muted outline-none transition-colors resize-none"
              />
              <p className="text-[11px] text-text-muted">
                Boleh dikosongkan. Disimpan sebagai description.
              </p>
            </div>

            {/* Foto Produk (Hanya tampil di Mode Tambah pada Kolom Kiri) */}
            {!isEditMode && (
              <div className="space-y-2 border-t border-border/60 pt-4">
                <label className="block text-xs font-bold text-white">Foto produk</label>
                <div className="p-8 border-2 border-dashed border-border/80 hover:border-secondary/50 rounded-2xl bg-raised/30 flex flex-col items-center justify-center text-center space-y-3 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-raised border border-border flex items-center justify-center text-text-muted">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-text-muted">Belum ada foto diunggah</p>
                    <label className="cursor-pointer inline-block pt-1">
                      <input type="file" className="hidden" />
                      <div className="px-4 py-2 bg-raised hover:bg-border border border-border rounded-xl text-xs font-bold text-white flex items-center gap-2 transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Pilih foto</span>
                      </div>
                    </label>
                  </div>
                  <p className="text-[10px] text-text-muted">Format JPG atau PNG</p>
                </div>
                <p className="text-[11px] text-text-muted">
                  URL foto disimpan pada image_url setelah unggahan berhasil.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-border/60 font-outfit">
              <span className="text-[11px] text-text-muted">
                {isEditMode ? 'Periksa kembali perubahan produk sebelum menyimpan.' : 'Periksa detail sebelum menyimpan.'}
              </span>
              <div className="flex items-center gap-3">
                <Link
                  href="/products"
                  className="px-4 py-2 rounded-xl bg-raised border border-border text-xs font-bold text-white hover:bg-border transition-colors cursor-pointer"
                >
                  Batal
                </Link>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/90 text-xs font-bold text-white shadow-lg shadow-secondary/20 transition-all active:scale-95 cursor-pointer"
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
          <div className="p-6 rounded-2xl bg-surface border border-border space-y-4 text-xs">
            <div className="flex items-center gap-2 text-secondary font-bold text-sm border-b border-border/60 pb-3">
              <Info className="w-4 h-4 text-secondary shrink-0" />
              <span>Panduan pengisian</span>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-white">Harga dalam rupiah</h4>
              <p className="text-text-muted leading-relaxed">
                {isEditMode
                  ? 'Harga tidak boleh negatif. Tarif ini ditampilkan di katalog untuk penjualan baru.'
                  : 'Harga tidak boleh negatif. Gunakan nilai decimal nonnegatif, contoh: 35000,50.'}
              </p>
            </div>

            {!isEditMode && (
              <>
                <hr className="border-border/50" />
                <div className="space-y-1">
                  <h4 className="font-bold text-white">Persediaan</h4>
                  <p className="text-text-muted leading-relaxed">
                    Stok awal dan ambang minimum menggunakan bilangan bulat ≥ 0.
                  </p>
                </div>
              </>
            )}

            <hr className="border-border/50" />

            <div className="space-y-1.5">
              <h4 className="font-bold text-white">Kategori yang tersedia</h4>
              <ul className="space-y-1 text-text-muted pl-3">
                <li className="list-disc text-secondary"><span className="text-text-muted">Minyak Rambut</span></li>
                <li className="list-disc text-secondary"><span className="text-text-muted">Hair Spray</span></li>
                <li className="list-disc text-secondary"><span className="text-text-muted">Powder</span></li>
                <li className="list-disc text-secondary"><span className="text-text-muted">Hair Tonic</span></li>
                <li className="list-disc text-secondary"><span className="text-text-muted">Serum</span></li>
              </ul>
            </div>
          </div>

          {/* Foto Produk di Mode Edit */}
          {isEditMode && (
            <div className="p-6 rounded-2xl bg-surface border border-border space-y-3 text-xs">
              <div className="space-y-0.5">
                <h4 className="font-bold text-white">Foto produk</h4>
                <p className="text-text-muted text-[11px]">Opsional • Image_url</p>
              </div>

              <div className="p-6 border-2 border-dashed border-border/80 rounded-2xl bg-raised/30 flex flex-col items-center justify-center text-center space-y-2">
                <div className="w-8 h-8 rounded-lg bg-raised border border-border flex items-center justify-center text-text-muted">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <p className="text-[11px] text-text-muted">Foto belum tersedia</p>
                <label className="cursor-pointer inline-block pt-1">
                  <input type="file" className="hidden" />
                  <div className="px-3 py-1.5 bg-raised hover:bg-border border border-border rounded-xl text-[11px] font-bold text-white flex items-center gap-1.5 transition-colors">
                    <Upload className="w-3 h-3" />
                    <span>Pilih foto</span>
                  </div>
                </label>
                <p className="text-[10px] text-text-muted">Format JPG atau PNG</p>
              </div>

              <p className="text-[11px] text-text-muted">
                URL foto disimpan pada image_url setelah unggahan berhasil.
              </p>
            </div>
          )}

          {/* Card Status Tampil di Menu */}
          <div className="p-6 rounded-2xl bg-surface border border-border space-y-2 text-xs">
            <h4 className="font-bold text-white">Siap tampil di menu</h4>
            <p className="text-text-muted leading-relaxed">
              Aktifkan produk agar tampil di katalog. Nonaktifkan jika produk belum siap ditawarkan.
            </p>
          </div>

          {/* Informasi Sistem */}
          <div className="p-6 rounded-2xl bg-surface border border-border space-y-4 text-xs">
            <div>
              <h4 className="font-bold text-white">Informasi sistem</h4>
              <p className="text-text-muted text-[11px] mt-0.5">Otomatis oleh sistem • hanya baca</p>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-text-muted text-[11px]">ID produk (UUID)</p>
                <p className="font-bold text-white break-all mt-0.5">{uuid}</p>
              </div>

              <div>
                <p className="text-text-muted text-[11px]">Tanggal dibuat</p>
                <p className="font-bold text-white mt-0.5">{createdAt}</p>
              </div>

              <div>
                <p className="text-text-muted text-[11px]">Terakhir diperbarui</p>
                <p className="font-bold text-white mt-0.5">{updatedAt}</p>
              </div>
            </div>

            <p className="text-[10px] text-text-muted leading-relaxed border-t border-border/50 pt-3">
              {isEditMode
                ? 'ID tidak diubah. Waktu pembaruan dikelola sistem setelah perubahan disimpan.'
                : 'UUID dan waktu otomatis belum dibuat. Sistem mengisinya setelah produk berhasil disimpan.'}
            </p>
          </div>

          {/* Aturan Status Stok */}
          <div className="p-4 rounded-2xl bg-[#1c120c] border border-secondary/20 space-y-1 shadow-md text-xs">
            <h4 className="font-bold text-secondary">Aturan status stok</h4>
            <p className="text-text-muted text-[11px] leading-relaxed">
              Aman: stok &gt; ambang minimum. Menipis: 0 &lt; stok ≤ ambang. Habis: stok = 0. Status ini dihitung, bukan diisi manual.
            </p>
          </div>

          {/* Sebelum Menyimpan */}
          <div className="p-6 rounded-2xl bg-surface border border-border space-y-2 text-xs">
            <h4 className="font-bold text-white">
              {isEditMode ? 'Sebelum menyimpan perubahan' : 'Sebelum membuat produk'}
            </h4>
            <p className="text-text-muted leading-relaxed">
              {isEditMode
                ? 'Periksa kembali harga, stok, dan ambang minimum. Perubahan hanya diterapkan setelah Simpan perubahan.'
                : 'Periksa data produk sebelum menyimpan. Produk belum dibuat; foto dan deskripsi boleh dikosongkan.'}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}