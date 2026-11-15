import MeetingCard from '@/components/MeetingCard';
import { apiFetch } from '@/lib/api';
import type { SacramentMeeting } from '@/lib/types';

export default async function MeetingsPage() {
  const meetings = await apiFetch<SacramentMeeting[]>('/api/meetings');

  if (!meetings) {
    return <p>Meetings could not be loaded.</p>;
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">All meetings</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
}
