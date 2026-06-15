import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      q: "Do I need prior experience or art skills?",
      a: "Not at all! Painting pottery is for everyone. We have stencils, stamps, and friendly staff to help you create something beautiful regardless of your skill level."
    },
    {
      q: "How long does a session take?",
      a: "Most people spend 1.5 to 2 hours painting their pieces. For the pottery wheel, sessions are typically 45-60 minutes with an instructor."
    },
    {
      q: "When can I take my pottery home?",
      a: "After you paint, we need to clear glaze and fire your piece in our kiln. This process takes about 2 to 3 weeks. We will text you when it's ready for pickup."
    },
    {
      q: "Are the ceramics safe to eat and drink from?",
      a: "Yes! Once fired, all our functional pottery (mugs, bowls, plates) is 100% food-safe, microwave-safe, and dishwasher-safe."
    },
    {
      q: "Is there an age limit?",
      a: "We welcome all ages! We have specific kid-friendly pieces and non-toxic paints perfect for children. For the pottery wheel, we recommend ages 8 and up."
    },
    {
      q: "What should I wear?",
      a: "Our paints for the 'Paint Your Pottery' are water-based and wash out easily. If you are doing the 'Pottery Wheel', wear comfortable clothes you don't mind getting a little clay on (we provide aprons!)."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know before you visit us.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-background rounded-2xl p-6 md:p-8 shadow-sm border border-border"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-bold hover:text-primary">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
