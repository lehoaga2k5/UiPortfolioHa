import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router';

const springTick = (t: number) =>
  1 - Math.exp(-t * 7.7171) * (Math.cos(t * 6.1913) + 1.2464 * Math.sin(t * 6.1913));

const springCardA = (t: number) =>
  1 - Math.exp(-t * 7.4674) * (Math.cos(t * 9.9565) + 0.75 * Math.sin(t * 9.9565));

const springCardSettle = (t: number) =>
  1 - Math.exp(-t * 7.591) * (Math.cos(t * 7.7443) + 0.9802 * Math.sin(t * 7.7443));

export function NotFoundPage() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden bg-[#F7F6F3]"
      data-node-id="1:3872"
      aria-labelledby="not-found-heading"
    >
      {/* Ambient Aurora */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-16 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#FA3674]/10 blur-3xl"
      />

      <div className="mx-auto flex max-w-[1152px] flex-col px-5 py-10 sm:px-8 md:px-12 md:py-14">
        {/* Top Archival Specimen Marker */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DED9D0]/80 pb-4">
          <div className="flex items-center gap-2.5">
            <motion.span
              className="h-2.5 w-2.5 rounded-full bg-[#FA3674]"
              animate={
                prefersReduced
                  ? undefined
                  : {
                      opacity: [1, 1, 0.2, 0.2, 1, 1, 0.2, 0.2, 1, 1, 0.2, 0.2, 1, 1],
                    }
              }
              transition={{
                duration: 3.8,
                times: [
                  0, 0.1183, 0.1184, 0.1841, 0.1842, 0.4867, 0.4868, 0.5525,
                  0.5526, 0.8157, 0.8158, 0.8815, 0.8816, 1,
                ],
                ease: 'linear',
                repeat: Infinity,
              }}
            />
            <span className="font-display text-[12px] font-bold tracking-[1.2px] text-[#111111] uppercase">
              SYS.ERR // 0404
            </span>
            <span className="text-[#68635C]">/</span>
            <span className="font-display text-[12px] tracking-[1.2px] text-[#4A4844] uppercase">
              Anh Design Archive
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[11px] tracking-[1.1px] text-[#4A4844] uppercase sm:inline">
              LOC: 21.0285° N, 105.8542° E
            </span>
            <span className="rounded-[4px] border border-[#111111] bg-[#EAE6DE] px-2.5 py-1 font-display text-[10px] font-bold tracking-[1px] text-[#111111] uppercase">
              Status: Unresolved
            </span>
          </div>
        </div>

        {/* Central Polaroid + Monumental 404 Composition */}
        <div className="relative my-10 flex flex-col items-center justify-center py-6 sm:my-14">
          {/* Overlapping Polaroid Specimen Cards */}
          <div className="relative z-10 mb-[-28px] flex h-[210px] w-full max-w-[460px] items-center justify-center sm:mb-[-44px] sm:h-[260px]">
            {/* Left Angled Specimen 01 */}
            <div className="absolute left-1/2 -translate-x-[108%] -rotate-12 sm:-translate-x-[125%]">
              <motion.div
                className="w-[126px] rounded-[3px] border border-[#1A1A1A] bg-white p-2 pb-5 shadow-[3px_4px_0px_#1A1A1A] sm:w-[164px] sm:pb-6"
                animate={
                  prefersReduced
                    ? undefined
                    : {
                        x: [0, 0, -24, -18, 0, 0],
                        y: [0, 0, -14, -8, 0, 0],
                        rotate: [0, 0, -6, -3, 0, 0],
                        scale: [1, 1, 1.04, 1.01, 1, 1],
                      }
                }
                transition={{
                  duration: 3.8,
                  times: [0, 0.1316, 0.2947, 0.5395, 0.8026, 1],
                  ease: [[0.5, 0, 0.5, 1], springCardA, 'easeInOut', springCardSettle, 'easeInOut'],
                  repeat: Infinity,
                }}
              >
                <div className="h-[130px] w-full overflow-hidden bg-[#EEE9E0] sm:h-[176px]">
                  <img
                    src="/assets/figma/64137.png"
                    alt="Archival UI specimen 01"
                    className="h-full w-full object-cover grayscale"
                  />
                </div>
                <p className="mt-2 font-mono text-[8px] font-bold tracking-tight text-[#1A1A1A] uppercase sm:text-[9px]">
                  SPECIMEN // 01
                </p>
              </motion.div>
            </div>

            {/* Right Angled Specimen 03 */}
            <div className="absolute left-1/2 translate-x-[8%] rotate-12 sm:translate-x-[25%]">
              <motion.div
                className="w-[126px] rounded-[3px] border border-[#1A1A1A] bg-white p-2 pb-5 shadow-[3px_4px_0px_#1A1A1A] sm:w-[164px] sm:pb-6"
                animate={
                  prefersReduced
                    ? undefined
                    : {
                        x: [0, 0, 24, 18, 0, 0],
                        y: [0, 0, -14, -8, 0, 0],
                        rotate: [0, 0, 6, 3, 0, 0],
                        scale: [1, 1, 1.04, 1.01, 1, 1],
                      }
                }
                transition={{
                  duration: 3.8,
                  times: [0, 0.1632, 0.3263, 0.5711, 0.8342, 1],
                  ease: [[0.5, 0, 0.5, 1], springCardA, 'easeInOut', springCardSettle, 'easeInOut'],
                  repeat: Infinity,
                }}
              >
                <div className="h-[130px] w-full overflow-hidden bg-[#EEE9E0] sm:h-[176px]">
                  <img
                    src="/assets/figma/5d8e1.png"
                    alt="Archival UI specimen 03"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-2 font-mono text-[8px] font-bold tracking-tight text-[#1A1A1A] uppercase sm:text-[9px]">
                  SPECIMEN // 03
                </p>
              </motion.div>
            </div>

            {/* Center Elevated Specimen 02 */}
            <div className="relative z-20 -rotate-2">
              <motion.div
                className="w-[142px] rounded-[3px] border-2 border-[#1A1A1A] bg-white p-2.5 pb-6 shadow-[4px_6px_0px_#1A1A1A] sm:w-[184px] sm:pb-7"
                animate={
                  prefersReduced
                    ? undefined
                    : {
                        y: [0, 0, -24, -14, 0, 0],
                        rotate: [0, 0, 3.5, -2, 0, 0],
                        scale: [1, 1, 1.07, 1.02, 1, 1],
                      }
                }
                transition={{
                  duration: 3.8,
                  times: [0, 0.1474, 0.3105, 0.5553, 0.8184, 1],
                  ease: [[0.5, 0, 0.5, 1], springCardA, 'easeInOut', springCardSettle, 'easeInOut'],
                  repeat: Infinity,
                }}
              >
                <div className="relative h-[146px] w-full overflow-hidden bg-[#EEE9E0] sm:h-[196px]">
                  <img
                    src="/assets/figma/f5fc9.png"
                    alt="Featured archival specimen"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute top-1.5 right-1.5 bg-[#FFCC00] px-1.5 py-0.5 font-mono text-[8px] font-bold text-[#1A1A1A]">
                    FIG.404
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between font-mono text-[8px] font-bold uppercase sm:text-[9px]">
                  <span className="text-[#1A1A1A]">WHITE TULIPA</span>
                  <span className="text-[#B8004C]">100%</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Architectural Coral Hairline + Monumental 404 */}
          <div className="relative flex w-full items-center justify-center py-4">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-[#FA3674]/85"
            >
              <motion.span
                className="absolute -top-6 left-4 h-12 w-[1.5px] bg-[#FA3674]"
                animate={
                  prefersReduced
                    ? undefined
                    : { scaleY: [1, 1, 1.32, 1, 1], x: [0, 0, 36, 0, 0] }
                }
                transition={{
                  duration: 3.8,
                  times: [0, 0.1184, 0.3553, 0.7237, 1],
                  ease: [[0.5, 0, 0.5, 1], springTick, 'easeInOut', 'easeInOut'],
                  repeat: Infinity,
                }}
              />
              <motion.span
                className="absolute right-4 -bottom-5 h-10 w-[1.5px] bg-[#FA3674]/70"
                animate={
                  prefersReduced
                    ? undefined
                    : { scaleY: [1, 1, 1.32, 1, 1], x: [0, 0, -36, 0, 0] }
                }
                transition={{
                  duration: 3.8,
                  times: [0, 0.1184, 0.3553, 0.7237, 1],
                  ease: [[0.5, 0, 0.5, 1], springTick, 'easeInOut', 'easeInOut'],
                  repeat: Infinity,
                }}
              />
            </div>

            <h1
              id="not-found-heading"
              aria-label="404 Page Not Found"
              className="relative z-10 flex select-none font-display text-[124px] leading-[0.86] font-bold tracking-[-0.06em] text-[#111111] drop-shadow-[4px_4px_0px_rgba(250,54,116,0.16)] sm:text-[220px] md:text-[310px]"
            >
              {/* CENTER_OUT Stagger from Figma motion-404.json: index 1 ('0') starts at 0ms, indices 0 & 2 ('4','4') at 220ms */}
              {[
                { char: '4', order: 1 },
                { char: '0', order: 0 },
                { char: '4', order: 1 },
              ].map((item, i) => (
                <motion.span
                  key={i}
                  initial={
                    prefersReduced
                      ? false
                      : { opacity: 0, scale: 0.82, filter: 'blur(14px)' }
                  }
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{
                    type: 'spring',
                    mass: 1,
                    stiffness: 100,
                    damping: 15.6,
                    delay: item.order * 0.22,
                  }}
                >
                  {item.char}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Copy */}
          <div className="mt-4 flex max-w-[520px] flex-col items-center gap-2 text-center">
            <p className="font-display text-[20px] leading-[28px] font-bold tracking-[-0.02em] text-[#111111] sm:text-[22px]">
              This page wandered off into the design system ether.
            </p>
            <p className="text-[14px] leading-[22px] text-[#4A4844] sm:text-[15px]">
              The link might be outdated or the component was retired during an iteration. Let’s get you back to something worth looking at.
            </p>
          </div>

          {/* Recovery Actions */}
          <div className="mt-8 flex w-full max-w-[440px] flex-col items-stretch justify-center gap-3.5 sm:flex-row sm:items-center">
            <motion.div
              className="flex-1"
              animate={prefersReduced ? undefined : { y: [0, 0, -5, 0, 0] }}
              transition={{
                duration: 3.8,
                times: [0, 0.5789, 0.7237, 0.9079, 1],
                ease: [[0.5, 0, 0.5, 1], springCardSettle, 'easeInOut', 'easeInOut'],
                repeat: Infinity,
              }}
            >
              <Link
                to="/"
                className="flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-full border-2 border-[#111111] bg-[#111111] px-7 py-3.5 font-display text-[12px] font-bold tracking-[1.2px] text-white uppercase shadow-[4px_4px_0px_#1A1A1A] transition-transform hover:-translate-y-0.5 sm:rounded-[12px]"
              >
                <img src="/assets/figma/66bc7.svg" alt="" className="h-3 w-3" />
                <span>Back to Home</span>
              </Link>
            </motion.div>

            <Link
              to="/work"
              className="flex min-h-[50px] flex-1 items-center justify-center gap-2.5 rounded-full border-2 border-[#111111] bg-[#F2EFE9] px-7 py-3.5 font-display text-[12px] font-bold tracking-[1.2px] text-[#111111] uppercase shadow-[4px_4px_0px_#1A1A1A] transition-transform hover:-translate-y-0.5 sm:rounded-[12px]"
            >
              <span>Selected Works</span>
              <img src="/assets/figma/bd0fc.svg" alt="" className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
