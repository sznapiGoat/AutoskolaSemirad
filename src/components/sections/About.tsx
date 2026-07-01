import { Check, GraduationCap, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { getAboutContent } from "@/lib/content";

function initials(name: string) {
  return name
    .split(" ")
    .filter((w) => /^[A-Za-zÀ-ž]/.test(w))
    .map((w) => w[0])
    .slice(-2)
    .join("")
    .toUpperCase();
}

export async function About() {
  const c = await getAboutContent();

  return (
    <section className="bg-bg-muted">
      <div className="mx-auto max-w-container py-20 container-px sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* instructor photo */}
          <Reveal>
            <SmartImage
              src="/images/instructor.jpg"
              alt={`${c.instructorName}, lektor autoškoly Royal Cars`}
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
              eyebrow={c.eyebrow}
              title={c.title}
              description={c.description}
            />
            <ul className="mt-8 space-y-3.5">
              {c.points.map((p) => (
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
                {initials(c.instructorName)}
              </span>
              <div>
                <p className="font-display text-base font-bold text-ink">
                  {c.instructorName}
                </p>
                <p className="text-sm text-ink-muted">{c.instructorRole}</p>
              </div>
            </div>
          </div>
        </div>

        {/* professional highlights */}
        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-3">
          {c.highlights.map((h) => (
            <StaggerItem
              key={h.label}
              className="rounded-2xl border border-line bg-white p-7 text-center shadow-card"
            >
              <p className="font-display text-3xl font-bold text-accent sm:text-4xl">
                {h.value}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{h.label}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* license scope */}
        {c.license && (
          <Reveal className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-accent/20 bg-accent/5 p-6 text-center sm:flex-row sm:justify-center sm:gap-4 sm:text-left">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <p className="text-[15px] text-ink">
              Rozsah oprávnění učitele výuky a výcviku:{" "}
              <span className="font-display font-bold text-ink">{c.license}</span>
            </p>
          </Reveal>
        )}

        {/* expertise + education */}
        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h3 className="font-display text-xl font-bold text-ink">
              {c.expertiseTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {c.expertiseText}
            </p>
            <ul className="mt-6 space-y-3">
              {c.expertise.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-ink">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Check className="h-3.5 w-3.5 text-accent" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <h3 className="flex items-center gap-2 font-display text-xl font-bold text-ink">
              <GraduationCap className="h-5 w-5 text-accent" />
              {c.educationTitle}
            </h3>
            <ol className="mt-6 space-y-5 border-l border-line pl-6">
              {c.education.map((edu) => (
                <li key={edu.school} className="relative">
                  <span className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-bg-muted" />
                  <p className="font-display text-[15px] font-semibold text-ink">
                    {edu.school}
                  </p>
                  {edu.detail && (
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                      {edu.detail}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
