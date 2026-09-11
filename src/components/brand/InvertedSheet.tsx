// path: src/components/brand/InvertedSheet.tsx
import React from 'react';
import { cn } from '@/lib/utils';

export interface InvertedSheetProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'footer';
  children: React.ReactNode;
  className?: string;
}

export const InvertedSheet: React.FC<InvertedSheetProps> = ({
  as: Component = 'section',
  children,
  className,
  ...props
}) => {
  return (
    <Component
      data-sheet="inverted"
      className={cn(
        'relative w-full bg-[#14181C] text-[#F2EFE8] transition-colors duration-200 border-t border-b border-[rgba(242,239,232,0.16)]',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
