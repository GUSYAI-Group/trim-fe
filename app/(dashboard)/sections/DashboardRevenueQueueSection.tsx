import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Card, Badge, Button, Alert } from '@/components/ui';

const WEEKLY_BARS = [
  { label: '30 Sep', height: '45%', val: '950 rb', active: false },
  { label: '1 Okt', height: '55%', val: '1,15 jt', active: false },
  { label: '2 Okt', height: '64%', val: '1,35 jt', active: false },
  { label: '3 Okt', height: '81%', val: '1,7 jt', active: false },
  { label: '4 Okt', height: '100%', val: '2,1 jt', active: false },
  { label: '5 Okt', height: '86%', val: '1,8 jt', active: false },
  { label: '6 Okt', height: '57%', val: '1,2 jt', active: true },
];

export function DashboardRevenueQueueSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Chart Pendapatan Mingguan */}
      <Card className="lg:col-span-2 p-6 md:p-8 flex flex-col justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-text-main mb-1">Pendapatan mingguan</h2>
          <p className="text-[13px] text-text-muted mb-6">30 Sep–6 Okt 2026 • PAYMENTS.status = paid</p>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6">
            <h3 className="text-4xl font-extrabold text-text-main">Rp10.250.000</h3>
            <Badge variant="success" label="↑ 18,4% minggu lalu" showDot />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="w-full overflow-x-auto pt-2 pb-2 no-scrollbar">
          <div className="min-w-125 h-56 relative flex flex-col justify-between">
            {/* Guide Lines */}
            <div className="absolute inset-0 flex flex-col justify-between text-[12px] text-text-muted pt-2 pb-8 pointer-events-none">
              <div className="flex items-center leading-none"><span>2,1 jt</span></div>
              <div className="flex items-center leading-none"><span>1 jt</span></div>
              <div className="flex items-center leading-none"><span>0</span></div>
            </div>

            {/* Batang Grafik */}
            <div className="absolute inset-0 flex justify-between items-end pl-12 pr-2 pt-8 pb-8 z-10">
              {WEEKLY_BARS.map((bar, i) => (
                <div key={i} className="flex flex-col items-center justify-end w-full px-2 h-full relative group">
                  <div
                    className={`w-full max-w-10 rounded-t-xl transition-all relative flex flex-col items-center ${
                      bar.active ? 'bg-secondary' : 'bg-secondary/25 hover:bg-secondary/40'
                    }`}
                    style={{ height: bar.height }}
                  >
                    <span
                      className={`absolute -top-6 text-[12px] font-medium whitespace-nowrap ${
                        bar.active ? 'text-secondary font-bold' : 'text-text-muted'
                      }`}
                    >
                      {bar.val}
                    </span>
                  </div>
                  <span className="text-[12px] text-text-muted absolute -bottom-6 whitespace-nowrap">
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
          <p className="text-[13px] text-text-muted mb-8">Selasa, 6 Oktober • 14:30 WIB</p>

          <div className="space-y-6 mb-8">
            <div className="flex justify-between items-center">
              <span className="text-text-muted text-[14px]">Menunggu</span>
              <span className="text-warning text-3xl font-bold">5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-muted text-[14px]">Sedang cukur</span>
              <span className="text-secondary text-3xl font-bold">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-muted text-[14px]">Selesai</span>
              <span className="text-success text-3xl font-bold">18</span>
            </div>
          </div>

          <Alert
            variant="warning"
            title="2 booking melewati jadwal"
            description="Rizky & Fajar belum check-in. Admin dapat melakukan Skip."
            className="mb-6"
          />
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

