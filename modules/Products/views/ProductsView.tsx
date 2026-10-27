'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit3, Package, CheckCircle2, AlertTriangle, AlertCircle, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

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
    <div className="space-y-6 pb-12 font-space-grotesk no-scrollbar selection:bg-secondary selection:text-white">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight font-outfit">
            Kelola Produk
          </h1>
          <p className="text-text-muted text-xs md:text-sm mt-1 font-outfit">
            Kelola katalog, harga satuan, dan pantau stok produk barbershop.
          </p>
        </div>

        {/* Link Tambah Produk Bergaya Tombol */}
        <Link
          href="/products/form"
          className="bg-secondary hover:bg-secondary/90 text-white px-4 py-2.5 rounded-xl text-xs font-bold font-outfit flex items-center justify-center gap-2 shadow-lg shadow-secondary/20 transition-all active:scale-95 cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah produk</span>
        </Link>
      </div>

      {/* 4 Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 flex flex-col justify-between gap-4 border border-border bg-surface rounded-2xl">
          <div className="flex justify-between items-center text-text-muted">
            <span className="text-xs font-medium font-outfit">Total produk</span>
            <Package className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-white font-outfit">6</h3>
            <p className="text-text-muted text-[11px] mt-1 font-outfit">6 produk aktif</p>
          </div>
        </div>

        <div className="p-5 flex flex-col justify-between gap-4 border border-border bg-surface rounded-2xl">
          <div className="flex justify-between items-center text-text-muted">
            <span className="text-xs font-medium font-outfit">Stok aman</span>
            <CheckCircle2 className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-white font-outfit">4</h3>
            <p className="text-emerald-400 text-[11px] mt-1 font-medium font-outfit">Stok di atas ambang minimum</p>
          </div>
        </div>

        <div className="p-5 flex flex-col justify-between gap-4 border border-border bg-surface rounded-2xl">
          <div className="flex justify-between items-center text-text-muted">
            <span className="text-xs font-medium font-outfit">Stok menipis</span>
            <AlertTriangle className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-white font-outfit">1</h3>
            <p className="text-amber-400 text-[11px] mt-1 font-medium font-outfit">Perlu segera diisi kembali</p>
          </div>
        </div>

        <div className="p-5 flex flex-col justify-between gap-4 border border-border bg-surface rounded-2xl">
          <div className="flex justify-between items-center text-text-muted">
            <span className="text-xs font-medium font-outfit">Stok habis</span>
            <Package className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-white font-outfit">1</h3>
            <p className="text-rose-400 text-[11px] mt-1 font-medium font-outfit">Tidak ada unit tersisa</p>
          </div>
        </div>
      </div>

      {/* Katalog Produk Section */}
      <div className="space-y-4 pt-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-base font-bold text-white font-outfit">Katalog produk</h2>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Box */}
            <div className="relative flex items-center bg-surface border border-border rounded-xl px-3 py-1.5 w-full sm:w-56">
              <Search className="w-3.5 h-3.5 text-text-muted mr-2 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama produk"
                className="bg-transparent border-none outline-none text-xs text-white placeholder:text-text-muted w-full font-medium font-outfit"
              />
            </div>

            {/* Dropdown Kategori */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-surface border border-border text-text-muted text-xs font-medium rounded-xl pl-3 pr-8 py-1.5 focus:outline-none focus:border-secondary cursor-pointer font-outfit"
              >
                <option className="bg-surface text-white">Semua kategori</option>
                <option className="bg-surface text-white">Minyak Rambut</option>
                <option className="bg-surface text-white">Hair Spray</option>
                <option className="bg-surface text-white">Powder</option>
                <option className="bg-surface text-white">Hair Tonic</option>
                <option className="bg-surface text-white">Serum</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-text-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Dropdown Status Stok */}
            <div className="relative">
              <select
                value={selectedStockStatus}
                onChange={(e) => setSelectedStockStatus(e.target.value)}
                className="appearance-none bg-surface border border-border text-text-muted text-xs font-medium rounded-xl pl-3 pr-8 py-1.5 focus:outline-none focus:border-secondary cursor-pointer font-outfit"
              >
                <option className="bg-surface text-white">Semua status stok</option>
                <option className="bg-surface text-white">Aman</option>
                <option className="bg-surface text-white">Menipis</option>
                <option className="bg-surface text-white">Habis</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-text-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Dropdown Status Aktif */}
            <div className="relative">
              <select
                value={selectedActiveStatus}
                onChange={(e) => setSelectedActiveStatus(e.target.value)}
                className="appearance-none bg-surface border border-border text-text-muted text-xs font-medium rounded-xl pl-3 pr-8 py-1.5 focus:outline-none focus:border-secondary cursor-pointer font-outfit"
              >
                <option className="bg-surface text-white">Semua status aktif</option>
                <option className="bg-surface text-white">Aktif</option>
                <option className="bg-surface text-white">Nonaktif</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-text-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Tabel Data Katalog Produk */}
        <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface text-text-muted text-[11px] border-b border-border/60 font-outfit uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6 font-semibold">Nama produk</th>
                  <th className="py-3.5 px-5 font-semibold">Kategori</th>
                  <th className="py-3.5 px-5 font-semibold">Harga unit</th>
                  <th className="py-3.5 px-5 font-semibold">Stok (unit)</th>
                  <th className="py-3.5 px-5 font-semibold">Minimum</th>
                  <th className="py-3.5 px-5 font-semibold">Status stok</th>
                  <th className="py-3.5 px-5 font-semibold">Status aktif</th>
                  <th className="py-3.5 px-6 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-text-main">
                {filteredProducts.map((item) => (
                  <tr key={item.id} className="hover:bg-raised/50 transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="font-bold text-white text-xs">{item.name}</div>
                      <div className="text-[11px] text-text-muted font-outfit">Kategori: {item.category}</div>
                    </td>
                    <td className="py-3.5 px-5 font-bold text-white font-outfit">{item.category}</td>
                    <td className="py-3.5 px-5 font-bold text-white font-outfit">{item.price}</td>
                    <td className={`py-3.5 px-5 font-bold font-outfit ${item.stock === 0 ? 'text-rose-400' : item.stock <= item.minStock ? 'text-amber-400' : 'text-white'}`}>
                      {item.stock}
                    </td>
                    <td className="py-3.5 px-5 text-text-muted font-outfit">{item.minStock}</td>
                    <td className="py-3.5 px-5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold font-outfit ${
                        item.stockStatus === 'Aman' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20' :
                        item.stockStatus === 'Menipis' ? 'bg-amber-950/40 text-amber-400 border border-amber-500/20' :
                        'bg-rose-950/40 text-rose-400 border border-rose-500/20'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          item.stockStatus === 'Aman' ? 'bg-emerald-500' :
                          item.stockStatus === 'Menipis' ? 'bg-amber-500' : 'bg-rose-500'
                        }`}></span>
                        <span>{item.stockStatus}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 font-semibold font-outfit text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>Aktif</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        {/* Link Edit Produk */}
                        <Link
                          href={`/products/form?id=${item.rawId}`}
                          className="text-secondary font-bold text-xs hover:underline flex items-center gap-1 font-outfit cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </Link>
                        <button className="text-text-muted text-xs hover:text-white transition-colors cursor-pointer font-outfit">
                          Nonaktifkan
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="py-3.5 px-6 border-t border-border flex items-center justify-between text-text-muted text-xs font-outfit">
            <span>Menampilkan 1–{filteredProducts.length} dari {PRODUCTS_DATA.length} produk</span>
            <div className="flex items-center gap-2">
              <button className="p-1 rounded border border-border text-text-muted hover:text-white disabled:opacity-40" disabled>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="w-6 h-6 rounded bg-secondary text-white font-bold flex items-center justify-center text-xs">
                1
              </span>
              <button className="p-1 rounded border border-border text-text-muted hover:text-white disabled:opacity-40" disabled>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Banner Notifikasi Bawah */}
        <div className="p-4 rounded-2xl bg-[#1c120c] border border-secondary/20 flex items-start gap-3 shadow-md">
          <AlertCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
          <div className="space-y-0.5 font-outfit">
            <h4 className="text-xs font-bold text-secondary">
              Status aktif berbeda dari status stok
            </h4>
            <p className="text-[11px] text-text-muted leading-relaxed">
              Aman: stok &gt; minimum. Menipis: 0 &lt; stok ≤ minimum. Habis: stok = 0. Produk aktif tetap dapat memiliki stok habis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}