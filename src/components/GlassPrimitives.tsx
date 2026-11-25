import type { ReactNode } from 'react';
import { Link } from 'react-router';
import type { GlassButtonState } from '../types/portfolio';

/** Tiny class joiner (no external deps). */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/* -------------------------------------------------------------------------- */
/*  GlassButton — Figma "Portfolio / Glass Button" (194:857)                  */
/* -------------------------------------------------------------------------- */

export type GlassButtonVariant = 'light' | 'dark' | 'pink' | 'lime';

export interface GlassButtonProps {
  children: ReactNode;
  variant?: GlassButtonVariant;
  /**
   * Force a visual state (used by specimens / state matrices).
   * When omitted the button reacts to real hover / press / keyboard focus.
   */
  state?: GlassButtonState;
  loading?: boolean;
  disabled?: boolean;
  /** Internal route → renders a react-router <Link>. */
  to?: string;
  /** External / mailto URL → renders an <a>. */
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  /** Trailing icon / glyph (e.g. "→"). */
  icon?: ReactNode;
  className?: string;
  /**
   * Font utilities. Kept separate from `className` so overrides never depend on
   * Tailwind's stylesheet order. Defaults to Figma 194:851 (Inter SemiBold 13/18).
   */
  typography?: string;
  /** Screen-reader text announced while loading. */
  loadingLabel?: string;
  /** Short explanation exposed when disabled (rendered as a tooltip + sr text). */
  disabledReason?: string;
  'aria-label'?: string;
}

const VARIANT_BASE: Record<GlassButtonVariant, string> = {
  light:
    'bg-[var(--color-glass-surface-strong)] border-[var(--color-glass-border-specular)] text-[#111111] ' +
    'shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.78),0_8px_20px_-3px_rgba(18,18,23,0.08)]',
  dark:
    'bg-[var(--color-glass-surface-dark)] border-[var(--color-glass-border-dark)] text-white ' +
    'shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.24),0_20px_44px_-8px_rgba(13,13,20,0.22)]',
  pink:
    'bg-[var(--color-glass-tint-pink)] border-[var(--color-glass-border-pink)] text-[#b8004c] ' +
    'shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.65),0_8px_20px_-3px_rgba(18,18,23,0.08)]',
  lime:
    'bg-[var(--color-glass-tint-lime)] border-[var(--color-glass-border-lime)] text-[#111111] ' +
    'shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.65),0_8px_20px_-3px_rgba(18,18,23,0.08)]',
};

/** Real-interaction (pseudo-class) affordances. */
const INTERACTIVE =
  'hover:-translate-y-px hover:shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.8),0_14px_28px_-6px_rgba(18,18,23,0.16)] ' +
  'active:translate-y-[2px] active:scale-[0.985] active:shadow-[inset_0_2px_4px_rgba(15,15,20,0.14),inset_0_-1px_1px_rgba(255,255,255,0.45)] ' +
  'focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_rgba(255,255,255,0.95),0_0_0_4px_rgba(250,54,116,0.85),0_8px_20px_-3px_rgba(18,18,23,0.08)]';

/** Forced (specimen) state styling — mirrors the pseudo-class rules above. */
const FORCED: Partial<Record<GlassButtonState, string>> = {
  Hover:
    '-translate-y-px !shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.8),0_14px_28px_-6px_rgba(18,18,23,0.16)]',
  Active:
    'translate-y-[2px] scale-[0.985] !bg-[var(--color-glass-tint-lime)] !border-[var(--color-glass-border-lime)] ' +
    '!shadow-[inset_0_2px_4px_rgba(15,15,20,0.14),inset_0_-1px_1px_rgba(255,255,255,0.45)]',
  Focus:
    '!border-2 !border-[var(--color-glass-border-pink)] !shadow-[0_0_0_2px_rgba(255,255,255,0.95),0_0_0_4px_rgba(250,54,116,0.85),0_8px_20px_0_rgba(18,18,23,0.08)]',
};

const DISABLED_STYLE =
  '!bg-[var(--color-glass-surface-subtle)] !border-dashed !border-[#ded9d0] !text-[#68635c] !shadow-none cursor-not-allowed';

/** Spinner from Figma asset 763c9.svg (pink arc over a 22% ink track). */
function GlassSpinner({ className }: { className?: string }) {
  return (
    <img
      src="/assets/figma/763c9.svg"
      alt=""
      aria-hidden="true"
      className={cx('size-[14px] animate-spin motion-reduce:animate-none', className)}
    />
  );
}

/**
 * Glass UI button with Default / Hover / Active / Focus / Loading / Disabled
 * states. Loading keeps the label in-flow (invisible) so the button never
 * changes size — Figma's "zero displacement" rule.
 */
export function GlassButton({
  children,
  variant = 'light',
  state,
  loading = false,
  disabled = false,
  to,
  href,
  onClick,
  type = 'button',
  icon,
  className,
  typography = 'font-sans text-[13px] font-semibold leading-[18px] tracking-[0.13px]',
  loadingLabel = 'Loading',
  disabledReason,
  'aria-label': ariaLabel,
}: GlassButtonProps) {
  const isLoading = loading || state === 'Loading';
  const isDisabled = disabled || state === 'Disabled';
  const inert = isLoading || isDisabled;

  const classes = cx(
    'group/glass relative inline-flex min-h-[44px] select-none items-center justify-center gap-2 rounded-full border px-[22px] py-3',
    'whitespace-nowrap',
    typography,
    'backdrop-blur-[18px] backdrop-saturate-[1.6] transition-[transform,box-shadow,background-color,border-color] duration-200 ease-out motion-reduce:transition-none',
    VARIANT_BASE[variant],
    !inert && !state && INTERACTIVE,
    state && FORCED[state],
    isDisabled && DISABLED_STYLE,
    isLoading && 'cursor-progress',
    className,
  );

  const content = (
    <>
      <span className={cx('inline-flex items-center gap-2', isLoading && 'invisible')}>
        <span>{children}</span>
        {icon ? (
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 group-hover/glass:translate-x-0.5 motion-reduce:transition-none"
          >
            {icon}
          </span>
        ) : null}
      </span>
      {isLoading ? (
        <span className="absolute inset-0 flex items-center justify-center">
          <GlassSpinner />
          <span className="sr-only">{loadingLabel}</span>
        </span>
      ) : null}
      {isDisabled && disabledReason ? <span className="sr-only">({disabledReason})</span> : null}
    </>
  );

  const shared = {
    className: classes,
    'aria-label': ariaLabel,
    'aria-busy': isLoading || undefined,
    'aria-disabled': inert || undefined,
    title: isDisabled ? disabledReason : undefined,
    'data-state': state ?? (isLoading ? 'Loading' : isDisabled ? 'Disabled' : 'Default'),
  } as const;

  if (to && !inert) {
    return (
      <Link to={to} onClick={onClick} {...shared}>
        {content}
      </Link>
    );
  }

  if (href && !inert) {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        onClick={onClick}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
        {...shared}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={inert ? undefined : onClick}
      // aria-disabled (not `disabled`) keeps the control focusable so the
      // tooltip / reason stays discoverable by keyboard users.
      {...shared}
    >
      {content}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  GlassCard                                                                  */
/* -------------------------------------------------------------------------- */

export type GlassCardVariant = 'default' | 'strong' | 'dark';

export interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: GlassCardVariant;
  as?: 'div' | 'article' | 'section' | 'aside' | 'li';
}

const CARD_CLASS: Record<GlassCardVariant, string> = {
  default: 'glass-card',
  strong: 'glass-card-strong',
  dark: 'glass-dark rounded-[var(--radius-glass-card)] text-white',
};

export function GlassCard({ children, className, variant = 'default', as = 'div' }: GlassCardProps) {
  const Tag = as;
  return <Tag className={cx('relative', CARD_CLASS[variant], className)}>{children}</Tag>;
}

/* -------------------------------------------------------------------------- */
/*  LegalSegmentSwitcher                                                       */
/* -------------------------------------------------------------------------- */

export interface LegalSegmentSwitcherProps {
  active: 'privacy' | 'terms';
  className?: string;
}

const LEGAL_SEGMENTS: Array<{ key: 'privacy' | 'terms'; label: string; to: string }> = [
  { key: 'privacy', label: 'Privacy', to: '/privacy' },
  { key: 'terms', label: 'Terms', to: '/terms' },
];

/** Segmented Glass UI pill bar linking /privacy and /terms. */
export function LegalSegmentSwitcher({ active, className }: LegalSegmentSwitcherProps) {
  return (
    <nav aria-label="Legal pages" className={cx('glass-pill inline-flex items-center gap-1 p-1', className)}>
      {LEGAL_SEGMENTS.map((segment) => {
        const isActive = segment.key === active;
        return (
          <Link
            key={segment.key}
            to={segment.to}
            aria-current={isActive ? 'page' : undefined}
            className={cx(
              'inline-flex min-h-[44px] min-w-[88px] items-center justify-center rounded-full px-5 font-sans text-[14px] transition-colors duration-200 motion-reduce:transition-none',
              'focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_rgba(255,255,255,0.95),0_0_0_4px_rgba(250,54,116,0.85)]',
              isActive
                ? 'glass-pill-pink font-semibold text-[#b8004c]'
                : 'border border-transparent font-medium text-[#111111] hover:bg-white/60',
            )}
          >
            {segment.label}
          </Link>
        );
      })}
    </nav>
  );
}
