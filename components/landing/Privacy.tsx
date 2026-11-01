import { Container } from '@/components/ui/Container';
import { LockIcon, MapPinIcon, InfoIcon } from '@/components/icons';

const items = [
  {
    Icon: LockIcon,
    title: 'Minimal data',
    body: 'Only your profile, schedule and workout logs.',
  },
  {
    Icon: MapPinIcon,
    title: 'City only',
    body: 'Location is limited to a city used for prayer times.',
  },
  {
    Icon: InfoIcon,
    title: 'Be aware',
    body: 'Chatbot question text is sent to the AI service provider.',
  },
];

export function Privacy() {
  return (
    <section className="border-b border-line/60 bg-ink py-16 lg:py-20">
      <Container>
        <div className="grid gap-5 sm:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.title}
              className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-6"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-bronze/30 bg-coal text-caramel">
                <it.Icon width={20} height={20} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-cream">{it.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-taupe">{it.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
