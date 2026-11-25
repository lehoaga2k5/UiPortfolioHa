import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { motion, useReducedMotion } from 'motion/react';
import { EASE_OUT_EXPO, Reveal, StaggeredText, loopTransition, springLift, EASE_IN_OUT_FIGMA } from '../components/MotionPrimitives';
import { PhoneTodayScreen } from './HomePage';

const A = '/assets/figma';

const focusRing =
  'focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_rgba(250,54,116,0.85)]';

/* -------------------------------------------------------------------------- */
/*  Hero — "About me" + editorial photo card (Figma 1:2890)                   */
/* -------------------------------------------------------------------------- */

function AboutHero() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section aria-labelledby="about-title" className="mx-auto max-w-[1280px] px-5 pt-10 pb-14 md:px-8 lg:py-20">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left column */}
        <div className="flex flex-col lg:col-span-7">
          <div className="relative pt-4 pb-8">
            <motion.span
              aria-hidden="true"
              className="absolute top-[-16px] left-0 h-[100px] w-[1.5px] origin-top bg-[#fa3674] md:h-[140px]"
              initial={reduce ? false : { scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
            />
            <motion.span
              aria-hidden="true"
              className="absolute top-1/2 right-[-12px] left-[-20px] h-px origin-left bg-gradient-to-r from-[#fda4af] via-[#fb7185] via-40% to-[rgba(251,113,133,0.15)] lg:right-[-40px]"
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.15, ease: EASE_OUT_EXPO }}
            />
            <StaggeredText
              as="h1"
              id="about-title"
              text="About me"
              mode="char"
              className="relative pl-4 font-display text-[56px] leading-[60px] font-bold tracking-[-1.4px] text-[#111111] sm:text-[72px] sm:leading-[76px] lg:pl-5 lg:text-[96px] lg:leading-[96px] lg:tracking-[-2.4px]"
            />
          </div>

          <Reveal delay={0.2} className="flex flex-col gap-6">
            <p className="font-display text-[21px] leading-[28px] font-bold text-[#141414] md:text-[26px] md:leading-[32px]">
              I’m Anh, a UI/UX designer based in Hanoi, Vietnam. I design dashboards, mobile flows, and reusable
              components. I’m looking for a fresher role on a product team.
            </p>
            <p className="max-w-[576px] font-display text-[16px] leading-[26px] text-[#4a4844] md:text-[18px] md:leading-[28px]">
              I learn by rebuilding interface patterns, documenting what changes between states, and asking for
              critique before I polish a design.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="flex flex-wrap gap-3 pt-8 sm:gap-4">
            <Link
              to="/work"
              className={`group relative inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-[#111111] px-6 py-3 font-display text-[14px] leading-5 font-semibold text-white shadow-[0_1px_1px_rgba(0,0,0,0.05)] transition-transform duration-200 hover:-translate-y-px motion-reduce:transition-none sm:flex-none ${focusRing}`}
            >
              View selected work
              <span aria-hidden="true" className="text-[#d6d1c9] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>
            <Link
              to="/contact"
              className={`inline-flex min-h-[48px] flex-1 items-center justify-center rounded-full border border-[#ded9d0] bg-white px-[25px] py-[13px] font-display text-[14px] leading-5 font-medium text-[#111111] transition-colors hover:border-[#fa3674]/50 sm:flex-none ${focusRing}`}
            >
              Say hello
            </Link>
          </Reveal>
        </div>

        {/* Right column — angled white framed card */}
        <div className="flex justify-center lg:col-span-5 lg:justify-end">
          <motion.figure
            className="w-full max-w-[416px] rotate-[1.2deg] rounded-[24px] border border-[#ded9d0] bg-white p-3 shadow-[0_20px_25px_rgba(0,0,0,0.08)] sm:p-[17px] lg:rotate-[2.2deg]"
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, 0, -6, 0, 0] }}
            transition={
              reduce
                ? { duration: 0 }
                : {
                    opacity: { duration: 0.7, ease: EASE_OUT_EXPO },
                    y: loopTransition([0, 0.1096, 0.2877, 0.5205, 1], [EASE_IN_OUT_FIGMA, springLift, 'easeInOut', 'easeInOut'], 5),
                  }
            }
          >
            <div className="relative aspect-[382/509] w-full overflow-hidden rounded-[16px] bg-[#f2efe9]">
              <img
                src={`${A}/99709.png`}
                alt="Portrait of Anh outdoors in Hanoi, wearing a light T-shirt and a backpack strap"
                className="absolute inset-0 h-full w-full object-cover"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <figcaption className="flex items-center gap-2 px-2 pt-[14px] pb-1">
              <span aria-hidden="true" className="size-[10px] shrink-0 rounded-full bg-[#10b981]" />
              <span className="font-display text-[13px] leading-4 font-semibold text-[#111111]">
                Open to Fresher UI/UX Designer roles
              </span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  What I'm Practicing (Figma 1:2925)                                        */
/* -------------------------------------------------------------------------- */

const PRACTICES = [
  {
    label: '01 / FIGMA',
    title: 'Component Architecture',
    body: 'I use Auto Layout, variants, and semantic tokens to build components that hold up when content or state changes.',
    tags: ['Auto Layout', 'Tokens', 'Variants'],
  },
  {
    label: '02 / SPATIAL LOGIC',
    title: 'Responsive Layout & Grid Systems',
    body: 'Strict adherence to 8pt spatial baseline rhythms, modular type scales, flexible fluid containers, and seamless layout transitions between mobile and desktop.',
    tags: ['8pt Rhythm', 'Breakpoints', 'Hierarchy'],
  },
  {
    label: '03 / MOTION & FEEL',
    title: 'Interactive Prototyping',
    body: 'Designing tactile feedback loops with Smart Animate, realistic spring physics, micro-motion indicators, and interactive states to communicate intent clearly.',
    tags: ['Smart Animate', 'Spring Easing', 'Micro-states'],
  },
  {
    label: '04 / INCLUSION',
    title: 'Foundational Accessibility',
    body: 'I check text contrast, type size, focus visibility, and touch target spacing when I refine an interface.',
    tags: ['WCAG Contrast', 'Touch Targets', 'Semantic Flow'],
  },
];

function PracticesSection() {
  return (
    <section aria-labelledby="practices-title" className="border-t border-[#ded9d0] bg-white">
      <div className="mx-auto max-w-[1280px] px-5 py-14 md:px-8 lg:px-16 lg:pt-[81px] lg:pb-20">
        <div className="mx-auto max-w-[1152px] lg:px-8">
          <Reveal className="flex flex-col gap-4 border-b border-[#ded9d0] pb-[25px] md:flex-row md:items-end md:justify-between md:gap-8">
            <div className="flex flex-col gap-2">
              <p className="font-display text-[12px] leading-4 font-semibold tracking-[1.2px] text-[#b8004c] uppercase">
                Technical Foundations
              </p>
              <h2 id="practices-title" className="font-display text-[30px] leading-9 font-bold tracking-[-0.75px] text-[#111111] md:text-[36px] md:leading-10 md:tracking-[-0.9px]">
                What I’m Practicing
              </h2>
            </div>
            <p className="max-w-[448px] font-display text-[16px] leading-6 text-[#68635c]">
              Deliberate daily craft habits, focusing on systematic UI mechanics rather than superficial decoration.
            </p>
          </Reveal>

          <ul className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 md:gap-8">
            {PRACTICES.map((item, index) => (
              <Reveal as="li" key={item.label} delay={(index % 2) * 0.08}>
                <article className="flex h-full flex-col gap-[9px] rounded-[16px] border border-[#ded9d0] bg-[#f7f6f3] p-6 transition-shadow duration-200 hover:shadow-[0_14px_34px_-12px_rgba(20,20,26,0.12)] md:p-[29px]">
                  <p className="font-mono text-[12px] leading-4 text-[#68635c]">{item.label}</p>
                  <h3 className="pt-[7px] font-display text-[20px] leading-7 font-bold text-[#111111]">{item.title}</h3>
                  <p className="flex-1 pb-[7px] font-display text-[14px] leading-[22.75px] text-[#4a4844]">{item.body}</p>
                  <ul aria-label={`${item.title} skills`} className="flex flex-wrap gap-2 border-t border-[#ded9d0] pt-[9px]">
                    {item.tags.map((tag) => (
                      <li key={tag} className="rounded-[6px] bg-[#f2efe9] px-[10px] py-1 font-display text-[12px] leading-4 font-medium text-[#68635c]">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Services & Capabilities (Figma 1:1482)                                    */
/* -------------------------------------------------------------------------- */

function IllustrationFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[12px] bg-[#eeece6]"
    >
      {children}
    </div>
  );
}

function ButtonStatesIllustration() {
  const rows = [
    { label: 'Default', button: <span className="flex h-[31px] w-[98px] items-center justify-center rounded-[7px] bg-[#111111] text-[11px] font-semibold text-white">Confirm</span> },
    { label: 'Focus', button: <span className="flex h-[31px] w-[98px] items-center justify-center rounded-[7px] border-2 border-[#fa3674] bg-white text-[11px] font-semibold text-[#111111]">Confirm</span> },
    { label: 'Loading', button: <span className="flex h-[31px] w-[98px] items-center justify-center rounded-[7px] border border-[#ded9d0] bg-[#f7f6f3] text-[11px] font-semibold text-[#68635c]">Confirming…</span> },
  ];
  return (
    <div className="flex w-[85%] max-w-[210px] flex-col gap-[7px] rounded-[12px] border border-[#ded9d0] bg-white px-[14px] py-[13px] font-sans" aria-hidden="true">
      <p className="font-display text-[17px] font-bold text-[#111111]">Button states</p>
      {rows.map((row, i) => (
        <div key={row.label} className="flex flex-col gap-[7px]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#68635c]">{row.label}</span>
            {row.button}
          </div>
          {i < rows.length - 1 && <span className="h-px w-full bg-[#ded9d0]" />}
        </div>
      ))}
    </div>
  );
}

function DispatchQueueIllustration() {
  const rows = [
    { id: 'KT-8842-MA', name: 'Nguyen Van Minh', status: 'Delayed · traffic', alert: true },
    { id: 'KT-8849-MA', name: 'Tran Thu Ha', status: 'Out for delivery', alert: false },
    { id: 'KT-8810-MA', name: 'Le Quang Nam', status: 'In transit', alert: false },
  ];
  return (
    <div className="flex w-[85%] max-w-[210px] flex-col gap-[6px] rounded-[12px] border border-[#ded9d0] bg-white px-[13px] py-[14px] font-sans" aria-hidden="true">
      <div className="flex items-center justify-between">
        <span className="font-display text-[17px] font-bold text-[#111111]">Dispatch queue</span>
        <span className="text-[10px] font-semibold text-[#68635c]">Kite</span>
      </div>
      {rows.map((row) => (
        <div key={row.id} className="flex flex-col gap-[6px]">
          <span className="h-px w-full bg-[#ded9d0]" />
          <div className="flex items-center justify-between">
            <span className="flex flex-col gap-[3px]">
              <span className="text-[11px] font-semibold text-[#111111]">{row.id}</span>
              <span className="text-[9px] text-[#68635c]">{row.name}</span>
            </span>
            <span
              className={
                row.alert
                  ? 'rounded-[5px] bg-[#ffe9f0] px-[6px] py-1 text-[9px] font-semibold text-[#b8004c]'
                  : 'rounded-[5px] bg-[#eeece6] px-[6px] py-1 text-[9px] font-semibold text-[#68635c]'
              }
            >
              {row.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function MobileIllustration() {
  return (
    <>
      <img src={`${A}/30062.svg`} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
      <div className="relative">
        <PhoneTodayScreen scale={0.47} />
      </div>
    </>
  );
}

function RunwayTabsIllustration() {
  const panel = (active: 'Runway' | 'Spending', label: string, value: string) => (
    <div className="flex w-full flex-col gap-2 rounded-[10px] border border-[#ded9d0] bg-white p-[10px] font-sans">
      <div className="flex rounded-[7px] bg-[#f2efe9] p-[2px] text-[10px] font-semibold">
        {(['Runway', 'Spending'] as const).map((tab) => (
          <span
            key={tab}
            className={
              tab === active
                ? 'flex-1 rounded-[5px] bg-white py-1 text-center text-[#111111] shadow-[0_1px_2px_rgba(0,0,0,0.08)]'
                : 'flex-1 py-1 text-center text-[#68635c]'
            }
          >
            {tab}
          </span>
        ))}
      </div>
      <span className="text-[9.5px] text-[#68635c]">{label}</span>
      <span className="font-display text-[18px] leading-5 font-bold text-[#111111]">{value}</span>
    </div>
  );
  return (
    <div className="flex w-[80%] max-w-[200px] flex-col gap-3" aria-hidden="true">
      {panel('Runway', 'Projected runway', '18.8 months')}
      <span className="self-center font-mono text-[12px] leading-none text-[#b8004c]">↓</span>
      {panel('Spending', 'Spent this month', '$9,820.40')}
    </div>
  );
}

const SERVICES: Array<{ title: string; body: string; badge: string; label: string; art: ReactNode }> = [
  {
    title: 'Design Systems & Architecture',
    body: 'Multi-brand token systems, atomic component libraries, and documentation that bridge design and engineering seamlessly.',
    badge: 'Components & variants',
    label: 'Button state examples: default, focus, and loading',
    art: <ButtonStatesIllustration />,
  },
  {
    title: 'Complex Web & SaaS Apps',
    body: 'Data-dense interfaces, dashboard UX, and enterprise workflows engineered for speed, clarity, and daily utility.',
    badge: 'Dashboards & data tables',
    label: 'Kite dispatch queue with three shipments',
    art: <DispatchQueueIllustration />,
  },
  {
    title: 'Mobile Experiences',
    body: 'Native iOS and Android app craft with tactile micro-interactions, gesture navigation, and accessible ergonomics.',
    badge: 'Flows & alternate states',
    label: 'Reminder Flow Today screen on an iPhone',
    art: <MobileIllustration />,
  },
  {
    title: 'Interactive Prototyping',
    body: 'High-fidelity micro-interaction models and dynamic prototypes for rapid stakeholder alignment and user validation.',
    badge: 'Interaction & handoff',
    label: 'Budget tabs switching from Runway to Spending',
    art: <RunwayTabsIllustration />,
  },
];

function ServicesSection() {
  const reduce = useReducedMotion() ?? false;
  return (
    <section aria-labelledby="services-title" className="bg-[#f7f6f3]">
      <div className="mx-auto max-w-[1280px] px-5 py-14 md:px-8 lg:px-6 lg:pt-[132px] lg:pb-[108px]">
        <Reveal className="flex max-w-[672px] flex-col gap-4 pb-10 lg:pb-12">
          <h2 id="services-title" className="font-display text-[36px] leading-10 font-bold tracking-[-0.9px] text-[#111111] md:text-[48px] md:leading-[48px] md:tracking-[-1.2px]">
            Services &amp; Capabilities
          </h2>
          <p className="font-jakarta text-[16px] leading-[26px] text-[#4a4844] md:text-[18px] md:leading-[28px]">
            Design systems, dashboards, mobile flows, and prototypes from my portfolio practice.
          </p>
        </Reveal>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => (
            <Reveal as="li" key={service.title} delay={index * 0.06}>
              <article className="flex h-full flex-col justify-between gap-7 rounded-[16px] border border-[#ded9d0] bg-white p-[21px] shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
                <div className="flex flex-col gap-2">
                  <motion.div
                    whileHover={reduce ? undefined : { scale: 1.02 }}
                    transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                  >
                    <IllustrationFrame label={service.label}>{service.art}</IllustrationFrame>
                  </motion.div>
                  <h3 className="pt-4 font-display text-[18px] leading-7 font-bold tracking-[-0.45px] text-[#111111]">
                    {service.title}
                  </h3>
                  <p className="font-jakarta text-[14px] leading-[22.75px] text-[#68635c]">{service.body}</p>
                </div>
                <span className="w-fit rounded-full bg-[#111111] px-4 py-[6px] font-jakarta text-[12px] leading-4 font-semibold tracking-[0.3px] text-white">
                  {service.badge}
                </span>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Intentional Growth — What I'm Looking For (Figma 1:2992)                  */
/* -------------------------------------------------------------------------- */

const LOOKING_FOR = [
  {
    title: 'Active Mentorship & Direct Feedback',
    body: 'A studio or product team eager to challenge layout decisions, question assumptions, explain design tradeoffs, and push my technical craft to professional standards.',
  },
  {
    title: 'Collaborative Teamwork',
    body: 'Working alongside seasoned product designers, engineers, and researchers to understand realistic design-to-code handoffs and production constraints.',
  },
  {
    title: 'Meaningful Real-World Tasks',
    body: 'Contributing directly to live component libraries, redlining specs, maintaining design documentation, and shipping refined UI for actual users.',
  },
];

function LookingForSection() {
  return (
    <section aria-labelledby="looking-title" className="border-t border-[#ded9d0] bg-[#f7f6f3]">
      <div className="mx-auto max-w-[1280px] px-5 py-14 md:px-8 lg:px-16 lg:pt-[81px] lg:pb-20">
        <div className="mx-auto flex max-w-[1152px] flex-col gap-10 lg:gap-12 lg:px-8">
          <Reveal className="flex max-w-[672px] flex-col gap-2">
            <p className="font-display text-[12px] leading-4 font-semibold tracking-[1.2px] text-[#b8004c] uppercase">
              Intentional Growth
            </p>
            <h2 id="looking-title" className="font-display text-[30px] leading-9 font-bold tracking-[-0.75px] text-[#111111] md:text-[36px] md:leading-10 md:tracking-[-0.9px]">
              What I’m Looking For
            </h2>
            <p className="pt-1 font-display text-[16px] leading-6 text-[#4a4844]">
              I’m looking for a team where I can turn feedback into clearer flows and contribute to components the
              team uses.
            </p>
          </Reveal>

          <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {LOOKING_FOR.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 0.08} className="flex flex-col gap-3 border-t-2 border-[#111111] pt-[26px]">
                <h3 className="font-display text-[18px] leading-7 font-bold text-[#111111]">{item.title}</h3>
                <p className="font-display text-[14px] leading-[22.75px] text-[#4a4844]">{item.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function AboutPage() {
  return (
    <div className="overflow-x-clip bg-[#f7f6f3]">
      <AboutHero />
      <PracticesSection />
      <ServicesSection />
      <LookingForSection />
    </div>
  );
}
