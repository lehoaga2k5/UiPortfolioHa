import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router';

const springAccent = (t: number) =>
  1 - Math.exp(-t * 7.7171) * (Math.cos(t * 6.1913) + 1.2464 * Math.sin(t * 6.1913));

const springCta = (t: number) =>
  1 - Math.exp(-t * 7.591) * (Math.cos(t * 7.7443) + 0.9802 * Math.sin(t * 7.7443));

const springArrow = (t: number) =>
  1 - Math.exp(-t * 7.4674) * (Math.cos(t * 9.9565) + 0.75 * Math.sin(t * 9.9565));

export function ContactPage() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden bg-[#F7F6F3]"
      data-node-id="1:3411"
      aria-labelledby="contact-heading"
    >
      {/* Subtle Glass UI Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[8%] h-72 w-72 rounded-full bg-[#FA3674]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 left-[6%] h-64 w-64 rounded-full bg-[#BAFF39]/20 blur-3xl"
      />

      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 px-5 py-12 sm:px-8 md:gap-12 md:px-12 md:py-20">
        {/* Status Indicator Pill */}
        <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/85 bg-[#FFE9F0]/90 px-3.5 py-1.5 shadow-[0_8px_20px_-3px_rgba(18,18,23,0.08)] backdrop-blur-md md:rounded-[12px] md:bg-[#EAE6DE]">
          <span className="relative flex h-2 w-2 items-center justify-center">
            <motion.span
              className="absolute inset-0 rounded-full bg-[#FA3674]"
              initial={{ opacity: 0.85, scale: 1 }}
              animate={
                prefersReduced
                  ? undefined
                  : {
                      opacity: [0.85, 0.85, 0, 0, 0.85, 0, 0, 0.85],
                      scale: [1, 1, 2.5, 2.5, 1, 2.5, 2.5, 1],
                    }
              }
              transition={{
                duration: 3.18,
                times: [0, 0.0472, 0.4088, 0.5188, 0.5189, 0.8805, 0.9999, 1],
                ease: ['linear', 'easeOut', 'linear', 'linear', 'easeOut', 'linear', 'linear'],
                repeat: Infinity,
              }}
            />
            <span className="relative h-2 w-2 rounded-full bg-[#FA3674]" />
          </span>
          <span className="font-display text-[11px] font-semibold tracking-[1.1px] text-[#B8004C] uppercase md:text-[12px] md:text-[#111111]">
            Open to Fresher UI/UX Designer Roles
          </span>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Editorial Headline & Direct Contact */}
          <div className="relative flex flex-col justify-between gap-10 lg:col-span-6">
            <div className="relative pl-4 sm:pl-5">
              {/* Architectural Pink Accent Line */}
              <motion.div
                aria-hidden="true"
                className="absolute top-0 bottom-2 left-0 w-[2px] origin-center bg-[#FA3674]"
                animate={
                  prefersReduced
                    ? undefined
                    : { scaleY: [1, 1, 0.78, 1.04, 1, 1] }
                }
                transition={{
                  duration: 3.18,
                  times: [0, 0.0786, 0.3616, 0.6761, 0.9119, 1],
                  ease: [[0.5, 0, 0.5, 1], [0.16, 1, 0.3, 1], springAccent, 'easeInOut', 'easeInOut'],
                  repeat: Infinity,
                }}
              />

              <h1
                id="contact-heading"
                className="font-display text-[52px] leading-[0.98] font-bold tracking-[-0.03em] text-[#111111] sm:text-[72px] lg:text-[92px]"
              >
                {['Get', 'in', 'touch'].map((word, idx) => (
                  <motion.span
                    key={word}
                    className={idx === 1 ? 'mr-4 inline-block' : idx === 0 ? 'mr-4 inline-block' : 'block'}
                    initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.28,
                      delay: idx * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <p className="mt-5 max-w-[512px] text-[16px] leading-[26px] text-[#4A4844] sm:text-[18px] sm:leading-[28px]">
                I’m open to Fresher UI/UX Designer roles. Email me about an opening or a project in this portfolio.
              </p>

              {/* Direct Contact Callout */}
              <div className="mt-8 flex flex-col gap-2">
                <span className="font-display text-[12px] tracking-[1.2px] text-[#4A4844] uppercase">
                  Direct Contact
                </span>
                <a
                  href="mailto:lezanh1611@gmail.com"
                  className="group inline-flex w-fit items-center gap-2.5 font-display text-[22px] font-bold text-[#111111] underline decoration-2 underline-offset-4 transition-colors hover:text-[#B8004C] sm:text-[30px]"
                >
                  <span>lezanh1611@gmail.com</span>
                  <motion.img
                    src="/assets/figma/2b62b.svg"
                    alt=""
                    className="h-3.5 w-3.5 shrink-0"
                    animate={
                      prefersReduced
                        ? undefined
                        : { x: [0, 0, 3, 0, 0], y: [0, 0, -2, 0, 0] }
                    }
                    transition={{
                      duration: 3.18,
                      times: [0, 0.1824, 0.3899, 0.695, 1],
                      ease: 'easeInOut',
                      repeat: Infinity,
                    }}
                  />
                </a>
              </div>
            </div>

            {/* Based In Metadata Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#DED9D0] pt-6">
              <span className="font-display text-[12px] tracking-[1.2px] text-[#4A4844] uppercase">
                Based in
              </span>
              <div className="flex items-center gap-2 text-[14px] font-semibold text-[#111111]">
                <motion.img
                  src="/assets/figma/e95ae.svg"
                  alt=""
                  className="h-3.5 w-3 shrink-0"
                  animate={prefersReduced ? undefined : { y: [0, 0, -3, 0, 0] }}
                  transition={{
                    duration: 3.18,
                    times: [0, 0.2642, 0.5, 0.8491, 1],
                    ease: 'easeInOut',
                    repeat: Infinity,
                  }}
                />
                <span>Hanoi, Vietnam (UTC+7) · Open to remote</span>
              </div>
            </div>
          </div>

          {/* Right Column: Obsidian / Dark Matrix Email Card */}
          <div className="lg:col-span-6">
            <div className="glass-dark relative flex flex-col items-start gap-6 overflow-hidden rounded-[24px] bg-[#111111] p-7 text-[#F7F6F3] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] sm:rounded-[28px] sm:p-10">
              <span className="font-mono text-[12px] font-medium tracking-[1px] text-[#BAFF39] uppercase">
                Direct Contact
              </span>
              <h2 className="font-display text-[32px] leading-tight font-bold text-[#F7F6F3] sm:text-[40px]">
                Email me
              </h2>
              <p className="text-[15px] leading-[24px] text-[#F7F6F3]/90 sm:text-[16px]">
                If you’re hiring for a Fresher UI/UX Designer role, tell me a little about the product and the team.
              </p>

              <div className="flex w-full flex-wrap items-center gap-3 pt-1">
                <motion.a
                  href="mailto:lezanh1611@gmail.com"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#BAFF39] px-6 py-3.5 text-[15px] font-semibold text-[#111111] shadow-[0_10px_24px_-4px_rgba(186,255,57,0.35)] transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BAFF39] sm:rounded-[10px]"
                  animate={
                    prefersReduced
                      ? undefined
                      : { scale: [1, 1, 1.045, 1, 1], y: [0, 0, -3, 0, 0] }
                  }
                  transition={{
                    duration: 3.18,
                    times: [0, 0.0692, 0.2579, 0.5503, 1],
                    ease: [[0.5, 0, 0.5, 1], springCta, 'easeInOut', 'easeInOut'],
                    repeat: Infinity,
                  }}
                >
                  <span>Open email</span>
                  <motion.img
                    src="/assets/figma/646b9.svg"
                    alt=""
                    className="h-3.5 w-3.5"
                    animate={
                      prefersReduced
                        ? undefined
                        : { x: [0, 0, 6, 0, 0], y: [0, 0, -5, 0, 0] }
                    }
                    transition={{
                      duration: 3.18,
                      times: [0, 0.0692, 0.2579, 0.5503, 1],
                      ease: [[0.5, 0, 0.5, 1], springArrow, 'easeInOut', 'easeInOut'],
                      repeat: Infinity,
                    }}
                  />
                </motion.a>

                <Link
                  to="/work"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 py-3 text-[14px] font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:rounded-[10px]"
                >
                  ← Browse selected work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
