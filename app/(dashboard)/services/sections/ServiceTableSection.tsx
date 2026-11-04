import React from 'react';
import Link from 'next/link';
import { Edit, Scissors } from 'lucide-react';
import {
  DataTable,
  TableRow,
  TableHead,
  TableCell,
  Badge,
  SearchBar,
  SelectField,
  EmptyState,
  Button,
} from '@/components/ui';
import { TService } from '@/types';

interface ServiceTableSectionProps {
  services: TService[];
  totalCount: number;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (val: string) => void;
}

export function ServiceTableSection({
  services,
  totalCount,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: ServiceTableSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <h2 className="text-[20px] font-bold text-text-main">Menu layanan</h2>

        <div className="flex items-center gap-3">
          <SearchBar
            size="sm"
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Cari nama layanan"
            className="flex-1 sm:w-64"
          />

          <SelectField
            size="sm"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            options={[
              { value: 'Semua', label: 'Semua kategori' },
              { value: 'Potong rambut', label: 'Potong rambut' },
              { value: 'Paket', label: 'Paket' },
              { value: 'Perawatan', label: 'Perawatan' },
              { value: 'Styling', label: 'Styling' },
              { value: 'Pewarnaan', label: 'Pewarnaan' },
            ]}
          />
        </div>
      </div>

      <DataTable
        columns={
          <>
            <TableHead className="pl-6">Nama layanan</TableHead>
            <TableHead>Durasi (menit)</TableHead>
            <TableHead>Harga</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Status aktif</TableHead>
            <TableHead className="pr-6 text-right">Aksi</TableHead>
          </>
        }
        pagination={{
          text: `Menampilkan ${services.length > 0 ? 1 : 0}–${services.length} dari ${totalCount} layanan`,
          currentPage: 1,
        }}
      >
        {services.length > 0 ? (
          services.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="pl-6">
                <div className="font-bold text-text-main text-[14px]">{item.name}</div>
                <div className="text-[12px] text-text-muted">Kategori: {item.category}</div>
              </TableCell>
              <TableCell className="font-bold text-text-main">{item.duration} menit</TableCell>
              <TableCell className="font-bold text-text-main">
                Rp{item.price.toLocaleString('id-ID')}
              </TableCell>
              <TableCell className="text-text-muted">{item.category}</TableCell>
              <TableCell>
                <Badge variant={item.isActive ? 'aktif' : 'nonaktif'} />
              </TableCell>
              <TableCell className="pr-6 text-right">
                <div className="flex items-center justify-end gap-4">
                  <Link
                    href={`/services/form?id=${item.id}`}
                    className="text-secondary font-bold text-[13px] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Link>
                  <span className="text-text-muted text-[13px] select-none">
                    {item.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6}>
              <EmptyState
                icon={<Scissors className="w-8 h-8" />}
                title="Layanan tidak ditemukan"
                description="Tidak ada layanan yang cocok dengan kata kunci atau filter kategori."
                action={
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      onSearchChange('');
                      onCategoryChange('Semua');
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

