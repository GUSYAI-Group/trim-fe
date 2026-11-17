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

export function TableRow({
  children,
  className = '',
  isSelected = false,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  isSelected?: boolean;
  onClick?: () => void;
}) {
  return (
    <tr
      onClick={onClick}
      className={`border-b border-border last:border-b-0 transition-colors duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isSelected ? 'bg-secondary/5' : 'hover:bg-raised/70'
      } ${className}`}
    >
      {children}
    </tr>
  );
}

export function TableHead({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const isRowWrapper =
    React.isValidElement(children) && children.type === 'tr';

  if (isRowWrapper) {
    return (
      <thead className={`bg-raised/80 border-b border-border ${className}`}>
        {children}
      </thead>
    );
  }

  return (
    <th className={`py-4 px-4 text-[12px] font-medium text-text-muted whitespace-nowrap font-outfit ${className}`}>
      {children}
    </th>
  );
}

export function TableCell({
  children,
  className = '',
  colSpan,
  isHeader = false,
}: {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
  isHeader?: boolean;
}) {
  if (isHeader) {
    return (
      <th
        colSpan={colSpan}
        className={`py-4 px-4 text-[12px] font-medium text-text-muted whitespace-nowrap font-outfit ${className}`}
      >
        {children}
      </th>
    );
  }

  return (
    <td colSpan={colSpan} className={`py-4 px-4 text-[14px] text-text-main font-outfit ${className}`}>
      {children}
    </td>
  );
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

export interface DataTablePagination {
  text: string;
  currentPage: number;
  onPrev?: () => void;
  onNext?: () => void;
}

interface DataTableProps {
  columns?: React.ReactNode;
  children: React.ReactNode;
  pagination?: DataTablePagination;
  className?: string;
}

export function DataTable({ columns, children, pagination, className = '' }: DataTableProps) {
  return (
    <Card padding="none" className={`border-border bg-surface overflow-hidden ${className}`}>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {columns ? (
            <>
              <thead className="border-b border-border">
                <tr className="bg-raised/80 border-0">
                  {columns}
                </tr>
              </thead>
              <tbody>
                {children}
              </tbody>
            </>
          ) : (
            children
          )}
        </table>
      </div>
      {pagination && (
        <div className="p-4 md:px-6 border-t border-border flex items-center justify-between text-[13px]">
          <span className="text-text-muted font-outfit">{pagination.text}</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={pagination.onPrev}
              disabled={!pagination.onPrev}
              className="p-1 text-text-muted hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-all active:scale-90 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="w-7 h-7 rounded-md bg-[#612c12] flex items-center justify-center text-secondary font-medium font-outfit select-none">
              {pagination.currentPage}
            </div>
            <button
              type="button"
              onClick={pagination.onNext}
              disabled={!pagination.onNext}
              className="p-1 text-text-muted hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-all active:scale-90 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}
