import React from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
}) => {
  const posClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative inline-block group">
      {children}
      
      <div
        className={`
          absolute z-50 ${posClasses[position]}
          invisible opacity-0 translate-y-1 group-hover:translate-y-0 group-hover:visible group-hover:opacity-100
          transition-all duration-200 pointer-events-none
          whitespace-nowrap
        `}
      >
        <div className="bg-raised text-text-main text-[12px] font-medium py-1.5 px-3 rounded-md shadow-lg border border-border">
          {content}
        </div>
      </div>
    </div>
  );
};
