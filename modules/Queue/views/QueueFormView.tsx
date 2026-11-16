'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';
import { Dropdown } from '@/components/ui';
import { useTrimStore } from '@/store/useTrimStore';

export default function QueueFormView() {
  const router = useRouter();

  const kapsters = useTrimStore((s) => s.kapsters);
  const services = useTrimStore((s) => s.services);
  const waitingList = useTrimStore((s) => s.waitingList);
  const addWalkInQueue = useTrimStore((s) => s.addWalkInQueue);

  // Active kapsters
  const activeKapsters = kapsters.filter((k) => k.statusText === 'Aktif');
  const barberOptions =
    activeKapsters.length > 0 ? activeKapsters.map((k) => k.name) : ['Gus Farhan', 'Lefi Dian'];

  // Active services
  const activeServices = services.filter((s) => s.isActive);
  const availableServices =
    activeServices.length > 0
      ? activeServices.map((s) => ({
          id: s.id,
          name: s.name,
          duration: s.duration,
          price: s.price,
        }))
      : [
          { id: '1', name: 'Potong reguler', duration: 35, price: 60000 },
          { id: '2', name: 'Skin fade', duration: 45, price: 75000 },
          { id: '5', name: 'Hair wash', duration: 15, price: 20000 },
        ];

  // Next Queue Number
  const nextQueueNo = `A-0${waitingList.length + 22}`;

  // Form States - Informasi Booking
  const [customer, setCustomer] = useState('Satria Wibowo');
  const [barber, setBarber] = useState(barberOptions[0] || 'Gus Farhan');
  const [bookingDate, setBookingDate] = useState('Hari ini');
  const [startTime, setStartTime] = useState('15:00 WIB');
  const [selectedServices, setSelectedServices] = useState<string[]>([
    availableServices[0]?.id || '1',
  ]);
  const [estimatedWaitTime, setEstimatedWaitTime] = useState('10');
  const [errorMessage, setErrorMessage] = useState('');

  // Calculations
  const selectedServiceObjects = useMemo(() => {
    return availableServices.filter((srv) => selectedServices.includes(srv.id));
  }, [availableServices, selectedServices]);

  const totalDuration = useMemo(() => {
    return selectedServiceObjects.reduce((acc, curr) => acc + curr.duration, 0);
  }, [selectedServiceObjects]);

  const totalPrice = useMemo(() => {
    return selectedServiceObjects.reduce((acc, curr) => acc + curr.price, 0);
  }, [selectedServiceObjects]);

  // Handler Pilihan Layanan
  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((sId) => sId !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customer.trim()) {
      setErrorMessage('Nama pelanggan wajib diisi.');
      return;
    }

    if (selectedServices.length === 0) {
      setErrorMessage('Pilih minimal satu layanan.');
      return;
    }

    const serviceNames = selectedServiceObjects.map((s) => s.name).join(' + ');

    addWalkInQueue({
      queueNo: nextQueueNo,
      timeRange: `${startTime.replace(' WIB', '')}–${totalDuration} mnt`,
      customerName: customer.trim(),
      serviceDetail: `${serviceNames} • ${totalDuration} menit`,
      kapsterName: barber,
      statusText: `Tunggu ${estimatedWaitTime} menit`,
      statusFlowText: 'waiting / in_queue',
      checkInTime: `Check-in ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`,
    });

    router.push('/queue');
  };

  return (
    <div className="space-y-6 pb-20 font-space-grotesk no-scrollbar selection:bg-secondary selection:text-white">
      {/* Breadcrumb & Header */}
      <div className="space-y-1 font-outfit">
        <div className="flex items-center gap-2 text-xs md:text-[13px] text-text-muted">
          <Link href="/queue" className="hover:text-white transition-colors">
            Monitor Antrean
          </Link>
          <span>/</span>
          <span className="text-white font-medium">Tambah Antrean</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div>
            <h1 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight">
              Tambah Antrean
            </h1>
            <p className="text-text-muted text-xs md:text-sm mt-0.5">
              Buat antrean walk-in atau booking baru langsung ke papan antrean TRIM Bandung.
            </p>
          </div>

          <Link
            href="/queue"
            className="bg-raised border border-border hover:bg-border text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all cursor-pointer w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke monitor</span>
          </Link>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-outfit text-sm">
          {errorMessage}
        </div>
      )}

      {/* Main Grid Layout */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Kolom Kiri Utama */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Informasi Booking */}
          <div className="p-6 md:p-8 rounded-2xl bg-surface border border-border space-y-6 shadow-md font-outfit">
            <div>
              <h2 className="text-lg font-bold text-white">Informasi antrean</h2>
              <p className="text-[12px] text-text-muted uppercase tracking-wider mt-0.5">
                Pelanggan dan kapster yang melayani
              </p>
            </div>

            {/* Row 1: Pelanggan & Kapster */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[14px] font-bold text-white">
                  Nama pelanggan *
                </label>
                <input
                  type="text"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  required
                  className="w-full bg-raised/60 border border-border/80 focus:border-secondary rounded-xl px-4 py-2.5 text-[14px] text-white placeholder:text-text-muted outline-none transition-colors font-outfit"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[14px] font-bold text-white">
                  Pilih kapster *
                </label>
                <Dropdown
                  value={barber}
                  onChange={setBarber}
                  variant="form"
                  options={barberOptions}
                />
              </div>
            </div>

            {/* Row 2: Waktu & Tanggal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[14px] font-bold text-white">
                  Waktu mulai perkiraan
                </label>
                <input
                  type="text"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  placeholder="Contoh: 15:00 WIB"
                  className="w-full bg-raised/60 border border-border/80 focus:border-secondary rounded-xl px-4 py-2.5 text-[14px] text-white outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[14px] font-bold text-white">
                  Estimasi tunggu (menit)
                </label>
                <input
                  type="number"
                  min="0"
                  value={estimatedWaitTime}
                  onChange={(e) => setEstimatedWaitTime(e.target.value)}
                  className="w-full bg-raised/60 border border-border/80 focus:border-secondary rounded-xl px-4 py-2.5 text-[14px] text-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Pilihan Layanan */}
          <div className="p-6 md:p-8 rounded-2xl bg-surface border border-border space-y-6 shadow-md font-outfit">
            <div>
              <h2 className="text-lg font-bold text-white">Pilihan layanan</h2>
              <p className="text-[12px] text-text-muted uppercase tracking-wider mt-0.5">
                Pilih satu atau lebih layanan yang dipesan pelanggan
              </p>
            </div>

            {/* Checkbox Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {availableServices.map((srv) => {
                const isSelected = selectedServices.includes(srv.id);
                return (
                  <div
                    key={srv.id}
                    onClick={() => toggleService(srv.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#1e140e] border-secondary'
                        : 'bg-raised/40 border-border hover:border-border/80'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 border transition-colors ${
                          isSelected
                            ? 'bg-secondary border-secondary text-white'
                            : 'bg-surface border-border'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-white">{srv.name}</h4>
                        <p className="text-[13px] text-text-muted mt-0.5">
                          {srv.duration} menit • Rp{srv.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Kolom Kanan Sidebar */}
        <div className="space-y-6 font-outfit">
          {/* Card Ringkasan Booking */}
          <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
            <div>
              <h3 className="text-base font-bold text-white">Ringkasan Antrean</h3>
              <p className="text-[12px] text-text-muted mt-0.5">
                Total estimasi biaya & pengerjaan
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-extrabold text-secondary">
                Rp{totalPrice.toLocaleString('id-ID')}
              </h2>
              <p className="text-[13px] text-text-muted mt-1">
                {selectedServices.length} layanan • {totalDuration} menit
              </p>
            </div>

            <div className="pt-3 border-t border-border/60 text-[13px] space-y-1">
              <p className="font-bold text-white">{customer}</p>
              <p className="text-text-muted">
                Kapster: <span className="text-white font-medium">{barber}</span>
              </p>
            </div>
          </div>

          {/* Card Nomor Antrean */}
          <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
            <h3 className="text-base font-bold text-white">Nomor Antrean</h3>
            <div className="p-4 rounded-xl bg-raised/50 border border-secondary/30 flex items-center justify-between">
              <div>
                <span className="text-xs text-text-muted block">Nomor Tiket</span>
                <span className="text-2xl font-extrabold text-secondary">{nextQueueNo}</span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-950/40 border border-amber-500/20 text-amber-400">
                Menunggu
              </span>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Bar */}
        <div className="lg:col-span-3 bg-[#24130A] border-l-4 border-secondary rounded-lg p-5 flex flex-col sm:flex-row items-center justify-between gap-4 font-outfit shadow-md">
          <span className="text-[13px] text-text-muted">
            Periksa data antrean sebelum menyimpan ke monitor langsung.
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Link
              href="/queue"
              className="px-5 py-2.5 rounded-xl bg-raised border border-border text-sm font-bold text-white hover:bg-border transition-colors cursor-pointer text-center"
            >
              Batal
            </Link>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary/90 text-sm font-bold text-white shadow-lg shadow-secondary/20 transition-all active:scale-95 cursor-pointer text-center"
            >
              Simpan antrean
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
