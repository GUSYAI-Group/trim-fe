'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Card, TextField, Button, Alert } from '@/components/ui';
import { useAuthStore } from '@/store/useAuthStore';

export function LoginFormSection() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const VALID_EMAIL = 'admin@trim.id';
    const OWNER_EMAIL = 'aditya@trim.id';
    const VALID_PASSWORD = 'farhan123';

    if ((email === VALID_EMAIL || email === OWNER_EMAIL) && password === VALID_PASSWORD) {
      login('mock-jwt-token', {
        id: email === OWNER_EMAIL ? '8f2c-a1e4' : '9b1a-c7f2',
        email,
        name: email === OWNER_EMAIL ? 'Aditya Pratama' : 'Dimas Saputra',
        initials: email === OWNER_EMAIL ? 'AP' : 'DS',
        role: email === OWNER_EMAIL ? 'owner' : 'admin',
      });
      router.push('/');
    } else {
      setErrorMessage('Email atau kata sandi salah! Gunakan admin@trim.id / farhan123');
    }
  };

  return (
    <div className="flex flex-col justify-between h-full py-1 md:py-2 px-2 md:px-4 overflow-y-auto">
      <div className="text-center pt-1">
        <span className="text-[11px] tracking-[0.25em] text-text-muted uppercase font-bold">
          RUANG OPERASIONAL
        </span>
      </div>

      <div className="my-auto py-2">
        <Card className="p-6 md:p-8 space-y-6 shadow-xl">
          <div>
            <h2 className="text-[20px] font-bold tracking-tight text-text-main mb-1">
              Masuk ke Dashboard
            </h2>
            <p className="text-[13px] text-text-muted leading-relaxed">
              Gunakan akun Admin atau Owner untuk mengakses ruang operasional TRIM.
            </p>
          </div>

          {errorMessage && (
            <Alert variant="error" title="Gagal Masuk" description={errorMessage} />
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@trim.id"
              required
            />

            <TextField
              label="Kata sandi"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
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

            <div className="text-[13px] text-text-muted pt-0.5">
              Lupa kata sandi?{' '}
              <span className="text-secondary font-semibold">
                Hubungi Owner
              </span>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="mt-2"
            >
              Masuk
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

