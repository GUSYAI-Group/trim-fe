'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button, Alert, Toast, Spinner, Modal } from '@/components/ui';
import { hairstyleService } from '@/services/endpoints/hairstyle';
import { HairstyleMainFormSection, FaceShapeMap } from './sections/HairstyleMainFormSection';
import { HairstyleSidebarSection } from './sections/HairstyleSidebarSection';

function HairstyleFormInner({ editId }: { editId: string | null }) {
  const router = useRouter();
  const isEditMode = Boolean(editId);

  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [hairType, setHairType] = useState('Lurus');
  const [careLevel, setCareLevel] = useState('2');
  const [status, setStatus] = useState<'aktif' | 'nonaktif'>('aktif');
  const [imageName, setImageName] = useState('');
  const [uuid, setUuid] = useState('');
  const [toastOpen, setToastOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean(editId));
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!editId && !uuid) return;
    setIsDeleting(true);
    try {
      await hairstyleService.deleteHairstyle(uuid || editId!);
      setTimeout(() => {
        router.push('/hairstyles');
      }, 800);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Gagal menghapus model rambut');
      setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const [faceShapes, setFaceShapes] = useState<FaceShapeMap>({
    oval: true,
    bulat: false,
    persegi: false,
    lonjong: false,
    berlian: false,
    segitiga: false,
  });

  const [hasErrors, setHasErrors] = useState(false);
  const [errors, setErrors] = useState<{
    imageUrl?: string;
    name?: string;
    careLevel?: string;
  }>({});

  useEffect(() => {
    if (!editId) return;

    async function loadHairstyle(id: string) {
      try {
        setIsLoading(true);
        const res = await hairstyleService.getHairstyleDetail(id);
        const found = res.data;
        if (found) {
          setName(found.name);
          setImageUrl(found.image || '');
          setDescription(found.description || '');
          setHairType(found.hairType || 'Lurus');
          setCareLevel(String(found.maintenanceLevel || 2));
          setStatus(found.isAiActive ? 'aktif' : 'nonaktif');
          setImageName(found.imageName || '');
          setUuid(found.uuid || '');

          setFaceShapes({
            oval: found.faceShapes.includes('Oval'),
            bulat: found.faceShapes.includes('Bulat'),
            persegi: found.faceShapes.includes('Persegi'),
            lonjong: found.faceShapes.includes('Lonjong'),
            berlian: found.faceShapes.includes('Berlian'),
            segitiga: found.faceShapes.includes('Segitiga'),
          });
        }
      } catch (_err) {
        setHasErrors(true);
      } finally {
        setIsLoading(false);
      }
    }

    loadHairstyle(editId);
  }, [editId]);

  const handleSubmit = async (e: React.FormEvent) => {
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
      return;
    }

    setErrors({});
    setHasErrors(false);

    try {
      const activeShapes: string[] = [];
      if (faceShapes.oval) activeShapes.push('Oval');
      if (faceShapes.bulat) activeShapes.push('Bulat');
      if (faceShapes.persegi) activeShapes.push('Persegi');
      if (faceShapes.lonjong) activeShapes.push('Lonjong');
      if (faceShapes.berlian) activeShapes.push('Berlian');
      if (faceShapes.segitiga) activeShapes.push('Segitiga');

      const payload = {
        name,
        hairType,
        maintenanceLevel: Number(careLevel) || 2,
        description,
        isAiActive: status === 'aktif',
        faceShapes: activeShapes.length > 0 ? activeShapes : ['Oval'],
      };

      if (isEditMode && editId) {
        await hairstyleService.updateHairstyle(editId, payload);
      } else {
        await hairstyleService.createHairstyle(payload);
      }

      setToastOpen(true);
      setTimeout(() => {
        router.push('/hairstyles');
      }, 1000);
    } catch (err) {
      setErrors({ name: err instanceof Error ? err.message : 'Gagal menyimpan model rambut' });
      setHasErrors(true);
    }
  };

  const toggleFaceShape = (shape: keyof FaceShapeMap) => {
    setFaceShapes((prev) => ({ ...prev, [shape]: !prev[shape] }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Spinner size="lg" />
      </div>
    );
  }

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
        <p className="text-[12px] text-text-muted">
          {hasErrors
            ? 'Perbaiki field yang ditandai, lalu simpan kembali.'
            : 'Lengkapi nama dan foto referensi sebelum menyimpan.'}
        </p>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {isEditMode && (
            <Button
              type="button"
              variant="danger"
              size="md"
              onClick={() => setShowDeleteModal(true)}
            >
              Hapus Model
            </Button>
          )}
          <Button href="/hairstyles" variant="outline" size="md">
            Batal
          </Button>
          <Button type="submit" variant="primary" size="md">
            {isEditMode ? 'Simpan perubahan' : 'Simpan model'}
          </Button>
        </div>
      </div>

      {showDeleteModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowDeleteModal(false)}
          title="Konfirmasi Hapus Model Rambut"
          description={`Apakah Anda yakin ingin menghapus model rambut "${name}" dari katalog?`}
        >
          <div className="flex justify-end gap-3 pt-3">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)} disabled={isDeleting}>
              Batal
            </Button>
            <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? 'Menghapus...' : 'Ya, Hapus Model'}
            </Button>
          </div>
        </Modal>
      )}

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
