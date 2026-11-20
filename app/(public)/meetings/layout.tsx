import { Suspense } from 'react';
import NavLinks from '@/components/NavLinks';

export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-6 border-b border-gray-300 pb-3 print:hidden">
        <Suspense fallback={null}>
          <NavLinks
            ariaLabel="Meetings section"
            links={[
              { href: '/meetings', label: 'All meetings', exact: true },
              { href: '/meetings/current', label: 'This Sunday', exact: true },
            ]}
          />
        </Suspense>
      </div>
      {children}
    </section>
  );
}
