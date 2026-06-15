import { useEffect } from "react";

interface SectionMeta {
  id: string;
  title: string;
  description: string;
}

const SECTIONS: SectionMeta[] = [
  {
    id: "hero",
    title: "Bistro Claytopia | Paint-Your-Own Pottery Café in Koramangala, Bangalore",
    description:
      "Bangalore's premier paint-your-own pottery café in Koramangala. Eat great food, paint ceramics, and leave with a handmade souvenir. Open 11 AM–11 PM.",
  },
  {
    id: "experiences",
    title: "Our Experiences | Bistro Claytopia – Pottery & Dining in Bangalore",
    description:
      "Explore pottery painting, pottery wheel sessions, and café dining at Bistro Claytopia in Koramangala, Bangalore. Creative experiences for all ages.",
  },
  {
    id: "process",
    title: "How Pottery Works | Bistro Claytopia Bangalore",
    description:
      "Learn how our pottery process works at Bistro Claytopia — choose a piece, paint it, we glaze and fire it, and you collect your finished ceramic in 2–3 weeks.",
  },
  {
    id: "menu",
    title: "Café Menu | Bistro Claytopia – Food & Drinks in Koramangala",
    description:
      "Enjoy artisanal coffee, desserts, burgers, pasta, mocktails, and continental cuisine at Bistro Claytopia's café in Koramangala, Bangalore.",
  },
  {
    id: "events",
    title: "Events & Group Bookings | Bistro Claytopia Bangalore",
    description:
      "Birthday parties, couple dates, family workshops, and corporate team-building events at Bistro Claytopia in Koramangala, Bangalore.",
  },
  {
    id: "gallery",
    title: "Gallery | Bistro Claytopia – Customer Creations & Studio",
    description:
      "See beautiful customer pottery creations and studio highlights from Bistro Claytopia, Bangalore's favourite paint-your-own pottery café.",
  },
  {
    id: "book",
    title: "Book a Table | Bistro Claytopia – Reserve Your Pottery Experience",
    description:
      "Book a table at Bistro Claytopia in Koramangala, Bangalore. Reserve your pottery painting or wheel session — weekends fill up fast!",
  },
  {
    id: "faq",
    title: "FAQs | Bistro Claytopia – Pottery Café Questions Answered",
    description:
      "Frequently asked questions about pottery sessions, pricing, pickup timelines, age limits, and group bookings at Bistro Claytopia, Bangalore.",
  },
];

function setMetaContent(name: string, content: string, attr = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

export function useSEO() {
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id, title, description }) => {
      const sectionId = id === "hero" ? "hero-section" : id;
      const el = document.getElementById(sectionId);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              document.title = title;
              setMetaContent("description", description);
              setMetaContent("og:description", description, "property");
              setMetaContent("og:title", title, "property");
              setMetaContent("twitter:title", title);
              setMetaContent("twitter:description", description);

              const hash = id === "hero" ? "" : `#${id}`;
              const newUrl = `${window.location.pathname}${hash}`;
              window.history.replaceState(null, "", newUrl);
            }
          });
        },
        { threshold: 0.4 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, []);
}
