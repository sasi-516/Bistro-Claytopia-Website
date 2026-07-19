import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatMenuPrice, getMenuSections } from "@/data/menu";
import { MenuSectionNav } from "@/components/menu/MenuSectionNav";
import { useBookLayout } from "@/hooks/use-book-layout";
import {
  buildBookSpreads,
  getSpreadIndexForSection,
  type BookItemEntry,
  type BookSpread,
} from "@/lib/menu-book";

export function BookView() {
  const layout = useBookLayout();
  const spreads = useMemo(() => buildBookSpreads(layout), [layout]);
  const sections = useMemo(() => getMenuSections(), []);
  const [[spreadIndex, direction], setSpread] = useState([0, 0]);

  useEffect(() => {
    setSpread(([idx]) => [Math.min(idx, Math.max(0, spreads.length - 1)), 0]);
  }, [spreads.length]);

  const spread = spreads[spreadIndex];
  const activeSection = spread?.section.name ?? sections[0]?.name ?? "";

  const paginate = (dir: number) => {
    const next = spreadIndex + dir;
    if (next < 0 || next >= spreads.length) return;
    setSpread([next, dir]);
  };

  const jumpToSection = (sectionName: string) => {
    const idx = getSpreadIndexForSection(spreads, sectionName);
    if (idx < 0) return;
    setSpread([idx, idx > spreadIndex ? 1 : -1]);
  };

  const pageVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "40%" : "-40%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "40%" : "-40%",
      opacity: 0,
      transition: { duration: 0.25, ease: [0.55, 0, 0.78, 0] as const },
    }),
  };

  const rightVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      rotateY: dir > 0 ? 24 : -24,
      opacity: 0,
    }),
    center: {
      x: 0,
      rotateY: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      rotateY: dir < 0 ? 24 : -24,
      opacity: 0,
      transition: { duration: 0.3, ease: [0.55, 0, 0.78, 0] as const },
    }),
  };

  const leftVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "-24%" : "24%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "-24%" : "24%",
      opacity: 0,
      transition: { duration: 0.3, ease: [0.55, 0, 0.78, 0] as const },
    }),
  };

  if (!spread) return null;

  const sectionCategories = spread.section.categories;
  const accentGradient = sectionCategories[0]?.gradient ?? "from-primary to-paint-yellow";

  return (
    <div className="w-full max-w-6xl mx-auto px-2 md:px-0 select-none">
      <div className="mb-6">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-primary font-bold mb-3">
          Pick a chapter
        </p>
        <MenuSectionNav
          sections={sections}
          activeSection={activeSection}
          onSelect={jumpToSection}
        />
      </div>

      <div
        className="relative w-full rounded-2xl shadow-2xl overflow-hidden bg-card"
        style={{ perspective: "2000px", height: layout.height }}
      >
        {layout.isMobile ? (
          /* ── MOBILE: one full page at a time ── */
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={`mobile-${spread.id}`}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className={`relative h-full overflow-hidden ${
                spread.mobile.kind === "intro"
                  ? `bg-gradient-to-br ${accentGradient} text-white`
                  : "bg-background"
              }`}
            >
              {spread.mobile.kind === "intro" ? (
                <SectionIntroPage spread={spread} />
              ) : (
                <ItemsPage entries={spread.mobile.entries} />
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          /* ── DESKTOP: two-page spread ── */
          <>
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-black/15 via-black/30 to-black/15 z-30" />
            <div className="grid grid-cols-2 h-full" style={{ transformStyle: "preserve-3d" }}>
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  key={`left-${spread.id}`}
                  custom={direction}
                  variants={leftVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className={`relative h-full overflow-hidden ${
                    spread.left.kind === "intro"
                      ? `bg-gradient-to-br ${accentGradient} text-white`
                      : "bg-background"
                  }`}
                >
                  {spread.left.kind === "intro" ? (
                    <SectionIntroPage spread={spread} />
                  ) : (
                    <ItemsPage entries={spread.left.entries} />
                  )}
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  key={`right-${spread.id}`}
                  custom={direction}
                  variants={rightVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative h-full overflow-hidden bg-background"
                >
                  {spread.right.kind === "items" && (
                    <ItemsPage entries={spread.right.entries} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none z-20">
              <div
                className="absolute bottom-0 right-0 w-0 h-0"
                style={{
                  borderStyle: "solid",
                  borderWidth: "0 0 28px 28px",
                  borderColor: "transparent transparent hsl(var(--muted)) transparent",
                }}
              />
            </div>
          </>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 px-1 gap-2">
        <button
          onClick={() => paginate(-1)}
          disabled={spreadIndex === 0}
          data-testid="button-book-prev"
          className="flex items-center gap-2 px-3 md:px-4 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:bg-muted border border-border/60"
        >
          <ChevronLeft size={16} /> <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="text-center min-w-0">
          <p className="text-sm font-serif font-bold text-foreground truncate">{spread.section.name}</p>
          <p className="text-xs text-muted-foreground">
            Page {spread.spreadInSection + 1}/{spread.totalSpreadsInSection}
          </p>
        </div>

        <button
          onClick={() => paginate(1)}
          disabled={spreadIndex === spreads.length - 1}
          data-testid="button-book-next"
          className="flex items-center gap-2 px-3 md:px-4 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:bg-muted border border-border/60"
        >
          <span className="hidden sm:inline">Next</span> <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

function SectionIntroPage({ spread }: { spread: BookSpread }) {
  const { section } = spread;
  const emoji = section.categories[0]?.emoji ?? "📖";
  const parts = section.categories.map((c) => c.name);

  return (
    <div className="flex flex-col justify-between h-full p-6 md:p-10">
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10 overflow-hidden pointer-events-none">
        <div className="w-40 h-40 rounded-full border-2 border-white -translate-x-10 -translate-y-10" />
      </div>

      <div>
        <p className="text-white/50 text-[10px] uppercase tracking-[0.25em] mb-2 font-medium">
          Menu Chapter
        </p>
        <div className="text-5xl mb-4">{emoji}</div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold leading-tight mb-2">
          {section.name}
        </h2>
        <p className="text-white/70 text-sm leading-relaxed">
          {parts.join(" · ")}
        </p>
      </div>

      <div className="space-y-2">
        <div className="h-px w-12 bg-white/30" />
        <p className="text-white/50 text-xs">Tap Next to browse items →</p>
      </div>
    </div>
  );
}

function ItemsPage({ entries }: { entries: BookItemEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className="h-full flex items-center justify-center px-6">
        <p className="text-xs text-muted-foreground italic">—</p>
      </div>
    );
  }

  return (
    <div className="relative h-full flex flex-col px-4 py-4 md:px-6 md:py-5 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(transparent, transparent 26px, #000 26px, #000 27px)",
          backgroundSize: "100% 27px",
          backgroundPosition: "0 20px",
        }}
      />

      <div className="relative flex-1 min-h-0 overflow-hidden">
        <div className="flex flex-col gap-2.5 h-full">
          {entries.map((entry, i) => (
            <BookItemRow
              key={`${entry.item.id}-${i}`}
              entry={entry}
              showSubheading={
                i === 0 || entries[i - 1].subcategory.id !== entry.subcategory.id
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function BookItemRow({
  entry,
  showSubheading,
}: {
  entry: BookItemEntry;
  showSubheading: boolean;
}) {
  const { subcategory, item } = entry;

  return (
    <div className="shrink-0">
      {showSubheading && (
        <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">
          {subcategory.emoji} {subcategory.name}
        </p>
      )}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-1.5 flex-1 min-w-0">
          <span className="mt-0.5 shrink-0" title={item.isVeg ? "Vegetarian" : "Non-vegetarian"}>
            <span
              className={`inline-block w-3 h-3 border-2 rounded-sm flex items-center justify-center ${
                item.isVeg ? "border-green-600" : "border-red-600"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-600"}`}
              />
            </span>
          </span>
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground text-xs leading-snug">{item.name}</h3>
            <p className="text-muted-foreground text-[10px] leading-snug mt-0.5 line-clamp-2">
              {item.description}
            </p>
          </div>
        </div>
        <span className="font-bold text-foreground text-xs whitespace-nowrap shrink-0 pt-0.5">
          {formatMenuPrice(item)}
        </span>
      </div>
      <div className="mt-1.5 border-b border-dashed border-border/35" />
    </div>
  );
}
