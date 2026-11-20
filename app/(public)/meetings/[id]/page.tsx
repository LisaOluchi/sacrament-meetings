import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import PrintButton from '@/components/PrintButton';
import { getMeetingById } from '@/lib/meetings-db';

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

async function MeetingContent({ params }: MeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId)) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);
  if (!meeting) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PrintButton />
      <MeetingDetail meeting={meeting} />
    </div>
  );
}

export default function MeetingPage({ params }: MeetingPageProps) {
  return (
    <Suspense
      fallback={
        <p role="status" className="text-gray-600">
          Loading meeting...
        </p>
      }
    >
      <MeetingContent params={params} />
    </Suspense>
  );
}
