'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { Button, Toast, Spinner, Alert, Card, TextField, SelectField, Avatar, Modal } from '@/components/ui';
import { barberService } from '@/services/endpoints/barber';
import { barberSchema, BarberFormData } from '@/utils/validations/schemas';
import { BarberStatusSidebarSection } from './sections/BarberStatusSidebarSection';

const BARBER_SPECIALTY_OPTIONS = [
  { value: 'Fade Master', label: 'Fade Master' },
  { value: 'Classic Scissor Cut', label: 'Classic Scissor Cut' },
  { value: 'Texture & Modern Style', label: 'Texture & Modern Style' },
  { value: 'Beard Grooming Specialist', label: 'Beard Grooming Specialist' },
  { value: 'Taper & Creative Lines', label: 'Taper & Creative Lines' },
  { value: 'Junior Stylist', label: 'Junior Stylist' },
];

function BarberFormInner({ editId }: { editId: string | null }) {
  const router = useRouter();
  const isEditMode = Boolean(editId);

  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!editId) return;
    setIsDeleting(true);
    try {
      await barberService.deleteBarber(editId);
      setToastMsg(`Kapster berhasil dihapus.`);
      setTimeout(() => {
        router.push('/barbers');
      }, 800);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Gagal menghapus kapster');
      setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BarberFormData>({
    resolver: zodResolver(barberSchema),
    defaultValues: {
      name: '',
      phone: '',
      specialty: 'Fade Master',
      isActive: true,
    },
    mode: 'onBlur',
  });

  const nameValue = watch('name');
  const isActiveValue = watch('isActive');

  // Load existing barber if in edit mode
  useEffect(() => {
    if (!editId) return;

    async function loadBarber(id: string) {
      try {
        setIsLoadingData(true);
        const res = await barberService.getBarberDetail(id);
        const found = res.data;
        if (found) {
          reset({
            name: found.name,
            phone: found.phone || '',
            specialty: found.specialty || 'Fade Master',
            isActive: found.status === 'aktif',
          });
        }
      } catch (err) {
        setErrorMsg(err instanceof Error ? err.message : 'Gagal memuat profil kapster');
      } finally {
        setIsLoadingData(false);
      }
    }

    loadBarber(editId);
  }, [editId, reset]);

  const onSubmit = async (data: BarberFormData) => {
    setErrorMsg(null);
    try {
      if (isEditMode && editId) {
        await barberService.updateBarber(editId, data);
        setToastMsg(`Profil kapster "${data.name}" berhasil diperbarui.`);
      } else {
        await barberService.createBarber(data);
        setToastMsg(`Kapster "${data.name}" berhasil ditambahkan.`);
      }

      setTimeout(() => {
        router.push('/barbers');
      }, 1000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Gagal menyimpan data kapster');
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex justify-center items-center py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
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
                ? `Perbarui profil ${nameValue || 'kapster'}, spesialisasi, dan status aktifnya.`
                : 'Lengkapi profil dan nomor kontak untuk mendaftarkan kapster baru.'}
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

      {errorMsg && (
        <Alert
          variant="error"
          title="Terjadi Kesalahan"
          description={errorMsg}
        />
      )}

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 md:p-8 space-y-8">
            <div className="space-y-1">
              <h2 className="text-[20px] font-bold text-text-main">Informasi kapster</h2>
              <p className="text-[14px] text-text-muted">
                Data yang tampil pada profil kapster. Tanda <span className="text-secondary">*</span> wajib diisi.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <Avatar name={nameValue || 'K'} size={88} shape="rounded" variant="surface" />
              <div className="space-y-2.5">
                <p className="text-[14px] font-medium text-text-main">Foto profil</p>
                <p className="text-[12px] text-text-muted">Avatar otomatis dibuat dari inisial nama.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField
                label="Nama lengkap"
                required
                placeholder="Contoh: Gus Farhan"
                helperText="Nama yang akan dikenali pelanggan."
                errorText={errors.name?.message}
                isError={Boolean(errors.name)}
                {...register('name')}
              />

              <TextField
                label="Nomor WhatsApp / Telepon"
                required
                placeholder="Contoh: 081234567890"
                helperText="Digunakan untuk konfirmasi dan jadwal."
                errorText={errors.phone?.message}
                isError={Boolean(errors.phone)}
                {...register('phone')}
              />
            </div>

            <Controller
              name="specialty"
              control={control}
              render={({ field }) => (
                <SelectField
                  label="Spesialisasi pengerjaan"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  options={BARBER_SPECIALTY_OPTIONS}
                  helperText="Keahlian utama kapster yang akan tampil di katalog pemesanan."
                />
              )}
            />
          </Card>
        </div>

        <div className="space-y-6">
          <BarberStatusSidebarSection
            isEditMode={isEditMode}
            name={nameValue || 'Kapster'}
            status={isActiveValue ? 'aktif' : 'nonaktif'}
            onStatusChange={(newStatus) => setValue('isActive', newStatus === 'aktif')}
            rating="5.0"
            finished={0}
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Menyimpan...' : isEditMode ? 'Simpan perubahan' : 'Tambahkan kapster'}
          </Button>

          {isEditMode && (
            <Button
              type="button"
              variant="danger"
              fullWidth
              size="lg"
              onClick={() => setShowDeleteModal(true)}
            >
              Hapus Kapster
            </Button>
          )}
        </div>
      </div>

      {showDeleteModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowDeleteModal(false)}
          title="Konfirmasi Hapus Kapster"
          description="Apakah Anda yakin ingin menghapus kapster ini? Jika memiliki riwayat booking, statusnya akan dinonaktifkan secara aman."
        >
          <div className="flex justify-end gap-3 pt-3">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)} disabled={isDeleting}>
              Batal
            </Button>
            <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? 'Menghapus...' : 'Ya, Hapus Kapster'}
            </Button>
          </div>
        </Modal>
      )}

      {toastMsg && (
        <Toast
          isOpen={true}
          title="Berhasil Disimpan"
          description={toastMsg}
          onClose={() => setToastMsg(null)}
        />
      )}
    </form>
  );
}

export default function BarberFormPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center py-24">
          <Spinner size="lg" />
        </div>
      }
    >
      <BarberFormConsumer />
    </Suspense>
  );
}

function BarberFormConsumer() {
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');
  return <BarberFormInner editId={editId} />;
}
