import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { Link } from 'react-router';
import { motion, useReducedMotion, type Transition } from 'motion/react';
import { cx } from '../components/GlassPrimitives';
import {
  EASE_IN_OUT_FIGMA,
  EASE_OUT_EXPO,
  EASE_OUT_QUINT,
  Reveal,
  StaggeredText,
  loopTransition,
  springBounce,
  springLift,
  springPop,
} from '../components/MotionPrimitives';

const A = '/assets/figma';
const EMAIL = 'lezanh1611@gmail.com';

/* ========================================================================== */
/*  Shared helpers & project cover mockups (re-used by Work / About pages)    */
/* ========================================================================== */

/**
 * Measures a container and returns the scale that fits a fixed-size artboard
 * inside it. SSR-safe: falls back to `initial` until mounted.
 */
export function useFitScale(
  baseWidth: number,
  baseHeight: number,
  initial = 0.7,
): [RefObject<HTMLDivElement | null>, number] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(initial);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof ResizeObserver === 'undefined') return;
    const update = () => {
      const { width, height } = node.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      setScale(Math.min(width / baseWidth, height / baseHeight));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [baseWidth, baseHeight]);

  return [ref, scale];
}

/** Scales a fixed-size artboard to fit (contain) its parent box, centred. */
export function FitArtboard({
  width,
  height,
  children,
  className,
}: {
  width: number;
  height: number;
  children: ReactNode;
  className?: string;
}) {
  const [ref, scale] = useFitScale(width, height);
  return (
    <div ref={ref} className={cx('absolute inset-0 flex items-center justify-center', className)}>
      <div
        className="shrink-0"
        style={{ width, height, transform: `scale(${scale})`, transformOrigin: 'center center' }}
      >
        {children}
      </div>
    </div>
  );
}

/* ---------------------------- Budget dashboard ---------------------------- */

const BUDGET_ROWS = [
  { name: 'Brand architecture retainer', date: 'May 18, 2025', type: 'Payment received', amount: '+$24,500.00', positive: true },
  { name: 'Cloud infrastructure', date: 'May 16, 2025', type: 'Operating expense', amount: '−$1,840.12', positive: false },
  { name: 'Design system workshop', date: 'May 14, 2025', type: 'Payment received', amount: '+$4,200.00', positive: true },
];

/** "Budget Overview — Cash overview" artboard (Figma 1:322 / 1:30). 560×380. */
export function BudgetDashboardArtboard() {
  return (
    <div className="flex h-[380px] w-[560px] flex-col gap-3 rounded-[10px] border border-[#ded9d0] bg-white p-4 font-sans text-[#111111] shadow-[0_12px_28px_-10px_rgba(41,28,18,0.18)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-display text-[15px] leading-5 font-bold">Cash overview</p>
          <p className="text-[10px] text-[#68635c]">Runway, projected cash balance, and recent activity.</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-[6px] border border-[#ded9d0] bg-[#f7f6f3] px-2 py-1 text-[10px] font-medium text-[#4a4844]">
          <img src={`${A}/f5fa4.svg`} alt="" className="size-[10px]" />
          May 2025
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-[8px] bg-[#111111] p-2.5 text-white">
          <p className="flex items-center gap-1 text-[9px] text-[#d6d1c9]">
            <img src={`${A}/a1941.svg`} alt="" className="size-[10px]" />
            Projected runway
          </p>
          <p className="mt-1 font-display text-[17px] leading-5 font-bold">18.8 months</p>
          <p className="text-[8.5px] text-[#d6d1c9]">Baseline estimate through Nov 2026</p>
        </div>
        <div className="rounded-[8px] border border-[#ded9d0] p-2.5">
          <p className="flex items-center gap-1 text-[9px] text-[#68635c]">
            <img src={`${A}/3d7cf.svg`} alt="" className="size-[10px]" />
            Cash on hand
          </p>
          <p className="mt-1 font-display text-[17px] leading-5 font-bold">$184,492.00</p>
          <p className="text-[8.5px] text-[#68635c]">Across 3 accounts</p>
        </div>
        <div className="rounded-[8px] border border-[#ded9d0] p-2.5">
          <p className="flex items-center gap-1 text-[9px] text-[#68635c]">
            <img src={`${A}/196aa.svg`} alt="" className="size-[10px]" />
            Monthly burn
          </p>
          <p className="mt-1 font-display text-[17px] leading-5 font-bold">$9,820.40</p>
          <p className="text-[8.5px] text-[#68635c]">Fixed and variable expenses</p>
        </div>
      </div>

      <div className="rounded-[8px] border border-[#ded9d0] p-2.5">
        <div className="flex items-start justify-between">
          <div>
            <p className="flex items-center gap-1 text-[10px] font-semibold">
              <img src={`${A}/10e8a.svg`} alt="" className="size-[10px]" />
              Cash balance forecast
            </p>
            <p className="text-[8.5px] text-[#68635c]">Illustrative month-end balances · May–Dec 2025</p>
          </div>
          <div className="flex items-center gap-3 text-[8.5px] text-[#4a4844]">
            <span className="flex items-center gap-1">
              <span className="h-px w-3 bg-[#4d6600]" /> Baseline
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 border-t border-dashed border-[#b8004c]" /> Higher billings
            </span>
          </div>
        </div>
        <div className="mt-1.5 flex gap-1.5">
          <div className="flex h-[78px] flex-col justify-between text-right font-mono text-[7.5px] text-[#68635c]">
            {['$220k', '$210k', '$200k', '$190k', '$180k'].map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <div className="relative h-[78px] flex-1">
            {[0, 1, 2, 3, 4].map((line) => (
              <span
                key={line}
                className="absolute inset-x-0 h-px bg-[#eae6de]"
                style={{ top: `${line * 25}%` }}
              />
            ))}
            <svg viewBox="0 0 296 78" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              <path
                d="M0 62 L42 58 L84 60 L127 53 L169 46 L212 43 L254 40 L296 36"
                fill="none"
                stroke="#4D6600"
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M0 62 L42 55 L84 54 L127 44 L169 34 L212 27 L254 20 L296 13"
                fill="none"
                stroke="#B8004C"
                strokeWidth="1.2"
                strokeDasharray="3 2.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>
        <div className="mt-1 flex justify-between pl-8 font-mono text-[7.5px] text-[#68635c]">
          {['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>

      <div className="rounded-[8px] border border-[#ded9d0] p-2.5">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1 text-[10px] font-semibold">
            <img src={`${A}/c19b6.svg`} alt="" className="size-[10px]" />
            Recent activity
          </p>
          <p className="text-[8.5px] text-[#68635c]">May 14–18, 2025</p>
        </div>
        <div className="mt-1 grid grid-cols-[1.6fr_1fr_1fr_0.9fr] gap-x-2 text-[8px]">
          {['Description', 'Date', 'Type', 'Amount'].map((h, i) => (
            <span key={h} className={cx('border-b border-[#eae6de] py-0.5 text-[#68635c]', i === 3 && 'text-right')}>
              {h}
            </span>
          ))}
          {BUDGET_ROWS.flatMap((row) => [
            <span key={`${row.name}-n`} className="py-[3px] font-medium">{row.name}</span>,
            <span key={`${row.name}-d`} className="py-[3px] text-[#4a4844]">{row.date}</span>,
            <span key={`${row.name}-t`} className="py-[3px] text-[#4a4844]">{row.type}</span>,
            <span
              key={`${row.name}-a`}
              className={cx('py-[3px] text-right font-semibold', row.positive ? 'text-[#4d6600]' : 'text-[#111111]')}
            >
              {row.amount}
            </span>,
          ])}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ iPhone mockup ----------------------------- */

/**
 * "Reminder Flow — Today on iPhone" (Figma 58:639), drawn at 2× of the
 * card size (224×448 artboard). Scale it with the `scale` prop.
 */
export function PhoneTodayScreen({ scale = 1, className }: { scale?: number; className?: string }) {
  return (
    <div
      className={cx('relative', className)}
      style={{ width: 224 * scale, height: 448 * scale }}
      aria-hidden="true"
    >
      <div
        className="absolute top-0 left-0 h-[448px] w-[224px] drop-shadow-[4px_5px_3px_rgba(48,38,31,0.14)]"
        style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
      >
        {/* Hardware */}
        <span className="absolute top-[82px] left-0 h-[23px] w-[3px] rounded-[1px] bg-[#4c4b49]" />
        <span className="absolute top-[112px] left-0 h-[23px] w-[3px] rounded-[1px] bg-[#4c4b49]" />
        <span className="absolute top-[102px] right-0 h-[34px] w-[3px] rounded-[1px] bg-[#4c4b49]" />
        <div className="absolute inset-y-0 left-[1px] w-[221px] rounded-[30px] border border-[#686560] bg-[#202020] shadow-[1px_4px_9px_rgba(48,38,31,0.14)]" />
        <div className="absolute top-[3px] left-[4px] h-[442px] w-[215px] rounded-[26px] bg-[#101010]" />
        <div className="absolute top-[5px] left-[6px] h-[438px] w-[211px] overflow-hidden rounded-[23px] bg-[#f7f6f3]">
          {/* Status bar */}
          <span className="absolute top-[12px] left-[15px] font-sans text-[7px] font-semibold text-[#111]">9:41</span>
          <span className="absolute top-[7px] left-1/2 h-[12px] w-[43px] -translate-x-1/2 rounded-full bg-[#111]" />
          <span className="absolute top-[11px] right-[16px] flex items-end gap-[1.5px]">
            <span className="h-[2.5px] w-[1.3px] bg-[#111]" />
            <span className="h-[4px] w-[1.3px] bg-[#111]" />
            <span className="h-[5px] w-[1.3px] bg-[#111]" />
            <span className="ml-[3px] flex h-[6px] w-[11px] items-center rounded-[1.5px] border-[0.7px] border-[#111] p-[1px]">
              <span className="h-full w-[75%] rounded-[0.5px] bg-[#111]" />
            </span>
          </span>

          {/* Screen content */}
          <div className="absolute inset-x-0 top-[22px] bottom-0 flex flex-col gap-[7.5px] px-[13px] py-[11px] font-sans">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-[7.5px] font-semibold text-[#111]">
                <img src={`${A}/29b74.svg`} alt="" className="size-[4px]" />
                Reminder Flow
              </span>
              <span className="text-[7px] font-semibold text-[#68635c]">Mon, 19 May</span>
            </div>
            <div>
              <p className="font-display text-[18.6px] leading-[21px] font-bold text-[#111]">Today</p>
              <p className="text-[8px] leading-3 text-[#4a4844]">Your scheduled reminders</p>
            </div>
            <div className="flex flex-col gap-[5px] rounded-[8.7px] bg-[#111] px-[9px] py-[8px]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 rounded-[4.6px] bg-[#ffe9f0] px-[6px] py-[4px] text-[7px] font-semibold text-[#b8004c]">
                  <img src={`${A}/563e8.svg`} alt="" className="size-[11.6px]" />
                  Due now
                </span>
                <span className="text-[7px] font-semibold text-white">08:30</span>
              </div>
              <p className="font-display text-[14.5px] font-bold text-white">Medication A</p>
              <p className="text-[7.5px] leading-[11px] text-[#e4e0da]">Morning reminder</p>
            </div>
            <div className="flex h-[28px] items-center justify-center rounded-[5.8px] bg-[#111] text-[8px] font-semibold text-white">
              Review dose
            </div>
            <div className="flex flex-col gap-[2px] rounded-[8px] border-[0.6px] border-[#ded9d0] bg-white px-[8.7px] py-[7.5px]">
              <p className="font-display text-[10px] leading-3 font-bold text-[#111]">Coming up</p>
              <div className="flex h-[30px] items-center justify-between rounded-[8px] border-[0.6px] border-white/85 bg-white/60 px-[7px] shadow-[0_3.5px_4.6px_rgba(20,20,26,0.07)]">
                <span className="flex items-center gap-[4.6px]">
                  <img src={`${A}/e8a97.svg`} alt="" className="size-[11.6px]" />
                  <span className="flex flex-col gap-[1.7px]">
                    <span className="text-[8.7px] font-semibold text-[#111]">Medication B</span>
                    <span className="text-[7px] text-[#68635c]">Scheduled for 12:30</span>
                  </span>
                </span>
                <span className="text-[7px] font-semibold text-[#4a4844]">Upcoming</span>
              </div>
            </div>
            <p className="text-[7px] leading-[10.5px] text-[#68635c]">
              Open a dose to check its details before logging it.
            </p>
            <div className="absolute inset-x-[13px] bottom-[26px] flex h-[25.6px] gap-[5.8px] rounded-[8px] border-[0.6px] border-white/85 bg-white/45 shadow-[0_4.6px_7px_rgba(18,18,20,0.05)]">
              <span className="flex flex-1 items-center justify-center gap-1 rounded-[8px] border-[0.6px] border-[rgba(250,54,116,0.45)] bg-[rgba(250,54,116,0.2)] text-[8px] font-semibold text-[#b8004c]">
                <img src={`${A}/bf19d.svg`} alt="" className="size-[11.6px]" />
                Today
              </span>
              <span className="flex flex-1 items-center justify-center gap-1 rounded-[8px] border-[0.6px] border-white/85 bg-white/45 text-[8px] font-semibold text-[#4a4844]">
                <img src={`${A}/00d2f.svg`} alt="" className="size-[11.6px]" />
                History
              </span>
            </div>
          </div>
          <span className="absolute bottom-[8px] left-1/2 h-[2.5px] w-[65px] -translate-x-1/2 rounded-full bg-[#111]" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Cover blocks ------------------------------ */

/** Pharmacy still-life photo + iPhone "Today" screen (Figma 1:347 / 1:23). */
export function ReminderCover() {
  const [ref, scale] = useFitScale(224 / 0.785, 448 / 0.785, 0.5);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-[#f2efe9]">
      <img
        src={`${A}/8a95c.png`}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-[12%_50%]"
      />
      {/* Figma: phone left edge at 212/370 (57%) → centre ≈ 72% of the cover width. */}
      <div className="absolute top-[15%] left-[72%] -translate-x-1/2">
        <PhoneTodayScreen scale={scale} />
      </div>
    </div>
  );
}

/** Kite dispatch table + inspector cover. */
export function KiteCover() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f2efe9]">
      <img
        // `cover-kite-home.png` is referenced by the spec but not present in
        // /public/assets/figma; the Work cover is the same artwork.
        src={`${A}/cover-kite-work.png`}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </div>
  );
}

/** Budget dashboard artboard scaled into its cover. */
export function BudgetCover({ padding = 0.08 }: { padding?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f2efe9]">
      <div className="absolute" style={{ inset: `${padding * 100}%` }}>
        <FitArtboard width={560} height={380}>
          <BudgetDashboardArtboard />
        </FitArtboard>
      </div>
    </div>
  );
}

/* ========================================================================== */
/*  Home page sections                                                         */
/* ========================================================================== */

const LOOP = loopTransition;

/* --------------------------------- Hero ----------------------------------- */

function HeroAccents({ reduce }: { reduce: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
      <motion.img
        src={`${A}/179b8.svg`}
        alt=""
        className="absolute top-[57px] left-[35.5%] h-[356px] w-[344px]"
        animate={reduce ? undefined : { x: [0, 0, -17, 7, 0, 0], y: [0, 0, 9, -5, 0, 0] }}
        transition={LOOP([0, 0.0301, 0.32, 0.64, 0.94, 1])}
      />
      <motion.img
        src={`${A}/83dbe.svg`}
        alt=""
        className="absolute top-[51px] left-[34.6%] h-[368px] w-[355px]"
        animate={reduce ? undefined : { x: [0, 0, -17, 7, 0, 0], y: [0, 0, 9, -5, 0, 0] }}
        transition={LOOP([0, 0.0301, 0.32, 0.64, 0.94, 1])}
      />
      <motion.img
        src={`${A}/22851.svg`}
        alt=""
        className="absolute top-[327px] left-[39.8%] size-[9px]"
        animate={reduce ? undefined : { x: [0, 0, -19, 9, 0, 0], y: [0, 0, 10, -6, 0, 0] }}
        transition={LOOP([0, 0.06, 0.3499, 0.6701, 0.9699, 1])}
      />
      {/* Rounded lime triangle (64:786) — rotated 15°, drifts and tilts 6°. */}
      <div className="absolute top-[391px] left-[53.5%] h-[104px] w-[110px]">
        <motion.img
          src={`${A}/74ab0.svg`}
          alt=""
          className="h-[83px] w-[91px]"
          style={{ rotate: 15 }}
          animate={reduce ? undefined : { x: [0, 0, 14, -8, 0, 0], y: [0, 0, 10, -5, 0, 0], rotate: [15, 15, 21, 15, 15, 15] }}
          transition={LOOP([0, 0.0701, 0.36, 0.68, 0.98, 1])}
        />
      </div>
    </div>
  );
}

function StatusPill({ reduce }: { reduce: boolean }) {
  return (
    <div className="inline-flex h-[30px] items-center gap-[7px] rounded-full border border-[var(--color-glass-border-pink)] bg-[var(--color-glass-tint-pink)] pr-3 pl-[11px] shadow-[0_8px_20px_-3px_rgba(18,18,23,0.08)] lg:h-auto lg:gap-2 lg:border-[#ded9d0] lg:bg-white lg:px-[13px] lg:py-[5px] lg:shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
      <span className="relative flex size-[7px] items-center justify-center lg:size-2">
        <motion.span
          className="absolute inset-0 rounded-full bg-[#fa3674] lg:bg-[#10b981]"
          initial={{ opacity: 0.9, scale: 1 }}
          animate={
            reduce
              ? undefined
              : { opacity: [0.9, 0.9, 0, 0, 0.9, 0, 0, 0.9], scale: [1, 1, 2.5, 2.5, 1, 2.5, 2.5, 1] }
          }
          transition={LOOP(
            [0, 0.0548, 0.3973, 0.5067, 0.5068, 0.8493, 0.9999, 1],
            ['linear', 'easeOut', 'linear', 'linear', 'easeOut', 'linear', 'linear'],
          )}
        />
        <span className="relative size-[7px] rounded-full bg-[#fa3674] lg:size-2 lg:bg-[#baff39]" />
      </span>
      <span className="font-sans text-[11px] font-semibold whitespace-nowrap text-[#b8004c] lg:font-jakarta lg:text-[12px] lg:leading-4 lg:font-medium lg:text-[#111111]">
        Open to Fresher UI/UX Designer roles
      </span>
    </div>
  );
}

function HeroSection() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section aria-labelledby="home-hero-title" className="relative overflow-x-clip">
      <div className="relative mx-auto max-w-[1280px] px-5 pt-6 pb-14 md:px-8 md:pt-10 lg:pt-9 lg:pb-24">
        <HeroAccents reduce={reduce} />

        <div className="relative z-10 grid grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-8 [perspective:1100px]">
          {/* Left — typography & bio */}
          <div className="flex flex-col items-start gap-3 lg:col-span-7 lg:gap-0">
            <StatusPill reduce={reduce} />

            <h1 id="home-hero-title" className="w-full text-[#111111] lg:mt-6">
              <StaggeredText
                text="Hi, I’m Anh."
                as="span"
                className="block font-display text-[27px] leading-[32px] font-bold md:text-[40px] md:leading-[46px] lg:font-jakarta lg:text-[60px] lg:leading-[64px] lg:tracking-[-1.5px] lg:text-[#68635c] xl:text-[72px] xl:leading-[72px] xl:tracking-[-1.8px]"
              />
              <span className="mt-3 block font-display text-[40px] leading-[44px] font-bold md:text-[56px] md:leading-[60px] lg:mt-0 lg:font-jakarta lg:text-[60px] lg:leading-[64px] lg:font-extrabold lg:tracking-[-1.5px] xl:text-[72px] xl:leading-[72px] xl:tracking-[-1.8px]">
                <StaggeredText text="Fresher" as="span" delay={0.2} className="lg:block" />{' '}
                <span className="inline-flex items-center whitespace-nowrap">
                  <StaggeredText text="UI/UX Designer" as="span" delay={0.3} />
                  <motion.span
                    aria-hidden="true"
                    className="ml-2 hidden h-[46px] w-[5px] bg-[#fa3674] opacity-[0.88] lg:inline-block xl:h-[56px] xl:w-[6px]"
                    animate={reduce ? undefined : { opacity: [0.9, 0.9, 0.32, 0.32, 0.9] }}
                    transition={{ duration: 1.1, times: [0, 0.45, 0.5, 0.95, 1], repeat: Infinity }}
                  />
                </span>
              </span>
            </h1>

            <motion.p
              className="max-w-[576px] font-sans text-[15px] leading-[23px] text-[#4a4844] lg:mt-8 lg:pr-8 lg:font-jakarta lg:text-[18px] lg:leading-[28px]"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: EASE_OUT_EXPO }}
            >
              <span className="lg:hidden">
                I design dashboards, mobile flows, and reusable components in Hanoi, Vietnam.
              </span>
              <span className="hidden lg:inline">
                I’m a UI/UX designer in Hanoi, Vietnam. I design dashboards, mobile flows, and the components that
                make them consistent.
              </span>
            </motion.p>

            <motion.div
              className="flex w-full gap-[10px] pt-1 lg:mt-9 lg:w-auto lg:flex-wrap lg:gap-3 lg:pt-0"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: EASE_OUT_EXPO }}
            >
              <Link
                to="/work"
                className="group relative inline-flex h-12 flex-1 items-center justify-center rounded-full border border-[var(--color-glass-border-dark)] bg-[var(--color-glass-surface-dark)] px-[14px] font-sans text-[14px] font-semibold text-white shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.24),0_20px_44px_-8px_rgba(13,13,20,0.22)] backdrop-blur-[16px] transition-transform duration-200 hover:-translate-y-px focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_rgba(250,54,116,0.85)] motion-reduce:transition-none lg:flex-none lg:border-transparent lg:bg-[#111111] lg:px-6 lg:font-jakarta lg:shadow-[0_1px_1px_rgba(0,0,0,0.05)] lg:backdrop-blur-none"
              >
                <span className="lg:hidden">View work</span>
                <span className="hidden lg:inline">View selected work</span>
                <span className="pointer-events-none absolute inset-0 rounded-full border border-white/85 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
              <Link
                to="/contact"
                className="group relative inline-flex h-12 flex-1 items-center justify-center rounded-full border border-[var(--color-glass-border-specular)] bg-[var(--color-glass-surface-strong)] px-[14px] font-sans text-[14px] font-semibold text-[#111111] shadow-[0_8px_20px_-3px_rgba(18,18,23,0.08)] backdrop-blur-[16px] transition-transform duration-200 hover:-translate-y-px focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_rgba(250,54,116,0.85)] motion-reduce:transition-none lg:flex-none lg:border-[#ded9d0] lg:bg-white lg:px-[25px] lg:font-jakarta lg:shadow-none"
              >
                Say hello
                <span className="pointer-events-none absolute inset-[-1px] rounded-full border border-white/85 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </motion.div>

            {/* Mobile / tablet portrait (Figma 253:1245) */}
            <motion.div
              className="relative mt-1 h-[380px] w-full overflow-hidden rounded-[20px] border-[6px] border-white shadow-[0_0_0_1px_rgba(18,18,23,0.08),0_12px_28px_-4px_rgba(18,18,23,0.12)] md:h-[520px] md:max-w-[440px] lg:hidden"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: EASE_OUT_EXPO }}
            >
              <img
                src={`${A}/99709.png`}
                alt="Portrait of Anh in a park in Hanoi, wearing a light T-shirt and looking to the side"
                className="absolute inset-0 h-full w-full rounded-[14px] object-cover object-[50%_30%]"
                fetchPriority="high"
                decoding="async"
              />
            </motion.div>
          </div>

          {/* Right — framed portrait with 3D tilt (Figma 52:2082) */}
          <div className="relative hidden lg:col-span-4 lg:col-start-8 lg:block lg:self-start">
            <motion.figure
              className="relative w-full max-w-[420px] rounded-[2px] border border-[rgba(163,163,163,0.8)] bg-white p-[11px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] [transform-style:preserve-3d]"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={
                reduce
                  ? { opacity: 1, y: 0 }
                  : {
                      opacity: 1,
                      y: 0,
                      rotateX: [0, 0, 3.5, -2.2, 0, 0],
                      rotateY: [0, 0, -6.5, 4.2, 0, 0],
                      z: [0, 0, 26, 12, 0, 0],
                    }
              }
              transition={
                reduce
                  ? { duration: 0.6, ease: EASE_OUT_EXPO }
                  : ({
                      opacity: { duration: 0.7, delay: 0.3, ease: EASE_OUT_EXPO },
                      y: { duration: 0.7, delay: 0.3, ease: EASE_OUT_EXPO },
                      rotateX: LOOP([0, 0.0548, 0.3699, 0.6986, 0.9589, 1], [EASE_IN_OUT_FIGMA, EASE_OUT_EXPO, 'easeInOut', EASE_OUT_EXPO, 'easeInOut']),
                      rotateY: LOOP([0, 0.0548, 0.3699, 0.6986, 0.9589, 1], [EASE_IN_OUT_FIGMA, EASE_OUT_EXPO, 'easeInOut', EASE_OUT_EXPO, 'easeInOut']),
                      z: LOOP([0, 0.0548, 0.3699, 0.6986, 0.9589, 1], [EASE_IN_OUT_FIGMA, springBounce, 'easeInOut', EASE_OUT_EXPO, 'easeInOut']),
                    } satisfies Transition)
              }
            >
              <div className="relative aspect-[311/388] w-full overflow-hidden bg-[#eae6de]">
                <img
                  src={`${A}/99709.png`}
                  alt="Portrait of Anh in a park in Hanoi, wearing a light T-shirt and looking to the side"
                  className="absolute inset-0 h-full w-full object-cover object-[50%_35%]"
                  fetchPriority="high"
                  decoding="async"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-white/[0.08] mix-blend-saturation" />
              </div>
            </motion.figure>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Selected Work ------------------------------ */

interface HomeProject {
  key: string;
  to: string;
  badge: string;
  category: string;
  title: string;
  description: string;
  tag: string;
  cta: string;
  cover: ReactNode;
  coverTimes: number[];
  badgeAnim: { x: number[]; y: number[]; times: number[] };
}

const HOME_PROJECTS: HomeProject[] = [
  {
    key: 'kite',
    to: '/work/kite',
    badge: 'Web app · 2026',
    category: 'Dispatch dashboard',
    title: 'Kite',
    description: 'Filter shipments and review delays without leaving the dispatch table.',
    tag: 'Data tables',
    cta: 'Read Kite case study',
    cover: <KiteCover />,
    coverTimes: [0, 0.1233, 0.3425, 0.6301, 1],
    badgeAnim: { x: [0, 0, 5, 0, 0], y: [0, 0, -3, 0, 0], times: [0, 0.1449, 0.4249, 0.7551, 1] },
  },
  {
    key: 'budget',
    to: '/work/budget-overview',
    badge: 'Web app · 2026',
    category: 'Finance dashboard',
    title: 'Budget Overview',
    description: 'See how changes to income and costs affect cash runway.',
    tag: 'Data visualization',
    cta: 'Read Budget case study',
    cover: <BudgetCover />,
    coverTimes: [0, 0.2329, 0.4521, 0.7397, 1],
    badgeAnim: { x: [0, 0, -4, 0, 0], y: [0, 0, 3, 0, 0], times: [0, 0.22, 0.5, 0.8301, 1] },
  },
  {
    key: 'reminder',
    to: '/work/reminder-flow',
    badge: 'Mobile app · 2026',
    category: 'Medication reminders',
    title: 'Reminder Flow',
    description: 'Check what’s due, log a dose, or snooze the reminder.',
    tag: 'Mobile interaction',
    cta: 'Read Reminder case study',
    cover: <ReminderCover />,
    coverTimes: [0, 0.3425, 0.5616, 0.8493, 1],
    badgeAnim: { x: [0, 0, 5, 0, 0], y: [0, 0, -2, 0, 0], times: [0, 0.2951, 0.5751, 0.9049, 1] },
  },
];

function HomeProjectCard({ project, reduce, index }: { project: HomeProject; reduce: boolean; index: number }) {
  return (
    <Reveal as="li" delay={index * 0.08} className="h-full">
      <Link
        to={project.to}
        className="group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-[#ded9d0] bg-white p-px transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-14px_rgba(20,20,26,0.18)] focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_rgba(250,54,116,0.85)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        <div className="relative aspect-[370/285] w-full overflow-hidden border-b border-[#ded9d0] bg-[#f2efe9]">
          <motion.div
            className="absolute inset-0"
            animate={reduce ? undefined : { scale: [1, 1, 1.045, 1, 1] }}
            transition={LOOP(project.coverTimes, [EASE_IN_OUT_FIGMA, EASE_OUT_QUINT, 'easeInOut', 'easeInOut'])}
          >
            {project.cover}
          </motion.div>
          <motion.span
            className="absolute top-[14px] left-3 rounded-full border border-black/5 bg-white/90 px-[11px] py-[3.5px] font-mono text-[11px] leading-[16.5px] font-medium text-[#111111] backdrop-blur-[4px]"
            animate={reduce ? undefined : { x: project.badgeAnim.x, y: project.badgeAnim.y }}
            transition={LOOP(project.badgeAnim.times)}
          >
            {project.badge}
          </motion.span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center justify-between pb-2 font-mono text-[12px] leading-4 text-[#68635c]">
            <span>{project.category}</span>
            <span>Concept</span>
          </div>
          <h3 className="pb-2 font-jakarta text-[20px] leading-7 font-bold text-[#111111]">{project.title}</h3>
          <p className="max-w-[300px] flex-1 pb-6 font-jakarta text-[14px] leading-[22.75px] text-[#4a4844]">
            {project.description}
          </p>
          <div className="flex items-center justify-between gap-3 border-t border-[#ded9d0] pt-[17px]">
            <span className="font-mono text-[12px] leading-4 text-[#4a4844]">{project.tag}</span>
            <span className="inline-flex min-h-[24px] items-center gap-1 font-jakarta text-[12px] leading-4 font-semibold text-[#111111] group-hover:text-[#b8004c]">
              {project.cta}
              <img
                src={`${A}/8ba6d.svg`}
                alt=""
                aria-hidden="true"
                className="h-[3px] w-[7px] transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </span>
          </div>
        </div>
        <span className="pointer-events-none absolute inset-[-1px] rounded-[16px] border border-white/85 opacity-0 transition-opacity group-hover:opacity-100" />
      </Link>
    </Reveal>
  );
}

function SelectedWorkSection() {
  const reduce = useReducedMotion() ?? false;
  return (
    <section aria-labelledby="home-work-title" className="mx-auto max-w-[1280px] px-5 py-14 md:px-8 lg:py-20">
      <Reveal className="flex flex-col gap-1 border-b border-[#ded9d0] pb-6 md:pb-8">
        <h2 id="home-work-title" className="font-jakarta text-[30px] leading-9 font-extrabold tracking-[-0.75px] text-[#111111] md:text-[36px] md:leading-10 md:tracking-[-0.9px]">
          Selected Work
        </h2>
        <p className="font-jakarta text-[16px] leading-6 text-[#4a4844]">Three self-initiated UI/UX design projects.</p>
      </Reveal>
      <ul className="mt-8 grid grid-cols-1 gap-6 md:mt-10 md:grid-cols-2 lg:grid-cols-3">
        {HOME_PROJECTS.map((project, index) => (
          <HomeProjectCard key={project.key} project={project} reduce={reduce} index={index} />
        ))}
      </ul>
    </section>
  );
}

/* --------------------------- Learning & Exploring ------------------------- */

interface GrowthCard {
  number: string;
  title: string;
  body: string;
  practice: string;
  times: number[];
  to?: string;
}

const GROWTH_CARDS: GrowthCard[] = [
  {
    number: '01',
    title: 'Figma Variables & Auto Layout',
    body: 'Mastering nested autolayout, responsive constraints, and scalable token architecture for seamless developer handoff.',
    practice: 'Daily drill & component building',
    times: [0, 0.1096, 0.2877, 0.5205, 1],
  },
  {
    number: '02',
    title: 'Interactive Micro-Motion',
    body: 'Learning smart animate, tactile spring physics, and state transitions to communicate hierarchy and user intent clearly.',
    practice: 'Prototyping physics curves',
    times: [0, 0.2027, 0.3808, 0.6137, 1],
    to: '/journal/component-states',
  },
  {
    number: '03',
    title: 'Design Critique & Feedback',
    body: 'Actively seeking feedback from senior designers, documenting trade-offs, and iterating rapidly with humility.',
    practice: 'Weekly peer reviews',
    times: [0, 0.2959, 0.474, 0.7068, 1],
  },
  {
    number: '04',
    title: 'Accessibility & Contrast',
    body: 'I check type legibility, keyboard order, and whether controls have enough space to tap or click.',
    practice: 'Contrast testing & tokens',
    times: [0, 0.389, 0.5671, 0.8, 1],
    to: '/journal/spacing-and-hierarchy',
  },
];

function GrowthCardItem({ card, reduce, index }: { card: GrowthCard; reduce: boolean; index: number }) {
  const body = (
    <>
      <div className="flex flex-col gap-2">
        <motion.span
          className="flex size-8 items-center justify-center rounded-[8px] bg-black/5 font-mono text-[12px] leading-4 font-medium text-[#111111]"
          animate={reduce || index !== 1 ? undefined : { scale: [1, 1, 1.22, 1, 1] }}
          transition={LOOP([0, 0.2027, 0.3425, 0.5753, 1], [EASE_IN_OUT_FIGMA, springPop, 'easeInOut', 'easeInOut'])}
        >
          {card.number}
        </motion.span>
        <h3 className="pt-2 font-jakarta text-[16px] leading-6 font-bold text-[#111111]">{card.title}</h3>
        <p className="font-jakarta text-[14px] leading-5 text-[#4a4844]">{card.body}</p>
      </div>
      <div className="mt-6 flex items-center gap-[6px] border-t border-[#ded9d0] pt-[17px]">
        <span aria-hidden="true" className="size-[6px] shrink-0 rounded-full bg-[#fa3674]" />
        <span className="font-mono text-[11px] leading-[16.5px] text-[#68635c]">{card.practice}</span>
      </div>
    </>
  );

  const cardClass =
    'flex h-full flex-col justify-between rounded-[16px] border border-[#ded9d0] bg-white p-[25px]';

  return (
    <Reveal as="li" delay={index * 0.06} className="h-full">
      <motion.div
        className="h-full"
        animate={reduce ? undefined : { y: [0, 0, -8, 0, 0] }}
        transition={LOOP(card.times, [EASE_IN_OUT_FIGMA, springLift, 'easeInOut', 'easeInOut'])}
      >
        {card.to ? (
          <Link
            to={card.to}
            className={cx(
              cardClass,
              'transition-shadow duration-200 hover:shadow-[0_14px_34px_-10px_rgba(20,20,26,0.14)] focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_rgba(250,54,116,0.85)]',
            )}
          >
            {body}
          </Link>
        ) : (
          <div className={cardClass}>{body}</div>
        )}
      </motion.div>
    </Reveal>
  );
}

function LearningSection() {
  const reduce = useReducedMotion() ?? false;
  return (
    <section aria-labelledby="home-learning-title" className="relative overflow-hidden bg-[#f7f6f3]">
      <div className="relative mx-auto max-w-[1280px] px-5 py-14 md:px-8 lg:py-16">
        {/* Background accents (64:787) */}
        <div aria-hidden="true" className="pointer-events-none absolute top-[41px] right-[24px] hidden h-[152px] w-[260px] md:block lg:right-[57px]">
          <div className="absolute top-[-14px] left-[80px] flex h-[107px] w-[113px] items-center justify-center">
            <motion.img
              src={`${A}/891aa.svg`}
              alt=""
              className="h-[83px] w-[91px]"
              style={{ rotate: -18 }}
              animate={reduce ? undefined : { x: [0, 0, -8, 7, 0, 0], y: [0, 0, 4, -3, 0, 0] }}
              transition={LOOP([0, 0.04, 0.3301, 0.6501, 0.9501, 1])}
            />
          </div>
          <motion.img
            src={`${A}/006d8.svg`}
            alt=""
            className="absolute top-[48px] left-[171px] size-[13px]"
            animate={reduce ? undefined : { x: [0, 0, 7, -4, 0, 0], y: [0, 0, -4, 2, 0, 0] }}
            transition={LOOP([0, 0.06, 0.3499, 0.6701, 0.9699, 1])}
          />
          <motion.img
            src={`${A}/80f29.svg`}
            alt=""
            className="absolute top-[81px] left-[144px] size-8"
            animate={reduce ? undefined : { x: [0, 0, -5, 4, 0, 0], y: [0, 0, 5, -2, 0, 0] }}
            transition={LOOP([0, 0.0501, 0.34, 0.66, 0.96, 1])}
          />
        </div>

        <Reveal className="relative flex max-w-[576px] flex-col gap-1">
          <p className="font-mono text-[12px] leading-4 font-medium tracking-[0.6px] text-[#b8004c] uppercase">
            Growth &amp; Curiosity
          </p>
          <h2 id="home-learning-title" className="font-jakarta text-[26px] leading-8 font-extrabold tracking-[-0.65px] text-[#111111] md:text-[30px] md:leading-9 md:tracking-[-0.75px]">
            What I’m Learning &amp; Exploring
          </h2>
          <p className="pt-1 font-jakarta text-[16px] leading-6 text-[#4a4844]">
            Current areas of growth, daily practice, and foundational principles guiding my work.
          </p>
        </Reveal>

        <ul className="relative mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {GROWTH_CARDS.map((card, index) => (
            <GrowthCardItem key={card.number} card={card} reduce={reduce} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------- About & Contact ----------------------------- */

const TOOL_BADGES = ['Figma', 'Framer', 'Design Systems', 'HTML/Tailwind (Basics)', 'Notion Spec Docs'];

function AboutContactSection() {
  const reduce = useReducedMotion() ?? false;
  return (
    <section aria-labelledby="home-contact-title" className="border-t border-[#ded9d0] bg-white">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-5 py-14 md:px-8 lg:grid-cols-12 lg:gap-12 lg:pt-[81px] lg:pb-20">
        <Reveal className="flex flex-col gap-2 lg:col-span-7">
          <p className="font-mono text-[12px] leading-4 font-medium tracking-[0.6px] text-[#b8004c] uppercase">
            Open to Fresher UI/UX Roles
          </p>
          <h2 id="home-contact-title" className="font-jakarta text-[30px] leading-9 font-extrabold tracking-[-0.75px] text-[#111111] md:text-[36px] md:leading-10 md:tracking-[-0.9px]">
            Let’s talk about a UI/UX role.
          </h2>
          <p className="max-w-[620px] pt-4 font-jakarta text-[16px] leading-[26px] text-[#4a4844]">
            I’m looking for a team where I can contribute to interface design, build reusable components, and
            improve my work through critique.
          </p>
          <motion.ul
            aria-label="Tools"
            className="flex flex-wrap gap-2 pt-4"
            animate={reduce ? undefined : { x: [0, 0, 5, 0, 0] }}
            transition={LOOP([0, 0.0701, 0.3499, 0.68, 1])}
          >
            {TOOL_BADGES.map((badge) => (
              <li key={badge} className="rounded-[6px] bg-[#f2efe9] px-3 py-[6px] font-mono text-[12px] leading-4 text-[#4a4844]">
                {badge}
              </li>
            ))}
          </motion.ul>
          <div className="flex items-center gap-2 pt-6">
            <motion.span
              aria-hidden="true"
              className="size-[10px] shrink-0 rounded-full bg-[#10b981]"
              animate={reduce ? undefined : { scale: [1, 1, 1.35, 1, 1] }}
              transition={LOOP([0, 0.1096, 0.3151, 0.5753, 1], [EASE_IN_OUT_FIGMA, springBounce, 'easeInOut', 'easeInOut'])}
            />
            <p className="font-jakarta text-[14px] leading-5 font-medium text-[#111111]">
              Open to full-time or part-time UI/UX roles
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="flex flex-col rounded-[24px] border border-[#ded9d0] bg-[#f7f6f3] p-5 shadow-[0_1px_1px_rgba(0,0,0,0.05)] sm:p-[33px]">
            <h3 className="font-jakarta text-[20px] leading-7 font-bold text-[#111111]">Let’s connect</h3>
            <p className="mt-2 font-jakarta text-[14px] leading-5 text-[#4a4844]">
              Email me about a UI/UX role, portfolio feedback, or a project you’d like to discuss.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="flex min-h-[44px] items-center justify-between gap-3 rounded-[12px] border border-[#ded9d0] bg-white p-[13px] transition-colors hover:border-[#fa3674]/60 focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_rgba(250,54,116,0.85)]"
              >
                <span className="font-mono text-[12px] leading-4 text-[#4a4844]">Email</span>
                <span className="truncate font-mono text-[12px] leading-4 font-medium text-[#111111]">{EMAIL}</span>
              </a>
              <div className="flex min-h-[44px] items-center justify-between gap-3 rounded-[12px] border border-[#ded9d0] bg-white p-[13px]">
                <span className="font-mono text-[12px] leading-4 text-[#4a4844]">Location</span>
                <span className="text-right font-mono text-[12px] leading-4 font-medium text-[#111111]">
                  Remote / Open to Relocation
                </span>
              </div>
            </div>
            <Link
              to="/contact"
              className="mt-8 inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#111111] px-6 py-[14px] font-jakarta text-[14px] leading-5 font-semibold text-white transition-transform duration-200 hover:-translate-y-px focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_rgba(250,54,116,0.85)] motion-reduce:transition-none"
            >
              Say hello →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ========================================================================== */

export function HomePage() {
  return (
    <div className="relative overflow-x-clip bg-[#f7f6f3]">
      <HeroSection />
      <SelectedWorkSection />
      <LearningSection />
      <AboutContactSection />
    </div>
  );
}
