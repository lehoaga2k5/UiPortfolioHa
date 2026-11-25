/* @vitest-environment jsdom */
import { act, useState } from 'react';
import type { ReactNode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from '../src/App';
import { renderRoute } from '../src/entry-prerender';
import worker from '../src/worker';
import { BudgetInteractive } from '../src/features/budget/BudgetInteractive';
import { KiteDemoModal } from '../src/features/kite/KiteDemoModal';
import { KiteDispatchConsole } from '../src/features/kite/KiteDispatchConsole';
import { ReminderInteractive } from '../src/features/reminder/ReminderInteractive';
import { ButtonStatesPlayground } from '../src/features/states/ButtonStatesPlayground';
import { getRouteMeta, ROUTE_META, usePageMeta } from '../src/seo/routeMeta';

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  document.title = '';
  document.head.querySelectorAll('link[rel="canonical"], meta[name="description"], meta[property^="og:"], meta[data-portfolio-robots], #portfolio-json-ld').forEach((element) => element.remove());
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

function render(node: ReactNode) {
  act(() => root.render(node));
}

function button(label: string, scope: ParentNode = container) {
  const result = Array.from(scope.querySelectorAll<HTMLButtonElement>('button')).find(
    (element) => !element.closest('[hidden]') && (element.getAttribute('aria-label') === label || element.textContent?.trim() === label),
  );
  if (!result) throw new Error(`Missing button: ${label}`);
  return result;
}

function click(element: HTMLElement) {
  act(() => element.click());
}

function key(element: EventTarget, value: string, init: KeyboardEventInit = {}) {
  act(() => element.dispatchEvent(new KeyboardEvent('keydown', { key: value, bubbles: true, cancelable: true, ...init })));
}

describe('Route metadata', () => {
  it('defines unique metadata and canonical URLs for every prerendered route', () => {
    expect(Object.keys(ROUTE_META)).toEqual([
      '/', '/work', '/work/kite', '/work/budget-overview', '/work/reminder-flow', '/about',
      '/journal', '/journal/spacing-and-hierarchy', '/journal/component-states', '/contact', '/privacy', '/terms', '/404',
    ]);
    const metadata = Object.keys(ROUTE_META).map(getRouteMeta);
    expect(new Set(metadata.map(({ title }) => title)).size).toBe(13);
    for (const item of metadata) {
      expect(item.description.length).toBeGreaterThan(40);
      expect(item.canonical).toBe(`https://lehoanganh.id.vn${item.path}`);
      expect(item.jsonLd.url).toBe(item.canonical);
    }
    expect(getRouteMeta('/work/kite/?demo=true#dispatch').ogType).toBe('article');
    expect(getRouteMeta('/missing').path).toBe('/404');
    expect(getRouteMeta('/__proto__').path).toBe('/404');
  });

  it('updates managed head tags when navigating between routes', () => {
    function Meta({ path }: { path: string }) {
      usePageMeta(path);
      return null;
    }
    render(<Meta path="/missing" />);
    expect(document.head.querySelector('meta[data-portfolio-robots]')?.getAttribute('content')).toBe('noindex');
    render(<Meta path="/work/kite" />);
    expect(document.title).toBe(getRouteMeta('/work/kite').title);
    expect(document.head.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe('https://lehoanganh.id.vn/work/kite');
    expect(document.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.head.querySelector('meta[data-portfolio-robots]')).toBeNull();
    expect(JSON.parse(document.querySelector('#portfolio-json-ld')!.textContent!)['@type']).toBe('Article');
  });
});

describe('Kite', () => {
  it('runs the demo, contains keyboard focus, and restores the opener on Escape', () => {
    function Demo() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button onClick={() => setOpen(true)}>Launch demo</button>
          <KiteDemoModal open={open} onClose={() => setOpen(false)} />
        </>
      );
    }
    render(<Demo />);
    const trigger = button('Launch demo');
    trigger.focus();
    click(trigger);
    const dialog = document.querySelector('[role="dialog"]')!;
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(document.activeElement).toBe(button('Close demo', dialog));
    key(document.activeElement!, 'Tab', { shiftKey: true });
    expect(document.activeElement).toBe(button('Show delayed shipments', dialog));
    key(document.activeElement!, 'Tab');
    expect(document.activeElement).toBe(button('Close demo', dialog));

    click(button('Show delayed shipments', dialog));
    expect(dialog.textContent).toContain('Inspect the flagged delivery');
    expect(dialog.textContent).not.toContain('KT-8849-MA');
    click(button('Inspect KT-8842-MA', dialog));
    expect(dialog.textContent).toContain('Check the revised ETA');
    expect(dialog.textContent).toContain('15:18 EST');
    click(button('Review reroute', dialog));
    expect(dialog.textContent).toContain('Reroute ready for review');

    key(document.activeElement!, 'Escape');
    expect(document.querySelector('[role="dialog"]')).toBeNull();
    expect(document.activeElement).toBe(trigger);
    click(trigger);
    expect(document.querySelector('[role="dialog"]')?.textContent).toContain('Find the delayed shipments');
  });

  it('filters the manifest and inspects a shipment with the compact timeline', () => {
    const onOpenDemo = vi.fn();
    render(<KiteDispatchConsole onOpenDemo={onOpenDemo} />);
    expect(container.querySelector('img[src="/assets/figma/e572c.svg"]')).not.toBeNull();
    expect(container.querySelector('a[href="https://www.openstreetmap.org/copyright"]')).not.toBeNull();
    const search = container.querySelector<HTMLInputElement>('input[type="search"]')!;
    const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!;
    act(() => {
      setValue.call(search, 'Route #KT-8849');
      search.dispatchEvent(new Event('input', { bubbles: true }));
    });
    expect(container.querySelectorAll('ul button')).toHaveLength(1);
    expect(container.textContent).toContain('KT-8849-MA');
    click(button('Out for delivery 40'));
    expect(container.querySelector('[aria-label="Inspector for KT-8849-MA"]')).not.toBeNull();
    expect(container.textContent).not.toContain('KT-8842-MA');
    click(button('Tablet / Compact'));
    expect(button('Tablet / Compact').getAttribute('aria-pressed')).toBe('true');
    click(button('Close inspector'));
    expect(container.querySelector('[aria-label="Inspector for KT-8849-MA"]')).toBeNull();
    click(button('Open interactive demo'));
    expect(onOpenDemo).toHaveBeenCalledOnce();
  });
});

describe('Budget Overview', () => {
  it('selects forecast and activity views with the keyboard and changes the billing scenario', () => {
    render(<BudgetInteractive />);
    expect(container.textContent).toContain('$184,492.00');
    expect(container.textContent).toContain('$9,820.40');
    expect(container.textContent).toContain('18.8 months');
    button('Overview').focus();
    key(button('Overview'), 'ArrowRight');
    expect(button('Forecast').getAttribute('aria-selected')).toBe('true');
    expect(document.activeElement).toBe(button('Forecast'));
    click(button('Higher billings'));
    expect(button('Higher billings').getAttribute('aria-pressed')).toBe('true');
    expect(container.textContent).toContain('22.4 months');
    click(button('Baseline'));
    expect(container.textContent).not.toContain('22.4 months');
    key(button('Forecast'), 'End');
    const category = container.querySelector('select')!;
    act(() => {
      category.value = 'Operating expense';
      category.dispatchEvent(new Event('change', { bubbles: true }));
    });
    expect(category.value).toBe('Operating expense');
    expect(container.textContent).toContain('Cloud infrastructure');
    expect(container.textContent).not.toContain('Brand architecture retainer');
  });
});

describe('Reminder Flow', () => {
  it('snoozes the notification, records the dose once, and shows it in history', () => {
    render(<ReminderInteractive />);
    key(button('Today'), 'ArrowRight');
    expect(button('History').getAttribute('aria-selected')).toBe('true');
    expect(container.textContent).toContain('No doses logged yet.');
    click(button('Today'));
    click(button('Review dose'));
    expect(document.activeElement?.textContent).toBe('Review dose');
    key(document.activeElement!, 'Escape');
    expect(document.activeElement).toBe(button('Review dose'));
    click(button('Review dose'));
    click(button('Remind me in 15 min (Snooze 15 min)'));
    expect(container.textContent).toContain('Reminder moved to 08:45');
    expect(container.textContent).toContain('08:30');
    click(button('Review dose'));
    click(button('Mark as taken (Log dose now)'));
    expect(button('History').getAttribute('aria-selected')).toBe('true');
    expect(container.textContent).toContain('Dose recorded');
    expect(container.textContent).toContain('Scheduled 08:30 · logged 08:34');
    click(button('Today'));
    click(button('Review dose'));
    expect(container.textContent).toContain('Dose is already in the log');
    expect(container.querySelector('[aria-label="Mark as taken (Log dose now)"]')).toBeNull();
  });
});

describe('Component States', () => {
  it('previews each state and recovers from a failed async save', () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    render(<ButtonStatesPlayground />);
    for (const state of ['Default', 'Hover', 'Active', 'Focus dual', 'Loading', 'Disabled state']) {
      click(button(state));
      expect(button(state).getAttribute('aria-pressed')).toBe('true');
    }
    expect(button('Save Changes').getAttribute('aria-disabled')).toBe('true');
    click(button('Default'));
    click(container.querySelector<HTMLInputElement>('input[type="checkbox"]')!);
    click(button('Save Changes'));
    expect(container.querySelector('button[aria-busy="true"]')).not.toBeNull();
    act(() => vi.advanceTimersByTime(700));
    expect(container.querySelector('[role="status"]')?.textContent).toContain('Save failed');
    click(button('Retry save'));
    act(() => vi.advanceTimersByTime(700));
    expect(container.querySelector('[role="status"]')?.textContent).toBe('Changes saved.');
  });

  it('renders all widgets on the server', () => {
    const html = renderToString(
      <>
        <KiteDemoModal open={false} onClose={() => {}} />
        <KiteDispatchConsole onOpenDemo={() => {}} />
        <BudgetInteractive />
        <ReminderInteractive />
        <ButtonStatesPlayground />
      </>,
    );
    expect(html).toContain('KT-8842-MA');
    expect(html).toContain('Studio Acme');
    expect(html).toContain('Medication A');
    expect(html).toContain('Interactive Component Sandbox');
  });

  it('hydrates all 13 prerendered routes without hydration mismatches under normal and reduced motion', () => {
    window.scrollTo = vi.fn();
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
        takeRecords() {
          return [];
        }
      },
    );
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    );
    for (const reducedMotion of [false, true]) {
      vi.stubGlobal(
        'matchMedia',
        vi.fn().mockImplementation((query: string) => ({
          matches: query.includes('prefers-reduced-motion') ? reducedMotion : false,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      );

      for (const [ssrPath, clientPath] of [
        ...Object.keys(ROUTE_META).map((routePath) => [routePath, routePath] as const),
        ['/404', '/work/missing'] as const,
        ['/404', '/journal/missing'] as const,
      ]) {
        const ssrMarkup = renderRoute(ssrPath);
        const mountNode = document.createElement('div');
        mountNode.innerHTML = ssrMarkup;
        document.body.append(mountNode);

        const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        let hydratedRoot: Root | undefined;
        try {
          act(() => {
            hydratedRoot = hydrateRoot(
              mountNode,
              <MemoryRouter initialEntries={[clientPath]}>
                <App />
              </MemoryRouter>,
            );
          });
          expect(errorSpy.mock.calls, `Hydration error on ${clientPath} (reducedMotion=${reducedMotion})`).toEqual([]);
        } finally {
          if (hydratedRoot) {
            act(() => hydratedRoot!.unmount());
          }
          errorSpy.mockRestore();
          mountNode.remove();
        }
      }
    }
  });

  it('handles Cloudflare edge redirects, percent-escapes, 404 status, and workers.dev robots headers', async () => {
    const assets = {
      fetch: vi.fn(async () => new Response('<html>404</html>', { status: 200, headers: { 'content-type': 'text/html' } })),
    };

    const wwwRes = await worker.fetch(new Request('https://www.lehoanganh.id.vn/work/kite?demo=1'), { ASSETS: assets });
    expect(wwwRes.status).toBe(308);
    expect(wwwRes.headers.get('location')).toBe('https://lehoanganh.id.vn/work/kite?demo=1');

    const escapedRes = await worker.fetch(new Request('https://lehoanganh.id.vn/work%2Fkite'), { ASSETS: assets });
    expect(escapedRes.status).toBe(200);

    const upperRes = await worker.fetch(new Request('https://lehoanganh.id.vn/Work%2FKite'), { ASSETS: assets });
    expect(upperRes.status).toBe(301);
    expect(upperRes.headers.get('location')).toBe('https://lehoanganh.id.vn/work%2Fkite');

    const aliasRes = await worker.fetch(new Request('https://lehoanganh.id.vn/work/delivery-tracker/'), { ASSETS: assets });
    expect(aliasRes.status).toBe(301);
    expect(aliasRes.headers.get('location')).toBe('https://lehoanganh.id.vn/work/kite');

    const direct404 = await worker.fetch(new Request('https://lehoanganh.id.vn/404'), { ASSETS: assets });
    expect(direct404.status).toBe(404);

    const previewRes = await worker.fetch(new Request('https://lehoanganh-portfolio.workers.dev/'), { ASSETS: assets });
    expect(previewRes.headers.get('x-robots-tag')).toBe('noindex, nofollow');
  });
});
