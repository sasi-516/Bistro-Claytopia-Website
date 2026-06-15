import { motion } from "framer-motion";
import { Link } from "wouter";
import { Palette, Disc, Coffee, Scissors, ArrowRight } from "lucide-react";
import { experiences } from "@/data/experiences";

const iconMap: Record<string, React.ReactNode> = {
  paint: <Palette className="w-6 h-6" />,
  wheel: <Disc className="w-6 h-6" />,
  dine: <Coffee className="w-6 h-6" />,
  knitting: <Scissors className="w-6 h-6" />,
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
            Four ways to spend time at Claytopia. Explore any experience for the full story, or book directly.
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
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className="group bg-background rounded-2xl border border-border/60 overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              data-testid={`card-experience-${exp.id}`}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {/* Icon badge */}
                <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center text-primary shadow-md">
                  {iconMap[exp.id]}
                </div>
                {/* Price tag */}
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs font-medium text-white/90 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    {exp.price}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {exp.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
                  {exp.shortDesc}
                </p>

                {/* Meta */}
                <div className="text-xs text-muted-foreground mb-5 space-y-1">
                  <p className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-primary inline-block" />
                    {exp.duration}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-primary inline-block" />
                    {exp.highlight}
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex gap-2 mt-auto">
                  <Link
                    href={`/experiences/${exp.id}`}
                    data-testid={`link-explore-${exp.id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/20 transition-colors"
                  >
                    Explore <ArrowRight size={14} />
                  </Link>
                  <button
                    onClick={() => onBookExperience(exp.bookingValue)}
                    data-testid={`button-quick-book-${exp.id}`}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Quick Book
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-sm text-muted-foreground mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Not sure which to pick?{" "}
          <a
            href="#book"
            onClick={(e) => { e.preventDefault(); document.getElementById("book")?.scrollIntoView({ behavior: "smooth" }); }}
            className="text-primary font-medium hover:underline"
            data-testid="link-experiences-book-nudge"
          >
            Book a table and we'll help you choose.
          </a>
        </motion.p>
      </div>
    </section>
  );
}
