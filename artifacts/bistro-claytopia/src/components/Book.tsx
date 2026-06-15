import { useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Clock } from "lucide-react";

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  date: z.string().min(1, "Date is required"),
  guests: z.string().min(1, "Number of guests is required"),
  experience: z.string().min(1, "Please select an experience"),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookProps {
  preselectedExperience?: string;
  onExperienceConsumed?: () => void;
}

export function Book({ preselectedExperience, onExperienceConsumed }: BookProps) {
  const { toast } = useToast();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      guests: "",
      experience: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (preselectedExperience) {
      form.setValue("experience", preselectedExperience, { shouldValidate: false });
      onExperienceConsumed?.();
    }
  }, [preselectedExperience, form, onExperienceConsumed]);

  const onSubmit = (data: BookingFormValues) => {
    console.log("Booking data:", data);
    toast({
      title: "Booking Request Sent!",
      description: "We'll confirm your reservation within 2 hours.",
    });
    form.reset();
  };

  const experienceOptions = [
    { value: "paint", label: "Paint Your Pottery" },
    { value: "wheel", label: "Pottery Wheel Session" },
    { value: "dine", label: "Café & Dining Only" },
    { value: "knitting", label: "Knitting Studio" },
    { value: "event", label: "Group Event / Party" },
  ];

  return (
    <section
      id="book"
      className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden"
      aria-label="Book a table"
    >
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)", backgroundSize: "28px 28px" }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70 font-semibold mb-3">
              Reserve Your Spot
            </p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
              Book a Table
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
              Weekends fill up fast. Book ahead to guarantee your pottery slot or café table.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-background rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Info sidebar */}
              <div className="lg:w-2/5 bg-secondary text-secondary-foreground p-8 md:p-10 flex flex-col justify-between gap-8">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#f5ebd9] mb-2">
                    Find Us Here
                  </h3>
                  <p className="text-[#c8b89a] text-sm leading-relaxed mb-8">
                    Walk-ins welcome, but a reservation guarantees your table and pottery station.
                  </p>

                  <ul className="space-y-5 text-[#d4c5b0]">
                    <li className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-[#f5ebd9] text-sm">Location</p>
                        <p className="text-sm leading-relaxed mt-0.5">
                          11, 80 Feet Rd, Koramangala 1st Block,
                          <br />Bengaluru, Karnataka 560034
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-[#f5ebd9] text-sm">Hours</p>
                        <p className="text-sm mt-0.5">Mon–Fri: 11:00 AM – 10:00 PM</p>
                        <p className="text-sm">Sat–Sun: 10:00 AM – 11:00 PM</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-[#f5ebd9] text-sm">Call Us</p>
                        <a
                          href="tel:+919876543210"
                          className="text-sm hover:text-primary transition-colors"
                          data-testid="link-book-phone"
                        >
                          +91 98765 43210
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl bg-white/10 p-5 text-sm text-[#d4c5b0] leading-relaxed">
                  <p className="font-semibold text-[#f5ebd9] mb-1">Good to know</p>
                  Last pottery seating is 2 hours before closing. Wheel sessions require a minimum 24-hour advance booking.
                </div>
              </div>

              {/* Form */}
              <div className="lg:w-3/5 p-8 md:p-10 bg-background text-foreground">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                    data-testid="form-booking"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Priya Sharma"
                                {...field}
                                className="bg-muted/40"
                                data-testid="input-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="priya@example.com"
                                type="email"
                                {...field}
                                className="bg-muted/40"
                                data-testid="input-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+91 98765 43210"
                                {...field}
                                className="bg-muted/40"
                                data-testid="input-phone"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date & Time</FormLabel>
                            <FormControl>
                              <Input
                                type="datetime-local"
                                {...field}
                                className="bg-muted/40"
                                data-testid="input-date"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="guests"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Guests</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-muted/40" data-testid="select-guests">
                                  <SelectValue placeholder="Select guests" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {[1, 2, 3, 4, 5, 6, "7+"].map((num) => (
                                  <SelectItem key={num} value={num.toString()}>
                                    {num} {num === 1 ? "Guest" : "Guests"}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Experience</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-muted/40" data-testid="select-experience">
                                  <SelectValue placeholder="Select experience" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {experienceOptions.map((opt) => (
                                  <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Special Requests (optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Birthday celebration, dietary requirements, accessibility needs, etc."
                              {...field}
                              className="bg-muted/40 resize-none"
                              rows={3}
                              data-testid="input-notes"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <button
                      type="submit"
                      data-testid="button-submit-booking"
                      className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-base hover:bg-primary/90 transition-colors shadow-md"
                    >
                      Confirm Reservation
                    </button>

                    <p className="text-xs text-center text-muted-foreground">
                      We'll confirm your booking within 2 hours via email or WhatsApp.
                    </p>
                  </form>
                </Form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
