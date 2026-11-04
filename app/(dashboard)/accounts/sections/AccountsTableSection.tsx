'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  SearchBar,
  SelectField,
  Badge,
  Avatar,
  DataTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  EmptyState,
} from '@/components/ui';
import { TAccount } from '@/types';
import { TRole } from '@/store/useAuthStore';

const ROLE_LABELS: Record<TRole, string> = {
  owner: 'Owner',
  admin: 'Admin',
  barber: 'Barber',
  customer: 'Customer',
};

interface AccountsTableSectionProps {
  accounts: TAccount[];
  search: string;
  onSearchChange: (val: string) => void;
  roleFilter: TRole | 'all';
  onRoleFilterChange: (val: TRole | 'all') => void;
  onDeleteRequest: (account: TAccount) => void;
  onResetFilters: () => void;
}

export function AccountsTableSection({
  accounts,
  search,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  onDeleteRequest,
  onResetFilters,
}: AccountsTableSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-[20px] font-bold text-white">{accounts.length} akun terdaftar</h2>
          <Badge variant="aktif">4 role</Badge>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex-1 sm:w-72 sm:flex-none">
            <SearchBar
              size="sm"
              value={search}
              onChange={onSearchChange}
              placeholder="Cari email atau UUID"
            />
          </div>

          <SelectField
            size="sm"
            value={roleFilter}
            onChange={(e) => onRoleFilterChange(e.target.value as TRole | 'all')}
            options={[
              { value: 'all', label: 'Semua peran' },
              { value: 'owner', label: 'Owner' },
              { value: 'admin', label: 'Admin' },
              { value: 'barber', label: 'Barber' },
              { value: 'customer', label: 'Customer' },
            ]}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface overflow-hidden">
        {accounts.length === 0 ? (
          <EmptyState
            title="Akun tidak ditemukan"
            description="Tidak ada akun pengguna yang sesuai dengan kata kunci pencarian atau filter peran."
            actionText="Reset Filter"
            onAction={onResetFilters}
          />
        ) : (
          <DataTable className="border-0 rounded-none">
            <TableHead>
              <tr>
                <TableCell isHeader>Email / uuid singkat</TableCell>
                <TableCell isHeader>Peran</TableCell>
                <TableCell isHeader>Dibuat</TableCell>
                <TableCell isHeader>Diupdate</TableCell>
                <TableCell isHeader>Aksi</TableCell>
              </tr>
            </TableHead>
            <TableBody>
              {accounts.map((acc) => (
                <TableRow key={acc.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar
                        initials={acc.initials}
                        shape="rounded"
                        variant="surface"
                        size="md"
                      />
                      <div>
                        <p className="text-[14px] font-bold text-white">{acc.email}</p>
                        <p className="text-[12px] text-text-muted mt-0.5 font-mono">
                          uuid: {acc.uuid}
                        </p>
                        {acc.displayName && (
                          <p className="text-[12px] text-text-muted">{acc.displayName}</p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={acc.role}>{ROLE_LABELS[acc.role]}</Badge>
                  </TableCell>
                  <TableCell className="text-[14px] text-text-main">{acc.createdAt}</TableCell>
                  <TableCell className="text-[14px] text-text-main">{acc.updatedAt}</TableCell>
                  <TableCell>
                    {acc.isOwner ? (
                      <div className="flex items-center gap-2 text-[13px] text-text-muted">
                        <Shield className="w-3.5 h-3.5 shrink-0" />
                        <span>Akun utama • Dilindungi</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/accounts/form?id=${acc.slug}`}
                          className="text-[13px] font-bold text-secondary hover:brightness-125 transition-all cursor-pointer"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => onDeleteRequest(acc)}
                          className="text-[13px] font-bold text-danger hover:brightness-125 transition-all cursor-pointer"
                        >
                          Hapus
                        </button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </DataTable>
        )}

        <div className="px-6 py-4 border-t border-border flex items-center justify-between text-[13px]">
          <span className="text-text-muted">
            Menampilkan {accounts.length > 0 ? 1 : 0}–{accounts.length} dari {accounts.length} akun • UUID ditampilkan singkat
          </span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-1 text-text-muted hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="w-7 h-7 rounded-md bg-secondary/20 flex items-center justify-center text-secondary font-medium text-[13px]">
              1
            </div>
            <button
              type="button"
              className="p-1 text-text-muted hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
