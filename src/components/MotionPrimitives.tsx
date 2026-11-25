import type { CSSProperties, ElementType, ReactNode } from 'react';
import { motion, useReducedMotion, type Easing, type Transition } from 'motion/react';

/* -------------------------------------------------------------------------- */
/*  Shared Figma motion tokens (from design-specs/motion-home.json)           */
/* -------------------------------------------------------------------------- */

/** Every Home timeline cohort in Figma loops on a single 3.65s clock. */
export const FIGMA_LOOP_SECONDS = 3.65;

/** Figma "smart animate" ease-in-out cubic. */
export const EASE_IN_OUT_FIGMA: [number, number, number, number] = [0.5, 0, 0.5, 1];
/** Figma "gentle" expo-out used by cover zooms and the portrait tilt. */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
/** Figma "quick" ease-out used by project cover zoom. */
export const EASE_OUT_QUINT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Damped spring exported by Figma for the portrait `z` / availability pulse. */
export const springBounce: Easing = (t: number) =>
  1 - Math.exp(-t * 7.591) * (Math.cos(t * 7.7443) + 0.9802 * Math.sin(t * 7.7443));

/** Damped spring exported by Figma for the Learning cards lift (1:379…1:418). */
export const springLift: Easing = (t: number) =>
  1 - Math.exp(-t * 7.5639) * (Math.cos(t * 8.1558) + 0.9274 * Math.sin(t * 8.1558));

/** Damped spring exported by Figma for the Learning number overlay (1:394). */
export const springPop: Easing = (t: number) =>
  1 - Math.exp(-t * 7.4137) * (Math.cos(t * 11.2576) + 0.6586 * Math.sin(t * 11.2576));

/** Helper: an infinitely repeating transition on the shared Figma clock. */
export function loopTransition(
  times: number[],
  ease: Transition['ease'] = 'easeInOut',
  duration: number = FIGMA_LOOP_SECONDS,
): Transition {
  return { duration, times, ease, repeat: Infinity };
}

/* -------------------------------------------------------------------------- */
/*  StaggeredText                                                             */
/* -------------------------------------------------------------------------- */

type StaggerTag = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'div';

export interface StaggeredTextProps {
  text: string;
  /** Split into words (default) or individual characters. */
  mode?: 'word' | 'char';
  className?: string;
  /** Rendered wrapper element. */
  as?: StaggerTag;
  /** Delay before the first token starts (seconds). */
  delay?: number;
  /** Delay between tokens (seconds). Defaults to 0.07 (word) / 0.025 (char). */
  stagger?: number;
  /** Optional id, e.g. for aria-labelledby. */
  id?: string;
  style?: CSSProperties;
}

/**
 * Figma blur + y + opacity staggered entrance.
 * The full sentence is exposed once to assistive tech (sr-only), while the
 * animated tokens are aria-hidden so screen readers never spell out fragments.
 */
export function StaggeredText({
  text,
  mode = 'word',
  className,
  as = 'span',
  delay = 0,
  stagger,
  id,
  style,
}: StaggeredTextProps) {
  const reduceMotion = useReducedMotion();
  const Tag = as as ElementType;
  const step = stagger ?? (mode === 'word' ? 0.04 : 0.018);
  const tokens = mode === 'word' ? text.split(/(\s+)/) : Array.from(text);

  let animatedIndex = 0;

  return (
    <Tag id={id} className={className} style={style}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {tokens.map((token, index) => {
          if (/^\s+$/.test(token)) {
            return <span key={`s-${index}`}>{token}</span>;
          }
          const order = animatedIndex++;
          return (
            <motion.span
              key={`t-${index}`}
              className="inline-block whitespace-pre will-change-transform"
              initial={reduceMotion ? false : { opacity: 0, y: '0.28em', filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.36,
                delay: delay + order * step,
                ease: EASE_OUT_EXPO,
              }}
            >
              {token}
            </motion.span>
          );
        })}
      </span>
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */
/*  Reveal — scroll-triggered fade/blur-up for section blocks                 */
/* -------------------------------------------------------------------------- */

export interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical offset in px before reveal. */
  y?: number;
  as?: 'div' | 'section' | 'article' | 'li' | 'header';
}

export function Reveal({ children, className, delay = 0, y = 16, as = 'div' }: RevealProps) {
  const reduceMotion = useReducedMotion();
  // All allowed tags share the same motion props surface; narrow to one signature.
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.02 }}
      transition={{ duration: 0.38, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </MotionTag>
  );
}

/* -------------------------------------------------------------------------- */
/*  AuroraBackdrop                                                            */
/* -------------------------------------------------------------------------- */

export type AuroraVariant = 'hero' | 'soft' | 'dark' | 'mesh';

export interface AuroraBackdropProps {
  variant?: AuroraVariant;
  className?: string;
}

interface Orb {
  className: string;
  x: number[];
  y: number[];
  scale: number[];
  duration: number;
}

const ORBS: Record<Exclude<AuroraVariant, 'mesh'>, Orb[]> = {
  hero: [
    {
      className: 'left-[28%] top-[-6%] h-[420px] w-[420px] bg-[#fa3674]/[0.16]',
      x: [0, -28, 18, 0],
      y: [0, 22, -12, 0],
      scale: [1, 1.08, 0.96, 1],
      duration: 18,
    },
    {
      className: 'right-[-6%] top-[18%] h-[360px] w-[360px] bg-[#baff39]/[0.22]',
      x: [0, 24, -16, 0],
      y: [0, -18, 14, 0],
      scale: [1, 0.94, 1.06, 1],
      duration: 22,
    },
    {
      className: 'bottom-[-12%] left-[-8%] h-[320px] w-[320px] bg-[#ffe9f0]/80',
      x: [0, 18, -10, 0],
      y: [0, -14, 10, 0],
      scale: [1, 1.05, 0.97, 1],
      duration: 20,
    },
  ],
  soft: [
    {
      className: 'right-[6%] top-[-10%] h-72 w-72 bg-[#fa3674]/10',
      x: [0, -16, 10, 0],
      y: [0, 12, -8, 0],
      scale: [1, 1.06, 0.98, 1],
      duration: 20,
    },
    {
      className: 'bottom-[-6%] left-[4%] h-64 w-64 bg-[#baff39]/20',
      x: [0, 14, -8, 0],
      y: [0, -10, 8, 0],
      scale: [1, 0.96, 1.04, 1],
      duration: 24,
    },
  ],
  dark: [
    {
      className: 'left-[-10%] top-[-20%] h-[420px] w-[420px] bg-[#fa3674]/25',
      x: [0, 30, -12, 0],
      y: [0, 18, -10, 0],
      scale: [1, 1.08, 0.95, 1],
      duration: 18,
    },
    {
      className: 'bottom-[-25%] right-[-10%] h-[380px] w-[380px] bg-[#baff39]/[0.18]',
      x: [0, -22, 14, 0],
      y: [0, -16, 10, 0],
      scale: [1, 0.94, 1.06, 1],
      duration: 21,
    },
  ],
};

/**
 * Ambient Glass UI aurora orbs. Purely decorative (aria-hidden, no pointer
 * events). With prefers-reduced-motion the orbs render as static gradients.
 */
export function AuroraBackdrop({ variant = 'hero', className }: AuroraBackdropProps) {
  const reduceMotion = useReducedMotion();
  const base = `pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`;

  if (variant === 'mesh') {
    return (
      <div aria-hidden="true" className={base}>
        <motion.img
          src="/assets/figma/45924.svg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-90"
          animate={reduceMotion ? undefined : { scale: [1, 1.04, 1], rotate: [0, 1.2, 0] }}
          transition={reduceMotion ? undefined : { duration: 16, ease: 'easeInOut', repeat: Infinity }}
        />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className={base}>
      {ORBS[variant].map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full blur-3xl ${orb.className}`}
          animate={reduceMotion ? undefined : { x: orb.x, y: orb.y, scale: orb.scale }}
          transition={
            reduceMotion ? undefined : { duration: orb.duration, ease: 'easeInOut', repeat: Infinity }
          }
        />
      ))}
    </div>
  );
}
