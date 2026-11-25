import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { motion, useReducedMotion } from 'motion/react';
import { EASE_OUT_EXPO, Reveal, StaggeredText } from '../components/MotionPrimitives';
import { cx } from '../components/GlassPrimitives';
import { FitArtboard } from './HomePage';

const A = '/assets/figma';

const focusRing =
  'focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_rgba(250,54,116,0.85)]';

/** Shared editorial column: Figma 192px margins + 32px inner padding → 832px measure. */
function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('mx-auto w-full max-w-[896px] px-5 md:px-8', className)}>{children}</div>;
}

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-display text-[12px] leading-4 font-bold tracking-[1.2px] text-[#b8004c] uppercase">{children}</p>
  );
}

function SectionTitle({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="font-display text-[28px] leading-[34px] font-bold tracking-[-0.7px] text-[#111111] md:text-[36px] md:leading-10 md:tracking-[-0.9px]">
      {children}
    </h2>
  );
}

/* -------------------------------------------------------------------------- */
/*  Cover — "Spacing system · Dashboard study" (Figma 1:556 / 234:1152)       */
/* -------------------------------------------------------------------------- */

const CATEGORIES = [
  { name: 'People & contractors', amount: '$360', share: 19 },
  { name: 'Software', amount: '$240', share: 12.667 },
  { name: 'Operations', amount: '$120', share: 6.333 },
];

function GuideLine({ top, height, label, pulse }: { top: number; height: number; label: string; pulse?: boolean }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <>
      <motion.div
        className="absolute left-[352px] w-[64px]"
        style={{ top, height: height + 1 }}
        animate={pulse && !reduce ? { opacity: [0.78, 1, 0.78] } : undefined}
        transition={pulse && !reduce ? { duration: 2.4, ease: 'easeInOut', repeat: Infinity } : undefined}
      >
        <span className="absolute top-0 left-0 h-px w-[53px] bg-[#fa3674] opacity-[0.42]" />
        <span className="absolute left-0 h-px w-[53px] bg-[#fa3674] opacity-[0.42]" style={{ top: height }} />
        <span className="absolute top-0 left-[56px] w-px bg-[#b8004c]" style={{ height }} />
        <span className="absolute top-0 left-[52px] h-px w-[9px] bg-[#b8004c]" />
        <span className="absolute left-[52px] h-px w-[9px] bg-[#b8004c]" style={{ top: height }} />
      </motion.div>
      <span
        className="absolute left-[423px] flex h-5 items-center rounded-[5px] bg-[#ffe9f0] px-[7px] font-sans text-[11px] font-semibold whitespace-nowrap text-[#b8004c]"
        style={{ top: top + height / 2 - 10 }}
      >
        {label}
      </span>
    </>
  );
}

/** Annotated budget card artboard, 480×396 (Figma 234:1152). */
function SpacingAnnotationArtboard() {
  return (
    <div className="relative h-[396px] w-[480px] font-sans">
      <div className="absolute top-4 left-2 w-[376px] overflow-hidden rounded-[14px] border border-[#ded9d0] bg-white shadow-[0_8px_20px_rgba(41,28,18,0.12)]">
        <div className="flex h-12 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-[6px] bg-[#111111]">
              <img src={`${A}/5adee.svg`} alt="" className="size-[15px]" />
            </span>
            <span className="text-[14px] font-semibold text-[#111111]">Budget overview</span>
          </div>
          <span className="flex h-[26px] items-center rounded-[6px] border border-[#ded9d0] bg-[#f7f6f3] px-[9px] text-[11px] font-medium text-[#4a4844]">
            May 2026
          </span>
        </div>
        <div className="flex flex-col gap-6 px-8 pt-4 pb-[22px]">
          <div className="flex flex-col gap-3 rounded-[10px] border border-[#ded9d0] bg-[#f7f6f3] p-4">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <span className="flex h-4 items-center text-[12px] font-medium text-[#4a4844]">Available to spend</span>
                <span className="flex h-9 items-center font-display text-[33px] leading-9 font-bold text-[#111111]">$1,280</span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[11px] font-medium text-[#68635c]">Monthly limit</span>
                <span className="text-[16px] font-semibold text-[#111111]">$2,000</span>
              </div>
            </div>
            <div className="h-2 w-[280px] overflow-hidden rounded-[4px] bg-[#eae6de]" aria-hidden="true">
              <div className="h-2 w-[36%] rounded-l-[4px] bg-[#fa3674]" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex h-[21px] items-center justify-between">
              <span className="text-[14px] font-semibold text-[#111111]">Spending by category</span>
              <span className="text-[11px] font-medium text-[#68635c]">$720 total</span>
            </div>
            <div className="flex flex-col">
              {CATEGORIES.map((category, index) => (
                <div key={category.name}>
                  {index > 0 && <div className="h-px w-full bg-[#ded9d0]" />}
                  <div className="flex h-7 items-center justify-between">
                    <span className="flex items-center gap-2 text-[12px] font-medium text-[#111111]">
                      <span className="size-[5px] rounded-[2.5px] bg-[#fa3674]" />
                      {category.name}
                    </span>
                    <span className="flex items-center gap-[6px]">
                      <span className="relative h-1 w-[38px] overflow-hidden rounded-[2px] bg-[#f2efe9]">
                        <span
                          className="absolute top-0 left-0 h-1 rounded-[2px] bg-[#fa3674] opacity-[0.72]"
                          style={{ width: category.share }}
                        />
                      </span>
                      <span className="w-[47px] text-right text-[12px] font-semibold text-[#111111]">{category.amount}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <GuideLine top={64} height={16} label="16 px" />
      <GuideLine top={112} height={8} label="8 px" />
      <GuideLine top={192} height={24} label="24 px" pulse />

      {/* Container inset — 32 px */}
      <div className="absolute top-[367px] left-2 h-3 w-[33px]">
        <span className="absolute top-0 left-0 h-[11px] w-px bg-[#b8004c]" />
        <span className="absolute top-0 left-8 h-[11px] w-px bg-[#b8004c]" />
        <span className="absolute top-[5px] left-0 h-px w-8 bg-[#b8004c]" />
      </div>
      <span className="absolute top-[362px] left-[49px] flex h-5 items-center rounded-[5px] bg-[#ffe9f0] px-[7px] text-[11px] font-semibold text-[#b8004c]">
        32 px
      </span>
      <span className="absolute top-[365px] left-[105px] text-[11px] font-medium text-[#4a4844]">Container inset</span>
    </div>
  );
}

const SCALE_LEVELS = [
  { size: 8, title: 'Within a metric', body: 'Keep a label close to its value.' },
  { size: 16, title: 'Below the toolbar', body: 'Set controls apart from the summary.' },
  { size: 24, title: 'Between sections', body: 'Give spending its own group.' },
  { size: 32, title: 'At the container edge', body: 'Align both sections to one inset.' },
];

function SpacingCover() {
  return (
    <section aria-label="Spacing system dashboard study" className="mx-auto w-full max-w-[896px] px-5 py-6 md:px-8">
      <Reveal className="rounded-[14px] bg-[#f2efe9] px-4 py-6 sm:px-8 sm:py-[30px]">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between md:gap-6">
          <div
            role="img"
            aria-label="Budget overview card annotated with 8, 16, 24 and 32 pixel spacing guides"
            className="relative aspect-[480/396] w-full max-w-[480px] md:flex-1"
          >
            <FitArtboard width={480} height={396}>
              <SpacingAnnotationArtboard />
            </FitArtboard>
          </div>

          <div className="flex w-full flex-col gap-[18px] md:w-[256px] md:shrink-0">
            <div className="flex flex-col gap-2">
              <p className="font-display text-[24px] leading-7 font-bold text-[#111111]">From detail to layout</p>
              <p className="font-sans text-[14px] leading-5 text-[#4a4844]">
                One spacing scale connects the details inside a metric, the sections and the dashboard grid.
              </p>
            </div>
            <ul className="flex flex-col gap-[10px]">
              {SCALE_LEVELS.map((level) => (
                <li key={level.size} className="flex items-start">
                  <span className="flex w-[49px] shrink-0 flex-col gap-[5px] pt-[3px]">
                    <span className="font-sans text-[11px] font-semibold text-[#b8004c]">{level.size} px</span>
                    <span aria-hidden="true" className="h-[2px] rounded-[1px] bg-[#fa3674]" style={{ width: level.size }} />
                  </span>
                  <span className="flex flex-col gap-[3px]">
                    <span className="font-sans text-[13px] font-semibold text-[#111111]">{level.title}</span>
                    <span className="font-sans text-[11px] leading-[15px] text-[#4a4844]">{level.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Before / After comparison cards (Figma 1:634)                             */
/* -------------------------------------------------------------------------- */

function LedgerCardBefore() {
  return (
    <div className="flex flex-col gap-[11px] bg-[#e8e3da] p-[13px] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="pb-[3px] font-display text-[10px] leading-[15px] tracking-[-0.25px] text-[#4a4a4a] uppercase">
            PORTFOLIO LEDGER
          </p>
          <p className="font-display text-[18px] leading-[18px] font-bold tracking-[-0.45px] text-[#1a1a1a]">Liquidity Index</p>
        </div>
        <span className="bg-[#f5f0e8] px-2 py-[2px] font-display text-[11px] leading-[16.5px] text-[#1a1a1a]">Live · USD</span>
      </div>
      <div className="pt-[14px] pb-[7px]">
        <p className="font-display text-[24px] leading-6 font-bold tracking-[-1.2px] text-[#1a1a1a]">$148,920.40</p>
        <p className="flex items-center gap-1 pt-[10px] font-sans text-[11px] leading-[16.5px] text-[#c00]">
          <img src={`${A}/a8953.svg`} alt="" className="h-[6.5px] w-[11px]" />
          -1.42% past 24h
        </p>
      </div>
      <dl className="flex flex-col gap-[7px] bg-white px-[9px] pt-[9px] pb-[14px]">
        {[
          ['Vault Ratio', '64.2%'],
          ['Daily Sweep', '$12,400.00'],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between">
            <dt className="font-sans text-[11px] leading-4 text-[#4a4a4a]">{k}</dt>
            <dd className="font-display text-[12px] leading-4 font-medium text-[#1a1a1a]">{v}</dd>
          </div>
        ))}
      </dl>
      <span className="bg-[#1a1a1a] py-2 text-center font-display text-[12px] leading-4 font-semibold tracking-[0.6px] text-white uppercase">
        REBALANCE ALLOCATION
      </span>
    </div>
  );
}

function LedgerCardAfter() {
  return (
    <div className="flex flex-col gap-6 border border-[#ded9d0] bg-white p-6 shadow-[0_8px_24px_-8px_rgba(20,20,26,0.12)]">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-display text-[11px] leading-4 tracking-[0.55px] text-[#68635c] uppercase">PORTFOLIO LEDGER</p>
          <p className="font-display text-[20px] leading-5 font-bold tracking-[-0.5px] text-[#1a1a1a]">Liquidity Index</p>
        </div>
        <span className="rounded-full bg-[#ffe9f0] px-2 py-1 font-display text-[11px] leading-4 font-semibold tracking-[0.55px] text-[#b8004c]">
          LIVE · USD
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-display text-[30px] leading-[30px] font-bold tracking-[-1.2px] text-[#1a1a1a]">$148,920.40</p>
        <p className="flex items-center gap-2 font-sans text-[12px] leading-4 text-[#b8004c]">
          <img src={`${A}/8944b.svg`} alt="" className="h-[6.5px] w-[11px]" />
          -1.42% past 24h
        </p>
      </div>
      <dl className="flex flex-col gap-4">
        {[
          ['Vault Ratio', '64.2%'],
          ['Daily Sweep', '$12,400.00'],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between">
            <dt className="font-sans text-[12px] leading-4 text-[#4a4a4a]">{k}</dt>
            <dd className="font-display text-[12px] leading-4 font-semibold text-[#1a1a1a]">{v}</dd>
          </div>
        ))}
      </dl>
      <span className="bg-[#1a1a1a] py-4 text-center font-display text-[12px] leading-4 font-semibold tracking-[0.6px] text-white uppercase">
        REBALANCE ALLOCATION
      </span>
    </div>
  );
}

function ComparisonCard({
  tone,
  label,
  status,
  noteTitle,
  note,
  children,
}: {
  tone: 'before' | 'after';
  label: string;
  status: string;
  noteTitle: string;
  note: string;
  children: ReactNode;
}) {
  const after = tone === 'after';
  return (
    <figure className="flex flex-col gap-4">
      <figcaption className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className={cx('size-2 rounded-full', after ? 'bg-[#e63b2e]' : 'bg-[#4a4a4a]')} />
          <span className={cx('font-display text-[12px] leading-4 font-bold tracking-[1.2px] uppercase', after ? 'text-[#b8004c]' : 'text-[#1a1a1a]')}>
            {label}
          </span>
        </span>
        <span className={cx('font-display text-[11px] leading-[16.5px] tracking-[0.55px] uppercase', after ? 'text-[#4d6600]' : 'text-[#c00]')}>
          {status}
        </span>
      </figcaption>
      {children}
      <div className={cx('px-4 pt-[15px] pb-4', after ? 'bg-[#ffe9f0]/70' : 'bg-[#f2ede5]')}>
        <p className="font-display text-[12px] leading-[19.5px] font-bold tracking-[0.6px] text-[#1a1a1a] uppercase">{noteTitle}</p>
        <p className="mt-[3.5px] font-sans text-[12px] leading-[19.5px] text-[#4a4a4a]">{note}</p>
      </div>
    </figure>
  );
}

/* -------------------------------------------------------------------------- */

const TAKEAWAYS = [
  {
    n: '01',
    title: 'Proximity Trumps Borders',
    body: 'The human visual cortex processes relative distance before conscious line detection. A 24px void establishes a harder contextual break than a 1px border ever can.',
  },
  {
    n: '02',
    title: 'Five-Token Constrained Scale',
    body: 'I limited component padding to five values: 4, 8, 16, 24, and 32 px. The same steps carry from controls to cards and section groups.',
  },
  {
    n: '03',
    title: 'Predictable Rhythm',
    body: 'Strict vertical cadence generates harmonic optical cadence across wide resolutions, ensuring secondary information retreats without requiring reduced opacity.',
  },
];

function JournalArrow({ src, className }: { src: string; className?: string }) {
  return <img src={src} alt="" aria-hidden="true" className={cx('size-[10.667px]', className)} />;
}

export function NoteSpacingPage() {
  const reduce = useReducedMotion() ?? false;

  return (
    <article className="overflow-x-clip bg-[#f7f6f3]" aria-labelledby="note-spacing-title">
      {/* Breadcrumb & metadata header (Figma 1:530) */}
      <Prose className="pt-8 pb-6 md:pt-10">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 pb-8">
          <Link
            to="/journal"
            className={cx('-ml-2 inline-flex min-h-11 items-center gap-2 rounded-full px-2 font-display text-[12px] leading-4 tracking-[1.2px] text-[#111111] uppercase hover:text-[#b8004c]', focusRing)}
          >
            <JournalArrow src={`${A}/03145.svg`} />
            Journal
          </Link>
          <div className="flex flex-wrap items-center gap-3 font-display text-[12px] leading-4 tracking-[0.6px] uppercase">
            <span className="rounded-[12px] bg-[#eae6de] px-3 py-1 font-medium text-[#111111]">
              PRACTICE NOTE · 02 {'//'} SPACING SYSTEMS
            </span>
            <span className="flex items-center gap-[6px] text-[#4a4844]">
              <img src={`${A}/f0783.svg`} alt="" aria-hidden="true" className="size-[11.667px]" />5 MIN READ
            </span>
            <span className="flex items-center gap-[6px] text-[#4a4844]">
              <img src={`${A}/b3c76.svg`} alt="" aria-hidden="true" className="h-[10.5px] w-[10.533px]" />
              SELF-INITIATED STUDY
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <StaggeredText
            as="h1"
            id="note-spacing-title"
            text="Spacing and Hierarchy"
            className="max-w-[640px] font-display text-[48px] leading-[50px] font-bold tracking-[-1.2px] text-[#111111] md:text-[72px] md:leading-[72px] md:tracking-[-1.8px]"
          />
          <motion.span
            aria-hidden="true"
            className="h-1 w-20 origin-left bg-[#fa3674]"
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT_EXPO }}
          />
          <p className="max-w-[672px] font-sans text-[19px] leading-[28px] text-[#4a4844] md:text-[24px] md:leading-8">
            I use spacing to show which items belong together and what to read first.
          </p>
        </div>
      </Prose>

      <SpacingCover />

      <Prose className="flex flex-col gap-16 py-10">
        {/* 01 — Premise */}
        <Reveal as="section" className="flex flex-col gap-6">
          <SectionEyebrow>01 {'//'} EXPERIMENT SETUP</SectionEyebrow>
          <SectionTitle id="spacing-premise">The Premise — What Was Explored</SectionTitle>
          <div className="flex flex-col gap-5 font-sans text-[16px] leading-[26px] text-[#4a4844] md:text-[18px] md:leading-7">
            <p>
              I compared two versions of a finance dashboard card in Figma. One uses more visual separators, while
              the other groups the same information through alignment and spacing.
            </p>
            <p>
              The baseline was constructed with <strong className="font-bold text-[#111111]">arbitrary values</strong>{' '}
              (10px, 13px, 15px, and 22px paddings) typical of unconstrained ad-hoc production files. The second
              variant was bound to a strict <strong className="font-bold text-[#111111]">8pt geometric progression</strong>{' '}
              (8px, 16px, 24px, 32px), using white space exclusively to communicate structural grouping and nesting
              hierarchy.
            </p>
          </div>
        </Reveal>

        {/* 02 — Comparison */}
        <section aria-labelledby="spacing-compare" className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-2">
            <SectionEyebrow>02 {'//'} COMPARATIVE SPECIMEN</SectionEyebrow>
            <SectionTitle id="spacing-compare">Before vs After UI Comparison</SectionTitle>
            <p className="font-sans text-[15px] leading-6 text-[#4a4844] md:text-[16px]">
              Live CSS-rendered components demonstrating how spatial rhythm resolves informational noise without
              introducing new surface boundaries.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-8">
            <Reveal>
              <ComparisonCard
                tone="before"
                label="Card A: Arbitrary Spacing"
                status="Uncalibrated"
                noteTitle="Diagnosis:"
                note="Uneven vertical rhythm (13px, 11px, 7px gaps) forces micro-pauses during rapid vertical scanning. Labels compete with adjacent metric blocks due to non-proportional proximity."
              >
                <LedgerCardBefore />
              </ComparisonCard>
            </Reveal>
            <Reveal delay={0.1}>
              <ComparisonCard
                tone="after"
                label="Card B: 8pt Spatial Rhythm"
                status="Standardized"
                noteTitle="Result:"
                note="Instant scannability with zero mental friction. Related parameters cohere naturally via Gestalt proximity, rendering decorative border lines completely redundant."
              >
                <LedgerCardAfter />
              </ComparisonCard>
            </Reveal>
          </div>
        </section>

        {/* 03 — Takeaways */}
        <section aria-labelledby="spacing-takeaways" className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-2">
            <SectionEyebrow>03 {'//'} KEY TAKEAWAYS</SectionEyebrow>
            <SectionTitle id="spacing-takeaways">Observations &amp; What the Artifact Revealed</SectionTitle>
          </Reveal>
          <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TAKEAWAYS.map((item, index) => (
              <Reveal as="li" key={item.n} delay={index * 0.08} className="flex flex-col gap-3 border-t-2 border-[#111111] pt-5">
                <span className="font-display text-[30px] leading-9 font-bold text-[#fa3674]">{item.n}</span>
                <h3 className="font-display text-[20px] leading-7 font-bold text-[#111111]">{item.title}</h3>
                <p className="font-sans text-[14px] leading-[22.75px] text-[#4a4844]">{item.body}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* 04 — Next step */}
        <Reveal as="section" className="flex flex-col gap-6">
          <SectionEyebrow>04 {'//'} NEXT STEP</SectionEyebrow>
          <SectionTitle id="spacing-next">What to Test in the Next Iteration</SectionTitle>
          <p className="font-sans text-[16px] leading-[26px] text-[#4a4844] md:text-[18px] md:leading-7">
            A fixed spacing scale gives individual components a rhythm. A full-page layout also needs rules for how
            its margins and columns change across viewport widths.
          </p>
          <pre className="overflow-x-auto rounded-[12px] bg-[#1a1a1a] p-5 font-mono text-[13px] leading-5 text-[#e8e3da]">
            <code>
              <span className="text-[#baff39]">gap</span>: clamp(1rem, 0.8rem + 1.25vw, 2.5rem);{' '}
              <span className="text-[#8a8a8a]">{'/* Proportional scaling without layout jumps */'}</span>
            </code>
          </pre>
          <p className="font-sans text-[14px] leading-[22.75px] text-[#4a4844]">
            On a follow-up, I’d compare fixed and fluid page spacing at narrow and wide widths and check whether
            related content still reads as a group.
          </p>
        </Reveal>
      </Prose>

      {/* Editorial navigation / next note (Figma 1:759) */}
      <nav aria-label="Journal navigation" className="mt-12 bg-[#eae6de]">
        <Prose className="flex flex-col items-stretch gap-4 py-10 sm:flex-row sm:items-center sm:justify-between md:py-12">
          <Link
            to="/journal"
            className={cx('inline-flex min-h-11 items-center gap-2 font-display text-[12px] leading-4 font-bold tracking-[1.2px] text-[#111111] uppercase hover:text-[#b8004c]', focusRing)}
          >
            <JournalArrow src={`${A}/03145.svg`} />
            Back to Journal
          </Link>
          <Link
            to="/journal/component-states"
            className={cx(
              'group inline-flex min-h-12 items-center justify-center gap-3 bg-[#111111] px-6 py-4 font-display text-[12px] leading-4 font-bold tracking-[1.2px] text-white uppercase transition-colors hover:bg-[#b8004c]',
              focusRing,
            )}
          >
            Next note: Component States
            <JournalArrow src={`${A}/f3113.svg`} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Prose>
      </nav>
    </article>
  );
}
