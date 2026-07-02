import type { Metadata } from "next";
import { ArrowRight, Check, Car, Scale } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { getServicesContent } from "@/lib/content";
import { resolveIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Služby",
  description:
    "Kurzy skupiny B i D, rychlokurzy, kondiční jízdy, vrácení řidičského průkazu a školení řidičů. Výcvik v BMW X2 v Liberci.",
};

export default async function ServicesPage() {
  const content = await getServicesContent();
  return (
    <>
      {/* Page header */}
      <section className="bg-dark pt-32 text-white">
        <div className="mx-auto max-w-container pb-16 container-px">
          <SectionHeading
            dark
            eyebrow={content.header.eyebrow}
            title={content.header.title}
            description={content.header.description}
          />
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-bg">
        <div className="mx-auto max-w-container py-20 container-px sm:py-24">
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.services.map((s) => {
              const Icon = resolveIcon(s.iconKey, Car);
              return (
                <StaggerItem
                  key={s.title}
                  className="group rounded-2xl border border-line bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.text}</p>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* Vehicle */}
      <section className="bg-bg-muted">
        <div className="mx-auto grid max-w-container items-center gap-12 py-20 container-px sm:py-24 lg:grid-cols-2">
          <Reveal>
            <SmartImage
              src="/images/bmw-x2-interior.jpg"
              alt="Červený interiér výcvikového BMW X2"
              label="BMW X2 interiér"
              width={880}
              height={660}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
          </Reveal>
          <div>
            <SectionHeading
              eyebrow={content.vehicle.eyebrow}
              title={content.vehicle.title}
              description={content.vehicle.description}
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {content.vehicle.specs.map((spec) => (
                <li key={spec} className="flex items-start gap-3 text-sm text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Consulting */}
      <section className="bg-dark text-white">
        <div className="mx-auto grid max-w-container gap-12 py-20 container-px sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent-light">
              <Scale className="h-6 w-6" />
            </span>
            <SectionHeading
              dark
              className="mt-6"
              eyebrow={content.consulting.eyebrow}
              title={content.consulting.title}
              description={content.consulting.description}
            />
          </div>
          <StaggerGroup className="grid content-start gap-3 sm:grid-cols-2">
            {content.consulting.areas.map((area) => (
              <StaggerItem
                key={area}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-dark-card p-4 text-sm text-white/80"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" />
                {area}
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-bg">
        <div className="mx-auto max-w-container py-20 container-px sm:py-24">
          <SectionHeading
            align="center"
            eyebrow={content.steps.eyebrow}
            title={content.steps.title}
          />
          <StaggerGroup className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {content.steps.items.map((step) => (
              <StaggerItem key={step.n}>
                <span className="font-display text-5xl font-bold text-accent/20">
                  {step.n}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {step.text}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-accent">
        <div className="grid-texture absolute inset-0 opacity-40" />
        <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-accent-muted/40 blur-3xl" />
        <div className="relative mx-auto flex max-w-container flex-col items-center gap-6 py-16 text-center container-px sm:py-20">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
              {content.cta.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="max-w-xl text-white/85">
            {content.cta.text}
          </Reveal>
          <Reveal delay={0.16}>
            <ButtonLink href={content.cta.ctaHref} variant="ghostDark">
              {content.cta.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
