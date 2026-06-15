import { motion } from "framer-motion";
import { UtensilsCrossed, Coffee } from "lucide-react";

export function Menu() {
  const menuCategories = [
    {
      title: "Artisan Coffee & Drinks",
      icon: <Coffee className="w-6 h-6 text-primary" />,
      items: [
        { name: "Claytopia Signature Mocha", price: "₹280", desc: "Rich espresso with dark chocolate and steamed milk" },
        { name: "Hazelnut Cold Coffee", price: "₹250", desc: "Classic frappe blended with roasted hazelnut" },
        { name: "Matcha Latte", price: "₹290", desc: "Premium Japanese matcha with velvety milk" },
        { name: "Berry Blast Mocktail", price: "₹220", desc: "Mixed berries, mint, and sparkling water" }
      ]
    },
    {
      title: "Bites & Mains",
      icon: <UtensilsCrossed className="w-6 h-6 text-primary" />,
      items: [
        { name: "Studio Signature Burger", price: "₹450", desc: "Hand-crafted patty, caramelized onions, artisan bun" },
        { name: "Creamy Pesto Pasta", price: "₹420", desc: "Penne in rich basil pesto with cherry tomatoes" },
        { name: "Loaded Nachos", price: "₹350", desc: "Crispy tortillas, salsa, jalapeños, and cheese sauce" },
        { name: "Terracotta Chocolate Dome", price: "₹380", desc: "Our signature melting chocolate dessert" }
      ]
    }
  ];

  return (
    <section id="menu" className="py-24 bg-[#35251c] text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-[#f5ebd9]">The Café Menu</h2>
            <p className="text-lg text-[#d4c5b0]">
              Creative fuel to keep you going. Enjoy our curated selection of continental dishes, artisanal coffees, and decadent desserts.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          {menuCategories.map((category, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                {category.icon}
                <h3 className="text-2xl font-serif font-bold text-[#f5ebd9]">{category.title}</h3>
              </div>
              
              <div className="space-y-8">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="group">
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{item.name}</h4>
                      <div className="flex-grow border-b border-dashed border-white/20 mx-4 relative top-[-6px]" />
                      <span className="text-lg font-bold text-primary">{item.price}</span>
                    </div>
                    <p className="text-[#a89f91] text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
