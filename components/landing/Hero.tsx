import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { CheckIcon } from '@/components/icons';

const prayers = [
  { name: 'Fajr', time: '05:12' },
  { name: 'Dhuhr', time: '12:30' },
  { name: 'Asr', time: '15:45' },
  { name: 'Maghrib', time: '18:10' },
  { name: 'Isha', time: '19:35' },
];

export function Hero() {
  return (
    <section className="lattice-radial relative overflow-hidden border-b border-line/60">
      <Container className="pt-16 pb-16 sm:pt-20 lg:pt-24 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Text column */}
          <div className="reveal lg:col-span-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-bronze/40 bg-surface/60 px-4 py-1.5 text-sm font-medium text-sand">
              <span className="h-1.5 w-1.5 rounded-full bg-caramel" />
              Free — works on phone and desktop
            </span>
            <h1 className="mt-6 font-display text-[40px] font-bold leading-[1.1] text-cream sm:text-[48px] lg:text-[64px]">
              Consistent fitness, built around your faith.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-taupe">
              MominFit suggests a workout plan, schedules it around prayer times,
              reminds you when it is time, and answers your fitness questions,
              without asking you to give up your daily routine.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button as="link" href="/register" variant="primary" size="lg">
                Get started free
              </Button>
              <Button as="link" href="/login" variant="secondary" size="lg">
                Log in
              </Button>
            </div>
          </div>

          {/* Today card column */}
          <div className="reveal lg:col-span-6" style={{ animationDelay: '0.1s' }}>
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-xl shadow-black/40 sm:p-7">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-medium uppercase tracking-[0.14em] text-caramel">
                  Today
                </p>
                <span className="rounded-full border border-line bg-surface-raised px-3 py-1 text-xs font-medium text-mute">
                  Sample preview
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {prayers.map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center justify-between rounded-xl border border-line/60 bg-coal/60 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-2 w-2 rounded-full bg-bronze/70" />
                      <span className="text-sm font-medium text-taupe">
                        {p.name}
                      </span>
                    </div>
                    <span className="text-sm tabular-nums text-mute">{p.time}</span>
                  </div>
                ))}

                {/* Highlighted workout block */}
                <div className="flex items-center justify-between rounded-xl border border-caramel/50 bg-caramel/10 px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <CheckIcon width={18} height={18} className="text-caramel" />
                    <span className="text-sm font-semibold text-cream">Workout</span>
                  </div>
                  <span className="text-sm font-semibold tabular-nums text-sand">
                    16:30 — 17:15
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-line/60 pt-4 text-sm">
                <span className="text-taupe">This week: <span className="font-semibold text-cream">4 of 5 days</span> done</span>
                <span className="text-taupe">Streak: <span className="font-semibold text-sand">3</span></span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
