import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { testimonials as defaultTestimonials, type Testimonial } from "@/lib/data";

type TestimonialsProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: Testimonial[];
};

export function Testimonials({
  eyebrow = "Reference",
  title = "Co říkají naši žáci",
  description = "Zkušenosti lidí, kteří u nás získali řidičák nebo si obnovili jistotu za volantem.",
  items = defaultTestimonials,
}: TestimonialsProps) {
  const testimonials = items;
  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-container py-20 container-px sm:py-28">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t) => (
            <StaggerItem
              key={t.name}
              className="relative flex flex-col rounded-2xl border border-line bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover sm:p-8"
            >
              <Quote className="h-8 w-8 text-accent/15" aria-hidden="true" />
              <div className="mt-3 flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink text-pretty">
                “{t.quote}”
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 font-display text-sm font-bold text-accent">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-ink-muted">{t.detail}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
