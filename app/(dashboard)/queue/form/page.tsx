'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button, Card, Toast } from '@/components/ui';
import { MOCK_SERVICES, MOCK_BARBERS } from '@/utils/mocks/mockData';
import { BookingFormSection } from './sections/BookingFormSection';
import { QueueContextSidebarSection } from './sections/QueueContextSidebarSection';

export default function QueueFormPage() {
  const [customer, setCustomer] = useState('Satria Wibowo');
  const [barber, setBarber] = useState('Raka Putra');
  const [bookingDate, setBookingDate] = useState('7 Oktober 2026');
  const [startTime, setStartTime] = useState('10:00 WIB');
  const [bookingStatus, setBookingStatus] = useState('confirmed');

  // Default terpilih: Potong reguler ('1') & Hair wash ('5')
  const [selectedServices, setSelectedServices] = useState<string[]>(['1', '5']);
  const [queueStatus, setQueueStatus] = useState('waiting');
  const [estimatedWaitTime, setEstimatedWaitTime] = useState('0');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const availableServices = useMemo(() => MOCK_SERVICES.slice(0, 6), []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMsg(`Antrean untuk ${customer} bersama kapster ${barber} berhasil dibuat!`);
  };

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
              Buat booking beserta antreannya dalam satu penyimpanan.
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
              barbers={MOCK_BARBERS}
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
