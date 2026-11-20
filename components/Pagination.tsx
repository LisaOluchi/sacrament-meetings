'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Math.max(1, Number(searchParams.get('page')) || 1);

  if (totalPages <= 1 && currentPage === 1) {
    return null;
  }

  const pageUrl = (page: number): string => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  };

  const linkClass =
    'rounded border border-blue-900 px-4 py-2 text-blue-900 hover:bg-blue-50';
  const disabledClass =
    'rounded border border-gray-300 px-4 py-2 text-gray-500';

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-center gap-4 print:hidden"
    >
      {currentPage > 1 ? (
        <Link href={pageUrl(currentPage - 1)} className={linkClass}>
          Previous
        </Link>
      ) : (
        <span aria-disabled="true" className={disabledClass}>
          Previous
        </span>
      )}
      <span aria-current="page" className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages ? (
        <Link href={pageUrl(currentPage + 1)} className={linkClass}>
          Next
        </Link>
      ) : (
        <span aria-disabled="true" className={disabledClass}>
          Next
        </span>
      )}
    </nav>
  );
}
