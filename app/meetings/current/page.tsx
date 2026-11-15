import { connection } from 'next/server';
import { redirect } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import type { SacramentMeeting } from '@/lib/types';

function mostRecentSunday(): string {
  const date = new Date();
  date.setDate(date.getDate() - date.getDay());
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default async function CurrentMeetingPage() {
  await connection();
  const sunday = mostRecentSunday();
  const meetings = await apiFetch<SacramentMeeting[]>('/api/meetings');
  const current = meetings?.find((meeting) => meeting.date <= sunday);

  redirect(current ? `/meetings/${current.id}` : '/meetings');
}
