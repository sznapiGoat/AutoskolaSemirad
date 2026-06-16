import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, Building2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktujte autoškolu Royal Cars Liberec — Mgr. Josef Semirád. Telefon, e-mail, adresa učebny a online poptávkový formulář.",
};

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`;

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-dark pt-32 text-white">
        <div className="mx-auto max-w-container pb-16 container-px">
          <SectionHeading
            dark
            eyebrow="Kontakt"
            title="Domluvme se na nástupu"
            description="Zavolejte, napište nebo vyplňte formulář. Ozveme se vám co nejdříve a probereme termín i vhodný balíček."
          />
        </div>
      </section>

      {/* Contact + form */}
      <section className="bg-bg">
        <div className="mx-auto grid max-w-container gap-12 py-20 container-px sm:py-24 lg:grid-cols-[1fr_1.2fr]">
          {/* Info */}
          <Reveal className="space-y-8">
            <div>
              <h3 className="font-display text-xl font-bold text-ink">
                {site.fullName}
              </h3>
              <p className="mt-1 text-sm text-ink-muted">{site.owner}</p>
            </div>

            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <MapPin className="h-5 w-5" />
                </span>
                <span className="text-ink">
                  {site.address.street}
                  <br />
                  {site.address.city}
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Phone className="h-5 w-5" />
                </span>
                <a
                  href={site.phoneHref}
                  className="font-semibold text-ink transition-colors hover:text-accent"
                >
                  {site.phone}
                </a>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Mail className="h-5 w-5" />
                </span>
                <a
                  href={`mailto:${site.email}`}
                  className="text-ink transition-colors hover:text-accent"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Clock className="h-5 w-5" />
                </span>
                <span className="text-ink">
                  Po–Pá: {site.hours.weekdays}
                  <br />
                  So–Ne: {site.hours.weekend}
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Building2 className="h-5 w-5" />
                </span>
                <span className="text-ink">
                  Bankovní účet
                  <br />
                  <span className="text-ink-muted">{site.bankAccount}</span>
                </span>
              </li>
            </ul>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="rounded-2xl border border-line bg-white p-7 shadow-card sm:p-9">
            <h3 className="font-display text-xl font-bold text-ink">
              Nezávazná poptávka
            </h3>
            <p className="mt-1.5 text-sm text-ink-muted">
              Vyplňte formulář a my se vám ozveme.
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="bg-bg-muted">
        <div className="mx-auto max-w-container py-16 container-px">
          <Reveal className="overflow-hidden rounded-2xl border border-line shadow-card">
            <iframe
              title="Mapa — sídlo autoškoly Royal Cars"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full border-0"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
