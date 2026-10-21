"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginView() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // --- EMAIL DAN PASSWORD LOGIN ---
    const VALID_EMAIL = "admin@trim.id";
    const VALID_PASSWORD = "farhan123";

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      // Pindah ke dashboard utama
      router.push("/");
    } else {
      setErrorMessage("Email atau kata sandi salah!");
    }
  };

  return (
    <div className="h-screen w-screen bg-[#0d0e11] text-white flex items-center justify-center p-3 md:p-6 overflow-hidden font-sans selection:bg-[#ff4500] selection:text-white">
      {/* Outer Card Container */}
      <div className="w-full max-w-6xl h-full max-h-[90vh] bg-[#121318] p-3 md:p-5 rounded-3xl border border-white/5 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch overflow-hidden">
        
        {/* Kolom Kiri: Hero Card / Poster */}
        <div className="relative h-full rounded-2xl overflow-hidden flex flex-col justify-between p-6 md:p-8 bg-neutral-900 border border-white/5">
          <img
            src="/login/barber-bg.jpg.png"
            alt="Barbershop Background"
            className="absolute inset-0 w-full h-full object-cover object-center grayscale contrast-125 brightness-60"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/70" />

          <div className="relative z-10">
            <div className="flex items-center gap-1.5 text-xl md:text-2xl font-black tracking-wider">
              TRIM<span className="h-2 w-2 rounded-sm bg-[#ff4500] inline-block"></span>
            </div>
            <p className="text-[11px] text-neutral-400 mt-0.5 tracking-wide font-medium">
              AI-Powered Barbershop Information System
            </p>
          </div>

          <div className="relative z-10 space-y-2">
            <div className="w-8 h-1 bg-[#ff4500] rounded-full" />
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-none uppercase">
              POTONG RAPI.<br />GERAK CEPAT.
            </h1>
            <p className="text-xs text-neutral-300 font-light max-w-xs leading-relaxed">
              Di balik potongan terbaik, ada operasional yang tertata.
            </p>
          </div>
        </div>

        {/* Kolom Kanan: Form Login */}
        <div className="flex flex-col justify-between h-full py-1 md:py-2 px-2 md:px-4 overflow-y-auto">
          
          <div className="text-center pt-1">
            <span className="text-[10px] tracking-[0.25em] text-neutral-500 uppercase font-bold">
              RUANG OPERASIONAL
            </span>
          </div>

          <div className="my-auto py-2">
            <div className="bg-[#181a20] p-5 md:p-7 rounded-2xl border border-white/5 shadow-xl">
              <div className="mb-5">
                <h2 className="text-lg md:text-xl font-bold tracking-tight text-white mb-1">
                  Masuk ke Dashboard
                </h2>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Gunakan akun Admin atau Owner untuk mengakses ruang operasional TRIM.
                </p>
              </div>

              {/* Alert Pesan Error jika login gagal */}
              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Field Email */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@trim.id"
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0f1015] border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#ff4500] transition-colors"
                  />
                </div>

                {/* Field Password */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300">
                    Kata sandi
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full px-3.5 py-2 pr-24 rounded-xl bg-[#0f1015] border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#ff4500] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      {showPassword ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Sembunyikan</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Tampilkan</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-xs text-neutral-400 pt-0.5">
                  Lupa kata sandi?{" "}
                  <a href="#" className="text-[#ff4500] hover:underline font-medium">
                    Hubungi Owner
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full mt-3 bg-[#ff4500] hover:bg-[#e03d00] text-white font-semibold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#ff4500]/20 transition-all duration-200 active:scale-[0.99]"
                >
                  <span>Masuk</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          <div className="text-center pb-1 text-[10px] text-neutral-500 font-medium">
            TRIM / AI-Powered Barbershop Information System
          </div>

        </div>

      </div>
    </div>
  );
}