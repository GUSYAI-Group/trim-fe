import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '../Card/Card';

export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return <thead className="border-b border-border">{children}</thead>;
}

export function TableRow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <tr className={`border-b border-border hover:bg-raised/30 transition-colors ${className}`}>{children}</tr>;
}

export function TableHead({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <th className={`py-4 px-4 text-[12px] font-medium text-text-muted whitespace-nowrap ${className}`}>{children}</th>;
}

export function TableCell({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <td className={`py-4 px-4 text-[14px] text-text-main ${className}`}>{children}</td>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

interface DataTablePagination {
  text: string;
  currentPage: number;
  onPrev?: () => void;
  onNext?: () => void;
}

interface DataTableProps {
  columns: React.ReactNode;
  children: React.ReactNode;
  pagination?: DataTablePagination;
}

export function DataTable({ columns, children, pagination }: DataTableProps) {
  return (
    <Card className="border-border bg-surface overflow-hidden p-0!">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="border-b border-border">
            <tr className="bg-[#222225] border-0">
              {columns}
            </tr>
          </thead>
          <tbody>
            {children}
          </tbody>
        </table>
      </div>
      {pagination && (
        <div className="p-4 md:px-6 border-t border-border flex items-center justify-between text-[13px]">
          <span className="text-text-muted font-outfit">{pagination.text}</span>
          <div className="flex items-center gap-4">
            <button onClick={pagination.onPrev} className="p-1 text-text-muted hover:text-white transition-colors"><ChevronLeft className="w-4 h-4" /></button>
            <div className="w-7 h-7 rounded-md bg-[#612c12] flex items-center justify-center text-secondary font-medium font-outfit">{pagination.currentPage}</div>
            <button onClick={pagination.onNext} className="p-1 text-text-muted hover:text-white transition-colors"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      )}
    </Card>
  );
}
