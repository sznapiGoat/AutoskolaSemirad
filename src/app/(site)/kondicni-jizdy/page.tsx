import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Car, Route, ShieldCheck, Phone } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Spotlight";
import { getPricingContent, getSiteSettings } from "@/lib/content";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Kondiční jízdy Liberec — 45 i 90 minut v BMW X2",
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

      {/* Header */}
      <section className="bg-dark pt-32 text-white">
        <div className="mx-auto max-w-container pb-16 container-px">
          <Reveal className="max-w-2xl">
            <span className="eyebrow mb-4">
              <span className="h-px w-6 bg-accent" />
              Kondiční jízdy
            </span>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl">
              Kondiční jízdy v Liberci
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/60 text-pretty sm:text-lg">
              Individuální jízdy s instruktorem pro řidiče, kteří si chtějí
              vrátit jistotu za volantem. Délku jízdy i trasu přizpůsobíme
              tomu, co potřebujete natrénovat.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Who it is for */}
      <section className="bg-bg">
        <div className="mx-auto max-w-container py-20 container-px sm:py-24">
          <SectionHeading
            eyebrow="Pro koho"
            title="Komu kondiční jízdy pomohou"
          />
          <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2">
            {audiences.map(({ icon: Icon, title, text }) => (
              <StaggerItem
                key={title}
                className="rounded-2xl border border-line bg-white p-8 shadow-card"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{text}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Prices */}
      <section className="bg-bg-muted">
        <div className="mx-auto max-w-container py-20 container-px sm:py-24">
          <SectionHeading
            eyebrow="Ceník"
            title="Kolik kondiční jízdy stojí"
            description="Skupina B se jezdí v BMW X2, skupina D v autobusu MAN A20."
          />
          <Reveal className="mt-12 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
            <ul className="divide-y divide-line">
              {prices.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between gap-4 px-6 py-4"
                >
                  <span className="text-sm text-ink">{item.label}</span>
                  <span className="shrink-0 font-display text-base font-semibold text-accent">
                    {item.price}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="mt-6 text-sm text-ink-muted">
            Kompletní ceník kurzů a služeb najdete na stránce{" "}
            <Link href="/cenik" className="font-medium text-accent hover:underline">
              Ceník
            </Link>
            .
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
            Jsme k dispozici ve všední dny {settings.hours.weekdays}, o víkendu{" "}
            {settings.hours.weekend}.
          </Reveal>
          <Reveal delay={0.16} className="flex flex-col items-center gap-4 sm:flex-row">
            <a
              href={settings.phoneHref}
              className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-accent shadow-card transition-transform hover:-translate-y-0.5"
            >
              <Phone className="h-4 w-4" />
              {settings.phone}
            </a>
            <ButtonLink href={contactHref} variant="ghostDark">
              Napsat zprávu
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
