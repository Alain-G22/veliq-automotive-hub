import catSuv from "@/assets/cat-suv.jpg";
import catSedan from "@/assets/cat-sedan.jpg";
import catLuxury from "@/assets/cat-luxury.jpg";
import catElectric from "@/assets/cat-electric.jpg";
import catPickup from "@/assets/cat-pickup.jpg";
import catHatchback from "@/assets/cat-hatchback.jpg";

import corolla from "@/assets/cars/corolla.jpg";
import camry from "@/assets/cars/camry.jpg";
import accord from "@/assets/cars/accord.jpg";
import rx350 from "@/assets/cars/rx350.jpg";
import highlander from "@/assets/cars/highlander.jpg";
import c300 from "@/assets/cars/c300.jpg";
import x5 from "@/assets/cars/x5.jpg";
import elantra from "@/assets/cars/elantra.jpg";
import sportage from "@/assets/cars/sportage.jpg";
import altima from "@/assets/cars/altima.jpg";

export type BodyType = "Sedan" | "SUV" | "Luxury" | "Hatchback" | "Pickup" | "Electric";

export interface Category {
  name: string;
  image: string;
  icon: string;
  slug: BodyType;
}

export const categories: Category[] = [
  { name: "SUVs", image: catSuv, icon: "Truck", slug: "SUV" },
  { name: "Sedans", image: catSedan, icon: "Car", slug: "Sedan" },
  { name: "Luxury", image: catLuxury, icon: "Gem", slug: "Luxury" },
  { name: "Electric", image: catElectric, icon: "Zap", slug: "Electric" },
  { name: "Pickup", image: catPickup, icon: "Truck", slug: "Pickup" },
  { name: "Hatchback", image: catHatchback, icon: "CarFront", slug: "Hatchback" },
];

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  bodyType: BodyType;
  year: number;
  fuel: "Petrol" | "Diesel" | "Hybrid" | "Electric";
  transmission: "Automatic" | "Manual";
  mileage: string;
  priceNGN: number;
  image: string;
  badge?: string;
  featured?: boolean;
  description: string;
}

const formatNaira = (n: number) =>
  `₦${n.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`;

const rawVehicles: Omit<Vehicle, "price"> & { price?: string }[] = [
  {
    id: "toyota-corolla-2016",
    name: "Toyota Corolla LE 2016",
    brand: "Toyota",
    model: "Corolla",
    bodyType: "Sedan",
    year: 2016,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "98,000 km",
    priceNGN: 14_500_000,
    image: corolla,
    badge: "Popular",
    featured: true,
    description:
      "A clean Tokunbo Corolla LE — fuel efficient, reliable and easy to maintain. Perfect first car.",
  },
  {
    id: "toyota-camry-2018",
    name: "Toyota Camry SE 2018",
    brand: "Toyota",
    model: "Camry",
    bodyType: "Sedan",
    year: 2018,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "76,000 km",
    priceNGN: 24_800_000,
    image: camry,
    badge: "Editor's Pick",
    featured: true,
    description:
      "Fresh Foreign-used Camry SE with sport trim, leather interior, backup camera and full options.",
  },
  {
    id: "honda-accord-2017",
    name: "Honda Accord Sport 2017",
    brand: "Honda",
    model: "Accord",
    bodyType: "Sedan",
    year: 2017,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "84,500 km",
    priceNGN: 21_500_000,
    image: accord,
    featured: true,
    description:
      "Well maintained Accord Sport with paddle shifters, sunroof and premium audio.",
  },
  {
    id: "lexus-rx350-2016",
    name: "Lexus RX 350 2016",
    brand: "Lexus",
    model: "RX 350",
    bodyType: "Luxury",
    year: 2016,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "92,000 km",
    priceNGN: 52_000_000,
    image: rx350,
    badge: "Best Value",
    featured: true,
    description:
      "Foreign-used RX 350 F Sport package — panoramic roof, heated leather seats, Mark Levinson audio.",
  },
  {
    id: "toyota-highlander-2017",
    name: "Toyota Highlander XLE 2017",
    brand: "Toyota",
    model: "Highlander",
    bodyType: "SUV",
    year: 2017,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "88,000 km",
    priceNGN: 42_500_000,
    image: highlander,
    featured: true,
    description:
      "Family-ready 7-seater Highlander XLE, second row captain chairs, powered tailgate.",
  },
  {
    id: "mercedes-c300-2017",
    name: "Mercedes-Benz C300 4MATIC 2017",
    brand: "Mercedes-Benz",
    model: "C300",
    bodyType: "Luxury",
    year: 2017,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "72,000 km",
    priceNGN: 36_500_000,
    image: c300,
    badge: "New Arrival",
    featured: true,
    description:
      "Sharp C300 4MATIC with AMG styling package, burmester sound and full leather interior.",
  },
  {
    id: "bmw-x5-2015",
    name: "BMW X5 xDrive35i 2015",
    brand: "BMW",
    model: "X5",
    bodyType: "Luxury",
    year: 2015,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "108,000 km",
    priceNGN: 46_000_000,
    image: x5,
    description:
      "Powerful X5 xDrive35i in Space Grey — head-up display, 360 camera, panoramic sunroof.",
  },
  {
    id: "hyundai-elantra-2018",
    name: "Hyundai Elantra SE 2018",
    brand: "Hyundai",
    model: "Elantra",
    bodyType: "Sedan",
    year: 2018,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "68,000 km",
    priceNGN: 15_800_000,
    image: elantra,
    description:
      "Economical Elantra SE with Bluetooth, CarPlay, rear camera and full auction history.",
  },
  {
    id: "kia-sportage-2017",
    name: "Kia Sportage EX 2017",
    brand: "Kia",
    model: "Sportage",
    bodyType: "SUV",
    year: 2017,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "82,000 km",
    priceNGN: 22_500_000,
    image: sportage,
    description:
      "Foreign-used Sportage EX with leather, panoramic roof and dynamic bending headlights.",
  },
  {
    id: "nissan-altima-2018",
    name: "Nissan Altima SL 2018",
    brand: "Nissan",
    model: "Altima",
    bodyType: "Sedan",
    year: 2018,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "79,000 km",
    priceNGN: 18_500_000,
    image: altima,
    description:
      "Altima SL with heated leather seats, Bose audio, remote start and blind-spot monitoring.",
  },
];

export const vehicles: Vehicle[] = rawVehicles.map((v) => ({
  ...v,
  price: formatNaira(v.priceNGN),
})) as Vehicle[];

export const featuredVehicles = vehicles.filter((v) => v.featured);

export const brands: string[] = Array.from(new Set(vehicles.map((v) => v.brand))).sort();

export const getVehicleById = (id: string) => vehicles.find((v) => v.id === id);

export { formatNaira };

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
    id: "buying-tokunbo-2024",
    title: "How to Buy a Tokunbo Car in Nigeria Without Getting Scammed",
    excerpt:
      "From verifying the VIN to negotiating clearing agents — the complete 2024 buyer's checklist.",
    category: "Buying Guide",
    readTime: "9 min read",
    image: camry,
  },
  {
    id: "suv-vs-sedan-ng",
    title: "SUV vs Sedan on Lagos Roads: Which Wins?",
    excerpt:
      "We compare running cost, ground clearance and resale value for Nigerian conditions.",
    category: "Comparison",
    readTime: "6 min read",
    image: rx350,
  },
  {
    id: "first-car-nigeria",
    title: "Best First Cars Under ₦15M in 2024",
    excerpt:
      "A shortlist of reliable, fuel-efficient options that hold their value on the Nigerian market.",
    category: "Advice",
    readTime: "8 min read",
    image: corolla,
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
    name: "Chinedu Okafor",
    role: "First-time buyer, Lagos",
    initials: "CO",
    quote:
      "Veliq made my Tokunbo Corolla search effortless. Real listings, honest prices, no wahala.",
  },
  {
    name: "Aisha Bello",
    role: "SUV shopper, Abuja",
    initials: "AB",
    quote:
      "The compare tool helped me pick a Highlander over an RX350 based on my budget and needs.",
  },
  {
    name: "Tunde Adeyemi",
    role: "Car enthusiast, Ibadan",
    initials: "TA",
    quote:
      "Finally a Nigerian car platform that feels premium. The buying guides are spot on.",
  },
];
