import React from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';

interface AvatarProps {
  src?: string;
  name: string;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ src, name, size = 48 }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover"
      />
    );
  }

  if (initials) {
    return (
      <div
        className="rounded-full bg-secondary flex items-center justify-center font-bold text-primary"
        style={{ width: size, height: size, fontSize: size * 0.35 }}
      >
        {initials}
      </div>
    );
  }

  return (
    <div
      className="rounded-full bg-surface flex items-center justify-center text-text-muted"
      style={{ width: size, height: size }}
    >
      <User style={{ width: size * 0.5, height: size * 0.5 }} />
    </div>
  );
};
