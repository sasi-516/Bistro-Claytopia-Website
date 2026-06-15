import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4">
            <h3 className="font-serif text-3xl font-bold text-primary mb-6">Claytopia</h3>
            <p className="text-background/80 leading-relaxed">
              Bangalore's premier paint-your-own pottery café. A space where food meets art, and creativity flows freely.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Visit Us</h4>
            <ul className="space-y-4 text-background/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>11, 80 Feet Rd, Koramangala 1st Block, Bengaluru, Karnataka 560034</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>hello@bistroclaytopia.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Hours</h4>
            <ul className="space-y-3 text-background/80">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span>11:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday - Sunday</span>
                <span>10:00 AM - 11:00 PM</span>
              </li>
              <li className="pt-2 text-primary font-medium text-sm">
                *Last seating for painting is 2 hours before closing
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3 text-background/80">
              <li><a href="#experiences" className="hover:text-primary transition-colors">Our Experiences</a></li>
              <li><a href="#menu" className="hover:text-primary transition-colors">Café Menu</a></li>
              <li><a href="#events" className="hover:text-primary transition-colors">Group Events</a></li>
              <li><a href="#faq" className="hover:text-primary transition-colors">FAQs</a></li>
              <li><a href="#book" className="hover:text-primary transition-colors">Book a Table</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-background/60 text-sm">
          <p>© {new Date().getFullYear()} Bistro Claytopia. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
