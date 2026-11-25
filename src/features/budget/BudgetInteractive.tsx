import { useId, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const asset = '/assets/figma/';
const views = ['Overview', 'Forecast', 'Activity'] as const;
type View = (typeof views)[number];

const scenarios = ['Baseline', 'Higher billings'] as const;
const categories = ['All transactions', 'Payment received', 'Operating expense'] as const;
const transactions = [
  { description: 'Brand architecture retainer', date: 'May 18, 2025', type: 'Payment received', amount: '+$24,500.00' },
  { description: 'Cloud infrastructure', date: 'May 16, 2025', type: 'Operating expense', amount: '−$1,840.12' },
  { description: 'Design system workshop', date: 'May 14, 2025', type: 'Payment received', amount: '+$4,200.00' },
] as const;
const spending = [
  { label: 'People & contractors', amount: '$6,400.00', limit: '$7,500', progress: 85.33 },
  { label: 'Tools & cloud', amount: '$1,840.12', limit: '$2,500', progress: 73.6 },
  { label: 'Studio operations', amount: '$1,580.28', limit: '$2,000', progress: 79.01 },
] as const;

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4d6600]';

function Icon({ file }: { file: string }) {
  return <img src={asset + file} alt="" className="size-[18px] shrink-0" />;
}

export function BudgetInteractive() {
  const [view, setView] = useState<View>('Overview');
  const [scenario, setScenario] = useState<(typeof scenarios)[number]>('Baseline');
  const [category, setCategory] = useState<(typeof categories)[number]>('All transactions');
  const reduceMotion = useReducedMotion();
  const id = useId();
  const baseline = scenario === 'Baseline';
  const runway = baseline ? '18.8 months' : '22.4 months';
  const matching = transactions.filter((transaction) => category === 'All transactions' || transaction.type === category);

  function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = views.length - 1;
    const target = { ArrowLeft: (index + last) % views.length, ArrowRight: (index + 1) % views.length, Home: 0, End: last }[event.key];
    if (target === undefined) return;
    event.preventDefault();
    setView(views[target]);
    event.currentTarget.parentElement?.querySelectorAll('button')[target]?.focus();
  }

  return (
    <section aria-label="Studio Acme Cash Overview dashboard" className="@container min-w-0">
      <div className="overflow-hidden rounded-[15px] border border-[#dfded9] bg-portfolio-neutral shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
        <header className="flex flex-wrap items-center justify-between gap-2 bg-[#111] px-3 py-3 text-white @min-[660px]:px-8">
          <div className="flex items-center gap-2.5 text-[15px] font-semibold">
            <span aria-hidden className="grid size-8 place-items-center rounded-lg bg-portfolio-tertiary font-display text-xl font-bold text-[#111]">A</span>
            Studio Acme
          </div>
          <span className="text-xs text-[#d5d5cb]">USD · Sample data</span>
        </header>

        <div className="space-y-4 p-3 @min-[660px]:px-8 @min-[660px]:py-6">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="font-display text-[clamp(1.5rem,4vw,2rem)] font-bold">Cash overview</h3>
              <p className="text-sm text-[#5e5e58]">Runway, projected cash balance, and recent activity.</p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-lg bg-white px-2.5 py-1.5 text-xs font-semibold"><Icon file="47ae2.svg" />May 2025</span>
          </div>

          <div role="tablist" aria-label="Cash overview views" className="glass-pill grid grid-cols-3 gap-1 p-1 @min-[660px]:hidden">
            {views.map((label, index) => (
              <button
                key={label}
                type="button"
                role="tab"
                id={`${id}-tab-${label}`}
                aria-selected={view === label}
                aria-controls={`${id}-view-${label}`}
                tabIndex={view === label ? 0 : -1}
                onClick={() => setView(label)}
                onKeyDown={(event) => navigateTabs(event, index)}
                className={`min-h-11 min-w-0 rounded-full px-1 text-xs font-semibold aria-selected:bg-[#111] aria-selected:text-white ${focus}`}
              >{label}</button>
            ))}
          </div>

          <div id={`${id}-view-Overview`} role="tabpanel" aria-labelledby={`${id}-tab-Overview`} className={view === 'Overview' ? '' : 'hidden @min-[660px]:block'}>
            <div className="grid grid-cols-2 gap-2 @min-[660px]:grid-cols-[1.2fr_1fr_1fr] @min-[660px]:gap-4">
              <div className="col-span-2 space-y-1 rounded-[14px] bg-[#111] p-3 text-white @min-[660px]:col-span-1 @min-[660px]:p-4">
                <h4 className="flex items-center gap-2 text-sm font-semibold"><Icon file="7453b.svg" />Projected runway</h4>
                <p className="font-display text-2xl leading-tight font-bold text-portfolio-tertiary" aria-live="polite">{runway}</p>
                <p className="text-xs text-[#e0ddd5]">{baseline ? 'Baseline estimate through Nov 2026' : 'Higher billings scenario'}</p>
              </div>
              <div className="glass-card min-w-0 space-y-1 p-2.5 @min-[660px]:p-4">
                <h4 className="flex items-center gap-1.5 text-xs font-semibold @min-[660px]:text-sm"><Icon file="8fc0b.svg" />Cash on hand</h4>
                <p className="font-display text-[clamp(1rem,3vw,1.5rem)] font-bold tabular-nums">$184,492.00</p>
                <p className="text-xs text-[#5e5e58]">Across 3 accounts</p>
              </div>
              <div className="glass-card min-w-0 space-y-1 p-2.5 @min-[660px]:p-4">
                <h4 className="flex items-center gap-1.5 text-xs font-semibold @min-[660px]:text-sm"><Icon file="81371.svg" />Monthly burn</h4>
                <p className="font-display text-[clamp(1rem,3vw,1.5rem)] font-bold tabular-nums">$9,820.40</p>
                <p className="text-xs text-[#5e5e58]">Fixed and variable expenses</p>
              </div>
            </div>
            <div className="glass-card mt-3 space-y-3 p-3 @min-[660px]:hidden">
              <h4 className="flex items-center gap-2 font-display text-lg font-bold"><Icon file="64b6a.svg" />Spending by category</h4>
              <p className="text-sm"><strong>82% used</strong> · $2,179.60 left of $12,000 planned</p>
              <ul className="space-y-3">
                {spending.map(({ label, amount, limit, progress }) => (
                  <li key={label} className="space-y-1">
                    <p className="flex flex-wrap justify-between gap-x-2 text-xs"><strong>{label}</strong><span>{amount} of {limit} planned</span></p>
                    <div role="meter" aria-label={label} aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-valuetext={`${amount} of ${limit} planned`} className="h-1.5 rounded-full bg-[#eae6de]">
                      <div style={{ width: `${progress}%` }} className="h-full rounded-full bg-[#638019]" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div id={`${id}-view-Forecast`} role="tabpanel" aria-labelledby={`${id}-tab-Forecast`} className={view === 'Forecast' ? '' : 'hidden @min-[660px]:block'}>
            <figure className="space-y-3 rounded-[14px] border border-[#dfded9] bg-white p-3 @min-[660px]:px-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <figcaption>
                  <h4 className="flex items-center gap-2 font-display text-xl font-bold"><Icon file="3ad6e.svg" />Cash balance forecast</h4>
                  <p className="mt-1 text-xs text-[#5e5e58]">Illustrative month-end balances · May–Dec 2025</p>
                </figcaption>
                <div role="group" aria-label="Billing scenario" className="flex flex-wrap gap-1.5">
                  {scenarios.map((option) => (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={option === scenario}
                      onClick={() => setScenario(option)}
                      className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border border-portfolio-line px-2.5 text-xs font-semibold aria-pressed:border-[#4d6600] aria-pressed:bg-[#eff7df] ${focus}`}
                    >
                      <span aria-hidden className={`w-4 border-t-2 ${option === 'Baseline' ? 'border-[#4d6600]' : 'border-dashed border-[#111]'}`} />
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <p aria-live="polite" className="text-sm @min-[660px]:hidden">Projected runway · <strong>{runway}</strong></p>
              <div aria-hidden className="grid grid-cols-[auto_minmax(0,1fr)] gap-2 pt-2 pr-1 pb-1 text-[10px] text-[#66665c]">
                <div className="flex h-[clamp(7rem,18vw,9rem)] flex-col justify-between">
                  {['$220k', '$210k', '$200k', '$190k', '$180k'].map((label) => <span key={label} className="leading-none">{label}</span>)}
                </div>
                <div className="min-w-0">
                  <div className="relative mt-[5px] h-[calc(clamp(7rem,18vw,9rem)-10px)]">
                    <div className="absolute inset-0 flex flex-col justify-between">
                      {Array.from({ length: 5 }, (_, index) => <span key={index} className="border-t border-[#dfded9]" />)}
                    </div>
                    <img src={asset + '379b4.svg'} alt="" className={`absolute top-[32%] left-0 h-[57%] w-full object-fill transition-opacity motion-reduce:transition-none ${baseline ? 'opacity-100' : 'opacity-35'}`} />
                    <img src={asset + 'a6917.svg'} alt="" className={`absolute top-[10%] left-0 h-[79%] w-full object-fill transition-opacity motion-reduce:transition-none ${baseline ? 'opacity-45' : 'opacity-100'}`} />
                    <motion.img
                      key={scenario}
                      src={asset + (baseline ? '2550a.svg' : 'a6917.svg')}
                      alt=""
                      className={`absolute left-0 w-full object-fill ${baseline ? 'top-[32%] h-[57%]' : 'top-[10%] h-[79%]'}`}
                      initial={reduceMotion ? false : { clipPath: 'inset(0 100% 0 0)' }}
                      animate={{ clipPath: 'inset(0 0% 0 0)' }}
                      transition={{ duration: reduceMotion ? 0 : 0.65, ease: 'easeOut' }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between gap-1">
                    {['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                      <span key={month} className={index === 0 || index === 4 || index === 7 ? '' : 'hidden @min-[440px]:inline'}>{month}</span>
                    ))}
                  </div>
                </div>
              </div>
            </figure>
          </div>

          <div id={`${id}-view-Activity`} role="tabpanel" aria-labelledby={`${id}-tab-Activity`} className={view === 'Activity' ? '' : 'hidden @min-[660px]:block'}>
            <div className="space-y-3 rounded-[14px] border border-[#dfded9] bg-white p-3 @min-[660px]:px-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="flex items-center gap-2 font-display text-xl font-bold"><Icon file="4ccd1.svg" />Recent activity</h4>
                  <p className="text-xs text-[#5e5e58]">May 14–18, 2025</p>
                </div>
                <label className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                  Category
                  <select value={category} onChange={(event) => setCategory(event.target.value as typeof category)} className={`min-h-11 max-w-full rounded-lg border border-portfolio-line bg-white px-2 text-xs ${focus}`}>
                    {categories.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </label>
              </div>
              <ul aria-label="Transactions" className="space-y-1.5">
                <li aria-hidden className="hidden grid-cols-[2fr_1fr_1.3fr_1fr] gap-2 px-2 py-1 text-xs font-semibold text-[#5e5e58] @min-[660px]:grid">
                  <span>Description</span><span>Date</span><span>Type</span><span className="text-right">Amount</span>
                </li>
                {matching.map(({ description, date, type, amount }) => (
                  <li key={description} className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-2 rounded-lg border border-[#eeece7] bg-[#faf9f6] p-2 text-xs @min-[660px]:grid-cols-[2fr_1fr_1.3fr_1fr] @min-[660px]:items-center @min-[660px]:text-[13px]">
                    <strong>{description}</strong>
                    <span className="col-start-1 row-start-2 text-[#5e5e58] @min-[660px]:col-start-2 @min-[660px]:row-start-1">{date}</span>
                    <span className="col-start-1 row-start-3 text-[#5e5e58] @min-[660px]:col-start-3 @min-[660px]:row-start-1">{type}</span>
                    <strong className="col-start-2 row-start-1 text-right tabular-nums @min-[660px]:col-start-4">{amount}</strong>
                  </li>
                ))}
              </ul>
              <p className="sr-only" role="status">{matching.length} sample transactions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
