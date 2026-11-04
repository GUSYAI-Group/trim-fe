import React from 'react';
import Link from 'next/link';
import { Star, ArrowRight, UserX } from 'lucide-react';
import {
  DataTable,
  TableRow,
  TableHead,
  TableCell,
  Avatar,
  Badge,
  SearchBar,
  SelectField,
  EmptyState,
  Button,
} from '@/components/ui';
import { TKapster } from '@/types';

interface BarberTableSectionProps {
  barbers: TKapster[];
  totalCount: number;
  activeCount: number;
  inactiveCount: number;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedStatus: 'Semua' | 'Aktif' | 'Nonaktif';
  onStatusChange: (val: 'Semua' | 'Aktif' | 'Nonaktif') => void;
}

export function BarberTableSection({
  barbers,
  totalCount,
  activeCount,
  inactiveCount,
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
}: BarberTableSectionProps) {
  const tabs: { key: 'Semua' | 'Aktif' | 'Nonaktif'; label: string }[] = [
    { key: 'Semua', label: `Semua (${totalCount})` },
    { key: 'Aktif', label: `Aktif (${activeCount})` },
    { key: 'Nonaktif', label: `Nonaktif (${inactiveCount})` },
  ];

  return (
    <div className="space-y-4">
      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => onStatusChange(tab.key)}
              className={`px-4 py-2 rounded-xl font-semibold text-[13px] transition-colors cursor-pointer ${
                selectedStatus === tab.key
                  ? 'bg-raised border border-border text-text-main'
                  : 'text-text-muted hover:text-text-main'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <SearchBar
            size="sm"
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Cari nama atau nomor telepon"
            className="w-full md:w-72"
          />
          <SelectField
            size="sm"
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value as 'Semua' | 'Aktif' | 'Nonaktif')}
            options={[
              { value: 'Semua', label: 'Semua status' },
              { value: 'Aktif', label: 'Aktif' },
              { value: 'Nonaktif', label: 'Nonaktif' },
            ]}
          />
        </div>
      </div>

      {/* Datatable */}
      <DataTable
        columns={
          <>
            <TableHead className="pl-6">Nama</TableHead>
            <TableHead>Spesialisasi</TableHead>
            <TableHead>Status aktif</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Selesai hari ini</TableHead>
            <TableHead className="pr-6">Aksi</TableHead>
          </>
        }
        pagination={{
          text: `Menampilkan ${barbers.length > 0 ? 1 : 0}–${barbers.length} dari ${totalCount} kapster`,
          currentPage: 1,
        }}
      >
        {barbers.length > 0 ? (
          barbers.map((kapster) => (
            <TableRow key={kapster.id}>
              <TableCell className="pl-6">
                <div className="flex items-center gap-3">
                  <Avatar name={kapster.name} shape="rounded" variant="surface" size={40} />
                  <div>
                    <p className="font-bold text-text-main text-[14px]">{kapster.name}</p>
                    <p className="text-[12px] text-text-muted mt-0.5 font-mono">{kapster.phone}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-medium">{kapster.specialty}</TableCell>
              <TableCell>
                <Badge variant={kapster.status === 'aktif' ? 'aktif' : 'nonaktif'} />
              </TableCell>
              <TableCell className="font-bold">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
                  {kapster.rating}
                </span>
              </TableCell>
              <TableCell className="font-bold">{kapster.finished}</TableCell>
              <TableCell className="pr-6">
                <div className="flex items-center gap-5">
                  <Link
                    href={`/barbers/form?id=${kapster.rawPhone}`}
                    className="text-secondary font-bold hover:underline transition-colors text-[13px] cursor-pointer"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/barbers/form?id=${kapster.rawPhone}`}
                    className="text-text-muted hover:text-text-main transition-colors flex items-center gap-1.5 font-bold text-[13px] cursor-pointer"
                  >
                    <span>Detail</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6}>
              <EmptyState
                icon={<UserX className="w-8 h-8" />}
                title="Kapster tidak ditemukan"
                description="Tidak ada kapster yang cocok dengan kriteria pencarian atau filter status."
                action={
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      onSearchChange('');
                      onStatusChange('Semua');
                    }}
                  >
                    Reset filter
                  </Button>
                }
              />
            </TableCell>
          </TableRow>
        )}
      </DataTable>
    </div>
  );
}

