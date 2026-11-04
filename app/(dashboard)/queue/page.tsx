'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button, SelectField, Toast } from '@/components/ui';
import { MOCK_BARBERS } from '@/utils/mocks/mockData';
import { LiveHeader } from './components/LiveHeader';
import { LateCheckInSection, LateCheckInItem } from './sections/LateCheckInSection';
import { QueueKanbanSection } from './sections/QueueKanbanSection';

const INITIAL_LATE_ITEMS: LateCheckInItem[] = [
  {
    id: 'late-1',
    customerName: 'Rizky Maulana',
    queueNo: 'A-024',
    scheduledTime: '14:00',
    lateMinutes: 30,
  },
  {
    id: 'late-2',
    customerName: 'Fajar Nugroho',
    queueNo: 'A-025',
    scheduledTime: '14:15',
    lateMinutes: 15,
  },
];

export default function QueuePage() {
  const [selectedKapster, setSelectedKapster] = useState('Semua kapster');
  const [lateItems, setLateItems] = useState<LateCheckInItem[]>(INITIAL_LATE_ITEMS);
  const [skippedCount, setSkippedCount] = useState(0);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleSkip = (item: LateCheckInItem) => {
    setLateItems((prev) => prev.filter((i) => i.id !== item.id));
    setSkippedCount((prev) => prev + 1);
    setToastMsg(`Antrean ${item.queueNo} (${item.customerName}) dilewati (skipped / no_show).`);
  };

  return (
    <div className="space-y-6 pb-12 selection:bg-secondary selection:text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight">
            Monitor Antrean Langsung
          </h1>
          <p className="text-text-muted text-xs md:text-sm mt-1">
            28 booking • 5 menunggu, 3 sedang cukur, 18 selesai, {lateItems.length} confirmed belum check-in.
          </p>
        </div>

        <Button
          href="/queue/form"
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          className="self-start sm:self-auto shrink-0"
        >
          Tambah walk-in
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <LiveHeader />

        <div className="flex items-center gap-2">
          <SelectField
            size="sm"
            value={selectedKapster}
            onChange={(e) => setSelectedKapster(e.target.value)}
            options={[
              { value: 'Semua kapster', label: 'Semua kapster' },
              ...MOCK_BARBERS.map((b) => ({ value: b.name, label: b.name })),
            ]}
          />
          <SelectField
            size="sm"
            value={`Dilewati (${skippedCount})`}
            onChange={() => {}}
            options={[{ value: `Dilewati (${skippedCount})`, label: `Dilewati (${skippedCount})` }]}
          />
        </div>
      </div>

      <LateCheckInSection items={lateItems} onSkip={handleSkip} />

      <QueueKanbanSection
        selectedKapster={selectedKapster}
        onCardAction={(msg) => setToastMsg(msg)}
      />

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast
            variant="info"
            title="Update Antrean"
            description={toastMsg}
            onClose={() => setToastMsg(null)}
          />
        </div>
      )}
    </div>
  );
}
