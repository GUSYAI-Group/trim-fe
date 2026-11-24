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
  const endTimeFormatted = React.useMemo(() => {
    if (!startTime) return 'Waktu live';
    const cleanTime = startTime.replace(' WIB', '').trim();
    const parts = cleanTime.split(':').map(Number);
    if (parts.length < 2 || isNaN(parts[0]) || isNaN(parts[1])) return startTime;
    const totalMins = parts[0] * 60 + parts[1] + (totalDuration || 30);
    const endH = String(Math.floor(totalMins / 60) % 24).padStart(2, '0');
    const endM = String(totalMins % 60).padStart(2, '0');
    return `${cleanTime}–${endH}:${endM} WIB`;
  }, [startTime, totalDuration]);

  return (
    <div className="space-y-6">
      <Card variant="surface" padding="md" className="space-y-4">
        <div>
          <h3 className="text-[16px] font-bold text-text-main">Ringkasan booking</h3>
          <p className="text-[12px] text-text-muted mt-0.5">
            Total harga • total_price
          </p>
        </div>

        <div>
          <h2 className="text-[28px] font-extrabold text-text-main font-mono">
            Rp{totalPrice.toLocaleString('id-ID')}
          </h2>
          <p className="text-[12px] text-text-muted mt-1">
            <span className="font-mono">{selectedServicesCount}</span> layanan • <span className="font-mono">{totalDuration}</span> menit
          </p>
        </div>

        <div className="pt-3 border-t border-border/60 text-[12px] space-y-1">
          <p className="font-bold text-text-main">{bookingDate || 'Hari ini'}</p>
          <p className="text-text-muted">
            <span className="font-mono">{endTimeFormatted}</span> • {barber || 'Kapster Terpilih'}
          </p>
        </div>
      </Card>

      <Card variant="surface" padding="md" className="space-y-4">
        <div>
          <h3 className="text-[16px] font-bold text-text-main">Konteks antrean</h3>
          <p className="text-[12px] text-text-muted uppercase tracking-wider mt-0.5">
            QUEUES • Terhubung 1:1 ke booking
          </p>
        </div>

        <TextField
          label="Nomor antrean • queue_number"
          disabled
          value="Otomatis diterbitkan sistem (A-xxx)"
          className="font-mono"
          rightAddon={
            <span className="text-[12px] uppercase bg-surface px-1.5 py-0.5 rounded border border-border text-text-muted font-mono">
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
          className="font-mono"
          value={estimatedWaitTime}
          onChange={(e) => onEstimatedWaitTimeChange(e.target.value)}
          helperText="estimated_wait_time_mins • Bilangan bulat ≥ 0. Dapat disesuaikan oleh operator."
        />

        <div className="space-y-1 text-[12px] pt-2 border-t border-border/60">
          <h4 className="font-bold text-text-main text-[14px]">Waktu masuk • joined_at</h4>
          <p className="text-[12px] text-text-muted leading-relaxed">
            Diisi otomatis saat pelanggan benar-benar bergabung ke antrean, bukan waktu booking mendatang.
          </p>
          <p className="text-[12px] text-text-muted leading-relaxed pt-1">
            booking_id ditautkan otomatis ke booking yang dibuat bersama antrean ini.
          </p>
        </div>
      </Card>

      <Card variant="surface" padding="md" className="space-y-2">
        <h4 className="font-bold text-text-main text-[14px]">Pembayaran dikelola terpisah</h4>
        <p className="text-text-muted leading-relaxed text-[12px]">
          PAYMENTS adalah record terpisah 1:1 dengan booking. Tidak ada input pembayaran pada form ini.
        </p>
        <p className="text-text-muted leading-relaxed text-[12px] pt-1 border-t border-border/50">
          UUID dan created_at dibuat otomatis. Pilihan awal dan aturan validasi adalah aturan aplikasi, bukan default atau CHECK pada schema.
        </p>
      </Card>
    </div>
  );
}
