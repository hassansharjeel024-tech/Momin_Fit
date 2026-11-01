import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const cards = [
  {
    title: 'Not sure what to do',
    body: 'Beginners do not know which workouts suit their goal, level and equipment.',
  },
  {
    title: 'Missed days go unnoticed',
    body: 'Workout time is forgotten and there is no clear record of missed days.',
  },
  {
    title: 'Prayer and Ramadan are ignored',
    body: 'Most apps schedule workouts that clash with prayer times, so they get dropped.',
  },
  {
    title: 'Unreliable answers',
    body: 'Fitness answers from random websites have no personal context, and some are unsafe or ignore halal limits.',
  },
];

export function Problem() {
  return (
    <section className="border-b border-line/60 bg-coal py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="The problem"
          title="Why workouts get dropped"
          description="A few common gaps stand between you and a consistent routine. MominFit is built to close them."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-bronze/50"
            >
              <h3 className="font-display text-lg font-semibold text-cream">
                {c.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-taupe">{c.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
