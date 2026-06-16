import { Fragment } from "react";

type MarqueeProps = {
  items: string[];
  className?: string;
};

/**
 * Seamless, CSS-driven marquee. The track is duplicated and translated -50%,
 * so the loop is continuous. Pauses on hover and respects reduced motion.
 */
export function Marquee({ items, className }: MarqueeProps) {
  return (
    <div
      className={
        "group relative flex overflow-hidden " + (className ?? "")
      }
      aria-hidden="true"
    >
      <div className="flex shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((dup) => (
          <Fragment key={dup}>
            {items.map((item, i) => (
              <span key={`${dup}-${i}`} className="flex items-center">
                <span className="px-8 font-display text-lg font-medium tracking-tight text-white/80 sm:text-xl">
                  {item}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
              </span>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
