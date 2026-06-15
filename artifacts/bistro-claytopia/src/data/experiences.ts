export interface SubExperience {
  title: string;
  desc: string;
}

export interface HowStep {
  title: string;
  desc: string;
}

export interface Experience {
  id: string;
  title: string;
  tagline: string;
  shortDesc: string;
  description: string;
  image: string;
  subExperiences: SubExperience[];
  howItWorks: HowStep[];
  bookingValue: string;
  metaTitle: string;
  metaDescription: string;
  duration: string;
  price: string;
  highlight: string;
}

export const experiences: Experience[] = [
  {
    id: "paint",
    title: "Paint Your Pottery",
    tagline: "Signature Pottery Experiences",
    shortDesc:
      "Choose a blank ceramic piece, paint it with vibrant glazes, and we'll fire it into a food-safe masterpiece ready to collect in 2–3 weeks.",
    description:
      "These are some of the ways people love to spend time with us. Whether you're planning a date, a family outing, or just want to try something new, we've got a spot for you. No experience needed — our team is always around to help with stencils, inspiration, and technique.",
    image: "/images/painting.png",
    subExperiences: [
      {
        title: "Pottery Wheel Sessions",
        desc: "Get hands-on with clay and create something uniquely yours.",
      },
      {
        title: "Café & Clay Dates",
        desc: "Enjoy coffee and pastries while you paint or sculpt together.",
      },
      {
        title: "Birthday Celebrations",
        desc: "Bring your group for a creative party with food and pottery fun.",
      },
      {
        title: "Family Workshops",
        desc: "Learn pottery basics as a family and take home your creations.",
      },
    ],
    howItWorks: [
      {
        title: "Choose Your Piece",
        desc: "Pick from 100+ blank ceramic pieces — mugs, bowls, plates, planters, and more.",
      },
      {
        title: "Paint & Glaze",
        desc: "Use our vibrant, non-toxic glazes and brushes to bring your design to life.",
      },
      {
        title: "We Fire It",
        desc: "Leave it with us — we'll clear-glaze and kiln-fire your piece to perfection.",
      },
      {
        title: "Collect Your Art",
        desc: "Return in 2–3 weeks to pick up your glossy, food-safe, one-of-a-kind ceramic.",
      },
    ],
    bookingValue: "paint",
    metaTitle: "Paint Your Pottery | Bistro Claytopia – Koramangala, Bangalore",
    metaDescription:
      "Paint your own pottery at Bistro Claytopia in Koramangala, Bangalore. Choose a ceramic piece, paint it with glazes, and collect your fired masterpiece in 2–3 weeks.",
    duration: "1.5 – 2 hours",
    price: "Starting ₹599",
    highlight: "100+ ceramic pieces to choose from",
  },
  {
    id: "wheel",
    title: "Pottery Wheel",
    tagline: "Hands-On Clay Shaping",
    shortDesc:
      "Feel clay spin between your fingers. Our guided wheel sessions are beginner-friendly and genuinely therapeutic — perfect for dates, teams, and curious minds.",
    description:
      "There's nothing quite like the meditative rhythm of clay on a spinning wheel. Our expert instructors walk you through every step — centering, opening, pulling walls — so you can focus on the joy of creating. Sessions are small, personal, and always memorable.",
    image: "/images/wheel.png",
    subExperiences: [
      {
        title: "Solo Discovery Sessions",
        desc: "Learn at your own pace with one-on-one guidance from our instructors.",
      },
      {
        title: "Date Night on the Wheel",
        desc: "A romantic, hands-on experience you'll laugh and create through together.",
      },
      {
        title: "Corporate Team Building",
        desc: "Unique workshops that spark collaboration, creativity, and great conversations.",
      },
      {
        title: "Weekend Masterclasses",
        desc: "Go deeper with technique — centering, pulling walls, and finishing forms.",
      },
    ],
    howItWorks: [
      {
        title: "Gear Up",
        desc: "We provide aprons — wear clothes you're comfortable getting clay on.",
      },
      {
        title: "Learn the Basics",
        desc: "Your instructor covers centering, opening, and pulling walls in the first 15 minutes.",
      },
      {
        title: "Throw Your Piece",
        desc: "Create your form on the wheel — bowl, cup, or free-form sculpture.",
      },
      {
        title: "We Fire & Deliver",
        desc: "We dry, bisque-fire, and glaze your piece. Ready to collect in 2–3 weeks.",
      },
    ],
    bookingValue: "wheel",
    metaTitle: "Pottery Wheel Sessions | Bistro Claytopia – Koramangala, Bangalore",
    metaDescription:
      "Book a pottery wheel session at Bistro Claytopia in Koramangala, Bangalore. Guided beginner-friendly sessions for couples, teams, and solo visitors. All skill levels welcome.",
    duration: "45 – 60 minutes",
    price: "Starting ₹799",
    highlight: "Expert instructor included",
  },
  {
    id: "dine",
    title: "Café & Dining",
    tagline: "Creative Fuel, Beautifully Served",
    shortDesc:
      "Artisanal coffee, indulgent desserts, fresh continental plates, and a menu that keeps pace with your creative energy. Dine solo or pair it with pottery.",
    description:
      "Our café is a destination in itself. From specialty espresso to hearty continental plates and decadent desserts, every dish is crafted to complement your creative session. Pull up a chair, order your favourite, and let the afternoon stretch out at your pace.",
    image: "/images/food.png",
    subExperiences: [
      {
        title: "Café & Clay Dates",
        desc: "The classic Claytopia experience — great food with a pottery session side by side.",
      },
      {
        title: "Continental Small Plates",
        desc: "Burgers, pasta, bruschetta, and seasonal specials crafted fresh daily.",
      },
      {
        title: "Dessert & Coffee Corner",
        desc: "Specialty espresso drinks, waffles, cakes, and pastries to sweeten any moment.",
      },
      {
        title: "Mocktail & Beverage Bar",
        desc: "Creative house mocktails, iced teas, lemonades, and refreshing coolers.",
      },
    ],
    howItWorks: [
      {
        title: "Walk In or Book Ahead",
        desc: "Reserve a table or walk in — we always keep a few tables open for drop-ins.",
      },
      {
        title: "Browse the Menu",
        desc: "Our team will guide you through today's specials and seasonal highlights.",
      },
      {
        title: "Dine & Create",
        desc: "Eat at your own pace — pottery stations are just steps away if you want to paint too.",
      },
      {
        title: "Linger As Long as You Like",
        desc: "This is a café — there's no rush. Stay, create, relax.",
      },
    ],
    bookingValue: "dine",
    metaTitle: "Café & Dining | Bistro Claytopia – Food in Koramangala, Bangalore",
    metaDescription:
      "Enjoy artisanal coffee, continental food, desserts, and mocktails at Bistro Claytopia's café in Koramangala, Bangalore. Perfect alongside a pottery session.",
    duration: "Open visit — no time limit",
    price: "À la carte from ₹150",
    highlight: "Full café menu, all day",
  },
  {
    id: "knitting",
    title: "Knitting Studio",
    tagline: "Stitch, Sip & Slow Down",
    shortDesc:
      "Choose your yarn, pick up the needles, and let our instructors guide you through the meditative art of knitting — all while sipping something warm from the café.",
    description:
      "Our knitting studio is a calm corner of creativity designed to help you slow down. Whether you're a complete beginner or picking up an old hobby, our instructors make it accessible and genuinely enjoyable. Pair with a warm drink from the café and spend an afternoon well.",
    image: "/images/hero.png",
    subExperiences: [
      {
        title: "Beginner Drop-In Classes",
        desc: "Start from scratch — casting on, knit stitch, and finishing your first piece.",
      },
      {
        title: "Date Night Knitting",
        desc: "A slow, cozy, and surprisingly fun couples' activity with coffee and snacks.",
      },
      {
        title: "Kids' Yarn Play",
        desc: "Fun, tactile fibre-craft sessions specially designed for little hands.",
      },
      {
        title: "Custom Project Sessions",
        desc: "Bring your own pattern or pick one of ours — scarves, pouches, plant hangers, and more.",
      },
    ],
    howItWorks: [
      {
        title: "Choose Your Yarn",
        desc: "Pick from our curated selection of soft yarns in beautiful seasonal colours.",
      },
      {
        title: "Learn the Stitches",
        desc: "Our instructors teach you at your pace — casting on, knit, purl, and binding off.",
      },
      {
        title: "Work on Your Project",
        desc: "Spend 1–2 hours in our studio creating your piece — scarves, beanies, totes, and more.",
      },
      {
        title: "Take It Home",
        desc: "Your finished piece leaves with you the same day. No waiting required!",
      },
    ],
    bookingValue: "knitting",
    metaTitle: "Knitting Studio | Bistro Claytopia – Koramangala, Bangalore",
    metaDescription:
      "Join the knitting studio at Bistro Claytopia in Koramangala, Bangalore. Beginner classes, date nights, and custom projects. Stitch, sip, and slow down.",
    duration: "1 – 2 hours",
    price: "Starting ₹499",
    highlight: "Take your project home the same day",
  },
];

export function getExperienceById(id: string): Experience | undefined {
  return experiences.find((e) => e.id === id);
}
