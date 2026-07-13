import type { Metadata } from "next";
import { Suspense } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Building2,
  CalendarDays,
  FileDown,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { ContactForm } from "@/components/sections/ContactForm";
import { getContactContent, getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Kontakt a přihláška do autoškoly Liberec",
  description:
    "Kontaktujte autoškolu Royal Cars Liberec, Mgr. Bc. Josef Semirád. Telefon, e-mail, adresa učebny, přihláška ke stažení a online poptávkový formulář.",
  alternates: { canonical: "/kontakt" },
};

export default async function ContactPage() {
  const [content, s] = await Promise.all([getContactContent(), getSiteSettings()]);
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(s.mapQuery)}&output=embed`;
  return (
    <>
      {/* Header */}
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

      {/* Contact + form */}
      <section className="bg-bg">
        <div className="mx-auto grid max-w-container gap-12 py-20 container-px sm:py-24 lg:grid-cols-[1fr_1.2fr]">
          {/* Info */}
          <Reveal className="space-y-8">
            <div className="relative overflow-hidden rounded-2xl shadow-card">
              <SmartImage
                src={content.instructorImage}
                alt={`${content.instructorName} za volantem`}
                label="Lektor za volantem"
                width={900}
                height={600}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[3/2] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-12">
                <p className="font-display text-lg font-bold text-white">
                  {content.instructorName}
                </p>
                <p className="text-sm text-white/70">{content.instructorRole}</p>
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl font-bold text-ink">
                {s.fullName}
              </h3>
              <p className="mt-1 text-sm text-ink-muted">{content.infoSubtext}</p>
            </div>

            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <MapPin className="h-5 w-5" />
                </span>
                <span className="text-ink">
                  {s.address.street}
                  <br />
                  {s.address.city}
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Phone className="h-5 w-5" />
                </span>
                <a
                  href={s.phoneHref}
                  className="font-semibold text-ink transition-colors hover:text-accent"
                >
                  {s.phone}
                </a>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Mail className="h-5 w-5" />
                </span>
                <a
                  href={`mailto:${s.email}`}
                  className="text-ink transition-colors hover:text-accent"
                >
                  {s.email}
                </a>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Clock className="h-5 w-5" />
                </span>
                <span className="text-ink">
                  Po–Pá: {s.hours.weekdays}
                  <br />
                  So–Ne: {s.hours.weekend}
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <CalendarDays className="h-5 w-5" />
                </span>
                <span className="text-ink">
                  Nejbližší nástup do kurzu
                  <br />
                  <span className="font-semibold">{s.nextCourse}</span>
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Building2 className="h-5 w-5" />
                </span>
                <span className="text-ink">
                  Platba kurzovného (č. ú.)
                  <br />
                  <span className="text-ink-muted">{s.bankAccount}</span>
                </span>
              </li>
            </ul>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="rounded-2xl border border-line bg-white p-7 shadow-card sm:p-9">
            <h3 className="font-display text-xl font-bold text-ink">
              {content.formHeading}
            </h3>
            <p className="mt-1.5 text-sm text-ink-muted">{content.formSubtext}</p>
            <div className="mt-7">
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How to enroll */}
      <section className="bg-dark text-white">
        <div className="mx-auto max-w-container py-16 container-px sm:py-20">
          <SectionHeading
            dark
            eyebrow="Jak se přihlásit"
            title="Tři kroky k nástupu do kurzu"
            description="K zahájení výcviku potřebujete dva vyplněné dokumenty. Vše ostatní vyřídíme společně na učebně."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              {
                n: "01",
                title: "Ozvěte se nám",
                text: "Zavolejte nebo vyplňte formulář výše. Domluvíme balíček a termín nástupu.",
              },
              {
                n: "02",
                title: "Připravte si dokumenty",
                text: "Stáhněte a vyplňte žádost o přijetí k výuce a nechte si lékařem potvrdit posudek o zdravotní způsobilosti.",
              },
              {
                n: "03",
                title: "Přineste je na učebnu",
                text: "Dokumenty od vás převezmeme při první návštěvě a můžete rovnou začít s teorií.",
              },
            ].map((step) => (
              <Reveal key={step.n} className="rounded-2xl border border-white/10 bg-dark-card p-7">
                <span className="font-display text-4xl font-bold text-accent/40">
                  {step.n}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{step.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-5 text-sm text-white/60">
            Řidičák na osobní auto můžete začít dělat už v 17 letech (zkoušku
            skládáte nejdříve v den 17. narozenin, do 18 let jezdíte s mentorem).
          </Reveal>
        </div>
      </section>

      {/* Documents */}
      <section className="bg-dark-card text-white">
        <div className="mx-auto max-w-container py-16 container-px sm:py-20">
          <SectionHeading
            dark
            eyebrow="Dokumenty"
            title="Dokumenty ke stažení"
            description="Stáhněte si oba formuláře ve formátu, který vám vyhovuje."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <Reveal className="rounded-2xl border border-white/10 bg-dark p-7">
              <h3 className="font-display text-lg font-semibold">
                Žádost o přijetí k výuce a výcviku
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Vyplňte a podepište, přineste s sebou na první hodinu výuky.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="/dokumenty/zadost-o-prijeti-k-vyuce.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/40"
                >
                  <FileDown className="h-4 w-4 text-accent-light" />
                  PDF
                </a>
                <a
                  href="/dokumenty/zadost-o-prijeti-k-vyuce.doc"
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/40"
                >
                  <FileDown className="h-4 w-4 text-accent-light" />
                  DOC
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="rounded-2xl border border-white/10 bg-dark p-7">
              <h3 className="font-display text-lg font-semibold">
                Posudek o zdravotní způsobilosti
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Nechte si potvrdit u svého praktického lékaře, přineste s sebou na první
                hodinu výuky.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="/dokumenty/lekarsky-posudek.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/40"
                >
                  <FileDown className="h-4 w-4 text-accent-light" />
                  PDF
                </a>
                <a
                  href="/dokumenty/lekarsky-posudek.docx"
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/40"
                >
                  <FileDown className="h-4 w-4 text-accent-light" />
                  DOCX
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="mt-6 rounded-2xl border border-accent/25 bg-accent/10 p-6">
            <p className="text-sm font-semibold text-white">
              Oba vyplněné a potvrzené dokumenty přineste s sebou na 1. hodinu výuky.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Volejte prosím od pondělí do pátku mezi 7 až 19 hodinou. V nepřítomnosti je
              možné zanechat dokumenty ve schránce na vratech vedle autobusové zastávky
              (vpravo od budovy).
            </p>
          </Reveal>
        </div>
      </section>

      {/* Showroom + map */}
      <section className="bg-bg-muted">
        <div className="mx-auto max-w-container py-16 container-px sm:py-20">
          <SectionHeading
            eyebrow={content.showroom.eyebrow}
            title={content.showroom.title}
            description={content.showroom.description}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Reveal className="overflow-hidden rounded-2xl border border-line shadow-card">
              <SmartImage
                src={content.showroom.image}
                alt="Učebna autoškoly Royal Cars v Liberci"
                label="Naše učebna"
                width={880}
                height={560}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-full min-h-[320px] w-full object-cover lg:min-h-[420px]"
              />
            </Reveal>
            <Reveal
              delay={0.1}
              className="overflow-hidden rounded-2xl border border-line shadow-card"
            >
              <iframe
                title="Mapa sídla autoškoly Royal Cars"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[320px] w-full border-0 lg:h-full lg:min-h-[420px]"
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
