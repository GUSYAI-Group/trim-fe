'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button, Alert } from '@/components/ui';
import { MOCK_SERVICES } from '@/utils/mocks/mockData';
import { ServiceStatsSection } from './sections/ServiceStatsSection';
import { ServiceTableSection } from './sections/ServiceTableSection';

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const activeCount = MOCK_SERVICES.filter((s) => s.isActive).length;

  const filteredServices = MOCK_SERVICES.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <header className="space-y-1">
          <h1 className="text-[28px] font-extrabold text-text-main tracking-tight">
            Kelola Layanan
          </h1>
          <p className="text-[14px] text-text-muted">
            Menu layanan, kategori, durasi, dan harga yang tampil di aplikasi pelanggan.
          </p>
        </header>

        <Button href="/services/form" variant="primary" size="md" icon={<Plus className="w-4 h-4" />}>
          Tambah layanan
        </Button>
      </div>

      <ServiceStatsSection activeCount={activeCount} />

      <ServiceTableSection
        services={filteredServices}
        totalCount={MOCK_SERVICES.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <Alert
        variant="accent"
        title="Harga booking tidak berubah saat tarif layanan diperbarui"
        description="Harga tersimpan di BOOKING_SERVICES.price_at_booking. Jadwal berada di BOOKINGS.start_time/end_time. Harga tidak boleh negatif."
      />
    </div>
  );
}
