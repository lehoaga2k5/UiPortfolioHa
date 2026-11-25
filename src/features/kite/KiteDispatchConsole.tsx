import { useId, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Activity, Phone, Route, Search, X } from 'lucide-react';

const shipments = [
  { id: 'KT-8842-MA', courier: 'Nguyen Van Minh', vehicle: 'Ford E-Transit #41', number: 41, filter: 'delayed', status: 'Delayed · Traffic', eta: '15:18 EST', note: '+22m delay', destination: 'Nha Hat Lon, Hoan Kiem, Ha Noi', speed: 38 },
  { id: 'KT-8849-MA', courier: 'Tran Thu Ha', vehicle: 'Rivian EDV #12', number: 12, filter: 'delivery', status: 'Out for delivery', eta: '14:55 EST', note: 'On schedule', destination: 'Hang Bai, Hoan Kiem, Ha Noi', speed: 27 },
  { id: 'KT-8810-MA', courier: 'Le Quang Nam', vehicle: 'Mercedes Sprinter #08', number: 8, filter: 'transit', status: 'In transit', eta: '15:40 EST', note: 'On schedule', destination: 'Phan Chu Trinh, Hoan Kiem, Ha Noi', speed: 32 },
  { id: 'KT-8794-MA', courier: 'Pham Anh Tu', vehicle: 'Ford Transit #19', number: 19, filter: 'delivered', status: 'Delivered', eta: '14:12 EST', note: 'Signed (B. Kelly)', destination: 'Trang Tien, Hoan Kiem, Ha Noi', speed: 0 },
] as const;

const filters = [
  { value: 'all', label: 'All shipments', count: 142 },
  { value: 'transit', label: 'In transit', count: 98 },
  { value: 'delivery', label: 'Out for delivery', count: 40 },
  { value: 'delayed', label: 'Delayed (rerouted)', count: 4 },
] as const;

type Shipment = (typeof shipments)[number];
type Filter = (typeof filters)[number]['value'];
const focus = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a43729]';
const control = `min-h-11 border border-[#d9d7cf] bg-white px-3 font-mono text-xs font-semibold uppercase ${focus}`;
const asset = '/assets/figma/';

function VehicleMap({ shipment }: { shipment: Shipment }) {
  const reduceMotion = useReducedMotion();
  const delayed = shipment.filter === 'delayed';

  return (
    <figure className="space-y-2">
      <figcaption className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
        <span className="flex items-center gap-2 font-semibold"><Activity size={16} aria-hidden /> VEHICLE TELEMATICS</span>
        <span className="bg-[#f3f0ea] px-2 py-1">{shipment.speed} mph{delayed && ' · Temp 4.1°C'}</span>
      </figcaption>
      <div className="relative aspect-[424/258] border border-[#d9d7cf] bg-[#eceae0]">
        <img src={asset + 'e572c.svg'} alt="Street map of Hoan Kiem, Ha Noi, showing the sample route to Nha Hat Lon" className="absolute inset-0 size-full" />
        <span aria-hidden className="absolute top-2 left-2 rounded border border-[#d9d7cf] bg-white px-1.5 py-1 text-[9px] font-semibold">HOAN KIEM, HA NOI</span>
        <span aria-hidden className="absolute top-[29%] left-[22%] text-[10px] font-semibold text-[#245e64]">Ho Hoan Kiem</span>
        <span aria-hidden className="absolute top-[60%] left-[34%] hidden text-[9px] font-semibold text-[#535950] @min-[630px]:inline">Trang Tien</span>
        <span aria-hidden className="absolute top-[57%] left-[44%] hidden text-[9px] font-semibold text-[#535950] @min-[630px]:inline">Ngo Quyen</span>
        <span aria-hidden className="absolute top-[64%] left-[64%] rounded border border-[#d9d7cf] bg-white px-1 py-0.5 text-[9px] font-semibold">Nha Hat Lon</span>
        <span aria-hidden className="absolute top-[78%] left-[64%] grid size-[23px] -translate-1/2 place-items-center rounded-full border-2 border-[#a43729] bg-white">
          <img src={asset + '01ecf.svg'} alt="" className="size-4" />
        </span>
        {delayed && (
          <div className="absolute top-[80%] left-[43%] -translate-1/2" aria-hidden>
            <motion.img
              src={asset + 'f4776.svg'}
              alt=""
              className="absolute inset-[-5px] size-9 max-w-none"
              animate={reduceMotion ? undefined : { scale: [1, 1.5, 1], opacity: [0.95, 0.25, 0.95] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />
            <span className="relative grid size-[27px] place-items-center rounded-full border-2 border-white bg-[#a43729]"><img src={asset + '77de5.svg'} alt="" className="size-4" /></span>
            <span className="absolute top-7 right-2 whitespace-nowrap rounded border border-[#d9d7cf] bg-white px-1 py-0.5 text-[9px] font-semibold text-[#a43729]">Vehicle #41</span>
          </div>
        )}
        <a href="https://www.openstreetmap.org/copyright" className={`absolute right-1 bottom-1 rounded border border-[#d9d7cf] bg-white px-1.5 py-1 text-[10px] text-[#404840] underline ${focus}`}>© OpenStreetMap</a>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#535950]">
        <span className="flex items-center gap-1"><i className="w-5 border-t-2 border-[#a43729]" aria-hidden />Completed</span>
        <span className="flex items-center gap-1"><i className="w-5 border-t-2 border-dashed border-[#a43729]" aria-hidden />Remaining</span>
        <span>Sample route</span>
      </div>
    </figure>
  );
}

export function KiteDispatchConsole({ onOpenDemo }: { onOpenDemo: () => void }) {
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<Shipment['id'] | null>('KT-8842-MA');
  const [compact, setCompact] = useState(false);
  const [priority, setPriority] = useState<Shipment['id'][]>([]);
  const [notice, setNotice] = useState('');
  const search = useRef<HTMLInputElement>(null);
  const lastRow = useRef<HTMLButtonElement | null>(null);
  const inspectorId = useId();
  const searchId = useId();

  const term = query.trim().toLowerCase().replace(/^(?:route\s*)?#\s*/, '');
  const matchingSearch = shipments.filter(({ id, courier, vehicle, status }) =>
    [id, courier, vehicle, status].some((value) => value.toLowerCase().includes(term)),
  );
  const visible = matchingSearch
    .filter((item) => filter === 'all' || item.filter === filter)
    .sort((first, second) => Number(priority.includes(second.id)) - Number(priority.includes(first.id)));
  const shipment = visible.find(({ id }) => id === selectedId);
  const delayed = shipment?.filter === 'delayed';
  const delivered = shipment?.filter === 'delivered';
  const milestones = shipment && [
    { short: 'Sorted', title: 'Sorted at regional hub', time: '11:15 EST', detail: 'Ha Noi 04 Hub · Bay 03' },
    { short: 'Loaded', title: `Loaded to Courier #${shipment.number}`, time: '12:30 EST', detail: `Driver: ${shipment.courier} (Verified)` },
    { short: delayed ? 'Reroute' : 'En route', title: delayed ? 'Rerouted — Trang Tien Blockage' : 'En route to consignee', time: delayed ? '14:20 EST' : '', detail: delayed ? 'Alt-route via Ngo Quyen and Hai Ba Trung.' : shipment.vehicle },
    { short: 'Dropoff', title: 'Final Consignee Handover', time: delivered ? shipment.eta : `Est. ${shipment.eta.replace(' EST', '')}`, detail: shipment.destination },
  ];

  function closeInspector() {
    setSelectedId(null);
    setNotice('');
    (lastRow.current?.isConnected ? lastRow.current : search.current)?.focus();
  }

  function chooseFilter(value: Filter) {
    setFilter(value);
    setNotice('');
    const first = matchingSearch.find((item) => value === 'all' || item.filter === value);
    setSelectedId(first?.id ?? null);
  }

  return (
    <section aria-label="Kite Dispatch Console" className="@container min-w-0 text-[#111]">
      <div className="border border-[#d9d7cf] bg-[#f7f6f3] shadow-[4px_6px_0_#111]">
        <header className="flex flex-wrap items-center justify-between gap-2 bg-[#111] px-3 py-2 font-mono text-xs text-white sm:px-5">
          <span className="min-w-0 break-all text-white/85">kite-logistics.internal/dispatch/v3/live</span>
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1"><span className="text-[#baff39]">● TELEMATICS LIVE</span><time>14:42:08 UTC</time></span>
        </header>
        <div className="space-y-4 p-3 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center bg-[#111] font-mono font-bold text-white">KT</span>
              <div>
                <h3 className="font-display text-lg leading-tight font-bold">Regional Hub: Ha Noi 04 (Hoan Kiem)</h3>
                <p className="mt-1 text-xs text-[#555]">Monitoring 142 couriers · 18 transit corridors</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs"><span className="bg-[#e9f3d7] px-2 py-1 font-semibold">ACTIVE HUB</span><span>94.2%</span><span className="text-[#a43729]">Exceptions: 4</span></div>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Shipment status filters">
            {filters.map(({ value, label, count }) => (
              <button
                key={value}
                type="button"
                aria-pressed={filter === value}
                onClick={() => chooseFilter(value)}
                className={`min-h-11 rounded-full border px-3 text-left font-mono text-xs font-semibold uppercase ${focus} ${filter === value ? 'border-[#111] bg-[#111] text-white' : value === 'delayed' ? 'border-[#a43729] bg-[#fff0eb] text-[#8a271c]' : 'border-[#d9d7cf] bg-white'}`}
              >
                {label} <strong className="ml-1">{count}</strong>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex w-full max-w-[280px] items-center gap-2 border border-[#d9d7cf] bg-white px-3 focus-within:outline-2 focus-within:outline-[#a43729]">
              <Search size={16} aria-hidden className="shrink-0" />
              <label className="sr-only" htmlFor={searchId}>Search shipments</label>
              <input
                ref={search}
                id={searchId}
                type="search"
                value={query}
                onChange={(event) => { setQuery(event.target.value); setNotice(''); }}
                placeholder="Route #KT-884"
                className="min-h-11 w-full min-w-0 text-sm outline-none"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div role="group" aria-label="Stepper layout" className="inline-flex flex-wrap">
                {(['Desktop', 'Tablet / Compact'] as const).map((mode) => (
                  <button key={mode} type="button" aria-pressed={compact === (mode !== 'Desktop')} onClick={() => setCompact(mode !== 'Desktop')} className={`${control} aria-pressed:bg-[#ede9e0]`}>{mode}</button>
                ))}
              </div>
              <button type="button" onClick={onOpenDemo} className={`min-h-11 bg-[#111] px-3 text-sm font-semibold text-white ${focus}`}>Open interactive demo</button>
            </div>
          </div>

          <div className="grid min-w-0 items-start gap-4 @min-[900px]:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="min-w-0 border border-[#d9d7cf] bg-white">
              <div className="flex flex-wrap justify-between gap-2 border-b border-[#d9d7cf] px-3 py-3 font-mono text-xs">
                <h4 className="font-bold">LIVE MANIFEST (SORTED BY PRIORITY)</h4>
                <span className="text-[#555]">Refreshed 2s ago</span>
              </div>
              <div aria-hidden className="hidden grid-cols-[1fr_1.1fr_1fr_.75fr] gap-2 border-b border-[#d9d7cf] bg-[#f3f0ea] px-3 py-2 font-mono text-[10px] font-bold @min-[520px]:grid">
                <span>TRACKING ID / ACTION</span><span>COURIER</span><span>STATUS</span><span>ETA</span>
              </div>
              <ul>
                {visible.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      aria-pressed={selectedId === item.id}
                      aria-controls={shipment ? inspectorId : undefined}
                      onClick={(event) => { lastRow.current = event.currentTarget; setSelectedId(item.id); setNotice(''); }}
                      className={`grid w-full min-w-0 grid-cols-2 items-start gap-2 border-b border-[#d9d7cf] px-3 py-3 text-left text-xs hover:bg-[#f7f6f3] aria-pressed:bg-[#fff0eb] @min-[520px]:grid-cols-[1fr_1.1fr_1fr_.75fr] ${focus} focus-visible:outline-offset-[-2px]`}
                    >
                      <span className="min-w-0"><strong className="block break-words font-mono">{item.id}</strong><span className="mt-1 block font-mono text-[10px] font-semibold text-[#8a271c]">{item.filter === 'delivered' ? 'VIEW POD' : 'INSPECT'}</span></span>
                      <span className="min-w-0"><strong className="block">{item.courier}</strong><span className="mt-1 block text-[#555]">{item.vehicle}</span></span>
                      <span className={`w-fit rounded-sm px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase ${item.filter === 'delayed' ? 'bg-[#fce2d8] text-[#8a271c]' : 'bg-[#edf1e8] text-[#34492c]'}`}>{item.status}{priority.includes(item.id) && <span className="block">Priority</span>}</span>
                      <span><strong className="block font-mono">{item.eta}</strong><span className="mt-1 block text-[#555]">{item.note}</span></span>
                    </button>
                  </li>
                ))}
              </ul>
              {visible.length === 0 && <p className="p-3 text-sm">No matching sample shipments.</p>}
              <p role="status" className="px-3 py-2 text-xs text-[#555]">
                {filter === 'all' && !term ? 'Showing 1–4 of 142 items · Sample manifest' : `Showing ${visible.length} matching sample ${visible.length === 1 ? 'shipment' : 'shipments'}`}
              </p>
            </div>

            {shipment && milestones && (
              <section id={inspectorId} aria-label={`Inspector for ${shipment.id}`} onKeyDown={(event) => { if (event.key === 'Escape') closeInspector(); }} className="min-w-0 space-y-4 border border-[#d9d7cf] bg-white p-3">
                <div className="flex justify-between gap-2 border-b border-[#d9d7cf] pb-2">
                  <div className="min-w-0">
                    <h4 className="font-mono text-base font-bold">{shipment.id}</h4>
                    <p className="mt-1 font-mono text-[10px] font-bold text-[#8a271c]">SELECTED ITEM FOCUS</p>
                    <p className="mt-1 text-sm">{delayed ? 'Medical Cold-Chain Package · 4.2 kg' : shipment.courier + ' · ' + shipment.vehicle}</p>
                    {delayed && <p className="mt-1 font-mono text-xs text-[#555]">Beacon ID · BCN-9910-Z</p>}
                    {delivered && <p className="mt-1 text-xs">Proof of delivery · {shipment.note}</p>}
                  </div>
                  <button type="button" onClick={closeInspector} aria-label="Close inspector" className={`grid size-11 shrink-0 place-items-center border border-[#d9d7cf] ${focus}`}><X size={18} aria-hidden /></button>
                </div>

                <div>
                  <h5 className="mb-2 font-mono text-xs font-bold">MILESTONE PROGRESS</h5>
                  <ol className={compact ? 'grid grid-cols-4 gap-1' : 'space-y-2 border-l border-[#d9d7cf] pl-2 @max-[500px]:grid @max-[500px]:grid-cols-4 @max-[500px]:gap-1 @max-[500px]:space-y-0 @max-[500px]:border-l-0 @max-[500px]:pl-0'}>
                    {milestones.map(({ short, title, time, detail }, index) => (
                      <li key={short} className={`min-w-0 text-xs ${index === 2 && delayed ? 'text-[#8a271c]' : ''}`}>
                        <span className={compact ? 'block border-t-2 border-current pt-1 font-mono font-bold' : 'hidden border-t-2 border-current pt-1 font-mono font-bold @max-[500px]:block'} title={title}><span aria-hidden>{index + 1}. </span>{short}</span>
                        <strong className={compact ? 'sr-only' : 'block @max-[500px]:sr-only'}>{title}</strong>
                        {time && <span className="block font-mono text-[10px] font-semibold">{time}</span>}
                        <span className={compact ? 'sr-only' : 'text-[#555] @max-[500px]:sr-only'}>{detail}</span>
                      </li>
                    ))}
                  </ol>
                  <p className={`mt-2 text-xs text-[#555] ${compact ? '' : 'hidden @max-[500px]:block'}`}>Dest: {shipment.destination}</p>
                </div>

                {!delivered && (
                  <div className="flex flex-wrap gap-2">
                    <button className={`${control} inline-flex items-center gap-1`} type="button" onClick={() => setNotice(`Contact request sent to ${shipment.courier} in the demo.`)}><Phone size={14} aria-hidden />Contact driver</button>
                    <button className={`${control} inline-flex items-center gap-1 aria-pressed:bg-[#fff0eb]`} type="button" aria-pressed={priority.includes(shipment.id)} onClick={() => {
                      const prioritized = priority.includes(shipment.id);
                      setPriority(prioritized ? priority.filter((id) => id !== shipment.id) : [...priority, shipment.id]);
                      setNotice(prioritized ? `${shipment.id} returned to normal priority.` : `${shipment.id} marked for priority review.`);
                    }}><Route size={14} aria-hidden />Reprioritize</button>
                  </div>
                )}
                <p role="status" className="empty:hidden text-xs font-semibold text-[#8a271c]">{notice}</p>
                <VehicleMap shipment={shipment} />
              </section>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
