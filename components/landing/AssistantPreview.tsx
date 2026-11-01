import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

type Msg = { from: 'user' | 'assistant'; text: string };

const conversation: Msg[] = [
  {
    from: 'user',
    text: 'What is a good beginner routine for 3 days a week?',
  },
  {
    from: 'assistant',
    text: 'A simple start is three full-body days with a rest day between them: squats, push-ups and rows on each day, 3 sets of 8 to 12 reps. Begin light and add a little each week.',
  },
  {
    from: 'user',
    text: 'Can you diagnose my knee pain?',
  },
  {
    from: 'assistant',
    text: "I can't diagnose medical problems. Please speak to a qualified doctor. I'm happy to suggest general low-impact exercises.",
  },
];

export function AssistantPreview() {
  return (
    <section id="assistant" className="border-b border-line/60 bg-coal py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Assistant"
          title="A fitness chatbot that respects the rules"
          description="Ask general fitness questions and get safe, halal-aware answers — with a clear line on what it will not do."
        />
        <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-line bg-surface p-5 sm:p-7">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium text-cream">Sample conversation</p>
            <span className="rounded-full border border-line bg-surface-raised px-3 py-1 text-xs font-medium text-mute">
              Sample
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {conversation.map((m, i) => (
              <div
                key={i}
                className={
                  m.from === 'user'
                    ? 'flex justify-end'
                    : 'flex justify-start'
                }
              >
                <div
                  className={
                    m.from === 'user'
                      ? 'max-w-[80%] rounded-2xl rounded-br-sm bg-surface-raised px-4 py-3 text-sm text-cream'
                      : 'max-w-[85%] rounded-2xl rounded-bl-sm border border-line bg-coal px-4 py-3 text-sm text-cream'
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 border-t border-line/60 pt-4 text-xs leading-relaxed text-mute">
            General fitness information only — not medical advice or a religious ruling.
          </p>
        </div>
      </Container>
    </section>
  );
}
