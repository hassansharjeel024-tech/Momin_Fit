import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ChevronDownIcon } from '@/components/icons';

const faqs = [
  {
    q: 'Is MominFit free?',
    a: 'Yes. MominFit is free to use.',
  },
  {
    q: 'Does the assistant give medical advice or religious rulings?',
    a: 'No. It answers fitness questions only and refuses medical diagnosis and religious rulings.',
  },
  {
    q: 'Will it work on my phone?',
    a: 'Yes, the layout is responsive. For reminders on some phones, add the web app to your home screen.',
  },
  {
    q: 'Which prayer-time methods are supported?',
    a: 'Karachi, Muslim World League and ISNA.',
  },
];

export function Faq() {
  return (
    <section id="faq" className="border-b border-line/60 bg-coal py-20 lg:py-24">
      <Container>
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="flex flex-col gap-3">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-line bg-surface px-5 py-4 transition-colors open:border-bronze/40 open:bg-surface-raised"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-cream min-h-[44px]">
                  {f.q}
                  <ChevronDownIcon
                    width={20}
                    height={20}
                    className="shrink-0 text-taupe transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 pb-1 text-sm leading-relaxed text-taupe">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
