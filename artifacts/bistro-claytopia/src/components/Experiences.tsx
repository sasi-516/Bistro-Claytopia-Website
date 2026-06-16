import { motion } from "framer-motion";
import { Link } from "wouter";
import { Palette, Disc, Coffee, Scissors, CalendarCheck } from "lucide-react";
import { experiences } from "@/data/experiences";

const iconMap: Record<string, React.ReactNode> = {
  paint: <Palette className="w-5 h-5" />,
  wheel: <Disc className="w-5 h-5" />,
  dine: <Coffee className="w-5 h-5" />,
  knitting: <Scissors className="w-5 h-5" />,
};

interface ExperiencesProps {
  onBookExperience: (value: string) => void;
}

export function Experiences({ onBookExperience }: ExperiencesProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="experiences" className="py-20 md:py-28 bg-card" aria-label="Our experiences">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">
            What We Offer
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-5">
            Our Core Experiences
          </h2>
          <p className="text-muted-foreground text-lg">
            Tap any experience to learn more — or quick-book from the card.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {experiences.map((exp) => (
            <motion.div key={exp.id} variants={itemVariants} className="flex flex-col">
              {/* Entire card is a link */}
              <Link
                href={`/experiences/${exp.id}`}
                data-testid={`link-card-experience-${exp.id}`}
                className="group relative bg-background rounded-2xl border border-border/60 overflow-hidden flex-1 flex flex-col hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    style={{ "--scale": "1.08" } as React.CSSProperties}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Icon badge */}
                  <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center text-primary shadow-md">
                    {iconMap[exp.id]}
                  </div>

                  {/* Price pill */}
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs font-semibold text-white bg-black/45 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      {exp.price}
                    </span>
                  </div>

                  {/* "View Experience" hover overlay */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 bg-white/95 text-primary text-xs font-bold rounded-full shadow-lg translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                      View Experience →
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4 line-clamp-3">
                    {exp.shortDesc}
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1 mb-4">
                    <p className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-primary inline-block shrink-0" />
                      {exp.duration}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-primary inline-block shrink-0" />
                      {exp.highlight}
                    </p>
                  </div>
                </div>
              </Link>

              {/* Quick Book button sits outside the link so it doesn't navigate */}
              <button
                onClick={() => onBookExperience(exp.bookingValue)}
                data-testid={`button-quick-book-${exp.id}`}
                className="mt-2 w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <CalendarCheck size={15} />
                Quick Book
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom nudge */}
        <motion.p
          className="text-center text-sm text-muted-foreground mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Planning a group or event?{" "}
          <Link
            href="/plan-event"
            className="text-primary font-semibold hover:underline"
            data-testid="link-experiences-plan-event"
          >
            Plan it with us →
          </Link>
        </motion.p>
      </div>
    </section>
  );
}
