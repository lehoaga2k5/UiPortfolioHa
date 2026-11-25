import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router';
import { BudgetInteractive } from '../features/budget/BudgetInteractive';

const READING_ORDER = [
  {
    title: 'Cash on hand',
    body: 'Put the balance, runway estimate, and monthly burn at the top so they can be read together.',
  },
  {
    title: 'What could change',
    body: 'Compare the baseline with a higher-billing scenario on the same timeline.',
  },
  {
    title: 'Where the money went',
    body: 'Keep recent transactions beneath the forecast so an unexpected change can be checked against actual activity.',
  },
];

export function BudgetCasePage() {
  const prefersReduced = useReducedMotion();

  return (
    <article className="bg-[#F7F6F3]" data-node-id="1:2060">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-12 px-5 py-8 sm:px-8 md:gap-16 md:px-12 md:py-12">
        {/* 1. Project Introduction */}
        <header className="relative flex flex-col items-start gap-6">
          <Link
            to="/work"
            className="inline-flex min-h-[44px] items-center rounded-[10px] border border-[#DED9D0] bg-white px-4 py-2.5 text-[14px] font-semibold text-[#111111] transition-colors hover:bg-[#F2EFE9]"
          >
            ← All work
          </Link>

          <div className="flex flex-col gap-3">
            <p className="text-[12px] font-semibold tracking-[0.8px] text-[#B8004C] uppercase">
              Self-Initiated Concept · 2026
            </p>
            <h1 className="font-display text-[44px] leading-[1.05] font-bold tracking-[-0.03em] text-[#111111] sm:text-[68px] lg:text-[86px]">
              Budget Overview
            </h1>
            <p className="max-w-[755px] text-[17px] leading-[28px] text-[#4A4844] sm:text-[22px] sm:leading-[34px]">
              A cash runway dashboard for independent studios deciding what they can afford before the next payment lands.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2 text-[12px] font-semibold tracking-[0.4px] text-[#68635C] uppercase">
            <span>Role · UI Design</span>
            <span>Scope · Desktop Dashboard + Mobile</span>
            <span>Data · Illustrative</span>
          </div>

          <motion.div
            aria-hidden="true"
            className="h-[2px] w-[74px] origin-center rounded-full bg-[#4D6600]"
            animate={prefersReduced ? undefined : { scaleX: [1, 1, 0.52, 1, 1] }}
            transition={{
              duration: 3.82,
              times: [0, 0.1, 0.35, 0.6301, 1],
              ease: 'easeInOut',
              repeat: Infinity,
            }}
          />
        </header>

        {/* 2. Interactive Desktop Dashboard + Responsive Mobile Switcher */}
        <BudgetInteractive />

        {/* 3. The Design Decision */}
        <section className="grid grid-cols-1 items-start gap-10 py-2 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-3 lg:col-span-6">
            <p className="text-[12px] font-semibold tracking-[0.8px] text-[#B8004C] uppercase">
              Design Question
            </p>
            <h2 className="font-display text-[30px] leading-[1.14] font-bold text-[#111111] sm:text-[42px]">
              How long can the studio cover expenses?
            </h2>
            <p className="max-w-[490px] text-[16px] leading-[26px] text-[#4A4844] sm:text-[17px]">
              Before taking on another recurring cost, a studio owner needs a quick estimate of runway and a way to see which assumptions could change it.
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-6">
            {READING_ORDER.map((item) => (
              <div
                key={item.title}
                className="border-b border-[#DED9D0] pb-4"
              >
                <h3 className="font-display text-[19px] font-bold text-[#111111]">
                  {item.title}
                </h3>
                <p className="mt-1 text-[15px] leading-[24px] text-[#4A4844]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. UI Component Breakdown */}
        <section className="flex flex-col gap-5">
          <h2 className="font-display text-[28px] leading-[1.15] font-bold text-[#111111] sm:text-[34px]">
            The pieces behind the mobile views
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {/* Sample 1: Period & View */}
            <div className="glass-card flex flex-col justify-between gap-4 bg-white/85 p-6">
              <div>
                <h3 className="font-display text-[20px] font-bold text-[#111111]">
                  Period &amp; view
                </h3>
                <p className="mt-1.5 text-[14px] leading-[22px] text-[#4A4844]">
                  The selected month stays visible as readers switch between views.
                </p>
              </div>
              <div className="flex flex-col gap-2.5 pt-2">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#F2EFE9] px-3 py-1.5 text-[12px] font-semibold text-[#111111]">
                  <img src="/assets/figma/47ae2.svg" alt="" className="h-4 w-4" />
                  <span>May 2025</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 rounded-[14px] border border-white/85 bg-white/60 p-1 shadow-xs">
                  <span className="flex h-9 items-center justify-center gap-1.5 rounded-[12px] border border-[#9EE01F]/55 bg-[#BAFF39]/40 text-[12px] font-semibold text-[#111111]">
                    <img src="/assets/figma/d9fc0.svg" alt="" className="h-4 w-4" />
                    Runway
                  </span>
                  <span className="flex h-9 items-center justify-center gap-1.5 rounded-[12px] text-[12px] font-semibold text-[#68635C]">
                    <img src="/assets/figma/64b6a.svg" alt="" className="h-4 w-4" />
                    Spending
                  </span>
                  <span className="flex h-9 items-center justify-center gap-1.5 rounded-[12px] text-[12px] font-semibold text-[#68635C]">
                    <img src="/assets/figma/4ccd1.svg" alt="" className="h-4 w-4" />
                    Activity
                  </span>
                </div>
              </div>
            </div>

            {/* Sample 2: Forecast Chart */}
            <div className="glass-card flex flex-col justify-between gap-4 bg-white/85 p-6">
              <div>
                <h3 className="font-display text-[20px] font-bold text-[#111111]">
                  Forecast chart
                </h3>
                <p className="mt-1.5 text-[14px] leading-[22px] text-[#4A4844]">
                  The solid and dashed lines separate the two billing assumptions.
                </p>
              </div>
              <div className="relative h-[96px] w-full overflow-hidden rounded-[10px] bg-[#F7F6F3] p-3">
                <div className="absolute inset-x-3 top-4 h-px bg-[#E6E3DC]" />
                <div className="absolute inset-x-3 top-12 h-px bg-[#E6E3DC]" />
                <div className="absolute inset-x-3 top-20 h-px bg-[#E6E3DC]" />
                <img
                  src="/assets/figma/96590.svg"
                  alt="Baseline solid forecast trend"
                  className="absolute inset-x-3 top-6 h-[56px] w-[calc(100%-24px)]"
                />
                <img
                  src="/assets/figma/15860.svg"
                  alt="Higher billings dashed forecast trend"
                  className="absolute inset-x-3 top-2 h-[50px] w-[calc(100%-24px)]"
                />
              </div>
            </div>

            {/* Sample 3: Category Row */}
            <div className="glass-card flex flex-col justify-between gap-4 bg-white/85 p-6">
              <div>
                <h3 className="font-display text-[20px] font-bold text-[#111111]">
                  Category row
                </h3>
                <p className="mt-1.5 text-[14px] leading-[22px] text-[#4A4844]">
                  The dollar amount and limit explain the progress bar clearly at a glance.
                </p>
              </div>
              <div className="rounded-[12px] border border-[#DED9D0] bg-[#F7F6F3] p-3.5">
                <div className="flex items-baseline justify-between text-[13px]">
                  <span className="font-semibold text-[#111111]">Contractors &amp; Design</span>
                  <span className="font-mono text-[12px] font-semibold text-[#111111]">
                    $4,200 / $5,000
                  </span>
                </div>
                <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-[#DED9D0]">
                  <div className="h-full w-[84%] rounded-full bg-[#111111]" />
                </div>
                <p className="mt-1.5 text-[11px] text-[#68635C]">84% of monthly category budget</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Validation Plan */}
        <section className="rounded-[18px] border border-[#DED9D0] bg-white p-6 sm:p-8">
          <p className="text-[12px] font-semibold tracking-[0.8px] text-[#B8004C] uppercase">
            What I’d Test Next
          </p>
          <h2 className="mt-2 font-display text-[26px] leading-[1.15] font-bold text-[#111111] sm:text-[36px]">
            Can someone explain the runway back to me?
          </h2>
          <p className="mt-2.5 max-w-[920px] text-[15px] leading-[25px] text-[#4A4844] sm:text-[16px]">
            Ask a studio owner to find the baseline runway, tell the two forecasts apart, and find the spending category closest to its limit. Repeat the task on desktop and mobile to see where the hierarchy breaks down.
          </p>
        </section>

        {/* 6. Case Navigation */}
        <nav
          aria-label="Case study pagination"
          className="flex flex-wrap items-center justify-between gap-3 pt-2"
        >
          <Link
            to="/work"
            className="inline-flex min-h-[46px] items-center justify-center rounded-[10px] border border-[#DED9D0] bg-white px-4 py-2.5 text-[14px] font-semibold text-[#111111] transition-colors hover:bg-[#F2EFE9]"
          >
            ← All work
          </Link>
          <Link
            to="/work/reminder-flow"
            className="inline-flex min-h-[46px] items-center justify-center rounded-[10px] border border-[#111111] bg-[#111111] px-5 py-2.5 text-[14px] font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Next: Reminder Flow →
          </Link>
        </nav>
      </div>
    </article>
  );
}
