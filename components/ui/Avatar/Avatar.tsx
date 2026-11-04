import React from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';

interface AvatarProps {
  src?: string;
  name?: string;
  initials?: string;
  size?: number | 'sm' | 'md' | 'lg';
  shape?: 'circle' | 'rounded';
  variant?: 'primary' | 'surface';
  className?: string;
}

const SIZE_MAP: Record<'sm' | 'md' | 'lg', number> = {
  sm: 32,
  md: 40,
  lg: 48,
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name = '',
  initials: propInitials,
  size = 48,
  shape = 'circle',
  variant = 'primary',
  className = '',
}) => {
  const numericSize = typeof size === 'number' ? size : SIZE_MAP[size];

  const computedInitials =
    propInitials ||
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  const shapeClass = shape === 'rounded' ? 'rounded-xl' : 'rounded-full';
  const variantClass =
    variant === 'surface'
      ? 'bg-raised border border-border text-secondary'
      : 'bg-secondary text-primary';

  if (src) {
    return (
      <Image
        src={src}
        alt={name || computedInitials || 'Avatar'}
        width={numericSize}
        height={numericSize}
        className={`${shapeClass} object-cover shrink-0 ${className}`}
      />
    );
  }

  if (computedInitials) {
    return (
      <div
        className={`${shapeClass} ${variantClass} flex items-center justify-center font-bold shrink-0 ${className}`}
        style={{
          width: numericSize,
          height: numericSize,
          fontSize: Math.max(12, Math.round(numericSize * 0.32)),
        }}
      >
        {computedInitials}
      </div>
    );
  }

  return (
    <div
      className={`${shapeClass} bg-surface border border-border flex items-center justify-center text-text-muted shrink-0 ${className}`}
      style={{ width: numericSize, height: numericSize }}
    >
      <User style={{ width: numericSize * 0.5, height: numericSize * 0.5 }} />
    </div>
  );
};
