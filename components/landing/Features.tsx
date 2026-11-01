import * as React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  CalendarIcon,
  ClockIcon,
  BellIcon,
  ClipboardIcon,
  ChartIcon,
  MoonIcon,
  WalkingIcon,
  ChatIcon,
  SparkleIcon,
} from '@/components/icons';

type Feature = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  body: string;
};

const features: Feature[] = [
  {
    Icon: CalendarIcon,
    title: 'Personalised weekly plan',
    body: 'Based on your goal, fitness level, equipment and the days you choose.',
  },
  {
    Icon: ClockIcon,
    title: 'Prayer-time-aware schedule',
    body: 'Workouts are not placed inside a prayer time plus a buffer, and you get a warning if you pick such a time.',
  },
  {
    Icon: BellIcon,
    title: 'Reminders',
    body: 'A notification at workout time, moved when you change the time to avoid a prayer.',
  },
  {
    Icon: ClipboardIcon,
    title: 'Missed-day record',
    body: 'A day is marked "No" if the workout is not completed by 11:59 PM in your time zone.',
  },
  {
    Icon: ChartIcon,
    title: 'Weekly progress',
    body: 'Completed days, missed days and your current streak.',
  },
  {
    Icon: MoonIcon,
    title: 'Ramadan mode',
    body: 'A lighter plan, with workouts only after iftar or before suhoor.',
  },
  {
    Icon: WalkingIcon,
    title: 'Sunnah-associated activities',
    body: 'Walking, running, swimming and archery in the plan templates, with reviewed source notes.',
  },
  {
    Icon: ChatIcon,
    title: 'AI fitness assistant',
    body: 'Answers fitness questions with halal-aware and safety rules.',
  },
  {
    Icon: SparkleIcon,
    title: 'Reviewed motivation',
    body: 'Messages come only from a reviewed list that includes references.',
  },
];

export function Features() {
  return (
    <section id="features" className="border-b border-line/60 bg-ink py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Features"
          title="Everything in one simple, free app"
          description="Nine tools that work together so your plan fits your week and your faith."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-bronze/50 hover:bg-surface-raised"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-bronze/30 bg-coal text-caramel">
                <f.Icon width={22} height={22} />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-cream">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-taupe">{f.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
