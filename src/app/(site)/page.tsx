import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { VehicleGallery } from "@/components/sections/VehicleGallery";
import { Spotlight } from "@/components/ui/Spotlight";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { getHomeContent, getPricingContent, getSiteSettings } from "@/lib/content";
import { resolveIcon } from "@/lib/icons";
import { faqs, packageInterestHref } from "@/lib/data";
import { JsonLd, faqJsonLd } from "@/components/seo/JsonLd";

export default async function Home() {
  const [content, pricing, settings] = await Promise.all([
    getHomeContent(),
    getPricingContent(),
    getSiteSettings(),
  ]);
  const featured = pricing.packages.filter((p) => p.group === "B").slice(1, 4);

  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <Hero
        titleLine1={content.hero.titleLine1}
        titleLine2={content.hero.titleLine2}
        subtitle={content.hero.subtitle}
        ctaLabel={content.hero.ctaLabel}
        ctaHref={content.hero.ctaHref}
        phone={settings.phone}
        phoneHref={settings.phoneHref}
        image={content.hero.image}
      />
      <Stats items={content.stats} />

      {/* Why us */}
      <section className="bg-bg">
        <div className="mx-auto max-w-container py-20 container-px sm:py-28">
          <SectionHeading
            title={content.why.title}
            description={content.why.description}
          />
          <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.why.features.map((f) => {
              const Icon = resolveIcon(f.iconKey, Sparkles);
              return (
                <StaggerItem
                  key={f.title}
                  className="group rounded-2xl border border-line bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {f.text}
                  </p>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      <About />

      {/* Vehicle showcase */}
      <section className="bg-dark text-white">
        <div className="mx-auto grid max-w-container items-center gap-12 py-20 container-px sm:py-28 lg:grid-cols-2">
          <VehicleGallery
            exteriorSrc={content.vehicle.image}
            interiorSrc={content.vehicle.interiorImage}
          />
          <div>
            <SectionHeading
              dark
              title={content.vehicle.title}
              description={content.vehicle.description}
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {content.vehicle.specs.map((spec) => (
                <li key={spec} className="flex items-start gap-3 text-sm text-white/75">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" />
                  {spec}
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <ButtonLink href="/sluzby" variant="ghostDark">
                Více o výcviku
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Brand marquee */}
      <section className="bg-accent py-6">
        <Marquee items={content.marquee} />
      </section>

      {/* Packages preview */}
      <section className="bg-bg-muted">
        <div className="mx-auto max-w-container py-20 container-px sm:py-28">
          <SectionHeading
            align="center"
            eyebrow={content.packages.eyebrow}
            title={content.packages.title}
            description={content.packages.description}
          />
          <StaggerGroup className="mt-14 grid gap-6 lg:grid-cols-3">
            {featured.map((pkg) => (
              <StaggerItem
                key={pkg.name}
                className={
                  "relative flex flex-col rounded-2xl border p-8 shadow-card transition-all duration-300 hover:-translate-y-1 " +
                  (pkg.highlight
                    ? "border-accent bg-dark text-white"
                    : "border-line bg-white text-ink hover:shadow-card-hover")
                }
              >
                {pkg.badge && (
                  <span
                    className={
                      "absolute -top-3 left-8 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider " +
                      (pkg.highlight ? "bg-accent text-white" : "bg-ink text-white")
                    }
                  >
                    {pkg.badge}
                  </span>
                )}
                <h3 className="font-display text-xl font-bold">{pkg.name}</h3>
                <p
                  className={
                    "mt-2 text-sm leading-relaxed " +
                    (pkg.highlight ? "text-white/75" : "text-ink-muted")
                  }
                >
                  {pkg.description}
                </p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold">{pkg.price}</span>
                  <span className={pkg.highlight ? "text-white/50" : "text-ink-muted"}>Kč</span>
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-sm">
                      <Check
                        className={
                          "mt-0.5 h-4 w-4 shrink-0 " +
                          (pkg.highlight ? "text-accent-light" : "text-accent")
                        }
                      />
                      <span className={pkg.highlight ? "text-white/80" : "text-ink"}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <ButtonLink
                    href={packageInterestHref(pkg)}
                    variant={pkg.highlight ? "ghostDark" : "outline"}
                    className="w-full"
                  >
                    Mám zájem
                  </ButtonLink>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal className="mx-auto mt-10 text-center">
            <Link
              href="/cenik"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-light"
            >
              Zobrazit všechny balíčky a doplňky
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Testimonials
        eyebrow=""
        title={content.testimonials.title}
        description={content.testimonials.description}
        items={content.testimonials.items}
      />

      <Faq
        eyebrow=""
        title={content.faq.title}
        description={content.faq.description}
      />

      {/* CTA band */}
      <section className="relative overflow-hidden bg-accent">
        <div className="grid-texture absolute inset-0 opacity-40" />
        <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-accent-muted/40 blur-3xl" />
        <Spotlight />
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
