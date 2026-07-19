import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Users, PartyPopper, Heart, Briefcase, Baby, Sparkles,
  ArrowRight, CalendarHeart, ChevronRight,
} from "lucide-react";
import { StudioAmbience } from "@/components/decor/StudioAmbience";

const events = [
  {
    id: "birthday",
    title: "Birthday Parties",
    icon: <PartyPopper className="w-5 h-5" />,
    gradient: "from-paint-pink to-paint-orange",
    bg: "bg-tint-pink",
    desc: "Packages include pottery pieces, food, decorations & a dedicated host.",
  },
  {
    id: "date",
    title: "Couple's Date Night",
    icon: <Heart className="w-5 h-5" />,
    gradient: "from-paint-pink to-paint-purple",
    bg: "bg-tint-pink",
    desc: "Paint together, eat together, and leave with a lasting handmade memory.",
  },
  {
    id: "corporate",
    title: "Corporate Outings",
    icon: <Briefcase className="w-5 h-5" />,
    gradient: "from-paint-blue to-paint-mint",
    bg: "bg-tint-blue",
    desc: "Team building through art — guided wheel sessions and café dining.",
  },
  {
    id: "family",
    title: "Family Workshops",
    icon: <Users className="w-5 h-5" />,
    gradient: "from-primary to-paint-yellow",
    bg: "bg-tint-yellow",
    desc: "Fun for all ages. Quality time away from screens, with clay in hand.",
  },
  {
    id: "kids",
    title: "Kids' Parties",
    icon: <Baby className="w-5 h-5" />,
    gradient: "from-paint-mint to-paint-blue",
    bg: "bg-tint-mint",
    desc: "Messy, joyful, and unforgettable. Clay, colour, and cake for little artists.",
  },
  {
    id: "custom",
    title: "Custom Events",
    icon: <Sparkles className="w-5 h-5" />,
    gradient: "from-paint-purple to-paint-pink",
    bg: "bg-tint-purple",
    desc: "Something unique in mind? Tell us and we'll build it around you.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Events() {
  return (
    <section id="events" className="py-20 md:py-28 bg-section-mint border-y border-border/50 relative overflow-hidden">
      <StudioAmbience tone="mint" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Staggered image grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-3 lg:gap-4"
          >
            <div className="space-y-3 lg:space-y-4 pt-8">
              <img
                src="/images/gallery-2.png"
                alt="Friends painting together"
                className="rounded-2xl object-cover w-full aspect-[4/5] shadow-lg ring-1 ring-black/5"
              />
              <img
                src="/images/gallery-4.png"
                alt="Couple at Claytopia"
                className="rounded-2xl object-cover w-full aspect-square shadow-lg ring-1 ring-black/5"
              />
            </div>
            <div className="space-y-3 lg:space-y-4">
              <img
                src="/images/hero.png"
                alt="Claytopia studio"
                className="rounded-2xl object-cover w-full aspect-square shadow-lg ring-1 ring-black/5"
              />
              <img
                src="/images/painting.png"
                alt="Pottery detail"
                className="rounded-2xl object-cover w-full aspect-[4/5] shadow-lg ring-1 ring-black/5"
              />
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">
              Private & Group Events
            </p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Events & Groups
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
              Bistro Claytopia is the perfect venue for your next gathering — tailored packages for every occasion and group size.
            </p>

            {/* 3×2 even event cards */}
            <motion.div
              className="grid grid-cols-3 gap-3 mb-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              {events.map((event) => (
                <motion.div key={event.id} variants={cardVariants}>
                  <Link
                    href={`/plan-event?type=${event.id}`}
                    data-testid={`link-event-type-${event.id}`}
                    className={`group flex flex-col h-full p-3.5 rounded-2xl border border-white/70 card-art cursor-pointer ${event.bg}`}
                  >
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${event.gradient} flex items-center justify-center text-white mb-3 shadow-sm group-hover:scale-105 transition-transform duration-200`}>
                      {event.icon}
                    </div>
                    {/* Title */}
                    <h3 className="font-bold text-xs md:text-sm text-foreground group-hover:text-primary transition-colors leading-snug mb-1.5">
                      {event.title}
                    </h3>
                    {/* Description */}
                    <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                      {event.desc}
                    </p>
                    {/* Arrow hint */}
                    <div className="mt-2.5 flex items-center gap-0.5 text-[10px] font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Plan this <ChevronRight size={10} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-gradient-to-br from-primary/8 to-secondary/8 border border-primary/15 rounded-2xl">
              <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-md">
                <CalendarHeart size={20} className="text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground text-sm mb-0.5">
                  Ready to plan your event?
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Choose activities, add-ons, date & time — get a custom quote in minutes.
                </p>
              </div>
              <Link
                href="/plan-event"
                data-testid="link-events-plan-cta"
                className="shrink-0 flex items-center gap-1.5 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all hover:scale-105 shadow-md whitespace-nowrap"
              >
                Plan Your Event <ArrowRight size={13} />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
