import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { motion, useReducedMotion } from 'motion/react';
import { EASE_OUT_EXPO, Reveal, StaggeredText } from '../components/MotionPrimitives';
import { cx } from '../components/GlassPrimitives';

const A = '/assets/figma';

/* -------------------------------------------------------------------------- */
/*  Process steps (Figma 1:2677)                                              */
/* -------------------------------------------------------------------------- */

interface ProcessStep {
  id: string;
  label: string;
  phase: string;
  title: string;
  body: string;
  tags: string[];
  visual: ReactNode;
  /** Visual sits on the left on desktop. */
  visualFirst: boolean;
}

function ImageCard({ src, alt, left, right }: { src: string; alt: string; left: string; right: string }) {
  return (
    <figure className="flex flex-col gap-2 overflow-hidden rounded-[16px] border border-[#ded9d0] bg-white p-[13px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04),0_4px_12px_-2px_rgba(0,0,0,0.02)]">
      <div className="relative h-[220px] overflow-hidden rounded-[12px] bg-[#f2efe9] sm:h-[280px] lg:h-[320px]">
        <img src={src} alt={alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-[#ded9d0] px-3 pt-[17px] pb-3 font-mono text-[11px] leading-4 tracking-[0.96px] text-[#68635c] sm:text-[12px]">
        <span>{left}</span>
        <span>{right}</span>
      </figcaption>
    </figure>
  );
}

function BlueprintCard() {
  const rows: Array<[string, string, boolean]> = [
    ['Core Mental Model', 'Direct / Frictionless', true],
    ['Information Architecture', 'Hierarchical Level 0–3', false],
    ['Interaction Latency Target', '< 100ms Perceived', false],
  ];
  return (
    <div className="flex flex-col gap-6 rounded-[16px] border border-[#ded9d0] bg-white p-6 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04),0_4px_12px_-2px_rgba(0,0,0,0.02)] sm:p-[33px]">
      <div className="flex items-center justify-between border-b border-[#ded9d0] pb-[17px]">
        <p className="font-mono text-[12px] leading-4 font-bold tracking-[0.6px] text-[#b8004c]">SYSTEM BLUEPRINT</p>
        <span aria-hidden="true" className="size-[10px] rounded-full bg-[#e7e5dc]" />
      </div>
      <dl className="flex flex-col gap-4">
        {rows.map(([term, value, accent]) => (
          <div
            key={term}
            className="flex items-center justify-between gap-4 rounded-[8px] border border-[#ded9d0] bg-[#f7f6f3] p-[13px] font-mono text-[12px] leading-4 tracking-[0.96px]"
          >
            <dt className="text-[#111111]">{term}</dt>
            <dd className={cx('text-right', accent ? 'text-[#b8004c]' : 'text-[#4a4844]')}>{value}</dd>
          </div>
        ))}
      </dl>
      <p className="font-jakarta text-[12px] leading-[19.5px] text-[#68635c]">
        Structural wireframing, state tree diagrams, and establishing baseline constraints before pixel rendering.
      </p>
    </div>
  );
}

const STEPS: ProcessStep[] = [
  {
    id: 'discover',
    label: '01 / DISCOVER',
    phase: 'PHASE ONE',
    title: 'Understand the problem before solutions',
    body: 'I start by defining the task and the information someone needs to complete it. I record any assumptions I’d want to validate before building.',
    tags: ['User Interviews', 'Design Audits', 'Journey Maps'],
    visual: (
      <ImageCard
        src={`${A}/f905d.png`}
        alt="Minimal designer desk with design books, a notebook and drafting tools in soft daylight"
        left="RESEARCH WORKBENCH"
        right="OBSERVATION & SYNTHESIS"
      />
    ),
    visualFirst: false,
  },
  {
    id: 'define',
    label: '02 / DEFINE',
    phase: 'PHASE TWO',
    title: 'Shape clear, considered product architectures',
    body: 'I map the primary path and the alternate states, then sketch where actions and feedback belong before refining the layout.',
    tags: ['Mental Models', 'Nav Taxonomy', 'State Engines'],
    visual: <BlueprintCard />,
    visualFirst: true,
  },
  {
    id: 'design',
    label: '03 / DESIGN',
    phase: 'PHASE THREE',
    title: 'Build with craft, clarity, and precision',
    body: 'I turn the layout into reusable components, then check alignment, text contrast, and focus visibility across states and screen sizes.',
    tags: ['Design Tokens', 'Micro-Motion', 'Typography Scale'],
    visual: (
      <ImageCard
        src={`${A}/85920.png`}
        alt="Abstract wireframe cubes with glowing coral and violet edges floating in a soft gradient"
        left="SYSTEM COMPONENT LOGIC"
        right="FIGMA TO ENGINE"
      />
    ),
    visualFirst: false,
  },
  {
    id: 'validate',
    label: '04 / VALIDATE',
    phase: 'PHASE FOUR',
    title: 'Test and refine the prototype',
    body: 'I walk through the prototype, including alternate paths, then write down what I’d test with users and which behaviors need clarification for handoff.',
    tags: ['Rapid Prototyping', 'Usability QA', 'Dev Handshake'],
    visual: (
      <ImageCard
        src={`${A}/3e738.png`}
        alt="Sculptural composition of glass and pastel ceramic ribbons with a translucent torus on a warm white background"
        left="STRESS-TESTING & QA"
        right="PRODUCTION FIDELITY"
      />
    ),
    visualFirst: true,
  },
];

function TimelineNode({ active }: { active: boolean }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.span
      aria-hidden="true"
      className={cx(
        'relative z-10 flex size-10 items-center justify-center rounded-full bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]',
        active ? 'border-2 border-[#111111]' : 'border border-[#ded9d0]',
      )}
      initial={reduce ? false : { scale: 0.6, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -20% 0px' }}
      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
    >
      <span className={cx('rounded-full', active ? 'size-3 bg-[#fa3674]' : 'size-2.5 bg-[#ded9d0]')} />
    </motion.span>
  );
}

function StepText({ step, headingId }: { step: ProcessStep; headingId: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 font-mono text-[12px] leading-4 tracking-[0.96px]">
        <span className="rounded-full bg-[#ffe9f0] px-[10px] py-[2px] font-bold text-[#b8004c]">{step.label}</span>
        <span className="text-[#68635c]">{step.phase}</span>
      </div>
      <h2 id={headingId} className="font-display text-[26px] leading-8 font-bold tracking-[-0.65px] text-[#111111] md:text-[30px] md:leading-9 md:tracking-[-0.75px]">
        {step.title}
      </h2>
      <p className="pt-1 font-jakarta text-[16px] leading-[26px] text-[#4a4844]">{step.body}</p>
      <ul aria-label="Methods" className="flex flex-wrap gap-2 pt-3">
        {step.tags.map((tag) => (
          <li key={tag} className="rounded-[6px] border border-[#ded9d0] bg-white px-[13px] py-[5px] font-mono text-[12px] leading-4 tracking-[0.96px] text-[#4a4844]">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProcessTimeline() {
  return (
    <section aria-label="Design process" className="relative pt-4">
      <span
        aria-hidden="true"
        className="absolute top-14 bottom-10 left-1/2 hidden w-px -translate-x-1/2 border-l border-dashed border-[#ded9d0] lg:block"
      />
      <ol className="relative flex flex-col gap-16 lg:gap-28">
        {STEPS.map((step, index) => {
          const headingId = `journal-step-${step.id}`;
          return (
            <li key={step.id} className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <Reveal
                className={cx(
                  'lg:row-start-1',
                  step.visualFirst ? 'lg:col-span-5 lg:col-start-8' : 'lg:col-span-5 lg:col-start-1',
                )}
              >
                <StepText step={step} headingId={headingId} />
              </Reveal>
              <div className="hidden justify-center lg:col-span-2 lg:col-start-6 lg:row-start-1 lg:flex">
                <TimelineNode active={index === 0} />
              </div>
              <Reveal
                delay={0.1}
                className={cx(
                  'lg:row-start-1',
                  step.visualFirst ? 'lg:col-span-5 lg:col-start-1' : 'lg:col-span-5 lg:col-start-8',
                )}
              >
                {step.visual}
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Practice notes (Figma 84:848)                                             */
/* -------------------------------------------------------------------------- */

const NOTES = [
  {
    title: 'Component States',
    body: 'A compact study of focus, feedback, and disabled states.',
    to: '/journal/component-states',
  },
  {
    title: 'Spacing and Hierarchy',
    body: 'How a small set of spacing values carries from controls to layouts.',
    to: '/journal/spacing-and-hierarchy',
  },
];

function PracticeNotes() {
  return (
    <section aria-labelledby="practice-notes-title" className="flex flex-col gap-[18px] pt-1">
      <h2 id="practice-notes-title" className="font-sans text-[28px] font-semibold text-[#111111] md:text-[32px]">
        Practice notes
      </h2>
      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {NOTES.map((note, index) => (
          <Reveal as="li" key={note.to} delay={index * 0.08}>
            <Link
              to={note.to}
              className="group relative flex h-full min-h-[44px] flex-col gap-[10px] rounded-[12px] border border-[#dddad5] bg-white px-6 py-[22px] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-12px_rgba(20,20,26,0.14)] focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_rgba(250,54,116,0.85)] motion-reduce:transition-none"
            >
              <span className="font-sans text-[20px] font-semibold text-[#111111] group-hover:text-[#b8004c]">
                {note.title}{' '}
                <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </span>
              <span className="font-sans text-[14px] text-[#55534d]">{note.body}</span>
              <span className="pointer-events-none absolute inset-[-1px] rounded-[12px] border border-white/85 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export function JournalPage() {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className="overflow-x-clip bg-[#f7f6f3]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-16 px-5 pt-10 pb-20 md:px-8 lg:gap-24 lg:px-12 lg:pt-20 lg:pb-28">
        {/* Process hero (Figma 1:2668) */}
        <header className="flex max-w-[860px] flex-col gap-4">
          <div className="flex items-center gap-2">
            <motion.span
              aria-hidden="true"
              className="h-[1.5px] w-6 origin-left bg-[#fa3674]"
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            />
            <p className="font-mono text-[12px] leading-4 font-bold tracking-[1.2px] text-[#b8004c] uppercase">
              Methodology &amp; Practice
            </p>
          </div>
          <StaggeredText
            as="h1"
            text="How I shape every design project"
            className="font-display text-[40px] leading-[44px] font-bold tracking-[-1px] text-[#111111] md:text-[52px] md:leading-[56px] lg:text-[60px] lg:leading-[60px] lg:tracking-[-1.5px]"
          />
          <Reveal delay={0.25}>
            <p className="pt-2 font-jakarta text-[17px] leading-[26px] text-[#4a4844] md:text-[20px] md:leading-7">
              How I take a UI problem from an initial task flow to a prototype I can review and revise.
            </p>
          </Reveal>
        </header>

        <ProcessTimeline />
        <PracticeNotes />
      </div>
    </div>
  );
}
