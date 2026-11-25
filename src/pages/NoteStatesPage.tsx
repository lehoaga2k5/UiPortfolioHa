import { useState, type ReactNode } from 'react';
import { Link } from 'react-router';
import { motion, useReducedMotion } from 'motion/react';
import type { GlassButtonState } from '../types/portfolio';
import { GlassButton, cx } from '../components/GlassPrimitives';
import { AuroraBackdrop, EASE_OUT_EXPO, Reveal, StaggeredText } from '../components/MotionPrimitives';

const A = '/assets/figma';

const focusRing =
  'focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_rgba(250,54,116,0.85)]';

/* -------------------------------------------------------------------------- */
/*  Small editorial atoms                                                     */
/* -------------------------------------------------------------------------- */

function SectionChip({ children }: { children: ReactNode }) {
  return (
    <span className="w-fit bg-[#eae6de] px-[10px] py-1 font-display text-[12px] leading-4 font-bold tracking-[1.2px] text-[#111111] uppercase">
      {children}
    </span>
  );
}

function SectionTitle({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="font-display text-[26px] leading-8 font-bold tracking-[-0.65px] text-[#111111] md:text-[30px] md:leading-9 md:tracking-[-0.75px]">
      {children}
    </h2>
  );
}

function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-[4px] bg-[#eae6de] px-[6px] py-[1px] font-mono text-[0.85em] text-[#b8004c]">{children}</code>
  );
}

/** GlassButton typography presets (Space Grotesk, uppercase specimens / nav). */
const SPECIMEN_TYPE = 'font-display text-[12px] leading-4 font-bold tracking-[0.6px] uppercase';
const NAV_TYPE = 'font-display text-[12px] leading-4 font-bold tracking-[1.2px] uppercase';

const bodyText ='font-sans text-[16px] leading-[26px] text-[#4a4844] md:text-[18px] md:leading-7';

/* -------------------------------------------------------------------------- */
/*  Cover — Bauhaus / Glass matrix panel (Figma 1:3084)                       */
/* -------------------------------------------------------------------------- */

const COVER_TILES: Array<{ n: string; name: string; caption: string; state: GlassButtonState; label: string }> = [
  { n: '01', name: 'IDLE', caption: 'BASE ANCHOR', state: 'Default', label: 'CONFIRM' },
  { n: '02', name: 'HOVER', caption: 'ELEVATED CUE', state: 'Hover', label: 'CONFIRM' },
  { n: '03', name: 'ACTIVE', caption: 'DEPRESSION -2PX', state: 'Active', label: 'CONFIRM' },
  { n: '04', name: 'FOCUS-VIS', caption: 'DUAL OFFSET RING', state: 'Focus', label: 'CONFIRM' },
  { n: '05', name: 'LOADING', caption: 'ZERO DISPLACEMENT', state: 'Loading', label: 'SYNC' },
];

function StatesCover() {
  return (
    <section aria-label="Canonical state spectrum" className="mx-auto w-full max-w-[1024px] px-5 pb-16 md:px-8 lg:pb-20">
      <Reveal className="relative">
        {/* Ambient Aurora Mesh (Figma 195:843) behind the dark glass */}
        <div aria-hidden="true" className="pointer-events-none absolute -inset-6 overflow-hidden rounded-[28px] opacity-80">
          <AuroraBackdrop variant="mesh" />
        </div>
        <div className="glass-dark relative isolate overflow-hidden rounded-[var(--radius-glass-card)] p-6 sm:p-10 lg:p-12">
          <img src={`${A}/978e4.svg`} alt="" aria-hidden="true" className="pointer-events-none absolute -top-px -left-px z-0 h-[408px] w-full max-w-none object-cover opacity-90" />
          <span aria-hidden="true" className="pointer-events-none absolute right-6 bottom-4 z-0 font-display text-[96px] leading-none font-bold text-[rgba(226,221,212,0.05)] sm:text-[120px]">
            05
          </span>

          <div className="relative z-10 flex flex-col gap-4 border-b border-[rgba(226,221,212,0.2)] pb-8 sm:flex-row sm:items-end sm:justify-between lg:pb-[41px]">
            <div className="flex flex-col gap-2">
              <p className="font-display text-[12px] leading-4 font-bold tracking-[1.2px] text-[#fc0] uppercase">
                {'// CANONICAL STATE SPECTRUM'}
              </p>
              <p className="font-display text-[24px] leading-8 font-bold text-white md:text-[30px] md:leading-9">
                Interactive Specimen Breakdown
              </p>
            </div>
            <p className="flex items-center gap-2 font-display text-[12px] leading-4 tracking-[1.2px] text-white/72 uppercase">
              <span aria-hidden="true" className="size-2 rounded-full bg-[#fc0]" />
              FIGMA STATE EXAMPLES
            </p>
          </div>

          <ul className="relative z-10 grid grid-cols-1 gap-4 pt-8 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-6 lg:pt-10">
            {COVER_TILES.map((tile) => (
              <li
                key={tile.n}
                className="flex min-h-[170px] flex-col items-center justify-between gap-6 rounded-[var(--radius-glass-control)] border border-[var(--color-glass-border-dark)] bg-[var(--color-glass-tile-dark)] p-[21px] shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.18),0_6px_8px_rgba(20,20,26,0.07)] backdrop-blur-[9px]"
              >
                <div className="flex w-full items-center justify-between font-display text-[11px] leading-[16.5px] tracking-[0.55px] uppercase">
                  <span className="text-white/72">{tile.n}</span>
                  <span className="font-semibold text-[#fc0]">{tile.name}</span>
                </div>
                {/* Static specimen — not an actionable control. */}
                <div inert className="pointer-events-none">
                  <GlassButton state={tile.state} typography={SPECIMEN_TYPE}>
                    {tile.label}
                  </GlassButton>
                </div>
                <p className="text-center font-display text-[10px] leading-[15px] tracking-[1px] text-white/72 uppercase">
                  {tile.caption}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Before / After pattern cards (Figma 02 / ARCHITECTURE SHIFT)              */
/* -------------------------------------------------------------------------- */

function CheckItem({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span aria-hidden="true" className={cx('w-3 shrink-0 text-[12px] leading-4 font-semibold', ok ? 'text-[#4d6600]' : 'text-[#c00]')}>
        {ok ? '✓' : '✕'}
      </span>
      <span className="sr-only">{ok ? 'Pass:' : 'Fail:'}</span>
      <p className="font-sans text-[12px] leading-4 text-[#4a4a4a]">{children}</p>
    </li>
  );
}

function PatternCards() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Pattern A */}
      <Reveal className="flex h-full flex-col border border-[#ded9d0] bg-white">
        <div className="flex items-center justify-between border-b border-[#ded9d0] px-5 py-4">
          <p className="font-display text-[12px] leading-4 font-bold tracking-[1.2px] text-[#1a1a1a] uppercase">NAIVE 2-STATE DESIGN</p>
          <p className="font-display text-[11px] leading-[16.5px] tracking-[0.55px] text-[#68635c] uppercase">PATTERN A</p>
        </div>
        <div className="flex flex-1 flex-col gap-5 p-5">
          <div className="flex flex-col items-center gap-3 bg-[#f2efe9] py-8">
            <span className="rounded-[4px] bg-[#1a1a1a] px-5 py-[10px] font-sans text-[13px] leading-4 font-semibold text-white">
              Save Changes
            </span>
            <p className="font-display text-[11px] leading-[16.5px] text-[#68635c]">Only standard hover declared</p>
          </div>
          <ul className="flex flex-col gap-3">
            <CheckItem ok={false}>
              <strong className="font-bold text-[#1a1a1a]">No keyboard focus visibility:</strong> relying on browser
              default 1px blurry chrome outline.
            </CheckItem>
            <CheckItem ok={false}>
              <strong className="font-bold text-[#1a1a1a]">Zero active depression:</strong> provides no tactile
              confirmation when clicked or held on touch devices.
            </CheckItem>
            <CheckItem ok={false}>
              <strong className="font-bold text-[#1a1a1a]">
                The disabled state uses pale text that can be hard to read. Check its legibility separately from how
                the control is announced.
              </strong>
            </CheckItem>
          </ul>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-[#ded9d0] bg-[#fff5f5] px-5 py-3 font-display text-[10px] leading-[15px] tracking-[1px] uppercase">
          <span className="text-[#4a4a4a]">FRAGILITY: HIGH / LAYOUT DISPLACEMENT</span>
          <span className="font-bold text-[#c00]">VULNERABLE</span>
        </div>
      </Reveal>

      {/* Standard B */}
      <Reveal delay={0.1} className="flex h-full flex-col border-2 border-[#111111] bg-white shadow-[6px_6px_0_#fa3674]">
        <div className="flex items-center justify-between border-b border-[#ded9d0] px-5 py-4">
          <p className="font-display text-[12px] leading-4 font-bold tracking-[1.2px] text-[#b8004c] uppercase">COMPLETE 5-STATE SYSTEM</p>
          <p className="font-display text-[11px] leading-[16.5px] tracking-[0.55px] text-[#68635c] uppercase">STANDARD B</p>
        </div>
        <div className="flex flex-1 flex-col gap-5 p-5">
          <div className="flex flex-col items-center gap-3 bg-[#f2efe9] py-8">
            <div inert className="pointer-events-none">
              <GlassButton state="Focus" typography={SPECIMEN_TYPE}>
                SAVE CHANGES
              </GlassButton>
            </div>
            <p className="font-display text-[11px] leading-[16.5px] text-[#68635c]">Two-ring focus treatment</p>
          </div>
          <p className="font-sans text-[12px] leading-4 text-[#4a4a4a]">
            A 2 px light inner ring and a 2 px coral outer ring mark focus. The examples show the treatment on light
            and dark surfaces.
          </p>
          <ul className="flex flex-col gap-3">
            <CheckItem ok>
              <strong className="font-bold text-[#1a1a1a]">Zero-layout-shift async state:</strong> spinner matches
              font cap-height without widening or shortening button dimensions.
            </CheckItem>
            <CheckItem ok>
              <strong className="font-bold text-[#1a1a1a]">Explicit assistive intent:</strong> disabled status pairs{' '}
              <InlineCode>aria-disabled="true"</InlineCode> with tooltip explanations instead of inert abandonment.
            </CheckItem>
          </ul>
        </div>
        <div className="flex flex-col gap-3 border-t border-[#ded9d0] px-5 py-4">
          <p className="font-display text-[10px] leading-[15px] tracking-[1px] text-[#68635c] uppercase">
            FOCUS EXAMPLES / LIGHT AND DARK
          </p>
          <div aria-hidden="true" className="grid grid-cols-2 gap-3">
            <span className="flex h-14 items-center justify-center bg-[#f7f6f3]">
              <span className="rounded-full bg-white px-4 py-2 font-sans text-[11px] font-semibold text-[#111] shadow-[0_0_0_2px_rgba(255,255,255,0.95),0_0_0_4px_rgba(250,54,116,0.85)]">
                Focus
              </span>
            </span>
            <span className="flex h-14 items-center justify-center bg-[#1a1a1a]">
              <span className="rounded-full bg-[#2a2a2e] px-4 py-2 font-sans text-[11px] font-semibold text-white shadow-[0_0_0_2px_rgba(255,255,255,0.95),0_0_0_4px_rgba(250,54,116,0.85)]">
                Focus
              </span>
            </span>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Fallback sandbox (used when no playground is passed in as children)       */
/* -------------------------------------------------------------------------- */

type SandboxState = 'Default' | 'Hover' | 'Focus' | 'Loading' | 'Disabled';

const SANDBOX_CONTROLS: Array<{ state: SandboxState; label: string; dot: string; wide?: boolean }> = [
  { state: 'Default', label: 'DEFAULT', dot: 'bg-[#1a1a1a]' },
  { state: 'Hover', label: 'HOVER', dot: 'bg-[#e63b2e]' },
  { state: 'Focus', label: 'FOCUS DUAL', dot: 'bg-[#05f]' },
  { state: 'Loading', label: 'LOADING', dot: 'bg-[#fc0]' },
  { state: 'Disabled', label: 'DISABLED STATE (MUTED + TOOLTIP)', dot: '', wide: true },
];

function FallbackSandbox() {
  const [state, setState] = useState<SandboxState>('Focus');

  return (
    <div className="glass-card-strong flex flex-col gap-6 p-5 sm:p-[33px]">
      <div className="flex flex-col gap-3 border-b border-[rgba(26,26,26,0.2)] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-display text-[18px] leading-7 font-bold text-[#1a1a1a]">Interactive Component Sandbox</h3>
          <p className="font-sans text-[12px] leading-4 text-[#4a4a4a]">Toggle simulated states on the interactive button instance.</p>
        </div>
        <span className="w-fit rounded-full border border-[var(--color-glass-border-lime)] bg-[var(--color-glass-tint-lime)] px-[10px] py-1 font-display text-[10px] leading-[15px] font-bold tracking-[1px] text-[#111111] uppercase shadow-[0_8px_10px_rgba(18,18,23,0.08)]">
          PROTOTYPE ENGINE
        </span>
      </div>

      <div className="flex flex-col items-stretch gap-6 md:flex-row md:items-center md:justify-between">
        <div className="glass-pressed flex min-h-[140px] flex-1 items-center justify-center rounded-[var(--radius-glass-control)] !bg-[var(--color-glass-surface-subtle)] px-8 py-12 md:max-w-[304px]">
          <GlassButton
            state={state}
            disabledReason="Publishing is unavailable until changes are saved."
            loadingLabel="Publishing changes"
            typography={SPECIMEN_TYPE}
          >
            PUBLISH CHANGES
          </GlassButton>
        </div>

        <div role="group" aria-label="Simulated button state" className="grid grid-cols-2 gap-2 md:w-[300px]">
          {SANDBOX_CONTROLS.map((control) => {
            const pressed = control.state === state;
            return (
              <button
                key={control.state}
                type="button"
                aria-pressed={pressed}
                onClick={() => setState(control.state)}
                className={cx(
                  'flex min-h-11 items-center justify-between gap-3 rounded-[var(--radius-glass-control)] border px-[13px] py-[9px] text-left font-display text-[12px] leading-4 font-bold text-[#1a1a1a] uppercase backdrop-blur-[9px] transition-colors',
                  'shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.78),0_6px_8px_rgba(20,20,26,0.07)]',
                  pressed
                    ? 'border-[var(--color-glass-border-pink)] bg-[var(--color-glass-tint-pink)]'
                    : 'border-[var(--color-glass-border-specular)] bg-[var(--color-glass-surface-strong)] hover:bg-white',
                  control.wide && 'col-span-2',
                  focusRing,
                )}
              >
                <span>{control.label}</span>
                {control.dot ? (
                  <span aria-hidden="true" className={cx('size-2 shrink-0 rounded-full', control.dot)} />
                ) : (
                  <img src={`${A}/b290e.svg`} alt="" aria-hidden="true" className="size-[11.667px] shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
      <p aria-live="polite" className="sr-only">
        Button state: {state}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export function NoteStatesPage({ children }: { children?: ReactNode }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <article aria-labelledby="note-states-title" className="relative overflow-x-clip bg-[#f7f6f3]">
      {/* Article header (Figma 1:3062) */}
      <header className="mx-auto flex w-full max-w-[1024px] flex-col gap-10 px-5 pt-8 pb-12 md:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-b-2 border-[rgba(18,18,18,0.12)] pb-[26px]">
          <Link
            to="/journal"
            className={cx('-ml-2 inline-flex min-h-11 items-center gap-2 rounded-full px-2 font-display text-[12px] leading-4 font-bold tracking-[1.2px] text-[#111111] uppercase hover:text-[#b8004c]', focusRing)}
          >
            <img src={`${A}/69317.svg`} alt="" aria-hidden="true" className="h-[9.333px] w-[12.833px]" />
            Back to Journal
          </Link>
          <div className="flex flex-wrap items-center gap-3 font-display text-[12px] leading-4 tracking-[0.6px] uppercase">
            <span className="glass-pill-pink px-3 py-1 font-semibold text-[#b8004c]">
              PRACTICE NOTE · 03 {'//'} INTERACTION LOGIC
            </span>
            <span className="font-medium text-[#4a4844]">6 MIN READ</span>
            <span aria-hidden="true" className="size-[6px] rounded-full bg-[#fa3674]" />
            <span className="font-medium text-[#4a4844]">SELF-INITIATED STUDY</span>
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-[6px]">
          <p className="font-display text-[12px] leading-4 font-bold tracking-[3px] text-[#b8004c] uppercase">
            INVESTIGATION SERIES — VOL. 04
          </p>
          <StaggeredText
            as="h1"
            id="note-states-title"
            text="Component States"
            className="font-display text-[52px] leading-[54px] font-bold tracking-[-1.3px] text-[#111111] sm:text-[72px] sm:leading-[72px] lg:text-[96px] lg:leading-[96px] lg:tracking-[-2.4px]"
          />
          <motion.span
            aria-hidden="true"
            className="h-1 w-24 origin-left bg-[#fa3674]"
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT_EXPO }}
          />
          <p className="max-w-[768px] pt-2 font-display text-[19px] leading-7 font-medium text-[#111111] md:text-[24px] md:leading-8">
            Each button state tells the user what they can do, what is in progress, or how to recover from an error.
          </p>
        </div>
      </header>

      <StatesCover />

      {/* Article body (Figma 1:3156) */}
      <div className="mx-auto flex w-full max-w-[832px] flex-col gap-16 px-5 pb-24 md:gap-20 md:px-8">
        {/* 01 */}
        <Reveal as="section" className="flex flex-col gap-6">
          <SectionChip>01 / THE PREMISE</SectionChip>
          <SectionTitle id="states-premise">What Was Explored: Testing Component Vulnerability</SectionTitle>
          <p className={bodyText}>
            Interface failures rarely stem from poor typography or uninspired chromatic palettes; they originate when
            designers treat interactive affordances as static snapshots. We design in high-fidelity canvases under
            optimal constraints: lightning-fast fiber connections, zero network latency, and mouse-first ergonomics.
          </p>
          <p className={bodyText}>
            This practice study stressed the standard primary button against real-world degradation vectors:
            keyboard-only tabbing order across low-contrast displays, sudden server-side request latency,
            double-click submissions, and destructive modal confirmation states.
          </p>
          <blockquote className="border-l-4 border-[#fa3674] bg-white/60 py-5 pr-5 pl-6">
            <p className="font-display text-[17px] leading-[27px] font-medium text-[#111111] italic md:text-[19px] md:leading-[29.25px]">
              “When you ignore focus rings and asynchronous delay in the design tool, you are not deferring
              technicalities to developers. You are outsourcing the user’s emotional certainty to chance.”
            </p>
            <footer className="mt-3 font-display text-[12px] leading-4 tracking-[1.2px] text-[#68635c] uppercase">
              — FIELD OBSERVATION, INTERACTION AUDIT
            </footer>
          </blockquote>
        </Reveal>

        {/* 02 */}
        <section aria-labelledby="states-architecture" className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-4">
            <SectionChip>02 / ARCHITECTURE SHIFT</SectionChip>
            <SectionTitle id="states-architecture">Before vs After: The Five-State Architecture</SectionTitle>
            <p className="font-sans text-[15px] leading-6 text-[#4a4844] md:text-[16px]">
              Contrasting standard production habits against an engineered, accessible state contract.
            </p>
          </Reveal>
          <PatternCards />
        </section>

        {/* 03 */}
        <section aria-labelledby="states-analysis" className="flex flex-col gap-6">
          <Reveal className="flex flex-col gap-4">
            <SectionChip>03 / ANALYSIS</SectionChip>
            <SectionTitle id="states-analysis">Observations &amp; What the Artifact Revealed</SectionTitle>
            <p className={bodyText}>Building this matrix surfaced two persistent oversights in common design systems:</p>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Reveal className="flex flex-col gap-3 border-t-2 border-[#111111] bg-white p-6">
              <h3 className="font-display text-[18px] leading-7 font-bold text-[#111111]">01. Dual-Context Rings</h3>
              <p className="font-sans text-[13px] leading-[19.5px] text-[#4a4844]">
                A single-color focus ring fails as soon as the component appears across inverted surfaces (e.g.,
                inside dark footer blocks or bright toast banners). Only a dual-layer ring (an inner offset gap paired
                with a saturated outer halo) passes contrast thresholds across variable surfaces.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="flex flex-col gap-3 border-t-2 border-[#111111] bg-white p-6">
              <h3 className="font-display text-[18px] leading-7 font-bold text-[#111111]">02. State-First Hierarchy</h3>
              <p className="font-sans text-[13px] leading-[19.5px] text-[#4a4844]">
                When Figma or code variants are architected around semantic sizes first (<InlineCode>sm</InlineCode>,{' '}
                <InlineCode>md</InlineCode>, <InlineCode>lg</InlineCode>) instead of behavioral state matrices, teams
                end up with fragile component overrides that break loading transitions in production.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <p className={bodyText}>
              Moreover, tactile feedback on touch viewports requires immediate visual deflation. If touch-action
              styles are tied exclusively to desktop <InlineCode>:hover</InlineCode>, mobile users experience sticky,
              unnatural highlight behaviors that degrade perceived response speed.
            </p>
          </Reveal>
        </section>

        {/* 04 */}
        <Reveal as="section" className="flex flex-col gap-6">
          <SectionChip>04 / FORWARD VECTOR</SectionChip>
          <SectionTitle id="states-next">What to Test in the Next Iteration</SectionTitle>
          <p className={bodyText}>
            The next experimental build will focus on dynamic physics-based spring curves to replace standard linear
            CSS cubic-beziers. Specifically, testing whether an instant 60ms spring compression on{' '}
            <InlineCode>:active</InlineCode> with an intentional 140ms overshoot recovery alters cognitive perception
            of server latency during data writes.
          </p>
          <p className={bodyText}>
            I will also stress-test whether optimistic UI confirmations (rendering completion before the HTTP
            round-trip concludes) should be embedded into the component itself or managed at the page routing
            boundary.
          </p>
          <ul aria-label="Motion parameters" className="flex flex-wrap gap-2">
            {['SPRING: STIFFNESS 400', 'DAMPING 28', 'TARGET RESPONSE: <100MS'].map((chip) => (
              <li
                key={chip}
                className="border border-[#fa3674]/40 bg-[#ffe9f0] px-3 py-1 font-display text-[11px] leading-[16.5px] font-bold tracking-[0.55px] text-[#b8004c] uppercase"
              >
                {chip}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Interactive playground slot */}
        <section aria-label="Interactive component playground" className="relative">
          <AuroraBackdrop variant="soft" />
          <div className="relative">{children ?? <FallbackSandbox />}</div>
        </section>

        {/* Bottom navigation (Figma 1:3349) */}
        <nav
          aria-label="Journal navigation"
          className="flex flex-col gap-4 border-t-2 border-[rgba(18,18,18,0.12)] pt-10 sm:flex-row sm:items-center sm:justify-between md:pt-[50px]"
        >
          <GlassButton to="/journal" variant="light" typography={NAV_TYPE}>
            ← Back to Journal
          </GlassButton>
          <GlassButton
            to="/journal/spacing-and-hierarchy"
            variant="dark"
            icon={<img src={`${A}/f3113.svg`} alt="" className="size-[10.667px]" />}
            typography={NAV_TYPE}
          >
            Next note: Spacing and Hierarchy
          </GlassButton>
        </nav>
      </div>
    </article>
  );
}
