import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { nav, site } from "@/lib/site";
import type { ResolvedSite } from "@/lib/content";
import { Logo } from "./Logo";

export function Footer({ settings = site }: { settings?: ResolvedSite }) {
  const s = settings;
  return (
    <footer className="relative bg-dark text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="mx-auto max-w-container py-16 container-px">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5">
            <Logo dark />
            <p className="max-w-xs text-sm leading-relaxed text-white/55">
              Individuální přístup a služby šité na míru řidičům Libereckého
              kraje.
            </p>
          </div>

          <nav aria-label="Navigace v patičce">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Navigace
            </h3>
            <ul className="space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-accent-light"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Kontakt
            </h3>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>
                  {s.address.street}
                  <br />
                  {s.address.city}
                </span>
              </li>
              <li>
                <a
                  href={s.phoneHref}
                  className="flex items-center gap-3 transition-colors hover:text-accent-light"
                >
                  <Phone className="h-4 w-4 shrink-0 text-accent" />
                  {s.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${s.email}`}
                  className="flex items-center gap-3 transition-colors hover:text-accent-light"
                >
                  <Mail className="h-4 w-4 shrink-0 text-accent" />
                  {s.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Provozní doba
            </h3>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>
                  Po–Pá: {s.hours.weekdays}
                  <br />
                  So–Ne: {s.hours.weekend}
                </span>
              </li>
              <li className="text-white/45">
                Bankovní účet
                <br />
                <span className="text-white/70">{s.bankAccount}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-xs text-white/40">
          © 2025 {s.fullName}, {s.owner}
        </div>
      </div>
    </footer>
  );
}
