import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { BatteryFull, ChevronLeft, Signal } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

const asset = '/assets/figma/';
const tabs = ['Today', 'History'] as const;
type Screen = (typeof tabs)[number] | 'Review dose';
type Dose = 'due' | 'snoozed' | 'logged';
const scheduledAt = '08:30';
const snoozedUntil = '08:45';
const loggedAt = '08:34';
const focus = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b8004c]';
const primary = `flex min-h-11 w-full items-center justify-center rounded-[10px] bg-[#111] px-2 py-1.5 text-center text-sm font-semibold text-white ${focus}`;

function Icon({ file }: { file: string }) {
  return <img alt="" src={asset + file} className="size-[18px] shrink-0" />;
}

export function ReminderInteractive() {
  const [screen, setScreen] = useState<Screen>('Today');
  const [dose, setDose] = useState<Dose>('due');
  const [announcement, setAnnouncement] = useState('');
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reduceMotion = useReducedMotion();
  const heading = useRef<HTMLHeadingElement>(null);
  const review = useRef<HTMLButtonElement>(null);
  const focusTarget = useRef<'heading' | 'review' | null>(null);
  const id = useId();
  const selectedTab = screen === 'History' ? 'History' : 'Today';
  const shouldFloat = !reduceMotion && !focused && !hovered;

  useEffect(() => {
    if (focusTarget.current === 'review') review.current?.focus();
    if (focusTarget.current === 'heading') heading.current?.focus();
    focusTarget.current = null;
  }, [screen]);

  function show(next: Screen, focusContent = false) {
    if (focusContent) focusTarget.current = next === 'Today' ? 'review' : 'heading';
    setScreen(next);
  }

  function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, tab: (typeof tabs)[number]) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 'Today' : event.key === 'End' ? 'History' : tab === 'Today' ? 'History' : 'Today';
    show(next);
    event.currentTarget.parentElement?.querySelectorAll('button')[tabs.indexOf(next)]?.focus();
  }

  return (
    <section aria-label="Reminder Flow interactive preview" className="@container min-w-0">
      <div className="relative isolate flex min-w-0 justify-center overflow-hidden rounded-[22px] bg-[#e7e1d6] px-3 py-5 @min-[720px]:justify-end @min-[720px]:pr-[12%]">
        <img src={asset + '8a95c.png'} alt="" className="pointer-events-none absolute inset-0 -z-10 size-full object-cover object-left" />
        <motion.div
          animate={{ y: shouldFloat ? [0, -5, 0] : 0 }}
          transition={shouldFloat ? { duration: 4.6, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
          onKeyDown={(event) => { if (event.key === 'Escape' && screen === 'Review dose') show('Today', true); }}
          className="relative w-full max-w-[310px] min-w-0 rounded-[39px] border border-[#686560] bg-[#202020] p-[6px] shadow-[5px_8px_8px_rgba(48,38,31,.14),14px_18px_16px_rgba(48,38,31,.23)]"
        >
          <div className="absolute top-[98px] -left-[3px] h-7 w-[3px] rounded-l bg-[#4c4b49]" aria-hidden />
          <div className="absolute top-[134px] -left-[3px] h-7 w-[3px] rounded-l bg-[#4c4b49]" aria-hidden />
          <div className="absolute top-[123px] -right-[3px] h-10 w-[3px] rounded-r bg-[#4c4b49]" aria-hidden />
          <div className="flex min-h-[545px] min-w-0 flex-col rounded-[32px] border-2 border-[#101010] bg-portfolio-neutral p-3">
            <div className="relative mb-4 flex h-5 items-center justify-between px-2 text-[11px] font-semibold" aria-hidden>
              <span>9:41</span>
              <span className="absolute top-0 left-1/2 h-[17px] w-15 -translate-x-1/2 rounded-full bg-[#111]" />
              <span className="flex items-center gap-1"><Signal size={13} /><BatteryFull size={16} /></span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-1 text-xs font-semibold">
              <div className="flex items-center gap-1.5"><img alt="" className="size-2" src={asset + '7b974.svg'} />Reminder Flow</div>
              <span className="text-portfolio-muted">Mon, 19 May</span>
            </div>

            <div role="tablist" aria-label="Reminder Flow views" className="glass-pill order-2 grid grid-cols-2 gap-1 p-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  id={`${id}-tab-${tab}`}
                  aria-controls={`${id}-panel`}
                  aria-selected={selectedTab === tab}
                  tabIndex={selectedTab === tab ? 0 : -1}
                  onClick={() => show(tab)}
                  onKeyDown={(event) => navigateTabs(event, tab)}
                  className={`flex min-h-11 min-w-0 items-center justify-center gap-1.5 rounded-full px-1 text-xs font-semibold aria-selected:bg-portfolio-tint aria-selected:text-portfolio-secondary-text ${focus}`}
                ><Icon file={tab === 'Today' ? '6ea01.svg' : '79c1a.svg'} />{tab}</button>
              ))}
            </div>

            <div id={`${id}-panel`} role="tabpanel" tabIndex={0} aria-labelledby={`${id}-tab-${selectedTab}`} className="order-1 flex flex-1 flex-col gap-3 py-3">
              <div>
                <h3 ref={heading} tabIndex={-1} className="font-display text-[26px] leading-tight font-bold focus:outline-none">{screen}</h3>
                <p className="mt-1 text-xs text-portfolio-body">
                  {screen === 'Today' && 'Your scheduled reminders'}
                  {screen === 'Review dose' && 'Check the medicine and scheduled time.'}
                  {screen === 'History' && 'Review the doses you’ve logged.'}
                </p>
              </div>

              <div hidden={screen !== 'Today'} className="space-y-2.5">
                <div className="space-y-1 rounded-[14px] bg-[#111] p-3 text-white">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="inline-flex items-center gap-1 rounded-md bg-portfolio-tint px-1.5 py-1 text-xs font-semibold text-portfolio-secondary-text">
                      <Icon file={dose === 'logged' ? 'b89f2.svg' : '2c41b.svg'} />
                      {dose === 'due' ? 'Due now' : dose === 'snoozed' ? 'Snoozed' : 'Taken'}
                    </span>
                    <time className="text-xs font-semibold">{scheduledAt}</time>
                  </div>
                  <p className="font-display text-xl font-bold">Medication A</p>
                  <p className="text-xs text-[#e4e0da]">
                    {dose === 'due' && 'Morning reminder'}
                    {dose === 'snoozed' && `Reminder moved to ${snoozedUntil}`}
                    {dose === 'logged' && `Logged at ${loggedAt}`}
                  </p>
                </div>
                <button ref={review} type="button" onClick={() => show('Review dose', true)} className={primary}>Review dose</button>
                <div className="rounded-[14px] border border-portfolio-line bg-white p-2.5">
                  <h4 className="mb-1 font-display text-base font-bold">Coming up</h4>
                  <div className="glass-card flex flex-wrap items-center gap-x-2 gap-y-1 px-2 py-1.5">
                    <Icon file="f37f9.svg" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold">Medication B</p>
                      <p className="text-[11px] text-portfolio-muted">Scheduled for 12:30</p>
                    </div>
                    <span className="rounded-full bg-portfolio-subtle px-1.5 py-1 text-[10px] font-semibold text-portfolio-body">Upcoming</span>
                  </div>
                </div>
                <p className="text-xs text-portfolio-muted">Open a dose to check its details before logging it.</p>
              </div>

              {screen === 'Review dose' && (
                <div className="space-y-2.5">
                  <button type="button" onClick={() => show('Today', true)} className={`inline-flex min-h-11 items-center gap-1 rounded-lg px-1 text-sm font-semibold ${focus}`}><ChevronLeft size={17} aria-hidden />Today</button>
                  <div className="glass-card-strong space-y-2 p-3">
                    <Icon file="f37f9.svg" />
                    <p className="font-display text-xl font-bold">Medication A</p>
                    <p className="text-sm font-semibold">Scheduled · {scheduledAt}</p>
                    <p className="text-xs text-portfolio-body">{dose === 'logged' ? 'Dose is already in the log' : 'Check the label on your medicine before logging the dose.'}</p>
                    {dose === 'logged' && <p className="text-xs text-portfolio-body">Logged at {loggedAt}</p>}
                  </div>
                  {dose === 'logged' ? (
                    <button type="button" onClick={() => show('History', true)} className={primary}>View history</button>
                  ) : (
                    <>
                      <button type="button" aria-label="Mark as taken (Log dose now)" className={primary} onClick={() => {
                        setDose('logged');
                        setAnnouncement('Medication A was added to your history.');
                        show('History', true);
                      }}>Mark as taken</button>
                      <button type="button" aria-label="Remind me in 15 min (Snooze 15 min)" className={`flex min-h-11 w-full items-center justify-center gap-2 rounded-[10px] border border-portfolio-line bg-white px-2 py-1.5 text-sm font-semibold ${focus}`} onClick={() => {
                        setDose('snoozed');
                        setAnnouncement(`Reminder moved to ${snoozedUntil}. The scheduled dose stays at ${scheduledAt}.`);
                        show('Today', true);
                      }}><Icon file="e4391.svg" />Remind me in 15 min</button>
                      <p className="text-xs text-portfolio-muted">Snoozing only changes the next notification time.</p>
                    </>
                  )}
                </div>
              )}

              {screen === 'History' && (
                <div className="space-y-2.5">
                  {dose === 'logged' ? (
                    <>
                      <div className="rounded-[14px] border border-[#dbe9c4] bg-[#edf5dc] p-3">
                        <div className="flex items-center gap-2"><Icon file="b89f2.svg" /><h4 className="font-display text-lg font-bold">Dose recorded</h4></div>
                        <p className="mt-1 text-xs text-portfolio-body">Medication A was added to your history.</p>
                      </div>
                      <div className="glass-card-strong flex flex-wrap items-center justify-between gap-1.5 p-3">
                        <div>
                          <p className="text-sm font-semibold">Medication A</p>
                          <p className="text-xs text-portfolio-body">Scheduled {scheduledAt} · logged {loggedAt}</p>
                        </div>
                        <span className="rounded-full bg-[#edf5dc] px-2 py-1 text-xs font-semibold text-[#34492c]">Taken</span>
                      </div>
                    </>
                  ) : (
                    <p className="glass-card-strong p-3 text-sm">No doses logged yet.</p>
                  )}
                  <p className="text-xs text-portfolio-muted">History keeps the scheduled and recorded times together.</p>
                </div>
              )}
            </div>

            <span className="order-3 mx-auto mt-2 h-1 w-22 rounded-full bg-[#111]" aria-hidden />
          </div>
        </motion.div>
      </div>
      <p role="status" className="sr-only">{announcement}</p>
      <p className="mt-3 text-xs text-portfolio-muted">Concept screens use example medicines and sample times.</p>
    </section>
  );
}
