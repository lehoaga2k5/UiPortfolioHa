import { Link } from 'react-router';
import type { NavSection } from '../types/portfolio';
import { cx } from './GlassPrimitives';

interface NavItem {
  section: Exclude<NavSection, 'none'>;
  label: string;
  to: string;
}

const NAV_ITEMS: NavItem[] = [
  { section: 'home', label: 'Home', to: '/' },
  { section: 'work', label: 'Work', to: '/work' },
  { section: 'about', label: 'About', to: '/about' },
  { section: 'journal', label: 'Journal', to: '/journal' },
  { section: 'contact', label: 'Contact', to: '/contact' },
];

const focusRing =
  'focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_rgba(255,255,255,0.95),0_0_0_4px_rgba(250,54,116,0.85)]';

/** Pink glass pill used for the active destination (Figma 41:80). */
const activePill =
  'bg-[var(--color-glass-tint-pink)] border-[var(--color-glass-border-pink)] text-[#b8004c] font-semibold shadow-[0_8px_20px_-3px_rgba(18,18,23,0.08)]';

/**
 * Site header — Figma Desktop `41:74` (72px frosted bar, brand + glass pill nav)
 * and Mobile `287:1875` (compact bar, brand in a pill, 4-item glass nav).
 */
export function SiteHeader({ activeSection }: { activeSection: NavSection }) {
  const homeActive = activeSection === 'home';

  return (
    <header className="glass-header sticky top-0 z-50 w-full">
      <div className="mx-auto flex h-[64px] max-w-[1280px] items-center justify-between gap-2 px-3 min-[380px]:px-4 md:h-[72px] md:px-12">
        {/* Brand — Anh + pink mark. On mobile it doubles as the Home pill. */}
        <Link
          to="/"
          aria-label="Anh — home"
          aria-current={homeActive ? 'page' : undefined}
          className={cx(
            'inline-flex h-11 shrink-0 items-center gap-[5px] rounded-full border px-2.5 transition-colors duration-200 motion-reduce:transition-none md:border-transparent md:bg-transparent md:px-0 md:shadow-none',
            homeActive
              ? 'border-[var(--color-glass-border-pink)] bg-[var(--color-glass-tint-pink)]'
              : 'border-transparent',
            focusRing,
          )}
        >
          <span className="font-display text-[22px] leading-[26px] font-bold text-[#111111] md:text-[24px]">
            Anh
          </span>
          <img src="/assets/figma/166a0.svg" alt="" aria-hidden="true" className="size-[6px] md:size-[7px]" />
        </Link>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-0.5 rounded-full border border-[var(--color-glass-border-specular)] bg-[var(--color-glass-surface-subtle)] p-[3px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.78)] backdrop-blur-[12px] md:gap-[6px] md:p-0">
            {NAV_ITEMS.map((item) => {
              const isActive = item.section === activeSection;
              return (
                <li key={item.section} className={item.section === 'home' ? 'hidden md:block' : undefined}>
                  <Link
                    to={item.to}
                    aria-current={isActive ? 'page' : undefined}
                    className={cx(
                      'inline-flex h-11 min-w-11 items-center justify-center rounded-full border px-[7px] font-sans text-[12px] whitespace-nowrap transition-[background-color,color,border-color] duration-200 motion-reduce:transition-none min-[380px]:px-[9px] md:h-[38px] md:px-[15px] md:text-[14px]',
                      isActive
                        ? activePill
                        : 'border-transparent font-medium text-[#111111] hover:bg-white/70 md:font-normal',
                      focusRing,
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
