'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit3, Package, CheckCircle2, AlertTriangle, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dropdown } from '@/components/ui';

interface ProductItem {
  id: string;
  rawId: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  minStock: number;
  stockStatus: 'Aman' | 'Menipis' | 'Habis';
  isActive: boolean;
}

const PRODUCTS_DATA: ProductItem[] = [
  { id: 'prd-1', rawId: 'pomade', name: 'Pomade', category: 'Minyak Rambut', price: 'Rp35.000', stock: 12, minStock: 5, stockStatus: 'Aman', isActive: true },
  { id: 'prd-2', rawId: 'hair-spray', name: 'Hair Spray', category: 'Hair Spray', price: 'Rp45.000', stock: 15, minStock: 5, stockStatus: 'Aman', isActive: true },
  { id: 'prd-3', rawId: 'hair-powder', name: 'Hair Powder', category: 'Powder', price: 'Rp50.000', stock: 0, minStock: 5, stockStatus: 'Habis', isActive: true },
  { id: 'prd-4', rawId: 'hair-tonic', name: 'Hair Tonic', category: 'Hair Tonic', price: 'Rp65.000', stock: 10, minStock: 5, stockStatus: 'Aman', isActive: true },
  { id: 'prd-5', rawId: 'clay', name: 'Clay', category: 'Minyak Rambut', price: 'Rp30.000', stock: 3, minStock: 5, stockStatus: 'Menipis', isActive: true },
  { id: 'prd-6', rawId: 'vitamin', name: 'Vitamin', category: 'Serum', price: 'Rp55.000', stock: 9, minStock: 5, stockStatus: 'Aman', isActive: true },
];

export default function ProductsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua kategori');
  const [selectedStockStatus, setSelectedStockStatus] = useState('Semua status stok');
  const [selectedActiveStatus, setSelectedActiveStatus] = useState('Semua status aktif');

  const filteredProducts = PRODUCTS_DATA.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua kategori' || item.category === selectedCategory;
    const matchesStock = selectedStockStatus === 'Semua status stok' || item.stockStatus === selectedStockStatus;
    const matchesActive = selectedActiveStatus === 'Semua status aktif' ||
      (selectedActiveStatus === 'Aktif' ? item.isActive : !item.isActive);

    return matchesSearch && matchesCategory && matchesStock && matchesActive;
  });

  return (
    <div className="space-y-6 text-white font-space-grotesk no-scrollbar selection:bg-secondary selection:text-white pb-16">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight font-outfit">
            Kelola Produk
          </h1>
          <p className="text-sm md:text-base text-text-muted mt-1 font-outfit">
            Kelola katalog, harga satuan, dan pantau stok produk barbershop.
          </p>
        </div>

        {/* Link Tambah Produk Bergaya Tombol */}
        <Link
          href="/products/form"
          className="bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold font-outfit flex items-center justify-center gap-2 shadow-lg shadow-secondary/20 transition-all active:scale-95 cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah produk</span>
        </Link>
      </div>

      {/* 4 Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col justify-between gap-4 h-36">
          <div className="flex justify-between items-center text-text-muted">
            <span className="text-[15px] font-medium font-outfit">Total produk</span>
            <Package className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-white mb-1 font-outfit">6</h3>
            <p className="text-text-muted text-[13px] font-medium font-outfit">6 produk aktif</p>
          </div>
        </div>

        <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col justify-between gap-4 h-36">
          <div className="flex justify-between items-center text-text-muted">
            <span className="text-[15px] font-medium font-outfit">Stok aman</span>
            <CheckCircle2 className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-white mb-1 font-outfit">4</h3>
            <p className="text-emerald-400 text-[13px] font-medium font-outfit">Stok di atas ambang minimum</p>
          </div>
        </div>

        <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col justify-between gap-4 h-36">
          <div className="flex justify-between items-center text-text-muted">
            <span className="text-[15px] font-medium font-outfit">Stok menipis</span>
            <AlertTriangle className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-white mb-1 font-outfit">1</h3>
            <p className="text-amber-400 text-[13px] font-medium font-outfit">Perlu segera diisi kembali</p>
          </div>
        </div>

        <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col justify-between gap-4 h-36">
          <div className="flex justify-between items-center text-text-muted">
            <span className="text-[15px] font-medium font-outfit">Stok habis</span>
            <Package className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-white mb-1 font-outfit">1</h3>
            <p className="text-rose-400 text-[13px] font-medium font-outfit">Tidak ada unit tersisa</p>
          </div>
        </div>
      </div>

      {/* Katalog Produk Section */}
      <div className="space-y-4 pt-1">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <h2 className="text-lg md:text-[20px] font-bold text-white font-outfit">Katalog produk</h2>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Box */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama produk"
                className="w-full bg-surface border border-border rounded-xl pl-9 pr-4 py-2 text-[14px] text-white placeholder:text-text-muted focus:outline-none focus:border-secondary transition-colors font-outfit"
              />
            </div>

            {/* Dropdown Kategori */}
            <Dropdown
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={[
                'Semua kategori',
                'Minyak Rambut',
                'Hair Spray',
                'Powder',
                'Hair Tonic',
                'Serum',
              ]}
              align="right"
            />

            {/* Dropdown Status Stok */}
            <Dropdown
              value={selectedStockStatus}
              onChange={setSelectedStockStatus}
              options={[
                'Semua status stok',
                'Aman',
                'Menipis',
                'Habis',
              ]}
              align="right"
            />

            {/* Dropdown Status Aktif */}
            <Dropdown
              value={selectedActiveStatus}
              onChange={setSelectedActiveStatus}
              options={[
                'Semua status aktif',
                'Aktif',
                'Nonaktif',
              ]}
              align="right"
            />
          </div>
        </div>

        {/* Tabel Data Katalog Produk */}
        <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#222225] border-b border-border">
                <tr>
                  <th className="py-4 px-6 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">Nama produk</th>
                  <th className="py-4 px-5 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">Kategori</th>
                  <th className="py-4 px-5 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">Harga unit</th>
                  <th className="py-4 px-5 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">Stok (unit)</th>
                  <th className="py-4 px-5 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">Minimum</th>
                  <th className="py-4 px-5 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">Status stok</th>
                  <th className="py-4 px-5 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">Status aktif</th>
                  <th className="py-4 px-6 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-text-main">
                {filteredProducts.map((item) => (
                  <tr key={item.id} className="hover:bg-raised/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-white text-[15px] font-outfit">{item.name}</div>
                      <div className="text-[13px] text-text-muted font-outfit mt-0.5">Kategori: {item.category}</div>
                    </td>
                    <td className="py-4 px-5 font-bold text-white text-[14px] font-outfit">{item.category}</td>
                    <td className="py-4 px-5 font-bold text-white text-[14px] font-outfit">{item.price}</td>
                    <td className={`py-4 px-5 font-bold font-outfit text-[14px] ${item.stock === 0 ? 'text-rose-400' : item.stock <= item.minStock ? 'text-amber-400' : 'text-white'}`}>
                      {item.stock}
                    </td>
                    <td className="py-4 px-5 text-text-muted font-medium text-[14px] font-outfit">{item.minStock}</td>
                    <td className="py-4 px-5">
                      <div className={`px-2.5 py-1 text-[13px] rounded-md font-medium font-outfit flex items-center gap-1.5 w-fit ${item.stockStatus === 'Aman' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20' :
                        item.stockStatus === 'Menipis' ? 'bg-amber-950/40 text-amber-400 border border-amber-500/20' :
                          'bg-rose-950/40 text-rose-400 border border-rose-500/20'
                        }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${item.stockStatus === 'Aman' ? 'bg-emerald-400' :
                          item.stockStatus === 'Menipis' ? 'bg-amber-400' : 'bg-rose-400'
                          }`}></div>
                        <span>{item.stockStatus}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="px-2.5 py-1 text-[13px] rounded-md font-medium font-outfit flex items-center gap-1.5 w-fit bg-emerald-950/40 text-emerald-400 border border-emerald-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                        <span>Aktif</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-4">
                        {/* Link Edit Produk */}
                        <Link
                          href={`/products/form?id=${item.rawId}`}
                          className="text-secondary font-bold text-[14px] hover:text-white transition-colors flex items-center gap-1 font-outfit cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                          <span>Edit</span>
                        </Link>
                        <span className="text-text-muted text-[14px] select-none font-outfit">
                          Nonaktifkan
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="p-4 md:px-6 border-t border-border flex items-center justify-between text-[13px] text-text-muted font-outfit">
            <span>Menampilkan 1–{filteredProducts.length} dari {PRODUCTS_DATA.length} produk</span>
            <div className="flex items-center gap-3">
              <button className="p-1 rounded text-text-muted hover:text-white disabled:opacity-40 transition-colors" disabled>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="w-7 h-7 rounded-md bg-secondary text-white font-bold flex items-center justify-center text-[13px]">
                1
              </span>
              <button className="p-1 rounded text-text-muted hover:text-white disabled:opacity-40 transition-colors" disabled>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Notifikasi Bawah */}
      <div className="bg-[#24130A] border-l-4 border-secondary rounded-lg p-5 flex items-start gap-4 shadow-md font-outfit">
        <AlertCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-secondary font-bold text-[14px] font-outfit">
            Status aktif berbeda dari status stok
          </h4>
          <p className="text-[13px] text-text-muted leading-relaxed font-outfit">
            Aman: stok &gt; minimum. Menipis: 0 &lt; stok ≤ minimum. Habis: stok = 0. Produk aktif tetap dapat memiliki stok habis.
          </p>
        </div>
      </div>
    </div>
  );
}
