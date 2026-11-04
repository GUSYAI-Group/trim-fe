import React from 'react';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { DataTable, TableRow, TableHead, TableCell, Avatar } from '@/components/ui';
import { MOCK_BARBERS } from '@/utils/mocks/mockData';

export function DashboardTopBarbersSection() {
  const topBarbers = MOCK_BARBERS.slice(0, 3);

  return (
    <div className="pt-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[20px] font-bold text-text-main">Kapster paling tajam minggu ini</h2>
        <Link
          href="/barbers"
          className="text-secondary text-[14px] font-bold hover:underline flex items-center gap-1 group"
        >
          <span>Lihat semua</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <DataTable
        columns={
          <>
            <TableHead className="pl-6">Kapster</TableHead>
            <TableHead>Spesialisasi</TableHead>
            <TableHead>Cukuran minggu ini</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="pr-6">Pendapatan</TableHead>
          </>
        }
        pagination={{
          text: '3 kapster terbaik • Periode 30 Sep–6 Okt 2026',
          currentPage: 1,
        }}
      >
        {topBarbers.map((kapster) => (
          <TableRow key={kapster.id}>
            <TableCell className="pl-6">
              <div className="flex items-center gap-3">
                <Avatar name={kapster.name} shape="rounded" variant="surface" size={40} />
                <div>
                  <p className="font-bold text-text-main text-[14px]">{kapster.name}</p>
                  <p className="text-[12px] text-text-muted font-mono">UUID singkat: {kapster.uuid}...</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="font-medium text-text-main">{kapster.specialty}</TableCell>
            <TableCell className="font-bold text-text-main">{kapster.weeklyCuts}</TableCell>
            <TableCell className="font-bold text-text-main">
              <span className="inline-flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
                {kapster.rating}
              </span>
            </TableCell>
            <TableCell className="font-bold text-text-main pr-6">{kapster.weeklyIncome}</TableCell>
          </TableRow>
        ))}
      </DataTable>
    </div>
  );
}

