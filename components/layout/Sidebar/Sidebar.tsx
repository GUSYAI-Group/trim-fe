'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard,
  UserRound, 
  List, 
  ScanFace, 
  Package, 
  Columns, 
  Wallet, 
  Users, 
  Settings, 
  HelpCircle 
} from 'lucide-react';

const MENU_ITEMS = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/barbers', icon: UserRound, label: 'Kelola Kapster' },
  { href: '/services', icon: List, label: 'Kelola Layanan' },
  { href: '/hairstyles', icon: ScanFace, label: 'Kelola Model Rambut' },
  { href: '/products', icon: Package, label: 'Kelola Produk' },
  { href: '/queue', icon: Columns, label: 'Monitor Antrean' },
  { href: '/payments', icon: Wallet, label: 'Riwayat Pembayaran' },
  { href: '/accounts', icon: Users, label: 'Manajemen Akun' },
  { href: '/settings', icon: Settings, label: 'Pengaturan Toko' },
];

export function Sidebar() {
  const pathname = usePathname();

  const getActiveClass = (href: string) => {
    // Exact match untuk root '/', selebihnya pakai startsWith
    const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
    
    return isActive 
      ? "flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary text-text-main font-bold shadow-lg shadow-secondary/20 transition-all duration-300"
      : "flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:bg-secondary/15 hover:text-text-main transition-all duration-200 font-medium";
  };

  return (
    <aside className="w-60 bg-sidebar border-r border-border h-full flex flex-col font-mono">
      <div className="h-24 flex items-center justify-center px-4 shrink-0">
        <Image src="/logo/logo-textwhite.svg" alt="TRIM Logo" width={180} height={56} className="object-contain" priority />
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-4 flex flex-col">
        {/* Title */}
        <p className="px-4 text-[12px] font-bold text-text-muted tracking-widest uppercase mb-4">
          RUANG OPERASIONAL
        </p>

        {/* Navigation Links */}
        <div className="space-y-2 flex-1">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className={getActiveClass(item.href)}>
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* Bottom Sticky Section */}
      <div className="p-4 mt-auto shrink-0">
        <Link href="/help" className={getActiveClass('/help') + " mb-4"}>
          <HelpCircle className="w-5 h-5" />
          <span>Pusat Bantuan</span>
        </Link>
        <div className="px-4 pb-2">
          <p className="text-[12px] font-bold text-text-muted tracking-widest uppercase">TRIM ADMIN/v.1.0</p>
        </div>
      </div>
    </aside>
  );
}
