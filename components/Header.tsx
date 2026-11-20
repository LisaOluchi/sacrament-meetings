import { Suspense } from 'react';
import NavLinks from './NavLinks';
import CurrentDate from './CurrentDate';

const WARD_NAME = 'Benmore Gardens Ward';

export default function Header() {
  return (
    <header className="bg-blue-900 text-white print:hidden">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-4">
        <div>
          <p className="text-xl font-bold">{WARD_NAME}</p>
          <CurrentDate />
        </div>
        <Suspense fallback={null}>
          <NavLinks
            ariaLabel="Main"
            links={[
              { href: '/', label: 'Home', exact: true },
              { href: '/meetings', label: 'Meetings' },
            ]}
          />
        </Suspense>
      </div>
    </header>
  );
}
