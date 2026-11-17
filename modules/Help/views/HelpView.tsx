'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  Search,
  BookOpen,
  Scissors,
  Wallet,
  Shield,
  ChevronDown,
  Sparkles,
  Command,
  Mail,
  Phone,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  Headphones,
  FileText,
  Send,
  X,
} from 'lucide-react';
import { Card, Button } from '@/components/ui';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  tags: string[];
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'operasional',
    question: 'Bagaimana cara membuka dan menutup toko secara manual?',
    answer:
      'Masuk ke menu "Pengaturan Toko" di sidebar navigasi. Pada bagian "Jadwal Operasional Toko", Anda dapat mengubah status toko menjadi Buka atau Tutup, serta mengatur jam buka harian dan tanggal libur khusus (holiday_date). Status ini langsung sinkron dengan seluruh terminal kasir dan antrean.',
    tags: ['toko', 'jam buka', 'libur', 'operasional'],
  },
  {
    id: 'faq-2',
    category: 'antrean',
    question: 'Bagaimana alur pendaftaran antrean pelanggan walk-in?',
    answer:
      'Buka menu "Monitor Antrean" lalu klik tombol "Tambah Antrean Walk-in" (+). Masukkan nama pelanggan, nomor WhatsApp (opsional), pilih kapster yang dituju, dan jenis layanan (misal: Potong Reguler atau Skin Fade). Nomor tiket antrean (contoh: A-019) akan otomatis digenerate dengan estimasi jam cukur.',
    tags: ['antrean', 'walk-in', 'tiket', 'pelanggan'],
  },
  {
    id: 'faq-3',
    category: 'kapster',
    question: 'Bagaimana cara menambahkan kapster baru dan spesialisasi potong?',
    answer:
      'Buka menu "Kelola Kapster" lalu klik "Tambah Kapster Baru". Lengkapi data nama lengkap, nomor telepon aktif, foto profil, dan spesialisasi gaya rambut (contoh: Fade & Taper, Classic Pompadour, Buzz Cut). Anda juga dapat menentukan status kapster Aktif atau Libur agar tidak terpilih di antrean saat absen.',
    tags: ['kapster', 'barber', 'staf', 'spesialisasi'],
  },
  {
    id: 'faq-4',
    category: 'pembayaran',
    question: 'Bagaimana mekanisme transaksi QRIS Pakkasir terverifikasi?',
    answer:
      'Setelah kapster menyelesaikan sesi cukur, ubah status antrean menjadi Selesai. Sistem akan otomatis menampilkan tagihan QRIS dinamis Pakkasir. Saat pelanggan scan dan bayar melalui e-wallet / mobile banking, webhook Pakkasir otomatis memperbarui status transaksi menjadi "Paid" (Lunas) tanpa perlu konfirmasi manual.',
    tags: ['pembayaran', 'qris', 'pakkasir', 'transaksi', 'lunas'],
  },
  {
    id: 'faq-5',
    category: 'antrean',
    question: 'Apa yang harus dilakukan jika pelanggan antrean terlambat check-in?',
    answer:
      'Sistem memberikan toleransi waktu 15 menit dari jam booking. Jika pelanggan belum tiba, banner peringatan kuning akan muncul pada monitor antrean. Anda memiliki opsi "Lewati (Skip)" untuk mendahulukan antrean berikutnya, atau menghubungi nomor pelanggan langsung melalui tombol WhatsApp.',
    tags: ['antrean', 'terlambat', 'skip', 'check-in'],
  },
  {
    id: 'faq-6',
    category: 'keamanan',
    question: 'Apa saja perbedaan hak akses Owner, Admin, dan Barber?',
    answer:
      'Owner memiliki akses absolut (manajemen akun staf, laporan keuangan, dan pengaturan toko). Admin dapat mengelola antrean harian, data kapster, layanan, dan produk, namun tidak dapat menghapus akun Owner. Barber hanya dapat memantau giliran antrean dan profil layanan pribadi.',
    tags: ['role', 'owner', 'admin', 'barber', 'akses', 'keamanan'],
  },
  {
    id: 'faq-7',
    category: 'produk',
    question: 'Bagaimana cara melacak stok produk barbershop yang menipis?',
    answer:
      'Buka menu "Kelola Produk". Setiap item produk (pomade, clay, tonic, hair powder) memiliki indikator stok minimum. Jika stok berada di bawah batas aman (<= 3 unit), badge status akan berubah otomatis menjadi "Menipis" atau "Habis", dan notifikasi peringatan akan muncul di lonceng navbar.',
    tags: ['produk', 'stok', 'inventory', 'pomade'],
  },
  {
    id: 'faq-8',
    category: 'pembayaran',
    question: 'Bagaimana cara mengunduh laporan rekap pendapatan mingguan?',
    answer:
      'Buka menu "Dashboard / Beranda", lalu klik tombol "Unduh Laporan" di pojok kanan atas. Sistem akan menghasilkan file spreadsheet standar (.CSV dengan encoding UTF-8 BOM) berisi ringkasan performa omset, komisi kapster, dan rekap antrean mingguan yang siap dibuka di Microsoft Excel atau Google Sheets.',
    tags: ['laporan', 'unduh', 'excel', 'csv', 'pendapatan'],
  },
];

const CATEGORIES = [
  { id: 'all', label: 'Semua Topik' },
  { id: 'operasional', label: 'Operasional Toko' },
  { id: 'antrean', label: 'Monitor Antrean' },
  { id: 'kapster', label: 'Kapster & Layanan' },
  { id: 'pembayaran', label: 'Kasir & QRIS' },
  { id: 'keamanan', label: 'Hak Akses & Akun' },
  { id: 'produk', label: 'Produk & Stok' },
];

export default function HelpView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');
  const [contactFeedback, setContactFeedback] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [ticketCategory, setTicketCategory] = useState('Operasional Toko');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketCode, setTicketCode] = useState('');

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketDescription) return;
    const randomCode = 'TRIM-' + Math.floor(1000 + Math.random() * 9000);
    setTicketCode(randomCode);
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setIsTicketModalOpen(false);
      setTicketSubject('');
      setTicketDescription('');
    }, 2500);
  };

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const filteredFAQs = FAQ_DATA.filter((item) => {
    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      item.question.toLowerCase().includes(query) ||
      item.answer.toLowerCase().includes(query) ||
      item.tags.some((tag) => tag.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 text-white font-space-grotesk no-scrollbar selection:bg-secondary selection:text-white pb-20">
      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-secondary/15 text-secondary text-[12px] font-bold font-outfit border border-secondary/25">
              <Sparkles className="w-3.5 h-3.5" />
              Pusat Panduan Resmi
            </span>
            <span className="text-[12px] text-text-muted font-outfit"></span>
          </div>
          <h1 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight font-outfit">
            Pusat Bantuan & Dokumentasi
          </h1>
          <p className="text-sm md:text-base text-text-muted mt-1 font-outfit">
            Pelajari cara kerja operasional barbershop, manajemen kasir QRIS, kapster, dan integrasi sistem.
          </p>
        </div>

        {/* Quick Contact Badge */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-surface border border-border px-4 py-2.5 rounded-xl font-outfit">
          <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
          <span className="text-[13px] text-text-muted font-medium">Sistem Berjalan Normal</span>
        </div>
      </motion.div>

      {/* ── Search & Filter Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
        className="bg-surface border border-border p-5 rounded-2xl shadow-md space-y-4"
      >
        <div className="relative">
          <Search className="w-5 h-5 text-text-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari solusi atau kata kunci: misal 'qris', 'kapster', 'antrean', 'tutup toko'..."
            className="w-full bg-[#141416] border border-border rounded-xl pl-12 pr-4 py-3 text-[14px] text-white placeholder:text-text-muted focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all duration-200 font-outfit"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-text-muted hover:text-white font-outfit bg-raised px-2 py-0.5 rounded-md"
            >
              Bersihkan
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 pt-1">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-[13px] font-medium font-outfit whitespace-nowrap transition-all duration-180 active:scale-95 cursor-pointer ${isActive
                  ? 'bg-secondary text-white font-bold shadow-md shadow-secondary/20'
                  : 'bg-raised/70 text-text-muted hover:text-white hover:bg-raised border border-border/50'
                  }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* ── 3 Quick Action Guides ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="p-6 rounded-2xl bg-surface border-border flex flex-col justify-between h-full hover:border-secondary/50 transition-colors duration-200 group">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-secondary/15 text-secondary border border-secondary/30 flex items-center justify-center transition-transform group-hover:scale-105">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-[17px] font-bold text-white font-outfit">
                1. Alur Operasional Harian
              </h3>
              <p className="text-[13px] text-text-muted leading-relaxed font-outfit">
                Buka toko dari menu Pengaturan, pastikan kapster yang bertugas hadir, dan pantau kursi pengerjaan dari Beranda.
              </p>
            </div>
            <a
              href="/queue"
              className="mt-5 inline-flex items-center gap-2 text-[13px] font-bold text-secondary hover:text-white transition-colors font-outfit"
            >
              <span>Buka Monitor Antrean</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="p-6 rounded-2xl bg-surface border-border flex flex-col justify-between h-full hover:border-secondary/50 transition-colors duration-200 group">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-amber-950/40 text-amber-400 border border-amber-500/30 flex items-center justify-center transition-transform group-hover:scale-105">
                <Scissors className="w-5 h-5" />
              </div>
              <h3 className="text-[17px] font-bold text-white font-outfit">
                2. Manajemen Staf & Menu
              </h3>
              <p className="text-[13px] text-text-muted leading-relaxed font-outfit">
                Daftarkan kapster baru, perbarui tarif layanan cukur atau paket perawatan, dan sesuaikan rekomendasi model rambut AI.
              </p>
            </div>
            <a
              href="/barbers"
              className="mt-5 inline-flex items-center gap-2 text-[13px] font-bold text-amber-400 hover:text-white transition-colors font-outfit"
            >
              <span>Kelola Tim Kapster</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="p-6 rounded-2xl bg-surface border-border flex flex-col justify-between h-full hover:border-secondary/50 transition-colors duration-200 group">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 flex items-center justify-center transition-transform group-hover:scale-105">
                <Wallet className="w-5 h-5" />
              </div>
              <h3 className="text-[17px] font-bold text-white font-outfit">
                3. Transaksi QRIS Otomatis
              </h3>
              <p className="text-[13px] text-text-muted leading-relaxed font-outfit">
                Semua pembayaran diproses instan melalui Pakkasir. Unduh rekap pembukuan harian & mingguan langsung ke format Excel.
              </p>
            </div>
            <a
              href="/payments"
              className="mt-5 inline-flex items-center gap-2 text-[13px] font-bold text-emerald-400 hover:text-white transition-colors font-outfit"
            >
              <span>Riwayat Pembayaran</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Card>
        </motion.div>
      </div>

      {/* ── Main Accordion FAQ Section ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-secondary" />
            <h2 className="text-lg md:text-[20px] font-bold text-white font-outfit">
              Tanya Jawab Populer (FAQ)
            </h2>
          </div>
          <span className="text-[12px] text-text-muted font-outfit">
            {filteredFAQs.length} topik ditemukan
          </span>
        </div>

        {filteredFAQs.length === 0 ? (
          <div className="bg-surface border border-border rounded-2xl p-10 text-center space-y-3 font-outfit">
            <p className="text-[15px] font-bold text-white">Tidak ada topik bantuan yang cocok</p>
            <p className="text-[13px] text-text-muted max-w-md mx-auto">
              Coba kata kunci lain atau hubungi langsung saluran dukungan kami di bagian bawah halaman.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="text-[13px] font-bold text-secondary hover:underline cursor-pointer"
            >
              Tampilkan semua FAQ
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFAQs.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <div
                  key={item.id}
                  className={`bg-surface border rounded-2xl overflow-hidden transition-all duration-200 ${isExpanded ? 'border-secondary/60 shadow-lg shadow-black/40' : 'border-border/80 hover:border-border'
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full px-6 py-4.5 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors hover:bg-raised/40 select-none font-outfit"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                      <span className="text-[15px] md:text-[16px] font-bold text-white">
                        {item.question}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="shrink-0 text-text-muted"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-1 text-[14px] text-text-muted leading-relaxed border-t border-border/40 font-outfit space-y-3">
                          <p>{item.answer}</p>
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[11px] px-2 py-0.5 rounded-md bg-raised border border-border/60 text-text-muted font-mono"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* ── Keyboard Shortcuts Guide ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="bg-surface border border-border p-6 rounded-2xl shadow-md space-y-4"
      >
        <div className="flex items-center gap-2">
          <Command className="w-5 h-5 text-secondary" />
          <h2 className="text-[18px] font-bold text-white font-outfit">
            Pintasan Keyboard (Shortcuts)
          </h2>
        </div>
        <p className="text-[13px] text-text-muted font-outfit">
          Gunakan tombol pintas di bawah untuk mempercepat navigasi tanpa menyentuh mouse:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1 font-outfit">
          <div className="bg-[#141416] border border-border/70 p-3.5 rounded-xl flex items-center justify-between">
            <span className="text-[13px] text-text-muted">Pencarian Global</span>
            <kbd className="px-2.5 py-1 rounded bg-raised border border-border text-[12px] font-bold text-white shadow-xs">
              ⌘ / Ctrl + K
            </kbd>
          </div>
          <div className="bg-[#141416] border border-border/70 p-3.5 rounded-xl flex items-center justify-between">
            <span className="text-[13px] text-text-muted">Tutup Dropdown/Modal</span>
            <kbd className="px-2.5 py-1 rounded bg-raised border border-border text-[12px] font-bold text-white shadow-xs">
              Esc
            </kbd>
          </div>
          <div className="bg-[#141416] border border-border/70 p-3.5 rounded-xl flex items-center justify-between">
            <span className="text-[13px] text-text-muted">Navigasi Pilihan</span>
            <kbd className="px-2.5 py-1 rounded bg-raised border border-border text-[12px] font-bold text-white shadow-xs">
              ↑ & ↓
            </kbd>
          </div>
          <div className="bg-[#141416] border border-border/70 p-3.5 rounded-xl flex items-center justify-between">
            <span className="text-[13px] text-text-muted">Buka / Konfirmasi</span>
            <kbd className="px-2.5 py-1 rounded bg-raised border border-border text-[12px] font-bold text-white shadow-xs">
              Enter
            </kbd>
          </div>
        </div>
      </motion.div>

      {/* ── Contact Support Section ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="bg-linear-to-r from-surface via-[#221711] to-surface border border-secondary/30 p-6 md:p-8 rounded-2xl shadow-lg relative overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10 font-outfit">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 text-secondary font-bold text-[12px] uppercase tracking-wider">
              <Headphones className="w-4 h-4" />
              Dukungan Teknis Langsung
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-white">
              Butuh Bantuan Lebih Lanjut?
            </h3>
            <p className="text-[14px] text-text-muted leading-relaxed">
              Tim operasional dan teknis TRIM siap membantu Anda setiap hari Senin s/d Minggu pukul 09.00 - 21.00 WIB.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href="mailto:support@trim.id"
              className="bg-surface hover:bg-raised border border-border text-white px-5 py-3 rounded-xl text-[14px] font-bold flex items-center justify-center gap-2.5 transition-all active:scale-95 shadow-sm"
            >
              <Mail className="w-4 h-4 text-secondary" />
              <span>support@trim.id</span>
            </a>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.open('https://wa.me/6281234567890?text=Halo%20TRIM%20Support%2C%20saya%20butuh%20bantuan%20dashboard', '_blank');
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText('+62 812-3456-7890');
                  }
                }
                setContactFeedback(true);
                setTimeout(() => setContactFeedback(false), 3000);
              }}
              className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-xl text-[14px] font-bold flex items-center justify-center gap-2.5 shadow-lg shadow-secondary/20 transition-all active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{contactFeedback ? 'WhatsApp Dibuka!' : 'WhatsApp Helpdesk'}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsTicketModalOpen(true)}
              className="bg-raised hover:bg-raised/80 border border-border text-white px-5 py-3 rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-secondary" />
              <span>Kirim Tiket Bantuan</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── Modal Kirim Tiket Bantuan ── */}
      <AnimatePresence>
        {isTicketModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#1A1A1A] border border-border w-full max-w-lg rounded-2xl p-6 shadow-2xl font-outfit space-y-4"
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-secondary" />
                  <h3 className="text-lg font-bold text-white">Buat Tiket Bantuan</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsTicketModalOpen(false)}
                  className="text-text-muted hover:text-white p-1 rounded-lg hover:bg-raised"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {ticketSubmitted ? (
                <div className="py-8 text-center space-y-3 font-outfit">
                  <div className="w-14 h-14 rounded-full bg-success/20 text-success flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Tiket Berhasil Dibuat!</h4>
                  <p className="text-[13px] text-text-muted max-w-sm mx-auto">
                    ID Tiket: <strong className="text-secondary">{ticketCode}</strong>. Tim teknis TRIM akan segera merespons via email dalam waktu 1x24 jam.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleTicketSubmit} className="space-y-4 font-outfit">
                  <div>
                    <label className="text-[13px] font-medium text-text-muted block mb-1">
                      Kategori Masalah
                    </label>
                    <select
                      value={ticketCategory}
                      onChange={(e) => setTicketCategory(e.target.value)}
                      className="w-full bg-[#141416] border border-border rounded-xl px-4 py-2.5 text-[14px] text-white focus:outline-none focus:border-secondary"
                    >
                      <option value="Operasional Toko">Operasional Toko</option>
                      <option value="Kasir & QRIS Pakkasir">Kasir & QRIS Pakkasir</option>
                      <option value="Kapster & Layanan">Kapster & Layanan</option>
                      <option value="Akun & Hak Akses">Akun & Hak Akses</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[13px] font-medium text-text-muted block mb-1">
                      Judul Kendala / Pertanyaan
                    </label>
                    <input
                      type="text"
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      placeholder="Contoh: Webhook QRIS belum otomatis update"
                      required
                      className="w-full bg-[#141416] border border-border rounded-xl px-4 py-2.5 text-[14px] text-white focus:outline-none focus:border-secondary"
                    />
                  </div>

                  <div>
                    <label className="text-[13px] font-medium text-text-muted block mb-1">
                      Deskripsi Detail
                    </label>
                    <textarea
                      value={ticketDescription}
                      onChange={(e) => setTicketDescription(e.target.value)}
                      rows={3}
                      placeholder="Jelaskan kendala operasional yang Anda hadapi secara rinci..."
                      required
                      className="w-full bg-[#141416] border border-border rounded-xl px-4 py-2.5 text-[14px] text-white focus:outline-none focus:border-secondary resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsTicketModalOpen(false)}
                      className="px-4 py-2 rounded-xl text-[13px] font-medium text-text-muted hover:text-white hover:bg-raised"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl text-[13px] font-bold bg-secondary hover:bg-secondary/90 text-white shadow-md shadow-secondary/20 flex items-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Kirim Tiket</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

