export type MenuItem = {
  name: string;
  /** Price in rupees. Use an array for tiered pricing (e.g. single / double / triple). */
  price: number | number[];
  priceNote?: string;
  description?: string;
  veg?: boolean;
  signature?: boolean;
};

export type MenuGroup = {
  title: string;
  note?: string;
  items: MenuItem[];
};

export type MenuCategory = {
  id: string;
  /** Short label used on the signature cards. */
  label: string;
  /** Long editorial title used inside the menu. */
  title: string;
  kicker: string;
  blurb: string;
  image: string;
  groups: MenuGroup[];
};

export const menu: MenuCategory[] = [
  {
    id: "burgers",
    label: "Burgers",
    title: "Burgers",
    kicker: "The reason people drive here",
    blurb:
      "Hand-ground patties, in-house seasoning blends and a bed of cowboy candy under almost every one. Built on the pass, an arm's length from your table.",
    image: "/images/food-1.jpg",
    groups: [
      {
        title: "From the griddle",
        items: [
          {
            name: "Smashterpiece",
            price: [700, 900, 1200],
            priceNote: "single / double / triple",
            description:
              "A double smashed burger available in chicken, mutton or buffalo variants.",
            signature: true,
          },
          {
            name: "Buffalo Tenderloin Burger",
            price: 1000,
            description:
              "A hand-ground succulent burger topped with two slices of cheese on a bed of pickles and finished with our signature ranch.",
          },
          {
            name: "Mutton Burger",
            price: 700,
            description:
              "A custom-ground mutton patty with our in-house seasoning blend, cooked to medium, topped with cheese and ranch, served on a bed of cowboy candy.",
          },
          {
            name: "Chicken Burger",
            price: 500,
            description:
              "A custom-ground chicken patty seasoned with our in-house spice blend, topped with melted cheese and signature ranch on a bed of cowboy candy.",
          },
          {
            name: "Teriyaki Chicken Burger",
            price: 500,
            description:
              "Handcrafted chicken patty with a pineapple ring, pickled ginger and teriyaki glaze.",
          },
          {
            name: "The Baloo Burger",
            price: 1100,
            description:
              "Our signature chicken bacon burger stacked on top of our mutton bacon burger, on a bed of cowboy candy and topped with ranch.",
            signature: true,
          },
        ],
      },
      {
        title: "Add-ons",
        items: [
          {
            name: "Bourbon Mushroom",
            price: 400,
            description:
              "Mushrooms sautéed in butter and deglazed with bourbon whiskey, placed atop your choice of burger.",
          },
          {
            name: "Texas Outlaw",
            price: 200,
            description:
              "Onion rings and bacon on top of any burger with our signature bourbon BBQ sauce.",
          },
        ],
      },
    ],
  },
  {
    id: "sandwiches",
    label: "Sandwiches & Dogs",
    title: "Sandwiches, Dogs & Salads",
    kicker: "Two hands required",
    blurb:
      "Griddled paninis, slow-cooked pork and toasted dogs. If it isn't messy, it isn't American.",
    image: "/images/food-2.jpg",
    groups: [
      {
        title: "Sandwiches",
        items: [
          {
            name: "Philadelphia Chicken Cheesesteak",
            price: 600,
            description:
              "Julienned chicken tenders sautéed with multi-colour peppers, onions and mushrooms, seasoned with oregano, drizzled with ranch and cheese on a bed of cowboy candy.",
            signature: true,
          },
          {
            name: "Fried Chicken Sandwich",
            price: 600,
            description:
              "Two slices of chicken breast, battered and deep fried, served on a panini with cheese and our signature ranch.",
          },
          {
            name: "Pulled Pork Sandwich",
            price: 600,
            description:
              "Pork roasted slowly for over eighteen hours until it falls off the bone, sautéed in our bourbon BBQ sauce and served on a panini with cheese.",
          },
          {
            name: "The Inferno",
            price: 700,
            description:
              "Two slices of battered, deep-fried chicken breast tossed in our Fire in the Hole chilli sauce, served on a panini with cheese and ranch.",
          },
        ],
      },
      {
        title: "Hot Dogs",
        items: [
          {
            name: "The Classic",
            price: 500,
            description:
              "Two chicken hot dogs on toasted buns with cowboy candy and ranch.",
          },
          {
            name: "Bacon and Cheese Dog",
            price: 600,
            description:
              "Two chicken hot dogs with bacon and cheese on toasted buns, cowboy candy and ranch.",
          },
        ],
      },
      {
        title: "Salads",
        items: [
          {
            name: "The Diva",
            price: [500, 800],
            priceNote: "plain / with bacon",
            description:
              "Iceberg lettuce, fresh fruit, sweet chilli, ranch and exotic vegetables. Available in paneer or grilled chicken.",
          },
        ],
      },
    ],
  },
  {
    id: "finger-foods",
    label: "Finger Foods",
    title: "Finger Foods",
    kicker: "Order for the table",
    blurb:
      "Fries four ways and wings that come in two temperatures — medium spicy, and consequences.",
    image: "/images/food-3.jpg",
    groups: [
      {
        title: "Fries",
        items: [
          { name: "Plain", price: 300, veg: true },
          { name: "Cheesy", price: 400, veg: true },
          { name: "Nutella", price: 500, veg: true },
          { name: "Bacon and Cheese", price: 500 },
        ],
      },
      {
        title: "Chicken Wings",
        items: [
          {
            name: "Buffalo Style",
            price: 500,
            description: "Medium spicy.",
            signature: true,
          },
          {
            name: "Fire in the Hole",
            price: 600,
            description: "Flaming hot.",
          },
        ],
      },
      {
        title: "And other delicacies",
        items: [
          { name: "Fried Chicken Strips with Ranch", price: 600 },
          { name: "Deep Fried Mushrooms with Ranch", price: 400, veg: true },
        ],
      },
    ],
  },
  {
    id: "green-side",
    label: "On The Green Side",
    title: "On The Green Side",
    kicker: "For the plant-loving fanatics",
    blurb:
      "Paneer, tofu chorizo and a quinoa black bean patty — treated with exactly the same seasoning discipline as everything else on the griddle.",
    image: "/images/food-4.jpg",
    groups: [
      {
        title: "Veg Section",
        note: "Paneer, tofu and other goodies.",
        items: [
          {
            name: "Quinoa Blackbean Burger",
            price: 600,
            veg: true,
            description:
              "Quinoa slow cooked with sundried tomatoes and chipotle chillies, with Mexican black beans formed into a succulent patty, served on a nest of pickles, topped with cheese and signature ranch.",
          },
          {
            name: "Texas BBQ Ranch Paneer Burger",
            price: 600,
            veg: true,
            description:
              "A thick fresh paneer patty topped with cheese and an onion ring tower, served on a fresh bun with our signature pickles and dripping in ranch.",
            signature: true,
          },
          {
            name: "Sriracha Mango Paneer",
            price: 600,
            veg: true,
            description:
              "A thick fresh paneer patty topped with fresh mango slices, served atop a nest of homemade pickle and drizzled with sriracha.",
          },
          {
            name: "Mushroom Paneer",
            price: 600,
            veg: true,
            description:
              "Sautéed mushrooms atop a thick fresh paneer patty topped with cheese, served on a fresh bun with our signature pickles and ranch.",
          },
          {
            name: "Pancho Villa",
            price: 600,
            veg: true,
            description:
              "A tofu chorizo burger topped with cheddar and ranch, served on a bed of our very own cowboy candy.",
          },
          {
            name: "Montezuma's Revenge",
            price: 600,
            veg: true,
            description:
              "Two tofu chorizo hot dogs on toasted buns with cowboy candy, topped with cheese and ranch.",
          },
          {
            name: "Double Dhamaka",
            price: 700,
            veg: true,
            description:
              "Twin tofu smash patties with cheddar cheese and vegan bacon jam.",
          },
          {
            name: "Philadelphia Paneer Sandwich",
            price: 600,
            veg: true,
            description:
              "Sliced paneer sautéed with julienned exotic peppers and mushrooms, served on a bed of pickle with cheese and ranch on a multigrain panini.",
          },
        ],
      },
    ],
  },
  {
    id: "watering-hole",
    label: "The Watering Hole",
    title: "The Watering Hole",
    kicker: "Coffee, shakes and cold things",
    blurb:
      "Vietnamese cold coffee, a California date shake and a Mexican hot chocolate that arrives under a cloud of whipped cream.",
    image: "/images/food-5.jpg",
    groups: [
      {
        title: "Coffee & Chocolate",
        items: [
          { name: "Cappuccino", price: 200, veg: true },
          { name: "Cold Coffee", price: 300, veg: true },
          { name: "Vietnamese Cold Coffee", price: 300, veg: true, signature: true },
          {
            name: "Mexican Hot Chocolate",
            price: 250,
            veg: true,
            description: "With whipped cream.",
          },
        ],
      },
      {
        title: "Shakes",
        items: [
          { name: "California Date Shake", price: 300, veg: true, signature: true },
          { name: "Oreo Shake", price: 300, veg: true },
          { name: "Berry Shake", price: 300, veg: true },
        ],
      },
      {
        title: "Cold & Refreshing",
        items: [
          { name: "Assorted Soft Drinks", price: 100, veg: true },
          { name: "Ice Tea", price: 100, veg: true },
          { name: "Fresh Lime", price: 100, veg: true },
          { name: "Kombucha", price: 300, veg: true },
          { name: "Red Bull", price: 300, veg: true },
        ],
      },
    ],
  },
  {
    id: "desserts",
    label: "Guilty Pleasures",
    title: "Guilty Pleasures",
    kicker: "Save room. Or don't.",
    blurb:
      "Our original cheesecake, artisanal cupcakes and a maple bacon sundae that makes far more sense than it sounds.",
    image: "/images/food-6.jpg",
    groups: [
      {
        title: "Desserts",
        items: [
          { name: "Aleen's Artisanal Cupcakes", price: 150, veg: true },
          {
            name: "The Showstopper",
            price: 500,
            veg: true,
            description: "Our original cheesecake.",
            signature: true,
          },
          { name: "Maple Bacon Ice Cream Sundae", price: 600 },
          { name: "Banana's Foster", price: 600, veg: true },
          { name: "The All American Banana Split", price: 500, veg: true },
          {
            name: "Cookies and Cream Gourmet Ice Cream Sandwich",
            price: 500,
            description:
              "Available in veg and non-veg. Ice cream by BiknBay, gourmet cookies by Oloaf Bakery.",
          },
        ],
      },
      {
        title: "Take a jar home",
        items: [
          { name: "Cowboy Candy Jar", price: 500, veg: true },
          { name: "Ranch Dressing Jar", price: 500, veg: true },
        ],
      },
    ],
  },
];

/** Guests whose orders became permanent menu items. Straight off the printed menu. */
export const inspirations = [
  { name: "Ekam Bedi", dish: "the Whatchamacallit" },
  { name: "Karansher Dhillon", dish: "the Smashterpiece" },
  { name: "Divpreet Kaur", dish: "the Diva Salad" },
  { name: "Jas K Shan", dish: "the Lindy Hop — Nutella fries" },
  { name: "Bhavkaran Singh", dish: "the Bourbon Mushroom Burger" },
  { name: "Robin Nakai", dish: "the Baloo Burger" },
  { name: "Craig Shoemaker", dish: "the Philadelphia Cheesesteak" },
  { name: "Kartik, Avi & Ankit", dish: "the 3 Musketeer Wings — fire in the hole" },
  { name: "Taran Singh", dish: "the OG Buffalo Wings" },
  { name: "Sanam Sekhon & Shivani Parmar", dish: "the Outside Groove" },
  { name: "Tweaktone Studios", dish: "the Tweaker Burger" },
];

export const challenge = {
  title: "The Empire State Burger Challenge",
  weight: "2.25 kg",
  soloRecord: "10:12",
  recordHolder: "Devan Markanda, Sector 16 Chandigarh",
  recordDate: "December 2016",
  tandem: "No tandem champion yet.",
  buyIn: "₹5,000",
  prize: "₹11,000 cash or UPI, a champion's shirt and a trophy",
  time: "Sundays at 1:30 PM",
  rules: [
    "Solo challengers must beat the standing record of 10 minutes 12 seconds.",
    "Tandem teams get all the time they need to plan the split. The clock starts when the picks come out — then twelve minutes to divide and finish.",
    "Once the burger is divided there is no sharing, and both partners must be done before the timer.",
    "Challenges are prebooked, one a week, paid in full in advance.",
  ],
};

export function formatPrice(price: number | number[]) {
  if (Array.isArray(price)) return price.map((p) => `₹${p}`).join(" / ");
  return `₹${price}`;
}
