import type { Metadata } from "next";
import { ArrowRight, Check, Snowflake, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { Faq } from "@/components/sections/Faq";
import {
  packages,
  addOns,
  packageGroups,
  skidSchool,
  instructorTraining,
  type Package,
} from "@/lib/data";

function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <StaggerItem
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
          (pkg.highlight ? "text-white/60" : "text-ink-muted")
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
            <span className={pkg.highlight ? "text-white/80" : "text-ink"}>{feat}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <ButtonLink
          href="/kontakt"
          variant={pkg.highlight ? "ghostDark" : "outline"}
          className="w-full"
        >
          Mám zájem
        </ButtonLink>
      </div>
    </StaggerItem>
  );
}

export const metadata: Metadata = {
  title: "Ceník",
  description:
    "Ceník kurzů autoškoly Royal Cars Liberec: skupina B, VIP balíčky, kondiční jízdy a doplňkové služby. Splátky bez navýšení.",
};

export default function PricingPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-dark pt-32 text-white">
        <div className="mx-auto max-w-container pb-16 container-px">
          <SectionHeading
            dark
            eyebrow="Ceník"
            title="Férové ceny, žádná překvapení"
            description="Vyberte si balíček podle toho, kolik komfortu a rychlosti potřebujete. Všechny ceny lze rozložit do splátek bez navýšení."
          />
        </div>
      </section>

      {/* Packages by group */}
      <section className="bg-bg">
        <div className="mx-auto max-w-container space-y-16 py-20 container-px sm:py-24">
          {packageGroups.map((group) => {
            const items = packages.filter((p) => p.group === group.id);
            if (items.length === 0) return null;
            return (
              <div key={group.id}>
                <Reveal className="mb-10 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-line pb-5">
                  <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    {group.title}
                  </h2>
                  <p className="text-sm text-ink-muted">{group.subtitle}</p>
                </Reveal>
                <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((pkg) => (
                    <PackageCard key={pkg.name} pkg={pkg} />
                  ))}
                </StaggerGroup>
              </div>
            );
          })}
        </div>
      </section>

      {/* Further courses & training */}
      <section className="bg-dark text-white">
        <div className="mx-auto max-w-container py-20 container-px sm:py-24">
          <SectionHeading
            dark
            eyebrow="Další kurzy a školení"
            title="Nejen řidičák pro skupinu B"
            description="Zdokonalovací jízdy i příprava na profesi učitele autoškoly."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {/* Skid school */}
            <Reveal className="flex flex-col rounded-2xl border border-white/10 bg-dark-card p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent-light">
                <Snowflake className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold">{skidSchool.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
                {skidSchool.description}
              </p>
              <ul className="mt-6 space-y-3">
                {skidSchool.options.map((opt) => (
                  <li
                    key={opt.label}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <span className="text-sm text-white/80">{opt.label}</span>
                    <span className="font-display text-base font-bold text-accent-light">
                      {opt.price}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <ButtonLink href="/kontakt" variant="ghostDark" className="w-full">
                  Mám zájem
                </ButtonLink>
              </div>
            </Reveal>

            {/* Instructor training */}
            <Reveal
              delay={0.1}
              className="flex flex-col rounded-2xl border border-white/10 bg-dark-card p-8"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent-light">
                <GraduationCap className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold">
                {instructorTraining.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {instructorTraining.description}
              </p>
              <ul className="mt-6 flex-1 divide-y divide-white/10">
                {instructorTraining.tiers.map((tier) => (
                  <li
                    key={tier.label}
                    className="flex items-center justify-between gap-4 py-3"
                  >
                    <span className="text-sm text-white/80">{tier.label}</span>
                    <span className="shrink-0 font-display text-base font-bold text-accent-light">
                      {tier.price}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-xl bg-accent/10 px-4 py-3 text-sm text-white/75">
                {instructorTraining.note}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="bg-bg-muted">
        <div className="mx-auto max-w-container py-20 container-px sm:py-24">
          <SectionHeading
            eyebrow="Doplňkové služby"
            title="Jednotlivé jízdy a další služby"
            description="Ceny za jednotlivé úkony nad rámec kurzu a samostatné služby."
          />
          <Reveal className="mt-12 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
            <ul className="divide-y divide-line">
              {addOns.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-bg-muted"
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
            Ceny jsou orientační. Konkrétní nabídku a podmínky splátek vám rádi
            potvrdíme na vyžádání.
          </Reveal>
        </div>
      </section>

      <Faq tone="white" />

      {/* CTA */}
      <section className="relative overflow-hidden bg-accent">
        <div className="grid-texture absolute inset-0 opacity-40" />
        <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-accent-muted/40 blur-3xl" />
        <div className="relative mx-auto flex max-w-container flex-col items-center gap-6 py-16 text-center container-px sm:py-20">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
              Vybrali jste si?
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="max-w-xl text-white/85">
            Napište nám, o který balíček máte zájem, a domluvíme se na termínu
            nástupu.
          </Reveal>
          <Reveal delay={0.16}>
            <ButtonLink href="/kontakt" variant="ghostDark">
              Přihlásit se do kurzu
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
