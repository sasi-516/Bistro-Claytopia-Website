import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ShoppingBag, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookView } from "@/components/menu/BookView";
import { OrderView } from "@/components/menu/OrderView";

type Mode = "explore" | "order";

export default function MenuPage() {
  const initialMode: Mode =
    typeof window !== "undefined" && new URLSearchParams(window.location.search).get("mode") === "order"
      ? "order"
      : "explore";
  const [mode, setMode] = useState<Mode>(initialMode);

  useEffect(() => {
    document.title = "Menu | Bistro Claytopia – Koramangala, Bengaluru";
    const setMeta = (attr: string, name: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("name", "description", "Browse the full menu at Bistro Claytopia – artisanal coffee, fresh mains, desserts, and pottery specials. Explore or place your order online.");
    setMeta("property", "og:title", "Menu | Bistro Claytopia");
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Page hero */}
      <section className="relative pt-28 pb-10 md:pt-36 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/6 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-72 h-72 bg-secondary/6 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            data-testid="link-menu-back"
          >
            <ArrowLeft size={15} /> Back to home
          </Link>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">
              Bistro Claytopia
            </p>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-4">
              Our Menu
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Artisanal coffee, fresh continental plates, desserts, and a few things you'll only find here.
              Browse our menu like a book — or jump straight to ordering.
            </p>
          </div>

          {/* Mode toggle */}
          <div className="flex items-center justify-center mt-8">
            <div className="flex items-center gap-1 p-1.5 bg-card border border-border/60 rounded-2xl shadow-sm">
              <button
                onClick={() => setMode("explore")}
                data-testid="button-mode-explore"
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                  mode === "explore"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <BookOpen size={16} />
                Explore Menu
              </button>
              <button
                onClick={() => setMode("order")}
                data-testid="button-mode-order"
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                  mode === "order"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <ShoppingBag size={16} />
                Place Order
              </button>
            </div>
          </div>

          {/* Mode description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={mode}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-center text-xs text-muted-foreground mt-3"
            >
              {mode === "explore"
                ? "Flip through our menu like a book — one category at a time."
                : "Browse items, add to your order, and choose how to pay."}
            </motion.p>
          </AnimatePresence>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatePresence mode="wait">
            {mode === "explore" ? (
              <motion.div
                key="explore"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <BookView />
              </motion.div>
            ) : (
              <motion.div
                key="order"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <OrderView />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
}
