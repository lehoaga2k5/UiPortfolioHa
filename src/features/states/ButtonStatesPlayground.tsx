import { useEffect, useId, useRef, useState } from 'react';
import type { GlassButtonState } from '../../types/portfolio';

const states: GlassButtonState[] = ['Default', 'Hover', 'Active', 'Focus', 'Loading', 'Disabled'];
const descriptions: Record<GlassButtonState, string> = {
  Default: 'Ready to submit.',
  Hover: 'The glass surface brightens on hover.',
  Active: 'A lime tint and inset shadow show the press.',
  Focus: 'A light inner ring and a coral outer ring mark keyboard focus.',
  Loading: 'The spinner keeps the button the same size while saving.',
  Disabled: 'Save is unavailable until the required details are complete.',
};

const previewStyles: Record<GlassButtonState, string> = {
  Default: 'glass-pill',
  Hover: 'glass-pill-pink',
  Active: 'glass-pressed translate-y-px',
  Focus: 'glass-pill-pink outline-2 outline-offset-2 outline-[#fa3674] ring-2 ring-white',
  Loading: 'glass-pill',
  Disabled: 'border-portfolio-line bg-portfolio-subtle text-portfolio-muted shadow-none',
};

type RequestState = 'idle' | 'saving' | 'saved' | 'failed';
const focus = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fa3674] focus-visible:ring-2 focus-visible:ring-white';

export function ButtonStatesPlayground() {
  const [state, setState] = useState<GlassButtonState>('Default');
  const [request, setRequest] = useState<RequestState>('idle');
  const [failNext, setFailNext] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const id = useId();

  useEffect(() => () => {
    if (timer.current !== null) clearTimeout(timer.current);
  }, []);

  const saving = request === 'saving';
  const loading = saving || state === 'Loading';
  const unavailable = loading || state === 'Disabled';
  const displayState = saving ? 'Loading' : state;
  const status = request === 'saved' ? 'Changes saved.' : request === 'failed' ? 'Save failed. Your changes are still here. Try again.' : saving ? 'Saving changes…' : '';

  function save() {
    if (unavailable || timer.current !== null) return;
    setRequest('saving');
    setFailNext(false);
    timer.current = setTimeout(() => {
      timer.current = null;
      setRequest(failNext ? 'failed' : 'saved');
    }, 700);
  }

  return (
    <section aria-labelledby={id + '-heading'} className="glass-card-strong @container relative isolate min-w-0 p-4 text-[#1a1a1a] sm:p-6">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-[#1a1a1a]/20 pb-4">
        <div>
          <h3 id={id + '-heading'} className="font-display text-lg font-bold">Interactive Component Sandbox</h3>
          <p className="mt-1 text-xs text-portfolio-body">Toggle simulated states on the interactive button instance.</p>
        </div>
        <span className="rounded-[14px] border border-[var(--color-glass-border-lime)] bg-[var(--color-glass-tint-lime)] px-2.5 py-1 font-display text-[10px] font-bold tracking-wider uppercase">Prototype engine</span>
      </header>

      <div className="grid min-w-0 gap-4 py-4 @min-[570px]:grid-cols-[1fr_1fr]">
        <div className="glass-card relative isolate grid min-h-[140px] min-w-0 content-center justify-items-center gap-3 overflow-hidden px-3 py-4 text-center">
          <img src="/assets/figma/45924.svg" alt="" className="pointer-events-none absolute inset-0 -z-10 size-full object-cover opacity-45" />
          <button
            type="button"
            onClick={save}
            aria-busy={loading}
            aria-disabled={unavailable}
            aria-describedby={id + '-state-description'}
            className={`relative inline-flex min-h-11 w-full max-w-[164px] items-center justify-center rounded-full border px-3 py-1.5 text-sm font-semibold transition motion-reduce:transition-none ${focus} ${previewStyles[displayState]} ${unavailable ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-[#ffe9f0] active:translate-y-px active:bg-[#e5f7c4]'}`}
          >
            <span className={loading ? 'invisible' : ''}>{request === 'failed' ? 'Retry save' : 'Save Changes'}</span>
            {loading && (
              <span className="absolute inset-0 flex items-center justify-center" role="presentation">
                <img src="/assets/figma/763c9.svg" alt="" className="size-4 motion-safe:animate-spin" />
                <span className="sr-only">Saving changes</span>
              </span>
            )}
          </button>
          <p id={id + '-state-description'} className="text-xs text-portfolio-body">{descriptions[displayState]}</p>
        </div>

        <div role="group" aria-label="Button states" className="grid min-w-0 grid-cols-2 gap-2">
          {states.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={state === option}
              onClick={() => setState(option)}
              className={`glass-card-strong flex min-h-11 items-center justify-between gap-1 px-2.5 py-1.5 text-left font-display text-xs font-bold uppercase aria-pressed:border-[var(--color-glass-border-pink)] aria-pressed:bg-[var(--color-glass-tint-pink)] ${focus}`}
            >
              {option === 'Focus' ? 'Focus dual' : option === 'Disabled' ? 'Disabled state' : option}
              <span aria-hidden className={`size-2 shrink-0 rounded-full ${state === option ? 'bg-[#b8004c]' : 'bg-[#1a1a1a]/45'}`} />
            </button>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-[#1a1a1a]/20 pt-2">
        <label className="flex min-h-11 items-center gap-2 text-sm font-medium">
          <input type="checkbox" className={`size-4 shrink-0 accent-[#b8004c] ${focus}`} checked={failNext} onChange={(event) => setFailNext(event.target.checked)} />
          Simulate a failed save
        </label>
        <p role="status" className={`text-sm font-medium ${request === 'failed' ? 'text-portfolio-secondary-text' : 'text-portfolio-body'}`}>{status}</p>
      </div>
    </section>
  );
}
