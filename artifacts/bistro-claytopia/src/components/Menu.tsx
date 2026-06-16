import { motion } from "framer-motion";
import { Link } from "wouter";
import { BookOpen, ShoppingBag, ArrowRight } from "lucide-react";
import { menuCategories } from "@/data/menu";

const highlights = menuCategories.flatMap((cat) =>
  cat.items.filter((i) => i.isPopular).slice(0, 2).map((item) => ({
    ...item,
    categoryEmoji: cat.emoji,
    categoryName: cat.name,
  }))
).slice(0, 6);

export function Menu() {
  return (
    <section id="menu" className="py-24 bg-[#35251c] text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">What We Serve</p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-5 text-[#f5ebd9]">The Café Menu</h2>
          <p className="text-[#c4b8a8] text-lg leading-relaxed">
            Artisanal coffee, fresh continental plates, desserts, and a few things you'll only find here.
            Browse the full menu or place your order directly.
          </p>
        </motion.div>

        {/* CTA Mode buttons */}
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
            className="group flex items-center gap-3 px-8 py-4 bg-[#f5ebd9] text-[#35251c] rounded-2xl font-bold text-base hover:bg-white transition-all hover:scale-105 shadow-lg w-full sm:w-auto justify-center"
          >
            <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <BookOpen size={18} className="text-[#78350f]" />
            </div>
            <div className="text-left">
              <p className="leading-none">Explore Menu</p>
              <p className="text-xs font-normal text-[#78350f]/70 mt-0.5">Browse like a book</p>
            </div>
            <ArrowRight size={16} className="ml-auto opacity-50 group-hover:opacity-100 transition-opacity" />
          </Link>

          <Link
            href="/menu?mode=order"
            data-testid="link-menu-order"
            className="group flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-base hover:bg-primary/90 transition-all hover:scale-105 shadow-lg w-full sm:w-auto justify-center"
          >
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <ShoppingBag size={18} />
            </div>
            <div className="text-left">
              <p className="leading-none">Place Order</p>
              <p className="text-xs font-normal text-white/70 mt-0.5">Add to cart & pay</p>
            </div>
            <ArrowRight size={16} className="ml-auto opacity-50 group-hover:opacity-100 transition-opacity" />
          </Link>
        </motion.div>

        {/* Popular items preview */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-center text-xs uppercase tracking-[0.2em] text-white/30 font-medium mb-6">
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
                className="group flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/8 hover:bg-white/10 hover:border-white/15 transition-all cursor-default"
              >
                <span className="text-2xl shrink-0 mt-0.5" aria-hidden="true">{item.categoryEmoji}</span>
                <div className="min-w-0">
                  <h4 className="font-semibold text-white text-sm leading-snug truncate">{item.name}</h4>
                  <p className="text-white/40 text-xs mt-0.5 truncate">{item.categoryName}</p>
                  <p className="text-primary font-bold text-sm mt-1.5">₹{item.price}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center mt-8 text-white/35 text-sm">
            + {menuCategories.reduce((n, c) => n + c.items.length, 0) - highlights.length} more items across {menuCategories.length} categories
          </p>
        </motion.div>
      </div>
    </section>
  );
}
