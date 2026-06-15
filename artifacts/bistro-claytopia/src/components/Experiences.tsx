import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Disc, Coffee, Scissors, CheckCircle2, ChevronRight, CalendarCheck } from "lucide-react";

interface SubExperience {
  title: string;
  desc: string;
}

interface HowStep {
  number: string;
  title: string;
  desc: string;
}

interface Experience {
  id: string;
  icon: React.ReactNode;
  image: string;
  title: string;
  tagline: string;
  description: string;
  subExperiences: SubExperience[];
  howItWorks: HowStep[];
  bookingValue: string;
  color: string;
}

const experiences: Experience[] = [
  {
    id: "paint",
    icon: <Palette className="w-6 h-6" />,
    image: "/images/painting.png",
    title: "Paint Your Pottery",
    tagline: "Signature Pottery Experiences",
    description:
      "These are some of the ways people love to spend time with us. Whether you're planning a date, a family outing, or just want to try something new, we've got a spot for you.",
    subExperiences: [
      {
        title: "Pottery Wheel Sessions",
        desc: "Get hands-on with clay and create something uniquely yours.",
      },
      {
        title: "Café & Clay Dates",
        desc: "Enjoy coffee and pastries while you paint or sculpt together.",
      },
      {
        title: "Birthday Celebrations",
        desc: "Bring your group for a creative party with food and pottery fun.",
      },
      {
        title: "Family Workshops",
        desc: "Learn pottery basics as a family and take home your creations.",
      },
    ],
    howItWorks: [
      { number: "01", title: "Choose Your Piece", desc: "Pick from 100+ blank ceramic pieces — mugs, bowls, plates, planters, and more." },
      { number: "02", title: "Paint & Glaze", desc: "Use our vibrant, non-toxic glazes and brushes to bring your design to life." },
      { number: "03", title: "We Fire It", desc: "Leave it with us — we'll clear-glaze and kiln-fire your piece to perfection." },
      { number: "04", title: "Collect Your Art", desc: "Return in 2–3 weeks to pick up your glossy, food-safe, one-of-a-kind ceramic." },
    ],
    bookingValue: "paint",
    color: "text-primary",
  },
  {
    id: "wheel",
    icon: <Disc className="w-6 h-6" />,
    image: "/images/wheel.png",
    title: "Pottery Wheel",
    tagline: "Hands-On Clay Shaping",
    description:
      "There's nothing quite like feeling clay spin between your fingers. Our wheel sessions are guided, beginner-friendly, and genuinely therapeutic. Perfect for dates, teams, and curious minds.",
    subExperiences: [
      {
        title: "Solo Discovery Sessions",
        desc: "Learn at your own pace with one-on-one guidance from our instructors.",
      },
      {
        title: "Date Night on the Wheel",
        desc: "A romantic, hands-on experience you'll laugh and create through together.",
      },
      {
        title: "Corporate Team Building",
        desc: "Unique workshops that spark collaboration, creativity, and great conversations.",
      },
      {
        title: "Weekend Masterclasses",
        desc: "Go deeper with technique — centering, pulling walls, and finishing forms.",
      },
    ],
    howItWorks: [
      { number: "01", title: "Gear Up", desc: "We provide aprons — wear clothes you're comfortable getting clay on." },
      { number: "02", title: "Learn the Basics", desc: "Your instructor covers centering, opening, and pulling walls in the first 15 minutes." },
      { number: "03", title: "Throw Your Piece", desc: "Create your form on the wheel — bowl, cup, or free-form sculpture." },
      { number: "04", title: "We Fire & Deliver", desc: "We dry, bisque-fire, and glaze your piece. Ready to collect in 2–3 weeks." },
    ],
    bookingValue: "wheel",
    color: "text-secondary",
  },
  {
    id: "dine",
    icon: <Coffee className="w-6 h-6" />,
    image: "/images/food.png",
    title: "Café & Dining",
    tagline: "Creative Fuel, Beautifully Served",
    description:
      "Our café is a destination in itself — artisanal coffee, indulgent desserts, fresh continental plates, and a menu that keeps pace with your creative energy. Dine solo or pair it with a pottery session.",
    subExperiences: [
      {
        title: "Café & Clay Dates",
        desc: "The classic Claytopia experience — great food with a pottery session side by side.",
      },
      {
        title: "Continental Small Plates",
        desc: "Burgers, pasta, bruschetta, and seasonal specials crafted fresh daily.",
      },
      {
        title: "Dessert & Coffee Corner",
        desc: "Specialty espresso drinks, waffles, cakes, and pastries to sweeten any moment.",
      },
      {
        title: "Mocktail & Beverage Bar",
        desc: "Creative house mocktails, iced teas, lemonades, and refreshing coolers.",
      },
    ],
    howItWorks: [
      { number: "01", title: "Walk In or Book Ahead", desc: "Reserve a table or walk in — we always keep a few tables open for drop-ins." },
      { number: "02", title: "Browse the Menu", desc: "Our team will guide you through today's specials and seasonal highlights." },
      { number: "03", title: "Dine & Create", desc: "Eat at your own pace — pottery stations are just steps away if you want to paint too." },
      { number: "04", title: "Linger As Long as You Like", desc: "This is a café — there's no rush. Stay, create, relax." },
    ],
    bookingValue: "dine",
    color: "text-accent-foreground",
  },
  {
    id: "knitting",
    icon: <Scissors className="w-6 h-6" />,
    image: "/images/hero.png",
    title: "Knitting Studio",
    tagline: "Stitch, Sip & Slow Down",
    description:
      "Our knitting studio is a calm corner of creativity. Choose your yarn, pick up the needles, and let our instructors guide you through the meditative art of knitting — all while sipping something warm from the café.",
    subExperiences: [
      {
        title: "Beginner Drop-In Classes",
        desc: "Start from scratch — casting on, knit stitch, and finishing your first piece.",
      },
      {
        title: "Date Night Knitting",
        desc: "A slow, cozy, and surprisingly fun couples' activity with coffee and snacks.",
      },
      {
        title: "Kids' Yarn Play",
        desc: "Fun, tactile fibre-craft sessions specially designed for little hands.",
      },
      {
        title: "Custom Project Sessions",
        desc: "Bring your own pattern or pick one of ours — scarves, pouches, plant hangers, and more.",
      },
    ],
    howItWorks: [
      { number: "01", title: "Choose Your Yarn", desc: "Pick from our curated selection of soft yarns in beautiful seasonal colours." },
      { number: "02", title: "Learn the Stitches", desc: "Our instructors teach you at your pace — casting on, knit, purl, and binding off." },
      { number: "03", title: "Work on Your Project", desc: "Spend 1–2 hours in our studio creating your piece — scarves, beanies, totes, and more." },
      { number: "04", title: "Take It Home", desc: "Your finished piece leaves with you the same day. No waiting required!" },
    ],
    bookingValue: "knitting",
    color: "text-primary",
  },
];

interface ExperiencesProps {
  onBookExperience: (value: string) => void;
}

export function Experiences({ onBookExperience }: ExperiencesProps) {
  const [activeId, setActiveId] = useState<string>("paint");

  const active = experiences.find((e) => e.id === activeId)!;

  const handleBook = () => {
    onBookExperience(active.bookingValue);
    setTimeout(() => {
      document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", "#book");
    }, 80);
  };

  return (
    <section id="experiences" className="py-20 md:py-28 bg-card" aria-label="Experiences">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
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
              Choose your experience, dive into the details, and book a table — all in one place.
            </p>
          </motion.div>
        </div>

        {/* Tab selectors */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-10 scrollbar-hide snap-x snap-mandatory justify-start md:justify-center">
          {experiences.map((exp) => (
            <button
              key={exp.id}
              onClick={() => setActiveId(exp.id)}
              data-testid={`tab-experience-${exp.id}`}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-full font-medium text-sm whitespace-nowrap snap-start transition-all duration-200 border ${
                activeId === exp.id
                  ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                  : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {exp.icon}
              {exp.title}
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-background rounded-3xl border border-border/60 overflow-hidden shadow-sm"
          >
            <div className="grid lg:grid-cols-5 gap-0">
              {/* Image */}
              <div className="lg:col-span-2 relative h-64 md:h-80 lg:h-auto min-h-[320px] overflow-hidden">
                <img
                  src={active.image}
                  alt={active.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 lg:right-auto lg:bottom-8 lg:left-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold mb-2 backdrop-blur-sm">
                    {active.icon}
                    {active.title}
                  </span>
                  <p className="text-white/90 font-serif italic text-lg drop-shadow leading-tight">
                    {active.tagline}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-3 p-7 md:p-10 flex flex-col gap-8">
                {/* Description */}
                <div>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {active.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Sub-experiences */}
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.18em] text-primary font-semibold mb-4">
                      Ways to Experience This
                    </h3>
                    <ul className="space-y-3.5">
                      {active.subExperiences.map((sub, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-sm text-foreground leading-snug">
                              {sub.title}
                            </p>
                            <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">
                              {sub.desc}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* How it works */}
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.18em] text-primary font-semibold mb-4">
                      How It Works
                    </h3>
                    <ol className="space-y-3.5">
                      {active.howItWorks.map((step, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 font-serif">
                            {i + 1}
                          </span>
                          <div>
                            <p className="font-semibold text-sm text-foreground leading-snug">
                              {step.title}
                            </p>
                            <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">
                              {step.desc}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Book CTA */}
                <div className="pt-2 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button
                    onClick={handleBook}
                    data-testid={`button-book-experience-${activeId}`}
                    className="flex items-center gap-2.5 px-7 py-3.5 bg-primary text-primary-foreground rounded-full font-semibold text-sm hover:bg-primary/90 transition-all hover:scale-105 shadow-md"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    Book {active.title}
                  </button>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-primary" />
                    Weekends fill up fast — book ahead to secure your slot
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
