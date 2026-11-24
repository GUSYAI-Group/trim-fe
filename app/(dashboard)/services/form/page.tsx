'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { Button, Alert, Toast, Spinner, Card, TextField, SelectField, Switch, Modal } from '@/components/ui';
import { servicesService } from '@/services/endpoints/service';
import { serviceSchema, ServiceFormData } from '@/utils/validations/schemas';
import { ServiceGuideSidebarSection } from './sections/ServiceGuideSidebarSection';

const SERVICE_CATEGORY_OPTIONS = [
  { value: 'Potong rambut', label: 'Potong rambut' },
  { value: 'Paket', label: 'Paket' },
  { value: 'Perawatan', label: 'Perawatan' },
  { value: 'Styling', label: 'Styling' },
  { value: 'Pewarnaan', label: 'Pewarnaan' },
];

function ServiceFormInner({ editId }: { editId: string | null }) {
  const router = useRouter();
  const isEditMode = Boolean(editId);

  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: '',
      category: 'Potong rambut',
      duration: 35,
      price: 50000,
      isActive: true,
    },
    mode: 'onBlur',
  });

  const nameValue = watch('name');
  const isActiveValue = watch('isActive');

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!editId) return;
    setIsDeleting(true);
    try {
      await servicesService.deleteService(editId);
      setToastMsg(`Layanan "${nameValue}" berhasil dihapus.`);
      setTimeout(() => {
        router.push('/services');
      }, 800);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Gagal menghapus layanan');
      setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (!editId) return;

    async function loadService(id: string) {
      try {
        setIsLoadingData(true);
        const res = await servicesService.getServiceDetail(id);
        const found = res.data;
        if (found) {
          reset({
            name: found.name,
            category: found.category,
            duration: Number(found.duration),
            price: Number(found.price),
            isActive: Boolean(found.isActive),
          });
        }
      } catch (err) {
        setErrorMsg(err instanceof Error ? err.message : 'Gagal memuat layanan');
      } finally {
        setIsLoadingData(false);
      }
    }

    loadService(editId);
  }, [editId, reset]);

  const onSubmit = async (data: ServiceFormData) => {
    setErrorMsg(null);
    try {
      if (isEditMode && editId) {
        await servicesService.updateService(editId, data);
        setToastMsg(`Layanan "${data.name}" berhasil diperbarui.`);
      } else {
        await servicesService.createService(data);
        setToastMsg(`Layanan "${data.name}" berhasil dibuat.`);
      }

      setTimeout(() => {
        router.push('/services');
      }, 1000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Gagal menyimpan layanan');
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
                ? `Perbarui nama, durasi, harga, kategori, dan status ${nameValue || 'layanan'}.`
                : 'Buat layanan baru untuk menu TRIM Barbershop.'}
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

      {errorMsg && (
        <Alert
          variant="error"
          title="Terjadi Kesalahan"
          description={errorMsg}
        />
      )}

      {/* Grid Content Utama */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <Card className="lg:col-span-2 p-6 md:p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-border/60 pb-4">
            <div>
              <h2 className="text-[20px] font-bold text-text-main">Informasi layanan</h2>
              <p className="text-[14px] text-text-muted mt-0.5">
                {isEditMode
                  ? `Perbarui detail ${nameValue || 'layanan'} sesuai menu toko.`
                  : 'Lengkapi detail layanan yang akan ditampilkan kepada pelanggan.'}
              </p>
            </div>
            <span className="text-[12px] text-text-muted">* Wajib diisi</span>
          </div>

          <TextField
            label="Nama layanan"
            required
            placeholder="Contoh: Potong reguler"
            helperText="Gunakan nama yang mudah dikenali pelanggan."
            errorText={errors.name?.message}
            isError={Boolean(errors.name)}
            {...register('name')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <TextField
              label="Durasi (menit)"
              type="number"
              required
              className="font-mono"
              placeholder="Contoh: 35"
              rightAddon="menit"
              helperText="Estimasi durasi pengerjaan dalam menit."
              errorText={errors.duration?.message}
              isError={Boolean(errors.duration)}
              {...register('duration', { valueAsNumber: true })}
            />

            <TextField
              label="Harga (Rupiah)"
              type="number"
              required
              className="font-mono"
              placeholder="Contoh: 60000"
              leftAddon="Rp"
              helperText="Harga tarif layanan dalam Rupiah."
              errorText={errors.price?.message}
              isError={Boolean(errors.price)}
              {...register('price', { valueAsNumber: true })}
            />
          </div>

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <SelectField
                label="Kategori"
                required
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                options={SERVICE_CATEGORY_OPTIONS}
                helperText="Pilih kelompok layanan."
              />
            )}
          />

          <div className="border-t border-border/60 pt-4 flex items-center justify-between">
            <div>
              <p className="text-[14px] font-medium text-text-main">Status Layanan</p>
              <p className="text-[12px] text-text-muted">Aktifkan agar dapat dipilih pelanggan saat booking.</p>
            </div>
            <Switch
              checked={isActiveValue}
              onChange={(checked) => setValue('isActive', checked)}
            />
          </div>
        </Card>

        <div className="space-y-6">
          <ServiceGuideSidebarSection isEditMode={isEditMode} />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Menyimpan...' : isEditMode ? 'Simpan perubahan' : 'Buat layanan'}
          </Button>

          {isEditMode && (
            <Button
              type="button"
              variant="danger"
              fullWidth
              size="lg"
              onClick={() => setShowDeleteModal(true)}
            >
              Hapus Layanan
            </Button>
          )}
        </div>
      </div>

      {showDeleteModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowDeleteModal(false)}
          title="Konfirmasi Hapus Layanan"
          description={`Apakah Anda yakin ingin menghapus layanan "${nameValue}"?`}
        >
          <div className="flex justify-end gap-3 pt-3">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)} disabled={isDeleting}>
              Batal
            </Button>
            <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? 'Menghapus...' : 'Ya, Hapus Layanan'}
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

export default function ServiceFormPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center py-24">
          <Spinner size="lg" />
        </div>
      }
    >
      <ServiceFormConsumer />
    </Suspense>
  );
}

function ServiceFormConsumer() {
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');
  return <ServiceFormInner editId={editId} />;
}
