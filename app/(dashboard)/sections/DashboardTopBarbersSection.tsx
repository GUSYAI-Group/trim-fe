import React from 'react';
import Link from 'next/link';
import { ArrowRight, Star, Users } from 'lucide-react';
import { DataTable, TableRow, TableHead, TableCell, Avatar } from '@/components/ui';

interface DashboardTopBarbersSectionProps {
  topBarbers?: any[];
}

export function DashboardTopBarbersSection({ topBarbers: apiTopBarbers }: DashboardTopBarbersSectionProps = {}) {
  const topBarbers =
    Array.isArray(apiTopBarbers) && apiTopBarbers.length > 0
      ? apiTopBarbers.map((b) => ({
          id: b.barber_id || b.id,
          name: b.barber_name || b.name,
          specialty: b.specialty || 'General Cut',
          uuid: (b.barber_id || b.id || '').slice(0, 8),
          weeklyCuts: Number(b.total_completed_services || b.weeklyCuts || 0),
          rating: Number(b.average_rating ?? b.rating ?? 0) > 0 ? Number(b.average_rating ?? b.rating).toFixed(1) : '0.0',
          weeklyIncome: `Rp${Number(b.total_revenue_generated || 0).toLocaleString('id-ID')}`,
        }))
      : [];

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
          text: `${topBarbers.length} kapster • Sinkron performa database`,
          currentPage: 1,
        }}
      >
        {topBarbers.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="py-10 text-center text-text-muted">
              <div className="flex flex-col items-center justify-center gap-2">
                <Users className="w-8 h-8 opacity-40" />
                <p className="text-[14px]">Belum ada data aktivitas kapster tercatat minggu ini.</p>
              </div>
            </TableCell>
          </TableRow>
        ) : (
          topBarbers.map((kapster) => (
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
              <TableCell className="font-bold text-text-main font-mono">{kapster.weeklyCuts}</TableCell>
              <TableCell className="font-bold text-text-main font-mono">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
                  {kapster.rating}
                </span>
              </TableCell>
              <TableCell className="font-bold text-text-main pr-6 font-mono">{kapster.weeklyIncome}</TableCell>
            </TableRow>
          ))
        )}
      </DataTable>
    </div>
  );
}

