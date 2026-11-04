import React from 'react';
import { HelpFaqSection } from './sections/HelpFaqSection';

export default function HelpPage() {
  return (
    <div className="space-y-6 pb-16">
      <div>
        <h1 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight">
          Pusat Bantuan
        </h1>
        <p className="text-text-muted text-xs md:text-sm mt-1">
          Panduan penggunaan dan aturan operasional TRIM Dashboard.
        </p>
      </div>

      <HelpFaqSection />
    </div>
  );
}
