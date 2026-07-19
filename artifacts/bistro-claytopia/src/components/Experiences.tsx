import { motion } from "framer-motion";
import { Link } from "wouter";
import { Palette, Disc, Coffee, Scissors, CalendarCheck } from "lucide-react";
import { experiences } from "@/data/experiences";
import { StudioAmbience } from "@/components/decor/StudioAmbience";
import { BrushStrokeTitle } from "@/components/decor/BrushStrokeTitle";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  paint: <Palette className="w-5 h-5" />,
  wheel: <Disc className="w-5 h-5" />,
  dine: <Coffee className="w-5 h-5" />,
  knitting: <Scissors className="w-5 h-5" />,
};

const expTheme: Record<string, {
  tint: string;
  btn: string;
  icon: string;
  iconBg: string;
  dot: string;
  hoverTitle: string;
  accent: "blue" | "purple" | "orange" | "mint";
}> = {
  paint: {
    tint: "bg-tint-blue",
    btn: "bg-paint-blue hover:bg-paint-blue/90 text-white",
    icon: "text-paint-blue",
    iconBg: "bg-paint-blue/15",
    dot: "bg-paint-blue",
    hoverTitle: "group-hover:text-paint-blue",
    accent: "blue",
  },
  wheel: {
    tint: "bg-tint-purple",
    btn: "bg-paint-purple hover:bg-paint-purple/90 text-white",
    icon: "text-paint-purple",
    iconBg: "bg-paint-purple/15",
    dot: "bg-paint-purple",
    hoverTitle: "group-hover:text-paint-purple",
    accent: "purple",
  },
  dine: {
    tint: "bg-tint-yellow",
    btn: "bg-paint-orange hover:bg-paint-orange/90 text-white",
    icon: "text-paint-orange",
    iconBg: "bg-paint-orange/15",
    dot: "bg-paint-orange",
    hoverTitle: "group-hover:text-paint-orange",
    accent: "orange",
  },
  knitting: {
    tint: "bg-tint-mint",
    btn: "bg-paint-mint hover:bg-paint-mint/90 text-navy",
    icon: "text-paint-mint",
    iconBg: "bg-paint-mint/20",
    dot: "bg-paint-mint",
    hoverTitle: "group-hover:text-paint-mint",
    accent: "mint",
  },
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section id="experiences" className="py-20 md:py-28 bg-section-blue relative overflow-hidden" aria-label="Our experiences">
      <StudioAmbience tone="blue" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <BrushStrokeTitle
          eyebrow="What We Offer"
          title="Our Core Experiences"
          description="Tap any experience to learn more — or quick-book from the card."
          accent="blue"
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {experiences.map((exp) => {
            const theme = expTheme[exp.id];
            return (
              <motion.div key={exp.id} variants={itemVariants} className="flex flex-col">
                <Link
                  href={`/experiences/${exp.id}`}
                  data-testid={`link-card-experience-${exp.id}`}
                  className={cn(
                    "group relative rounded-2xl border border-white/60 overflow-hidden flex-1 flex flex-col card-art cursor-pointer shadow-sm",
                    theme.tint
                  )}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />

                    <div className={cn("absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center shadow-md", theme.iconBg, theme.icon)}>
                      {iconMap[exp.id]}
                    </div>

                    <div className="absolute bottom-4 left-4">
                      <span className="text-xs font-bold text-white bg-navy/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        {exp.price}
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-4 py-2 bg-white text-foreground text-xs font-bold rounded-full shadow-lg translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                        View Experience →
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className={cn("text-lg font-serif font-bold text-foreground mb-2 leading-snug transition-colors", theme.hoverTitle)}>
                      {exp.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4 line-clamp-3">
                      {exp.shortDesc}
                    </p>
                    <div className="text-xs text-muted-foreground space-y-1 mb-4">
                      <p className="flex items-center gap-1.5">
                        <span className={cn("w-1.5 h-1.5 rounded-full inline-block shrink-0", theme.dot)} />
                        {exp.duration}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <span className={cn("w-1.5 h-1.5 rounded-full inline-block shrink-0", theme.dot)} />
                        {exp.highlight}
                      </p>
                    </div>
                  </div>
                </Link>

                <button
                  onClick={() => onBookExperience(exp.bookingValue)}
                  data-testid={`button-quick-book-${exp.id}`}
                  className={cn("mt-2 w-full py-3 rounded-xl text-sm font-bold active:scale-95 transition-all shadow-md flex items-center justify-center gap-2", theme.btn)}
                >
                  <CalendarCheck size={15} />
                  Quick Book
                </button>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          className="text-center text-sm text-muted-foreground mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Planning a group or event?{" "}
          <Link href="/plan-event" className="text-paint-purple font-bold hover:underline" data-testid="link-experiences-plan-event">
            Plan it with us →
          </Link>
        </motion.p>
      </div>
    </section>
  );
}
