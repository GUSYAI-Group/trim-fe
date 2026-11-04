'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button, Alert, Toast, Spinner } from '@/components/ui';
import { MOCK_HAIRSTYLES } from '@/utils/mocks/mockData';
import { HairstyleMainFormSection, FaceShapeMap } from './sections/HairstyleMainFormSection';
import { HairstyleSidebarSection } from './sections/HairstyleSidebarSection';

function HairstyleFormInner({ editId }: { editId: string | null }) {
  const isEditMode = Boolean(editId);
  const found = isEditMode && editId
    ? MOCK_HAIRSTYLES.find((h) => h.id === editId)
    : undefined;

  const [name, setName] = useState(found?.name ?? '');
  const [imageUrl, setImageUrl] = useState(found?.image ?? '');
  const [description, setDescription] = useState(found?.description ?? '');
  const [hairType, setHairType] = useState(found?.hairType ?? '');
  const [careLevel, setCareLevel] = useState(found ? String(found.maintenanceLevel) : '');
  const [status, setStatus] = useState<'aktif' | 'nonaktif'>(
    found ? (found.isAiActive ? 'aktif' : 'nonaktif') : 'aktif'
  );
  const [imageName] = useState(found?.imageName ?? '');
  const [uuid] = useState(found?.uuid ?? '');
  const [toastOpen, setToastOpen] = useState(false);

  const [faceShapes, setFaceShapes] = useState<FaceShapeMap>({
    oval: found ? found.faceShapes.includes('Oval') : false,
    bulat: found ? found.faceShapes.includes('Bulat') : false,
    persegi: found ? found.faceShapes.includes('Persegi') : false,
    lonjong: found ? found.faceShapes.includes('Lonjong') : false,
    berlian: found ? found.faceShapes.includes('Berlian') : false,
    segitiga: found ? found.faceShapes.includes('Segitiga') : false,
  });

  const [hasErrors, setHasErrors] = useState(false);
  const [errors, setErrors] = useState<{
    imageUrl?: string;
    name?: string;
    careLevel?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (imageUrl && !imageUrl.startsWith('https://') && !imageUrl.startsWith('/')) {
      newErrors.imageUrl = 'URL gambar tidak valid. Gunakan alamat lengkap seperti https://domain.com/foto.jpg';
    }

    if (!name.trim()) {
      newErrors.name = 'Nama model wajib diisi.';
    }

    if (careLevel && (!Number.isInteger(Number(careLevel)) || Number(careLevel) <= 0 || careLevel.includes('.'))) {
      newErrors.careLevel = `Level perawatan harus bilangan bulat, bukan ${careLevel}.`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setHasErrors(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setErrors({});
      setHasErrors(false);
      setToastOpen(true);
    }
  };

  const toggleFaceShape = (shape: keyof FaceShapeMap) => {
    setFaceShapes((prev) => ({ ...prev, [shape]: !prev[shape] }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Breadcrumb & Top Bar */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-[12px] text-text-muted">
          <Link href="/hairstyles" className="hover:text-text-main transition-colors">
            Kelola Model Rambut
          </Link>
          <span>/</span>
          <span className="text-text-main font-medium">
            {isEditMode ? 'Edit Model Rambut' : 'Tambah Model Rambut'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <header className="space-y-1">
            <h1 className="text-[28px] font-extrabold text-text-main tracking-tight">
              {isEditMode ? 'Edit Model Rambut' : 'Tambah Model Rambut'}
            </h1>
            <p className="text-text-muted text-[14px]">
              {isEditMode
                ? `Perbarui foto referensi, karakteristik potongan, dan status aktif ${name || 'model rambut'}.`
                : 'Lengkapi foto referensi dan karakteristik potongan untuk menambah model ke katalog.'}
            </p>
          </header>

          <Button
            href="/hairstyles"
            variant="outline"
            size="md"
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Kembali ke daftar
          </Button>
        </div>
      </div>

      {hasErrors && (
        <Alert
          variant="error"
          title="Model rambut belum dapat disimpan"
          description="Periksa kembali field yang ditandai (Nama model, URL gambar, atau Level perawatan). Data input tetap dipertahankan."
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <HairstyleMainFormSection
          isEditMode={isEditMode}
          name={name}
          onNameChange={setName}
          imageUrl={imageUrl}
          onImageUrlChange={setImageUrl}
          imageName={imageName}
          description={description}
          onDescriptionChange={setDescription}
          hairType={hairType}
          onHairTypeChange={setHairType}
          careLevel={careLevel}
          onCareLevelChange={setCareLevel}
          faceShapes={faceShapes}
          onToggleFaceShape={toggleFaceShape}
          errors={errors}
        />

        <HairstyleSidebarSection
          isEditMode={isEditMode}
          name={name}
          status={status}
          onStatusChange={setStatus}
          uuid={uuid}
        />
      </div>

      <div className="p-5 rounded-2xl bg-surface border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[13px] text-text-muted">
          {hasErrors
            ? 'Perbaiki field yang ditandai, lalu simpan kembali.'
            : 'Lengkapi nama dan foto referensi sebelum menyimpan.'}
        </p>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <Button href="/hairstyles" variant="outline" size="md">
            Batal
          </Button>
          <Button type="submit" variant="primary" size="md">
            {isEditMode ? 'Simpan perubahan' : 'Simpan model'}
          </Button>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <Toast
          isOpen={toastOpen}
          onClose={() => setToastOpen(false)}
          variant="success"
          title={isEditMode ? 'Model rambut diperbarui' : 'Model rambut disimpan'}
          description={`Model "${name}" telah berhasil disimpan ke katalog AI.`}
        />
      </div>
    </form>
  );
}

function HairstyleFormContent() {
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');
  return <HairstyleFormInner key={editId ?? 'new'} editId={editId} />;
}

export default function HairstyleFormPage() {
  return (
    <Suspense fallback={<div className="py-12"><Spinner label="Memuat form model rambut..." /></div>}>
      <HairstyleFormContent />
    </Suspense>
  );
}
