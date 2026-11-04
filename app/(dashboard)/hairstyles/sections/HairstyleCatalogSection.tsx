import React from 'react';
import { ScanFace } from 'lucide-react';
import { SearchBar, SelectField, EmptyState, Button, Card } from '@/components/ui';
import { THairstyle } from '@/types';
import { HairstyleCard } from '../components/HairstyleCard';

interface HairstyleCatalogSectionProps {
  hairstyles: THairstyle[];
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedShape: string;
  onShapeChange: (val: string) => void;
}

export function HairstyleCatalogSection({
  hairstyles,
  searchTerm,
  onSearchChange,
  selectedShape,
  onShapeChange,
}: HairstyleCatalogSectionProps) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-[20px] font-bold text-text-main">
          Semua model ({hairstyles.length})
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          <SearchBar
            size="sm"
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Cari model rambut"
            className="w-full sm:w-64"
          />

          <SelectField
            size="sm"
            value={selectedShape}
            onChange={(e) => onShapeChange(e.target.value)}
            options={[
              { value: 'Semua bentuk wajah', label: 'Semua bentuk wajah' },
              { value: 'Oval', label: 'Oval' },
              { value: 'Persegi', label: 'Persegi' },
              { value: 'Bulat', label: 'Bulat' },
              { value: 'Lonjong', label: 'Lonjong' },
              { value: 'Berlian', label: 'Berlian' },
            ]}
          />
        </div>
      </div>

      {hairstyles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hairstyles.map((item) => (
            <HairstyleCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <Card>
          <EmptyState
            icon={<ScanFace className="w-8 h-8" />}
            title="Model rambut tidak ditemukan"
            description="Tidak ada model rambut yang sesuai dengan kata kunci atau bentuk wajah yang dipilih."
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onSearchChange('');
                  onShapeChange('Semua bentuk wajah');
                }}
              >
                Reset filter
              </Button>
            }
          />
        </Card>
      )}
    </div>
  );
}

