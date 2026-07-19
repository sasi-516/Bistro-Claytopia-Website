export interface MenuVariant {
  id: string;
  name: string;
  price: number;
}

export interface MenuAddon {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  /** Display override for dual pricing or ranges, e.g. "₹250 / ₹290" */
  priceLabel?: string;
  isVeg: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  spice?: 0 | 1 | 2;
  /** Size or style options (pizza, fries, etc.) */
  variants?: MenuVariant[];
  /** Optional paid extras (toppings, add-ons) */
  addons?: MenuAddon[];
}

export function itemNeedsCustomization(item: MenuItem): boolean {
  return Boolean(item.variants?.length || item.addons?.length);
}

export function formatMenuPrice(item: MenuItem): string {
  if (item.priceLabel) return item.priceLabel;
  if (item.variants?.length) {
    const prices = item.variants.map((v) => v.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `₹${min}` : `₹${min} / ₹${max}`;
  }
  return `₹${item.price}`;
}

export interface MenuCategory {
  id: string;
  name: string;
  subtitle: string;
  emoji: string;
  gradient: string;
  accentColor: string;
  /** Top-level menu section from the printed menu */
  section: string;
  items: MenuItem[];
}

export interface MenuSectionGroup {
  name: string;
  categories: MenuCategory[];
}

const GRADIENTS = [
  { gradient: "from-primary to-paint-yellow", accent: "#FFB703" },
  { gradient: "from-paint-orange to-primary", accent: "#FB5607" },
  { gradient: "from-paint-blue to-paint-mint", accent: "#3A86FF" },
  { gradient: "from-paint-pink to-paint-orange", accent: "#EF476F" },
  { gradient: "from-paint-purple to-paint-blue", accent: "#8338EC" },
  { gradient: "from-paint-mint to-paint-blue", accent: "#06D6A0" },
] as const;

const SECTION_ORDER = [
  "Bistro All Day",
  "Plates to Share",
  "Burgers",
  "Burgers & Sandwiches",
  "Main Course",
  "Beverages",
  "Beverages & Desserts",
  "Boba Bubble Tea",
] as const;

function burgerPortions(regular: number, large: number): MenuVariant[] {
  return [
    { id: "regular", name: "Regular", price: regular },
    { id: "large", name: "Large", price: large },
  ];
}

function vegNv(veg: number, nv: number): MenuVariant[] {
  return [
    { id: "veg", name: "Veg", price: veg },
    { id: "nv", name: "Non-Veg", price: nv },
  ];
}

function cat(
  id: string,
  name: string,
  subtitle: string,
  emoji: string,
  items: MenuItem[],
  idx: number,
  section: string
): MenuCategory {
  const theme = GRADIENTS[idx % GRADIENTS.length];
  return {
    id,
    name,
    subtitle,
    emoji,
    gradient: theme.gradient,
    accentColor: theme.accent,
    section,
    items,
  };
}

export const menuCategories: MenuCategory[] = [
  // ── 1. BISTRO ALL DAY — American Breakfast ──────────────────────────────
  cat(
    "american-breakfast",
    "American Breakfast",
    "Each platter served with hot tea/coffee, toast, butter and jam · ₹450 per platter",
    "🍳",
    [
      {
        id: "ab1",
        name: "Bistro Heavenly Rolls",
        description:
          "Mouth-watering eggs stuffed with cottage cheese and salami, cheese spread, served with hash browns and sautéed vegetables.",
        price: 450,
        isVeg: false,
        isPopular: true,
      },
      {
        id: "ab2",
        name: "Country Roads Take Me Home",
        description:
          "Double grilled sausages, cheesy scrambled eggs, rosemary grilled tomatoes, mushroom and hash brown.",
        price: 450,
        isVeg: false,
      },
      {
        id: "ab3",
        name: "Meat Bangers Breakie",
        description:
          "Grilled chicken, chicken sausage, two pieces chicken wings, cheesy scrambled eggs, mushroom and hashbrown.",
        price: 450,
        isVeg: false,
      },
      {
        id: "ab4",
        name: "Wowy Waffles",
        description:
          "Homemade waffles with powdered sugar, maple syrup, whipped cream, fried egg and breakfast sausage.",
        price: 450,
        isVeg: false,
        isPopular: true,
      },
      {
        id: "ab5",
        name: "The Choco-Coco Delight",
        description:
          "Chocolate chip pancakes with chocolate sauce, maple syrup, roasted potatoes, fried egg and breakfast sausage.",
        price: 450,
        isVeg: false,
      },
      {
        id: "ab6",
        name: "The Ooh La-La French Toast",
        description:
          "Homemade French toast, powdered sugar, maple syrup, breakfast sausage, scrambled eggs and hash brown.",
        price: 450,
        isVeg: false,
      },
    ],
    0,
    "Bistro All Day"
  ),

  // ── 2. Eggilicious! Waffles & Pancakes ──────────────────────────────────
  cat(
    "egglicious",
    "Eggilicious! Waffles & Pancakes",
    "All egg dishes served with toast, baked beans, butter & jam",
    "🥚",
    [
      {
        id: "eg1",
        name: "Exotic Masala Omlette",
        description: "Spiced masala omelette with toast, baked beans, butter and jam.",
        price: 290,
        isVeg: true,
        spice: 1,
      },
      {
        id: "eg2",
        name: "Scrambled Egg",
        description:
          "Soft scrambled eggs with toast, baked beans, butter and jam. Add extra vegetables, chicken or salami.",
        price: 290,
        isVeg: true,
        addons: [
          { id: "veg", name: "Extra vegetables", price: 70 },
          { id: "chicken", name: "Extra chicken", price: 70 },
          { id: "salami", name: "Extra salami", price: 70 },
        ],
      },
      {
        id: "eg3",
        name: "Sunny Side Up",
        description: "Classic sunny side up with toast, baked beans, butter and jam.",
        price: 280,
        isVeg: true,
      },
      {
        id: "eg4",
        name: "Mushroom and Cheese",
        description: "Mushroom and cheese omelette with toast, baked beans, butter and jam.",
        price: 300,
        isVeg: true,
      },
      {
        id: "eg5",
        name: "Chicken Salami and Cheese",
        description: "Chicken salami and cheese omelette with toast, baked beans, butter and jam.",
        price: 300,
        isVeg: false,
      },
      {
        id: "eg6",
        name: "Bistro Chicken Omlette",
        description: "House chicken omelette with toast, baked beans, butter and jam.",
        price: 310,
        isVeg: false,
        isPopular: true,
      },
      {
        id: "eg7",
        name: "Pancakes/Waffles",
        description:
          "Homemade pancakes or waffles. Add blueberry, chocolate, fresh cream or Nutella toppings.",
        price: 310,
        isVeg: true,
        addons: [
          { id: "blueberry", name: "Blueberry topping", price: 60 },
          { id: "chocolate", name: "Chocolate topping", price: 80 },
          { id: "cream", name: "Fresh cream", price: 80 },
          { id: "nutella", name: "Nutella", price: 80 },
        ],
      },
      {
        id: "eg8",
        name: "French Toast",
        description: "Golden French toast with toast, baked beans, butter and jam.",
        price: 310,
        isVeg: true,
      },
    ],
    1,
    "Bistro All Day"
  ),

  // ── 3. PLATES TO SHARE — Finger Food ────────────────────────────────────
  cat(
    "finger-food",
    "Finger Food",
    "Crispy shareable bites",
    "🍟",
    [
      {
        id: "ff1",
        name: "French Fries",
        description: "Choose plain, cheese or peri peri.",
        price: 220,
        priceLabel: "₹220 / ₹280",
        isVeg: true,
        variants: [
          { id: "plain", name: "Plain", price: 220 },
          { id: "cheese", name: "Cheese", price: 280 },
          { id: "peri", name: "Peri Peri", price: 280 },
        ],
      },
      { id: "ff2", name: "Potato Wedges", description: "Crispy seasoned potato wedges.", price: 270, isVeg: true },
      { id: "ff3", name: "Mint Melted Poppers", description: "Cheesy mint melted poppers.", price: 280, isVeg: true },
      { id: "ff4", name: "Cheesy Smiley", description: "Smiley potato bites with cheese.", price: 280, isVeg: true },
      { id: "ff5", name: "Potato Basket", description: "Assorted potato bites basket.", price: 380, isVeg: true },
      {
        id: "ff6",
        name: "Chicken Sausage Cheesy Fries",
        description: "Fries loaded with chicken sausage and cheese.",
        price: 380,
        isVeg: false,
      },
      {
        id: "ff7",
        name: "Chicken Nuggets Fries",
        description: "Fries topped with crispy chicken nuggets.",
        price: 380,
        isVeg: false,
      },
    ],
    2,
    "Plates to Share"
  ),

  cat(
    "garlic-bread",
    "Garlic Bread",
    "Warm, garlicky and cheesy",
    "🥖",
    [
      {
        id: "gb1",
        name: "Garlic Bread",
        description: "Choose plain or cheese garlic bread.",
        price: 180,
        priceLabel: "₹180 / ₹260",
        isVeg: true,
        isPopular: true,
        variants: [
          { id: "plain", name: "Plain", price: 180 },
          { id: "cheese", name: "Cheese", price: 260 },
        ],
      },
      {
        id: "gb2",
        name: "Spicy Supreme Garlic Bread",
        description: "Cheesy garlic bread with a spicy kick.",
        price: 290,
        isVeg: true,
        spice: 2,
      },
      { id: "gb3", name: "Bruschetta", description: "Tomato and herb bruschetta.", price: 260, isVeg: true },
    ],
    3,
    "Plates to Share"
  ),

  cat(
    "nachos",
    "Snack Up Nachos",
    "Loaded nachos, bistro style",
    "🌮",
    [
      {
        id: "nc1",
        name: "Mumbai Masala Nachos",
        description: "Masala-spiced loaded nachos.",
        price: 310,
        isVeg: true,
        spice: 1,
      },
      {
        id: "nc2",
        name: "Exotic Cheesy Sausage Nachos",
        description: "Sausage and cheese nachos.",
        price: 330,
        isVeg: false,
      },
      {
        id: "nc3",
        name: "Lakili Assorted Cheesy Nachos",
        description: "Assorted cheesy nacho platter.",
        price: 330,
        isVeg: true,
      },
    ],
    4,
    "Plates to Share"
  ),

  cat(
    "soups",
    "Healthy Noodle Soups",
    "Served with garlic bread · Veg / Non-veg where noted",
    "🍜",
    [
      {
        id: "sp1",
        name: "Thukpa (with mushroom)",
        description: "Claytopia-style noodles and vegetable soup.",
        price: 270,
        priceLabel: "₹270 / ₹310",
        isVeg: true,
        variants: vegNv(270, 310),
      },
      {
        id: "sp2",
        name: "Exotic Veggies (with or without mushroom)",
        description:
          "Noodles, broccoli, zucchini, bell peppers, gherkin, carrot, pak choi, cottage cheese and basil.",
        price: 290,
        isVeg: true,
      },
      {
        id: "sp3",
        name: "Assorted Wild Mushroom",
        description: "Noodles, assorted mushrooms, carrot, sesame, pak choi and spring onion.",
        price: 300,
        isVeg: true,
        isPopular: true,
      },
      {
        id: "sp4",
        name: "Herb Chicken and Mushroom Soup",
        description:
          "Noodles, exotic vegetables, mushroom, gherkin, sesame seeds, shredded chicken, coconut flavour and spring onion.",
        price: 360,
        isVeg: false,
      },
      {
        id: "sp5",
        name: "Spicy Minced Chicken",
        description:
          "Chicken mince, carrot, bell peppers, celery, spinach, jalapeños, chicken sausage, zucchini, Chinese cabbage, fried egg and spring onion.",
        price: 360,
        isVeg: false,
        spice: 2,
      },
    ],
    5,
    "Plates to Share"
  ),

  cat(
    "veg-starters",
    "Veg Starters",
    "Served with coleslaw",
    "🥗",
    [
      { id: "vs1", name: "Crispy Corn Fries", description: "Crispy corn fritters.", price: 360, isVeg: true },
      {
        id: "vs2",
        name: "Crispy Mushroom Salted Pepper",
        description: "Salt and pepper mushrooms.",
        price: 360,
        isVeg: true,
      },
      { id: "vs3", name: "Crispy Vegetables", description: "Assorted crispy vegetables.", price: 340, isVeg: true },
      {
        id: "vs4",
        name: "Spicy Sesame Baby Corn",
        description: "Sesame-coated spicy baby corn.",
        price: 340,
        isVeg: true,
        spice: 1,
      },
      {
        id: "vs5",
        name: "Basil Pesto Cottage Cheese",
        description: "Basil pesto cottage cheese bites.",
        price: 360,
        isVeg: true,
        isPopular: true,
      },
    ],
    0,
    "Plates to Share"
  ),

  cat(
    "nonveg-starters",
    "Non-Veg Starters",
    "Served with potato nuggets",
    "🍗",
    [
      { id: "nv1", name: "Sesame Crispy Chicken", description: "Sesame-coated crispy chicken.", price: 370, isVeg: false },
      {
        id: "nv2",
        name: "Spicy Chicken Strips",
        description: "Spicy fried chicken strips.",
        price: 370,
        isVeg: false,
        spice: 2,
      },
      {
        id: "nv3",
        name: "Honey Chilli Chicken",
        description: "Sweet and spicy honey chilli chicken.",
        price: 370,
        isVeg: false,
        isPopular: true,
        spice: 1,
      },
      { id: "nv4", name: "Hunan Chicken", description: "Bold Hunan-style chicken.", price: 370, isVeg: false, spice: 2 },
      {
        id: "nv5",
        name: "Butterfly Prawns (Asian version)",
        description: "Crispy butterfly prawns, Asian style.",
        price: 410,
        isVeg: false,
      },
      { id: "nv6", name: "BBQ Chicken Strips", description: "Smoky BBQ chicken strips.", price: 370, isVeg: false },
      { id: "nv7", name: "Juicy Bubble Shrimps", description: "Juicy bubble shrimp bites.", price: 430, isVeg: false },
    ],
    1,
    "Plates to Share"
  ),

  cat(
    "smokey-wings",
    "Our Famous Smokey Wings",
    "Served with fries",
    "🍗",
    [
      {
        id: "wg1",
        name: "Buffalo Wings",
        description: "Classic buffalo wings served with fries.",
        price: 380,
        isVeg: false,
        isPopular: true,
        spice: 2,
      },
      {
        id: "wg2",
        name: "Spicy Peri-Peri Wings",
        description: "Fiery peri peri wings served with fries.",
        price: 380,
        isVeg: false,
        spice: 2,
      },
      {
        id: "wg3",
        name: "Teriyaki Wings",
        description: "Glazed teriyaki wings served with fries.",
        price: 380,
        isVeg: false,
      },
    ],
    2,
    "Plates to Share"
  ),

  cat(
    "salads",
    "Salads",
    "Served with garlic bread",
    "🥬",
    [
      {
        id: "sl1",
        name: "Garden Salad",
        description:
          "Iceberg lettuce, olive, cottage cheese, basil, bell peppers, cherry tomatoes, gherkins and Italian herb dressing.",
        price: 310,
        isVeg: true,
      },
      {
        id: "sl2",
        name: "The Bistro Chicken",
        description:
          "Lettuce, cherry tomatoes, onions, bell peppers, olives, croutons, grilled chicken and mayo dressing.",
        price: 320,
        isVeg: false,
        isPopular: true,
      },
      {
        id: "sl3",
        name: "Classic Caesar Salad",
        description: "The all-time king of salads.",
        price: 290,
        priceLabel: "₹290 / ₹320",
        isVeg: true,
        variants: vegNv(290, 320),
      },
      {
        id: "sl4",
        name: "Tandoori Tossed Chicken Salad",
        description:
          "Tandoori-marinated roast chicken breast, olive oil tossed veggies and garlic sour sauce.",
        price: 320,
        isVeg: false,
        spice: 1,
      },
      {
        id: "sl5",
        name: "Exotic Sautéed Veggies",
        description: "Sautéed exotic vegetables with macaroni pasta.",
        price: 280,
        priceLabel: "₹280 / ₹320",
        isVeg: true,
        variants: vegNv(280, 320),
      },
    ],
    3,
    "Plates to Share"
  ),

  // ── 5. BURGERS ──────────────────────────────────────────────────────────
  cat(
    "burgers",
    "Burgers",
    "All burgers come with lettuce, onion, tomatoes and mayo — served hot & fresh",
    "🍔",
    [
      {
        id: "bg1",
        name: "Veggie Burger",
        description: "Crunchy veg delight.",
        price: 250,
        isVeg: true,
        variants: burgerPortions(250, 290),
      },
      {
        id: "bg2",
        name: "Roadside Rowdy",
        description: "Spicy veg burger.",
        price: 240,
        isVeg: true,
        spice: 1,
        variants: burgerPortions(240, 290),
      },
      {
        id: "bg3",
        name: "Classic Chicken",
        description: "Crispy patty sensation.",
        price: 280,
        isVeg: false,
      },
      {
        id: "bg4",
        name: "Grilled Lamb",
        description: "Scrumptious lamb burger.",
        price: 340,
        isVeg: false,
        variants: burgerPortions(340, 410),
      },
      {
        id: "bg5",
        name: "Tandoori Chicken",
        description: "Smoky spicy creamy tandoori chicken with lettuce, onion, tomatoes and cheese.",
        price: 280,
        isVeg: false,
        spice: 1,
        variants: burgerPortions(280, 340),
      },
      {
        id: "bg6",
        name: "BBQ Chicken",
        description: "BBQ chicken with lettuce, onion, gherkins and cheese.",
        price: 290,
        isVeg: false,
        variants: burgerPortions(290, 340),
      },
      {
        id: "bg7",
        name: "Chilly Chicken",
        description: "Super spicy chilly chicken with lettuce, onion and cheese.",
        price: 290,
        isVeg: false,
        spice: 2,
        variants: burgerPortions(290, 360),
      },
      {
        id: "bg8",
        name: "Heard A Lot Peri-Peri Chicken",
        description: "Peri-peri lovers' attitude burger.",
        price: 290,
        isVeg: false,
        spice: 2,
        isPopular: true,
        variants: burgerPortions(290, 350),
      },
    ],
    4,
    "Burgers"
  ),

  cat(
    "signature-burgers",
    "All Time Bistro Favourite!",
    "Served with chicken wings or veg nuggets, coleslaw and french fries",
    "⭐",
    [
      {
        id: "sb1",
        name: "Double Veggie Delight",
        description:
          "Crunchy veg patty with gherkins, cucumbers, tomatoes, onion, lettuce and cheese — comes with veg nuggets.",
        price: 320,
        isVeg: true,
      },
      {
        id: "sb2",
        name: "Crispy Cottage Cheesy",
        description:
          "Crispy cottage cheese, crunchy veg patty, lettuce, onion, tomatoes, gherkins and cheese — with veg nuggets.",
        price: 340,
        isVeg: true,
      },
      {
        id: "sb3",
        name: "The Bistro Chicken Burger",
        description: "Crispy chicken patty, fried egg and cheese — served with chicken wings.",
        price: 380,
        isVeg: false,
        isPopular: true,
      },
      {
        id: "sb4",
        name: "The Bistro Lamb",
        description:
          "Two lamb patties, fried egg, jalapeños, lettuce, tomatoes, onion, mushroom and cheese — with chicken wings.",
        price: 420,
        isVeg: false,
      },
    ],
    5,
    "Burgers"
  ),

  // ── 6. BURGERS & SANDWICHES ─────────────────────────────────────────────
  cat(
    "burger-combos",
    "Burger Combos",
    "Served with chicken wings, coleslaw, french fries and lemon mint mohito",
    "🍔",
    [
      {
        id: "bc1",
        name: "The Ultimate Chicken Sausage",
        description:
          "Chicken mortadella and chicken patty, cheese, fried egg, mushrooms, gherkins, onion, tomatoes and red paprika.",
        price: 460,
        isVeg: false,
      },
      {
        id: "bc2",
        name: "Spicy BBQ Chicken",
        description:
          "Chicken salami with spicy BBQ grilled chicken, fried egg, mushroom, lettuce, grilled tomatoes, gherkins, pepper and cheese.",
        price: 460,
        isVeg: false,
        spice: 1,
      },
      {
        id: "bc3",
        name: "Spicy Monstrous Lamb",
        description:
          "Two lamb patties, gherkins, fried egg, mushroom, cheese, onion, lettuce, tomatoes and red paprika.",
        price: 500,
        isVeg: false,
        spice: 2,
      },
    ],
    0,
    "Burgers & Sandwiches"
  ),

  cat(
    "sandwiches",
    "Sandwiches",
    "Served with smiley fries or chicken wings",
    "🥪",
    [
      {
        id: "sw1",
        name: "Veggie Supreme",
        description: "Lettuce, mushroom, gherkins, tomatoes, cucumber and cheese.",
        price: 300,
        isVeg: true,
      },
      {
        id: "sw2",
        name: "Ultimate Chicken Sandwich",
        description: "Fried eggs, mortadella chicken, paprika, lettuce, tomatoes and cheese.",
        price: 340,
        isVeg: false,
        isPopular: true,
      },
      {
        id: "sw3",
        name: "The Godfather",
        description: "Grilled chicken, salami, spicy peppers, lettuce, cucumber, fried eggs and cheese.",
        price: 350,
        isVeg: false,
      },
    ],
    1,
    "Burgers & Sandwiches"
  ),

  cat(
    "focaccia",
    "Herb Focaccia Sandwiches",
    "Served with coleslaw and french fries",
    "🥖",
    [
      {
        id: "fc1",
        name: "Asian Style Grilled Veggies",
        description: "Grilled Asian vegetables on herb focaccia.",
        price: 290,
        isVeg: true,
      },
      {
        id: "fc2",
        name: "Crumbled Cottage Cheese",
        description: "Crumbled cottage cheese on herb focaccia.",
        price: 300,
        isVeg: true,
      },
      {
        id: "fc3",
        name: "Smoky BBQ Chicken",
        description: "Smoky BBQ chicken on herb focaccia.",
        price: 310,
        isVeg: false,
      },
      {
        id: "fc4",
        name: "Creamy Spicy Chicken Tikka",
        description: "Creamy spicy chicken tikka on herb focaccia.",
        price: 310,
        isVeg: false,
        spice: 1,
      },
      {
        id: "fc5",
        name: "Focaccia Crumb Fried Chicken",
        description: "Crumb fried chicken on herb focaccia.",
        price: 310,
        isVeg: false,
      },
    ],
    2,
    "Burgers & Sandwiches"
  ),

  cat(
    "lasagna",
    "Bistro Claytopia Lasagna!",
    "Served with garlic bread",
    "🍝",
    [
      {
        id: "ls1",
        name: "Spinach and Corn Lasagna",
        description: "Spinach and sweet corn lasagna.",
        price: 370,
        isVeg: true,
      },
      {
        id: "ls2",
        name: "Herbs Mushroom and Cheese Lasagna",
        description: "Herbed mushroom and cheese lasagna.",
        price: 380,
        isVeg: true,
        isPopular: true,
      },
      {
        id: "ls3",
        name: "Grilled Chicken and Mushroom Lasagna",
        description: "Grilled chicken and mushroom lasagna.",
        price: 390,
        isVeg: false,
      },
    ],
    3,
    "Burgers & Sandwiches"
  ),

  // ── 7. MAIN COURSE — Italian Pasta ──────────────────────────────────────
  cat(
    "pasta",
    "Italian Pasta",
    "Served with garlic toast · Prices shown Veg / Non-veg",
    "🍝",
    [
      {
        id: "pa1",
        name: "Arabiatta",
        description: "Spicy tomato pasta.",
        price: 340,
        priceLabel: "Veg ₹340 / NV ₹370",
        isVeg: true,
        spice: 1,
        variants: vegNv(340, 370),
      },
      {
        id: "pa2",
        name: "Sicilliana",
        description: "Sicilian-style pasta.",
        price: 340,
        priceLabel: "Veg ₹340 / NV ₹380",
        isVeg: true,
        variants: vegNv(340, 380),
      },
      {
        id: "pa3",
        name: "Alfredo",
        description: "Creamy Alfredo pasta.",
        price: 340,
        priceLabel: "Veg ₹340 / NV ₹370",
        isVeg: true,
        isPopular: true,
        variants: vegNv(340, 370),
      },
      {
        id: "pa4",
        name: "Pasta Mediterranean",
        description: "Mediterranean herb pasta.",
        price: 340,
        priceLabel: "Veg ₹340 / NV ₹380",
        isVeg: true,
        variants: vegNv(340, 380),
      },
      {
        id: "pa5",
        name: "Spinach Pasta",
        description: "Spinach cream pasta.",
        price: 340,
        priceLabel: "Veg ₹340 / NV ₹370",
        isVeg: true,
        variants: vegNv(340, 370),
      },
      {
        id: "pa6",
        name: "Aglio-e-Olio (dry pasta)",
        description: "Garlic and olive oil dry pasta.",
        price: 330,
        priceLabel: "Veg ₹330 / NV ₹370",
        isVeg: true,
        variants: vegNv(330, 370),
      },
      {
        id: "pa7",
        name: "Bistro Chicken Pasta",
        description: "House chicken pasta.",
        price: 410,
        isVeg: false,
      },
      {
        id: "pa8",
        name: "Bistro Mix Mushroom",
        description: "Mixed mushroom pasta.",
        price: 390,
        isVeg: true,
      },
      {
        id: "pa9",
        name: "Spicy Chicken Sausage Pasta",
        description: "Spicy chicken sausage pasta.",
        price: 400,
        isVeg: false,
        spice: 1,
      },
      {
        id: "pa10",
        name: "Pesto Pasta (dry pasta)",
        description: "Basil pesto dry pasta.",
        price: 340,
        priceLabel: "Veg ₹340 / NV ₹380",
        isVeg: true,
        variants: vegNv(340, 380),
      },
      {
        id: "pa11",
        name: "Wild Mushroom Pasta",
        description: "Wild mushroom cream pasta.",
        price: 380,
        isVeg: true,
      },
      {
        id: "pa12",
        name: "Conchiglie Chicken Minced Pasta",
        description: "Shell pasta with minced chicken.",
        price: 400,
        isVeg: false,
      },
      {
        id: "pa13",
        name: "Conchiglie Pesto Prawns Pasta",
        description: "Pesto prawn shell pasta.",
        price: 410,
        isVeg: false,
      },
    ],
    4,
    "Main Course"
  ),

  cat(
    "pizza",
    "Pizza Mania",
    "Hand-tossed base · Regular 8\" · Large 10\"",
    "🍕",
    [
      {
        id: "pz1",
        name: "Margarita",
        description: "Traditional tomato base sauce with cherry tomatoes.",
        price: 320,
        priceLabel: "₹320 / ₹420",
        isVeg: true,
        isPopular: true,
        variants: [
          { id: "regular", name: 'Regular 8"', price: 320 },
          { id: "large", name: 'Large 10"', price: 420 },
        ],
      },
      {
        id: "pz2",
        name: "Kiddie Smiley Corn Pizza",
        description: "Tomato base, onions, corn and smilies.",
        price: 370,
        priceLabel: "₹370 / ₹450",
        isVeg: true,
        variants: [
          { id: "regular", name: 'Regular 8"', price: 370 },
          { id: "large", name: 'Large 10"', price: 450 },
        ],
      },
      {
        id: "pz3",
        name: "Veggie Exotic",
        description: "Bell peppers, onion, olive, broccoli and jalapeños.",
        price: 390,
        priceLabel: "₹390 / ₹470",
        isVeg: true,
        variants: [
          { id: "regular", name: 'Regular 8"', price: 390 },
          { id: "large", name: 'Large 10"', price: 470 },
        ],
      },
      {
        id: "pz4",
        name: "Mushroom Corn Delight",
        description: "Onions, mushroom, corn and jalapeños.",
        price: 400,
        priceLabel: "₹400 / ₹470",
        isVeg: true,
        variants: [
          { id: "regular", name: 'Regular 8"', price: 400 },
          { id: "large", name: 'Large 10"', price: 470 },
        ],
      },
      {
        id: "pz5",
        name: "Spicy Chicken Sausage",
        description: "Chicken sausages, onions, jalapeños, chillies and basil.",
        price: 400,
        priceLabel: "₹400 / ₹490",
        isVeg: false,
        spice: 1,
        variants: [
          { id: "regular", name: 'Regular 8"', price: 400 },
          { id: "large", name: 'Large 10"', price: 490 },
        ],
      },
      {
        id: "pz6",
        name: "Pesto Chicken",
        description: "Grilled pesto chicken and onion.",
        price: 400,
        priceLabel: "₹400 / ₹490",
        isVeg: false,
        variants: [
          { id: "regular", name: 'Regular 8"', price: 400 },
          { id: "large", name: 'Large 10"', price: 490 },
        ],
      },
      {
        id: "pz7",
        name: "Peri Peri Chicken",
        description: "Smoky peri peri, onions, jalapeños and basil.",
        price: 400,
        priceLabel: "₹400 / ₹500",
        isVeg: false,
        spice: 2,
        variants: [
          { id: "regular", name: 'Regular 8"', price: 400 },
          { id: "large", name: 'Large 10"', price: 500 },
        ],
      },
      {
        id: "pz8",
        name: "Chicken Tikka Pizza",
        description: "Tikka chicken, jalapeños and onions.",
        price: 390,
        priceLabel: "₹390 / ₹490",
        isVeg: false,
        spice: 1,
        variants: [
          { id: "regular", name: 'Regular 8"', price: 390 },
          { id: "large", name: 'Large 10"', price: 490 },
        ],
      },
      {
        id: "pz9",
        name: "Smoky Pesto Prawns Pizza",
        description: "Fired smoky prawns, onions and jalapeños.",
        price: 420,
        priceLabel: "₹420 / ₹520",
        isVeg: false,
        variants: [
          { id: "regular", name: 'Regular 8"', price: 420 },
          { id: "large", name: 'Large 10"', price: 520 },
        ],
      },
    ],
    5,
    "Main Course"
  ),

  cat(
    "pan-asian",
    "Bistro Pan Asian Specials",
    "Comes with in-house special salad, rice or noodles of choice",
    "🥢",
    [
      {
        id: "as1",
        name: "Asian Inspired Chicken Sausage",
        description: "Sausage marinated in Asian herbs, oriental mild BBQ sauce and sprout salad.",
        price: 410,
        isVeg: false,
      },
      {
        id: "as2",
        name: "Morem Shrimp and Coconut",
        description: "Myanmar-style roasted shrimp coconut curry with house salad.",
        price: 420,
        isVeg: false,
      },
      {
        id: "as3",
        name: "Hoisin Glazed Grilled Chicken",
        description: "Hoisin glazed grilled chicken — the name says everything!",
        price: 410,
        isVeg: false,
      },
      {
        id: "as4",
        name: "Schezwan Buddha",
        description: "Exotic veggies in classic Schezwan sauce.",
        price: 400,
        isVeg: true,
        spice: 2,
      },
      {
        id: "as5",
        name: "Sesame Teriyaki Chicken Noodles",
        description: "Chicken leg boneless tossed in Japanese teriyaki.",
        price: 410,
        isVeg: false,
        isPopular: true,
      },
      {
        id: "as6",
        name: "Yeoboseyo Korean Chicken",
        description: "Stir-fried noodles topped with hot chicken gravy.",
        price: 410,
        isVeg: false,
        spice: 1,
      },
      {
        id: "as7",
        name: "The Savor Bhutanese",
        description:
          "Butter-flavored steamed rice, Bhutanese minced chicken sauce, topped with cheese.",
        price: 410,
        isVeg: false,
      },
    ],
    0,
    "Main Course"
  ),

  cat(
    "european",
    "European Plate",
    "Served with mash potato, herb rice, salads and garlic bread",
    "🍽️",
    [
      {
        id: "eu1",
        name: "Mushroom and Chicken Stroganoff",
        description: "Their take on the classic stroganoff.",
        price: 410,
        isVeg: false,
      },
      {
        id: "eu2",
        name: "Grilled Chicken Habana Style",
        description: "Cuban spice chicken boneless, red pepper coulis and sautéed veggies.",
        price: 410,
        isVeg: false,
      },
      {
        id: "eu3",
        name: "Grilled Cottage Cheese",
        description: "Creamy sauce, grilled veggies and herb rice.",
        price: 410,
        isVeg: true,
      },
      {
        id: "eu4",
        name: "Prawn Skewers in House Sauce",
        description: "Herb prawns in secret house sauce.",
        price: 420,
        isVeg: false,
      },
      {
        id: "eu5",
        name: "Herb Roasted Chicken",
        description: "Pot roast chicken with roasted mashed potato.",
        price: 420,
        isVeg: false,
        isPopular: true,
      },
      {
        id: "eu6",
        name: "Hot Pot",
        description: "All-time customer favorite — ask server for details.",
        price: 390,
        priceLabel: "₹390 / ₹420",
        isVeg: true,
        variants: [
          { id: "veg", name: "Veg", price: 390 },
          { id: "chicken", name: "Chicken", price: 420 },
        ],
      },
      {
        id: "eu7",
        name: "Mushroom and Spinach Stuffed Chicken",
        description: "Chicken stuffed with cheese, spinach and mushroom.",
        price: 430,
        isVeg: false,
      },
      {
        id: "eu8",
        name: "Twin Chicken Steak (without rice)",
        description: "Twin steak, mashed potato, mushroom sauce and sautéed vegetables.",
        price: 410,
        isVeg: false,
      },
    ],
    1,
    "Main Course"
  ),

  // ── 9. BEVERAGES ────────────────────────────────────────────────────────
  cat(
    "hot-coffee",
    "Italian Hot Coffees",
    "Espresso bar classics",
    "☕",
    [
      {
        id: "hc1",
        name: "Cappuccino",
        description: "Espresso shot with foamed steam milk.",
        price: 200,
        isVeg: true,
        isPopular: true,
      },
      {
        id: "hc2",
        name: "Cafe Latte",
        description: "Single espresso shot with foamed steam milk.",
        price: 200,
        isVeg: true,
      },
      {
        id: "hc3",
        name: "Cafe Mocha",
        description: "Single espresso, foamed steam milk and chocolate syrup.",
        price: 200,
        isVeg: true,
      },
      {
        id: "hc4",
        name: "Espresso / Doppio",
        description: "35ml / 70ml shot of pure coffee extract.",
        price: 90,
        priceLabel: "₹90 / ₹120",
        isVeg: true,
        variants: [
          { id: "espresso", name: "Espresso (35ml)", price: 90 },
          { id: "doppio", name: "Doppio (70ml)", price: 120 },
        ],
      },
      {
        id: "hc5",
        name: "Cafe Americano",
        description: "Single espresso shot with hot water.",
        price: 140,
        isVeg: true,
      },
    ],
    2,
    "Beverages"
  ),

  cat(
    "bistro-special-coffee",
    "Bistro Special",
    "House signature hot coffees",
    "☕",
    [
      {
        id: "bs1",
        name: "Creamy Irish Coffee",
        description: "Espresso, steam milk, Irish cream and whipped cream.",
        price: 220,
        isVeg: true,
      },
      {
        id: "bs2",
        name: "Hazelnut Coffee",
        description: "Espresso, steamed milk, hazelnut and whipped cream.",
        price: 220,
        isVeg: true,
      },
      {
        id: "bs3",
        name: "Coorg Honey Coffee",
        description: "Strong latte, shot of honey and whipped cream.",
        price: 220,
        isVeg: true,
        isNew: true,
      },
    ],
    3,
    "Beverages"
  ),

  cat(
    "ice-coffee",
    "Original Ice Coffees",
    "Claytopia iced coffee favourites",
    "🧊",
    [
      { id: "ic1", name: "Classic Claypuccino", description: "House iced coffee.", price: 210, isVeg: true, isPopular: true },
      { id: "ic2", name: "Mocha Claypuccino", description: "Iced mocha claypuccino.", price: 220, isVeg: true },
      { id: "ic3", name: "Oreo Claypuccino", description: "Oreo blended claypuccino.", price: 220, isVeg: true, isPopular: true },
    ],
    4,
    "Beverages"
  ),

  cat(
    "mocktails",
    "Mocktails",
    "Refreshing non-alcoholic sips",
    "🍹",
    [
      { id: "mk1", name: "Lemon Mint Mojito", description: "Classic lemon mint mojito.", price: 220, isVeg: true, isPopular: true },
      { id: "mk2", name: "Berry Berry Spritzo", description: "Mixed berry spritz.", price: 220, isVeg: true },
      { id: "mk3", name: "Cranberry Craftlete", description: "Cranberry cooler.", price: 220, isVeg: true },
      { id: "mk4", name: "Blue Curacao", description: "Blue curacao mocktail.", price: 220, isVeg: true },
      { id: "mk5", name: "Green Tea Cucumint", description: "Green tea and cucumber refresher.", price: 250, isVeg: true, isNew: true },
      { id: "mk6", name: "Lemonmint Honey Balm", description: "Honey balm refresher.", price: 250, isVeg: true },
    ],
    5,
    "Beverages"
  ),

  cat(
    "shakes",
    "Shakes",
    "Thick and indulgent",
    "🥤",
    [
      { id: "sh1", name: "Choconutty Shakes", description: "Chocolate nut shake.", price: 260, isVeg: true, isPopular: true },
      { id: "sh2", name: "Oreo Shake", description: "Classic Oreo shake.", price: 260, isVeg: true },
      { id: "sh3", name: "Red Velvet Shake", description: "Red velvet shake.", price: 260, isVeg: true },
      { id: "sh4", name: "Choco Frappe Shake", description: "Chocolate frappe shake.", price: 260, isVeg: true },
      { id: "sh5", name: "Brownie Shake", description: "Brownie milkshake.", price: 280, isVeg: true },
      { id: "sh6", name: "Ferrero Rocher Shake", description: "Ferrero Rocher shake.", price: 280, isVeg: true, isPopular: true },
      { id: "sh7", name: "Kitkat Shake", description: "KitKat milkshake.", price: 260, isVeg: true },
      { id: "sh8", name: "Crumbled Apple Shake", description: "Apple crumble shake.", price: 260, isVeg: true },
      { id: "sh9", name: "Oats and Dry Fruits", description: "Healthy oats and dry fruits shake.", price: 280, isVeg: true },
    ],
    0,
    "Beverages"
  ),

  cat(
    "special-cold-coffee",
    "Special Cold Coffees",
    "Signature blended cold coffees",
    "🧊",
    [
      {
        id: "sc1",
        name: "The Lawrence of Arabia",
        description: "Espresso, milk, honey, whipped cream and fig.",
        price: 240,
        isVeg: true,
      },
      {
        id: "sc2",
        name: "Irish Dream",
        description: "Espresso blended with milk, Irish cream and fresh cream.",
        price: 240,
        isVeg: true,
      },
      {
        id: "sc3",
        name: "Double Choco Cream Claypucino",
        description: "Espresso, cream milk, chocolate, fresh cream and choco chips.",
        price: 240,
        isVeg: true,
      },
      {
        id: "sc4",
        name: "Crazy Nutty Hazelnut",
        description: "Espresso, double scoop ice cream, milk, hazelnut, cream and nuts.",
        price: 240,
        isVeg: true,
      },
      {
        id: "sc5",
        name: "Bistro Caramello",
        description: "Espresso, ice cream, butterscotch, fresh cream and crunchy brittles.",
        price: 240,
        isVeg: true,
      },
    ],
    1,
    "Beverages"
  ),

  // ── 10. BEVERAGES & DESSERTS ───────────────────────────────────────────
  cat(
    "hot-tea",
    "Hot Tea",
    "All served as tea bags",
    "🍵",
    [
      { id: "ht1", name: "Lemon / Masala / Assam", description: "Choice of classic teas.", price: 140, isVeg: true },
      { id: "ht2", name: "Darjeeling / Mint", description: "Darjeeling or mint tea.", price: 140, isVeg: true },
      { id: "ht3", name: "Green Tea", description: "Light green tea.", price: 160, isVeg: true },
      { id: "ht4", name: "Teapot", description: "Full teapot for sharing — check availability.", price: 260, isVeg: true },
    ],
    2,
    "Beverages & Desserts"
  ),

  cat(
    "other-drinks",
    "Others",
    "Refreshers and essentials",
    "🧃",
    [
      { id: "od1", name: "Fresh Lime Soda", description: "Sweet or salted.", price: 170, isVeg: true },
      { id: "od2", name: "Fresh Lime Water", description: "Fresh lime water.", price: 160, isVeg: true },
      {
        id: "od3",
        name: "Water",
        description: "Bottled water.",
        price: 12,
        priceLabel: "₹12 / ₹25",
        isVeg: true,
        variants: [
          { id: "small", name: "Small", price: 12 },
          { id: "large", name: "Large", price: 25 },
        ],
      },
      { id: "od4", name: "Hot Chocolate Drinks", description: "Rich hot chocolate.", price: 200, isVeg: true },
    ],
    3,
    "Beverages & Desserts"
  ),

  cat(
    "health-teas",
    "Health Teas",
    "Served with tea pot",
    "🍵",
    [
      { id: "he1", name: "Chamomile Tea", description: "Calming chamomile herbal tea.", price: 280, isVeg: true },
      { id: "he2", name: "Butterfly Pea Tea", description: "Butterfly pea herbal tea.", price: 280, isVeg: true, isNew: true },
      { id: "he3", name: "Hibiscus Tea", description: "Hibiscus herbal tea.", price: 280, isVeg: true },
      { id: "he4", name: "Peppermint Tea", description: "Peppermint herbal tea.", price: 280, isVeg: true },
      { id: "he5", name: "Jasmine Tea", description: "Jasmine herbal tea.", price: 280, isVeg: true },
    ],
    4,
    "Beverages & Desserts"
  ),

  cat(
    "ice-tea-coffee",
    "Ice Tea & Ice Coffee",
    "Chilled tea and coffee",
    "🧊",
    [
      { id: "it1", name: "Lemon Ice Tea", description: "Iced lemon tea.", price: 190, isVeg: true },
      { id: "it2", name: "Peach Ice Tea", description: "Iced peach tea.", price: 210, isVeg: true },
      { id: "it3", name: "Ice Americano", description: "Iced Americano.", price: 190, isVeg: true },
      { id: "it4", name: "Ice Latte", description: "Iced café latte.", price: 200, isVeg: true },
    ],
    5,
    "Beverages & Desserts"
  ),

  cat(
    "desserts",
    "Desserts",
    "Sweet endings",
    "🍰",
    [
      { id: "ds1", name: "Chocolate Truffle", description: "Rich chocolate truffle slice.", price: 230, isVeg: true, isPopular: true },
      { id: "ds2", name: "Blueberry Cheese Cake", description: "Creamy blueberry cheesecake.", price: 260, isVeg: true, isPopular: true },
      { id: "ds3", name: "Warm Brownie", description: "Warm chocolate brownie.", price: 230, isVeg: true },
      { id: "ds4", name: "Red Velvet Cake", description: "Classic red velvet.", price: 230, isVeg: true },
      { id: "ds5", name: "Chocolate Mousse Cake", description: "Light chocolate mousse.", price: 230, isVeg: true },
      { id: "ds6", name: "Tiramisu Cake", description: "Coffee-soaked tiramisu.", price: 260, isVeg: true },
    ],
    0,
    "Beverages & Desserts"
  ),

  cat(
    "cupcakes",
    "Cupcakes",
    "Baked treats",
    "🧁",
    [
      { id: "cp1", name: "Roasted Almond Cupcake", description: "Roasted almond cupcake.", price: 160, isVeg: true },
      { id: "cp2", name: "Vanilla Cupcake", description: "Classic vanilla cupcake.", price: 140, isVeg: true },
    ],
    1,
    "Beverages & Desserts"
  ),

  cat(
    "kombucha",
    "Kombucha",
    "Fermented tea — check availability of flavors",
    "🫧",
    [
      { id: "kb1", name: "Kombucha", description: "House kombucha — ask server for available flavors.", price: 270, isVeg: true, isNew: true },
    ],
    2,
    "Beverages & Desserts"
  ),

  cat(
    "ice-cream-delight",
    "Ice Cream Delight",
    "Served with two scoops of ice cream",
    "🍨",
    [
      { id: "id1", name: "Hot Chocolate Sundae", description: "Hot chocolate with ice cream.", price: 330, isVeg: true },
      { id: "id2", name: "Giant Brownie with Ice Cream", description: "Brownie sundae.", price: 330, isVeg: true, isPopular: true },
      { id: "id3", name: "Claytopia Mudpie with Ice Cream", description: "House mudpie sundae.", price: 330, isVeg: true, isPopular: true },
      { id: "id4", name: "Crumble Apple with Ice Cream", description: "Apple crumble sundae.", price: 330, isVeg: true },
      { id: "id5", name: "Blueberry Cheese Cake with Ice Cream", description: "Cheesecake sundae.", price: 350, isVeg: true },
      { id: "id6", name: "Tiramisu Cake with Ice Cream", description: "Tiramisu sundae.", price: 350, isVeg: true },
    ],
    3,
    "Beverages & Desserts"
  ),

  // ── 11. BOBA BUBBLE TEA ─────────────────────────────────────────────────
  cat(
    "boba-tea",
    "Boba Tea",
    "Milk tea with tapioca pearls",
    "🧋",
    [
      {
        id: "bt1",
        name: "Thai Boba Tea",
        description: "Milk, tea concentrate, carnation and tapioca pearl.",
        price: 350,
        isVeg: true,
        isPopular: true,
      },
      {
        id: "bt2",
        name: "Taro Boba Tea",
        description: "Milk, taro tea and tapioca pearl.",
        price: 350,
        isVeg: true,
      },
      {
        id: "bt3",
        name: "Matcha Boba Tea",
        description: "Milk, matcha extract, tea and tapioca pearl.",
        price: 350,
        isVeg: true,
      },
      {
        id: "bt4",
        name: "Bubblegum Boba",
        description: "Bubblegum milk tea with tapioca pearl.",
        price: 350,
        isVeg: true,
        isNew: true,
      },
    ],
    4,
    "Boba Bubble Tea"
  ),

  cat(
    "popping-mohito",
    "Popping Mohito",
    "Mohito with popping boba",
    "🍹",
    [
      {
        id: "pm1",
        name: "Mint Popping Mohito",
        description: "Classic peppermint mohito with popping boba.",
        price: 300,
        isVeg: true,
      },
      {
        id: "pm2",
        name: "Berry's Popping Mohito",
        description: "Mix of berry mohito with popping boba.",
        price: 300,
        isVeg: true,
      },
      {
        id: "pm3",
        name: "Chatmasa Mohito",
        description: "Spice mix mango mohito with popping boba.",
        price: 300,
        isVeg: true,
        spice: 1,
      },
      {
        id: "pm4",
        name: "Passion Fruit Mohito",
        description: "Passion fruit popping mohito.",
        price: 300,
        isVeg: true,
      },
    ],
    5,
    "Boba Bubble Tea"
  ),

  cat(
    "matcha-flavour",
    "Matcha Flavour",
    "Iced matcha lattes",
    "🍵",
    [
      {
        id: "mf1",
        name: "Strawberry Matcha",
        description: "Iced strawberry latte with creamy whisked matcha.",
        price: 350,
        isVeg: true,
      },
      {
        id: "mf2",
        name: "Mango Matcha",
        description: "Iced mango matcha latte.",
        price: 350,
        isVeg: true,
      },
      {
        id: "mf3",
        name: "Pistachio Matcha",
        description: "Creamy pistachio matcha with rich nutty flavor.",
        price: 350,
        isVeg: true,
      },
    ],
    0,
    "Boba Bubble Tea"
  ),

  cat(
    "hot-matcha",
    "Hot Matcha",
    "Steamed milk matcha lattes",
    "🍵",
    [
      {
        id: "hm1",
        name: "Classic Matcha Latte",
        description: "Steamed milk with matcha powder.",
        price: 300,
        isVeg: true,
      },
      {
        id: "hm2",
        name: "Hazelnut Latte Matcha",
        description: "Steamed milk with hazelnut flavor.",
        price: 300,
        isVeg: true,
      },
      {
        id: "hm3",
        name: "Caramel Matcha Latte",
        description: "Steamed milk with caramel flavor.",
        price: 300,
        isVeg: true,
      },
      {
        id: "hm4",
        name: "Irish Matcha Latte",
        description: "Steamed milk with Irish flavor.",
        price: 300,
        isVeg: true,
      },
    ],
    1,
    "Boba Bubble Tea"
  ),

  cat(
    "bistro-boba",
    "Bistro Boba",
    "Premium cream cheese boba creations",
    "🧋",
    [
      {
        id: "bb1",
        name: "Taro Cream Cheese Boba",
        description: "Taro tapioca pearl, cream cheese topping and popping boba.",
        price: 380,
        isVeg: true,
        isPopular: true,
      },
      {
        id: "bb2",
        name: "Thai Biscuity Cheese Boba",
        description: "Cookies and cream tea, tapioca pearl, whipped cream and popping boba.",
        price: 380,
        isVeg: true,
      },
      {
        id: "bb3",
        name: "Cheese Chocolatea Boba",
        description: "Creamy chocolate shake, cream cheese, tapioca pearl, cocoa nuts and popping boba.",
        price: 380,
        isVeg: true,
      },
    ],
    2,
    "Boba Bubble Tea"
  ),
];

export function getMenuSections(): MenuSectionGroup[] {
  return SECTION_ORDER.map((name) => ({
    name,
    categories: menuCategories.filter((c) => c.section === name),
  })).filter((s) => s.categories.length > 0);
}

export function getAllMenuItems(): MenuItem[] {
  return menuCategories.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, category: cat.id } as MenuItem & { category: string }))
  );
}

export function getCategoryById(id: string): MenuCategory | undefined {
  return menuCategories.find((c) => c.id === id);
}
