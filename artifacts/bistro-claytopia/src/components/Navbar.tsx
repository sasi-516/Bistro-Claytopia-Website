import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingBag } from "lucide-react";

interface NavLink {
  name: string;
  href: string;
  sectionId: string;
  isHash: boolean;
}

const navLinks: NavLink[] = [
  { name: "Experiences", href: "#experiences", sectionId: "experiences", isHash: true },
  { name: "Menu", href: "#menu", sectionId: "menu", isHash: true },
  { name: "Events", href: "#events", sectionId: "events", isHash: true },
  { name: "What's On", href: "#whats-on", sectionId: "whats-on", isHash: true },
  { name: "Gallery", href: "#gallery", sectionId: "gallery", isHash: true },
  { name: "FAQ", href: "#faq", sectionId: "faq", isHash: true },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [location] = useLocation();

  const isHome = location === "/" || location === "";

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const sectionIds = navLinks.map((l) => l.sectionId);
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(id);
          });
        },
        { threshold: 0.35 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [isHome]);

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (!isHome) {
      window.location.href = `/${href}`;
      return;
    }
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", href);
    }
  };

  const isStorePage = location.startsWith("/store");
  const isExpPage = location.startsWith("/experiences/");
  const onSubPage = isStorePage || isExpPage;

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 z-[60] h-[3px] bg-primary transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || onSubPage
            ? "bg-background/96 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={() => { if (isHome) window.scrollTo({ top: 0, behavior: "smooth" }); }}
              aria-label="Bistro Claytopia – Home"
              data-testid="link-home"
              className="flex items-center"
            >
              <span
                className={`font-serif text-xl md:text-2xl font-bold tracking-tight transition-colors ${
                  isScrolled || onSubPage ? "text-primary" : "text-white drop-shadow-md"
                }`}
              >
                Bistro{" "}
                <span className={isScrolled || onSubPage ? "text-foreground" : "text-white/90"}>
                  Claytopia
                </span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-4">
              <ul className="flex gap-0.5" role="list">
                {navLinks.map((link) => {
                  const isActive = isHome && activeSection === link.sectionId;
                  const textClass =
                    isScrolled || onSubPage
                      ? isActive
                        ? "text-primary"
                        : "text-foreground/70 hover:text-foreground"
                      : isActive
                      ? "text-white"
                      : "text-white/80 hover:text-white";
                  return (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        onClick={(e) => handleHashClick(e, link.href)}
                        data-testid={`link-nav-${link.sectionId}`}
                        className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all ${textClass}`}
                      >
                        {link.name}
                        {isActive && (
                          <span
                            className={`absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full ${
                              isScrolled || onSubPage ? "bg-primary" : "bg-white"
                            }`}
                          />
                        )}
                      </a>
                    </li>
                  );
                })}
                {/* Store link */}
                <li>
                  <Link
                    href="/store"
                    data-testid="link-nav-store"
                    className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                      isStorePage
                        ? "text-primary"
                        : isScrolled || onSubPage
                        ? "text-foreground/70 hover:text-foreground"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    <ShoppingBag size={13} />
                    Store
                    <span className="ml-0.5 text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 bg-primary/20 text-primary rounded-full leading-none">
                      New
                    </span>
                  </Link>
                </li>
              </ul>

              <a
                href="#book"
                onClick={(e) => handleHashClick(e, "#book")}
                data-testid="button-book-nav"
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 ${
                  isScrolled || onSubPage
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                    : "bg-white text-primary hover:bg-white/90 shadow-lg"
                }`}
              >
                Book a Table
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className={`lg:hidden p-2 -mr-2 rounded-lg transition-colors ${
                isScrolled || onSubPage
                  ? "text-foreground hover:bg-muted"
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div
          className={`fixed inset-0 bg-background/98 backdrop-blur-xl z-40 transition-all duration-300 ease-in-out lg:hidden flex flex-col ${
            isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-border/50">
            <span className="font-serif text-xl font-bold text-primary">Bistro Claytopia</span>
            <button
              className="p-2 text-foreground hover:bg-muted rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              data-testid="button-mobile-close"
            >
              <X size={24} />
            </button>
          </div>
          <ul className="flex flex-col flex-1 px-6 py-6 gap-1 overflow-y-auto" role="list">
            {navLinks.map((link) => {
              const isActive = isHome && activeSection === link.sectionId;
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleHashClick(e, link.href)}
                    data-testid={`link-mobile-${link.sectionId}`}
                    className={`flex items-center justify-between w-full px-4 py-4 rounded-xl text-lg font-serif transition-all ${
                      isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.name}
                    {isActive && <span className="w-2 h-2 rounded-full bg-primary" />}
                  </a>
                </li>
              );
            })}
            <li>
              <Link
                href="/store"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="link-mobile-store"
                className={`flex items-center justify-between w-full px-4 py-4 rounded-xl text-lg font-serif transition-all ${
                  isStorePage ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                }`}
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag size={18} />
                  Store
                </span>
                <span className="text-xs font-bold uppercase tracking-wide px-2 py-0.5 bg-primary/15 text-primary rounded-full">
                  New
                </span>
              </Link>
            </li>
            <li className="mt-auto pt-6">
              <a
                href="#book"
                onClick={(e) => handleHashClick(e, "#book")}
                data-testid="button-book-mobile"
                className="block w-full py-4 px-8 bg-primary text-primary-foreground text-lg font-semibold rounded-2xl hover:bg-primary/90 transition-colors text-center shadow-lg"
              >
                Book a Table
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
