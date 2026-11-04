'use client';

import React, { useState } from 'react';
import { Plus, ScanFace, ArrowRight } from 'lucide-react';
import { Button, Alert } from '@/components/ui';
import { MOCK_HAIRSTYLES } from '@/utils/mocks/mockData';
import { HairstyleCatalogSection } from './sections/HairstyleCatalogSection';

export default function HairstylesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShape, setSelectedShape] = useState('Semua bentuk wajah');

  const filteredHairstyles = MOCK_HAIRSTYLES.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesShape =
      selectedShape === 'Semua bentuk wajah' || item.faceShapes.includes(selectedShape);
    return matchesSearch && matchesShape;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <header className="space-y-1">
          <h1 className="text-[28px] font-extrabold text-text-main tracking-tight">
            Kelola Model Rambut
          </h1>
          <p className="text-text-muted text-[14px]">
            Katalog gaya untuk rekomendasi AI. Hubungkan tiap model dengan bentuk wajah.
          </p>
        </header>

        <Button
          href="/hairstyles/form"
          variant="primary"
          size="md"
          icon={<Plus className="w-4 h-4" />}
        >
          Tambah model
        </Button>
      </div>

      <Alert
        variant="accent"
        icon={<ScanFace className="w-5 h-5 text-secondary" />}
        title="6 model aktif • Pemetaan wajah masih rancangan"
        description="Relasi HAIRSTYLES–FACE_SHAPES belum memiliki tabel penghubung. Chips merupakan contoh pemetaan, bukan data tersimpan."
        action={
          <button
            type="button"
            className="text-[13px] font-bold text-secondary hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Tinjau pemetaan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        }
      />

      <HairstyleCatalogSection
        hairstyles={filteredHairstyles}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedShape={selectedShape}
        onShapeChange={setSelectedShape}
      />
    </div>
  );
}
