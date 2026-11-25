import { Link } from 'react-router';
import { useReducedMotion } from 'motion/react';
import { cx } from './GlassPrimitives';

const EMAIL = 'lezanh1611@gmail.com';

const PRIMARY_LINKS = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Journal', to: '/journal' },
  { label: 'Contact', to: '/contact' },
] as const;

const UTILITY_LINKS = [
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
  { label: '404 preview', to: '/404' },
] as const;

/** Mobile-only frosted capsule (Figma 253:1171 / 253:1177). */
const mobileCapsule =
  'max-md:rounded-full max-md:border max-md:border-[var(--color-glass-border-specular)] max-md:bg-[var(--color-glass-surface-strong)] max-md:backdrop-blur-[9px] max-md:shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.78),0_6px_16px_-2px_rgba(20,20,26,0.07)]';

const focusRing =
  'focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_rgba(255,255,255,0.95),0_0_0_4px_rgba(250,54,116,0.85)] rounded-full';

/**
 * Site footer — Figma Desktop `209:844` (two-row editorial footer on neutral)
 * and Mobile `253:1165` (frosted glass stack with email capsule, 44px targets).
 */
export function SiteFooter() {
  const reduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <footer className="relative border-t border-[#ded9d0] bg-[var(--color-glass-surface)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.78)] backdrop-blur-[12px] md:bg-[#f7f6f3] md:shadow-none md:backdrop-blur-none">
      <div className="mx-auto max-w-[1280px] px-[22px] pt-[18px] pb-6 md:px-12 md:py-0">
        {/* Row 1 — brand, navigation, email */}
        <div className="flex flex-col gap-2 md:h-[94px] md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="hidden h-11 items-center gap-3 md:flex">
            <Link to="/" aria-label="Anh — home" className={cx('inline-flex items-center gap-[5px]', focusRing)}>
              <span className="font-display text-[24px] leading-[28px] font-bold text-[#111111]">Anh</span>
              <img src="/assets/figma/166a0.svg" alt="" aria-hidden="true" className="size-[6px]" />
            </Link>
            <span className="font-sans text-[13px] leading-5 font-medium text-[#4a4844]">UI/UX Designer</span>
          </div>

          <div className="flex items-center justify-between gap-2 md:contents">
            <nav aria-label="Footer">
              <ul className="flex items-center md:gap-[13px]">
                {PRIMARY_LINKS.map((link) => (
                  <li key={link.to} className={link.to === '/about' || link.to === '/journal' ? 'hidden md:block' : undefined}>
                    <Link
                      to={link.to}
                      className={cx(
                        'inline-flex h-11 min-w-11 items-center justify-center px-2 font-sans text-[12px] font-semibold text-[#111111] transition-colors hover:text-[#b8004c] md:px-[10px] md:text-[14px] md:font-medium',
                        focusRing,
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <a
              href={`mailto:${EMAIL}`}
              className={cx(
                // Mobile: frosted email capsule. Desktop: underlined text link.
                'inline-flex h-11 min-w-11 items-center justify-center font-sans text-[12px] font-semibold text-[#111111] transition-colors hover:text-[#b8004c]',
                mobileCapsule,
                'max-md:px-3',
                'md:pl-[10px] md:text-[14px] md:font-medium md:underline md:underline-offset-[3px]',
                focusRing,
              )}
            >
              {EMAIL}
            </a>
          </div>
        </div>

        <div aria-hidden="true" className="my-2 h-px w-full bg-[#ded9d0] md:my-0" />

        {/* Row 2 — copyright, legal / preview links, back to top */}
        <div className="flex flex-col md:h-[70px] md:flex-row md:items-center md:justify-between">
          <div className="flex items-center md:gap-[29px]">
            <p className="hidden font-sans text-[13px] leading-5 font-medium text-[#4a4844] md:block">
              © 2026 Anh · UI/UX design portfolio
            </p>
            <ul className="flex items-center gap-[14px] md:gap-[10px]">
              {UTILITY_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={cx(
                      'inline-flex h-11 min-w-11 items-center justify-center pr-2 font-sans text-[12px] font-medium text-[#111111] transition-colors hover:text-[#b8004c] md:px-[10px] md:text-[13px]',
                      focusRing,
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className={cx(
              'inline-flex h-11 min-w-11 items-center justify-center self-end font-sans text-[12px] font-semibold text-[#111111] transition-colors hover:text-[#b8004c] md:self-auto md:pl-[10px] md:text-[14px] md:font-medium',
              mobileCapsule,
              'max-md:px-4',
              focusRing,
            )}
          >
            Back to top ↑
          </button>

          <p className="pt-2 font-sans text-[12px] font-medium text-[#68635c] md:hidden">
            © 2026 Anh · UI/UX design portfolio
          </p>
        </div>
      </div>
    </footer>
  );
}
