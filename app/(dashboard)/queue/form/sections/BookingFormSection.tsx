'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { Card, SelectField, TextField } from '@/components/ui';
import { TService, TKapster } from '@/types';

interface BookingFormSectionProps {
  customer: string;
  onCustomerChange: (val: string) => void;
  barber: string;
  onBarberChange: (val: string) => void;
  barbers: TKapster[];
  bookingDate: string;
  onBookingDateChange: (val: string) => void;
  startTime: string;
  onStartTimeChange: (val: string) => void;
  bookingStatus: string;
  onBookingStatusChange: (val: string) => void;
  services: TService[];
  selectedServices: string[];
  onToggleService: (id: string) => void;
  selectedServiceObjects: TService[];
  totalDuration: number;
}

export function BookingFormSection({
  customer,
  onCustomerChange,
  barber,
  onBarberChange,
  barbers,
  bookingDate,
  onBookingDateChange,
  startTime,
  onStartTimeChange,
  bookingStatus,
  onBookingStatusChange,
  services,
  selectedServices,
  onToggleService,
  selectedServiceObjects,
  totalDuration,
}: BookingFormSectionProps) {
  return (
    <div className="space-y-6">
      <Card variant="surface" padding="lg" className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white">Informasi booking</h2>
          <p className="text-[11px] text-text-muted uppercase tracking-wider mt-0.5">
            BOOKINGS • Pelanggan dan jadwal layanan
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField
            label="Pelanggan • customer_id"
            value={customer}
            onChange={(e) => onCustomerChange(e.target.value)}
            options={[
              { value: 'Satria Wibowo', label: 'Satria Wibowo' },
              { value: 'Budi Santoso', label: 'Budi Santoso' },
              { value: 'Aditya Pratama', label: 'Aditya Pratama' },
            ]}
            helperText="Pilih pelanggan yang sudah terdaftar."
          />

          <SelectField
            label="Kapster • barber_id"
            value={barber}
            onChange={(e) => onBarberChange(e.target.value)}
            options={barbers
              .filter((b) => b.status === 'aktif')
              .map((b) => ({ value: b.name, label: b.name }))}
            helperText="Skin fade • Aktif. Hanya kapster aktif dapat dipilih."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SelectField
            label="Tanggal • booking_date"
            value={bookingDate}
            onChange={(e) => onBookingDateChange(e.target.value)}
            options={[
              { value: '7 Oktober 2026', label: '7 Oktober 2026' },
              { value: '8 Oktober 2026', label: '8 Oktober 2026' },
            ]}
          />

          <SelectField
            label="Mulai • start_time"
            value={startTime}
            onChange={(e) => onStartTimeChange(e.target.value)}
            options={[
              { value: '10:00 WIB', label: '10:00 WIB' },
              { value: '11:00 WIB', label: '11:00 WIB' },
              { value: '13:00 WIB', label: '13:00 WIB' },
            ]}
          />

          <TextField
            label="Selesai • end_time"
            disabled
            value="10:50 WIB"
            rightAddon={
              <span className="text-[10px] uppercase bg-surface px-1.5 py-0.5 rounded border border-border text-text-muted">
                OTOMATIS
              </span>
            }
          />
        </div>
        <p className="text-[11px] text-text-muted">
          Waktu selesai dihitung dari waktu mulai + total durasi layanan ({totalDuration} menit).
        </p>

        <div className="pt-2 border-t border-border/60">
          <SelectField
            label="Status booking • BOOKINGS.status"
            value={bookingStatus}
            onChange={(e) => onBookingStatusChange(e.target.value)}
            options={[
              { value: 'confirmed', label: 'confirmed' },
              { value: 'pending', label: 'pending' },
              { value: 'checked_in', label: 'checked_in' },
            ]}
            helperText="Booking mendatang • Belum masuk papan aktif sampai check-in. Status booking: pending, confirmed, checked_in, in_queue, in_service, completed, cancelled, no_show."
          />
        </div>
      </Card>

      <Card variant="surface" padding="lg" className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white">Pilihan layanan</h2>
          <p className="text-[11px] text-text-muted uppercase tracking-wider mt-0.5">
            SERVICES → BOOKING_SERVICES • Bisa memilih lebih dari satu layanan aktif
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {services.map((srv) => {
            const isSelected = selectedServices.includes(srv.id);
            return (
              <div
                key={srv.id}
                onClick={() => onToggleService(srv.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-secondary/10 border-secondary'
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
                <p className="font-bold text-white font-mono">
                  Rp{srv.price.toLocaleString('id-ID')}
                </p>
                <p className="text-[10px] text-text-muted font-mono">price_at_booking</p>
              </div>
            </div>
          ))}
          <p className="text-[10px] text-text-muted pt-2 border-t border-border/50">
            Harga saat ini menjadi snapshot price_at_booking saat booking disimpan.
          </p>
        </div>
      </Card>
    </div>
  );
}

