import { motion } from "framer-motion";
import { Palette, Coffee, Disc } from "lucide-react";

export function Experiences() {
  const experiences = [
    {
      title: "Paint Your Pottery",
      description: "Choose from hundreds of ready-to-paint bisque pieces. Mugs, plates, bowls, and figurines waiting for your creative touch.",
      icon: <Palette className="w-8 h-8 text-primary" />,
      image: "/images/painting.png",
    },
    {
      title: "Pottery Wheel",
      description: "Get your hands dirty and learn to throw clay on the wheel with our expert instructors guiding you every step of the way.",
      icon: <Disc className="w-8 h-8 text-primary" />,
      image: "/images/wheel.png",
    },
    {
      title: "Café & Dining",
      description: "Enjoy artisanal coffee, delicious continental food, and decadent desserts while you create. The perfect creative fuel.",
      icon: <Coffee className="w-8 h-8 text-primary" />,
      image: "/images/food.png",
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="experiences" className="py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">Our Core Experiences</h2>
          <p className="text-lg text-muted-foreground">
            Whether you're looking for a relaxing solo date, a fun outing with friends, or a complete creative workshop, we have something for everyone.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-background rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-border/50 flex flex-col h-full"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={exp.image} 
                  alt={exp.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 w-12 h-12 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
                  {exp.icon}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-serif font-bold mb-4">{exp.title}</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
