'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Card, TextField, Button, Alert } from '@/components/ui';
import { useAuthStore } from '@/store/useAuthStore';
import { apiClient } from '@/services/config/apiClient';
import { loginSchema, LoginFormData } from '@/utils/validations/schemas';

export function LoginFormSection() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

      login(token, user);
      router.push('/');
    } catch (err: any) {
      setErrorMessage(
        err?.message || 'Email atau kata sandi salah. Pastikan server backend sedang aktif.'
      );
    }
  };

  return (
    <div className="flex flex-col justify-between h-full py-1 md:py-2 px-2 md:px-4 overflow-y-auto">
      <div className="text-center pt-1">
        <span className="text-[12px] tracking-[0.25em] text-text-muted uppercase font-bold">
          RUANG OPERASIONAL
        </span>
      </div>

      <div className="my-auto py-2">
        <Card className="p-6 md:p-8 space-y-6 shadow-xl">
          <div>
            <h2 className="text-[20px] font-bold tracking-tight text-text-main mb-1">
              Masuk ke Dashboard
            </h2>
            <p className="text-[14px] text-text-muted leading-relaxed">
              Gunakan akun Admin atau Owner untuk mengakses ruang operasional TRIM.
            </p>
          </div>

          {errorMessage && (
            <Alert variant="error" title="Gagal Masuk" description={errorMessage} />
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <TextField
              label="Email"
              type="email"
              placeholder="Masukkan email anda"
              required
              errorText={errors.email?.message}
              isError={Boolean(errors.email)}
              {...register('email')}
            />

            <TextField
              label="Kata sandi"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              required
              errorText={errors.password?.message}
              isError={Boolean(errors.password)}
              {...register('password')}
              rightAddon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[12px] text-text-muted hover:text-text-main flex items-center gap-1 transition-colors cursor-pointer"
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

            <div className="text-[12px] text-text-muted pt-0.5">
              Lupa kata sandi?{' '}
              <span className="text-secondary font-semibold">
                Hubungi Owner
              </span>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isSubmitting}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="mt-2"
            >
              {isSubmitting ? 'Memverifikasi...' : 'Masuk'}
            </Button>
          </form>
        </Card>
      </div>

      <div className="text-center pb-1 text-[12px] text-text-muted font-medium">
        TRIM / AI-Powered Barbershop Information System
      </div>
    </div>
  );
}
