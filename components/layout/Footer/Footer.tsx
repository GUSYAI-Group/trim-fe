import React from 'react';

export function Footer() {
  return (
    <footer className="mt-16 pt-6 pb-2 flex flex-col sm:flex-row items-center justify-between text-[12px] text-text-muted gap-4 font-outfit border-t border-border/40">
      <span>&copy; 2026 TRIM Dashboard. Hak cipta dilindungi.</span>
      <div className="flex items-center gap-6 font-medium">
        <span className="text-text-muted/60">v1.0.4-prod</span>
      </div>
    </footer>
  );
}
