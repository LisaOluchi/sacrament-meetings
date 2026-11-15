import type { MeetingType } from './types';

export function formatMeetingDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const TYPE_LABELS: Record<MeetingType, string> = {
  regular: 'Regular meeting',
  testimony: 'Fast and testimony meeting',
  stake: 'Stake meeting (no sacrament)',
  general: 'General meeting (no sacrament)',
};

export function meetingTypeLabel(type: MeetingType): string {
  return TYPE_LABELS[type];
}
