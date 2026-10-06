import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center text-text-muted mb-6">
        {icon}
      </div>
      <h3 className="text-[16px] font-bold text-text-main mb-2">{title}</h3>
      <p className="text-[14px] text-text-muted max-w-[320px] mb-6">{description}</p>
      {action}
    </div>
  );
};
