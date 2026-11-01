import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const steps = [
  {
    n: '1',
    title: 'Create your profile',
    body: 'Age, height, weight, goal (lose weight, build muscle or stay fit), fitness level, equipment and time zone.',
  },
  {
    n: '2',
    title: 'Choose your city and prayer-time method',
    body: 'Karachi, Muslim World League or ISNA.',
  },
  {
    n: '3',
    title: 'Get your weekly plan and schedule',
    body: 'Change the workout or the time of any day.',
  },
  {
    n: '4',
    title: 'Work out, get reminded and track your progress',
    body: 'Complete the day, keep your streak, and review your week.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-line/60 bg-coal py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Four steps to your weekly plan"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.n}
              className="relative rounded-2xl border border-line bg-surface p-6"
            >
              <span className="font-display text-3xl font-bold text-bronze/70">
                {s.n}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-cream">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-taupe">{s.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
