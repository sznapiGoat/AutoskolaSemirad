import type { Metadata } from "next";
import { ArrowRight, Check, Car, GraduationCap, RefreshCw, Truck, Zap, BadgeCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { vehicleSpecs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Služby",
  description:
    "Kurzy skupiny B i D, rychlokurzy, kondiční jízdy, vrácení řidičského průkazu a školení řidičů. Výcvik v BMW X2 v Liberci.",
};

const services = [
  {
    icon: Car,
    title: "Kurz skupiny B",
    text: "Kompletní výuka teorie a praktický výcvik v moderním BMW X2. Připravíme vás na obě části zkoušky.",
  },
  {
    icon: Zap,
    title: "Rychlokurz",
    text: "Potřebujete řidičák co nejdříve? Přednostní plánování jízd a maximální tempo bez čekání.",
  },
  {
    icon: RefreshCw,
    title: "Kondiční jízdy",
    text: "Pro řidiče, kteří si chtějí obnovit jistotu za volantem. Jízdy 45 i 90 minut dle potřeby.",
  },
  {
    icon: BadgeCheck,
    title: "Vrácení řidičského průkazu",
    text: "Pomůžeme vám zpět do provozu, přezkoušení i kondiční jízdy v jednom balíčku.",
  },
  {
    icon: GraduationCap,
    title: "Školení řidičů",
    text: "Školení začínajících řidičů i profesní příprava. Bezpečná a sebejistá jízda v praxi.",
  },
  {
    icon: Truck,
    title: "Kurz skupiny D",
    text: "Rozšíření na autobus, samostatně i ze skupiny B. Pro ty, kdo to s řízením myslí profesionálně.",
  },
];

const steps = [
  { n: "01", title: "Přihlášení", text: "Ozvěte se telefonicky nebo přes formulář. Domluvíme termín nástupu." },
  { n: "02", title: "Teorie", text: "Projdeme pravidla provozu, zdravovědu i techniku vozidla." },
  { n: "03", title: "Praktické jízdy", text: "Sednete za volant BMW X2 a pod vedením lektora získáte jistotu." },
  { n: "04", title: "Zkoušky", text: "Připraveni jdete na test i jízdu. A pak už jen pro řidičák." },
];

export default function ServicesPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-dark pt-32 text-white">
        <div className="mx-auto max-w-container pb-16 container-px">
          <SectionHeading
            dark
            eyebrow="Naše služby"
            title="Vše pro váš řidičák na jednom místě"
            description="Od prvního sednutí za volant po vrácení řidičáku. Vyberte si službu, která vám sedne, o zbytek se postaráme my."
          />
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-bg">
        <div className="mx-auto max-w-container py-20 container-px sm:py-24">
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <StaggerItem
                key={s.title}
                className="group rounded-2xl border border-line bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.text}</p>
              </StaggerItem>
            ))}
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
              eyebrow="Výcvikový vůz"
              title="BMW X2, ve kterém se učíte"
              description="Moderní vůz s asistenčními systémy, který vám usnadní začátky a zároveň vás naučí pracovat s technikou, kterou potkáte v praxi."
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {vehicleSpecs.map((spec) => (
                <li key={spec} className="flex items-start gap-3 text-sm text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-bg">
        <div className="mx-auto max-w-container py-20 container-px sm:py-24">
          <SectionHeading
            align="center"
            eyebrow="Jak to probíhá"
            title="Čtyři kroky k řidičáku"
          />
          <StaggerGroup className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
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
              Nevíte, co si vybrat?
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="max-w-xl text-white/85">
            Zavolejte nám nebo napište, poradíme vám s výběrem služby i termínem
            nástupu.
          </Reveal>
          <Reveal delay={0.16}>
            <ButtonLink href="/kontakt" variant="ghostDark">
              Kontaktovat autoškolu
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
