'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, Check } from 'lucide-react';

interface ServiceOption {
  id: string;
  name: string;
  duration: number; // menit
  price: number;
}

const AVAILABLE_SERVICES: ServiceOption[] = [
  { id: 'srv-1', name: 'Potong reguler', duration: 35, price: 60000 },
  { id: 'srv-2', name: 'Skin fade', duration: 45, price: 75000 },
  { id: 'srv-3', name: 'Potong + beard trim', duration: 60, price: 100000 },
  { id: 'srv-4', name: 'Potong anak', duration: 30, price: 50000 },
  { id: 'srv-5', name: 'Hair wash', duration: 15, price: 20000 },
  { id: 'srv-6', name: 'Styling', duration: 15, price: 25000 },
];

export default function QueueFormView() {
  // Form States - Informasi Booking
  const [customer, setCustomer] = useState('Satria Wibowo');
  const [barber, setBarber] = useState('Raka Putra');
  const [bookingDate, setBookingDate] = useState('7 Oktober 2026');
  const [startTime, setStartTime] = useState('10:00 WIB');
  const [bookingStatus, setBookingStatus] = useState('confirmed');

  // Form States - Pilihan Layanan (Default terpilih: Potong reguler & Hair wash sesuai Figma)
  const [selectedServices, setSelectedServices] = useState<string[]>(['srv-1', 'srv-5']);

  // Form States - Konteks Antrean
  const [queueStatus, setQueueStatus] = useState('waiting');
  const [estimatedWaitTime, setEstimatedWaitTime] = useState('0');

  // Kalkulasi Otomatis Total Durasi & Harga
  const selectedServiceObjects = useMemo(() => {
    return AVAILABLE_SERVICES.filter((srv) => selectedServices.includes(srv.id));
  }, [selectedServices]);

  const totalDuration = useMemo(() => {
    return selectedServiceObjects.reduce((acc, curr) => acc + curr.duration, 0);
  }, [selectedServiceObjects]);

  const totalPrice = useMemo(() => {
    return selectedServiceObjects.reduce((acc, curr) => acc + curr.price, 0);
  }, [selectedServiceObjects]);

  // Handler Pilihan Layanan
  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter((sId) => sId !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Antrean untuk ${customer} berhasil dibuat!`);
  };

  return (
    <div className="space-y-6 pb-20 font-space-grotesk no-scrollbar selection:bg-secondary selection:text-white">
      {/* Breadcrumb & Header */}
      <div className="space-y-1 font-outfit">
        <div className="flex items-center gap-2 text-xs text-text-muted">
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
              Buat booking beserta antreannya dalam satu penyimpanan.
            </p>
          </div>

          <Link
            href="/queue"
            className="bg-raised border border-border hover:bg-border text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke monitor</span>
          </Link>
        </div>
      </div>

      {/* Main Grid Layout */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Kolom Kiri Utama */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Informasi Booking */}
          <div className="p-6 md:p-8 rounded-2xl bg-surface border border-border space-y-6 shadow-md font-outfit">
            <div>
              <h2 className="text-lg font-bold text-white">Informasi booking</h2>
              <p className="text-[11px] text-text-muted uppercase tracking-wider mt-0.5">
                BOOKINGS • Pelanggan dan jadwal layanan
              </p>
            </div>

            {/* Row 1: Pelanggan & Kapster */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-white">
                  Pelanggan • customer_id
                </label>
                <div className="relative">
                  <select
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    className="w-full appearance-none bg-raised/60 border border-border/80 focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-white outline-none cursor-pointer"
                  >
                    <option value="Satria Wibowo" className="bg-surface text-white">
                      Satria Wibowo
                    </option>
                    <option value="Budi Santoso" className="bg-surface text-white">
                      Budi Santoso
                    </option>
                    <option value="Aditya Pratama" className="bg-surface text-white">
                      Aditya Pratama
                    </option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-text-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <p className="text-[11px] text-text-muted">Pilih pelanggan yang sudah terdaftar.</p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-white">
                  Kapster • barber_id
                </label>
                <div className="relative">
                  <select
                    value={barber}
                    onChange={(e) => setBarber(e.target.value)}
                    className="w-full appearance-none bg-raised/60 border border-border/80 focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-white outline-none cursor-pointer"
                  >
                    <option value="Raka Putra" className="bg-surface text-white">
                      Raka Putra
                    </option>
                    <option value="Andi Wijaya" className="bg-surface text-white">
                      Andi Wijaya
                    </option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-text-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <p className="text-[11px] text-text-muted">
                  Skin fade • Aktif. Hanya kapster aktif dapat dipilih.
                </p>
              </div>
            </div>

            {/* Row 2: Tanggal, Jam Mulai, Jam Selesai */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-white">
                  Tanggal • booking_date
                </label>
                <div className="relative">
                  <select
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full appearance-none bg-raised/60 border border-border/80 focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-white outline-none cursor-pointer"
                  >
                    <option value="7 Oktober 2026" className="bg-surface text-white">
                      7 Oktober 2026
                    </option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-text-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-white">
                  Mulai • start_time
                </label>
                <div className="relative">
                  <select
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full appearance-none bg-raised/60 border border-border/80 focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-white outline-none cursor-pointer"
                  >
                    <option value="10:00 WIB" className="bg-surface text-white">
                      10:00 WIB
                    </option>
                    <option value="11:00 WIB" className="bg-surface text-white">
                      11:00 WIB
                    </option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-text-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-white">
                  Selesai • end_time
                </label>
                <div className="relative">
                  <input
                    type="text"
                    disabled
                    value="10:50 WIB"
                    className="w-full bg-raised/40 border border-border/60 rounded-xl px-4 py-2.5 text-xs text-white/70 outline-none cursor-not-allowed"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase bg-surface px-1.5 py-0.5 rounded border border-border text-text-muted">
                    OTOMATIS
                  </span>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-text-muted">
              Waktu selesai dihitung dari waktu mulai + total durasi layanan ({totalDuration} menit).
            </p>

            {/* Status Booking */}
            <div className="space-y-1.5 pt-2 border-t border-border/60">
              <label className="block text-xs font-bold text-white">
                Status booking • BOOKINGS.status
              </label>
              <div className="relative">
                <select
                  value={bookingStatus}
                  onChange={(e) => setBookingStatus(e.target.value)}
                  className="w-full appearance-none bg-raised/60 border border-border/80 focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-white outline-none cursor-pointer"
                >
                  <option value="confirmed" className="bg-surface text-white">
                    confirmed
                  </option>
                  <option value="pending" className="bg-surface text-white">
                    pending
                  </option>
                  <option value="checked_in" className="bg-surface text-white">
                    checked_in
                  </option>
                </select>
                <ChevronDown className="w-4 h-4 text-text-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <p className="text-[11px] text-text-muted leading-relaxed">
                Booking mendatang • Belum masuk papan aktif sampai check-in.
                <br />
                Status booking: pending, confirmed, checked_in, in_queue, in_service, completed, cancelled, no_show.
              </p>
            </div>
          </div>

          {/* Card 2: Pilihan Layanan */}
          <div className="p-6 md:p-8 rounded-2xl bg-surface border border-border space-y-6 shadow-md font-outfit">
            <div>
              <h2 className="text-lg font-bold text-white">Pilihan layanan</h2>
              <p className="text-[11px] text-text-muted uppercase tracking-wider mt-0.5">
                SERVICES → BOOKING_SERVICES • Bisa memilih lebih dari satu layanan aktif
              </p>
            </div>

            {/* Checkbox Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {AVAILABLE_SERVICES.map((srv) => {
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
                        <h4 className="text-xs font-bold text-white">{srv.name}</h4>
                        <p className="text-[11px] text-text-muted mt-0.5">
                          {srv.duration} menit • Rp{srv.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* List Snapshot Harga Layanan */}
            <div className="p-4 rounded-xl bg-raised/50 border border-border/80 space-y-3">
              <h4 className="text-xs font-bold text-white">Harga tersimpan per layanan</h4>
              {selectedServiceObjects.map((srv) => (
                <div key={srv.id} className="flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-white">{srv.name}</p>
                    <p className="text-[11px] text-text-muted">
                      Harga saat ini Rp{srv.price.toLocaleString('id-ID')} • {srv.duration} menit
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white">
                      Rp{srv.price.toLocaleString('id-ID')}
                    </p>
                    <p className="text-[10px] text-text-muted">price_at_booking</p>
                  </div>
                </div>
              ))}
              <p className="text-[10px] text-text-muted pt-2 border-t border-border/50">
                Harga saat ini menjadi snapshot price_at_booking saat booking disimpan.
              </p>
            </div>
          </div>
        </div>

        {/* Kolom Kanan Sidebar */}
        <div className="space-y-6 font-outfit">
          {/* Card Ringkasan Booking */}
          <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
            <div>
              <h3 className="text-base font-bold text-white">Ringkasan booking</h3>
              <p className="text-[11px] text-text-muted mt-0.5">
                Total harga • total_price
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-extrabold text-white">
                Rp{totalPrice.toLocaleString('id-ID')}
              </h2>
              <p className="text-xs text-text-muted mt-1">
                {selectedServices.length} layanan • {totalDuration} menit • Tanpa perubahan tersimpan
              </p>
            </div>

            <div className="pt-3 border-t border-border/60 text-xs space-y-1">
              <p className="font-bold text-white">{bookingDate}</p>
              <p className="text-text-muted">
                {startTime}–10:50 WIB • {barber}
              </p>
            </div>
          </div>

          {/* Card Konteks Antrean */}
          <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
            <div>
              <h3 className="text-base font-bold text-white">Konteks antrean</h3>
              <p className="text-[11px] text-text-muted uppercase tracking-wider mt-0.5">
                QUEUES • Terhubung 1:1 ke booking
              </p>
            </div>

            {/* Nomor Antrean (Autogenerated) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-white">
                Nomor antrean • queue_number
              </label>
              <div className="relative">
                <input
                  type="text"
                  disabled
                  value="A-029 • Pratinjau"
                  className="w-full bg-raised/40 border border-border/60 rounded-xl px-4 py-2.5 text-xs text-white/70 outline-none cursor-not-allowed"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase bg-surface px-1.5 py-0.5 rounded border border-border text-text-muted">
                  OTOMATIS
                </span>
              </div>
              <p className="text-[10px] text-text-muted">
                Nomor final dibuat otomatis saat disimpan.
              </p>
            </div>

            {/* Status Antrean */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-white">
                Status antrean • QUEUES.status
              </label>
              <div className="relative">
                <select
                  value={queueStatus}
                  onChange={(e) => setQueueStatus(e.target.value)}
                  className="w-full appearance-none bg-raised/60 border border-border/80 focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-white outline-none cursor-pointer"
                >
                  <option value="waiting" className="bg-surface text-white">
                    waiting
                  </option>
                  <option value="in_progress" className="bg-surface text-white">
                    in_progress
                  </option>
                  <option value="completed" className="bg-surface text-white">
                    completed
                  </option>
                </select>
                <ChevronDown className="w-4 h-4 text-text-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <p className="text-[10px] text-text-muted">
                Status: waiting, in_progress, completed, skipped.
              </p>
            </div>

            {/* Estimasi Tunggu */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-white">
                Estimasi tunggu (menit)
              </label>
              <input
                type="number"
                value={estimatedWaitTime}
                onChange={(e) => setEstimatedWaitTime(e.target.value)}
                className="w-full bg-raised/60 border border-border/80 focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-white outline-none"
              />
              <p className="text-[10px] text-text-muted leading-tight">
                estimated_wait_time_mins • Bilangan bulat ≥ 0. Dapat disesuaikan oleh operator.
              </p>
            </div>

            {/* Waktu Masuk */}
            <div className="space-y-1 text-xs pt-2 border-t border-border/60">
              <h4 className="font-bold text-white">Waktu masuk • joined_at</h4>
              <p className="text-[11px] text-text-muted leading-relaxed">
                Diisi otomatis saat pelanggan benar-benar bergabung ke antrean, bukan waktu booking mendatang.
              </p>
              <p className="text-[10px] text-text-muted leading-relaxed pt-1">
                booking_id ditautkan otomatis ke booking yang dibuat bersama antrean ini.
              </p>
            </div>
          </div>

          {/* Card Pembayaran Dikelola Terpisah */}
          <div className="p-6 rounded-2xl bg-surface border border-border space-y-2 text-xs">
            <h4 className="font-bold text-white">Pembayaran dikelola terpisah</h4>
            <p className="text-text-muted leading-relaxed text-[11px]">
              PAYMENTS adalah record terpisah 1:1 dengan booking. Tidak ada input pembayaran pada form ini.
            </p>
            <p className="text-text-muted leading-relaxed text-[10px] pt-1 border-t border-border/50">
              UUID dan created_at dibuat otomatis. Pilihan awal dan aturan validasi adalah aturan aplikasi, bukan default atau CHECK pada schema.
            </p>
          </div>
        </div>
      </form>

      {/* Sticky Bottom Bar */}
      <div className="p-4 rounded-2xl bg-surface border border-border flex flex-col sm:flex-row items-center justify-between gap-4 font-outfit shadow-xl">
        <span className="text-xs text-text-muted">
          Pelanggan &amp; kapster wajib dipilih; pilih layanan aktif dan jadwal tanpa bentrok.
        </span>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <Link
            href="/queue"
            className="px-5 py-2.5 rounded-xl bg-raised border border-border text-xs font-bold text-white hover:bg-border transition-colors cursor-pointer text-center"
          >
            Batal
          </Link>
          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary/90 text-xs font-bold text-white shadow-lg shadow-secondary/20 transition-all active:scale-95 cursor-pointer text-center"
          >
            Simpan antrean
          </button>
        </div>
      </div>
    </div>
  );
}