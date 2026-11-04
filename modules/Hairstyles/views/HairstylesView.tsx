'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, MoreHorizontal, ArrowRight, ScanFace } from 'lucide-react';
import Image from 'next/image';
import { Dropdown } from '@/components/ui';

interface HairstyleItem {
  id: string;
  name: string;
  faceShapes: string[];
  description: string;
  hairType: string;
  maintenanceLevel: number;
  image: string;
  isAiActive: boolean;
}

const HAIRSTYLES_DATA: HairstyleItem[] = [
  {
    id: 'skin-fade',
    name: 'Skin fade',
    faceShapes: ['Oval', 'Persegi', 'Berlian'],
    description: 'Deskripsi: Potongan rapi dengan transisi halus dari kulit ke rambut bagian atas.',
    hairType: 'Lurus',
    maintenanceLevel: 2,
    image: '/hairstyles/skin-fade.jpg.png',
    isAiActive: true,
  },
  {
    id: 'textured-crop',
    name: 'Textured crop',
    faceShapes: ['Oval', 'Lonjong'],
    description: 'Deskripsi: Potongan pendek dengan tekstur yang lebih ekspresif dan volume di bagian atas.',
    hairType: 'Bergelombang',
    maintenanceLevel: 3,
    image: '/hairstyles/textured-crop.jpg.png',
    isAiActive: true,
  },
  {
    id: 'french-crop',
    name: 'French crop',
    faceShapes: ['Bulat', 'Persegi'],
    description: 'Deskripsi: Versi modern dengan poni pendek dan rambut samping yang lebih rapi.',
    hairType: 'Lurus',
    maintenanceLevel: 2,
    image: '/hairstyles/french-crop.jpg.png',
    isAiActive: true,
  },
  {
    id: 'classic-pompadour',
    name: 'Classic pompadour',
    faceShapes: ['Bulat', 'Oval'],
    description: 'Deskripsi: Gaya klasik dengan volume tinggi di bagian atas dan samping yang rapi.',
    hairType: 'Lurus',
    maintenanceLevel: 4,
    image: '/hairstyles/classic-pompadour.jpg.png',
    isAiActive: true,
  },
  {
    id: 'modern-mullet',
    name: 'Modern mullet',
    faceShapes: ['Oval', 'Berlian'],
    description: 'Deskripsi: Versi modern dengan bagian belakang yang lebih panjang dan ekspresif.',
    hairType: 'Bergelombang',
    maintenanceLevel: 5,
    image: '/hairstyles/modern-mullet.jpg.png',
    isAiActive: true,
  },
  {
    id: 'buzz-cut',
    name: 'Buzz cut',
    faceShapes: ['Oval', 'Persegi'],
    description: 'Deskripsi: Potongan sangat pendek untuk tampilan bersih dan minimal.',
    hairType: 'Keriting',
    maintenanceLevel: 1,
    image: '/hairstyles/buzz-cut.jpg.png',
    isAiActive: true,
  },
];

export default function HairstylesView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShape, setSelectedShape] = useState('Semua bentuk wajah');

  const filteredHairstyles = HAIRSTYLES_DATA.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesShape =
      selectedShape === 'Semua bentuk wajah' || item.faceShapes.includes(selectedShape);
    return matchesSearch && matchesShape;
  });

  return (
    <div className="space-y-6 text-white font-space-grotesk no-scrollbar selection:bg-secondary selection:text-white pb-16">
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
              6 model aktif • Pemetaan wajah masih rancangan
            </div>
            <p className="text-[13px] text-text-muted mt-0.5 font-outfit leading-relaxed">
              Relasi HAIRSTYLES–FACE_SHAPES belum memiliki tabel penghubung. Chips merupakan contoh pemetaan, bukan data tersimpan.
            </p>
          </div>
        </div>
        <button className="text-[13px] font-bold text-secondary hover:underline font-outfit flex items-center gap-1 shrink-0 self-end sm:self-center cursor-pointer transition-all">
          <span>Tinjau pemetaan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
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
              ]}
              align="right"
            />
          </div>
        </div>

        {/* Grid Catalog Model Rambut */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHairstyles.map((item) => (
            <div
              key={item.id}
              className="bg-surface border border-border rounded-2xl overflow-hidden flex flex-col justify-between hover:border-border/80 transition-all group shadow-sm"
            >
              {/* Card Body */}
              <div>
                {/* Gambar Model Rambut */}
                <div className="relative w-full h-48 bg-neutral-900 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover object-center grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Detail Content */}
                <div className="p-5 md:p-6 space-y-3.5 font-outfit">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[16px] font-bold text-white tracking-tight">
                      {item.name}
                    </h3>
                    <button className="text-text-muted hover:text-white p-1 rounded-lg hover:bg-raised transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Tag / Chips Bentuk Wajah */}
                  <div className="space-y-1.5">
                    <p className="text-[13px] text-text-muted font-normal">Contoh bentuk wajah</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.faceShapes.map((shape, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-lg bg-raised border border-border text-[13px] text-white font-normal"
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

                  {/* Informasi Tipe & Perawatan Ukuran Presisi */}
                  <p className="text-[13px] text-text-muted font-outfit font-normal pt-1">
                    Tipe rambut: <span className="font-bold text-white tracking-wide">{item.hairType}</span>
                    <span className="mx-1.5 text-text-muted">•</span>
                    Level perawatan: <span className="font-bold text-white tracking-wide">{item.maintenanceLevel}</span>
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 py-3.5 border-t border-border/60 bg-surface flex items-center justify-between text-[13px] font-outfit">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 font-semibold text-[12px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Aktif untuk AI</span>
                </div>

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
      </div>
    </div>
  );
}
