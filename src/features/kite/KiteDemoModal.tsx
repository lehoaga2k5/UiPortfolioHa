import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'motion/react';
import type { KiteDemoModalProps, KiteDemoStep } from '../../types/portfolio';

const steps = {
  1: {
    label: '1 / 3',
    title: 'Find the delayed shipments',
    description: 'A dispatcher needs to isolate the late deliveries before checking what changed.',
    action: 'Show delayed shipments',
    next: 2,
  },
  2: {
    label: '2 / 3',
    title: 'Inspect the flagged delivery',
    description: 'Open the delayed shipment to see what changed on its route.',
    action: 'Inspect KT-8842-MA',
    next: 3,
  },
  3: {
    label: '3 / 3',
    title: 'Check the revised ETA',
    description: 'Compare the original estimate with the revised arrival time before sending the reroute for review.',
    action: 'Review reroute',
    next: 'complete',
  },
  complete: {
    label: 'Complete',
    title: 'Reroute ready for review',
    description: 'The delayed shipment, route change, and revised ETA are ready for the dispatcher to review.',
    action: 'Done',
    next: null,
  },
} as const;

const sampleShipments = [
  ['KT-8842-MA', 'Nguyen Van Minh', 'Delayed'],
  ['KT-8849-MA', 'Tran Thu Ha', 'Out for delivery'],
  ['KT-8810-MA', 'Le Quang Nam', 'In transit'],
] as const;

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b8004c]';

function DemoDialog({ onClose, initialStep = 1 }: Omit<KiteDemoModalProps, 'open'>) {
  const [step, setStep] = useState<KiteDemoStep>(initialStep);
  const titleId = useId();
  const dialog = useRef<HTMLElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const hasAdvanced = useRef(false);
  const close = useRef(onClose);
  const reducedMotion = useReducedMotion();
  const content = steps[step];

  useEffect(() => {
    close.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const previousSiblings = Array.from(document.body.children)
      .filter((child) => child !== dialog.current?.parentElement && child instanceof HTMLElement)
      .map((child) => ({ child: child as HTMLElement, inert: child.hasAttribute('inert') }));
    for (const { child } of previousSiblings) child.setAttribute('inert', '');
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();

    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        close.current();
      }
      if (event.key !== 'Tab' || !dialog.current) return;
      const buttons = dialog.current.querySelectorAll<HTMLButtonElement>('button:not([disabled])');
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      const focused = document.activeElement;
      if (event.shiftKey && (focused === first || focused === stepHeading.current)) {
        event.preventDefault();
        (focused === first ? last : first)?.focus();
      } else if (!event.shiftKey && focused === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
      for (const { child, inert } of previousSiblings) {
        if (!inert) child.removeAttribute('inert');
      }
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, []);

  useEffect(() => {
    if (hasAdvanced.current) stepHeading.current?.focus();
  }, [step]);

  function advance() {
    if (content.next === null) {
      onClose();
      return;
    }
    hasAdvanced.current = true;
    setStep(content.next);
  }

  return (
    <div
      className="fixed inset-0 z-[110] grid place-items-center bg-black/45 p-3 sm:p-6"
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <section
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="glass-card-strong max-h-full w-full max-w-[420px] overflow-y-auto overscroll-contain p-[18px] text-[#111]"
      >
        <header className="flex items-center justify-between gap-3 border-b border-portfolio-line pb-[11px]">
          <h2 id={titleId} className="text-[15px] font-semibold">Kite dispatch</h2>
          <button ref={closeButton} type="button" onClick={onClose} className={`min-h-11 rounded-full border border-portfolio-line bg-white px-3.5 text-sm font-semibold ${focusRing}`}>
            Close demo
          </button>
        </header>
        <div className="my-[11px] space-y-[7px]">
          <span className="inline-flex rounded-full bg-portfolio-tint px-[9px] py-1 text-[11px] font-semibold text-portfolio-secondary-text">{content.label}</span>
          <h3 ref={stepHeading} tabIndex={-1} className="font-display text-[23px] leading-[27px] font-bold focus:outline-none">{content.title}</h3>
          <p className="text-[13px] leading-[19px] text-portfolio-body">{content.description}</p>
        </div>
        <motion.div
          key={step}
          initial={reducedMotion ? false : { opacity: 0, y: 7 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.18 }}
          className="space-y-2"
        >
          {step === 1 || step === 2 ? sampleShipments.slice(0, step === 1 ? 3 : 1).map(([id, courier, status]) => (
            <div key={id} className="space-y-1 rounded-lg border border-portfolio-line bg-white p-3">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <strong className="text-[13px]">{id}</strong>
                <span className={`rounded-full px-[9px] py-1 text-[11px] font-semibold ${status === 'Delayed' ? 'bg-portfolio-tint text-portfolio-secondary-text' : 'bg-portfolio-subtle text-portfolio-muted'}`}>{status}</span>
              </div>
              <p className="text-xs text-portfolio-body">{courier}</p>
              {step === 2 && <p className="text-xs text-portfolio-body">Medical Cold-Chain Package · 4.2 kg</p>}
            </div>
          )) : (
            <div className="space-y-2 rounded-lg border border-portfolio-line bg-white p-3 text-[13px]">
              <strong>KT-8842-MA</strong>
              <p>Rerouted — Trang Tien Blockage</p>
              <p className="text-portfolio-body">Alt-route via Ngo Quyen and Hai Ba Trung.</p>
              <dl className="grid grid-cols-2 gap-2">
                <div><dt className="text-portfolio-muted">Original ETA</dt><dd>14:56 EST</dd></div>
                <div><dt className="text-portfolio-muted">Revised ETA</dt><dd className="font-semibold text-portfolio-secondary-text">15:18 EST · +22m</dd></div>
              </dl>
            </div>
          )}
        </motion.div>
        <button type="button" onClick={advance} className={`mt-[11px] min-h-11 w-full rounded-full bg-[#111] px-3.5 text-sm font-semibold text-white ${focusRing}`}>
          {content.action}
        </button>
        <p className="mt-[11px] text-[11px] text-portfolio-muted">Illustrative shipment data</p>
      </section>
    </div>
  );
}

export function KiteDemoModal({ open, ...props }: KiteDemoModalProps) {
  const [portal, setPortal] = useState<HTMLElement | null>(null);
  useEffect(() => {
    if (typeof document !== 'undefined') setPortal(document.body);
  }, []);
  return open && portal ? createPortal(<DemoDialog {...props} />, portal) : null;
}
