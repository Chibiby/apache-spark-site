// path: src/components/brand/Lockup.tsx
import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Mark } from './Mark';

export interface LockupProps {
  className?: string;
  markSize?: number;
  inverted?: boolean;
  href?: string;
}

export const Lockup: React.FC<LockupProps> = ({
  className,
  markSize = 26,
  inverted = false,
  href = '/',
}) => {
  const content = (
    <div
      className={cn(
        'inline-flex items-center gap-3 select-none min-w-[180px]',
        className
      )}
    >
      <Mark size={markSize} inverted={inverted} />
      <div className="flex items-center whitespace-nowrap font-sans tracking-[-0.015em] leading-none">
        <span
          className={cn(
            'text-[17px] font-normal mr-1.5',
            inverted ? 'text-[rgba(242,239,232,0.62)]' : 'text-[#7C7568]'
          )}
        >
          APACHE
        </span>
        <span
          className={cn(
            'text-[17px] font-bold',
            inverted ? 'text-[#F2EFE8]' : 'text-[#14181C]'
          )}
        >
          SPARK
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center group">
        {content}
      </Link>
    );
  }

  return content;
};
