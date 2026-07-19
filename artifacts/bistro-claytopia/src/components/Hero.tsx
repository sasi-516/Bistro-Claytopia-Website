import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowDown, CalendarHeart } from "lucide-react";
import { cn } from "@/lib/utils";

function scrollTo(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", href);
  }
}

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      video.pause();
      setVideoReady(true);
      return;
    }

    const onCanPlay = () => setVideoReady(true);

    const startPlayback = async () => {
      try {
        video.muted = true;
        await video.play();
      } catch {
        setVideoReady(true);
      }
    };

    video.addEventListener("canplay", onCanPlay);
    if (video.readyState >= 3) setVideoReady(true);
    startPlayback();

    const onVisibility = () => {
      if (document.visibilityState === "visible" && !reducedMotion.matches) {
        void video.play().catch(() => undefined);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <section
      id="hero-section"
      className="relative h-[100dvh] min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-black"
      aria-label="Hero"
    >
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <video
          ref={videoRef}
          className={cn(
            "hero-video transition-opacity duration-700 ease-out",
            videoReady ? "opacity-100" : "opacity-0"
          )}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white pt-16 pb-24 sm:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="text-xs md:text-sm tracking-[0.25em] uppercase mb-5 text-white/85 font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Koramangala, Bengaluru
          </motion.p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-[1.05] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)]">
            Where Food{" "}
            <span className="italic text-primary drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)]">Meets Art</span>
          </h1>

          <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-white/90 mb-10 leading-relaxed px-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            Bangalore's most colourful paint-your-own pottery café. Eat great food, paint
            beautiful ceramics, and leave with a handmade souvenir.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <a
              href="#book"
              onClick={(e) => { e.preventDefault(); scrollTo("#book"); }}
              data-testid="button-hero-book"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-base md:text-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-xl shadow-black/30"
            >
              Book a Table
            </a>
            <Link
              href="/plan-event"
              data-testid="button-hero-plan-event"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white/15 backdrop-blur-sm text-white border-2 border-white/50 rounded-full font-bold text-base md:text-lg hover:bg-white/25 transition-all shadow-lg shadow-black/20"
            >
              <CalendarHeart size={18} />
              Plan an Event
            </Link>
          </div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-10 sm:mt-12 text-white/80 text-xs md:text-sm px-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {[
              { color: "bg-primary", label: "Open Daily 11 AM – 11 PM" },
              { color: "bg-paint-blue", label: "All Ages Welcome" },
              { color: "bg-paint-mint", label: "No Experience Needed" },
            ].map((item) => (
              <span key={item.label} className="flex items-center gap-2">
                <span className={cn("w-2 h-2 rounded-full inline-block", item.color)} />
                {item.label}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#experiences"
        onClick={(e) => { e.preventDefault(); scrollTo("#experiences"); }}
        aria-label="Scroll to explore experiences"
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/75 flex flex-col items-center gap-2 hover:text-white transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">Scroll</span>
        <ArrowDown size={18} />
      </motion.a>
    </section>
  );
}
