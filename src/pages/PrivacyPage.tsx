import React from 'react';
import { Link } from 'react-router';

const PRIVACY_SECTIONS = [
  {
    num: '01',
    title: 'What I collect',
    lead: 'When you reach out by email, your contact details — such as your name, email address, company or team context, and message notes — are used solely to reply to your inquiry.',
    callout:
      'No tracking scripts, intrusive analytics beacons, telemetry cookies, or third-party marketing pixels are deployed on this portfolio.',
  },
  {
    num: '02',
    title: 'How it is handled',
    lead: 'Lê Hoàng Anh (Anh — UI/UX Designer) does not sell, lease, trade, or monetize any contact information or project correspondence.',
    body: 'Messages are handled exclusively for direct, one-on-one communication regarding UI/UX design roles, portfolio walkthroughs, design system discussions, or product collaborations. Conversations are held in strict confidence.',
  },
  {
    num: '03',
    title: 'Cookies & Local Storage',
    lead: 'This website is pre-rendered static HTML and clean client-side UI. It does not store tracking cookies, third-party advertising cookies, or behavioral profiling identifiers.',
    body: 'Minimal browser state may be held strictly in memory for interactive case study demos (such as the Kite shipment filter or Reminder dose log) and never leaves your device.',
  },
  {
    num: '04',
    title: 'Rights & Inquiries',
    lead: 'Under global privacy standards, you maintain full ownership over your messages. You may request verification, correction, or permanent deletion of any archived email thread at any time.',
    codeNote: 'Simply email lezanh1611@gmail.com with the subject header "DATA ERASURE REQUEST".',
  },
];

export function PrivacyPage() {
  return (
    <section
      className="relative overflow-hidden bg-[#F7F6F3]"
      data-node-id="1:3568"
      aria-labelledby="privacy-heading"
    >
      {/* Mobile/Desktop Ambient Aurora */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 right-[10%] h-72 w-72 rounded-full bg-[#FA3674]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-20 left-[8%] h-72 w-72 rounded-full bg-[#BAFF39]/18 blur-3xl"
      />

      <div className="mx-auto max-w-[1152px] px-5 py-10 sm:px-8 md:px-12 md:py-16">
        {/* Segmented Legal Switcher (Glass UI on Mobile + Editorial on Desktop) */}
        <div className="flex flex-wrap items-center gap-3">
          <nav
            aria-label="Legal documents"
            className="glass-pill inline-flex w-full items-center gap-1 p-1 sm:w-auto"
          >
            <Link
              to="/privacy"
              aria-current="page"
              className="flex min-h-[40px] flex-1 items-center justify-center rounded-full bg-[#111111] px-4 py-2 font-display text-[12px] font-bold tracking-[0.6px] text-white uppercase shadow-sm sm:flex-initial sm:px-5"
            >
              Privacy policy
            </Link>
            <Link
              to="/terms"
              className="flex min-h-[40px] flex-1 items-center justify-center rounded-full px-4 py-2 font-display text-[12px] font-semibold tracking-[0.6px] text-[#4A4844] uppercase transition-colors hover:bg-white/70 hover:text-[#111111] sm:flex-initial sm:px-5"
            >
              Terms of service
            </Link>
          </nav>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FA3674]/40 bg-[#FFE9F0] px-3 py-1 font-display text-[11px] font-bold tracking-[0.6px] text-[#B8004C] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FA3674]" />
            Portfolio Policy · 2026
          </span>
        </div>

        {/* Title & Coral Architectural Hairline */}
        <div className="mt-8 md:mt-12">
          <h1
            id="privacy-heading"
            className="font-display text-[44px] leading-[1.02] font-bold tracking-[-0.04em] text-[#111111] sm:text-[68px] lg:text-[88px]"
          >
            Privacy policy
          </h1>

          <div className="mt-6 flex items-center" aria-hidden="true">
            <span className="h-3 w-[1.5px] bg-[#FA3674]" />
            <span className="h-[1.5px] flex-1 bg-[#FA3674]/80" />
            <span className="h-3 w-[1.5px] bg-[#FA3674]" />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[13px] text-[#4A4844] sm:text-[14px]">
            <p>
              <strong className="font-display text-[12px] tracking-[0.6px] text-[#111111] uppercase">
                Status:{' '}
              </strong>
              Portfolio live document · 2026
            </p>
            <p>
              Questions? Write to{' '}
              <a
                href="mailto:lezanh1611@gmail.com"
                className="font-medium text-[#B8004C] underline underline-offset-2 hover:text-[#111111]"
              >
                lezanh1611@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Numbered Clauses: Frosted Glass Cards on Mobile, Editorial Rows on Desktop */}
        <div className="mt-10 flex flex-col gap-5 md:mt-14 md:gap-0 md:border-t md:border-[#111111]">
          {PRIVACY_SECTIONS.map((sec) => (
            <article
              key={sec.num}
              className="glass-card p-6 md:rounded-none md:border-x-0 md:border-t-0 md:border-b md:border-[#111111] md:bg-transparent md:px-2 md:py-12 md:shadow-none md:backdrop-blur-none"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-12">
                <div className="flex items-baseline gap-4 md:col-span-4">
                  <span className="font-display text-[18px] font-bold text-[#B8004C] md:text-[20px]">
                    {sec.num}
                  </span>
                  <h2 className="font-display text-[21px] font-bold tracking-[-0.02em] text-[#111111] md:text-[24px]">
                    {sec.title}
                  </h2>
                </div>

                <div className="flex flex-col gap-4 md:col-span-8">
                  <p className="text-[15px] leading-[25px] text-[#111111] sm:text-[17px] sm:leading-[28px]">
                    {sec.lead}
                  </p>

                  {sec.body && (
                    <p className="text-[14px] leading-[23px] text-[#4A4844] sm:text-[16px] sm:leading-[25px]">
                      {sec.body}
                    </p>
                  )}

                  {sec.callout && (
                    <div className="flex items-start gap-3 rounded-[10px] border-l-2 border-[#111111] bg-[#EAE6DE]/90 p-4 text-[13px] leading-[20px] text-[#111111] sm:text-[14px]">
                      <img
                        src="/assets/figma/91ac9.svg"
                        alt=""
                        className="mt-0.5 h-4 w-3.5 shrink-0"
                      />
                      <p>{sec.callout}</p>
                    </div>
                  )}

                  {sec.codeNote && (
                    <p className="text-[14px] leading-[24px] text-[#4A4844] sm:text-[15px]">
                      Simply direct your request to{' '}
                      <a
                        href="mailto:lezanh1611@gmail.com?subject=DATA%20ERASURE%20REQUEST"
                        className="font-medium text-[#111111] underline underline-offset-2"
                      >
                        lezanh1611@gmail.com
                      </a>{' '}
                      with the subject header{' '}
                      <code className="rounded bg-[#EAE6DE] px-2 py-0.5 font-mono text-[12px] text-[#111111]">
                        &quot;DATA ERASURE REQUEST&quot;
                      </code>
                      .
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Sign-off Box */}
        <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-[20px] border-2 border-[#111111] bg-[#EAE6DE] p-6 shadow-[4px_4px_0px_#1A1A1A] sm:flex-row sm:items-center sm:p-10 md:mt-14 md:rounded-none">
          <div className="max-w-[576px]">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 border border-[#111111] bg-[#BAFF39]" />
              <span className="font-display text-[12px] font-bold tracking-[1.2px] text-[#111111] uppercase">
                Design Studio Office
              </span>
            </div>
            <p className="mt-2 text-[14px] leading-[22px] text-[#4A4844]">
              Crafted with rigorous restraint. Questions regarding digital governance, data handling, or NDA parameters may be sent directly by email.
            </p>
          </div>

          <a
            href="mailto:lezanh1611@gmail.com"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-full border-2 border-[#111111] bg-[#111111] px-6 py-3 font-display text-[12px] font-bold tracking-[0.8px] text-white uppercase shadow-[3px_3px_0px_#1A1A1A] transition-transform hover:-translate-y-0.5 sm:w-auto md:rounded-none"
          >
            <span>Questions? Write by email</span>
            <img src="/assets/figma/f3113.svg" alt="" className="h-3 w-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
