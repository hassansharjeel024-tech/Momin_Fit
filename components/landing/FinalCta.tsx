import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export function FinalCta() {
  return (
    <section className="lattice-bg border-b border-line/60 bg-ink py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[28px] font-bold leading-tight text-cream sm:text-[36px] lg:text-[44px]">
            Start your plan today
          </h2>
          <p className="mt-4 text-base leading-relaxed text-taupe">
            Create a free account, set up your profile, and get a weekly plan that fits around your prayers.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button as="link" href="/register" variant="primary" size="lg">
              Create free account
            </Button>
            <Button as="link" href="/login" variant="secondary" size="lg">
              Log in
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
