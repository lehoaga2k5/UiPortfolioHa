import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router';
import { KiteDemoModal } from '../features/kite/KiteDemoModal';
import { KiteDispatchConsole } from '../features/kite/KiteDispatchConsole';

const CORE_PILLARS = [
  {
    num: '01',
    title: 'Adaptive Filter Chips',
    body: 'Replaced cumbersome dropdown trees with active tokenized filter pills with built-in counts. One tap switches states while maintaining instant visibility into total fleet distribution.',
    ruleLabel: 'COMPONENT RULE',
    ruleValue: 'state.active ? bg-primary : bg-surface',
    accent: false,
  },
  {
    num: '02',
    title: 'High-Contrast Semantic Status',
    body: 'Status badges pair color with text and icons. The delay remains labeled when a dispatcher scans the table or reads a monochrome printout.',
    ruleLabel: 'ACCESSIBILITY',
    ruleValue: 'Triple check: Color + Icon + Label',
    accent: true,
  },
  {
    num: '03',
    title: 'Unified Stepper Component',
    body: 'The desktop inspector stacks milestones vertically. The compact view uses a horizontal timeline to keep the stops visible in a shallower panel.',
    ruleLabel: 'RESPONSIVE LAYOUT',
    ruleValue: 'Auto-flex direction: row → column',
    accent: false,
  },
];

const PHASE_TWO_TESTS = [
  {
    num: '01',
    title: 'Network Latency States',
    body: 'Testing how the UI communicates severed connectivity when trucks move through dead zones, including an optimistic local cache state.',
  },
  {
    num: '02',
    title: 'Vim-Style Keystrokes',
    body: 'Integrating full keyboard navigation (J / K to jump rows, / to search) for power dispatchers handling peak hours.',
  },
  {
    num: '03',
    title: 'High-Glare Contrast Mode',
    body: 'Evaluating an ultra-high monochrome contrast preset engineered specifically for outdoor loading dock tablets exposed to direct sun.',
  },
];

export function KiteCasePage() {
  const [demoOpen, setDemoOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  return (
    <article className="bg-[#F7F6F3]" data-node-id="10:673">
      {/* 1. Editorial Hero Header */}
      <section className="mx-auto max-w-[1280px] px-5 pt-8 pb-10 sm:px-8 md:px-12 md:pt-10 md:pb-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/work"
            className="inline-flex min-h-[44px] items-center gap-2 font-mono text-[12px] tracking-[1.2px] text-[#4A4844] uppercase transition-colors hover:text-[#111111]"
          >
            <span>←</span>
            <span>All works</span>
          </Link>
          <span className="rounded-full border border-[#DED9D0] bg-[#F2EFE9] px-3 py-1 font-mono text-[11px] font-medium tracking-[0.55px] text-[#111111] uppercase">
            Case Study · 01
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="relative pl-5 lg:col-span-6">
            <motion.span
              aria-hidden="true"
              className="absolute top-1 bottom-2 left-0 w-[2px] origin-center bg-[#FA3674]"
              animate={prefersReduced ? undefined : { scaleY: [1, 1, 0.84, 1, 1] }}
              transition={{
                duration: 3.48,
                times: [0, 0.0701, 0.35, 0.6799, 1],
                ease: 'easeInOut',
                repeat: Infinity,
              }}
            />
            <h1 className="font-display text-[56px] leading-[1.02] font-bold tracking-[-0.04em] text-[#111111] sm:text-[72px] lg:text-[84px]">
              Kite<span className="text-[#FA3674]">.</span>
            </h1>
            <p className="mt-1 font-display text-[22px] font-medium tracking-[-0.02em] text-[#4A4844] sm:text-[28px]">
              Delivery Tracker
            </p>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-6">
            <p className="text-[17px] leading-[26px] text-[#4A4844] sm:text-[18px]">
              A dispatch dashboard for spotting late shipments and finding the next stop without losing sight of the active manifest.
            </p>

            <dl className="grid grid-cols-2 gap-4 border-y border-[#DED9D0] py-4">
              <div>
                <dt className="font-mono text-[11px] tracking-[1.1px] text-[#68635C] uppercase">
                  Project
                </dt>
                <dd className="mt-0.5 font-display text-[14px] font-bold text-[#111111]">
                  Self-initiated concept · 2026
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] tracking-[1.1px] text-[#68635C] uppercase">
                  Role
                </dt>
                <dd className="mt-0.5 font-display text-[14px] font-bold text-[#111111]">
                  UI Designer
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] tracking-[1.1px] text-[#68635C] uppercase">
                  Scope
                </dt>
                <dd className="mt-0.5 font-display text-[14px] font-bold text-[#111111]">
                  Desktop &amp; tablet dispatch UI
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] tracking-[1.1px] text-[#68635C] uppercase">
                  Data
                </dt>
                <dd className="mt-0.5 font-display text-[14px] font-bold text-[#111111]">
                  Illustrative shipments &amp; route
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* 2. Interactive Dispatch Console + Demo Trigger */}
      <section className="border-y border-[#DED9D0] bg-[#F2EFE9] py-8 md:py-12">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[14px] leading-[21px] text-[#4A4844]">
              Desktop stacks the route milestones. On tablet, one row keeps the shipment status and next action in view.
            </p>
            <a
              href="#layout-comparison"
              className="text-[13px] font-semibold text-[#111111] underline underline-offset-4 hover:text-[#B8004C]"
            >
              Compare desktop and tablet ↓
            </a>
          </div>

          <KiteDispatchConsole onOpenDemo={() => setDemoOpen(true)} />
        </div>
      </section>

      {/* 3. Project Overview & The Challenge */}
      <section className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-[12px] font-bold tracking-[1.2px] text-[#B8004C] uppercase">
              01 / The Challenge
            </p>
            <h2 className="mt-2 font-display text-[30px] leading-[1.12] font-bold tracking-[-0.025em] text-[#111111] sm:text-[36px]">
              Logistics dashboards crumble under high information velocity.
            </h2>
            <motion.div
              className="mt-4 h-1 w-16 origin-left bg-[#FA3674]"
              animate={prefersReduced ? undefined : { scaleX: [1, 1, 1.23, 1, 1] }}
              transition={{
                duration: 3.48,
                times: [0, 0.2951, 0.575, 0.9049, 1],
                ease: 'easeInOut',
                repeat: Infinity,
              }}
            />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-8">
            <p className="text-[17px] leading-[28px] text-[#4A4844] sm:text-[18px]">
              A dispatcher needs to spot late shipments in a dense table, check why the route changed, and see what happens next. I used that task to structure the manifest and the inspector.
            </p>

            <div className="glass-card border border-[#DED9D0] bg-[#F2EFE9]/90 p-6 sm:p-8">
              <p className="font-mono text-[12px] font-bold tracking-[1.2px] text-[#111111] uppercase">
                The Core UI Dilemma
              </p>
              <p className="mt-2 font-display text-[19px] leading-[28px] font-bold text-[#111111] sm:text-[21px]">
                How can a dispatcher isolate delayed shipments without losing sight of the manifest and the selected delivery?
              </p>
            </div>

            <p className="text-[16px] leading-[27px] text-[#4A4844] sm:text-[18px]">
              I designed the same delayed-shipment task for two work contexts: a desktop dashboard with room for the full manifest, and a tablet layout that gives the selected delivery more space.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Three Core Design Decisions */}
      <section className="border-y border-[#DED9D0] bg-[#F2EFE9] py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12">
          <p className="font-mono text-[12px] font-bold tracking-[1.2px] text-[#B8004C] uppercase">
            02 / Design Architecture
          </p>
          <h2 className="mt-2 font-display text-[32px] leading-[1.1] font-bold tracking-[-0.025em] text-[#111111] sm:text-[44px]">
            Three Decisions Behind the Dashboard
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {CORE_PILLARS.map((p) => (
              <div
                key={p.num}
                className="flex flex-col justify-between gap-6 rounded-[18px] border border-[#DED9D0] bg-white p-6 shadow-[4px_4px_0px_#111111] md:rounded-none"
              >
                <div>
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center font-display text-[18px] font-bold ${
                      p.accent ? 'bg-[#FA3674] text-[#111111]' : 'bg-[#111111] text-white'
                    }`}
                  >
                    {p.num}
                  </span>
                  <h3 className="mt-5 font-display text-[20px] font-bold text-[#111111]">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-[22.75px] text-[#4A4844]">
                    {p.body}
                  </p>
                </div>

                <div className="border border-[#DED9D0] bg-[#F7F6F3] p-3.5">
                  <p className="font-mono text-[10px] font-bold tracking-[1px] text-[#111111] uppercase">
                    {p.ruleLabel}
                  </p>
                  <p className="mt-1.5 font-mono text-[12px] font-medium text-[#B8004C]">
                    {p.ruleValue}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Desktop vs Tablet Layout Comparison */}
      <section
        id="layout-comparison"
        className="mx-auto max-w-[1280px] scroll-mt-24 px-5 py-14 sm:px-8 md:px-12 md:py-20"
      >
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[12px] font-bold tracking-[1.2px] text-[#B8004C] uppercase">
              03 / Design Decision
            </p>
            <h2 className="mt-2 font-display text-[30px] leading-[1.12] font-bold tracking-[-0.025em] text-[#111111] sm:text-[36px]">
              One shipment, two layouts
            </h2>
          </div>
          <p className="max-w-[440px] text-[14px] leading-[22px] text-[#4A4844]">
            I kept the route milestones in both layouts. On tablet, a single horizontal row keeps the status and next action in view.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Desktop Vertical Stepper Card */}
          <div className="rounded-[18px] border border-dashed border-[#888888] bg-[#F3F0EA] p-6 lg:col-span-5">
            <div className="flex items-center justify-between border-b border-[#DED9D0] pb-3.5">
              <span className="font-mono text-[12px] font-bold tracking-[0.6px] text-[#111111] uppercase">
                Desktop Inspector
              </span>
              <span className="border border-[#DED9D0] bg-white px-2.5 py-0.5 font-mono text-[11px] text-[#111111]">
                KT-8842-MA
              </span>
            </div>

            <div className="mt-5 rounded-[12px] border border-[#DED9D0] bg-white p-5">
              <div className="flex items-start justify-between border-b border-[#F2EFE9] pb-3">
                <div>
                  <p className="font-mono text-[10px] font-bold tracking-[0.8px] text-[#FF4D30] uppercase">
                    Selected Item Focus
                  </p>
                  <p className="mt-0.5 font-display text-[17px] font-bold text-[#111111]">
                    KT-8842-MA
                  </p>
                  <p className="text-[12px] text-[#555555]">
                    Medical Cold-Chain Package · 4.2 kg
                  </p>
                </div>
                <div className="text-right font-mono text-[11px]">
                  <p className="font-bold text-[#111111]">Beacon ID</p>
                  <p className="text-[#68635C]">BCN-9910-Z</p>
                </div>
              </div>

              <ol className="relative mt-4 space-y-3.5 border-l border-[#DED9D0] pl-5">
                <li className="relative">
                  <span className="absolute -left-[25px] top-1 h-2.5 w-2.5 rounded-full bg-[#111111]" />
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-[13px] font-bold text-[#111111]">
                      Depot Sort &amp; Scanned
                    </span>
                    <span className="font-mono text-[11px] text-[#68635C]">11:15</span>
                  </div>
                  <p className="text-[12px] text-[#555555]">Ha Noi 04 Hub · Bay 03</p>
                </li>
                <li className="relative">
                  <span className="absolute -left-[25px] top-1 h-2.5 w-2.5 rounded-full bg-[#111111]" />
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-[13px] font-bold text-[#111111]">
                      Loaded to Courier #41
                    </span>
                    <span className="font-mono text-[11px] text-[#68635C]">12:30</span>
                  </div>
                  <p className="text-[12px] text-[#555555]">Driver: Nguyen Van Minh</p>
                </li>
                <li className="relative rounded-[8px] border border-[#FF4D30] bg-[#FFF0ED] p-3">
                  <span className="absolute -left-[25px] top-3 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#FF4D30] font-mono text-[9px] font-bold text-white">
                    !
                  </span>
                  <div className="flex items-baseline justify-between font-mono text-[12px] font-bold text-[#FF4D30]">
                    <span>Rerouted — Trang Tien Blockage</span>
                    <span>14:20</span>
                  </div>
                  <p className="mt-0.5 text-[12px] text-[#111111]">
                    Alt-route via Ngo Quyen &amp; Hai Ba Trung · Revised ETA 15:18
                  </p>
                </li>
                <li className="relative opacity-60">
                  <span className="absolute -left-[25px] top-1 h-2.5 w-2.5 rounded-full border border-[#68635C] bg-white" />
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-[13px] font-medium text-[#111111]">
                      Final Consignee Handover
                    </span>
                    <span className="font-mono text-[11px] text-[#68635C]">EST 15:18</span>
                  </div>
                  <p className="text-[12px] text-[#555555]">Nha Hat Lon Drop-off</p>
                </li>
              </ol>
            </div>
          </div>

          {/* Tablet Horizontal Compact View Card */}
          <div className="flex flex-col justify-between rounded-[18px] border border-[#111111] bg-white p-6 shadow-[4px_4px_0px_#111111] lg:col-span-7">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DED9D0] pb-3.5">
                <span className="font-mono text-[12px] font-bold tracking-[0.6px] text-[#111111] uppercase">
                  Tablet Shallow Drawer (Horizontal Stepper)
                </span>
                <span className="rounded-full bg-[#FFE9F0] px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[#B8004C]">
                  +22m Delay · Rerouted
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { step: '01', label: 'Depot Sort', time: '11:15', state: 'done' },
                  { step: '02', label: 'Courier #41', time: '12:30', state: 'done' },
                  { step: '03', label: 'Trang Tien Reroute', time: '14:20', state: 'alert' },
                  { step: '04', label: 'Nha Hat Lon', time: 'ETA 15:18', state: 'next' },
                ].map((m) => (
                  <div
                    key={m.step}
                    className={`rounded-[10px] border p-3 ${
                      m.state === 'alert'
                        ? 'border-[#FF4D30] bg-[#FFF0ED]'
                        : m.state === 'done'
                        ? 'border-[#DED9D0] bg-[#F7F6F3]'
                        : 'border-dashed border-[#DED9D0] bg-white opacity-75'
                    }`}
                  >
                    <span className="font-mono text-[10px] font-bold text-[#68635C]">
                      STEP {m.step}
                    </span>
                    <p className="mt-1 font-display text-[13px] font-bold text-[#111111]">
                      {m.label}
                    </p>
                    <p
                      className={`mt-0.5 font-mono text-[11px] ${
                        m.state === 'alert' ? 'font-bold text-[#FF4D30]' : 'text-[#68635C]'
                      }`}
                    >
                      {m.time}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-[12px] bg-[#F7F6F3] p-4">
                <div>
                  <p className="font-display text-[15px] font-bold text-[#111111]">
                    Next stop: Nha Hat Lon · Revised ETA 15:18
                  </p>
                  <p className="text-[13px] text-[#4A4844]">
                    Keeps both the manifest rows above and the reroute action immediately tappable on a 10.9&quot; tablet.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setDemoOpen(true)}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#111111] px-5 py-2.5 text-[13px] font-semibold text-white transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  Try 3-step demo →
                </button>
              </div>
            </div>

            <p className="mt-5 font-mono text-[11px] text-[#68635C]">
              Map data ©{' '}
              <a
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-[#111111]"
              >
                OpenStreetMap contributors
              </a>{' '}
              · Illustrative fleet telemetry
            </p>
          </div>
        </div>
      </section>

      {/* 6. What I'd Test In Phase Two */}
      <section className="border-t border-[#DED9D0] mx-auto max-w-[1280px] px-5 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-[12px] font-bold tracking-[1.2px] text-[#B8004C] uppercase">
              04 / Future Road
            </p>
            <h2 className="mt-2 font-display text-[30px] leading-[1.12] font-bold tracking-[-0.025em] text-[#111111] sm:text-[36px]">
              What I&apos;d Test In Phase Two
            </h2>
            <p className="mt-3 text-[14px] leading-[22.75px] text-[#4A4844]">
              Self-initiated design concepts require self-critical iteration. Here are the three real-world edge cases scheduled for verification.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:col-span-8">
            {PHASE_TWO_TESTS.map((item) => (
              <div
                key={item.num}
                className="rounded-[16px] border border-[#DED9D0] bg-white p-5 shadow-[3px_3px_0px_#111111] md:rounded-none"
              >
                <span className="font-display text-[24px] font-bold text-[#B8004C]">
                  {item.num}
                </span>
                <h3 className="mt-2 font-display text-[16px] font-bold text-[#111111]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[20px] text-[#4A4844]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Footer Case Navigation */}
      <section className="border-t border-[#DED9D0] bg-[#F2EFE9] py-12 md:py-16">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 px-5 sm:flex-row sm:items-center sm:px-8 md:px-12">
          <div>
            <p className="font-mono text-[12px] tracking-[1.2px] text-[#4A4844] uppercase">
              Next in Portfolio
            </p>
            <h2 className="mt-1 font-display text-[26px] font-bold text-[#111111] sm:text-[30px]">
              Continue to the next case
            </h2>
          </div>

          <div className="flex w-full flex-wrap gap-3.5 sm:w-auto">
            <Link
              to="/work"
              className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-full border border-[#DED9D0] bg-white px-6 py-3.5 font-mono text-[12px] font-bold tracking-[1.2px] text-[#111111] uppercase shadow-[4px_4px_0px_#111111] transition-transform hover:-translate-y-0.5 sm:flex-initial md:rounded-none"
            >
              ← All Work
            </Link>
            <Link
              to="/work/budget-overview"
              className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-full border border-[#111111] bg-[#111111] px-6 py-3.5 font-mono text-[12px] font-bold tracking-[1.2px] text-white uppercase shadow-[4px_4px_0px_#111111] transition-transform hover:-translate-y-0.5 sm:flex-initial md:rounded-none"
            >
              Budget Overview →
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive 4-Step Kite Demo Modal */}
      <KiteDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </article>
  );
}
