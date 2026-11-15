'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  label: string;
  exact?: boolean;
}

interface NavLinksProps {
  links: NavItem[];
  ariaLabel: string;
}

export default function NavLinks({ links, ariaLabel }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={ariaLabel}>
      <ul className="flex gap-4">
        {links.map(({ href, label, exact }) => {
          const isActive = exact
            ? pathname === href
            : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={
                  isActive
                    ? 'font-semibold underline underline-offset-4'
                    : 'hover:underline'
                }
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
