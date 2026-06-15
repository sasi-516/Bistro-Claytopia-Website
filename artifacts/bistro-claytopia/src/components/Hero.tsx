import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

function scrollTo(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", href);
  }
}

export function Hero() {
  return (
    <section
      id="hero-section"
      className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero.png')" }}
        role="img"
        aria-label="People painting pottery together in a warm, sunlit studio"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white mt-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="text-xs md:text-sm tracking-[0.25em] uppercase mb-5 text-white/80 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Koramangala, Bengaluru
          </motion.p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 drop-shadow-xl leading-[1.05] tracking-tight">
            Where Food{" "}
            <span className="italic text-primary/95 drop-shadow-lg">Meets Art</span>
          </h1>

          <p className="max-w-xl mx-auto text-base md:text-lg text-white/85 mb-10 drop-shadow-md leading-relaxed">
            Bangalore's premier paint-your-own pottery café. Eat great food, paint
            beautiful ceramics, and leave with a handmade souvenir.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#book"
              onClick={(e) => { e.preventDefault(); scrollTo("#book"); }}
              data-testid="button-hero-book"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-base md:text-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-2xl"
            >
              Book a Table
            </a>
            <a
              href="#experiences"
              onClick={(e) => { e.preventDefault(); scrollTo("#experiences"); }}
              data-testid="button-hero-explore"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/25 rounded-full font-semibold text-base md:text-lg hover:bg-white/20 transition-all"
            >
              Explore Experiences
            </a>
          </div>

          {/* Trust badges */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 mt-12 text-white/70 text-xs md:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              Open Daily 11 AM – 11 PM
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              All Ages Welcome
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              No Experience Needed
            </span>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#experiences"
        onClick={(e) => { e.preventDefault(); scrollTo("#experiences"); }}
        aria-label="Scroll to explore experiences"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <ArrowDown size={18} />
      </motion.a>
    </section>
  );
}
