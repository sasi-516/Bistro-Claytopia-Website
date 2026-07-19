import { motion } from "framer-motion";
import type { MenuSectionGroup } from "@/data/menu";

interface MenuSectionNavProps {
  sections: MenuSectionGroup[];
  activeSection: string;
  onSelect: (sectionName: string) => void;
  /** Show an "All" chip at the start (order view) */
  showAll?: boolean;
  allLabel?: string;
}

const SECTION_EMOJI: Record<string, string> = {
  "Bistro All Day": "🍳",
  "Plates to Share": "🍟",
  Burgers: "🍔",
  "Burgers & Sandwiches": "🥪",
  "Main Course": "🍝",
  Beverages: "☕",
  "Beverages & Desserts": "🍰",
  "Boba Bubble Tea": "🧋",
};

export function MenuSectionNav({
  sections,
  activeSection,
  onSelect,
  showAll = false,
  allLabel = "Full Menu",
}: MenuSectionNavProps) {
  return (
    <div className="relative">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory px-1">
        {showAll && (
          <SectionChip
            emoji="📖"
            label={allLabel}
            sub={`${sections.reduce((n, s) => n + s.categories.length, 0)} sections`}
            active={activeSection === "all"}
            onClick={() => onSelect("all")}
            testId="nav-section-all"
          />
        )}
        {sections.map((section) => (
          <SectionChip
            key={section.name}
            emoji={SECTION_EMOJI[section.name] ?? "✨"}
            label={section.name}
            sub={`${section.categories.length} parts`}
            active={activeSection === section.name}
            onClick={() => onSelect(section.name)}
            testId={`nav-section-${section.name.replace(/\s+/g, "-").toLowerCase()}`}
          />
        ))}
      </div>
    </div>
  );
}

function SectionChip({
  emoji,
  label,
  sub,
  active,
  onClick,
  testId,
}: {
  emoji: string;
  label: string;
  sub: string;
  active: boolean;
  onClick: () => void;
  testId: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      data-testid={testId}
      whileTap={{ scale: 0.97 }}
      className={`snap-start shrink-0 flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl border-2 transition-all min-w-[108px] max-w-[130px] ${
        active
          ? "border-primary bg-primary/10 shadow-md shadow-primary/15"
          : "border-border/60 bg-card hover:border-primary/30 hover:bg-muted/50"
      }`}
    >
      <span className="text-2xl leading-none">{emoji}</span>
      <span
        className={`text-[11px] font-bold leading-tight text-center line-clamp-2 ${
          active ? "text-primary" : "text-foreground"
        }`}
      >
        {label}
      </span>
      <span className="text-[9px] text-muted-foreground">{sub}</span>
    </motion.button>
  );
}
