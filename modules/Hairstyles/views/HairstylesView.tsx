'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, MoreHorizontal, ArrowRight, ScanFace, X, Trash2, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Dropdown } from '@/components/ui';
import { useTrimStore, HairstyleItem } from '@/store/useTrimStore';

export default function HairstylesView() {
  const hairstyles = useTrimStore((s) => s.hairstyles);
  const toggleHairstyleAi = useTrimStore((s) => s.toggleHairstyleAi);
  const deleteHairstyle = useTrimStore((s) => s.deleteHairstyle);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShape, setSelectedShape] = useState('Semua bentuk wajah');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleAi = (id: string, name: string, current: boolean) => {
    toggleHairstyleAi(id);
    setActiveMenuId(null);
    showToast(`Model "${name}" ${current ? 'dinonaktifkan dari' : 'diaktifkan untuk'} rekomendasi AI.`);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Yakin ingin menghapus model rambut "${name}"?`)) {
      deleteHairstyle(id);
      setActiveMenuId(null);
      showToast(`Model rambut "${name}" berhasil dihapus.`);
    }
  };

  const filteredHairstyles = hairstyles.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesShape =
      selectedShape === 'Semua bentuk wajah' || item.faceShapes.includes(selectedShape);
    return matchesSearch && matchesShape;
  });

  const activeAiCount = hairstyles.filter((h) => h.isAiActive).length;

  return (
    <div className="space-y-6 text-white font-space-grotesk no-scrollbar selection:bg-secondary selection:text-white pb-16">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#1E1E22] border border-secondary/40 shadow-2xl shadow-secondary/20 font-outfit text-[14px] text-white"
          >
            <div className="w-2 h-2 rounded-full bg-secondary animate-ping" />
            <span className="font-semibold">{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="ml-2 text-text-muted hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight font-outfit">
            Kelola Model Rambut
          </h1>
          <p className="text-sm md:text-base text-text-muted mt-1 font-outfit">
            Katalog gaya untuk rekomendasi AI. Hubungkan tiap model dengan bentuk wajah.
          </p>
        </div>

        {/* Link Tambah Model Bergaya Tombol */}
        <Link
          href="/hairstyles/form"
          className="bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold font-outfit flex items-center justify-center gap-2 shadow-lg shadow-secondary/20 transition-all active:scale-95 self-start sm:self-auto cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah model</span>
        </Link>
      </div>

      {/* Banner Pemetaan Wajah */}
      <div className="bg-[#24130A] border-l-4 border-secondary rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md font-outfit">
        <div className="flex items-center gap-3.5">
          <div className="text-secondary shrink-0 pl-1">
            <ScanFace className="w-6 h-6 text-secondary stroke-[1.75]" />
          </div>
          <div>
            <div className="text-[14px] font-bold text-secondary">
              {activeAiCount} model aktif untuk rekomendasi AI TRIM
            </div>
            <p className="text-[13px] text-text-muted mt-0.5 font-outfit leading-relaxed">
              Model yang aktif akan muncul pada fitur AI Face Shape Scanner bagi pelanggan untuk mencocokkan gaya rambut terbaik.
            </p>
          </div>
        </div>
      </div>

      {/* Main Catalog Section */}
      <div className="space-y-4 pt-1">
        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <h2 className="text-lg md:text-[20px] font-bold text-white font-outfit">
            Semua model ({filteredHairstyles.length})
          </h2>

          <div className="flex items-center gap-3">
            {/* Search Box */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari model rambut"
                className="w-full bg-surface border border-border rounded-xl pl-9 pr-4 py-2 text-[14px] text-white placeholder:text-text-muted focus:outline-none focus:border-secondary transition-colors font-outfit"
              />
            </div>

            {/* Shape Dropdown */}
            <Dropdown
              value={selectedShape}
              onChange={setSelectedShape}
              options={[
                'Semua bentuk wajah',
                'Oval',
                'Persegi',
                'Bulat',
                'Lonjong',
                'Berlian',
                'Segitiga',
              ]}
              align="right"
            />
          </div>
        </div>

        {/* Grid Catalog Model Rambut */}
        {filteredHairstyles.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-surface border border-border text-text-muted font-outfit">
            Tidak ada model rambut yang cocok dengan filter atau kata kunci.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHairstyles.map((item) => (
              <div
                key={item.id}
                className="bg-surface border border-border rounded-2xl overflow-hidden flex flex-col justify-between hover:border-border/80 transition-all group shadow-sm relative"
              >
                {/* Card Body */}
                <div>
                  {/* Gambar Model Rambut */}
                  <div className="relative w-full h-48 bg-neutral-900 overflow-hidden">
                    {item.image.startsWith('/') ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover object-center grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-center grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>

                  {/* Detail Content */}
                  <div className="p-5 md:p-6 space-y-3.5 font-outfit">
                    <div className="flex items-center justify-between relative">
                      <h3 className="text-[16px] font-bold text-white tracking-tight">
                        {item.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)}
                        className="text-text-muted hover:text-white p-1 rounded-lg hover:bg-raised transition-colors cursor-pointer"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {activeMenuId === item.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -5 }}
                            className="absolute right-0 top-8 z-20 w-44 rounded-xl bg-[#1E1E22] border border-border shadow-2xl p-1.5 space-y-1 font-outfit text-xs"
                          >
                            <Link
                              href={`/hairstyles/form?id=${item.id}`}
                              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-white hover:bg-raised transition-colors"
                            >
                              Edit Model
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleToggleAi(item.id, item.name, item.isAiActive)}
                              className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-white hover:bg-raised transition-colors"
                            >
                              {item.isAiActive ? 'Matikan AI' : 'Aktifkan AI'}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(item.id, item.name)}
                              className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                            >
                              Hapus Model
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Tag / Chips Bentuk Wajah */}
                    <div className="space-y-1.5">
                      <p className="text-[13px] text-text-muted font-normal">Contoh bentuk wajah</p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.faceShapes.map((shape, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-lg bg-raised border border-border text-[12px] text-white font-normal"
                          >
                            {shape}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Deskripsi Singkat */}
                    <p className="text-[13px] text-text-muted leading-relaxed font-normal pt-0.5">
                      {item.description}
                    </p>

                    {/* Informasi Tipe & Perawatan */}
                    <p className="text-[13px] text-text-muted font-outfit font-normal pt-1">
                      Tipe rambut: <span className="font-bold text-white tracking-wide">{item.hairType}</span>
                      <span className="mx-1.5 text-text-muted">•</span>
                      Level perawatan: <span className="font-bold text-white tracking-wide">{item.maintenanceLevel}/5</span>
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 py-3.5 border-t border-border/60 bg-surface flex items-center justify-between text-[13px] font-outfit">
                  <button
                    type="button"
                    onClick={() => handleToggleAi(item.id, item.name, item.isAiActive)}
                    className="cursor-pointer active:scale-95 transition-transform"
                    title="Klik untuk ubah status AI"
                  >
                    {item.isAiActive ? (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 font-semibold text-[12px] hover:bg-emerald-900/40 transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>Aktif untuk AI</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-500/10 border border-border text-zinc-400 font-semibold text-[12px] hover:bg-zinc-500/20 transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                        <span>Nonaktif AI</span>
                      </div>
                    )}
                  </button>

                  {/* Link Edit */}
                  <Link
                    href={`/hairstyles/form?id=${item.id}`}
                    className="text-secondary font-bold hover:underline flex items-center gap-1.5 cursor-pointer text-[13px]"
                  >
                    <span>Edit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
