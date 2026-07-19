import type { MenuCategory, MenuItem, MenuSectionGroup } from "@/data/menu";
import { getMenuSections } from "@/data/menu";
import type { BookLayoutConfig } from "@/hooks/use-book-layout";

export interface BookItemEntry {
  subcategory: MenuCategory;
  item: MenuItem;
}

export type BookPageContent =
  | { kind: "intro" }
  | { kind: "items"; entries: BookItemEntry[] };

export interface BookSpread {
  id: string;
  section: MenuSectionGroup;
  spreadInSection: number;
  totalSpreadsInSection: number;
  left: BookPageContent;
  right: BookPageContent;
  mobile: BookPageContent;
}

function flattenSection(section: MenuSectionGroup): BookItemEntry[] {
  return section.categories.flatMap((sub) =>
    sub.items.map((item) => ({ subcategory: sub, item }))
  );
}

/** Split items evenly across left and right columns */
function splitAcrossColumns(chunk: BookItemEntry[]): [BookItemEntry[], BookItemEntry[]] {
  if (chunk.length === 0) return [[], []];
  const half = Math.ceil(chunk.length / 2);
  return [chunk.slice(0, half), chunk.slice(half)];
}

/**
 * Items for the intro spread's right page.
 * Completes the first subcategory when it barely exceeds the column limit
 * (e.g. all 6 American Breakfast items on one page).
 */
function takeIntroRightItems(flat: BookItemEntry[], maxItems: number): BookItemEntry[] {
  if (flat.length === 0) return [];

  const firstSubId = flat[0].subcategory.id;
  let subEnd = 0;
  while (subEnd < flat.length && flat[subEnd].subcategory.id === firstSubId) {
    subEnd++;
  }
  const subSize = subEnd;

  if (subSize <= maxItems + 1) {
    return flat.slice(0, subSize);
  }
  return flat.slice(0, maxItems);
}

/**
 * Items for a single mobile page — prefer finishing a subcategory when it fits.
 */
function takeMobilePage(flat: BookItemEntry[], start: number, maxItems: number): BookItemEntry[] {
  if (start >= flat.length) return [];

  const firstSubId = flat[start].subcategory.id;
  let subEnd = start + 1;
  while (subEnd < flat.length && flat[subEnd].subcategory.id === firstSubId) {
    subEnd++;
  }
  const subSize = subEnd - start;

  if (subSize <= maxItems) {
    return flat.slice(start, subEnd);
  }
  return flat.slice(start, start + maxItems);
}

export function buildBookSpreads(layout: BookLayoutConfig): BookSpread[] {
  const sections = getMenuSections();
  const spreads: BookSpread[] = [];
  const { itemsPerColumn, isMobile } = layout;

  for (const section of sections) {
    const flat = flattenSection(section);
    if (flat.length === 0) continue;

    const sectionSpreads: BookSpread[] = [];

    if (isMobile) {
      sectionSpreads.push({
        id: `${section.name}-m0`,
        section,
        spreadInSection: 0,
        totalSpreadsInSection: 0,
        left: { kind: "intro" },
        right: { kind: "items", entries: [] },
        mobile: { kind: "intro" },
      });

      let cursor = 0;
      while (cursor < flat.length) {
        const page = takeMobilePage(flat, cursor, itemsPerColumn);
        sectionSpreads.push({
          id: `${section.name}-m${sectionSpreads.length}`,
          section,
          spreadInSection: sectionSpreads.length,
          totalSpreadsInSection: 0,
          left: { kind: "items", entries: page },
          right: { kind: "items", entries: [] },
          mobile: { kind: "items", entries: page },
        });
        cursor += page.length;
      }
    } else {
      // Intro spread: left = chapter title, right = first subcategory (e.g. all American Breakfast)
      const introRight = takeIntroRightItems(flat, itemsPerColumn);
      let cursor = introRight.length;

      sectionSpreads.push({
        id: `${section.name}-0`,
        section,
        spreadInSection: 0,
        totalSpreadsInSection: 0,
        left: { kind: "intro" },
        right: { kind: "items", entries: introRight },
        mobile: { kind: "intro" },
      });

      // Remaining spreads: up to 2 columns worth of items, balanced left/right
      const perSpread = itemsPerColumn * 2;
      while (cursor < flat.length) {
        const chunk = flat.slice(cursor, cursor + perSpread);
        cursor += chunk.length;
        const [leftEntries, rightEntries] = splitAcrossColumns(chunk);

        sectionSpreads.push({
          id: `${section.name}-${sectionSpreads.length}`,
          section,
          spreadInSection: sectionSpreads.length,
          totalSpreadsInSection: 0,
          left: { kind: "items", entries: leftEntries },
          right: { kind: "items", entries: rightEntries },
          mobile: { kind: "items", entries: chunk },
        });
      }
    }

    const total = sectionSpreads.length;
    for (const spread of sectionSpreads) {
      spread.totalSpreadsInSection = total;
      spreads.push(spread);
    }
  }

  return spreads;
}

export function getSpreadIndexForSection(spreads: BookSpread[], sectionName: string): number {
  return spreads.findIndex((s) => s.section.name === sectionName);
}
