import React from 'react';

export function Footer() {
  return (
    <footer className="mt-16 pt-6 pb-2 flex flex-col sm:flex-row items-center justify-between text-[12px] text-text-muted gap-4">
      <span>&copy; 2026 TRIM Dashboard. All rights reserved.</span>
      <div className="flex gap-6 font-medium">
        <a href="#" className="hover:text-secondary transition-colors">Pusat Bantuan</a>
        <a href="#" className="hover:text-secondary transition-colors">Syarat & Ketentuan</a>
        <span>Versi 1.0.0</span>
      </div>
    </footer>
  );
}
