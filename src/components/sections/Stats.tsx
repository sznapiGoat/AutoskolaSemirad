import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";

type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

const defaultStats: Stat[] = [
  { value: 30, suffix: "", label: "hodin praktických jízd ve standardu" },
  { value: 5, suffix: "", label: "balíčků kurzů na výběr" },
  { value: 17999, suffix: " Kč", prefix: "od ", label: "cena základního kurzu" },
  { value: 3, suffix: "", label: "splátky bez navýšení" },
];

export function Stats({ items = defaultStats }: { items?: Stat[] }) {
  const stats = items;
  return (
    <section className="relative bg-dark-card">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-accent" />
      <div className="mx-auto max-w-container py-14 container-px">
        <StaggerGroup className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem
              key={stat.label}
              className="border-l border-white/10 pl-5 first:border-l-0 first:pl-0 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
            >
              <div className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {stat.prefix && (
                  <span className="text-2xl font-semibold text-white/50">
                    {stat.prefix}
                  </span>
                )}
                <AnimatedCounter value={stat.value} />
                {stat.suffix && <span>{stat.suffix}</span>}
              </div>
              <p className="mt-2 max-w-[14rem] text-sm leading-snug text-white/50">
                {stat.label}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
