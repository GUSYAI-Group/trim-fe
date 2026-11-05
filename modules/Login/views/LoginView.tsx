"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginView() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || isSuccess) return;
    setErrorMessage("");

    setIsLoading(true);

    // --- EMAIL DAN PASSWORD LOGIN ---
    const VALID_EMAIL = "admin@trim.id";
    const VALID_PASSWORD = "farhan123";

    // Simulasi verifikasi autentikasi yang halus & responsif
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (email.trim() === VALID_EMAIL && password === VALID_PASSWORD) {
      // Set status autentikasi di store
      useAuthStore.getState().login("token-trim-admin-auth", {
        id: "admin-1",
        role: "Admin",
        name: "aditya@trim.id",
      });

      setIsSuccess(true);
      setIsLoading(false);

      // Transisi halus keluar menuju dashboard
      setTimeout(() => {
        router.push("/");
      }, 250);
    } else {
      setIsLoading(false);
      setErrorMessage("Email atau kata sandi salah!");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 450);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isSuccess ? 0 : 1, scale: isSuccess ? 0.995 : 1 }}
      transition={{ duration: isSuccess ? 0.25 : 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen w-full bg-[#111111] text-white flex items-center justify-center p-4 sm:p-6 lg:p-8 font-outfit selection:bg-[#FF4D00] selection:text-white"
    >
      {/* Split Screen Container */}
      <div className="w-full max-w-7xl min-h-[640px] lg:h-[calc(100vh-4rem)] grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

        {/* Kolom Kiri: Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden flex flex-col justify-between p-8 sm:p-10 lg:p-12 border border-[#303030] bg-[#1A1A1A] min-h-[460px] lg:min-h-full shadow-2xl"
        >
          {/* Barber Promotional Image */}
          <img
            src="/login/barber-bg.jpg.png"
            alt="Barbershop Background"
            className="absolute inset-0 w-full h-full object-cover object-center grayscale contrast-125 brightness-75 transition-transform duration-700 hover:scale-105"
          />

          {/* Vignette Overlay for readable text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/70" />

          {/* Top Brand Header */}
          <div className="relative z-10">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-outfit">
                TRIM
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D00] inline-block mb-1"></span>
            </div>
            <p className="text-xs text-[#999999] font-medium font-outfit mt-1">
              AI-Powered Barbershop Information System
            </p>
          </div>

          {/* Bottom Hero Typography */}
          <div className="relative z-10 space-y-3">
            <div className="w-12 h-1 bg-[#FF4D00] rounded-full" />
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-white leading-tight uppercase font-outfit">
              POTONG RAPI.<br />GERAK CEPAT.
            </h1>
            <p className="text-xs sm:text-sm text-[#999999] font-normal leading-relaxed font-outfit max-w-sm">
              Di balik potongan terbaik, ada operasional yang tertata.
            </p>
          </div>
        </motion.div>

        {/* Kolom Kanan: Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between items-center h-full py-2 lg:py-4 px-2 sm:px-4"
        >

          {/* Header Atas: RUANG OPERASIONAL */}
          <div className="w-full text-center pt-2">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#999999] uppercase font-outfit">
              RUANG OPERASIONAL
            </span>
          </div>

          {/* Center: Card Form Login */}
          <div className="w-full max-w-[460px] my-auto py-6">
            <div className={`bg-[#1A1A1A] p-7 sm:p-9 rounded-2xl border border-[#303030] shadow-2xl transition-all duration-200 ${isShaking ? 'animate-shake' : ''}`}>
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2 font-outfit">
                  Masuk ke Dashboard
                </h2>
                <p className="text-xs sm:text-sm text-[#999999] leading-relaxed font-outfit">
                  Gunakan akun Admin atau Owner untuk mengakses ruang operasional TRIM.
                </p>
              </div>

              {/* Alert Pesan Error jika login gagal */}
              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-center font-medium font-outfit animate-dropdown">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Field Email */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-white block font-outfit">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@contoh.com"
                    required
                    disabled={isLoading || isSuccess}
                    className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-[#303030] text-sm text-white placeholder-[#666666] focus:outline-none focus:border-[#FF4D00] focus:ring-2 focus:ring-[#FF4D00]/20 transition-all duration-200 font-outfit disabled:opacity-70"
                  />
                </div>

                {/* Field Kata Sandi */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-white block font-outfit">
                    Kata sandi
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      disabled={isLoading || isSuccess}
                      className="w-full px-4 py-3 pr-28 rounded-xl bg-[#111111] border border-[#303030] text-sm text-white placeholder-[#666666] focus:outline-none focus:border-[#FF4D00] focus:ring-2 focus:ring-[#FF4D00]/20 transition-all duration-200 font-outfit disabled:opacity-70"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#999999] hover:text-white flex items-center gap-1.5 transition-all duration-150 active:scale-95 cursor-pointer font-outfit select-none"
                    >
                      <span className="transition-transform duration-150 inline-flex items-center gap-1.5">
                        {showPassword ? (
                          <>
                            <EyeOff className="w-4 h-4" />
                            <span>Sembunyikan</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4" />
                            <span>Tampilkan</span>
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Tautan Lupa kata sandi */}
                <div className="text-xs sm:text-sm text-[#999999] font-outfit pt-1">
                  Lupa kata sandi?{" "}
                  <a href="#" className="text-[#FF4D00] hover:underline font-medium transition-colors">
                    Hubungi Owner
                  </a>
                </div>

                {/* Tombol Utama Masuk */}
                <button
                  type="submit"
                  disabled={isLoading || isSuccess}
                  className="w-full mt-4 bg-[#FF4D00] hover:bg-[#FF4D00]/90 text-white font-bold py-3.5 px-4 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#FF4D00]/25 transition-all duration-180 active:scale-[0.98] disabled:opacity-85 disabled:cursor-not-allowed cursor-pointer font-outfit select-none"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Memproses...</span>
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>Berhasil masuk...</span>
                    </>
                  ) : (
                    <>
                      <span>Masuk</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Footer Bawah */}
          <div className="w-full text-center pb-2 text-xs text-[#999999] font-medium font-outfit">
            TRIM / AI-Powered Barbershop Information System
          </div>

        </motion.div>

      </div>
    </motion.div>
  );
}
