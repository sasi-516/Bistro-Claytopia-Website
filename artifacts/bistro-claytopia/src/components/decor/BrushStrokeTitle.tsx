import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

interface BrushStrokeTitleProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
  accent?: "yellow" | "blue" | "orange" | "purple" | "pink" | "mint";
}

const accentColors = {
  yellow: "text-primary",
  blue: "text-paint-blue",
  orange: "text-paint-orange",
  purple: "text-paint-purple",
  pink: "text-paint-pink",
  mint: "text-paint-mint",
};

const strokeColors = {
  yellow: "hsl(var(--primary))",
  blue: "hsl(var(--paint-blue))",
  orange: "hsl(var(--paint-orange))",
  purple: "hsl(var(--paint-purple))",
  pink: "hsl(var(--paint-pink))",
  mint: "hsl(var(--paint-mint))",
};

export function BrushStrokeTitle({
  eyebrow,
  title,
  description,
  className,
  accent = "yellow",
}: BrushStrokeTitleProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className={cn("text-center max-w-2xl mx-auto mb-14 relative", className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <p className={cn("text-xs uppercase tracking-[0.2em] font-bold mb-3", accentColors[accent])}>
        {eyebrow}
      </p>

      <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-foreground">
        {title}
      </h2>

      <svg viewBox="0 0 240 12" className="mx-auto w-44 sm:w-56 h-3 mb-4" aria-hidden="true">
        <motion.path
          d="M4,8 C40,2 80,10 120,6 C160,2 200,10 236,5"
          fill="none"
          stroke={strokeColors[accent]}
          strokeWidth="4"
          strokeLinecap="round"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
        {!reduced && (
          <motion.path
            d="M20,10 C60,12 100,4 140,9 C170,12 200,6 220,8"
            fill="none"
            stroke="hsl(var(--paint-pink))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.6"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          />
        )}
      </svg>

      {description && (
        <p className="text-lg leading-relaxed text-muted-foreground">{description}</p>
      )}
    </motion.div>
  );
}
