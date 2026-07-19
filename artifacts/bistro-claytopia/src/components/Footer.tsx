import { motion, useReducedMotion } from "framer-motion";
import { Instagram, Facebook, Linkedin, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import footerStudioArt from "../../../../attached_assets/brushes-footer-art.svg?url";

function scrollTo(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", href);
  }
}

const quickLinks = [
  { label: "Our Experiences", href: "#experiences" },
  { label: "How It Works", href: "#process" },
  { label: "Café Menu", href: "#menu" },
  { label: "Group Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQs", href: "#faq" },
  { label: "Book a Table", href: "#book" },
];

function FooterStudioArt() {
  const reduced = useReducedMotion();

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 -right-8 z-0 hidden lg:block"
        initial={{ opacity: 0, x: 24, y: 22, scale: 0.96 }}
        whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
        animate={reduced ? undefined : { y: [0, -4, 0] }}
        style={{ willChange: "transform" }}
      >
        <motion.img
          src={footerStudioArt}
          alt=""
          className="h-auto w-[min(50vw,540px)] xl:w-[610px] object-contain opacity-30"
          animate={reduced ? undefined : { opacity: [0.24, 0.36, 0.24] }}
          transition={reduced ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none mx-auto mt-6 block w-full max-w-[360px] lg:hidden"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src={footerStudioArt}
          alt=""
          className="h-auto w-full object-contain opacity-22"
          animate={reduced ? undefined : { opacity: [0.18, 0.28, 0.18] }}
          transition={reduced ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-foreground text-background" aria-label="Site footer">
      <div className="container relative z-10 mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="mb-6">
              <BrandMark variant="footer" size="footer" />
            </div>
            <p className="text-background/75 leading-relaxed text-sm">
              Bangalore's premier paint-your-own pottery café. A space where food
              meets art and creativity flows freely for everyone.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="https://www.instagram.com/bistroclaytopiakoramangala"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bistro Claytopia on Instagram"
                data-testid="link-instagram"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-all hover:scale-110"
              >
                <Instagram size={18} aria-hidden="true" />
              </a>
              <a
                href="https://www.facebook.com/share/1E34vWWpjF/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bistro Claytopia on Facebook"
                data-testid="link-facebook"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-all hover:scale-110"
              >
                <Facebook size={18} aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/company/bistro-claytopia/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bistro Claytopia on LinkedIn"
                data-testid="link-linkedin"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-all hover:scale-110"
              >
                <Linkedin size={18} aria-hidden="true" />
              </a>
              <a
                href="https://youtube.com/@bistroclaytopia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bistro Claytopia on YouTube"
                data-testid="link-youtube"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-all hover:scale-110"
              >
                <Youtube size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Visit */}
          <div>
            <h3 className="font-bold text-base mb-6 text-white uppercase tracking-wider text-xs">
              Visit Us
            </h3>
            <ul className="space-y-4 text-background/75 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <address className="not-italic leading-relaxed">
                  11, 80 Feet Rd, Koramangala 1st Block,
                  <br />Bengaluru, Karnataka 560034
                </address>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <a
                  href="tel:+919876543210"
                  className="hover:text-primary transition-colors"
                  data-testid="link-phone"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <a
                  href="mailto:hello@bistroclaytopia.com"
                  className="hover:text-primary transition-colors"
                  data-testid="link-email"
                >
                  hello@bistroclaytopia.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-bold text-base mb-6 text-white uppercase tracking-wider text-xs">
              Hours
            </h3>
            <ul className="space-y-3 text-background/75 text-sm">
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-white font-medium">Mon – Fri</p>
                  <p>11:00 AM – 10:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-white font-medium">Sat – Sun</p>
                  <p>10:00 AM – 11:00 PM</p>
                </div>
              </li>
              <li className="mt-4 text-primary/90 text-xs leading-relaxed bg-primary/10 rounded-lg p-3 border border-primary/20">
                Last pottery seating is 2 hours before closing
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base mb-6 text-white uppercase tracking-wider text-xs">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-background/75 text-sm" role="list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    data-testid={`link-footer-${link.href.replace("#", "")}`}
                    className="hover:text-primary transition-colors hover:translate-x-1 inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <FooterStudioArt />

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-background/50 text-xs">
          <p>© {new Date().getFullYear()} Bistro Claytopia. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors" data-testid="link-privacy">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors" data-testid="link-terms">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
