import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import PrintButton from '@/components/PrintButton';
import { apiFetch } from '@/lib/api';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;
  const meeting = await apiFetch<SacramentMeeting>(`/api/meetings/${id}`);

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
