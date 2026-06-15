import { motion } from "framer-motion";

export function Process() {
  const steps = [
    {
      number: "01",
      title: "Choose",
      description: "Pick from over 100+ blank ceramic pieces. Mugs, plates, planters, and more."
    },
    {
      number: "02",
      title: "Paint",
      description: "Design your masterpiece with our vibrant, non-toxic glazes and specialized brushes."
    },
    {
      number: "03",
      title: "We Fire It",
      description: "Leave it with us. We'll clear glaze and fire your piece in our professional kilns."
    },
    {
      number: "04",
      title: "Collect",
      description: "Return in 2-3 weeks to pick up your glossy, food-safe, functional work of art."
    }
  ];

  return (
    <section id="process" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              No experience necessary. Just bring your creativity, and we'll provide the rest. Here is the journey of your pottery piece.
            </p>
            
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-border hidden sm:block" />
              
              <div className="space-y-8 relative">
                {steps.map((step, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-6 items-start"
                  >
                    <div className="w-12 h-12 rounded-full bg-card border-2 border-primary flex items-center justify-center shrink-0 z-10 font-serif font-bold text-primary shadow-sm">
                      {step.number}
                    </div>
                    <div className="pt-2">
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <img 
              src="/images/gallery-1.png" 
              alt="Beautiful glazed mug" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
              <p className="text-white text-xl font-serif italic">"A masterpiece in the making"</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
