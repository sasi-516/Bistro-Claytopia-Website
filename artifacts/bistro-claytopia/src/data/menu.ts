export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  isVeg: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  spice?: 0 | 1 | 2;
}

export interface MenuCategory {
  id: string;
  name: string;
  subtitle: string;
  emoji: string;
  gradient: string;
  accentColor: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: "coffee",
    name: "Coffee & Hot Drinks",
    subtitle: "Crafted to fuel your creativity",
    emoji: "☕",
    gradient: "from-amber-900 to-amber-700",
    accentColor: "#78350f",
    items: [
      { id: "c1", name: "Single Origin Espresso", description: "A bold, well-rounded shot from our house roast. No frills, just pure coffee.", price: 120, isVeg: true, isPopular: true },
      { id: "c2", name: "Cappuccino", description: "Velvety microfoam over a double shot — balanced, creamy, and just right.", price: 160, isVeg: true },
      { id: "c3", name: "Café Latte", description: "Double espresso with steamed milk in a 6oz ratio. Ask for oat milk — we have it.", price: 170, isVeg: true, isPopular: true },
      { id: "c4", name: "Masala Chai", description: "Our kitchen chai — cardamom, ginger, cinnamon, and whole-leaf assam tea.", price: 90, isVeg: true },
      { id: "c5", name: "Belgian Hot Chocolate", description: "Rich Callebaut dark chocolate, steamed whole milk, and a hint of vanilla.", price: 190, isVeg: true },
      { id: "c6", name: "Matcha Latte", description: "Ceremonial grade matcha from Kyoto, whisked with oat milk. Earthy and smooth.", price: 200, isVeg: true, isNew: true },
    ],
  },
  {
    id: "cold",
    name: "Cold Drinks & Mocktails",
    subtitle: "Cool, creative, and completely refreshing",
    emoji: "🧋",
    gradient: "from-sky-800 to-teal-600",
    accentColor: "#0f766e",
    items: [
      { id: "d1", name: "Cold Brew Coffee", description: "12-hour steeped, served over ice with condensed milk or black — your call.", price: 200, isVeg: true, isPopular: true },
      { id: "d2", name: "Iced Matcha Latte", description: "Ceremonial matcha over ice with oat milk and a touch of honey.", price: 220, isVeg: true, isNew: true },
      { id: "d3", name: "Mango & Basil Cooler", description: "Fresh mango pulp, basil seeds, a squeeze of lime, and sparkling water.", price: 180, isVeg: true, isPopular: true },
      { id: "d4", name: "Watermelon Mint Juice", description: "100% fresh watermelon, blended with mint leaves and a pinch of sea salt.", price: 150, isVeg: true },
      { id: "d5", name: "Classic Lemonade", description: "House-squeezed, gently sweetened with raw honey. Still or sparkling.", price: 130, isVeg: true },
      { id: "d6", name: "Rose & Lychee Mocktail", description: "Lychee, rose syrup, citrus, and sparkling water. Florally refreshing.", price: 190, isVeg: true, isNew: true },
    ],
  },
  {
    id: "breakfast",
    name: "Breakfast & Brunch",
    subtitle: "The perfect start to a creative morning",
    emoji: "🍳",
    gradient: "from-orange-700 to-yellow-600",
    accentColor: "#c2410c",
    items: [
      { id: "b1", name: "Avocado Toast", description: "Sourdough, smashed avocado, cherry tomatoes, chilli flakes, and a poached egg.", price: 310, isVeg: false, isPopular: true },
      { id: "b2", name: "Fluffy Pancake Stack", description: "Three Japanese-style pancakes, maple syrup, whipped butter, and seasonal berries.", price: 340, isVeg: true, isPopular: true },
      { id: "b3", name: "Eggs Benedict", description: "Two poached eggs on toasted brioche with spinach, hollandaise, and capers.", price: 370, isVeg: false },
      { id: "b4", name: "Acai Granola Bowl", description: "Frozen acai blended base, house granola, banana, honey, and chia seeds.", price: 280, isVeg: true, isNew: true },
      { id: "b5", name: "Full Veg Breakfast", description: "Two eggs your way, mushrooms, grilled tomatoes, baked beans, and sourdough toast.", price: 380, isVeg: true },
    ],
  },
  {
    id: "mains",
    name: "Mains & Continental",
    subtitle: "Thoughtful plates, crafted from scratch daily",
    emoji: "🍝",
    gradient: "from-red-900 to-rose-700",
    accentColor: "#9f1239",
    items: [
      { id: "m1", name: "Classic Bistro Burger", description: "Double smash patty, cheddar, caramelised onion, pickles, and house aioli on a brioche bun.", price: 420, isVeg: false, isPopular: true },
      { id: "m2", name: "Mushroom Truffle Pasta", description: "Pappardelle tossed with wild mushrooms, truffle oil, parmesan, and fresh thyme.", price: 440, isVeg: true, isPopular: true },
      { id: "m3", name: "Pesto Gnocchi", description: "House potato gnocchi, basil pesto, roasted cherry tomatoes, and pine nuts.", price: 400, isVeg: true },
      { id: "m4", name: "Caesar Salad", description: "Crisp romaine, house Caesar dressing, garlic croutons, and Parmigiano shavings.", price: 300, isVeg: true },
      { id: "m5", name: "Grilled Chicken Club", description: "Toasted sourdough, herb-grilled chicken, bacon, egg, lettuce, tomato, and chipotle mayo.", price: 380, isVeg: false },
      { id: "m6", name: "Quattro Formaggi Pizza", description: "Thin crust, mozzarella, cheddar, gorgonzola, and gouda. Drizzled with truffle honey.", price: 490, isVeg: true, isNew: true },
    ],
  },
  {
    id: "desserts",
    name: "Desserts & Sweets",
    subtitle: "Every meal deserves a sweet finale",
    emoji: "🍮",
    gradient: "from-pink-800 to-rose-500",
    accentColor: "#9d174d",
    items: [
      { id: "sw1", name: "Belgian Waffles", description: "Crispy outside, fluffy inside — served with Nutella, strawberries, and whipped cream.", price: 290, isVeg: true, isPopular: true },
      { id: "sw2", name: "New York Cheesecake", description: "Dense, creamy cheesecake on a butter-biscuit base with a berry compote.", price: 260, isVeg: true, isPopular: true },
      { id: "sw3", name: "Warm Brownie Sundae", description: "Fudgy chocolate brownie, Madagascan vanilla ice cream, and salted caramel sauce.", price: 280, isVeg: true },
      { id: "sw4", name: "Crème Brûlée", description: "Silky vanilla custard with a perfectly torched caramel crust. The classic.", price: 290, isVeg: true },
      { id: "sw5", name: "Tiramisu", description: "Ladyfingers soaked in espresso, layered with mascarpone, and dusted with cocoa.", price: 270, isVeg: true, isNew: true },
    ],
  },
  {
    id: "pottery-special",
    name: "The Pottery Special",
    subtitle: "Only at Claytopia — food meets art",
    emoji: "🏺",
    gradient: "from-stone-700 to-amber-800",
    accentColor: "#78350f",
    items: [
      { id: "ps1", name: "Clay Bowl Soup of the Day", description: "Chef's seasonal soup — served in a handcrafted Claytopia clay bowl. Bowl is yours to keep!", price: 280, isVeg: true, isPopular: true, isNew: true },
      { id: "ps2", name: "Studio Platter", description: "A sharing spread of mezze, dips, pita, and small bites — served on a hand-painted ceramic board.", price: 480, isVeg: true, isPopular: true },
      { id: "ps3", name: "Pottery Tea Service", description: "A full pot of your chosen tea with a hand-thrown teacup set. Perfect for two.", price: 320, isVeg: true },
    ],
  },
];

export function getAllMenuItems(): MenuItem[] {
  return menuCategories.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, category: cat.id } as MenuItem & { category: string }))
  );
}

export function getCategoryById(id: string): MenuCategory | undefined {
  return menuCategories.find((c) => c.id === id);
}
