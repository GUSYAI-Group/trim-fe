import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={`bg-raised rounded-lg animate-pulse ${className}`}
    />
  );
};

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
      <Skeleton className="w-full h-45 rounded-lg" />
      <Skeleton className="w-3/4 h-4" />
      <Skeleton className="w-1/2 h-3" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="w-1/3 h-5" />
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
    </div>
  );
};

export const SkeletonTable: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 items-center">
          <Skeleton className="w-10 h-5" />
          <Skeleton className="w-1/4 h-5" />
          <Skeleton className="w-1/3 h-5" />
          <Skeleton className="flex-1 h-5" />
          <Skeleton className="w-20 h-5" />
        </div>
      ))}
    </div>
  );
};
