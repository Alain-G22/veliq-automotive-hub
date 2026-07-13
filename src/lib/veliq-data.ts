import catSuv from "@/assets/cat-suv.jpg";
import catSedan from "@/assets/cat-sedan.jpg";
import catLuxury from "@/assets/cat-luxury.jpg";
import catElectric from "@/assets/cat-electric.jpg";
import catPickup from "@/assets/cat-pickup.jpg";
import catHatchback from "@/assets/cat-hatchback.jpg";

export interface Category {
  name: string;
  image: string;
  icon: string;
  slug: string;
}

export const categories: Category[] = [
  { name: "SUVs", image: catSuv, icon: "Truck", slug: "suv" },
  { name: "Sedans", image: catSedan, icon: "Car", slug: "sedan" },
  { name: "Luxury", image: catLuxury, icon: "Gem", slug: "luxury" },
  { name: "Electric", image: catElectric, icon: "Zap", slug: "electric" },
  { name: "Pickup", image: catPickup, icon: "Truck", slug: "pickup" },
  { name: "Hatchback", image: catHatchback, icon: "CarFront", slug: "hatchback" },
];

export const brands: string[] = [
  "Toyota",
  "Honda",
  "Lexus",
  "BMW",
  "Mercedes-Benz",
  "Hyundai",
  "Kia",
  "Volkswagen",
  "Ford",
  "Nissan",
];

export interface Vehicle {
  id: string;
  name: string;
  image: string;
  price: string;
  year: number;
  fuel: string;
  transmission: string;
  mileage: string;
  badge?: string;
}

export const featuredVehicles: Vehicle[] = [
  {
    id: "lucid-air",
    name: "Lucid Air Grand Touring",
    image: catSedan,
    price: "$87,400",
    year: 2024,
    fuel: "Electric",
    transmission: "Automatic",
    mileage: "512 mi range",
    badge: "Editor's Pick",
  },
  {
    id: "range-suv",
    name: "Apex GT SUV",
    image: catSuv,
    price: "$64,900",
    year: 2024,
    fuel: "Hybrid",
    transmission: "Automatic",
    mileage: "8,200 mi",
    badge: "New",
  },
  {
    id: "gt-coupe",
    name: "Aurora GT Coupe",
    image: catLuxury,
    price: "$112,500",
    year: 2023,
    fuel: "Petrol",
    transmission: "Dual-Clutch",
    mileage: "3,150 mi",
  },
  {
    id: "iq-electric",
    name: "Volt iQ Electric",
    image: catElectric,
    price: "$54,300",
    year: 2024,
    fuel: "Electric",
    transmission: "Automatic",
    mileage: "486 mi range",
    badge: "Best Value",
  },
  {
    id: "ranger-pro",
    name: "Ranger Pro 4x4",
    image: catPickup,
    price: "$48,750",
    year: 2023,
    fuel: "Diesel",
    transmission: "Manual",
    mileage: "12,400 mi",
  },
  {
    id: "city-hatch",
    name: "City Hatch Turbo",
    image: catHatchback,
    price: "$27,900",
    year: 2024,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "5,600 mi",
    badge: "Popular",
  },
];

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
}

export const articles: Article[] = [
  {
    id: "best-evs-2024",
    title: "The 10 Best Electric Cars to Buy in 2024",
    excerpt:
      "From long-range luxury sedans to affordable commuters, these EVs lead the pack on value and technology.",
    category: "Buying Guide",
    readTime: "8 min read",
    image: catElectric,
  },
  {
    id: "suv-vs-sedan",
    title: "SUV vs Sedan: Which One Actually Fits Your Life?",
    excerpt:
      "We break down cost, comfort, safety and running expenses to help you choose with confidence.",
    category: "Comparison",
    readTime: "6 min read",
    image: catSuv,
  },
  {
    id: "first-car-guide",
    title: "How to Buy Your First Car Without Overpaying",
    excerpt:
      "A step-by-step negotiation and inspection checklist every first-time buyer should read.",
    category: "Advice",
    readTime: "10 min read",
    image: catSedan,
  },
];

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Priya Sharma",
    role: "First-time buyer",
    initials: "PS",
    quote:
      "Veliq's comparison tools made choosing my first car effortless. I saved over $3,000 by knowing exactly what to look for.",
  },
  {
    name: "Marcus Lee",
    role: "EV enthusiast",
    initials: "ML",
    quote:
      "The buying guides are genuinely honest. No fluff, just clear data that helped me pick the right electric SUV.",
  },
  {
    name: "Amara Okafor",
    role: "Family of five",
    initials: "AO",
    quote:
      "Finally a car platform that feels premium and trustworthy. The reviews are detailed and beautifully presented.",
  },
];
