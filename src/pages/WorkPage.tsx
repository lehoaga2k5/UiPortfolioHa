import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { motion, useReducedMotion } from 'motion/react';
import { Reveal, StaggeredText, EASE_OUT_QUINT, EASE_IN_OUT_FIGMA, loopTransition } from '../components/MotionPrimitives';
import { BudgetCover, FitArtboard, KiteCover, ReminderCover } from './HomePage';

const A = '/assets/figma';

/* -------------------------------------------------------------------------- */
/*  Component States specimen cover (Figma 25:742)                            */
/* -------------------------------------------------------------------------- */

interface SpecimenTile {
  index: string;
  name: string;
  caption: string[];
  button: ReactNode;
}

const specimenButtonBase =
  'inline-flex items-center justify-center rounded-[1.5px] border-[1.5px] px-[16px] py-[9px] font-display text-[9px] leading-3 font-bold tracking-[0.45px] uppercase text-[#1a1a1a]';

const SPECIMEN_TILES: SpecimenTile[] = [
  {
    index: '01',
    name: 'IDLE',
    caption: ['BASE ANCHOR'],
    button: (
      <span className={`${specimenButtonBase} border-[#f5f0e8] bg-[#f5f0e8] shadow-[2.25px_2.25px_0_#fc0]`}>
        CONFIRM
      </span>
    ),
  },
  {
    index: '02',
    name: 'HOVER',
    caption: ['ELEVATED CUE'],
    button: (
      <span className={`${specimenButtonBase} -translate-x-[1px] -translate-y-[1px] border-[#fc0] bg-white shadow-[3.5px_3.5px_0_#fc0]`}>
        CONFIRM
      </span>
    ),
  },
  {
    index: '03',
    name: 'ACTIVE',
    caption: ['DEPRESSION -2PX'],
    button: (
      <span className={`${specimenButtonBase} translate-x-[2px] translate-y-[2px] border-[#e8e3da] bg-[#e8e3da]`}>
        CONFIRM
      </span>
    ),
  },
  {
    index: '04',
    name: 'FOCUS-VIS',
    caption: ['DUAL OFFSET RING'],
    button: (
      <span className={`${specimenButtonBase} border-[#f5f0e8] bg-[#f5f0e8] shadow-[0_0_0_2px_#1a1a1a,0_0_0_4px_#fa3674]`}>
        CONFIRM
      </span>
    ),
  },
  {
    index: '05',
    name: 'LOADING',
    caption: ['ZERO', 'DISPLACEMENT'],
    button: (
      <span className={`${specimenButtonBase} gap-[6px] border-[#e8e3da] bg-[#e8e3da] px-[12px]`}>
        <img src={`${A}/c2cef.svg`} alt="" className="size-[10.5px] animate-spin motion-reduce:animate-none" />
        SYNC
      </span>
    ),
  },
];

/** Bauhaus "Interactive Specimen Breakdown" artboard. 560×250. */
export function ComponentStatesArtboard() {
  return (
    <div className="relative isolate h-[250px] w-[560px] overflow-hidden rounded-[6px] bg-[#1a1a1a] p-[30px] shadow-[6px_6px_0_#e63b2e]">
      <span aria-hidden="true" className="absolute top-[18px] right-[72px] font-display text-[90px] leading-[90px] font-bold text-[rgba(226,221,212,0.05)]">
        05
      </span>
      <span aria-hidden="true" className="absolute -right-6 -bottom-6 size-[180px] rounded-[9px] border-[3px] border-[rgba(226,221,212,0.1)]" />

      <div className="relative flex items-end justify-between border-b border-[rgba(226,221,212,0.2)] pb-[22px]">
        <div className="flex flex-col gap-[5px]">
          <p className="font-display text-[8px] leading-[11px] font-bold tracking-[0.8px] text-[#fc0] uppercase">
            {'// CANONICAL STATE SPECTRUM'}
          </p>
          <p className="font-display text-[20px] leading-6 font-bold text-white">Interactive Specimen Breakdown</p>
        </div>
        <p className="flex items-center gap-[5px] font-display text-[8px] leading-[11px] tracking-[0.8px] text-[#8a8a8a] uppercase">
          <span className="size-[5px] rounded-full bg-[#fc0]" />
          FIGMA STATE EXAMPLES
        </p>
      </div>

      <div className="relative flex gap-[14px] pt-[22px]">
        {SPECIMEN_TILES.map((tile) => (
          <div
            key={tile.index}
            className="flex min-h-[112px] flex-1 flex-col items-center justify-between gap-3 rounded-[3px] border-[0.75px] border-[rgba(226,221,212,0.1)] bg-white/5 p-[12px]"
          >
            <div className="flex w-full items-center justify-between font-display text-[7.5px] leading-[11px] tracking-[0.4px] uppercase">
              <span className="text-[#8a8a8a]">{tile.index}</span>
              <span className="font-semibold text-[#fc0]">{tile.name}</span>
            </div>
            {tile.button}
            <p className="text-center font-display text-[6.75px] leading-[10px] tracking-[0.7px] text-[#8a8a8a] uppercase">
              {tile.caption.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComponentStatesCover() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f2efe9]">
      <div className="absolute inset-x-[4.5%] inset-y-[10%]">
        <FitArtboard width={566} height={256}>
          <ComponentStatesArtboard />
        </FitArtboard>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Work grid                                                                 */
/* -------------------------------------------------------------------------- */

interface WorkItem {
  key: string;
  to: string;
  title: string;
  meta: string;
  description: string;
  cover: ReactNode;
  coverTimes: number[];
}

const WORK_ITEMS: WorkItem[] = [
  {
    key: 'kite',
    to: '/work/kite',
    title: 'Kite',
    meta: 'Web app · 2026',
    description: 'Filter shipments and review delays without leaving the dispatch table.',
    cover: <KiteCover />,
    coverTimes: [0, 0.1233, 0.3425, 0.6301, 1],
  },
  {
    key: 'reminder',
    to: '/work/reminder-flow',
    title: 'Reminder Flow',
    meta: 'Mobile app · 2026',
    description: 'Check what’s due, log a dose, or snooze the reminder.',
    cover: <ReminderCover />,
    coverTimes: [0, 0.3425, 0.5616, 0.8493, 1],
  },
  {
    key: 'budget',
    to: '/work/budget-overview',
    title: 'Budget Overview',
    meta: 'Web app · 2026',
    description: 'See how income and costs affect cash runway.',
    cover: <BudgetCover padding={0.07} />,
    coverTimes: [0, 0.2329, 0.4521, 0.7397, 1],
  },
  {
    key: 'states',
    to: '/journal/component-states',
    title: 'Component States',
    meta: 'Practice note · 2026',
    description: 'A study of how buttons signal progress, failure, and recovery.',
    cover: <ComponentStatesCover />,
    coverTimes: [0, 0.1449, 0.4249, 0.7551, 1],
  },
];

function WorkCard({ item, index, reduce }: { item: WorkItem; index: number; reduce: boolean }) {
  return (
    <Reveal as="li" delay={(index % 2) * 0.08}>
      <Link
        to={item.to}
        className="group block rounded-[24px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fa3674]"
      >
        <div className="relative overflow-hidden rounded-[24px] border border-black/5 bg-[#eae6de] p-px shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_22px_44px_-16px_rgba(20,20,26,0.2)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[23px] bg-[#f2efe9] sm:aspect-[592/430]">
            <motion.div
              className="absolute inset-0"
              animate={reduce ? undefined : { scale: [1, 1, 1.03, 1, 1] }}
              transition={loopTransition(item.coverTimes, [EASE_IN_OUT_FIGMA, EASE_OUT_QUINT, 'easeInOut', 'easeInOut'])}
            >
              {item.cover}
            </motion.div>
          </div>
          <span className="pointer-events-none absolute inset-[-1px] rounded-[24px] border border-white/85 opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        <div className="flex items-baseline justify-between gap-4 pt-4 pb-[6px]">
          <h2 className="font-sans text-[20px] leading-7 font-bold tracking-[-0.5px] text-[#111111] transition-colors group-hover:text-[#b8004c]">
            {item.title}
          </h2>
          <p className="shrink-0 font-sans text-[14px] leading-5 font-medium text-[#68635c]">{item.meta}</p>
        </div>
        <p className="font-sans text-[15px] leading-[24.38px] text-[#4a4844]">{item.description}</p>
      </Link>
    </Reveal>
  );
}

export function WorkPage() {
  const reduce = useReducedMotion() ?? false;
  return (
    <div className="bg-[#f7f6f3]">
      <section aria-labelledby="work-title" className="mx-auto max-w-[1280px] px-5 pt-10 pb-16 md:px-8 lg:px-12 lg:pt-16 lg:pb-24">
        <header className="flex items-center justify-between">
          <StaggeredText
            as="h1"
            id="work-title"
            text="Selected works"
            className="font-sans text-[34px] leading-10 font-bold tracking-[-0.85px] text-[#111111] md:text-[42px] md:tracking-[-1.05px]"
          />
        </header>

        <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 md:mt-12 md:grid-cols-2 md:gap-y-16">
          {WORK_ITEMS.map((item, index) => (
            <WorkCard key={item.key} item={item} index={index} reduce={reduce} />
          ))}
        </ul>
      </section>
    </div>
  );
}
