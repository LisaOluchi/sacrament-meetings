import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';
import { formatMeetingDate, meetingTypeLabel } from '@/lib/format';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const speakerCount = meeting.speakers.filter((item) => item.type === 'speaker').length;

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold">
        <Link href={`/meetings/${meeting.id}`} className="hover:underline">
          <time dateTime={meeting.date}>{formatMeetingDate(meeting.date)}</time>
        </Link>
      </h2>
      <p className="text-sm text-gray-600">{meetingTypeLabel(meeting.meetingType)}</p>
      <p className="mt-2 text-sm">Conducting: {meeting.conducting}</p>
      <p className="text-sm">Speakers: {speakerCount}</p>
    </article>
  );
}
