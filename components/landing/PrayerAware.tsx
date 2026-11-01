import { Container } from '@/components/ui/Container';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const workouts: Record<string, { label: string; time: string }[]> = {
  Mon: [{ label: 'Upper body', time: '06:30' }],
  Tue: [],
  Wed: [{ label: 'Walking', time: '07:00' }],
  Thu: [{ label: 'Lower body', time: '16:30' }],
  Fri: [],
  Sat: [{ label: 'Full body', time: '17:30' }],
  Sun: [],
};

// Prayer markers positioned roughly by time-of-day percentage on a 05:00-21:00 axis
const prayers = [
  { name: 'Fajr', pct: 3 },
  { name: 'Dhuhr', pct: 53 },
  { name: 'Asr', pct: 76 },
  { name: 'Maghrib', pct: 96 },
];

function timePct(time: string): number {
  const [h, m] = time.split(':').map(Number);
  const mins = h * 60 + m;
  const start = 5 * 60;
  const end = 21 * 60;
  return ((mins - start) / (end - start)) * 100;
}

export function PrayerAware() {
  return (
    <section className="border-b border-line/60 bg-ink py-20 lg:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-caramel mb-3">
              Prayer-aware schedule
            </p>
            <h2 className="font-display text-[28px] font-bold leading-tight text-cream sm:text-[34px] lg:text-[40px]">
              Workouts that fit between prayers
            </h2>
            <p className="mt-4 text-base leading-relaxed text-taupe">
              Every suggested slot stays clear of a prayer time plus a buffer, so
              your routine never asks you to choose between your workout and your
              prayers. In Ramadan the plan shifts to lighter sessions, placed only
              after iftar or before suhoor.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-taupe">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-caramel shrink-0" />
                No workout overlaps a prayer block or its buffer.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-caramel shrink-0" />
                A warning appears if you pick a time that clashes.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-caramel shrink-0" />
                Ramadan mode moves sessions to after iftar or before suhoor.
              </li>
            </ul>
          </div>

          {/* Sample week view */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-line bg-surface p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium text-cream">Sample week</p>
                <span className="rounded-full border border-line bg-surface-raised px-3 py-1 text-xs font-medium text-mute">
                  Sample
                </span>
              </div>

              {/* Day columns */}
              <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                {days.map((d) => (
                  <div key={d} className="flex flex-col">
                    <div className="mb-2 text-center text-xs font-medium text-taupe">
                      {d}
                    </div>
                    <div className="relative h-44 rounded-lg border border-line/60 bg-coal/50 sm:h-56">
                      {/* prayer markers */}
                      {prayers.map((p) => (
                        <div
                          key={p.name}
                          className="absolute left-0 right-0 flex items-center gap-1"
                          style={{ top: `${p.pct}%` }}
                          title={`${p.name} — Sample`}
                        >
                          <div className="h-px w-full bg-bronze/40" />
                          <span className="absolute right-1 rounded bg-bronze/20 px-1 text-[9px] leading-tight text-mute">
                            {p.name.slice(0, 1)}
                          </span>
                        </div>
                      ))}
                      {/* workout chips */}
                      {workouts[d].map((w) => (
                        <div
                          key={w.label}
                          className="absolute left-1 right-1 rounded-md border border-caramel/50 bg-caramel/15 px-1.5 py-1 text-[10px] leading-tight"
                          style={{ top: `${Math.max(2, timePct(w.time) - 4)}%` }}
                        >
                          <p className="font-semibold text-sand">{w.label}</p>
                          <p className="tabular-nums text-mute">{w.time}</p>
                        </div>
                      ))}
                      {workouts[d].length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[10px] text-mute">Rest</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-line/60 pt-3 text-xs text-mute">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-3 rounded-sm bg-caramel/40" /> Workout slot
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-px w-3 bg-bronze/60" /> Prayer time (sample)
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
