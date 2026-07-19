import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Clock, CheckCircle2, Loader2 } from "lucide-react";
import { StudioAmbience } from "@/components/decor/StudioAmbience";
import { submitBooking } from "@/lib/submissions";

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  guests: z.string().min(1, "Number of guests is required"),
  occasion: z.string().min(1, "Please select an occasion"),
  experience: z.string().optional(),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const occasionOptions = [
  { value: "birthday", label: "Birthday" },
  { value: "anniversary", label: "Anniversary" },
  { value: "family", label: "Family Dinner" },
  { value: "date", label: "Date Night" },
  { value: "corporate", label: "Corporate Event" },
  { value: "workshop", label: "Workshop / Pottery" },
  { value: "casual", label: "Casual Visit" },
];

const experienceToOccasion: Record<string, string> = {
  paint: "workshop",
  wheel: "workshop",
  dine: "casual",
  knitting: "workshop",
  event: "corporate",
};

const experienceLabels: Record<string, string> = {
  paint: "Paint Your Pottery",
  wheel: "Pottery Wheel Session",
  dine: "Café & Dining Only",
  knitting: "Knitting Studio",
  event: "Group Event / Party",
};

interface BookProps {
  preselectedExperience?: string;
  onExperienceConsumed?: () => void;
}

export function Book({ preselectedExperience, onExperienceConsumed }: BookProps) {
  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<{
    bookingId: string;
    email: string;
    date: string;
    time: string;
    guests: string;
  } | null>(null);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: "",
      occasion: "",
      experience: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (preselectedExperience) {
      form.setValue("experience", preselectedExperience, { shouldValidate: false });
      const occasion = experienceToOccasion[preselectedExperience] ?? "casual";
      form.setValue("occasion", occasion, { shouldValidate: false });
      onExperienceConsumed?.();
    }
  }, [preselectedExperience, form, onExperienceConsumed]);

  const onSubmit = async (data: BookingFormValues) => {
    setSubmitting(true);
    try {
      const result = await submitBooking({
        name: data.name,
        email: data.email,
        phone: data.phone,
        date: data.date,
        time: data.time,
        guests: data.guests,
        occasion: occasionOptions.find((o) => o.value === data.occasion)?.label ?? data.occasion,
        experience: data.experience
          ? experienceLabels[data.experience] ?? data.experience
          : undefined,
        notes: data.notes,
      });

      setBookingSuccess({
        bookingId: result.bookingId,
        email: data.email,
        date: data.date,
        time: data.time,
        guests: data.guests,
      });
      form.reset();
    } finally {
      setSubmitting(false);
    }
  };

  const formatDisplayDate = (dateStr: string) => {
    try {
      return new Date(dateStr + "T12:00:00").toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const formatDisplayTime = (timeStr: string) => {
    try {
      const [h, m] = timeStr.split(":");
      const d = new Date();
      d.setHours(parseInt(h, 10), parseInt(m, 10));
      return d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
    } catch {
      return timeStr;
    }
  };

  return (
    <section
      id="book"
      className="py-20 md:py-28 bg-section-purple relative overflow-hidden"
      aria-label="Book a table"
    >
      <StudioAmbience tone="purple" />
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
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
            <p className="text-xs uppercase tracking-[0.2em] text-paint-purple font-bold mb-3">
              Reserve Your Spot
            </p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-foreground">
              Book a Table
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
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
            {bookingSuccess ? (
              <div className="p-10 md:p-14 text-center max-w-lg mx-auto">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-5" />
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-2">
                  Booking Request Submitted
                </h3>
                <p className="text-muted-foreground text-sm mb-6">Your booking ID</p>
                <p
                  className="text-4xl font-mono font-bold text-primary tracking-widest mb-6"
                  data-testid="text-booking-id"
                >
                  {bookingSuccess.bookingId}
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 mb-6 text-left max-w-xs mx-auto">
                  <li>✔ Confirmation email sent to {bookingSuccess.email}</li>
                  <li>✔ Our team will contact you shortly</li>
                  <li>
                    ✔ {formatDisplayDate(bookingSuccess.date)} at{" "}
                    {formatDisplayTime(bookingSuccess.time)} · {bookingSuccess.guests} guests
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground mb-8">
                  Expected response time: within 2 hours
                </p>
                <button
                  type="button"
                  onClick={() => setBookingSuccess(null)}
                  className="px-6 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-muted transition-colors"
                  data-testid="button-book-another"
                >
                  Book another table
                </button>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-2/5 bg-tint-blue text-foreground p-8 md:p-10 flex flex-col justify-between gap-8">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-paint-blue mb-2">Find Us Here</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                      Walk-ins welcome, but a reservation guarantees your table and pottery station.
                    </p>
                    <ul className="space-y-5 text-muted-foreground">
                      <li className="flex items-start gap-4">
                        <MapPin className="w-5 h-5 text-paint-blue shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">Location</p>
                          <p className="text-sm leading-relaxed mt-0.5">
                            11, 80 Feet Rd, Koramangala 1st Block,
                            <br />
                            Bengaluru, Karnataka 560034
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <Clock className="w-5 h-5 text-paint-blue shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">Hours</p>
                          <p className="text-sm mt-0.5">Mon–Fri: 11:00 AM – 10:00 PM</p>
                          <p className="text-sm">Sat–Sun: 10:00 AM – 11:00 PM</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <Phone className="w-5 h-5 text-paint-blue shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">Call Us</p>
                          <a
                            href="tel:+919876543210"
                            className="text-sm hover:text-paint-blue transition-colors"
                            data-testid="link-book-phone"
                          >
                            +91 98765 43210
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-paint-blue/10 border border-paint-blue/20 p-5 text-sm text-muted-foreground leading-relaxed">
                    <p className="font-semibold text-foreground mb-1">Good to know</p>
                    Last pottery seating is 2 hours before closing. Wheel sessions require 24-hour
                    advance booking.
                  </div>
                </div>

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
                                <Input placeholder="Priya Sharma" {...field} className="bg-muted/40" data-testid="input-name" />
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
                                <Input placeholder="+91 98765 43210" {...field} className="bg-muted/40" data-testid="input-phone" />
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
                              <FormLabel>Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} className="bg-muted/40" data-testid="input-date" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="time"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Time</FormLabel>
                              <FormControl>
                                <Input type="time" {...field} className="bg-muted/40" data-testid="input-time" />
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
                          name="occasion"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Occasion</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-muted/40" data-testid="select-occasion">
                                    <SelectValue placeholder="Select occasion" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {occasionOptions.map((opt) => (
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
                        disabled={submitting}
                        data-testid="button-submit-booking"
                        className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-base hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 disabled:opacity-70 flex items-center justify-center gap-2"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" /> Submitting…
                          </>
                        ) : (
                          "Confirm Reservation"
                        )}
                      </button>

                      <p className="text-xs text-center text-muted-foreground">
                        You'll receive a booking ID and confirmation email. We'll confirm within 2
                        hours.
                      </p>
                    </form>
                  </Form>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
