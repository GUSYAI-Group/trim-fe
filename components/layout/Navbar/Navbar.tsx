'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bell, Search, ChevronDown, Menu } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const [search, setSearch] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const { user } = useAuthStore();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const optionsDate: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
      const dateStr = now.toLocaleDateString('id-ID', optionsDate).replace('.', '');
      
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      
      setCurrentTime(`${dateStr} • ${hours}:${minutes} WIB`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  const roleLabel = user.role.charAt(0).toUpperCase() + user.role.slice(1);

  return (
    <header className="h-20 bg-primary border-b border-border px-4 md:px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Mobile Hamburger Menu */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-text-muted hover:text-text-main hover:bg-surface rounded-lg transition-colors cursor-pointer"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center mt-1">
          <Image src="/logo/logo-textwhite.svg" alt="TRIM Logo" width={100} height={32} className="object-contain" priority />
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-110 hidden md:block">
          <div className="relative flex items-center bg-surface border border-border focus-within:border-secondary rounded-xl px-4 py-2.5 transition-colors">
            <Search className="w-5 h-5 text-text-muted mr-3 shrink-0" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari pelanggan, transaksi..." 
              className="bg-transparent border-none outline-none text-[14px] text-text-main w-full placeholder:text-text-muted font-medium"
            />
            <div className="flex items-center justify-center text-text-muted text-[12px] font-bold px-2 whitespace-nowrap opacity-70 font-mono">
              ⌘ K
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Elements */}
      <div className="flex flex-1 justify-end items-center gap-6">
        {/* Date & Time */}
        <div className="text-[14px] font-medium text-text-muted hidden lg:block">
          {currentTime || 'Memuat...'}
        </div>

        {/* Notification Bell */}
        <button className="relative cursor-pointer text-text-muted hover:text-text-main transition-colors flex items-center">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-0.5 right-0.5 w-2 h-2 bg-secondary rounded-full"></span>
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-border" />

        {/* Profile Avatar */}
        <Link
          href="/accounts"
          className="flex items-center gap-3 cursor-pointer hover:bg-raised/50 py-1.5 px-3 rounded-xl transition-colors group"
        >
          <div className="w-10 h-10 shrink-0 bg-secondary rounded-xl flex items-center justify-center text-text-main font-bold text-[14px]">
            {user.initials}
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-[14px] text-text-main font-bold leading-tight">
              {user.email}
            </span>
            <span className="text-[12px] text-text-muted font-medium">
              {roleLabel}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-text-muted ml-1" />
        </Link>
      </div>
    </header>
  );
}
