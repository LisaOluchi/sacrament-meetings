import type { SacramentMeeting } from '@/lib/types';
import { formatMeetingDate, meetingTypeLabel } from '@/lib/format';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const hasSacrament =
    meeting.meetingType === 'regular' || meeting.meetingType === 'testimony';

  return (
    <article className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Sacrament Meeting Program</h1>
        <p className="text-lg">
          <time dateTime={meeting.date}>{formatMeetingDate(meeting.date)}</time>
        </p>
        <p className="text-gray-600">{meetingTypeLabel(meeting.meetingType)}</p>
      </header>

      <section aria-labelledby="leaders">
        <h2 id="leaders" className="text-xl font-semibold">Leaders</h2>
        <p>Presiding: {meeting.presiding}</p>
        <p>Conducting: {meeting.conducting}</p>
      </section>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <section aria-labelledby="announcements">
          <h2 id="announcements" className="text-xl font-semibold">Announcements</h2>
          <ul className="list-disc pl-6">
            {meeting.announcements.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="opening">
        <h2 id="opening" className="text-xl font-semibold">Opening</h2>
        <p>Hymn {meeting.openingHymn.number}: {meeting.openingHymn.title}</p>
        <p>Prayer: {meeting.openingPrayer}</p>
      </section>

      <section aria-labelledby="business">
        <h2 id="business" className="text-xl font-semibold">Business</h2>
        {meeting.wardBusiness.length > 0 ? (
          <ul className="list-disc pl-6">
            {meeting.wardBusiness.map((item) => (
              <li key={item.description}>{item.description}</li>
            ))}
          </ul>
        ) : (
          <p>No ward business.</p>
        )}
        <p>Stake business: {meeting.stakeBusiness ? 'Yes' : 'No'}</p>
      </section>

      {hasSacrament && (
        <section aria-labelledby="sacrament">
          <h2 id="sacrament" className="text-xl font-semibold">Sacrament</h2>
          <p>Hymn {meeting.sacramentHymn.number}: {meeting.sacramentHymn.title}</p>
        </section>
      )}

      <section aria-labelledby="program">
        <h2 id="program" className="text-xl font-semibold">Speakers and Music</h2>
        {meeting.speakers.length > 0 ? (
          <ul className="list-disc pl-6">
            {meeting.speakers.map((item) => (
              <li key={`${item.type}-${item.name}`}>
                {item.type === 'musical-number' ? 'Musical number' : 'Speaker'}:{' '}
                {item.name} ({item.topic})
              </li>
            ))}
          </ul>
        ) : (
          <p>Open testimonies.</p>
        )}
      </section>

      <section aria-labelledby="closing">
        <h2 id="closing" className="text-xl font-semibold">Closing</h2>
        <p>Hymn {meeting.closingHymn.number}: {meeting.closingHymn.title}</p>
        <p>Prayer: {meeting.closingPrayer}</p>
      </section>
    </article>
  );
}
