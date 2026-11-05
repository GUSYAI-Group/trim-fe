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
  CheckCheck,
  Wallet,
  Clock,
  Package,
  Scissors,
  User,
  LogOut,
} from 'lucide-react';
import { SEARCH_ITEMS, SearchItem } from './searchData';

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const router = useRouter();
  const { user } = useAuthStore();
  const [search, setSearch] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  interface NotificationItem {
    id: string;
    title: string;
    description: string;
    time: string;
    type: 'payment' | 'queue' | 'inventory' | 'booking' | 'system';
    isRead: boolean;
    link?: string;
  }

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n-1',
      title: 'Pembayaran QRIS Berhasil',
      description: 'Rp75.000 dari Gus Ridho telah diverifikasi oleh Pakkasir.',
      time: '5 menit lalu',
      type: 'payment',
      isRead: false,
      link: '/payments',
    },
    {
      id: 'n-2',
      title: 'Peringatan Antrean',
      description: 'Rizky Maulana (A-024) belum check-in setelah 15 menit.',
      time: '18 menit lalu',
      type: 'queue',
      isRead: false,
      link: '/queue',
    },
    {
      id: 'n-3',
      title: 'Stok Produk Menipis',
      description: 'Clay tersisa 3 unit. Segera lakukan restock inventaris.',
      time: '45 menit lalu',
      type: 'inventory',
      isRead: false,
      link: '/products',
    },
    {
      id: 'n-4',
      title: 'Booking Selesai',
      description: 'Kapster Gus Farhan menyelesaikan cukuran ke-42 hari ini.',
      time: '2 jam lalu',
      type: 'booking',
      isRead: true,
      link: '/barbers',
    },
    {
      id: 'n-5',
      title: 'Sistem TRIM v1.0 Aktif',
      description: 'Semua terminal kasir terhubung stabil dan sinkron.',
      time: '1 hari lalu',
      type: 'system',
      isRead: true,
      link: '/help',
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleNotificationClick = (item: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, isRead: true } : n))
    );
    if (item.link) {
      setIsNotifOpen(false);
      router.push(item.link);
    }
  };

  const getNotifIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'payment':
        return <Wallet className="w-4 h-4 text-emerald-400" />;
      case 'queue':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'inventory':
        return <Package className="w-4 h-4 text-purple-400" />;
      case 'booking':
        return <Scissors className="w-4 h-4 text-secondary" />;
      case 'system':
        return <Sparkles className="w-4 h-4 text-blue-400" />;
    }
  };

  const getNotifIconStyle = (type: NotificationItem['type']) => {
    switch (type) {
      case 'payment':
        return 'bg-emerald-950/40 border border-emerald-500/30';
      case 'queue':
        return 'bg-amber-950/40 border border-amber-500/30';
      case 'inventory':
        return 'bg-purple-950/40 border border-purple-500/30';
      case 'booking':
        return 'bg-secondary/15 border border-secondary/30';
      case 'system':
        return 'bg-blue-950/40 border border-blue-500/30';
    }
  };

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
        setIsNotifOpen(false);
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

  // Handle click outside to close notification dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setIsNotifOpen(false);
      }
    };

    if (isNotifOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNotifOpen]);

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
              className={`relative flex items-center bg-surface rounded-xl px-4 py-3 border transition-all ${isSearchOpen
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
                              className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all font-outfit ${isSelected
                                  ? 'bg-raised text-white border-l-2 border-secondary pl-3.5'
                                  : 'text-text-muted hover:bg-raised/60 hover:text-white'
                                }`}
                            >
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div
                                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${isSelected
                                      ? 'bg-secondary/20 text-secondary border-secondary/30'
                                      : 'bg-surface text-text-muted border-border/50'
                                    }`}
                                >
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`text-[14px] font-bold truncate ${isSelected ? 'text-white' : 'text-white/90'
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
                                className={`w-4 h-4 shrink-0 transition-transform ${isSelected
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

          {/* Notification Bell with Dropdown */}
          <div ref={notifRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setIsNotifOpen((prev) => !prev);
                setIsProfileOpen(false);
              }}
              className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer select-none group ${isNotifOpen
                  ? 'bg-raised text-secondary border border-secondary/40 shadow-sm shadow-secondary/10'
                  : 'text-text-muted hover:text-white hover:bg-raised border border-border/60 hover:border-border'
                }`}
              aria-label="Notifikasi"
              aria-expanded={isNotifOpen}
            >
              <Bell className={`w-5 h-5 transition-transform duration-200 ${isNotifOpen ? 'rotate-12 text-secondary' : 'group-hover:rotate-12'}`} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-[18px] min-w-[18px] px-1 items-center justify-center rounded-full bg-secondary text-[10px] font-extrabold text-white ring-2 ring-primary shadow-sm shadow-secondary/40 font-outfit select-none leading-none pointer-events-none">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {isNotifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-full mt-2 w-[340px] sm:w-[380px] rounded-2xl bg-[#1C1C1F] border border-border/80 shadow-2xl shadow-black/90 p-2 z-50 font-outfit overflow-hidden"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-3 py-2 border-b border-border/50">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[14px] font-bold text-white">Notifikasi</h4>
                      {unreadCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-secondary/20 text-secondary text-[11px] font-bold">
                          {unreadCount} baru
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={handleMarkAllAsRead}
                        className="text-[11px] font-semibold text-text-muted hover:text-secondary flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span>Tandai semua dibaca</span>
                      </button>
                    )}
                  </div>

                  {/* Notif Items List */}
                  <div className="max-h-[340px] overflow-y-auto no-scrollbar divide-y divide-border/40 py-1">
                    {notifications.length === 0 ? (
                      <div className="py-8 text-center text-text-muted text-[13px]">
                        Tidak ada notifikasi saat ini
                      </div>
                    ) : (
                      notifications.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleNotificationClick(item)}
                          className={`flex items-start gap-3 p-2.5 rounded-xl transition-all cursor-pointer ${item.isRead
                              ? 'hover:bg-raised/40 opacity-75'
                              : 'bg-raised/60 hover:bg-raised opacity-100'
                            }`}
                        >
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${getNotifIconStyle(item.type)}`}>
                            {getNotifIcon(item.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <p className={`text-[13px] truncate ${item.isRead ? 'font-medium text-white/90' : 'font-bold text-white'}`}>
                                {item.title}
                              </p>
                              {!item.isRead && (
                                <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                              )}
                            </div>
                            <p className="text-[12px] text-text-muted line-clamp-2 mt-0.5 leading-snug">
                              {item.description}
                            </p>
                            <span className="text-[10px] text-text-muted/70 mt-1 block">
                              {item.time}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Footer */}
                  <div className="px-3 py-2 border-t border-border/50 bg-[#141414] rounded-b-xl flex items-center justify-between text-[11px] text-text-muted">
                    <span>Notifikasi otomatis real-time</span>
                    <Link
                      href="/queue"
                      onClick={() => setIsNotifOpen(false)}
                      className="text-secondary font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Buka Antrean</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-border" />

          {/* Profile Dropdown */}
          <div ref={profileRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setIsProfileOpen((prev) => !prev);
                setIsNotifOpen(false);
              }}
              className="flex items-center gap-3 cursor-pointer hover:bg-raised/60 active:scale-[0.98] py-1.5 px-3 rounded-xl transition-all duration-150 group font-outfit select-none"
            >
              <div className="w-10 h-10 shrink-0 bg-secondary rounded-xl flex items-center justify-center text-white font-bold text-[14px] shadow-sm shadow-secondary/20 transition-transform group-hover:scale-105">
                {user?.name
                  ? user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
                  : 'AP'}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[14px] text-text-main font-bold leading-tight">
                  {user?.name || 'aditya@trim.id'}
                </span>
                <span className="text-[12px] text-text-muted font-medium">
                  {user?.role || 'Owner'}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-text-muted ml-1 transition-transform duration-200 ${isProfileOpen ? 'rotate-180 text-white' : ''
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
                  className="absolute right-0 top-full mt-2 w-48 rounded-2xl bg-[#1C1C1F] border border-border/80 shadow-2xl shadow-black/80 p-1.5 z-50 font-outfit"
                >
                  <div className="space-y-0.5">
                    <Link
                      href="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium text-text-muted hover:text-white hover:bg-raised transition-colors cursor-pointer"
                    >
                      <User className="w-4 h-4 text-secondary" />
                      <span>Profil Saya</span>
                    </Link>
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
                      <LogOut className="w-4 h-4" />
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
