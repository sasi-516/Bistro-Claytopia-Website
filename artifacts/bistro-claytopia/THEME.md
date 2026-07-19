# Bistro Claytopia — Canvas & Clay Theme Guide

**Theme name:** Canvas & Clay  
A premium artistic café — colorful paint, handcrafted pottery, modern design, and joyful energy.

> Not earthy. Not rustic. Not logo-locked.  
> Think Pinterest × Canva × a bright pottery studio.

---

## Brand personality

- Creative, happy, colorful, artistic, modern
- Instagram-worthy and Gen Z friendly
- Multi-color identity — like an artist's paint palette
- White foundation with each section having its own subtle color

---

## Core palette

| Name | Hex | Role |
|------|-----|------|
| **Background** | `#FFFDFC` | Page base — almost white, very bright |
| **Primary (Sunflower)** | `#FFB703` | Book table, main CTAs, stars |
| **Paint Blue** | `#3A86FF` | Pottery, corporate, trust |
| **Paint Orange** | `#FB5607` | Food, menu, energy |
| **Paint Purple** | `#8338EC` | Art, workshops, imagination |
| **Paint Mint** | `#06D6A0` | Fresh, kids, nature |
| **Paint Pink** | `#EF476F` | Creative, dates, gallery |
| **Paint Yellow** | `#FFD166` | Soft accents |
| **Navy (Text)** | `#2B2D42` | Body text — not pure black |

---

## Section backgrounds

| Section | Hex | Tailwind class |
|---------|-----|----------------|
| Hero | White overlay on video | — |
| Experiences | `#EDF5FF` | `bg-section-blue` |
| Menu | `#FFF8E1` | `bg-section-yellow` |
| Events | `#EEFFF8` | `bg-section-mint` |
| What's On | `#FFFDFC` | `bg-background` |
| Gallery | `#FFF0F5` | `bg-section-pink` |
| Reviews | White | `bg-background` |
| Book / Pottery | `#F5F0FF` | `bg-section-purple` |
| Footer | `#2B2D42` | `bg-foreground` (navy) |

---

## Tinted cards

| Card type | Tailwind class |
|-----------|----------------|
| Experience — paint | `bg-tint-blue` |
| Experience — wheel | `bg-tint-purple` |
| Experience — dine | `bg-tint-yellow` |
| Experience — knitting | `bg-tint-mint` |
| Event cards | Matching `bg-tint-*` per event type |

---

## Buttons

| Action | Style |
|--------|-------|
| Book a Table | Sunflower `bg-primary` |
| Pottery / paint | Blue `bg-paint-blue` |
| Workshop / wheel | Purple `bg-paint-purple` |
| Menu / food | Orange `bg-paint-orange` |
| Secondary | White with outline |

---

## Typography

| Role | Font |
|------|------|
| Headings | **Playfair Display** (serif) |
| Body & UI | **Plus Jakarta Sans** (sans-serif) |

Accent headline style: gradient text via `.text-paint-gradient`

---

## Decorative elements

- Watercolor blob backgrounds (`StudioAmbience`)
- Animated brush-stroke underlines (`BrushStrokeTitle`)
- Colorful wave dividers (`PotteryDivider`)
- Card hover: `card-art` — lift + slight rotate

---

## Hero treatment

- Full-screen video background
- Overlay: `rgba(255,255,255,0.55)` — bright, not dark
- Navy text on light overlay
- "Meets Art" uses rainbow gradient text

---

## Tailwind paint classes

```
text-paint-blue    bg-paint-blue
text-paint-orange  bg-paint-orange
text-paint-purple  bg-paint-purple
text-paint-mint    bg-paint-mint
text-paint-pink    bg-paint-pink
text-paint-yellow  bg-paint-yellow
text-navy          bg-navy
bg-section-blue / yellow / pink / purple / mint
bg-tint-blue / purple / yellow / pink / mint
```

---

## Source file

All tokens: `artifacts/bistro-claytopia/src/index.css`

---

*Bistro Claytopia — Where Food Meets Art*
