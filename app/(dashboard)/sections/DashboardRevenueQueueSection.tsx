import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Card, Badge, Button, Alert } from '@/components/ui';
import { DashboardStats, DashboardWeeklyRevenue, DashboardFloorStatus } from '@/services/endpoints/dashboard';

const STABLE_DEFAULT_BARS = [
  { label: 'H-6', height: '6%', val: 'Rp0', active: false },
  { label: 'H-5', height: '6%', val: 'Rp0', active: false },
  { label: 'H-4', height: '6%', val: 'Rp0', active: false },
  { label: 'H-3', height: '6%', val: 'Rp0', active: false },
  { label: 'H-2', height: '6%', val: 'Rp0', active: false },
  { label: 'Kemarin', height: '6%', val: 'Rp0', active: false },
  { label: 'Hari ini', height: '6%', val: 'Rp0', active: true },
];

interface DashboardRevenueQueueSectionProps {
  kpi?: DashboardStats['kpi'];
  weeklyRevenue?: DashboardWeeklyRevenue;
  floorStatus?: DashboardFloorStatus;
}

export function DashboardRevenueQueueSection({
  kpi,
  weeklyRevenue,
  floorStatus,
}: DashboardRevenueQueueSectionProps = {}) {
  const bars = weeklyRevenue?.bars && weeklyRevenue.bars.length > 0 ? weeklyRevenue.bars : STABLE_DEFAULT_BARS;
  const totalRevenue = weeklyRevenue?.formattedTotal || 'Rp0';
  const growthPercent = weeklyRevenue?.growthPercent || '0% minggu lalu';
  const periodLabel = weeklyRevenue?.periodLabel || '7 Hari Terakhir • PAYMENTS.status = paid';

  const badgeVariant: 'success' | 'danger' | 'muted' = growthPercent.includes('↑')
    ? 'success'
    : growthPercent.includes('↓')
    ? 'danger'
    : 'muted';

  const currentDate = floorStatus?.currentDateFormatted || 'Lantai toko live';
  const waitingCount = floorStatus?.waiting ?? kpi?.currently_in_queue ?? 0;
  const inProgressCount = floorStatus?.inProgress ?? 0;
  const completedCount = floorStatus?.completed ?? kpi?.completed_services ?? 0;
  const lateCount = floorStatus?.lateCount ?? 0;
  const lateNames = floorStatus?.lateCustomerNames ?? '';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Chart Pendapatan Mingguan */}
      <Card className="lg:col-span-2 p-6 md:p-8 flex flex-col justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-text-main mb-1">Pendapatan mingguan</h2>
          <p className="text-[12px] text-text-muted mb-6">{periodLabel}</p>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6">
            <h3 className="text-[28px] font-extrabold text-text-main font-mono">{totalRevenue}</h3>
            <Badge variant={badgeVariant} label={growthPercent} showDot={badgeVariant !== 'muted'} />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="w-full overflow-x-auto pt-2 pb-2 no-scrollbar">
          <div className="min-w-125 h-56 relative flex flex-col justify-between">
            {/* Guide Lines */}
            <div className="absolute inset-0 flex flex-col justify-between text-[12px] text-text-muted pt-2 pb-8 pointer-events-none">
              <div className="flex items-center leading-none"><span>Tinggi</span></div>
              <div className="flex items-center leading-none"><span>Sedang</span></div>
              <div className="flex items-center leading-none"><span>0</span></div>
            </div>

            {/* Batang Grafik */}
            <div className="absolute inset-0 flex justify-between items-end pl-12 pr-2 pt-8 pb-8 z-10">
              {bars.map((bar, i) => (
                <div key={i} className="flex flex-col items-center justify-end w-full px-2 h-full relative group">
                  <div
                    className={`w-full max-w-10 rounded-t-xl transition-all relative flex flex-col items-center ${
                      bar.active ? 'bg-secondary' : 'bg-secondary/25 hover:bg-secondary/40'
                    }`}
                    style={{ height: bar.height }}
                  >
                    <span
                      className={`absolute -top-6 text-[12px] font-medium font-mono whitespace-nowrap ${
                        bar.active ? 'text-secondary font-bold' : 'text-text-muted'
                      }`}
                    >
                      {bar.val}
                    </span>
                  </div>
                  <span className="text-[12px] font-mono text-text-muted absolute -bottom-6 whitespace-nowrap">
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Right: Lantai toko sekarang */}
      <Card className="p-6 md:p-8 flex flex-col justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-text-main mb-1">Lantai toko, sekarang</h2>
          <p className="text-[12px] text-text-muted mb-8">{currentDate}</p>

          <div className="space-y-6 mb-8">
            <div className="flex justify-between items-center">
              <span className="text-text-muted text-[14px]">Menunggu</span>
              <span className="text-warning text-[28px] font-extrabold font-mono">{waitingCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-muted text-[14px]">Sedang cukur</span>
              <span className="text-secondary text-[28px] font-extrabold font-mono">{inProgressCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-muted text-[14px]">Selesai</span>
              <span className="text-success text-[28px] font-extrabold font-mono">{completedCount}</span>
            </div>
          </div>

          {lateCount > 0 ? (
            <Alert
              variant="warning"
              title={`${lateCount} booking melewati jadwal`}
              description={`${lateNames} belum check-in. Buka monitor antrean untuk tindakan.`}
              className="mb-6"
            />
          ) : (
            <Alert
              variant="success"
              title="Semua jadwal booking tertib"
              description="Tidak ada pelanggan yang melewati batas waktu check-in."
              className="mb-6"
            />
          )}
        </div>

        <Button
          href="/queue"
          variant="outline"
          size="md"
          icon={<ArrowUpRight className="w-4 h-4" />}
          className="w-fit"
        >
          Buka monitor antrean
        </Button>
      </Card>
    </div>
  );
}

