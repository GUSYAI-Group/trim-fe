'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button, Card, Toast, Spinner } from '@/components/ui';
import { servicesService } from '@/services/endpoints/service';
import { barberService } from '@/services/endpoints/barber';
import { queueService } from '@/services/endpoints/queue';
import { TService, TKapster } from '@/types';
import { BookingFormSection } from './sections/BookingFormSection';
import { QueueContextSidebarSection } from './sections/QueueContextSidebarSection';

function QueueFormContent() {
  const router = useRouter();
  const [customer, setCustomer] = useState('Pelanggan Walk-in');
  const [barber, setBarber] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [bookingStatus, setBookingStatus] = useState('confirmed');

  const [availableServices, setAvailableServices] = useState<TService[]>([]);
  const [availableBarbers, setAvailableBarbers] = useState<TKapster[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [queueStatus, setQueueStatus] = useState('waiting');
  const [estimatedWaitTime, setEstimatedWaitTime] = useState('0');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const now = new Date();
    setBookingDate(now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }));
    setStartTime(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB');

    async function loadData() {
      try {
        const [srvRes, brbRes] = await Promise.all([
          servicesService.getServices(),
          barberService.getBarbers(),
        ]);
        if (srvRes.data && srvRes.data.length > 0) {
          setAvailableServices(srvRes.data);
          setSelectedServices([srvRes.data[0].id]);
        }
        if (brbRes.data && brbRes.data.length > 0) {
          setAvailableBarbers(brbRes.data);
          setBarber(brbRes.data[0].name);
        }
      } catch (_err) {
        // Handled: empty states remain clean
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const selectedServiceObjects = useMemo(() => {
    return availableServices.filter((srv) => selectedServices.includes(srv.id));
  }, [availableServices, selectedServices]);

  const totalDuration = useMemo(() => {
    return selectedServiceObjects.reduce((acc, curr) => acc + curr.duration, 0);
  }, [selectedServiceObjects]);

  const totalPrice = useMemo(() => {
    return selectedServiceObjects.reduce((acc, curr) => acc + curr.price, 0);
  }, [selectedServiceObjects]);

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter((sId) => sId !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const selectedBarberObj = availableBarbers.find((b) => b.name === barber);
      const barberId = selectedBarberObj ? (selectedBarberObj.id || selectedBarberObj.uuid) : undefined;

      await queueService.createWalkIn({
        customerName: customer,
        barberId,
        serviceIds: selectedServices,
      });

      setToastMsg(`Antrean untuk ${customer} bersama kapster ${barber} berhasil dibuat!`);
      setTimeout(() => {
        router.push('/queue');
      }, 800);
    } catch (err) {
      setToastMsg(err instanceof Error ? err.message : 'Gagal membuat antrean');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8 selection:bg-secondary selection:text-white">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-[12px] text-text-muted">
          <Link href="/queue" className="hover:text-white transition-colors">
            Monitor Antrean
          </Link>
          <span>/</span>
          <span className="text-white font-medium">Tambah Antrean</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div>
            <h1 className="text-[28px] font-extrabold text-text-main tracking-tight">
              Tambah Antrean
            </h1>
            <p className="text-text-muted text-[14px] mt-0.5">
              Buat booking beserta antreannya langsung tersimpan ke database.
            </p>
          </div>

          <Button
            href="/queue"
            variant="outline"
            size="md"
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Kembali ke monitor
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2">
            <BookingFormSection
              customer={customer}
              onCustomerChange={setCustomer}
              barber={barber}
              onBarberChange={setBarber}
              barbers={availableBarbers}
              bookingDate={bookingDate}
              onBookingDateChange={setBookingDate}
              startTime={startTime}
              onStartTimeChange={setStartTime}
              bookingStatus={bookingStatus}
              onBookingStatusChange={setBookingStatus}
              services={availableServices}
              selectedServices={selectedServices}
              onToggleService={toggleService}
              selectedServiceObjects={selectedServiceObjects}
              totalDuration={totalDuration}
            />
          </div>

          <QueueContextSidebarSection
            totalPrice={totalPrice}
            selectedServicesCount={selectedServices.length}
            totalDuration={totalDuration}
            bookingDate={bookingDate}
            startTime={startTime}
            barber={barber}
            queueStatus={queueStatus}
            onQueueStatusChange={setQueueStatus}
            estimatedWaitTime={estimatedWaitTime}
            onEstimatedWaitTimeChange={setEstimatedWaitTime}
          />
        </div>

        {/* Bottom Action Footer */}
        <div className="p-5 rounded-2xl bg-surface border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-[12px] text-text-muted">
            Pelanggan &amp; kapster wajib dipilih; pilih layanan aktif dan jadwal tanpa bentrok.
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Button href="/queue" variant="outline" size="md">
              Batal
            </Button>
            <Button type="submit" variant="primary" size="md">
              Simpan antrean
            </Button>
          </div>
        </div>
      </form>

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast
            variant="success"
            title="Antrean Dibuat"
            description={toastMsg}
            onClose={() => setToastMsg(null)}
          />
        </div>
      )}
    </div>
  );
}

export default function QueueFormPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center py-24">
          <Spinner size="lg" />
        </div>
      }
    >
      <QueueFormContent />
    </Suspense>
  );
}
