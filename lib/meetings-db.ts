import type { Hymn, SacramentMeeting } from './types';

const spiritOfGod: Hymn = { number: 2, title: 'The Spirit of God' };
const comeComeYeSaints: Hymn = { number: 30, title: 'Come, Come, Ye Saints' };
const howFirm: Hymn = { number: 85, title: 'How Firm a Foundation' };
const asNowWeTake: Hymn = { number: 169, title: 'As Now We Take the Sacrament' };
const inHumility: Hymn = { number: 172, title: 'In Humility, Our Savior' };
const iStandAmazed: Hymn = { number: 193, title: 'I Stand All Amazed' };
const redeemerLives: Hymn = { number: 136, title: 'I Know That My Redeemer Lives' };
const calledToServe: Hymn = { number: 249, title: 'Called to Serve' };

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-11-15',
    meetingType: 'regular',
    presiding: 'Bishop Johnson',
    conducting: 'Brother Adams',
    announcements: ['Choir practice is Thursday at 7:00 p.m.', 'Food drive donations are due next Sunday.'],
    openingHymn: spiritOfGod,
    openingPrayer: 'Sister Clark',
    wardBusiness: [{ description: 'Release and sustain a new Primary pianist.' }],
    stakeBusiness: false,
    sacramentHymn: asNowWeTake,
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Primary Children', topic: 'Musical number', type: 'musical-number' },
      { name: 'Brother Lee', topic: 'Serving others', type: 'speaker' },
    ],
    closingHymn: comeComeYeSaints,
    closingPrayer: 'Brother Evans',
  },
  {
    id: 2,
    date: '2026-11-08',
    meetingType: 'regular',
    presiding: 'Bishop Johnson',
    conducting: 'Brother Adams',
    announcements: ['Service project this Saturday at 9:00 a.m.'],
    openingHymn: howFirm,
    openingPrayer: 'Brother Moore',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: inHumility,
    speakers: [
      { name: 'Sister Taylor', topic: 'Gratitude', type: 'speaker' },
      { name: 'Brother Scott', topic: 'The Book of Mormon', type: 'speaker' },
    ],
    closingHymn: calledToServe,
    closingPrayer: 'Sister Hall',
  },
  {
    id: 3,
    date: '2026-11-01',
    meetingType: 'testimony',
    presiding: 'Bishop Johnson',
    conducting: 'Brother Adams',
    openingHymn: iStandAmazed,
    openingPrayer: 'Sister Young',
    wardBusiness: [{ description: 'Sustain newly called Sunday School teachers.' }],
    stakeBusiness: false,
    sacramentHymn: asNowWeTake,
    speakers: [],
    closingHymn: redeemerLives,
    closingPrayer: 'Brother King',
  },
  {
    id: 4,
    date: '2026-10-25',
    meetingType: 'regular',
    presiding: 'Bishop Johnson',
    conducting: 'Brother Wright',
    announcements: ['Ward temple trip next month. See the sign-up sheet.'],
    openingHymn: spiritOfGod,
    openingPrayer: 'Brother Baker',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: inHumility,
    speakers: [
      { name: 'Sister Green', topic: 'Hope', type: 'speaker' },
      { name: 'Youth Choir', topic: 'Musical number', type: 'musical-number' },
      { name: 'Brother Hill', topic: 'Family history', type: 'speaker' },
    ],
    closingHymn: howFirm,
    closingPrayer: 'Sister Adams',
  },
  {
    id: 5,
    date: '2026-10-18',
    meetingType: 'stake',
    presiding: 'President Nelson',
    conducting: 'President Carter',
    openingHymn: comeComeYeSaints,
    openingPrayer: 'Sister Reed',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: asNowWeTake,
    speakers: [{ name: 'President Carter', topic: 'Stake conference message', type: 'speaker' }],
    closingHymn: calledToServe,
    closingPrayer: 'Brother Ward',
  },
  {
    id: 6,
    date: '2026-10-04',
    meetingType: 'general',
    presiding: 'Bishop Johnson',
    conducting: 'Brother Adams',
    openingHymn: redeemerLives,
    openingPrayer: 'Sister Lewis',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: inHumility,
    speakers: [],
    closingHymn: iStandAmazed,
    closingPrayer: 'Brother Cole',
  },
];

export function getMeetings(date?: string): SacramentMeeting[] {
  const sorted = [...meetings].sort((a, b) => b.date.localeCompare(a.date));
  if (date) {
    return sorted.filter((meeting) => meeting.date === date);
  }
  return sorted;
}

export function getMeetingById(id: number): SacramentMeeting | undefined {
  return meetings.find((meeting) => meeting.id === id);
}
