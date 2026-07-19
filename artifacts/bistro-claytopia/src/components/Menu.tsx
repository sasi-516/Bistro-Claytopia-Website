import { motion } from "framer-motion";
import { Link } from "wouter";
import { BookOpen, ShoppingBag, ArrowRight } from "lucide-react";
import { menuCategories } from "@/data/menu";
import { StudioAmbience } from "@/components/decor/StudioAmbience";
import { BrushStrokeTitle } from "@/components/decor/BrushStrokeTitle";

const highlights = menuCategories.flatMap((cat) =>
  cat.items.filter((i) => i.isPopular).slice(0, 2).map((item) => ({
    ...item,
    categoryEmoji: cat.emoji,
    categoryName: cat.name,
  }))
).slice(0, 6);

export function Menu() {
  return (
    <section id="menu" className="py-24 bg-section-yellow overflow-hidden relative">
      <StudioAmbience tone="yellow" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <BrushStrokeTitle
          eyebrow="What We Serve"
          title="The Café Menu"
          description="Breakfast, burgers, pasta, pizza, Asian specials, coffee, boba and more — the full Bistro Claytopia menu."
          accent="orange"
        />

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true }}
        >
          <Link
            href="/menu?mode=explore"
            data-testid="link-menu-explore"
            className="group flex items-center gap-3 px-8 py-4 bg-white text-foreground rounded-2xl font-bold text-base hover:shadow-lg transition-all hover:scale-105 shadow-sm border border-foreground/10 w-full sm:w-auto justify-center card-art"
          >
            <div className="w-9 h-9 rounded-xl bg-paint-orange/15 flex items-center justify-center">
              <BookOpen size={18} className="text-paint-orange" />
            </div>
            <div className="text-left">
              <p className="leading-none">Explore Menu</p>
              <p className="text-xs font-normal text-muted-foreground mt-0.5">Browse like a book</p>
            </div>
            <ArrowRight size={16} className="ml-auto opacity-50 group-hover:opacity-100 transition-opacity" />
          </Link>

          <Link
            href="/menu?mode=order"
            data-testid="link-menu-order"
            className="group flex items-center gap-3 px-8 py-4 bg-paint-orange text-white rounded-2xl font-bold text-base hover:bg-paint-orange/90 transition-all hover:scale-105 shadow-lg shadow-paint-orange/25 w-full sm:w-auto justify-center"
          >
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <ShoppingBag size={18} />
            </div>
            <div className="text-left">
              <p className="leading-none">Place Order</p>
              <p className="text-xs font-normal text-white/80 mt-0.5">Add to cart & pay</p>
            </div>
            <ArrowRight size={16} className="ml-auto opacity-50 group-hover:opacity-100 transition-opacity" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-center text-xs uppercase tracking-[0.2em] text-paint-orange font-bold mb-6">
            Popular right now
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto">
            {highlights.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="group flex items-start gap-3 p-4 rounded-2xl bg-tint-yellow border border-white/80 hover:shadow-md transition-all cursor-default card-art"
              >
                <span className="text-2xl shrink-0 mt-0.5" aria-hidden="true">{item.categoryEmoji}</span>
                <div className="min-w-0">
                  <h4 className="font-semibold text-foreground text-sm leading-snug truncate">{item.name}</h4>
                  <p className="text-muted-foreground text-xs mt-0.5 truncate">{item.categoryName}</p>
                  <p className="text-paint-orange font-bold text-sm mt-1.5">₹{item.price}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center mt-8 text-muted-foreground text-sm">
            + {menuCategories.reduce((n, c) => n + c.items.length, 0) - highlights.length} more items across {menuCategories.length} categories
          </p>
        </motion.div>
      </div>
    </section>
  );
}
