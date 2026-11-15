import { NextResponse } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';
import type { SacramentMeeting } from '@/lib/types';

export async function GET(
  request: Request,
): Promise<NextResponse<SacramentMeeting[]>> {
  const date = new URL(request.url).searchParams.get('date') ?? undefined;
  return NextResponse.json(getMeetings(date));
}
