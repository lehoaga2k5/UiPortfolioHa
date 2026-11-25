import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';

const TERMS_CLAUSES = [
  {
    num: '01',
    title: 'Portfolio Purpose',
    body: 'This site is a self-initiated design portfolio curated by Lê Hoàng Anh (Anh — UI/UX Designer) to demonstrate interface architecture, design token methodologies, interaction states, and product design craft.',
    tags: ['ARCHITECTURE', 'DESIGN TOKENS', 'CRAFT EXPLORATION'],
    shaded: false,
  },
  {
    num: '02',
    title: 'Intellectual Property',
    body: 'All visual artifacts, custom interface mockups, Glass UI component specifications, and written practice notes displayed on lehoanganh.id.vn belong to Lê Hoàng Anh unless explicitly attributed otherwise. Projects labeled Concept or Self-Initiated represent exploratory design studies and do not imply commercial endorsement.',
    note: 'Map street geometry in Kite attributes © OpenStreetMap contributors; prescription structure references NHS App public documentation.',
    shaded: true,
  },
  {
    num: '03',
    title: 'Permitted Use',
    body: 'Visitors, recruiters, and hiring managers may freely browse, share, and reference these case studies for recruitment, hiring evaluation, and non-commercial educational study. Commercial republication or redistribution of custom visual specimens without written permission is prohibited.',
    badges: [
      { icon: '/assets/figma/22f62.svg', label: 'DESIGN EVALUATION & HIRING' },
      { icon: '/assets/figma/840a3.svg', label: 'NO COMMERCIAL REDISTRIBUTION' },
    ],
    shaded: false,
  },
  {
    num: '04',
    title: 'Disclaimer & Contact',
    body: 'This website is provided on an "as-is" basis for portfolio review. Sample metrics, shipment manifests, cash balances, and medication schedules inside case studies use illustrative data created specifically to test interface hierarchy.',
    shaded: true,
  },
];

export function TermsPage() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('lezanh1611@gmail.com');
      setCopied(true);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = 'mailto:lezanh1611@gmail.com';
    }
  };

  return (
    <section
      className="relative overflow-hidden bg-[#F7F6F3]"
      data-node-id="1:3700"
      aria-labelledby="terms-heading"
    >
      {/* Ambient Aurora */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-14 left-[10%] h-72 w-72 rounded-full bg-[#FA3674]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] bottom-16 h-72 w-72 rounded-full bg-[#BAFF39]/18 blur-3xl"
      />

      <div className="mx-auto max-w-[1152px] px-5 py-10 sm:px-8 md:px-12 md:py-16">
        {/* Segmented Glass UI Legal Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav
            aria-label="Legal documents"
            className="glass-pill inline-flex w-full items-center gap-1 p-1 sm:w-auto"
          >
            <Link
              to="/privacy"
              className="flex min-h-[40px] flex-1 items-center justify-center rounded-full px-4 py-2 font-display text-[12px] font-semibold tracking-[0.6px] text-[#4A4844] uppercase transition-colors hover:bg-white/70 hover:text-[#111111] sm:flex-initial sm:px-5"
            >
              Privacy policy
            </Link>
            <Link
              to="/terms"
              aria-current="page"
              className="flex min-h-[40px] flex-1 items-center justify-center rounded-full bg-[#111111] px-4 py-2 font-display text-[12px] font-bold tracking-[0.6px] text-white uppercase shadow-sm sm:flex-initial sm:px-5"
            >
              Terms of service
            </Link>
          </nav>

          <div className="flex items-center gap-2 font-display text-[11px] tracking-[1.1px] text-[#4A4844] uppercase">
            <span className="h-2 w-2 rounded-full bg-[#FA3674]" />
            <span>Identity: Anh — UI/UX Designer</span>
          </div>
        </div>

        {/* Editorial Headline */}
        <div className="mt-8 md:mt-12">
          <h1
            id="terms-heading"
            className="font-display text-[44px] leading-[1.02] font-bold tracking-[-0.04em] text-[#111111] sm:text-[68px] lg:text-[88px]"
          >
            Terms of service
          </h1>

          <div className="mt-6 flex items-center" aria-hidden="true">
            <span className="h-3 w-[1.5px] bg-[#FA3674]" />
            <span className="h-[1.5px] flex-1 bg-[#FA3674]/80" />
            <span className="h-3 w-[1.5px] bg-[#FA3674]" />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2.5 text-[14px] text-[#4A4844]">
            <span className="rounded bg-[#FFE9F0] px-2 py-0.5 font-display text-[10px] font-bold tracking-[1px] text-[#B8004C] uppercase">
              2026 Edition
            </span>
            <span>
              Portfolio terms of use · Questions? Write to{' '}
              <a
                href="mailto:lezanh1611@gmail.com"
                className="font-medium text-[#B8004C] underline underline-offset-2 hover:text-[#111111]"
              >
                lezanh1611@gmail.com
              </a>
              .
            </span>
          </div>
        </div>

        {/* Clauses */}
        <div className="mt-10 flex flex-col gap-5 md:mt-14 md:gap-4">
          {TERMS_CLAUSES.map((clause) => (
            <article
              key={clause.num}
              className={`glass-card p-6 md:rounded-[16px] md:p-10 ${
                clause.shaded ? 'md:bg-[#F2EFE9]/85' : 'md:bg-white/75'
              }`}
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
                <div className="flex items-baseline gap-4 md:col-span-4">
                  <span className="font-display text-[16px] font-bold text-[#B8004C]">
                    {clause.num}
                  </span>
                  <h2 className="font-display text-[21px] font-bold tracking-[-0.02em] text-[#111111] md:text-[24px]">
                    {clause.title}
                  </h2>
                </div>

                <div className="flex flex-col gap-4 md:col-span-8">
                  <p className="text-[15px] leading-[25px] text-[#111111] sm:text-[17px] sm:leading-[28px]">
                    {clause.body}
                  </p>

                  {clause.tags && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {clause.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-[#EAE6DE] px-2.5 py-1 font-display text-[11px] font-semibold tracking-[0.55px] text-[#4A4844] uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {clause.note && (
                    <div className="flex items-start gap-3 rounded-[10px] bg-[#EAE6DE]/90 p-4 text-[13px] leading-[20px] text-[#4A4844]">
                      <img
                        src="/assets/figma/5d6c8.svg"
                        alt=""
                        className="mt-0.5 h-4 w-3.5 shrink-0"
                      />
                      <p>{clause.note}</p>
                    </div>
                  )}

                  {clause.badges && (
                    <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2">
                      {clause.badges.map((b) => (
                        <div
                          key={b.label}
                          className="flex items-center gap-3 rounded-[10px] bg-[#EAE6DE]/90 px-4 py-3"
                        >
                          <img src={b.icon} alt="" className="h-4 w-4 shrink-0" />
                          <span className="font-display text-[12px] font-medium tracking-[0.4px] text-[#111111] uppercase">
                            {b.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Contact & Inquiries Footer Card */}
        <div className="glass-card-strong mt-8 flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-8 md:mt-10">
          <div>
            <h2 className="font-display text-[20px] font-bold text-[#111111]">
              05 · Contact &amp; Inquiries
            </h2>
            <p className="mt-1 text-[15px] leading-[24px] text-[#4A4844]">
              For role opportunities, portfolio walkthroughs, or permissions, reach out at{' '}
              <a
                href="mailto:lezanh1611@gmail.com"
                className="font-semibold text-[#111111] underline underline-offset-2"
              >
                lezanh1611@gmail.com
              </a>
              .
            </p>
          </div>

          <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
            <a
              href="mailto:lezanh1611@gmail.com"
              className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-[#111111] px-6 py-3 font-display text-[12px] font-bold tracking-[0.7px] text-white uppercase transition-transform hover:scale-[1.02] sm:flex-initial"
            >
              <span>Questions? Write by email</span>
              <img src="/assets/figma/f3113.svg" alt="" className="h-3 w-3" />
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#DED9D0] bg-[#EAE6DE] px-5 py-3 font-display text-[12px] font-bold tracking-[0.7px] text-[#111111] uppercase transition-colors hover:bg-white cursor-pointer"
            >
              <img src="/assets/figma/5fd7d.svg" alt="" className="h-3.5 w-3" />
              <span>{copied ? 'Copied!' : 'Copy email'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
