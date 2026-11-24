'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { Button, Alert, Modal, Toast } from '@/components/ui';
import { servicesService } from '@/services/endpoints/service';
import { TService } from '@/types';
import { ServiceStatsSection } from './sections/ServiceStatsSection';
import { ServiceTableSection } from './sections/ServiceTableSection';

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const [services, setServices] = useState<TService[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [stats, setStats] = useState({
    activeCount: 0,
    avgDuration: 0,
    popularServiceName: 'Belum ada data',
    popularServiceBookings: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<TService | null>(null);
  const [serviceDetail, setServiceDetail] = useState<TService | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await servicesService.getServices({
        search: searchQuery,
        category: selectedCategory,
      });

      setServices(res.data);
      setTotalCount(res.meta?.totalCount ?? res.data.length);
      const actCount = (res.meta as any)?.activeCount ?? res.data.filter((s) => s.isActive).length;
      setActiveCount(actCount);
      setStats({
        activeCount: actCount,
        avgDuration: Number((res.meta as any)?.avgDuration || 0),
        popularServiceName: (res.meta as any)?.popularServiceName || 'Belum ada data',
        popularServiceBookings: Number((res.meta as any)?.popularServiceBookings || 0),
      });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Gagal memuat layanan');
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchServices();
    }, 250);

    return () => clearTimeout(timer);
  }, [fetchServices]);

  const handleConfirmDelete = async () => {
    if (!serviceToDelete) return;
    try {
      await servicesService.deleteService(serviceToDelete.id);
      setToastMsg(`Layanan "${serviceToDelete.name}" berhasil dihapus.`);
      fetchServices();
    } catch (err) {
      setToastMsg(err instanceof Error ? err.message : 'Gagal menghapus layanan');
    } finally {
      setServiceToDelete(null);
    }
  };

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

      {errorMsg && (
        <Alert
          variant="error"
          title="Gagal mengambil data layanan"
          description={errorMsg}
        />
      )}

      <ServiceStatsSection
        activeCount={stats.activeCount}
        avgDuration={stats.avgDuration}
        popularServiceName={stats.popularServiceName}
        popularServiceBookings={stats.popularServiceBookings}
      />

      <div className={isLoading ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
        <ServiceTableSection
          services={services}
          totalCount={totalCount}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onDeleteRequest={setServiceToDelete}
          onDetailRequest={setServiceDetail}
        />
      </div>

      {serviceDetail && (
        <Modal
          isOpen={true}
          onClose={() => setServiceDetail(null)}
          title={`Detail Layanan • ${serviceDetail.name}`}
          description="Rincian tarif potong rambut, durasi estimasi pengerjaan, dan kategori menu."
        >
          <div className="space-y-4 py-1">
            <div className="grid grid-cols-2 gap-4 text-sm bg-surface p-4 rounded-xl border border-border">
              <div>
                <p className="text-text-muted text-xs">Nama Layanan</p>
                <p className="font-semibold text-text-main mt-0.5">{serviceDetail.name}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Kategori Menu</p>
                <p className="font-semibold text-text-main mt-0.5">{serviceDetail.category}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Estimasi Durasi</p>
                <p className="font-semibold text-text-main mt-0.5">{serviceDetail.duration} menit</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Tarif Harga</p>
                <p className="font-semibold text-success mt-0.5">Rp{serviceDetail.priceFormatted}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Status Layanan</p>
                <p className="font-semibold text-text-main mt-0.5">
                  {serviceDetail.isActive ? 'Tersedia untuk Booking' : 'Nonaktif'}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button href={`/services/form?id=${serviceDetail.id}`} variant="primary">
                Edit Layanan
              </Button>
              <Button variant="outline" onClick={() => setServiceDetail(null)}>
                Tutup
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {serviceToDelete && (
        <Modal
          isOpen={true}
          onClose={() => setServiceToDelete(null)}
          title="Konfirmasi Hapus Layanan"
          description={`Apakah kamu yakin ingin menghapus layanan "${serviceToDelete.name}"? Jika terkait dengan riwayat booking, status layanan akan otomatis dinonaktifkan.`}
        >
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setServiceToDelete(null)}>
              Batal
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Hapus Layanan
            </Button>
          </div>
        </Modal>
      )}

      {toastMsg && (
        <Toast
          isOpen={true}
          title="Kelola Layanan"
          description={toastMsg}
          onClose={() => setToastMsg(null)}
        />
      )}

      <Alert
        variant="accent"
        title="Harga booking tidak berubah saat tarif layanan diperbarui"
        description="Harga tersimpan di BOOKING_SERVICES.price_at_booking. Jadwal berada di BOOKINGS.start_time/end_time. Terhubung langsung ke database MySQL."
      />
    </div>
  );
}
