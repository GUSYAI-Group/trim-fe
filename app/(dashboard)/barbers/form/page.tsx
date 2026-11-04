'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button, Toast, Spinner } from '@/components/ui';
import { MOCK_BARBERS } from '@/utils/mocks/mockData';
import { BarberProfileFormSection } from './sections/BarberProfileFormSection';
import { BarberStatusSidebarSection } from './sections/BarberStatusSidebarSection';

function BarberFormInner({ editId }: { editId: string | null }) {
  const isEditMode = Boolean(editId);
  const found = isEditMode && editId
    ? MOCK_BARBERS.find((b) => b.rawPhone === editId || b.id === editId || b.uuid === editId)
    : undefined;

  const [name, setName] = useState(found?.name ?? '');
  const [phone, setPhone] = useState(found?.phone ?? '');
  const [specialty, setSpecialty] = useState(found?.specialty ?? '');
  const [selectedEmail, setSelectedEmail] = useState(found?.email ?? '');
  const [status, setStatus] = useState<'aktif' | 'nonaktif'>(found?.status ?? 'aktif');
  const [rating] = useState(found?.rating ?? '4,9');
  const [finished] = useState(found?.finished ?? 0);
  const [toastOpen, setToastOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToastOpen(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Breadcrumb & Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-[12px] text-text-muted">
          <Link href="/barbers" className="hover:text-text-main transition-colors">
            Kelola Kapster
          </Link>
          <span>/</span>
          <span className="text-text-main font-medium">
            {isEditMode ? 'Edit Kapster' : 'Tambah Kapster'}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
          <header className="space-y-1">
            <h1 className="text-[28px] font-extrabold text-text-main tracking-tight">
              {isEditMode ? 'Edit Kapster' : 'Tambah Kapster'}
            </h1>
            <p className="text-text-muted text-[14px]">
              {isEditMode
                ? `Perbarui profil ${name || 'kapster'}, spesialisasi, dan status aktifnya.`
                : 'Lengkapi profil dan tautkan akun barber untuk mendaftarkan kapster.'}
            </p>
          </header>

          <Button
            href="/barbers"
            variant="outline"
            size="md"
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Kembali ke daftar
          </Button>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BarberProfileFormSection
          isEditMode={isEditMode}
          name={name}
          onNameChange={setName}
          phone={phone}
          onPhoneChange={setPhone}
          specialty={specialty}
          onSpecialtyChange={setSpecialty}
          selectedEmail={selectedEmail}
          onEmailChange={setSelectedEmail}
        />

        <BarberStatusSidebarSection
          isEditMode={isEditMode}
          name={name}
          status={status}
          onStatusChange={setStatus}
          rating={rating}
          finished={finished}
        />
      </div>

      {/* Bottom Action Footer */}
      <div className="p-5 rounded-2xl bg-surface border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-[13px] text-text-muted">
          Periksa kembali informasi profil kapster sebelum menyimpan.
        </p>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <Button href="/barbers" variant="outline" size="md">
            Batal
          </Button>
          <Button type="submit" variant="primary" size="md">
            {isEditMode ? 'Simpan perubahan' : 'Simpan kapster'}
          </Button>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <Toast
          isOpen={toastOpen}
          onClose={() => setToastOpen(false)}
          variant="success"
          title={isEditMode ? 'Profil kapster diperbarui' : 'Kapster berhasil ditambahkan'}
          description={`Data kapster ${name || 'baru'} telah berhasil disimpan.`}
        />
      </div>
    </form>
  );
}

function BarberFormContent() {
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');
  return <BarberFormInner key={editId ?? 'new'} editId={editId} />;
}

export default function BarberFormPage() {
  return (
    <Suspense fallback={<div className="py-12"><Spinner label="Memuat form kapster..." /></div>}>
      <BarberFormContent />
    </Suspense>
  );
}
