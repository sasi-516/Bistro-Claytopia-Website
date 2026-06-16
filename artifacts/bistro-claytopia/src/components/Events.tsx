import { motion } from "framer-motion";
import { Link } from "wouter";
import { Users, PartyPopper, Heart, Briefcase, Baby, Sparkles, ArrowRight, CalendarHeart } from "lucide-react";

const events = [
  {
    id: "birthday",
    title: "Birthday Parties",
    icon: <PartyPopper className="w-6 h-6" />,
    color: "bg-pink-100 text-pink-700",
    desc: "Celebrate creatively. Packages include pottery pieces, food, decorations, and a dedicated host.",
  },
  {
    id: "date",
    title: "Couple Dates",
    icon: <Heart className="w-6 h-6" />,
    color: "bg-rose-100 text-rose-700",
    desc: "A unique romantic experience. Paint together, eat together, and create a lasting memory.",
  },
  {
    id: "corporate",
    title: "Corporate Outings",
    icon: <Briefcase className="w-6 h-6" />,
    color: "bg-blue-100 text-blue-700",
    desc: "Team building through art. Boost morale and creativity with guided wheel and painting sessions.",
  },
  {
    id: "family",
    title: "Family Workshops",
    icon: <Users className="w-6 h-6" />,
    color: "bg-amber-100 text-amber-700",
    desc: "Fun for all ages. Spend quality time together away from screens.",
  },
  {
    id: "kids",
    title: "Kids' Parties",
    icon: <Baby className="w-6 h-6" />,
    color: "bg-violet-100 text-violet-700",
    desc: "Messy, joyful, and unforgettable. Clay, colour, and cake for little artists.",
  },
  {
    id: "custom",
    title: "Custom Events",
    icon: <Sparkles className="w-6 h-6" />,
    color: "bg-teal-100 text-teal-700",
    desc: "Got something unique in mind? Tell us and we'll build it around you.",
  },
];

export function Events() {
  return (
    <section id="events" className="py-20 md:py-28 bg-card border-y border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Image grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4 pt-8">
              <img src="/images/gallery-2.png" alt="Friends painting" className="rounded-2xl object-cover w-full aspect-[4/5] shadow-lg" />
              <img src="/images/gallery-4.png" alt="Couple painting" className="rounded-2xl object-cover w-full aspect-square shadow-lg" />
            </div>
            <div className="space-y-4">
              <img src="/images/hero.png" alt="Studio" className="rounded-2xl object-cover w-full aspect-square shadow-lg" />
              <img src="/images/painting.png" alt="Painting details" className="rounded-2xl object-cover w-full aspect-[4/5] shadow-lg" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Private & Group Events</p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-5">
              Events & Groups
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Bistro Claytopia is the perfect venue for your next gathering. Tailored packages for every occasion and group size.
            </p>

            {/* Event type cards — 3 col grid, each links to plan-event */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
              {events.map((event) => (
                <Link
                  key={event.id}
                  href={`/plan-event?type=${event.id}`}
                  data-testid={`link-event-type-${event.id}`}
                  className="group flex flex-col items-start gap-2.5 p-4 bg-background rounded-2xl border border-border/60 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${event.color} group-hover:scale-110 transition-transform`}>
                    {event.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors leading-snug">
                      {event.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">{event.desc}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-primary flex items-center gap-0.5 mt-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    Plan this <ArrowRight size={10} />
                  </span>
                </Link>
              ))}
            </div>

            {/* Plan an Event CTA */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-md">
                <CalendarHeart size={22} className="text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground mb-0.5">Ready to plan your event?</h3>
                <p className="text-sm text-muted-foreground">Build your experience, add activities & add-ons, and get a custom quote — all in a few steps.</p>
              </div>
              <Link
                href="/plan-event"
                data-testid="link-events-plan-cta"
                className="shrink-0 flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all hover:scale-105 shadow-md whitespace-nowrap"
              >
                Plan Your Event <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
