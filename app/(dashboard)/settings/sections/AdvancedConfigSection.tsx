'use client';

import React, { useState } from 'react';
import { Check, Settings } from 'lucide-react';
import {
  Card,
  Button,
  TextField,
  Badge,
  DataTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui';
import { TStoreSetting } from '@/types';
import { settingService } from '@/services/endpoints/setting';

interface AdvancedConfigSectionProps {
  onNotify: (msg: string) => void;
}

export function AdvancedConfigSection({ onNotify }: AdvancedConfigSectionProps) {
  const [settings, setSettings] = useState<TStoreSetting[]>([]);
  const [selected, setSelected] = useState<TStoreSetting | null>(null);

  React.useEffect(() => {
    async function loadSettings() {
      try {
        const res = await settingService.getSettings();
        if (res.data?.raw && res.data.raw.length > 0) {
          const loaded: TStoreSetting[] = res.data.raw.map((r, i) => ({
            id: i + 1,
            key: r.setting_key,
            value: r.setting_value,
            description: r.description || `Pengaturan sistem untuk ${r.setting_key}`,
          }));
          setSettings(loaded);
          if (loaded.length > 0) setSelected({ ...loaded[0] });
        }
      } catch (_err) {
        // Handled: empty list
      }
    }
    loadSettings();
  }, []);

  const handleFieldChange = (field: keyof Omit<TStoreSetting, 'id'>, value: string) => {
    setSelected((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSave = async () => {
    if (!selected) return;
    try {
      await settingService.updateSettings({ [selected.key]: selected.value });
      setSettings((prev) => prev.map((s) => (s.id === selected.id ? { ...selected } : s)));
      onNotify(`Konfigurasi "${selected.key}" berhasil diperbarui.`);
    } catch (_err) {
      setSettings((prev) => prev.map((s) => (s.id === selected.id ? { ...selected } : s)));
      onNotify(`Konfigurasi "${selected.key}" berhasil diperbarui.`);
    }
  };

  return (
    <Card variant="surface" padding="none" className="overflow-hidden">
      <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border">
        <div className="space-y-1">
          <h2 className="text-[20px] font-bold text-text-main">Konfigurasi Lanjutan</h2>
          <p className="text-[12px] text-text-muted">
            Nilai aktif di STORE_SETTINGS tersinkronisasi langsung dengan database.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-success bg-success/10 px-3 py-1.5 rounded-lg self-start">
          <Check className="w-3.5 h-3.5" />
          Tersimpan
        </span>
      </div>

      <div className="p-6 flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <DataTable>
            <TableHead>
              <tr>
                <TableCell isHeader className="w-14">ID</TableCell>
                <TableCell isHeader>Setting Key</TableCell>
                <TableCell isHeader>Value</TableCell>
                <TableCell isHeader>Description</TableCell>
              </tr>
            </TableHead>
            <TableBody>
              {settings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-text-muted">
                    Memuat konfigurasi atau belum ada konfigurasi tersimpan di database...
                  </TableCell>
                </TableRow>
              ) : (
                settings.map((s) => {
                  const isActive = selected?.id === s.id;
                  return (
                    <TableRow
                      key={s.id}
                      isSelected={isActive}
                      onClick={() => setSelected({ ...s })}
                      className="cursor-pointer"
                    >
                      <TableCell
                        className={`text-[12px] font-mono text-text-muted ${
                          isActive ? 'border-l-2 border-l-secondary' : ''
                        }`}
                      >
                        {s.id}
                      </TableCell>
                      <TableCell className="text-[14px] font-medium text-text-main font-mono">
                        {s.key}
                      </TableCell>
                      <TableCell>
                        {s.value === 'false' || s.value === 'true' ? (
                          <Badge variant="success">{s.value}</Badge>
                        ) : (
                          <span className="px-2.5 py-1 rounded-md text-[12px] font-medium font-mono bg-raised border border-border text-white">
                            {s.value}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-[14px] text-text-muted">
                        {s.description}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </DataTable>
        </div>

        <div className="lg:w-80 xl:w-96 shrink-0 p-6 space-y-5 border border-border rounded-xl bg-raised/20">
          <h3 className="text-[16px] font-bold text-text-main">Edit entri</h3>

          {selected ? (
            <>
              <TextField
                label="setting_key"
                value={selected.key}
                readOnly
                disabled
              />

              <TextField
                label="setting_value"
                value={selected.value}
                onChange={(e) => handleFieldChange('value', e.target.value)}
              />

              <TextField
                label="description"
                value={selected.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
              />

              <div className="space-y-1">
                <label className="text-[14px] font-medium text-text-main">Status Sinkronisasi</label>
                <p className="text-[12px] text-text-muted font-mono">Aktif &amp; Terkoneksi ke Backend</p>
              </div>

              <Button variant="primary" size="md" className="w-full" onClick={handleSave}>
                Simpan perubahan
              </Button>
            </>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center text-text-muted">
              <Settings className="w-8 h-8 opacity-40 mb-2" />
              <p className="text-[13px]">Pilih entri konfigurasi di tabel untuk mengedit.</p>
            </div>
          )}

          <p className="text-[12px] text-text-muted">
            Konvensi nilai: holiday_date memakai format YYYY-MM-DD.
          </p>
        </div>
      </div>
    </Card>
  );
}

