import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

interface PotteryDividerProps {
  flip?: boolean;
  className?: string;
}

export function PotteryDivider({ flip = false, className }: PotteryDividerProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className={cn("relative w-full overflow-hidden leading-[0]", flip && "rotate-180", className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        className="w-full h-8 sm:h-12 block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="paint-wave" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--paint-blue) / 0.15)" />
            <stop offset="33%" stopColor="hsl(var(--paint-pink) / 0.12)" />
            <stop offset="66%" stopColor="hsl(var(--paint-purple) / 0.12)" />
            <stop offset="100%" stopColor="hsl(var(--paint-mint) / 0.15)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,28 C180,56 360,0 540,28 C720,56 900,0 1080,28 C1260,56 1440,0 1440,28 L1440,56 L0,56 Z"
          fill="url(#paint-wave)"
          initial={reduced ? undefined : { opacity: 0.5 }}
          whileInView={reduced ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
      </svg>
    </div>
  );
}
