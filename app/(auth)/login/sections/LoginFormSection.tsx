'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, ArrowRight, KeyRound, Mail, Lock } from 'lucide-react';
import { Card, TextField, Button, Alert, Toast } from '@/components/ui';
import { useAuthStore } from '@/store/useAuthStore';
import { apiClient } from '@/services/config/apiClient';
import { loginSchema, LoginFormData } from '@/utils/validations/schemas';

export function LoginFormSection() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [logoutNotice, setLogoutNotice] = useState(false);

  useEffect(() => {
    // Deteksi jika user baru saja keluar / logout
    if (typeof window !== 'undefined') {
      const hasLogoutToast = sessionStorage.getItem('trim_logout_toast');
      const params = new URLSearchParams(window.location.search);
      if (hasLogoutToast || params.get('logout')) {
        setLogoutNotice(true);
        sessionStorage.removeItem('trim_logout_toast');
      }
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage('');
    setSuccessMessage('');
    setLogoutNotice(false);

    try {
      const res = await apiClient.post<{
        token: string;
        user: {
          id: string;
          email: string;
          name: string;
          initials: string;
          role: 'owner' | 'admin' | 'barber' | 'customer';
        };
      }>('/auth/login', data);

      const { token, user } = res.data;

      if (user.role === 'customer') {
        setErrorMessage('Akun Pelanggan tidak memiliki izin akses ke Dashboard Operasional.');
        return;
      }

      setSuccessMessage(`Login berhasil! Selamat datang, ${user.name}.`);
      sessionStorage.setItem('trim_login_toast', user.name);
      login(token, user);

      setTimeout(() => {
        router.push('/');
      }, 700);
    } catch (err: any) {
      setErrorMessage(
        err?.message || 'Email atau kata sandi salah. Pastikan server backend sedang aktif.'
      );
    }
  };

  return (
    <div className="flex flex-col justify-between h-full py-2 md:py-3 px-2 md:px-4 overflow-y-auto">
      {/* Top Header Badge */}
      <div className="text-center pt-1">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-raised/90 border border-border text-[11px] font-bold tracking-[0.2em] text-text-muted uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_6px_rgba(255,69,0,0.8)] animate-pulse" />
          RUANG OPERASIONAL
        </span>
      </div>

      {/* Main Card */}
      <div className="my-auto py-3">
        <Card className="p-6 md:p-8 space-y-6 shadow-2xl border-border bg-surface">
          <div>
            <h2 className="font-heading text-[22px] md:text-[24px] font-bold tracking-tight text-text-main mb-1.5">
              Masuk ke Dashboard
            </h2>
            <p className="text-[13px] md:text-[14px] text-text-muted leading-relaxed">
              Gunakan akun staf terdaftar untuk mengelola antrean, layanan, kasir, dan analitik barbershop.
            </p>
          </div>

          {logoutNotice && (
            <Alert
              variant="info"
              title="Sesi Berakhir"
              description="Anda telah berhasil keluar dari sistem operasional TRIM."
            />
          )}

          {successMessage && (
            <Alert
              variant="success"
              title="Berhasil Masuk"
              description={successMessage}
            />
          )}

          {errorMessage && (
            <Alert variant="error" title="Gagal Masuk" description={errorMessage} />
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <TextField
              label="Email Staf"
              type="email"
              placeholder="Masukkan email Anda (mis. owner@trim.id)"
              required
              leftAddon={<Mail className="w-4 h-4 text-text-muted/70" />}
              errorText={errors.email?.message}
              isError={Boolean(errors.email)}
              {...register('email')}
            />

            <TextField
              label="Kata Sandi"
              type={showPassword ? 'text' : 'password'}
              placeholder="Masukkan kata sandi akun"
              required
              leftAddon={<Lock className="w-4 h-4 text-text-muted/70" />}
              errorText={errors.password?.message}
              isError={Boolean(errors.password)}
              {...register('password')}
              rightAddon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[12px] font-medium text-text-muted hover:text-text-main flex items-center gap-1.5 transition-colors cursor-pointer"
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
              }
            />

            <div className="flex items-center justify-between text-[12px] text-text-muted pt-0.5">
              <span>Lupa kata sandi? Hubungi Owner</span>
              <span className="inline-flex items-center gap-1 text-secondary font-medium">
                <KeyRound className="w-3 h-3" />
                <span>SSL Encrypted</span>
              </span>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isSubmitting}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="mt-3 font-heading font-bold text-[14px] tracking-wide"
            >
              {isSubmitting ? 'Memverifikasi Kredensial...' : 'Masuk ke Sistem'}
            </Button>
          </form>
        </Card>
      </div>

      {/* Footer Branding */}
      <div className="text-center pb-1 text-[12px] text-text-muted font-medium tracking-wide">
        TRIM <span className="text-secondary">•</span> Sistem Informasi Barbershop Berbasis AI
      </div>

      {/* Floating Logout Toast */}
      {logoutNotice && (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast
            isOpen={true}
            onClose={() => setLogoutNotice(false)}
            variant="info"
            title="Berhasil Keluar"
            description="Sesi akun Anda telah diakhiri dengan aman."
          />
        </div>
      )}
    </div>
  );
}
