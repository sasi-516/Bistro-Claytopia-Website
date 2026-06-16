import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Experiences } from "@/components/Experiences";
import { Menu } from "@/components/Menu";
import { Events } from "@/components/Events";
import { WhatsOn } from "@/components/WhatsOn";
import { Gallery } from "@/components/Gallery";
import { Reviews } from "@/components/Reviews";
import { Book } from "@/components/Book";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

export default function Home() {
  useSEO();

  const [bookingExperience, setBookingExperience] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll to a section when navigating here from another page via navbar
  useEffect(() => {
    const target = sessionStorage.getItem("scrollToSection");
    if (target) {
      sessionStorage.removeItem("scrollToSection");
      // Delay so sections are mounted and positioned
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", `#${target}`);
        }
      }, 250);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState(null, "", window.location.pathname);
  };

  const handleBookExperience = (value: string) => {
    setBookingExperience(value);
    setTimeout(() => {
      document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", "#book");
    }, 80);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Experiences onBookExperience={handleBookExperience} />
        <Menu />
        <Events />
        <WhatsOn />
        <Gallery />
        <Reviews />
        <Book
          preselectedExperience={bookingExperience}
          onExperienceConsumed={() => setBookingExperience("")}
        />
        <FAQ />
      </main>
      <Footer />

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            key="back-to-top"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            data-testid="button-back-to-top"
            className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-xl flex items-center justify-center hover:bg-primary/90 hover:scale-110 transition-all"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
