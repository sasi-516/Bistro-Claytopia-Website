import { Instagram, Facebook, MapPin, Phone, Mail, Clock } from "lucide-react";

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

export function Footer() {
  return (
    <footer className="bg-foreground text-background" aria-label="Site footer">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="mb-6">
              <h2 className="font-serif text-3xl font-bold text-primary">Bistro</h2>
              <h2 className="font-serif text-3xl font-bold text-white -mt-1">Claytopia</h2>
            </div>
            <p className="text-background/75 leading-relaxed text-sm">
              Bangalore's premier paint-your-own pottery café. A space where food
              meets art and creativity flows freely for everyone.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="https://www.instagram.com/bistroclaytopia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bistro Claytopia on Instagram"
                data-testid="link-instagram"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-all hover:scale-110"
              >
                <Instagram size={18} aria-hidden="true" />
              </a>
              <a
                href="https://www.facebook.com/bistroclaytopia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bistro Claytopia on Facebook"
                data-testid="link-facebook"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-all hover:scale-110"
              >
                <Facebook size={18} aria-hidden="true" />
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
