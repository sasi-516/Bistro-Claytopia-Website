import { motion } from "framer-motion";
import { Users, PartyPopper, Heart, Briefcase } from "lucide-react";

export function Events() {
  const events = [
    {
      title: "Birthday Parties",
      icon: <PartyPopper className="w-6 h-6" />,
      desc: "Celebrate creatively. Packages include pottery pieces, food, decorations, and a dedicated host."
    },
    {
      title: "Couple Dates",
      icon: <Heart className="w-6 h-6" />,
      desc: "A unique romantic experience. Paint together, eat together, and create a lasting memory."
    },
    {
      title: "Corporate Outings",
      icon: <Briefcase className="w-6 h-6" />,
      desc: "Team building through art. Boost morale and creativity with guided wheel and painting sessions."
    },
    {
      title: "Family Workshops",
      icon: <Users className="w-6 h-6" />,
      desc: "Fun for all ages. Spend quality time together away from screens."
    }
  ];

  return (
    <section id="events" className="py-24 bg-card border-y border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4 h-full"
          >
            <div className="space-y-4 pt-8">
              <img src="/images/gallery-2.png" alt="Friends painting" className="rounded-2xl object-cover w-full aspect-[4/5] shadow-lg" />
              <img src="/images/gallery-4.png" alt="Couple painting" className="rounded-2xl object-cover w-full aspect-square shadow-lg" />
            </div>
            <div className="space-y-4">
              <img src="/images/hero.png" alt="Studio" className="rounded-2xl object-cover w-full aspect-square shadow-lg" />
              <img src="/images/painting.png" alt="Painting details" className="rounded-2xl object-cover w-full aspect-[4/5] shadow-lg" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Events & Groups
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Bistro Claytopia is the perfect venue for your next gathering. We offer tailored packages for groups of all sizes.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8">
              {events.map((event, idx) => (
                <div key={idx} className="bg-background p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                    {event.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{event.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <a 
                href="#book" 
                className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-medium hover:bg-secondary/90 transition-colors"
              >
                Inquire About Group Booking
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
