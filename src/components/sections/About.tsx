import { Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { site } from "@/lib/site";

const points = [
  "Roky praxe a tisíce odjetých hodin výcviku",
  "Nadšenec do aut a motorsportu, řízení vás naučí s citem",
  "Individuální tempo a lidský přístup ke každému žákovi",
];

export function About() {
  return (
    <section className="bg-bg-muted">
      <div className="mx-auto grid max-w-container items-center gap-12 py-20 container-px sm:py-28 lg:grid-cols-2 lg:gap-16">
        {/* instructor photo */}
        <Reveal>
          <SmartImage
            src="/images/instructor.jpg"
            alt={`${site.owner}, lektor autoškoly Royal Cars`}
            label="Lektor Josef Semirád"
            width={760}
            height={620}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[5/4] w-full rounded-2xl object-cover shadow-card"
          />
        </Reveal>

        {/* text */}
        <div>
          <SectionHeading
            eyebrow="Kdo vás povede"
            title="Za volantem i za katedrou jeden člověk"
            description={`${site.owner} vede autoškolu s důrazem na osobní přístup. Žádný anonymní řetězec. Víte, s kým jezdíte, a tomu odpovídá i kvalita výuky.`}
          />
          <ul className="mt-8 space-y-3.5">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[15px] text-ink">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Check className="h-3.5 w-3.5 text-accent" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex items-center gap-4 rounded-2xl border border-line bg-white p-5 shadow-card">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent font-display text-lg font-bold text-white">
              JS
            </span>
            <div>
              <p className="font-display text-base font-bold text-ink">{site.owner}</p>
              <p className="text-sm text-ink-muted">
                Zakladatel a lektor autoškoly {site.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
