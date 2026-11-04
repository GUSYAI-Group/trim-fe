'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';
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
import { MOCK_STORE_SETTINGS } from '@/utils/mocks/mockData';
import { TStoreSetting } from '@/types';

interface AdvancedConfigSectionProps {
  onNotify: (msg: string) => void;
}

export function AdvancedConfigSection({ onNotify }: AdvancedConfigSectionProps) {
  const [settings, setSettings] = useState<TStoreSetting[]>(MOCK_STORE_SETTINGS);
  const [selected, setSelected] = useState<TStoreSetting>({ ...MOCK_STORE_SETTINGS[1] });

  const handleFieldChange = (field: keyof Omit<TStoreSetting, 'id'>, value: string) => {
    setSelected((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setSettings((prev) => prev.map((s) => (s.id === selected.id ? { ...selected } : s)));
    onNotify(`Konfigurasi "${selected.key}" berhasil diperbarui.`);
  };

  return (
    <Card variant="surface" padding="none" className="overflow-hidden">
      <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border">
        <div className="space-y-1">
          <h2 className="text-[20px] font-bold text-white">Konfigurasi Lanjutan</h2>
          <p className="text-[13px] text-text-muted">
            Nilai aktif di STORE_SETTINGS. Perubahan tersimpan 6 Okt 2026 14:28 WIB.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-success bg-success/10 px-3 py-1.5 rounded-lg self-start">
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
              {settings.map((s) => {
                const isActive = selected.id === s.id;
                return (
                  <TableRow
                    key={s.id}
                    isSelected={isActive}
                    onClick={() => setSelected({ ...s })}
                    className="cursor-pointer"
                  >
                    <TableCell
                      className={`text-[13px] font-mono text-text-muted ${
                        isActive ? 'border-l-2 border-l-secondary' : ''
                      }`}
                    >
                      {s.id}
                    </TableCell>
                    <TableCell className="text-[13px] font-medium text-white font-mono">
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
                    <TableCell className="text-[13px] text-text-muted">
                      {s.description}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </DataTable>
        </div>

        <div className="lg:w-80 xl:w-96 shrink-0 p-6 space-y-5 border border-border rounded-xl bg-raised/20">
          <h3 className="text-[15px] font-bold text-white">Edit entri</h3>

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
            <label className="text-xs font-bold text-white">updated_at (sistem)</label>
            <p className="text-[13px] text-text-muted font-mono">6 Okt 2026 14:28 WIB</p>
          </div>

          <Button variant="primary" size="md" className="w-full" onClick={handleSave}>
            Simpan perubahan
          </Button>

          <p className="text-[11px] text-text-muted">
            Konvensi nilai: holiday_date memakai format YYYY-MM-DD.
          </p>
        </div>
      </div>
    </Card>
  );
}

