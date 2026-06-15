import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Review {
  name: string;
  location: string;
  rating: number;
  text: string;
  experience: string;
  initials: string;
  color: string;
}

const reviews: Review[] = [
  {
    name: "Ananya Krishnamurthy",
    location: "Indiranagar, Bengaluru",
    rating: 5,
    text: "Came here for a date night and ended up booking again for my birthday! The pottery wheel session was incredible — our instructor was so patient and funny. The food was genuinely good too, not just a side thought. The mug I made sits on my desk at work and I get asked about it every week.",
    experience: "Pottery Wheel",
    initials: "AK",
    color: "bg-amber-100 text-amber-800",
  },
  {
    name: "Rohan Mehta",
    location: "Koramangala, Bengaluru",
    rating: 5,
    text: "Took my team here for an offsite and honestly it was the best team-building activity we've ever done. No awkward trust falls — just clay, coffee, and a lot of laughter. Everyone left with something they made themselves. Already planning the next one.",
    experience: "Corporate Team Building",
    initials: "RM",
    color: "bg-blue-100 text-blue-800",
  },
  {
    name: "Priya & Arjun S.",
    location: "Jayanagar, Bengaluru",
    rating: 5,
    text: "Best date spot in Bangalore — period. We painted pottery for 2 hours, had the most delicious waffles, and completely forgot about our phones. Picking up our pieces 3 weeks later felt like Christmas morning. We're already planning a monthly tradition.",
    experience: "Café & Clay Date",
    initials: "PA",
    color: "bg-rose-100 text-rose-800",
  },
  {
    name: "Sunita Rao",
    location: "HSR Layout, Bengaluru",
    rating: 5,
    text: "Brought my 7-year-old daughter here and she hasn't stopped talking about it. The staff were so wonderful with kids — patient, encouraging, and fun. She painted a bowl for her grandma and was so proud of it. The café menu had great options for kids too.",
    experience: "Family Workshop",
    initials: "SR",
    color: "bg-green-100 text-green-800",
  },
  {
    name: "Vikram Nair",
    location: "Whitefield, Bengaluru",
    rating: 5,
    text: "Came in completely sceptical — I'm not an 'artsy' person at all. Left with a hand-thrown bowl I'm genuinely proud of and a plan to come back every month. The knitting studio is a hidden gem too — tried it on a whim and it was strangely meditative.",
    experience: "Pottery Wheel + Knitting",
    initials: "VN",
    color: "bg-purple-100 text-purple-800",
  },
  {
    name: "Meera Iyer",
    location: "Sarjapur, Bengaluru",
    rating: 5,
    text: "Organised my sister's birthday here and they were absolutely amazing to work with. The team helped customise the package, the food was excellent, and every single guest walked away having painted their own pottery. My sister said it was her favourite birthday ever.",
    experience: "Birthday Celebration",
    initials: "MI",
    color: "bg-amber-100 text-amber-800",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}
        />
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section
      id="reviews"
      className="py-20 md:py-28 bg-card overflow-hidden"
      aria-label="Guest reviews"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">
            Guest Stories
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-5">
            What Our Guests Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Over a thousand handmade memories created. Here are a few of our favourites.
          </p>
        </motion.div>

        {/* Review grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {reviews.map((review, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              data-testid={`card-review-${i}`}
              className="break-inside-avoid bg-background rounded-2xl border border-border/60 p-7 hover:shadow-md transition-shadow duration-300"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-primary/20 mb-4" aria-hidden="true" />

              {/* Review text */}
              <p className="text-foreground/85 text-sm leading-relaxed mb-6">
                "{review.text}"
              </p>

              {/* Experience tag */}
              <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary mb-5">
                {review.experience}
              </span>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${review.color}`}
                  aria-hidden="true"
                >
                  {review.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.location}</p>
                </div>
                <div className="ml-auto">
                  <StarRating rating={review.rating} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Overall rating summary */}
        <motion.div
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 py-8 px-8 bg-background rounded-2xl border border-border/60 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center sm:text-left">
            <p className="text-5xl font-serif font-bold text-primary">4.9</p>
            <div className="flex justify-center sm:justify-start gap-1 my-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Average guest rating</p>
          </div>
          <div className="hidden sm:block w-px h-16 bg-border" />
          <div className="text-center sm:text-left space-y-1">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">1,200+</span> reviews on Google & Zomato
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">95%</span> guests recommend us
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Top Rated</span> on TripAdvisor Bangalore
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
