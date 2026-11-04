import React from 'react';
import { Card, SelectField, TextField } from '@/components/ui';

interface QueueContextSidebarSectionProps {
  totalPrice: number;
  selectedServicesCount: number;
  totalDuration: number;
  bookingDate: string;
  startTime: string;
  barber: string;
  queueStatus: string;
  onQueueStatusChange: (val: string) => void;
  estimatedWaitTime: string;
  onEstimatedWaitTimeChange: (val: string) => void;
}

export function QueueContextSidebarSection({
  totalPrice,
  selectedServicesCount,
  totalDuration,
  bookingDate,
  startTime,
  barber,
  queueStatus,
  onQueueStatusChange,
  estimatedWaitTime,
  onEstimatedWaitTimeChange,
}: QueueContextSidebarSectionProps) {
  return (
    <div className="space-y-6">
      <Card variant="surface" padding="md" className="space-y-4">
        <div>
          <h3 className="text-base font-bold text-white">Ringkasan booking</h3>
          <p className="text-[11px] text-text-muted mt-0.5">
            Total harga • total_price
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-extrabold text-white font-mono">
            Rp{totalPrice.toLocaleString('id-ID')}
          </h2>
          <p className="text-xs text-text-muted mt-1">
            {selectedServicesCount} layanan • {totalDuration} menit • Tanpa perubahan tersimpan
          </p>
        </div>

        <div className="pt-3 border-t border-border/60 text-xs space-y-1">
          <p className="font-bold text-white">{bookingDate}</p>
          <p className="text-text-muted">
            {startTime}–10:50 WIB • {barber}
          </p>
        </div>
      </Card>

      <Card variant="surface" padding="md" className="space-y-4">
        <div>
          <h3 className="text-base font-bold text-white">Konteks antrean</h3>
          <p className="text-[11px] text-text-muted uppercase tracking-wider mt-0.5">
            QUEUES • Terhubung 1:1 ke booking
          </p>
        </div>

        <TextField
          label="Nomor antrean • queue_number"
          disabled
          value="A-029 • Pratinjau"
          rightAddon={
            <span className="text-[10px] uppercase bg-surface px-1.5 py-0.5 rounded border border-border text-text-muted">
              OTOMATIS
            </span>
          }
          helperText="Nomor final dibuat otomatis saat disimpan."
        />

        <SelectField
          label="Status antrean • QUEUES.status"
          value={queueStatus}
          onChange={(e) => onQueueStatusChange(e.target.value)}
          options={[
            { value: 'waiting', label: 'waiting' },
            { value: 'in_progress', label: 'in_progress' },
            { value: 'completed', label: 'completed' },
          ]}
          helperText="Status: waiting, in_progress, completed, skipped."
        />

        <TextField
          label="Estimasi tunggu (menit)"
          type="number"
          value={estimatedWaitTime}
          onChange={(e) => onEstimatedWaitTimeChange(e.target.value)}
          helperText="estimated_wait_time_mins • Bilangan bulat ≥ 0. Dapat disesuaikan oleh operator."
        />

        <div className="space-y-1 text-xs pt-2 border-t border-border/60">
          <h4 className="font-bold text-white">Waktu masuk • joined_at</h4>
          <p className="text-[11px] text-text-muted leading-relaxed">
            Diisi otomatis saat pelanggan benar-benar bergabung ke antrean, bukan waktu booking mendatang.
          </p>
          <p className="text-[10px] text-text-muted leading-relaxed pt-1">
            booking_id ditautkan otomatis ke booking yang dibuat bersama antrean ini.
          </p>
        </div>
      </Card>

      <Card variant="surface" padding="md" className="space-y-2 text-xs">
        <h4 className="font-bold text-white">Pembayaran dikelola terpisah</h4>
        <p className="text-text-muted leading-relaxed text-[11px]">
          PAYMENTS adalah record terpisah 1:1 dengan booking. Tidak ada input pembayaran pada form ini.
        </p>
        <p className="text-text-muted leading-relaxed text-[10px] pt-1 border-t border-border/50">
          UUID dan created_at dibuat otomatis. Pilihan awal dan aturan validasi adalah aturan aplikasi, bukan default atau CHECK pada schema.
        </p>
      </Card>
    </div>
  );
}

