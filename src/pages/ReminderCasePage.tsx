import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router';
import { ReminderInteractive } from '../features/reminder/ReminderInteractive';

const DESIGN_DECISIONS = [
  {
    title: 'Show the next dose first',
    body: 'The Today screen puts the next scheduled time and the medicine name above the rest of the day.',
  },
  {
    title: 'Separate logging from snoozing',
    body: 'The review screen uses explicit labels for recording a dose and moving the next notification.',
  },
  {
    title: 'Show what was recorded',
    body: 'History keeps the scheduled time and the actual logged time visible on the same entry.',
  },
];

export function ReminderCasePage() {
  const prefersReduced = useReducedMotion();

  return (
    <article className="bg-[#F7F6F3]" data-node-id="10:1369">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-12 px-5 py-8 sm:px-8 md:gap-16 md:px-12 md:py-12">
        {/* 1. Project Introduction */}
        <header className="flex flex-col items-start gap-6">
          <Link
            to="/work"
            className="inline-flex min-h-[44px] items-center rounded-[10px] border border-[#DED9D0] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#111111] transition-colors hover:bg-[#F2EFE9]"
          >
            ← All work
          </Link>

          <div className="flex flex-col gap-3">
            <p className="text-[12px] font-semibold tracking-[0.8px] text-[#B8004C] uppercase">
              Self-Initiated Concept · 2026
            </p>
            <h1 className="font-display text-[44px] leading-[1.05] font-bold tracking-[-0.03em] text-[#111111] sm:text-[68px] lg:text-[86px]">
              Reminder Flow
            </h1>
            <p className="max-w-[796px] text-[17px] leading-[28px] text-[#4A4844] sm:text-[22px] sm:leading-[32px]">
              A medication reminder concept for older adults who want to check what’s due, log a dose, and see what they’ve already recorded.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2 text-[12px] font-semibold tracking-[0.4px] text-[#68635C] uppercase">
            <span>Role · UI Design</span>
            <span>Scope · Mobile Reminders + Dose History</span>
            <span>Data · Illustrative</span>
          </div>
        </header>

        {/* 2. Interactive iPhone Hero + 3-Screen Mobile Flow */}
        <ReminderInteractive />

        {/* 3. Two Paths Outside the Main Flow (Exceptions) */}
        <section className="flex flex-col gap-5">
          <h2 className="font-display text-[28px] leading-[1.15] font-bold text-[#111111] sm:text-[34px]">
            Two paths outside the main flow
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Snoozed Path */}
            <div className="flex flex-col justify-between gap-4 rounded-[16px] border border-[#DED9D0] bg-white p-6">
              <div className="flex flex-col items-start gap-3">
                <motion.div
                  className="inline-flex items-center gap-2 rounded-[8px] bg-[#FFE9F0] px-3 py-1.5 text-[12px] font-semibold text-[#B8004C]"
                  animate={prefersReduced ? undefined : { scale: [1, 1, 1.017, 1, 1] }}
                  transition={{
                    duration: 4.1,
                    times: [0, 0.22, 0.5, 0.83, 1],
                    ease: 'easeInOut',
                    repeat: Infinity,
                  }}
                >
                  <img src="/assets/figma/7d4c5.svg" alt="" className="h-4 w-4" />
                  <span>From Review dose</span>
                </motion.div>
                <h3 className="font-display text-[23px] font-bold text-[#111111]">
                  Reminder moved to 08:45
                </h3>
                <p className="text-[15px] leading-[23px] text-[#4A4844]">
                  Tap “Remind me in 15 min” to return to Today. The scheduled dose stays anchored at 08:30 so the user never loses the original prescription time.
                </p>
              </div>

              <div className="rounded-[12px] border border-[#DED9D0] bg-[#F7F6F3] p-3">
                <div className="glass-card flex items-center justify-between rounded-[14px] px-3.5 py-3">
                  <div className="flex items-center gap-2.5">
                    <img src="/assets/figma/330ba.svg" alt="" className="h-5 w-5" />
                    <div>
                      <p className="text-[14px] font-semibold text-[#111111]">Medication A</p>
                      <p className="text-[12px] text-[#68635C]">Scheduled 08:30 · reminder 08:45</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#FFE9F0] px-2.5 py-1 text-[11px] font-semibold text-[#B8004C]">
                    Snoozed
                  </span>
                </div>
              </div>
            </div>

            {/* Already Logged Path */}
            <div className="flex flex-col justify-between gap-4 rounded-[16px] border border-[#DED9D0] bg-white p-6">
              <div className="flex flex-col items-start gap-3">
                <motion.div
                  className="inline-flex items-center gap-2 rounded-[8px] bg-[#FFE9F0] px-3 py-1.5 text-[12px] font-semibold text-[#B8004C]"
                  animate={prefersReduced ? undefined : { scale: [1, 1, 1.017, 1, 1] }}
                  transition={{
                    duration: 4.1,
                    times: [0, 0.2949, 0.5749, 0.9049, 1],
                    ease: 'easeInOut',
                    repeat: Infinity,
                  }}
                >
                  <img src="/assets/figma/667dd.svg" alt="" className="h-4 w-4" />
                  <span>After a dose is recorded</span>
                </motion.div>
                <h3 className="font-display text-[23px] font-bold text-[#111111]">
                  Dose is already in the log
                </h3>
                <p className="text-[15px] leading-[23px] text-[#4A4844]">
                  Reopen the same dose to see the existing log entry and check its recorded time in History — preventing accidental double-dosing.
                </p>
              </div>

              <div className="rounded-[12px] border border-[#DED9D0] bg-[#F7F6F3] p-3">
                <div className="glass-card flex items-center justify-between rounded-[14px] px-3.5 py-3">
                  <div className="flex items-center gap-2.5">
                    <img src="/assets/figma/330ba.svg" alt="" className="h-5 w-5" />
                    <div>
                      <p className="text-[14px] font-semibold text-[#111111]">Medication A</p>
                      <p className="text-[12px] text-[#68635C]">Logged at 08:34</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#BAFF39]/50 px-2.5 py-1 text-[11px] font-semibold text-[#111111]">
                    Taken
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Design Decisions */}
        <section className="grid grid-cols-1 items-start gap-10 py-2 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-3 lg:col-span-6">
            <p className="text-[12px] font-semibold tracking-[0.8px] text-[#B8004C] uppercase">
              Design Question
            </p>
            <h2 className="font-display text-[30px] leading-[1.14] font-bold text-[#111111] sm:text-[42px]">
              Is this the dose I’m meant to log?
            </h2>
            <p className="max-w-[480px] text-[16px] leading-[25px] text-[#4A4844] sm:text-[17px]">
              A reminder should leave room to check the details, especially when more than one medicine is scheduled on the same day.
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-6">
            {DESIGN_DECISIONS.map((d) => (
              <div key={d.title} className="border-b border-[#DED9D0] pb-4">
                <h3 className="font-display text-[19px] font-bold text-[#111111]">
                  {d.title}
                </h3>
                <p className="mt-1 text-[15px] leading-[23px] text-[#4A4844]">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Research Reference & Validation */}
        <section className="rounded-[16px] border border-[#DED9D0] bg-white p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <p className="text-[12px] font-semibold tracking-[0.8px] text-[#B8004C] uppercase">
                Reference
              </p>
              <h2 className="mt-2 font-display text-[24px] font-bold text-[#111111]">
                NHS App Prescriptions
              </h2>
              <p className="mt-2 text-[15px] leading-[23px] text-[#4A4844]">
                I used its separation of medicines, details, and status to organize this concept around the daily reminder.
              </p>
              <a
                href="https://design-system.nhsapp.service.nhs.uk/examples/sub-hub-pages/prescriptions/"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex min-h-[40px] items-center text-[13px] font-semibold text-[#B8004C] underline-offset-4 hover:underline"
              >
                NHS App · Prescriptions design reference ↗
              </a>
            </div>

            <div>
              <p className="text-[12px] font-semibold tracking-[0.8px] text-[#B8004C] uppercase">
                What I’d Test Next
              </p>
              <h2 className="mt-2 font-display text-[24px] font-bold text-[#111111]">
                Can someone verify a dose later?
              </h2>
              <p className="mt-2 text-[15px] leading-[23px] text-[#4A4844]">
                Ask an older adult to find the next dose, explain what snoozing does, then find the recorded entry. Repeat at a larger Dynamic Type text size.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Case Navigation */}
        <nav
          aria-label="Case study pagination"
          className="flex flex-wrap items-center justify-between gap-3 pt-2"
        >
          <Link
            to="/work"
            className="inline-flex min-h-[46px] items-center justify-center rounded-[10px] border border-[#DED9D0] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#111111] transition-colors hover:bg-[#F2EFE9]"
          >
            ← All work
          </Link>
          <Link
            to="/contact"
            className="inline-flex min-h-[46px] items-center justify-center rounded-[10px] border border-[#111111] bg-[#111111] px-5 py-2.5 text-[13px] font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Get in touch →
          </Link>
        </nav>
      </div>
    </article>
  );
}
