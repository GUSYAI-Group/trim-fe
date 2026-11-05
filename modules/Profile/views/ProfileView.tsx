'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Shield,
  Key,
  Smartphone,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle,
  Lock,
  Eye,
  EyeOff,
  Bell,
  Monitor,
  Calendar,
  Sparkles,
  Save,
  Check,
  Building,
  Phone,
  LogOut,
  FileText,
} from 'lucide-react';
import { Card, Button, Badge } from '@/components/ui';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function ProfileView() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  // Profile editable state
  const [name, setName] = useState(user?.name || 'Aditya Pratama');
  const [email] = useState('aditya@trim.id');
  const [phone, setPhone] = useState('0812 3456 7890');
  const [branch, setBranch] = useState('TRIM Barbershop - Outlet Pusat (Jaksel)');
  const [isSaved, setIsSaved] = useState(false);

  // Password modal state
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Preference switches
  const [soundNotification, setSoundNotification] = useState(true);
  const [whatsappAlert, setWhatsappAlert] = useState(true);
  const [dailyReportEmail, setDailyReportEmail] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'info' | 'security' | 'preferences' | 'activity'>('info');

  // Load persisted preferences on mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedName = localStorage.getItem('trim_profile_name');
      const savedPhone = localStorage.getItem('trim_profile_phone');
      const savedBranch = localStorage.getItem('trim_profile_branch');
      const savedSound = localStorage.getItem('trim_pref_sound');
      const savedWa = localStorage.getItem('trim_pref_wa');
      const savedDaily = localStorage.getItem('trim_pref_daily');

      if (savedName) setName(savedName);
      if (savedPhone) setPhone(savedPhone);
      if (savedBranch) setBranch(savedBranch);
      if (savedSound !== null) setSoundNotification(savedSound === 'true');
      if (savedWa !== null) setWhatsappAlert(savedWa === 'true');
      if (savedDaily !== null) setDailyReportEmail(savedDaily === 'true');
    }
  }, []);

  const displayName = user?.name || name;
  const displayRole = user?.role || 'Owner';
  const userInitials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('trim_profile_name', name);
      localStorage.setItem('trim_profile_phone', phone);
      localStorage.setItem('trim_profile_branch', branch);
    }
    // Update live global Auth store so Navbar & Header reflect changes
    useAuthStore.getState().login('token-trim-admin-auth', {
      id: user?.id || 'admin-1',
      role: user?.role || 'Owner',
      name: name,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (!currentPassword) {
      setPasswordError('Masukkan kata sandi saat ini.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('Kata sandi baru minimal 6 karakter.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    setPasswordSuccess(true);
    setTimeout(() => {
      setPasswordSuccess(false);
      setIsPasswordModalOpen(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1500);
  };

  return (
    <div className="space-y-6 text-white font-space-grotesk no-scrollbar selection:bg-secondary selection:text-white pb-20">
      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-secondary/15 text-secondary text-[12px] font-bold font-outfit border border-secondary/25">
              <Shield className="w-3.5 h-3.5" />
              Akun Utama & Profil
            </span>
            <span className="text-[12px] text-text-muted font-outfit"></span>
          </div>
          <h1 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight font-outfit">
            Profil Pengguna
          </h1>
          <p className="text-sm md:text-base text-text-muted mt-1 font-outfit">
            Kelola identitas akun, kredensial keamanan, preferensi sistem, dan pantau log aktivitas.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            logout();
            router.push('/login');
          }}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 text-[13px] font-bold font-outfit flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar Sesi</span>
        </button>
      </motion.div>

      {/* ── Profile Hero Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
        className="bg-surface border border-border rounded-2xl p-6 md:p-8 shadow-md relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            {/* Avatar with Glow */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-secondary flex items-center justify-center text-white font-extrabold text-2xl md:text-3xl font-outfit shadow-xl shadow-secondary/20">
                {userInitials}
              </div>
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-success ring-4 ring-surface" />
            </div>

            {/* User Meta */}
            <div className="space-y-1.5 font-outfit">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-xl md:text-2xl font-bold text-white">{displayName}</h2>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-secondary/20 text-secondary text-[12px] font-bold border border-secondary/30">
                  <Sparkles className="w-3 h-3" />
                  {displayRole}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#132A20] text-success text-[12px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  Aktif
                </span>
              </div>
              <p className="text-[14px] text-text-muted">{email}</p>
              <p className="text-[12px] text-text-muted/80">
                Bergabung sejak 12 September 2026 • Hak akses penuh toko & staf
              </p>
            </div>
          </div>

          {/* Quick Stats Chips */}
          <div className="flex items-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-border/50 font-outfit">
            <div className="bg-[#141416] border border-border p-3.5 rounded-xl text-center min-w-[100px]">
              <span className="text-[11px] text-text-muted uppercase tracking-wider block">Peran</span>
              <span className="text-[14px] font-bold text-secondary">{displayRole}</span>
            </div>
            <div className="bg-[#141416] border border-border p-3.5 rounded-xl text-center min-w-[100px]">
              <span className="text-[11px] text-text-muted uppercase tracking-wider block">Keamanan</span>
              <span className="text-[14px] font-bold text-emerald-400">2FA Aktif</span>
            </div>
            <div className="bg-[#141416] border border-border p-3.5 rounded-xl text-center min-w-[100px]">
              <span className="text-[11px] text-text-muted uppercase tracking-wider block">Sesi</span>
              <span className="text-[14px] font-bold text-white">1 Perangkat</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Navigation Tabs ── */}
      <div className="flex items-center gap-2 border-b border-border/80 pb-2 overflow-x-auto no-scrollbar font-outfit">
        {[
          { id: 'info', label: 'Informasi Akun', icon: User },
          { id: 'security', label: 'Keamanan & Sandi', icon: Shield },
          { id: 'preferences', label: 'Preferensi Sistem', icon: Bell },
          { id: 'activity', label: 'Log Aktivitas', icon: Clock },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[14px] font-bold transition-all duration-150 active:scale-95 cursor-pointer whitespace-nowrap ${isActive
                ? 'bg-secondary text-white shadow-md shadow-secondary/20'
                : 'text-text-muted hover:text-white hover:bg-raised/60'
                }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Tab Content ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* TAB 1: INFORMASI AKUN */}
          {activeTab === 'info' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-outfit">
              <div className="lg:col-span-2 bg-surface border border-border rounded-2xl p-6 md:p-8 shadow-md space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Data Diri & Outlet</h3>
                  <p className="text-[13px] text-text-muted mt-0.5">
                    Perbarui informasi profil pengguna untuk keperluan administrasi dan pencatatan staf.
                  </p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[13px] font-medium text-text-muted block mb-1.5">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#141416] border border-border rounded-xl px-4 py-2.5 text-[14px] text-white focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[13px] font-medium text-text-muted block mb-1.5">
                        Alamat Email (Login)
                      </label>
                      <input
                        type="email"
                        value={email}
                        disabled
                        className="w-full bg-[#18181A] border border-border/50 text-text-muted rounded-xl px-4 py-2.5 text-[14px] cursor-not-allowed select-none"
                      />
                      <span className="text-[11px] text-text-muted/70 mt-1 block">
                        Email utama tidak dapat diubah sendiri demi keamanan sistem.
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[13px] font-medium text-text-muted block mb-1.5">
                        Nomor WhatsApp / Telepon
                      </label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#141416] border border-border rounded-xl px-4 py-2.5 text-[14px] text-white focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[13px] font-medium text-text-muted block mb-1.5">
                        Peran & Otorisasi
                      </label>
                      <input
                        type="text"
                        value={`${displayRole} (Akses Penuh)`}
                        disabled
                        className="w-full bg-[#18181A] border border-border/50 text-text-muted rounded-xl px-4 py-2.5 text-[14px] cursor-not-allowed select-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[13px] font-medium text-text-muted block mb-1.5">
                      Cabang Barbershop Utama
                    </label>
                    <input
                      type="text"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full bg-[#141416] border border-border rounded-xl px-4 py-2.5 text-[14px] text-white focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="text-[13px]">
                      {isSaved && (
                        <span className="text-success flex items-center gap-1.5 font-bold animate-in fade-in">
                          <Check className="w-4 h-4" />
                          Perubahan profil berhasil disimpan!
                        </span>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="bg-secondary hover:bg-secondary/90 text-white px-6 py-2.5 rounded-xl text-[14px] font-bold flex items-center gap-2 shadow-lg shadow-secondary/20 transition-all active:scale-95 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Simpan Perubahan</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Side Card: Account Summary */}
              <div className="space-y-4">
                <Card className="p-6 rounded-2xl bg-surface border-border space-y-4">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-secondary" />
                    <h4 className="text-[15px] font-bold text-white">Ringkasan Hak Akses</h4>
                  </div>
                  <div className="space-y-3 text-[13px] text-text-muted">
                    <div className="flex items-center justify-between py-1.5 border-b border-border/50">
                      <span>Manajemen Kapster</span>
                      <span className="text-white font-medium">Penuh</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-border/50">
                      <span>Laporan Keuangan</span>
                      <span className="text-white font-medium">Lihat & Ekspor</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-border/50">
                      <span>Pengaturan Toko</span>
                      <span className="text-white font-medium">Buka / Libur</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-border/50">
                      <span>Kelola Akun Staf</span>
                      <span className="text-white font-medium">Tambah / Hapus</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5">
                      <span>Integrasi Pakkasir</span>
                      <span className="text-emerald-400 font-medium">Terhubung</span>
                    </div>
                  </div>
                </Card>

                <div className="bg-[#24130A] border-l-4 border-secondary rounded-xl p-4 shadow-sm">
                  <p className="text-[12px] text-text-muted leading-relaxed">
                    Perubahan nama profil akan otomatis disinkronkan ke seluruh nota dan riwayat transaksi kasir.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: KEAMANAN & SANDI */}
          {activeTab === 'security' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-outfit">
              <div className="lg:col-span-2 space-y-4">
                {/* Password Card */}
                <div className="bg-surface border border-border rounded-2xl p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Key className="w-4 h-4 text-secondary" />
                      <h3 className="text-[16px] font-bold text-white">Kata Sandi Akun</h3>
                    </div>
                    <p className="text-[13px] text-text-muted">
                      Terakhir diperbarui 30 hari yang lalu. Gunakan kombinasi minimal 6 karakter.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPasswordModalOpen(true)}
                    className="bg-raised hover:bg-raised/80 border border-border text-white px-5 py-2.5 rounded-xl text-[13px] font-bold flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shrink-0"
                  >
                    <Lock className="w-4 h-4 text-secondary" />
                    <span>Ganti Kata Sandi</span>
                  </button>
                </div>

                {/* 2FA Card */}
                <div className="bg-surface border border-border rounded-2xl p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-emerald-400" />
                      <h3 className="text-[16px] font-bold text-white">Verifikasi Dua Langkah (2FA)</h3>
                    </div>
                    <p className="text-[13px] text-text-muted">
                      Melindungi akun Anda dengan kode autentikasi tambahan saat masuk dari perangkat baru.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 text-[12px] font-bold shrink-0 self-start sm:self-auto">
                    <CheckCircle2 className="w-4 h-4" />
                    Aktif (Authenticator)
                  </span>
                </div>

                {/* Active Sessions */}
                <div className="bg-surface border border-border rounded-2xl p-6 shadow-md space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-secondary" />
                      <h3 className="text-[16px] font-bold text-white">Sesi Perangkat Aktif</h3>
                    </div>
                    <span className="text-[12px] text-text-muted">1 Perangkat Terhubung</span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-[#141416] border border-border flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-raised border border-border flex items-center justify-center text-secondary">
                          <Monitor className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-[14px] font-bold text-white">Windows PC • Google Chrome</p>
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-950/40 text-emerald-400 border border-emerald-500/25 font-bold">
                              Sesi Ini
                            </span>
                          </div>
                          <p className="text-[12px] text-text-muted mt-0.5">
                            Jakarta, Indonesia • IP 182.253.xx.xx • Aktif sekarang
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side Card: Tips Keamanan */}
              <div className="space-y-4">
                <Card className="p-6 rounded-2xl bg-surface border-border space-y-3">
                  <div className="flex items-center gap-2 text-secondary font-bold text-[14px]">
                    <Shield className="w-4 h-4" />
                    <span>Kriteria Keamanan Owner</span>
                  </div>
                  <p className="text-[13px] text-text-muted leading-relaxed">
                    Sebagai akun Owner, akses ini memiliki kendali penuh terhadap pembagian komisi dan omset. Jangan pernah memberikan kredensial login kepada pihak ketiga.
                  </p>
                </Card>
              </div>
            </div>
          )}

          {/* TAB 3: PREFERENSI SISTEM */}
          {activeTab === 'preferences' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-outfit">
              <div className="lg:col-span-2 bg-surface border border-border rounded-2xl p-6 md:p-8 shadow-md space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Preferensi Notifikasi & Audio</h3>
                  <p className="text-[13px] text-text-muted mt-0.5">
                    Atur cara TRIM memberi tahu Anda tentang aktivitas toko dan perubahan antrean langsung.
                  </p>
                </div>

                <div className="space-y-4 divide-y divide-border/50">
                  <div className="pt-2 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[14px] font-bold text-white">Suara Notifikasi Antrean Baru</p>
                      <p className="text-[12px] text-text-muted mt-0.5">
                        Putar bunyi lonceng saat ada pelanggan walk-in baru didaftarkan.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                      const next = !soundNotification;
                      setSoundNotification(next);
                      if (typeof window !== 'undefined') localStorage.setItem('trim_pref_sound', String(next));
                    }}
                      className={`w-12 h-6.5 rounded-full transition-colors relative cursor-pointer ${soundNotification ? 'bg-secondary' : 'bg-raised'
                        }`}
                    >
                      <span
                        className={`block w-5 h-5 rounded-full bg-white transition-transform ${soundNotification ? 'translate-x-6' : 'translate-x-1'
                          }`}
                      />
                    </button>
                  </div>

                  <div className="pt-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[14px] font-bold text-white">Peringatan WhatsApp Antrean Terlambat</p>
                      <p className="text-[12px] text-text-muted mt-0.5">
                        Kirim pesan peringatan otomatis jika pelanggan belum check-in setelah 15 menit.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                      const next = !whatsappAlert;
                      setWhatsappAlert(next);
                      if (typeof window !== 'undefined') localStorage.setItem('trim_pref_wa', String(next));
                    }}
                      className={`w-12 h-6.5 rounded-full transition-colors relative cursor-pointer ${whatsappAlert ? 'bg-secondary' : 'bg-raised'
                        }`}
                    >
                      <span
                        className={`block w-5 h-5 rounded-full bg-white transition-transform ${whatsappAlert ? 'translate-x-6' : 'translate-x-1'
                          }`}
                      />
                    </button>
                  </div>

                  <div className="pt-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[14px] font-bold text-white">Email Rekap Omset Harian (Closing)</p>
                      <p className="text-[12px] text-text-muted mt-0.5">
                        Kirim rekap PDF otomatis ke aditya@trim.id setiap pukul 22:00 WIB.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                      const next = !dailyReportEmail;
                      setDailyReportEmail(next);
                      if (typeof window !== 'undefined') localStorage.setItem('trim_pref_daily', String(next));
                    }}
                      className={`w-12 h-6.5 rounded-full transition-colors relative cursor-pointer ${dailyReportEmail ? 'bg-secondary' : 'bg-raised'
                        }`}
                    >
                      <span
                        className={`block w-5 h-5 rounded-full bg-white transition-transform ${dailyReportEmail ? 'translate-x-6' : 'translate-x-1'
                          }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Card className="p-6 rounded-2xl bg-surface border-border space-y-3 font-outfit">
                  <h4 className="text-[15px] font-bold text-white">Zona Waktu Sistem</h4>
                  <div className="space-y-1 text-[13px] text-text-muted">
                    <p>Wilayah: Asia/Jakarta (WIB)</p>
                    <p>Format: 24 Jam • GMT+7</p>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* TAB 4: LOG AKTIVITAS */}
          {activeTab === 'activity' && (
            <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 shadow-md font-outfit space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Riwayat Tindakan Akun (Audit Log)</h3>
                <p className="text-[13px] text-text-muted mt-0.5">
                  Catatan aktivitas terkini yang dilakukan oleh akun ini di platform TRIM.
                </p>
              </div>

              <div className="space-y-4 border-l-2 border-border/80 pl-4 ml-2">
                {[
                  {
                    action: 'Login Sesi Berhasil',
                    desc: 'Masuk melalui browser Google Chrome (Windows Desktop)',
                    time: 'Hari ini • 11:00 WIB',
                    icon: Monitor,
                    color: 'text-emerald-400',
                  },
                  {
                    action: 'Ekspor Laporan Pendapatan',
                    desc: 'Mengunduh file Laporan_TRIM_Mingguan.csv (UTF-8 BOM)',
                    time: 'Hari ini • 09:30 WIB',
                    icon: FileText,
                    color: 'text-secondary',
                  },
                  {
                    action: 'Perubahan Jam Operasional Toko',
                    desc: 'Menyesuaikan status buka toko dan jadwal libur khusus',
                    time: 'Kemarin • 17:15 WIB',
                    icon: Clock,
                    color: 'text-amber-400',
                  },
                  {
                    action: 'Verifikasi Pembayaran QRIS',
                    desc: 'Transaksi QRIS-20261006-8A3F senilai Rp60.000 terverifikasi',
                    time: '6 Okt 2026 • 14:02 WIB',
                    icon: CheckCircle2,
                    color: 'text-emerald-400',
                  },
                  {
                    action: 'Pendaftaran Akun Baru',
                    desc: 'Membuat akun staf kasir baru: dimas@trim.id (Admin)',
                    time: '12 Sep 2026 • 09:00 WIB',
                    icon: User,
                    color: 'text-blue-400',
                  },
                ].map((log, i) => {
                  const Icon = log.icon;
                  return (
                    <div key={i} className="relative group">
                      <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-raised border-2 border-secondary" />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className={`text-[14px] font-bold ${log.color}`}>{log.action}</span>
                          <span className="text-[11px] text-text-muted">• {log.time}</span>
                        </div>
                        <p className="text-[13px] text-text-muted">{log.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Modal Ganti Kata Sandi ── */}
      <AnimatePresence>
        {isPasswordModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#1A1A1A] border border-border w-full max-w-md rounded-2xl p-6 shadow-2xl font-outfit space-y-4"
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-secondary" />
                  <h3 className="text-lg font-bold text-white">Ganti Kata Sandi</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="text-text-muted hover:text-white p-1 rounded-lg hover:bg-raised"
                >
                  ✕
                </button>
              </div>

              {passwordError && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-400 text-[13px] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              {passwordSuccess ? (
                <div className="py-6 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-success/20 text-success flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <p className="text-[15px] font-bold text-white">Kata sandi berhasil diperbarui!</p>
                </div>
              ) : (
                <form onSubmit={handleUpdatePassword} className="space-y-3.5">
                  <div>
                    <label className="text-[13px] font-medium text-text-muted block mb-1">
                      Kata Sandi Saat Ini
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Masukkan kata sandi lama"
                      className="w-full bg-[#141416] border border-border rounded-xl px-4 py-2.5 text-[14px] text-white focus:outline-none focus:border-secondary"
                    />
                  </div>

                  <div>
                    <label className="text-[13px] font-medium text-text-muted block mb-1">
                      Kata Sandi Baru
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimal 6 karakter"
                      className="w-full bg-[#141416] border border-border rounded-xl px-4 py-2.5 text-[14px] text-white focus:outline-none focus:border-secondary"
                    />
                  </div>

                  <div>
                    <label className="text-[13px] font-medium text-text-muted block mb-1">
                      Konfirmasi Kata Sandi Baru
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Ulangi kata sandi baru"
                      className="w-full bg-[#141416] border border-border rounded-xl px-4 py-2.5 text-[14px] text-white focus:outline-none focus:border-secondary"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[12px] pt-1">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-text-muted hover:text-white flex items-center gap-1.5 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showPassword ? 'Sembunyikan' : 'Perlihatkan'} Sandi</span>
                    </button>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsPasswordModalOpen(false)}
                      className="px-4 py-2 rounded-xl text-[13px] font-medium text-text-muted hover:text-white hover:bg-raised"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl text-[13px] font-bold bg-secondary hover:bg-secondary/90 text-white shadow-md shadow-secondary/20 cursor-pointer"
                    >
                      Simpan Sandi
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

