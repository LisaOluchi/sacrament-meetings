import { Suspense } from 'react';
import MeetingCard from '@/components/MeetingCard';
import MeetingSearch from '@/components/MeetingSearch';
import Pagination from '@/components/Pagination';
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';

interface MeetingsPageProps {
  searchParams: Promise<{ query?: string; page?: string }>;
}

async function MeetingResults({ searchParams }: MeetingsPageProps) {
  const { query = '', page = '1' } = await searchParams;
  const currentPage = Math.max(1, Number.parseInt(page, 10) || 1);

  const [meetings, totalPages] = await Promise.all([
    getMeetings(undefined, query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <>
      {meetings.length === 0 ? (
        <p>No meetings found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}
      <Pagination totalPages={totalPages} />
    </>
  );
}

export default function MeetingsPage({ searchParams }: MeetingsPageProps) {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">All meetings</h1>
      <Suspense fallback={null}>
        <MeetingSearch />
      </Suspense>
      <Suspense
        fallback={
          <p role="status" className="text-gray-600">
            Loading meetings...
          </p>
        }
      >
        <MeetingResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
