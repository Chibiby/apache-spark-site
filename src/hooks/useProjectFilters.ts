// path: src/hooks/useProjectFilters.ts
'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useTransition } from 'react';
import type { Discipline, Sector } from '@/types';

export interface ProjectFiltersState {
  discipline: Discipline | 'ALL';
  sector: Sector | 'ALL';
  year: number | 'ALL';
  search: string;
  sort: 'newest' | 'oldest' | 'az';
  view: 'grid' | 'list';
}

export function useProjectFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const discipline = (searchParams.get('discipline') as Discipline) || 'ALL';
  const sector = (searchParams.get('sector') as Sector) || 'ALL';
  const yearParam = searchParams.get('year');
  const year = yearParam && !isNaN(Number(yearParam)) ? Number(yearParam) : 'ALL';
  const search = searchParams.get('q') || '';
  const sort = (searchParams.get('sort') as 'newest' | 'oldest' | 'az') || 'newest';
  const view = (searchParams.get('view') as 'grid' | 'list') || 'grid';

  const updateParam = useCallback(
    (key: string, value: string | number | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null || value === '' || value === 'ALL') {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [pathname, router, searchParams]
  );

  const resetFilters = useCallback(() => {
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  }, [pathname, router]);

  return {
    state: { discipline, sector, year, search, sort, view } as ProjectFiltersState,
    setDiscipline: (val: Discipline | 'ALL') => updateParam('discipline', val),
    setSector: (val: Sector | 'ALL') => updateParam('sector', val),
    setYear: (val: number | 'ALL') => updateParam('year', val),
    setSearch: (val: string) => updateParam('q', val),
    setSort: (val: 'newest' | 'oldest' | 'az') => updateParam('sort', val),
    setView: (val: 'grid' | 'list') => updateParam('view', val),
    resetFilters,
  };
}
