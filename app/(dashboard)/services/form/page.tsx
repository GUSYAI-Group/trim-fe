'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button, Alert, Toast, Spinner } from '@/components/ui';
import { MOCK_SERVICES } from '@/utils/mocks/mockData';
import { ServiceMainFormSection } from './sections/ServiceMainFormSection';
import { ServiceGuideSidebarSection } from './sections/ServiceGuideSidebarSection';

function ServiceFormInner({ editId }: { editId: string | null }) {
  const isEditMode = Boolean(editId);
  const found = isEditMode && editId
    ? MOCK_SERVICES.find((s) => s.id === editId)
    : undefined;

  const [name, setName] = useState(found?.name ?? '');
  const [duration, setDuration] = useState(found ? String(found.duration) : '');
  const [price, setPrice] = useState(found?.priceFormatted ?? '');
  const [category, setCategory] = useState(found?.category ?? '');
  const [isActive, setIsActive] = useState(found?.isActive ?? true);
  const [toastOpen, setToastOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToastOpen(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Breadcrumb & Header Dinamis */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-[12px] text-text-muted">
          <Link href="/services" className="hover:text-text-main transition-colors">
            Kelola Layanan
          </Link>
          <span>/</span>
          <span className="text-text-main font-medium">
            {isEditMode ? 'Edit layanan' : 'Tambah layanan'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <header className="space-y-1">
            <h1 className="text-[28px] font-extrabold text-text-main tracking-tight">
              {isEditMode ? 'Edit layanan' : 'Tambah layanan'}
            </h1>
            <p className="text-text-muted text-[14px]">
              {isEditMode
                ? `Perbarui nama, durasi, harga, kategori, dan status ${name || 'layanan'}.`
                : 'Buat layanan baru untuk menu TRIM Bandung.'}
            </p>
          </header>

          <Button
            href="/services"
            variant="outline"
            size="md"
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Kembali ke layanan
          </Button>
        </div>
      </div>

      {/* Grid Content Utama */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <ServiceMainFormSection
          isEditMode={isEditMode}
          name={name}
          onNameChange={setName}
          duration={duration}
          onDurationChange={setDuration}
          price={price}
          onPriceChange={setPrice}
          category={category}
          onCategoryChange={setCategory}
          isActive={isActive}
          onActiveChange={setIsActive}
        />

        <ServiceGuideSidebarSection isEditMode={isEditMode} />
      </div>

      <Alert
        variant="accent"
        title="Harga booking tidak berubah saat tarif layanan diperbarui"
        description="Harga tersimpan di BOOKING_SERVICES.price_at_booking. Jadwal berada di BOOKINGS.start_time/end_time. Harga tidak boleh negatif."
      />

      <div className="fixed bottom-6 right-6 z-50">
        <Toast
          isOpen={toastOpen}
          onClose={() => setToastOpen(false)}
          variant="success"
          title={isEditMode ? 'Layanan diperbarui' : 'Layanan dibuat'}
          description={`Layanan "${name}" telah berhasil disimpan ke katalog.`}
        />
      </div>
    </form>
  );
}

function ServiceFormContent() {
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');
  return <ServiceFormInner key={editId ?? 'new'} editId={editId} />;
}

export default function ServiceFormPage() {
  return (
    <Suspense fallback={<div className="py-12"><Spinner label="Memuat form layanan..." /></div>}>
      <ServiceFormContent />
    </Suspense>
  );
}
