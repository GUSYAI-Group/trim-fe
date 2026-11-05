'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import {
  Bell,
  Search,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { SEARCH_ITEMS, SearchItem } from './searchData';

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  // Setup real-time date and time display
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const optionsDate: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      };
      const dateStr = now.toLocaleDateString('id-ID', optionsDate).replace('.', '');
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${dateStr} • ${hours}:${minutes}\u00A0WIB`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  // Global Keyboard shortcut: Command/Ctrl + K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘ K or Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => {
          if (window.innerWidth < 768) {
            setIsMobileSearchOpen(true);
            mobileInputRef.current?.focus();
          } else {
            searchInputRef.current?.focus();
          }
        }, 50);
      }

      // Escape key to close
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMobileSearchOpen(false);
        setIsProfileOpen(false);
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle click outside to close profile dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen]);

  // Filter search items based on input query
  const filteredResults = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      // If empty query, show default quick navigation (Pages & Quick Actions)
      return SEARCH_ITEMS.filter(
        (item) => item.category === 'Halaman' || item.category === 'Aksi Cepat'
      ).slice(0, 10);
    }

    return SEARCH_ITEMS.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(query);
      const matchSubtitle = item.subtitle.toLowerCase().includes(query);
      const matchCategory = item.category.toLowerCase().includes(query);
      const matchKeywords = item.keywords?.some((k) => k.toLowerCase().includes(query));

      return matchTitle || matchSubtitle || matchCategory || matchKeywords;
    }).slice(0, 12);
  }, [search]);

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Handle selection of a search result
  const handleSelectResult = (item: SearchItem) => {
    setIsSearchOpen(false);
    setIsMobileSearchOpen(false);
    setSearch('');
    router.push(item.href);
  };

  // Handle keyboard navigation inside search input
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (!isSearchOpen && filteredResults.length > 0) {
      setIsSearchOpen(true);
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(filteredResults.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev - 1 < 0 ? Math.max(filteredResults.length - 1, 0) : prev - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults.length > 0 && filteredResults[selectedIndex]) {
        handleSelectResult(filteredResults[selectedIndex]);
      }
    }
  };

  // Group filtered results by category for clean UI rendering
  const groupedResults = useMemo(() => {
    const groups: { [cat: string]: SearchItem[] } = {};
    filteredResults.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredResults]);

  // Badge styling helper
  const getBadgeStyle = (category: string) => {
    switch (category) {
      case 'Halaman':
        return 'bg-secondary/15 text-secondary border-secondary/25';
      case 'Aksi Cepat':
        return 'bg-emerald-950/40 text-emerald-400 border-emerald-500/25';
      case 'Layanan':
        return 'bg-amber-950/40 text-amber-400 border-amber-500/25';
      case 'Kapster':
        return 'bg-blue-950/40 text-blue-400 border-blue-500/25';
      case 'Produk':
        return 'bg-purple-950/40 text-purple-400 border-purple-500/25';
      case 'Antrean':
        return 'bg-rose-950/40 text-rose-400 border-rose-500/25';
      case 'Pembayaran':
        return 'bg-emerald-950/40 text-emerald-400 border-emerald-500/25';
      default:
        return 'bg-surface border-border text-text-muted';
    }
  };

  return (
    <>
      <header className="h-20 bg-primary border-b border-border px-4 md:px-8 flex items-center justify-between sticky top-0 z-40 gap-4">
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
          {/* Mobile Hamburger Menu */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 text-text-muted hover:text-text-main hover:bg-surface rounded-lg transition-colors cursor-pointer"
            aria-label="Buka menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center mt-1">
            <Image
              src="/logo/logo-textwhite.svg"
              alt="TRIM Logo"
              width={100}
              height={32}
              className="object-contain"
              priority
            />
          </div>

          {/* Desktop Search Bar Container with Dropdown Palette */}
          <div ref={searchContainerRef} className="w-full max-w-110 hidden md:block relative">
            <div
              className={`relative flex items-center bg-surface rounded-xl px-4 py-3 border transition-all ${
                isSearchOpen
                  ? 'border-secondary ring-1 ring-secondary/30 shadow-lg shadow-black/40'
                  : 'border-border/60 hover:border-border'
              }`}
            >
              <Search className="w-5 h-5 text-text-muted mr-3 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                onKeyDown={handleInputKeyDown}
                placeholder="Cari pelanggan, transaksi..."
                className="bg-transparent border-none outline-none text-[14px] text-text-main w-full placeholder:text-text-muted font-medium font-outfit"
              />

              {/* Clear button if has text */}
              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    searchInputRef.current?.focus();
                  }}
                  className="p-1 rounded-full text-text-muted hover:text-white mr-2 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Keyboard Shortcut Badge */}
              <div
                onClick={() => {
                  setIsSearchOpen(true);
                  searchInputRef.current?.focus();
                }}
                className="flex items-center justify-center text-text-muted text-[13px] font-bold px-2 py-0.5 rounded-md bg-raised border border-border/70 whitespace-nowrap opacity-80 cursor-pointer select-none font-outfit"
              >
                ⌘ K
              </div>
            </div>

            {/* Desktop Autocomplete / Global Search Dropdown */}
            {isSearchOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#1A1A1A] border border-[#303034] rounded-2xl shadow-2xl shadow-black/90 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {/* Header Hint */}
                <div className="px-4 py-2.5 border-b border-border/50 flex items-center justify-between text-[11px] text-text-muted font-outfit">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-secondary" />
                    <span>
                      {search.trim()
                        ? `Hasil pencarian untuk "${search}"`
                        : 'Pencarian Cepat ke Seluruh Dashboard'}
                    </span>
                  </div>
                  <span className="text-[10px] opacity-70">Gunakan panah ↑ ↓ & Enter</span>
                </div>

                {/* Results List */}
                <div className="max-h-[420px] overflow-y-auto p-2 no-scrollbar space-y-3">
                  {filteredResults.length === 0 ? (
                    <div className="py-8 px-4 text-center">
                      <p className="text-[14px] font-bold text-white font-outfit mb-1">
                        Tidak ada hasil ditemukan
                      </p>
                      <p className="text-[12px] text-text-muted font-outfit">
                        Coba kata kunci lain seperti &quot;layanan&quot;, &quot;kapster&quot;, &quot;produk&quot;, &quot;antrean&quot;, atau &quot;pembayaran&quot;.
                      </p>
                    </div>
                  ) : (
                    Object.entries(groupedResults).map(([category, items]) => (
                      <div key={category} className="space-y-1">
                        <div className="px-3 pt-1 text-[11px] font-bold text-text-muted uppercase tracking-wider font-outfit flex items-center justify-between">
                          <span>{category}</span>
                          <span className="text-[10px] font-medium opacity-60">
                            {items.length} item
                          </span>
                        </div>
                        {items.map((item) => {
                          const Icon = item.icon;
                          const flatIndex = filteredResults.findIndex((r) => r.id === item.id);
                          const isSelected = flatIndex === selectedIndex;

                          return (
                            <div
                              key={item.id}
                              onClick={() => handleSelectResult(item)}
                              onMouseEnter={() => setSelectedIndex(flatIndex)}
                              className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all font-outfit ${
                                isSelected
                                  ? 'bg-raised text-white border-l-2 border-secondary pl-3.5'
                                  : 'text-text-muted hover:bg-raised/60 hover:text-white'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div
                                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                                    isSelected
                                      ? 'bg-secondary/20 text-secondary border-secondary/30'
                                      : 'bg-surface text-text-muted border-border/50'
                                  }`}
                                >
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`text-[14px] font-bold truncate ${
                                        isSelected ? 'text-white' : 'text-white/90'
                                      }`}
                                    >
                                      {item.title}
                                    </span>
                                    {item.badge && (
                                      <span
                                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border shrink-0 ${getBadgeStyle(
                                          item.category
                                        )}`}
                                      >
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[12px] text-text-muted truncate mt-0.5">
                                    {item.subtitle}
                                  </p>
                                </div>
                              </div>
                              <ArrowRight
                                className={`w-4 h-4 shrink-0 transition-transform ${
                                  isSelected
                                    ? 'text-secondary translate-x-0.5 opacity-100'
                                    : 'opacity-0 text-text-muted'
                                }`}
                              />
                            </div>
                          );
                        })}
                      </div>
                    ))
                  )}
                </div>

                {/* Footer Guide */}
                <div className="px-4 py-2 border-t border-border/50 bg-[#141414] flex items-center justify-between text-[11px] text-text-muted font-outfit">
                  <span>Ketik nama pelanggan, transaksi QRIS, layanan, dll.</span>
                  <span className="text-secondary font-medium">Buka Halaman →</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side Elements */}
        <div className="flex items-center justify-end gap-3 sm:gap-6 shrink-0">
          {/* Mobile Search Trigger Icon Button */}
          <button
            onClick={() => {
              setIsMobileSearchOpen(true);
              setTimeout(() => mobileInputRef.current?.focus(), 100);
            }}
            className="md:hidden p-2 text-text-muted hover:text-white hover:bg-surface rounded-xl transition-colors cursor-pointer"
            aria-label="Pencarian"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Date & Time */}
          <div className="text-[14px] font-medium text-text-muted hidden lg:inline-flex items-center whitespace-nowrap shrink-0 font-outfit select-none">
            {currentTime || 'Memuat...'}
          </div>

          {/* Notification Bell */}
          <button
            className="relative cursor-pointer text-text-muted hover:text-text-main transition-all duration-200 flex items-center p-2 rounded-xl hover:bg-surface active:scale-95 group"
            aria-label="Notifikasi"
          >
            <Bell className="w-5 h-5 transition-transform duration-200 group-hover:rotate-12" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
          </button>

          {/* Divider */}
          <div className="h-8 w-px bg-border" />

          {/* Profile Dropdown */}
          <div ref={profileRef} className="relative">
            <button
              type="button"
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="flex items-center gap-3 cursor-pointer hover:bg-raised/60 active:scale-[0.98] py-1.5 px-3 rounded-xl transition-all duration-150 group font-outfit select-none"
            >
              <div className="w-10 h-10 shrink-0 bg-secondary rounded-xl flex items-center justify-center text-white font-bold text-[14px] shadow-sm shadow-secondary/20 transition-transform group-hover:scale-105">
                AP
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[14px] text-text-main font-bold leading-tight">
                  aditya@trim.id
                </span>
                <span className="text-[12px] text-text-muted font-medium">
                  Owner
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-text-muted ml-1 transition-transform duration-200 ${
                  isProfileOpen ? 'rotate-180 text-white' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-[#1C1C1F] border border-border/80 shadow-2xl shadow-black/80 p-1.5 z-50 font-outfit"
                >
                  <div className="px-3.5 py-2.5 border-b border-border/50 mb-1">
                    <p className="text-[13px] font-bold text-white truncate">aditya@trim.id</p>
                    <p className="text-[11px] text-secondary font-medium">Owner • Akses Penuh</p>
                  </div>
                  <div className="space-y-1">
                    <div className="h-px bg-border/50 my-1" />
                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileOpen(false);
                        useAuthStore.getState().logout();
                        router.push('/login');
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-[13px] font-bold text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
                    >
                      <span>Keluar (Logout)</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* ── Mobile Global Search Modal Overlay ── */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/80 backdrop-blur-sm flex flex-col p-4 animate-in fade-in duration-200">
          <div className="w-full bg-[#1A1A1A] border border-[#303034] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Input Bar */}
            <div className="p-3 border-b border-border flex items-center gap-2">
              <Search className="w-5 h-5 text-secondary shrink-0 ml-1" />
              <input
                ref={mobileInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari ke semua halaman..."
                className="bg-transparent border-none outline-none text-base text-white w-full placeholder:text-text-muted font-outfit"
              />
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="p-1.5 text-text-muted hover:text-white rounded-lg hover:bg-raised cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results List */}
            <div className="overflow-y-auto p-2 space-y-3 flex-1 no-scrollbar">
              {filteredResults.length === 0 ? (
                <div className="py-8 px-4 text-center">
                  <p className="text-sm font-bold text-white font-outfit mb-1">
                    Tidak ada hasil ditemukan
                  </p>
                  <p className="text-xs text-text-muted font-outfit">
                    Coba kata kunci &quot;kapster&quot;, &quot;layanan&quot;, atau &quot;antrean&quot;.
                  </p>
                </div>
              ) : (
                Object.entries(groupedResults).map(([category, items]) => (
                  <div key={category} className="space-y-1">
                    <div className="px-3 pt-1 text-[11px] font-bold text-text-muted uppercase tracking-wider font-outfit">
                      {category}
                    </div>
                    {items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleSelectResult(item)}
                          className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-raised active:bg-raised cursor-pointer font-outfit text-white"
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="w-9 h-9 rounded-xl bg-surface border border-border/50 text-secondary flex items-center justify-center shrink-0">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold truncate text-white">
                                  {item.title}
                                </span>
                              </div>
                              <p className="text-xs text-text-muted truncate mt-0.5">
                                {item.subtitle}
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-text-muted shrink-0" />
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-border bg-[#141414] text-center text-xs text-text-muted font-outfit">
              TRIM Global Search
            </div>
          </div>
        </div>
      )}
    </>
  );
}
