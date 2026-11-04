import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-16 pt-6 pb-2 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between text-[12px] text-text-muted gap-4">
      <span>&copy; 2026 TRIM Dashboard. All rights reserved.</span>
      <div className="flex gap-6 font-medium">
        <Link href="/help" className="hover:text-secondary transition-colors">Pusat Bantuan</Link>
        <Link href="/design-system" className="hover:text-secondary transition-colors">Design System</Link>
        <span>Versi 1.0.0</span>
      </div>
    </footer>
  );
}
