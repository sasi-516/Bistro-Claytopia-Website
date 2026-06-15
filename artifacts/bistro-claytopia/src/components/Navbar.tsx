import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Experiences", href: "#experiences" },
    { name: "How It Works", href: "#process" },
    { name: "Menu", href: "#menu" },
    { name: "Events", href: "#events" },
    { name: "Gallery", href: "#gallery" },
    { name: "FAQ", href: "#faq" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className={`font-serif text-2xl md:text-3xl font-bold tracking-tight ${isScrolled ? "text-primary" : "text-white drop-shadow-md"}`}>
              Claytopia
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-foreground/80" : "text-white/90 hover:text-white drop-shadow-md"}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#book"
              onClick={(e) => handleNavClick(e, "#book")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                isScrolled 
                ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                : "bg-white text-primary hover:bg-white/90 shadow-lg"
              }`}
            >
              Book a Table
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 -mr-2 ${isScrolled ? "text-foreground" : "text-white drop-shadow-md"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`fixed inset-0 bg-background z-40 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden pt-24 px-6`}
        style={{ top: "0" }}
      >
        <button
          className="absolute top-6 right-4 p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X size={24} />
        </button>
        <ul className="flex flex-col gap-6 text-center mt-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-2xl font-serif text-foreground hover:text-primary transition-colors block"
              >
                {link.name}
              </a>
            </li>
          ))}
          <li className="mt-8">
            <a
              href="#book"
              onClick={(e) => handleNavClick(e, "#book")}
              className="inline-block w-full py-4 px-8 bg-primary text-primary-foreground text-lg font-medium rounded-full hover:bg-primary/90 transition-colors"
            >
              Book a Table
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
