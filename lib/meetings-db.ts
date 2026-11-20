import { neon } from '@neondatabase/serverless';
import type {
  Hymn,
  MeetingType,
  SacramentMeeting,
  SpeakerItem,
  WardBusinessItem,
} from './types';

export const PAGE_SIZE = 5;

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

interface MeetingRow {
  id: number;
  date: string;
  meeting_type: MeetingType;
  presiding: string;
  conducting: string;
  announcements: string[] | null;
  opening_hymn: Hymn;
  opening_prayer: string;
  ward_business: WardBusinessItem[] | null;
  stake_business: boolean;
  sacrament_hymn: Hymn;
  speakers: SpeakerItem[] | null;
  closing_hymn: Hymn;
  closing_prayer: string;
}

function getSql() {
  const url =
    process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? process.env.STORAGE_URL;
  if (!url) {
    throw new Error('Database connection string is not set');
  }
  return neon(url);
}

function toMeeting(row: MeetingRow): SacramentMeeting {
  return {
    id: row.id,
    date: row.date,
    meetingType: row.meeting_type,
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: row.announcements ?? [],
    openingHymn: row.opening_hymn,
    openingPrayer: row.opening_prayer,
    wardBusiness: row.ward_business ?? [],
    stakeBusiness: row.stake_business,
    sacramentHymn: row.sacrament_hymn,
    speakers: row.speakers ?? [],
    closingHymn: row.closing_hymn,
    closingPrayer: row.closing_prayer,
  };
}

export async function getMeetings(
  date?: string,
  query = '',
  page?: number,
): Promise<SacramentMeeting[]> {
  if (date && !DATE_PATTERN.test(date)) {
    return [];
  }
  const sql = getSql();
  const dateFilter = date ?? '';
  const term = query.trim();
  const limit = page ? PAGE_SIZE : 1000;
  const offset = page ? (page - 1) * PAGE_SIZE : 0;

  const rows = (await sql`
    SELECT id, to_char(date, 'YYYY-MM-DD') AS date, meeting_type, presiding,
           conducting, announcements, opening_hymn, opening_prayer, ward_business,
           stake_business, sacrament_hymn, speakers, closing_hymn, closing_prayer
    FROM meetings
    WHERE (${term}::text = ''
           OR presiding ILIKE '%' || ${term}::text || '%'
           OR conducting ILIKE '%' || ${term}::text || '%'
           OR meeting_type ILIKE '%' || ${term}::text || '%'
           OR speakers::text ILIKE '%' || ${term}::text || '%')
      AND (${dateFilter}::text = ''
           OR date = NULLIF(${dateFilter}::text, '')::date)
    ORDER BY meetings.date DESC
    LIMIT ${limit} OFFSET ${offset}
  `) as unknown as MeetingRow[];

  return rows.map(toMeeting);
}

export async function getMeetingsTotalPages(query = ''): Promise<number> {
  const sql = getSql();
  const term = query.trim();

  const rows = (await sql`
    SELECT COUNT(*)::int AS count
    FROM meetings
    WHERE (${term}::text = ''
           OR presiding ILIKE '%' || ${term}::text || '%'
           OR conducting ILIKE '%' || ${term}::text || '%'
           OR meeting_type ILIKE '%' || ${term}::text || '%'
           OR speakers::text ILIKE '%' || ${term}::text || '%')
  `) as unknown as { count: number }[];

  return Math.max(1, Math.ceil((rows[0]?.count ?? 0) / PAGE_SIZE));
}

export async function getMeetingById(
  id: number,
): Promise<SacramentMeeting | undefined> {
  if (!Number.isInteger(id) || id < 1 || id > 2147483647) {
    return undefined;
  }
  const sql = getSql();

  const rows = (await sql`
    SELECT id, to_char(date, 'YYYY-MM-DD') AS date, meeting_type, presiding,
           conducting, announcements, opening_hymn, opening_prayer, ward_business,
           stake_business, sacrament_hymn, speakers, closing_hymn, closing_prayer
    FROM meetings
    WHERE id = ${id}
  `) as unknown as MeetingRow[];

  return rows[0] ? toMeeting(rows[0]) : undefined;
}

// Stubs: these are wired to the database in Week 04 when the forms are built.
export async function addMeeting(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _meeting: Omit<SacramentMeeting, 'id'>,
): Promise<SacramentMeeting> {
  throw new Error('addMeeting is not implemented until Week 04');
}

export async function updateMeeting(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _id: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _meeting: Partial<Omit<SacramentMeeting, 'id'>>,
): Promise<SacramentMeeting | undefined> {
  throw new Error('updateMeeting is not implemented until Week 04');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function deleteMeeting(_id: number): Promise<boolean> {
  throw new Error('deleteMeeting is not implemented until Week 04');
}
