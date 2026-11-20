'use client';

import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    router.push(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="mb-6 print:hidden">
      <label htmlFor="meeting-search" className="sr-only">
        Search meetings by name, speaker or meeting type
      </label>
      <input
        id="meeting-search"
        type="search"
        aria-label="Search meetings"
        placeholder="Search by name, speaker or type"
        defaultValue={searchParams.get('query') ?? ''}
        onChange={(event) => handleSearch(event.target.value)}
        className="w-full rounded border border-gray-400 px-3 py-2 md:max-w-md"
      />
    </div>
  );
}
