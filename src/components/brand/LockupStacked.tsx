// path: src/components/brand/LockupStacked.tsx
import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Mark } from './Mark';
import { BRAND_COPY } from '@/lib/constants';

export interface LockupStackedProps {
  className?: string;
  markSize?: number;
  inverted?: boolean;
  href?: string;
}

export const LockupStacked: React.FC<LockupStackedProps> = ({
  className,
  markSize = 64,
  inverted = false,
  href,
}) => {
  const content = (
    <div
      className={cn(
        'flex flex-col items-center text-center gap-3.5 select-none min-w-[140px]',
        className
      )}
    >
      <Mark size={markSize} inverted={inverted} />
      <div className="flex items-center justify-center whitespace-nowrap font-sans tracking-[-0.015em] leading-none">
        <span
          className={cn(
            'text-[24px] md:text-[28px] font-normal mr-2',
            inverted ? 'text-[rgba(242,239,232,0.62)]' : 'text-[#7C7568]'
          )}
        >
          APACHE
        </span>
        <span
          className={cn(
            'text-[24px] md:text-[28px] font-bold',
            inverted ? 'text-[#F2EFE8]' : 'text-[#14181C]'
          )}
        >
          SPARK
        </span>
      </div>

      <div
        className={cn(
          'w-full max-w-[280px] h-[2px]',
          inverted ? 'bg-[#C97A4A]' : 'bg-[#9E5430]'
        )}
      />

      <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[#7C7568]">
        {BRAND_COPY.descriptors.map((desc, i) => (
          <React.Fragment key={desc}>
            {i > 0 && (
              <span
                className={cn(
                  'inline-block w-[5px] h-[1px]',
                  inverted ? 'bg-[#C97A4A]' : 'bg-[#9E5430]'
                )}
              />
            )}
            <span className={inverted ? 'text-[rgba(242,239,232,0.62)]' : 'text-[#7C7568]'}>
              {desc}
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block group">
        {content}
      </Link>
    );
  }

  return content;
};
