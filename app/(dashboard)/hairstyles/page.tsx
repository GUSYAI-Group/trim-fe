'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Plus, ScanFace, ArrowRight } from 'lucide-react';
import { Button, Alert, Modal, Badge, Toast } from '@/components/ui';
import { hairstyleService } from '@/services/endpoints/hairstyle';
import { THairstyle } from '@/types';
import { HairstyleCatalogSection } from './sections/HairstyleCatalogSection';

export default function HairstylesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShape, setSelectedShape] = useState('Semua bentuk wajah');
  const [hairstyles, setHairstyles] = useState<THairstyle[]>([]);
  const [hairstyleDetail, setHairstyleDetail] = useState<THairstyle | null>(null);
  const [hairstyleToDelete, setHairstyleToDelete] = useState<THairstyle | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchHairstyles = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await hairstyleService.getHairstyles({
        search: searchTerm || undefined,
        faceShape: selectedShape === 'Semua bentuk wajah' ? undefined : selectedShape,
      });
      setHairstyles(res.data || []);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Gagal memuat katalog model rambut');
      setHairstyles([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, selectedShape]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchHairstyles();
    }, 250);

    return () => clearTimeout(timer);
  }, [fetchHairstyles]);

  const handleConfirmDelete = async () => {
    if (!hairstyleToDelete) return;
    try {
      await hairstyleService.deleteHairstyle(hairstyleToDelete.uuid || hairstyleToDelete.id);
      setToastMsg(`Model rambut "${hairstyleToDelete.name}" berhasil dihapus.`);
      fetchHairstyles();
    } catch (err) {
      setToastMsg(err instanceof Error ? err.message : 'Gagal menghapus model rambut');
    } finally {
      setHairstyleToDelete(null);
    }
  };

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

      {errorMsg && (
        <Alert
          variant="error"
          title="Gagal mengambil data katalog"
          description={errorMsg}
        />
      )}

      <Alert
        variant="accent"
        icon={<ScanFace className="w-5 h-5 text-secondary" />}
        title={`${hairstyles.length} model aktif • Terintegrasi dengan Backend & AI Catalog`}
        description="Data katalog gaya rambut tersinkronisasi langsung dengan basis data TRIM dan mapping face shapes."
      />

      <div className={isLoading ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
        <HairstyleCatalogSection
          hairstyles={hairstyles}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedShape={selectedShape}
          onShapeChange={setSelectedShape}
          onDetailRequest={setHairstyleDetail}
          onDeleteRequest={setHairstyleToDelete}
        />
      </div>

      {hairstyleDetail && (
        <Modal
          isOpen={true}
          onClose={() => setHairstyleDetail(null)}
          title={`Detail Model Rambut • ${hairstyleDetail.name}`}
          description="Karakteristik potongan, kecocokan bentuk wajah, dan integrasi rekomendasi AI."
        >
          <div className="space-y-4 py-1">
            <div className="relative w-full h-48 bg-primary rounded-xl overflow-hidden border border-border">
              <Image
                src={
                  hairstyleDetail.image &&
                  (hairstyleDetail.image.startsWith('/') || hairstyleDetail.image.startsWith('http'))
                    ? hairstyleDetail.image
                    : '/hairstyles/skin-fade.jpg.png'
                }
                alt={hairstyleDetail.name}
                fill
                className="object-cover object-center grayscale contrast-125 brightness-90"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm bg-surface p-4 rounded-xl border border-border">
              <div>
                <p className="text-text-muted text-xs">Nama Model</p>
                <p className="font-semibold text-text-main mt-0.5">{hairstyleDetail.name}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Tipe Rambut Sesuai</p>
                <p className="font-semibold text-text-main mt-0.5">{hairstyleDetail.hairType}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Tingkat Perawatan</p>
                <p className="font-semibold text-secondary mt-0.5">Level {hairstyleDetail.maintenanceLevel} / 5</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Status Rekomendasi AI</p>
                <div className="mt-1">
                  <Badge
                    variant={hairstyleDetail.isAiActive ? 'aktif' : 'nonaktif'}
                    label={hairstyleDetail.isAiActive ? 'Aktif di AI' : 'Nonaktif'}
                  />
                </div>
              </div>
              <div className="col-span-2">
                <p className="text-text-muted text-xs">Cocok untuk Bentuk Wajah</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {hairstyleDetail.faceShapes.map((shape, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-lg bg-raised border border-border text-xs text-text-main font-medium"
                    >
                      {shape}
                    </span>
                  ))}
                </div>
              </div>
              <div className="col-span-2">
                <p className="text-text-muted text-xs">Deskripsi Gaya</p>
                <p className="text-text-main mt-0.5 text-xs leading-relaxed">{hairstyleDetail.description}</p>
              </div>
            </div>

            <div className="flex justify-between items-center gap-3 pt-2">
              <Button
                variant="danger"
                onClick={() => {
                  setHairstyleToDelete(hairstyleDetail);
                  setHairstyleDetail(null);
                }}
              >
                Hapus Model
              </Button>
              <div className="flex items-center gap-2">
                <Button href={`/hairstyles/form?id=${hairstyleDetail.id}`} variant="primary">
                  Edit Model
                </Button>
                <Button variant="outline" onClick={() => setHairstyleDetail(null)}>
                  Tutup
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal Hapus Model Rambut */}
      {hairstyleToDelete && (
        <Modal
          isOpen={true}
          onClose={() => setHairstyleToDelete(null)}
          variant="destructive"
          title="Konfirmasi Hapus Model Rambut"
          description={`Apakah Anda yakin ingin menghapus model rambut "${hairstyleToDelete.name}" dari katalog?`}
          confirmText="Hapus Model"
          cancelText="Batal"
          onConfirm={handleConfirmDelete}
        />
      )}

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast
            isOpen={true}
            variant="success"
            title="Kelola Model Rambut"
            description={toastMsg}
            onClose={() => setToastMsg(null)}
          />
        </div>
      )}
    </div>
  );
}
