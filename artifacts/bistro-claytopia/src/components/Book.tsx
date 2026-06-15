import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  date: z.string().min(1, "Date is required"),
  guests: z.string().min(1, "Number of guests is required"),
  experience: z.string().min(1, "Please select an experience"),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export function Book() {
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
    },
  });

  const onSubmit = (data: BookingFormValues) => {
    console.log("Booking data:", data);
    toast({
      title: "Booking Request Sent!",
      description: "We'll confirm your reservation shortly.",
    });
    form.reset();
  };

  return (
    <section id="book" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Texture overlay could go here */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-20 mix-blend-multiply" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-background rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          
          <div className="lg:w-2/5 bg-secondary text-secondary-foreground p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-serif font-bold mb-4 text-[#f5ebd9]">Reserve Your Spot</h2>
            <p className="mb-8 text-[#d4c5b0]">
              Weekends fill up fast! Book ahead to guarantee a table for painting or a slot on the pottery wheel.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-[#f5ebd9]">Location</h4>
                <p className="text-[#d4c5b0]">Koramangala 1st Block, Bengaluru</p>
              </div>
              <div>
                <h4 className="font-bold text-[#f5ebd9]">Hours</h4>
                <p className="text-[#d4c5b0]">11:00 AM – 11:00 PM (Mon-Sun)</p>
              </div>
              <div>
                <h4 className="font-bold text-[#f5ebd9]">Contact</h4>
                <p className="text-[#d4c5b0]">+91 98765 43210</p>
              </div>
            </div>
          </div>

          <div className="lg:w-3/5 p-10 bg-background text-foreground">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="bg-muted/50" />
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
                          <Input placeholder="john@example.com" type="email" {...field} className="bg-muted/50" />
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
                          <Input placeholder="+91 98765 43210" {...field} className="bg-muted/50" />
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
                          <Input type="datetime-local" {...field} className="bg-muted/50" />
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-muted/50">
                              <SelectValue placeholder="Select guests" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, "7+"].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num} {num === 1 ? 'Guest' : 'Guests'}</SelectItem>
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-muted/50">
                              <SelectValue placeholder="Select experience" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="paint">Paint Your Pottery</SelectItem>
                            <SelectItem value="wheel">Pottery Wheel Session</SelectItem>
                            <SelectItem value="dine">Just Dining</SelectItem>
                            <SelectItem value="event">Group Event / Party</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors shadow-md mt-4"
                >
                  Confirm Reservation
                </button>
              </form>
            </Form>
          </div>

        </div>
      </div>
    </section>
  );
}
