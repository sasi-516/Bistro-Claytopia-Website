import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Tag, Sparkles, CheckCircle2, CalendarCheck, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { experiences, getExperienceById } from "@/data/experiences";
import NotFound from "@/pages/not-found";

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  date: z.string().min(1, "Date is required"),
  guests: z.string().min(1, "Select number of guests"),
  notes: z.string().optional(),
});
type BookingFormValues = z.infer<typeof bookingSchema>;

export default function ExperiencePage() {
  const { id } = useParams<{ id: string }>();
  const experience = getExperienceById(id ?? "");
  const { toast } = useToast();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { name: "", email: "", phone: "", date: "", guests: "", notes: "" },
  });

  useEffect(() => {
    if (!experience) return;
    document.title = experience.metaTitle;
    const setMeta = (attr: string, name: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("name", "description", experience.metaDescription);
    setMeta("property", "og:title", experience.metaTitle);
    setMeta("property", "og:description", experience.metaDescription);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [experience]);

  if (!experience) return <NotFound />;

  const others = experiences.filter((e) => e.id !== experience.id).slice(0, 3);

  const onSubmit = (data: BookingFormValues) => {
    console.log("Booking:", data);
    toast({ title: "Booking Request Sent!", description: "We'll confirm within 2 hours." });
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${experience.image}')` }}
          role="img"
          aria-label={experience.title}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-6 pb-10 md:pb-14">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 text-white/60 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><ChevronRight size={14} /></li>
              <li><Link href="/" className="hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); window.history.back(); }}>Experiences</Link></li>
              <li><ChevronRight size={14} /></li>
              <li className="text-white font-medium">{experience.title}</li>
            </ol>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-primary text-xs uppercase tracking-[0.2em] font-semibold mb-2">{experience.tagline}</p>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white drop-shadow-lg mb-4">
              {experience.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-white/80">
              <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary" />{experience.duration}</span>
              <span className="flex items-center gap-1.5"><Tag size={14} className="text-primary" />{experience.price}</span>
              <span className="flex items-center gap-1.5"><Sparkles size={14} className="text-primary" />{experience.highlight}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">

          {/* Left: details */}
          <div className="lg:col-span-2 space-y-12">

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-lg text-muted-foreground leading-relaxed">{experience.description}</p>
            </motion.div>

            {/* Sub-experiences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-7">
                Ways to Experience This
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {experience.subExperiences.map((sub, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border/60 hover:shadow-md transition-shadow">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{sub.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{sub.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* How It Works */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-7">
                How It Works
              </h2>
              <div className="relative">
                <div className="absolute left-5 top-6 bottom-6 w-px bg-border hidden sm:block" />
                <ol className="space-y-6 relative">
                  {experience.howItWorks.map((step, i) => (
                    <li key={i} className="flex gap-5 items-start">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0 z-10 shadow-sm font-serif">
                        {i + 1}
                      </div>
                      <div className="pt-1.5 pb-2">
                        <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          </div>

          {/* Right: booking form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24">
              <div className="bg-card rounded-3xl border border-border/60 overflow-hidden shadow-sm">
                <div className="bg-primary px-6 py-5">
                  <h2 className="text-xl font-serif font-bold text-primary-foreground mb-1 flex items-center gap-2">
                    <CalendarCheck size={20} /> Book This Experience
                  </h2>
                  <p className="text-primary-foreground/80 text-sm">Weekends fill up fast — reserve your slot now.</p>
                </div>
                <div className="p-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid={`form-book-${experience.id}`}>
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl><Input placeholder="Your name" {...field} className="bg-background" data-testid="input-exp-name" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl><Input placeholder="your@email.com" type="email" {...field} className="bg-background" data-testid="input-exp-email" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl><Input placeholder="+91 98765 43210" {...field} className="bg-background" data-testid="input-exp-phone" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="date" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date & Time</FormLabel>
                          <FormControl><Input type="datetime-local" {...field} className="bg-background" data-testid="input-exp-date" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="guests" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Guests</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background" data-testid="select-exp-guests">
                                <SelectValue placeholder="Number of guests" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6, "7+"].map((n) => (
                                <SelectItem key={n} value={n.toString()}>{n} {n === 1 ? "Guest" : "Guests"}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="notes" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Special Requests</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Birthday, dietary needs, etc." {...field} className="bg-background resize-none" rows={2} data-testid="input-exp-notes" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <button
                        type="submit"
                        data-testid={`button-submit-exp-${experience.id}`}
                        className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-md"
                      >
                        Confirm Reservation
                      </button>
                      <p className="text-xs text-center text-muted-foreground">We confirm within 2 hours via email or WhatsApp.</p>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Other experiences */}
      <section className="bg-card py-14 md:py-20 border-t border-border/60">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-8">
            Explore Other Experiences
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {others.map((exp) => (
              <Link key={exp.id} href={`/experiences/${exp.id}`}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  data-testid={`card-other-exp-${exp.id}`}
                  className="group bg-background rounded-2xl border border-border/60 overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img src={exp.image} alt={exp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-1">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{exp.shortDesc}</p>
                    <span className="inline-flex items-center gap-1 mt-3 text-primary text-sm font-medium">
                      Explore <ChevronRight size={14} />
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
