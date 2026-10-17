import type { Metadata } from "next";
import { ArrowRight, Clock, Car, Route, ShieldCheck, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { Spotlight } from "@/components/ui/Spotlight";
import { getPricingContent, getSiteSettings } from "@/lib/content";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Kondiční jízdy Liberec - 45 i 90 minut v BMW X2",
  description:
    "Kondiční jízdy v Liberci pro řidiče po pauze, před zkouškou i po vrácení řidičáku. Jízdy 45 nebo 90 minut, trasa podle vás. Autoškola Royal Cars Liberec.",
  alternates: { canonical: "/kondicni-jizdy" },
};

const audiences = [
  {
    icon: Clock,
    title: "Po delší pauze od řízení",
    text: "Máte řidičák, ale roky jste neřídili. Projedeme spolu běžné situace, dokud se nevrátí jistota.",
  },
  {
    icon: ShieldCheck,
    title: "Před zkouškou nebo po neúspěšné",
    text: "Doplníme jízdy navíc a zaměříme se na to, co vám dělá potíže, abyste šli na zkoušku připravení.",
  },
  {
    icon: Route,
    title: "Nejistota v provozu",
    text: "Rušné křižovatky, dálnice, připojování, předjíždění nebo parkování. Trénujeme to, čeho se bojíte.",
  },
  {
    icon: Car,
    title: "Po vrácení řidičského průkazu",
    text: "Při vrácení řidičského oprávnění nabízíme přezkoušení spojené s 90minutovou kondiční jízdou.",
  },
];

const CTA_LABEL = "Domluvit jízdu";

export default async function ConditioningRidesPage() {
  const [pricing, settings] = await Promise.all([
    getPricingContent(),
    getSiteSettings(),
  ]);
  const prices = pricing.addOns.items.filter((item) => /kondi/i.test(item.label));
  const contactHref = `/kontakt?sluzba=${encodeURIComponent("Kondiční jízdy")}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Kondiční jízdy Liberec",
          serviceType: "Kondiční jízdy",
          areaServed: "Liberec a okolí",
          provider: {
            "@type": "DrivingSchool",
            name: settings.fullName,
            telephone: settings.phoneHref.replace("tel:", ""),
            url: settings.webHref,
          },
        }}
      />

      {/* Hero: copy left, instructor photo right */}
      <section className="bg-dark pt-28 text-white lg:pt-32">
        <div className="mx-auto grid max-w-container items-center gap-12 pb-16 container-px lg:grid-cols-[1.1fr_1fr] lg:pb-20">
          <Reveal>
            <span className="eyebrow mb-4">
              <span className="h-px w-6 bg-accent" />
              Kondiční jízdy
            </span>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Kondiční jízdy v Liberci
            </h1>
            <p className="mt-5 max-w-[50ch] text-base leading-relaxed text-white/65 text-pretty sm:text-lg">
              Jízdy s instruktorem pro řidiče, kteří si chtějí vrátit jistotu.
              Délku i trasu přizpůsobíme vám.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={contactHref}>
                {CTA_LABEL}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <a
                href={settings.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:border-white hover:bg-white/10 active:scale-[0.98]"
              >
                <Phone className="h-4 w-4" />
                {settings.phone}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SmartImage
              src="/images/instructor-driving.jpg"
              alt="Instruktor autoškoly Royal Cars za volantem"
              label="Instruktor při jízdě"
              width={880}
              height={660}
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Who it is for: sticky heading beside a plain list, no cards */}
      <section className="bg-bg">
        <div className="mx-auto grid max-w-container gap-10 py-20 container-px sm:py-24 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink text-balance sm:text-4xl">
              Komu kondiční jízdy pomohou
            </h2>
            <p className="mt-5 max-w-[45ch] text-base leading-relaxed text-ink-muted">
              Každá jízda začíná tím, co vám za volantem dělá potíže. Podle toho
              zvolíme trasu i délku.
            </p>
          </Reveal>
          <StaggerGroup className="divide-y divide-line border-y border-line">
            {audiences.map(({ icon: Icon, title, text }) => (
              <StaggerItem key={title} className="flex gap-5 py-7">
                <Icon className="mt-1 h-5 w-5 shrink-0 text-accent" strokeWidth={2} />
                <div>
                  <h3 className="font-display text-lg font-bold text-ink sm:text-xl">{title}</h3>
                  <p className="mt-1.5 max-w-[60ch] text-sm leading-relaxed text-ink-muted sm:text-base">
                    {text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Prices: car interior beside large price rows */}
      <section className="bg-bg-muted">
        <div className="mx-auto grid max-w-container items-center gap-12 py-20 container-px sm:py-24 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <SmartImage
              src="/images/bmw-x2-interior.jpg"
              alt="Interiér výcvikového BMW X2"
              label="BMW X2 interiér"
              width={880}
              height={660}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
          </Reveal>
          <Reveal delay={0.08} className="order-1 lg:order-2">
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink text-balance sm:text-4xl">
              Kolik kondiční jízdy stojí
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Skupina B se jezdí v BMW X2, skupina D v autobusu MAN A20.
            </p>
            <dl className="mt-8 divide-y divide-line">
              {prices.map((item) => (
                <div key={item.label} className="flex items-baseline justify-between gap-6 py-5">
                  <dt className="text-sm text-ink sm:text-base">{item.label}</dt>
                  <dd className="shrink-0 font-display text-2xl font-bold tabular-nums text-ink sm:text-3xl">
                    {item.price}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-accent">
        <div className="grid-texture absolute inset-0 opacity-40" />
        <Spotlight />
        <div className="relative mx-auto flex max-w-container flex-col items-center gap-6 py-16 text-center container-px sm:py-20">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
              Domluvte si kondiční jízdu
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="max-w-xl text-white/85">
            Zavolejte nám, nebo napište, co chcete natrénovat, a najdeme termín.
          </Reveal>
          <Reveal delay={0.16} className="flex flex-col items-center gap-4 sm:flex-row">
            <a
              href={settings.phoneHref}
              className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-accent shadow-card transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <Phone className="h-4 w-4" />
              {settings.phone}
            </a>
            <ButtonLink href={contactHref} variant="outlineDark">
              {CTA_LABEL}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
