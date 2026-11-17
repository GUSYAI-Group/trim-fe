import React from 'react';
import { HelpFaqSection } from './sections/HelpFaqSection';

export default function HelpPage() {
  return (
    <div className="space-y-6 pb-16">
      <div>
        <h1 className="text-[28px] font-extrabold text-text-main tracking-tight">
          Pusat Bantuan
        </h1>
        <p className="text-text-muted text-[14px] mt-1">
          Panduan penggunaan dan aturan operasional TRIM Dashboard.
        </p>
      </div>

      <HelpFaqSection />
    </div>
  );
}
