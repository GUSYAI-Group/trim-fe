'use client';

import React, { useState } from 'react';
import { Toast } from '@/components/ui';
import { OperationalScheduleSection } from './sections/OperationalScheduleSection';
import { SpecialHolidaysSection } from './sections/SpecialHolidaysSection';
import { AdvancedConfigSection } from './sections/AdvancedConfigSection';

export default function SettingsPage() {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  return (
    <div className="space-y-8 pb-24 relative min-h-screen">
      <header className="space-y-2">
        <h1 className="text-[28px] font-extrabold text-white tracking-tight">
          Pengaturan Toko
        </h1>
        <p className="text-text-muted">
          Kelola jam operasional, hari libur, dan konfigurasi TRIM Bandung.
        </p>
      </header>

      <OperationalScheduleSection onNotify={setToastMsg} />
      <SpecialHolidaysSection onNotify={setToastMsg} />
      <AdvancedConfigSection onNotify={setToastMsg} />

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast
            variant="success"
            title="Pengaturan Toko"
            description={toastMsg}
            onClose={() => setToastMsg(null)}
          />
        </div>
      )}
    </div>
  );
}
