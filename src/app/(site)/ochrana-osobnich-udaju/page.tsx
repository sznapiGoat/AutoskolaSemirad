import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů",
  description:
    "Zásady zpracování osobních údajů autoškoly Royal Cars Liberec — jaké údaje zpracováváme, proč a jaká máte práva.",
  alternates: { canonical: "/ochrana-osobnich-udaju" },
};

export default async function PrivacyPage() {
  const s = await getSiteSettings();
  return (
    <>
      <section className="bg-dark pt-32 text-white">
        <div className="mx-auto max-w-container pb-16 container-px">
          <SectionHeading
            dark
            eyebrow="GDPR"
            title="Ochrana osobních údajů"
            description="Jak nakládáme s údaji, které nám svěříte."
          />
        </div>
      </section>

      <section className="bg-bg">
        <div className="mx-auto max-w-3xl space-y-10 py-16 container-px sm:py-20">
          <div>
            <h2 className="font-display text-xl font-bold text-ink">Správce údajů</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Správcem osobních údajů je {s.owner}, provozovatel autoškoly{" "}
              {s.fullName}, se sídlem {s.address.street}, {s.address.city}. V
              záležitostech ochrany osobních údajů nás můžete kontaktovat na
              e-mailu {s.email} nebo telefonicky na čísle {s.phone}.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">
              Jaké údaje zpracováváme a proč
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-muted">
              <li>
                <strong className="text-ink">Poptávkový formulář:</strong> jméno,
                telefon, e-mail a obsah zprávy. Údaje používáme výhradně k tomu,
                abychom vám odpověděli a domluvili se na výcviku. Právním
                základem je jednání o uzavření smlouvy.
              </li>
              <li>
                <strong className="text-ink">Přihlášení do kurzu:</strong> údaje
                vyžadované zákonem č. 247/2000 Sb. (žádost o přijetí k výuce a
                posudek o zdravotní způsobilosti). Tyto údaje zpracováváme na
                základě právní povinnosti.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">
              Předávání a doba uložení
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Zprávy z formuláře doručuje služba Resend (zpracovatel e-mailů).
              Údaje nepředáváme žádným dalším třetím stranám a neprodáváme je.
              Poptávky uchováváme po dobu nezbytnou k vyřízení, dokumentaci
              výcviku po dobu stanovenou zákonem.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">Vaše práva</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Máte právo na přístup ke svým údajům, jejich opravu či výmaz,
              omezení zpracování, přenositelnost a právo vznést námitku. Se
              stížností se můžete obrátit na Úřad pro ochranu osobních údajů
              (uoou.gov.cz). Pro uplatnění práv nás kontaktujte na {s.email}.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">Cookies</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Web používá pouze technicky nezbytné soubory a anonymní měření
              návštěvnosti bez sledovacích cookies. Nepoužíváme marketingové ani
              reklamní sledování.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
