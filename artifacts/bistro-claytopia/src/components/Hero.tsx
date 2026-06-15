import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax effect via framer-motion could go here, but sticking to standard absolute positioning for simplicity */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-sm md:text-base tracking-[0.2em] uppercase mb-4 text-white/90 font-medium">
            Koramangala, Bengaluru
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 drop-shadow-lg leading-tight">
            Where Food <br className="md:hidden" />
            <span className="italic text-primary/90">Meets Art</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 mb-10 drop-shadow-md">
            Bangalore's premier paint-your-own pottery café. Eat great food, paint beautiful ceramics, and create memories.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#book"
              onClick={(e) => handleScroll(e, "#book")}
              className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium text-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-xl"
            >
              Book a Table
            </a>
            <a
              href="#experiences"
              onClick={(e) => handleScroll(e, "#experiences")}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-full font-medium text-lg hover:bg-white/20 transition-all"
            >
              Explore Experiences
            </a>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#experiences"
        onClick={(e) => handleScroll(e, "#experiences")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll Down</span>
        <ArrowDown size={20} />
      </motion.a>
    </section>
  );
}
