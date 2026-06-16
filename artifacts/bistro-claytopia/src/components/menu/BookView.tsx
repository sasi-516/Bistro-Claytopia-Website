import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Leaf } from "lucide-react";
import { menuCategories } from "@/data/menu";

export function BookView() {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDir: number) => {
    const next = page + newDir;
    if (next < 0 || next >= menuCategories.length) return;
    setPage([next, newDir]);
  };

  const category = menuCategories[page];

  const rightVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      rotateY: dir > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      rotateY: 0,
      opacity: 1,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      rotateY: dir < 0 ? 30 : -30,
      opacity: 0,
      transition: { duration: 0.4, ease: [0.55, 0, 0.78, 0] },
    }),
  };

  const leftVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "-30%" : "30%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "-30%" : "30%",
      opacity: 0,
      transition: { duration: 0.4, ease: [0.55, 0, 0.78, 0] },
    }),
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-2 md:px-0 select-none">
      {/* Category tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {menuCategories.map((cat, i) => (
          <button
            key={cat.id}
            onClick={() => setPage([i, i > page ? 1 : -1])}
            data-testid={`tab-book-${cat.id}`}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              i === page
                ? "bg-primary text-primary-foreground shadow-md scale-105"
                : "bg-card text-muted-foreground hover:bg-muted border border-border/60"
            }`}
          >
            {cat.emoji} {cat.name}
          </button>
        ))}
      </div>

      {/* Book */}
      <div
        className="relative w-full rounded-2xl shadow-2xl overflow-hidden bg-[#f5f0e8]"
        style={{ perspective: "2000px", minHeight: "520px" }}
      >
        {/* Book spine shadow */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-black/15 via-black/30 to-black/15 z-30 hidden md:block" />

        <div className="grid md:grid-cols-2 min-h-[520px]" style={{ transformStyle: "preserve-3d" }}>
          {/* LEFT PAGE — decorative/chapter info */}
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={`left-${page}`}
              custom={direction}
              variants={leftVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className={`relative flex flex-col justify-between p-8 md:p-12 bg-gradient-to-br ${category.gradient} text-white min-h-[260px] md:min-h-[520px]`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-24 h-24 opacity-10 overflow-hidden">
                <div className="w-48 h-48 rounded-full border-2 border-white -translate-x-12 -translate-y-12" />
              </div>
              <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10 overflow-hidden">
                <div className="w-48 h-48 rounded-full border-2 border-white translate-x-0 translate-y-12" />
              </div>

              <div>
                <p className="text-white/50 text-xs uppercase tracking-[0.25em] mb-2 font-medium">
                  Chapter {page + 1} of {menuCategories.length}
                </p>
                <div className="text-6xl mb-6">{category.emoji}</div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight mb-3">
                  {category.name}
                </h2>
                <p className="text-white/70 text-sm leading-relaxed italic">
                  "{category.subtitle}"
                </p>
              </div>

              <div className="space-y-2">
                <div className="h-px w-12 bg-white/30" />
                <p className="text-white/50 text-xs">
                  {category.items.length} items on this page
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT PAGE — menu items */}
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={`right-${page}`}
              custom={direction}
              variants={rightVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative bg-[#fffdf8] p-6 md:p-10 min-h-[260px] md:min-h-[520px]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Page texture lines */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, #000 27px, #000 28px)", backgroundSize: "100% 28px", backgroundPosition: "0 32px" }}
              />

              <div className="relative">
                <div className="space-y-5">
                  {category.items.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.3 }}
                      className="group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-2 flex-1 min-w-0">
                          {/* Veg/Non-veg indicator */}
                          <span className="mt-1 shrink-0" title={item.isVeg ? "Vegetarian" : "Non-vegetarian"}>
                            <span className={`inline-block w-3.5 h-3.5 border-2 rounded-sm flex items-center justify-center ${item.isVeg ? "border-green-600" : "border-red-600"}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-600"}`} />
                            </span>
                          </span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold text-foreground text-sm leading-snug">
                                {item.name}
                              </h3>
                              {item.isPopular && (
                                <span className="text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                                  Popular
                                </span>
                              )}
                              {item.isNew && (
                                <span className="text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                                  New
                                </span>
                              )}
                            </div>
                            <p className="text-muted-foreground text-xs leading-relaxed mt-0.5 line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-bold text-foreground text-sm">₹{item.price}</span>
                        </div>
                      </div>
                      {i < category.items.length - 1 && (
                        <div className="mt-4 border-b border-dashed border-border/50" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Page corner fold */}
              <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-0 h-0"
                  style={{ borderStyle: "solid", borderWidth: "0 0 28px 28px", borderColor: "transparent transparent #e8e0d0 transparent" }} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation & page number */}
        <div className="flex items-center justify-between px-6 md:px-10 py-4 border-t border-black/10 bg-[#f0ebe0]">
          <button
            onClick={() => paginate(-1)}
            disabled={page === 0}
            data-testid="button-book-prev"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:bg-black/10"
          >
            <ChevronLeft size={16} /> Previous
          </button>

          <div className="flex items-center gap-2">
            {menuCategories.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage([i, i > page ? 1 : -1])}
                data-testid={`dot-book-${i}`}
                className={`rounded-full transition-all ${i === page ? "w-5 h-2 bg-primary" : "w-2 h-2 bg-black/20 hover:bg-black/40"}`}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            disabled={page === menuCategories.length - 1}
            data-testid="button-book-next"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:bg-black/10"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Swipe hint */}
      <p className="text-center text-xs text-muted-foreground mt-4">
        Use the arrows or tabs above to browse each category
      </p>
    </div>
  );
}
