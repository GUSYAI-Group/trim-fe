'use client';

import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui';

export function LiveHeader() {
  const [timeString, setTimeString] = useState<string>('');
  const [dateString, setDateString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTimeString(`${hours}:${minutes}:${seconds} WIB`);

      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      };
      setDateString(now.toLocaleDateString('id-ID', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2.5">
      <Badge variant="aktif">
        Live • {timeString || '14:30:00 WIB'}
      </Badge>

      <span className="text-[11px] md:text-xs text-text-muted font-medium">
        {dateString || 'Selasa, 6 Oktober 2026'}
      </span>
    </div>
  );
}

