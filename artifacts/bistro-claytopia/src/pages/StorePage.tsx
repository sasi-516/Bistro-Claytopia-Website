import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Bell, Package, Paintbrush, Gift, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const comingSoonProducts = [
  {
    icon: <Paintbrush className="w-6 h-6" />,
    title: "Handcrafted Pottery",
    desc: "Mugs, bowls, plates, and vases made and painted by our in-house artists. Every piece is unique.",
    tag: "Bestseller",
    tagColor: "bg-tint-blue text-paint-blue",
  },
  {
    icon: <Package className="w-6 h-6" />,
    title: "Paint-at-Home Kits",
    desc: "Everything you need to paint your own ceramic at home — bisque piece, glazes, brushes, and instructions.",
    tag: "Most Requested",
    tagColor: "bg-tint-purple text-paint-purple",
  },
  {
    icon: <Gift className="w-6 h-6" />,
    title: "Gift Vouchers",
    desc: "Give the gift of creativity. Vouchers for pottery sessions, wheel classes, and café experiences.",
    tag: "Perfect Gift",
    tagColor: "bg-tint-pink text-paint-pink",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Studio Merchandise",
    desc: "Tote bags, aprons, art prints, and Claytopia-branded keepsakes from our studio to your home.",
    tag: "Coming Soon",
    tagColor: "bg-tint-mint text-paint-mint",
  },
];

export default function StorePage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Store | Bistro Claytopia – Handcrafted Pottery & Gifts";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    toast({
      title: "You're on the list!",
      description: "We'll email you the moment the store opens.",
    });
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/8 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10" data-testid="link-store-back">
            <ArrowLeft size={16} /> Back to home
          </Link>

          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-8 border border-primary/20"
            >
              <Sparkles size={14} />
              Something beautiful is on its way
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6 leading-tight"
            >
              Our Store Is{" "}
              <span className="text-primary italic">Coming Soon</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto"
            >
              We're packaging the magic of our studio into things you can take home, gift to someone you love,
              or use to create on your own. Stay tuned — it's going to be worth the wait.
            </motion.p>

            {/* Email signup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {submitted ? (
                <div className="inline-flex items-center gap-3 px-6 py-4 bg-primary/10 border border-primary/20 rounded-2xl text-primary font-medium">
                  <Bell size={20} />
                  We'll notify you when we launch. Stay tuned!
                </div>
              ) : (
                <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" data-testid="form-store-notify">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for early access"
                    required
                    data-testid="input-store-email"
                    className="flex-1 px-5 py-3.5 rounded-full border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                  <button
                    type="submit"
                    data-testid="button-store-notify"
                    className="px-6 py-3.5 bg-primary text-primary-foreground rounded-full font-semibold text-sm hover:bg-primary/90 transition-all hover:scale-105 shadow-lg whitespace-nowrap"
                  >
                    Notify Me
                  </button>
                </form>
              )}
              <p className="text-xs text-muted-foreground mt-3">No spam. Just a heads-up when we go live.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product previews */}
      <section className="py-16 md:py-20 bg-card border-t border-border/60">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3">
              A Glimpse of What's Coming
            </h2>
            <p className="text-muted-foreground">These are the products our guests ask for most — and they're almost ready.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {comingSoonProducts.map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                data-testid={`card-store-product-${i}`}
                className="bg-background rounded-2xl border border-border/60 p-7 text-center group hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon placeholder as product image */}
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  {product.icon}
                </div>
                <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3 ${product.tagColor}`}>
                  {product.tag}
                </span>
                <h3 className="font-serif font-bold text-lg text-foreground mb-2">{product.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{product.desc}</p>

                {/* Coming soon pill */}
                <div className="mt-5 py-2.5 px-4 rounded-full border-2 border-dashed border-border text-muted-foreground text-xs font-medium">
                  Coming Soon
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to café CTA */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-xl">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
            While you wait, come visit us
          </h2>
          <p className="text-muted-foreground mb-8">
            The best products from our store are made right here at our Koramangala studio.
            Come in, paint something, and take it home the old-fashioned way.
          </p>
          <Link
            href="/#book"
            data-testid="link-store-book"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
          >
            Book a Table
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
