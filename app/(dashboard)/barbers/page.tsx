'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button, Alert } from '@/components/ui';
import { MOCK_BARBERS } from '@/utils/mocks/mockData';
import { BarberStatsSection } from './sections/BarberStatsSection';
import { BarberTableSection } from './sections/BarberTableSection';

export default function BarbersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'Semua' | 'Aktif' | 'Nonaktif'>('Semua');

  const totalCount = MOCK_BARBERS.length;
  const activeCount = MOCK_BARBERS.filter((k) => k.status === 'aktif').length;
  const inactiveCount = MOCK_BARBERS.filter((k) => k.status === 'nonaktif').length;

  const filteredData = MOCK_BARBERS.filter((kapster) => {
    const matchesSearch =
      kapster.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kapster.phone.includes(searchQuery) ||
      kapster.rawPhone.includes(searchQuery);

    const statusLabel = kapster.status === 'aktif' ? 'Aktif' : 'Nonaktif';
    const matchesStatus = selectedStatus === 'Semua' || statusLabel === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <header className="space-y-1">
          <h1 className="text-[28px] font-extrabold text-text-main tracking-tight">
            Kelola Kapster
          </h1>
          <p className="text-text-muted text-[14px]">
            Tim di balik setiap potongan. Atur spesialisasi, profil, dan status aktif kapster.
          </p>
        </header>

        <Button href="/barbers/form" variant="primary" size="md" icon={<Plus className="w-4 h-4" />}>
          Tambah kapster
        </Button>
      </div>

      <BarberStatsSection totalCount={totalCount} activeCount={activeCount} />

      <BarberTableSection
        barbers={filteredData}
        totalCount={totalCount}
        activeCount={activeCount}
        inactiveCount={inactiveCount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      <Alert
        variant="accent"
        title="Nomor telepon unik • Aturan aplikasi"
        description="Profil kapster terhubung ke USERS melalui user_id. Status aktif disimpan di is_active; sedang melayani dihitung dari booking."
      />
    </div>
  );
}
