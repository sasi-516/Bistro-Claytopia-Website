import { motion } from "framer-motion";
import { Calendar, Clock, Users, Music, Paintbrush, Star, Zap } from "lucide-react";
import { StudioAmbience } from "@/components/decor/StudioAmbience";

interface Event {
  id: string;
  type: "Live Music" | "Workshop" | "Fest" | "Special Event" | "Class";
  typeIcon: React.ReactNode;
  title: string;
  description: string;
  date: string;
  time: string;
  spots: number | "Open";
  featured?: boolean;
  tag?: string;
}

const upcomingEvents: Event[] = [
  {
    id: "1",
    type: "Live Music",
    typeIcon: <Music className="w-3.5 h-3.5" />,
    title: "Jazz & Clay Evenings",
    description:
      "Unwind on a Friday night with live jazz, warm lighting, artisanal cocktails, and your pottery station. Our most popular weekly ritual.",
    date: "Every Friday",
    time: "7:00 PM – 10:00 PM",
    spots: "Open",
    featured: true,
    tag: "Weekly",
  },
  {
    id: "2",
    type: "Workshop",
    typeIcon: <Paintbrush className="w-3.5 h-3.5" />,
    title: "Beginner Wheel Masterclass",
    description:
      "Never touched a pottery wheel? This 3-hour intensive with our lead instructor covers centering, pulling, and trimming. Limited to 8 participants.",
    date: "June 22, 2026",
    time: "11:00 AM – 2:00 PM",
    spots: 8,
    featured: false,
    tag: "Limited Seats",
  },
  {
    id: "3",
    type: "Fest",
    typeIcon: <Star className="w-3.5 h-3.5" />,
    title: "Monsoon Pottery Fest",
    description:
      "Our biggest event of the year! Live demos, open studios, live music, food stalls, and a community gallery of the season's best customer creations.",
    date: "July 5–6, 2026",
    time: "10:00 AM – 9:00 PM",
    spots: "Open",
    featured: true,
    tag: "Annual Event",
  },
  {
    id: "4",
    type: "Class",
    typeIcon: <Paintbrush className="w-3.5 h-3.5" />,
    title: "Kids' Summer Pottery Camp",
    description:
      "A 5-day creative camp for children aged 6–14. They'll paint pottery, throw clay, and leave with 3 handmade pieces plus a certificate of creativity.",
    date: "July 14–18, 2026",
    time: "10:00 AM – 1:00 PM",
    spots: 12,
    featured: false,
    tag: "Ages 6–14",
  },
  {
    id: "5",
    type: "Special Event",
    typeIcon: <Zap className="w-3.5 h-3.5" />,
    title: "Pottery & Wine Pairing Night",
    description:
      "An adults-only evening of wheel throwing paired with curated wine notes. End the night with dinner and your freshly thrown piece waiting to be fired.",
    date: "June 28, 2026",
    time: "6:30 PM – 9:30 PM",
    spots: 16,
    featured: false,
    tag: "21+",
  },
  {
    id: "6",
    type: "Workshop",
    typeIcon: <Paintbrush className="w-3.5 h-3.5" />,
    title: "Couples' Knit & Sip",
    description:
      "Learn the basics of knitting together with your partner over warm drinks and soft music. Walk away with your first scarf and a new shared hobby.",
    date: "July 12, 2026",
    time: "4:00 PM – 7:00 PM",
    spots: 10,
    featured: false,
    tag: "Couples",
  },
];

const typeColors: Record<string, string> = {
  "Live Music": "bg-tint-yellow text-paint-orange border-paint-yellow/40",
  Workshop: "bg-tint-blue text-paint-blue border-paint-blue/30",
  Fest: "bg-tint-pink text-paint-pink border-paint-pink/30",
  "Special Event": "bg-tint-purple text-paint-purple border-paint-purple/30",
  Class: "bg-tint-mint text-paint-mint border-paint-mint/30",
};

function scrollToBook() {
  document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
  window.history.pushState(null, "", "#book");
}

export function WhatsOn() {
  const featured = upcomingEvents.filter((e) => e.featured);
  const regular = upcomingEvents.filter((e) => !e.featured);

  return (
    <section
      id="whats-on"
      className="py-20 md:py-28 bg-background relative overflow-hidden"
      aria-label="What's On"
    >
      {/* Decorative blobs */}
      <StudioAmbience tone="light" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">
              Live Events & Workshops
            </p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
              What's On
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              From weekly live music nights to seasonal fests and pottery masterclasses — there's always
              something happening at Claytopia. Book early, spots go fast.
            </p>
          </motion.div>
          <motion.a
            href="#book"
            onClick={(e) => { e.preventDefault(); scrollToBook(); }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            data-testid="link-whats-on-book"
            className="shrink-0 px-6 py-3 rounded-full border-2 border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all"
          >
            Reserve a Spot
          </motion.a>
        </div>

        {/* Featured events */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {featured.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-60px" }}
              data-testid={`card-event-${event.id}`}
              className="relative bg-card rounded-2xl overflow-hidden border border-border/60 group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
              <div className="p-7">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${typeColors[event.type] ?? "bg-muted text-muted-foreground border-border"
                        }`}
                    >
                      {event.typeIcon}
                      {event.type}
                    </span>
                    {event.tag && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {event.tag}
                      </span>
                    )}
                  </div>
                  {typeof event.spots === "number" && event.spots <= 12 && (
                    <span className="text-xs text-destructive font-semibold bg-destructive/10 px-2.5 py-1 rounded-full shrink-0">
                      {event.spots} spots left
                    </span>
                  )}
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {event.description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-4 border-t border-border/60">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary" />
                    {event.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-primary" />
                    {event.spots === "Open" ? "Walk-ins welcome" : `${event.spots} spots available`}
                  </span>
                </div>
              </div>
              <div className="px-7 pb-6">
                <button
                  onClick={scrollToBook}
                  data-testid={`button-event-book-${event.id}`}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
                >
                  Reserve a Spot
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Regular events grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {regular.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
              viewport={{ once: true, margin: "-40px" }}
              data-testid={`card-event-${event.id}`}
              className="bg-card rounded-2xl border border-border/60 p-6 flex flex-col group hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-center gap-2 flex-wrap mb-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold border ${typeColors[event.type] ?? "bg-muted text-muted-foreground border-border"
                    }`}
                >
                  {event.typeIcon}
                  {event.type}
                </span>
                {event.tag && (
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {event.tag}
                  </span>
                )}
              </div>
              <h3 className="font-serif font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                {event.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
                {event.description}
              </p>
              <div className="space-y-1.5 text-xs text-muted-foreground mb-4">
                <p className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                  {event.date}
                </p>
                <p className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                  {event.time}
                </p>
                {typeof event.spots === "number" && (
                  <p className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className={event.spots <= 10 ? "text-destructive font-semibold" : ""}>
                      {event.spots} spots left
                    </span>
                  </p>
                )}
              </div>
              <button
                onClick={scrollToBook}
                data-testid={`button-event-mini-${event.id}`}
                className="mt-auto py-2.5 px-4 rounded-xl border border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Book a Spot
              </button>
            </motion.div>
          ))}
        </div>

        {/* Footer nudge */}
        <motion.p
          className="text-center text-sm text-muted-foreground mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          New events added regularly. Follow us on Instagram{" "}
          <a
            href="https://www.instagram.com/bistroclaytopia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-medium hover:underline"
          >
            @bistroclaytopia
          </a>{" "}
          to stay in the loop.
        </motion.p>
      </div>
    </section>
  );
}
