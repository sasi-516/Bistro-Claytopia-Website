import { motion } from "framer-motion";
import { Paintbrush, Palette, Sparkles } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type Tone = "hero" | "light" | "blue" | "yellow" | "pink" | "purple" | "mint";

const BLOBS: { color: string; style: React.CSSProperties; size: string; duration: number }[] = [
  { color: "bg-paint-blue/20", style: { top: "5%", left: "3%" }, size: "w-32 h-32 md:w-48 md:h-48", duration: 9 },
  { color: "bg-paint-pink/15", style: { top: "20%", right: "5%" }, size: "w-24 h-24 md:w-36 md:h-36", duration: 11 },
  { color: "bg-paint-purple/15", style: { bottom: "15%", left: "8%" }, size: "w-28 h-28 md:w-40 md:h-40", duration: 10 },
  { color: "bg-paint-mint/15", style: { bottom: "25%", right: "10%" }, size: "w-20 h-20 md:w-32 md:h-32", duration: 8 },
  { color: "bg-paint-orange/12", style: { top: "45%", left: "45%" }, size: "w-16 h-16 md:w-24 md:h-24", duration: 12 },
  { color: "bg-paint-yellow/20", style: { top: "60%", right: "30%" }, size: "w-14 h-14 md:w-20 md:h-20", duration: 7 },
];

const ICON_COLORS = [
  "text-paint-blue/40",
  "text-paint-purple/40",
  "text-paint-orange/40",
  "text-paint-pink/40",
  "text-paint-mint/40",
];

interface StudioAmbienceProps {
  tone?: Tone;
  className?: string;
}

export function StudioAmbience({ tone = "light", className }: StudioAmbienceProps) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;

  const showIcons = tone === "hero" || tone === "light";

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden pointer-events-none select-none", className)}
      aria-hidden="true"
    >
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className={cn("absolute rounded-full blur-2xl", blob.color, blob.size)}
          style={blob.style}
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        />
      ))}

      {showIcons && (
        <>
          <motion.div
            className={cn("absolute top-[12%] right-[15%]", ICON_COLORS[0])}
            animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Paintbrush size={28} strokeWidth={1.5} />
          </motion.div>
          <motion.div
            className={cn("absolute bottom-[20%] left-[12%]", ICON_COLORS[2])}
            animate={{ y: [0, -10, 0], rotate: [0, -6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Palette size={32} strokeWidth={1.5} />
          </motion.div>
          <motion.div
            className={cn("absolute top-[40%] left-[6%] hidden sm:block", ICON_COLORS[4])}
            animate={{ y: [0, -8, 0], rotate: [0, 12, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <Sparkles size={22} strokeWidth={1.5} />
          </motion.div>
        </>
      )}
    </div>
  );
}
