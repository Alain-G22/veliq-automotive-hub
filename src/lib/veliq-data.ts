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
import venza from "@/assets/cars/venza.jpg";
import sienna from "@/assets/cars/sienna.jpg";
import rav4 from "@/assets/cars/rav4.jpg";
import es350 from "@/assets/cars/es350.jpg";
import gx460 from "@/assets/cars/gx460.jpg";
import crv from "@/assets/cars/crv.jpg";
import pilot from "@/assets/cars/pilot.jpg";
import edge from "@/assets/cars/edge.jpg";
import rangeRoverSport from "@/assets/cars/range-rover-sport.jpg";
import gle350 from "@/assets/cars/gle350.jpg";
import santaFe from "@/assets/cars/santa-fe.jpg";
import sorento from "@/assets/cars/sorento.jpg";
import rogue from "@/assets/cars/rogue.jpg";
import tacoma from "@/assets/cars/tacoma.jpg";
import mdx from "@/assets/cars/mdx.jpg";
import gwagon from "@/assets/cars/g-wagon.jpg";
import bmw535i from "@/assets/cars/535i.jpg";
import lx570 from "@/assets/cars/lx570.jpg";
import landCruiser from "@/assets/cars/land-cruiser.jpg";
import model3 from "@/assets/cars/model-3.jpg";

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
  price: string;
  image: string;
  badge?: string;
  featured?: boolean;
  description: string;
}

const formatNaira = (n: number) =>
  `₦${n.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`;

type RawVehicle = Omit<Vehicle, "price">;

const rawVehicles: RawVehicle[] = [
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
  {
    id: "toyota-venza-2015",
    name: "Toyota Venza XLE 2015",
    brand: "Toyota",
    model: "Venza",
    bodyType: "SUV",
    year: 2015,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "104,000 km",
    priceNGN: 18_500_000,
    image: venza,
    description:
      "Spacious Venza XLE crossover with leather, panoramic roof and JBL sound — a Naija favourite.",
  },
  {
    id: "toyota-sienna-2016",
    name: "Toyota Sienna XLE 2016",
    brand: "Toyota",
    model: "Sienna",
    bodyType: "SUV",
    year: 2016,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "96,000 km",
    priceNGN: 22_500_000,
    image: sienna,
    description:
      "Family-ready 8-seater Sienna XLE with power sliding doors, rear entertainment and captain chairs.",
  },
  {
    id: "toyota-rav4-2017",
    name: "Toyota RAV4 XLE 2017",
    brand: "Toyota",
    model: "RAV4",
    bodyType: "SUV",
    year: 2017,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "78,000 km",
    priceNGN: 28_500_000,
    image: rav4,
    description:
      "Fuel-efficient RAV4 XLE with sunroof, power liftgate and Toyota Safety Sense package.",
  },
  {
    id: "lexus-es350-2016",
    name: "Lexus ES 350 2016",
    brand: "Lexus",
    model: "ES 350",
    bodyType: "Luxury",
    year: 2016,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "82,000 km",
    priceNGN: 32_000_000,
    image: es350,
    description:
      "Refined ES 350 with heated/ventilated seats, Mark Levinson audio and a whisper-quiet cabin.",
  },
  {
    id: "lexus-gx460-2015",
    name: "Lexus GX 460 2015",
    brand: "Lexus",
    model: "GX 460",
    bodyType: "Luxury",
    year: 2015,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "112,000 km",
    priceNGN: 58_000_000,
    image: gx460,
    badge: "Naija Favourite",
    description:
      "Bulletproof GX 460 body-on-frame SUV — third-row seats, crawl control, built for Nigerian roads.",
  },
  {
    id: "honda-crv-2017",
    name: "Honda CR-V EX 2017",
    brand: "Honda",
    model: "CR-V",
    bodyType: "SUV",
    year: 2017,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "86,000 km",
    priceNGN: 24_500_000,
    image: crv,
    description:
      "Reliable CR-V EX with turbo engine, sunroof, Honda Sensing and excellent fuel economy.",
  },
  {
    id: "honda-pilot-2016",
    name: "Honda Pilot EX-L 2016",
    brand: "Honda",
    model: "Pilot",
    bodyType: "SUV",
    year: 2016,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "94,000 km",
    priceNGN: 27_500_000,
    image: pilot,
    description:
      "8-seater Pilot EX-L with leather, powered tailgate, second-row captain chairs and towing package.",
  },
  {
    id: "ford-edge-2017",
    name: "Ford Edge SEL 2017",
    brand: "Ford",
    model: "Edge",
    bodyType: "SUV",
    year: 2017,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "88,000 km",
    priceNGN: 23_500_000,
    image: edge,
    description:
      "Ford Edge SEL with SYNC 3, rear camera, dual-zone climate and roomy interior.",
  },
  {
    id: "range-rover-sport-2015",
    name: "Range Rover Sport HSE 2015",
    brand: "Range Rover",
    model: "Sport HSE",
    bodyType: "Luxury",
    year: 2015,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "98,000 km",
    priceNGN: 68_000_000,
    image: rangeRoverSport,
    description:
      "Range Rover Sport HSE supercharged — Meridian audio, air suspension, panoramic roof.",
  },
  {
    id: "mercedes-gle350-2017",
    name: "Mercedes-Benz GLE 350 2017",
    brand: "Mercedes-Benz",
    model: "GLE 350",
    bodyType: "Luxury",
    year: 2017,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "84,000 km",
    priceNGN: 48_500_000,
    image: gle350,
    description:
      "GLE 350 4MATIC with AMG styling, panoramic roof, 360 camera and burmester sound.",
  },
  {
    id: "hyundai-santa-fe-2017",
    name: "Hyundai Santa Fe Sport 2017",
    brand: "Hyundai",
    model: "Santa Fe Sport",
    bodyType: "SUV",
    year: 2017,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "80,000 km",
    priceNGN: 21_500_000,
    image: santaFe,
    description:
      "Comfortable Santa Fe Sport with turbo engine, panoramic roof and ventilated leather seats.",
  },
  {
    id: "kia-sorento-2017",
    name: "Kia Sorento LX 2017",
    brand: "Kia",
    model: "Sorento",
    bodyType: "SUV",
    year: 2017,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "86,000 km",
    priceNGN: 22_000_000,
    image: sorento,
    description:
      "3-row Sorento LX V6 — solid value family SUV with Android Auto and Apple CarPlay.",
  },
  {
    id: "nissan-rogue-2018",
    name: "Nissan Rogue SV 2018",
    brand: "Nissan",
    model: "Rogue",
    bodyType: "SUV",
    year: 2018,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "74,000 km",
    priceNGN: 19_500_000,
    image: rogue,
    description:
      "Rogue SV with ProPilot Assist, blind-spot monitor, remote start and heated seats.",
  },
  {
    id: "toyota-tacoma-2017",
    name: "Toyota Tacoma TRD Off-Road 2017",
    brand: "Toyota",
    model: "Tacoma",
    bodyType: "Pickup",
    year: 2017,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "92,000 km",
    priceNGN: 42_000_000,
    image: tacoma,
    description:
      "Rugged Tacoma TRD Off-Road double cab with crawl control, locking rear diff and hood scoop.",
  },
  {
    id: "acura-mdx-2016",
    name: "Acura MDX SH-AWD 2016",
    brand: "Acura",
    model: "MDX",
    bodyType: "Luxury",
    year: 2016,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "90,000 km",
    priceNGN: 33_500_000,
    image: mdx,
    description:
      "3-row MDX SH-AWD with ELS audio, ventilated leather seats and AcuraWatch safety suite.",
  },
  {
    id: "mercedes-g-wagon-2018",
    name: "Mercedes-Benz G550 G-Wagon 2018",
    brand: "Mercedes-Benz",
    model: "G550",
    bodyType: "Luxury",
    year: 2018,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "58,000 km",
    priceNGN: 185_000_000,
    image: gwagon,
    badge: "Flagship",
    featured: true,
    description:
      "Iconic G550 G-Wagon — three locking differentials, designo leather, unmistakable status.",
  },
  {
    id: "bmw-535i-2016",
    name: "BMW 535i M Sport 2016",
    brand: "BMW",
    model: "5 Series 535i",
    bodyType: "Luxury",
    year: 2016,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "88,000 km",
    priceNGN: 28_500_000,
    image: bmw535i,
    description:
      "5 Series 535i with M Sport package, head-up display, harman kardon audio and heated seats.",
  },
  {
    id: "lexus-lx570-2016",
    name: "Lexus LX 570 2016",
    brand: "Lexus",
    model: "LX 570",
    bodyType: "Luxury",
    year: 2016,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "96,000 km",
    priceNGN: 95_000_000,
    image: lx570,
    description:
      "Full-size LX 570 flagship — 8 seats, rear entertainment, Mark Levinson, KDSS suspension.",
  },
  {
    id: "toyota-land-cruiser-2016",
    name: "Toyota Land Cruiser V8 2016",
    brand: "Toyota",
    model: "Land Cruiser",
    bodyType: "SUV",
    year: 2016,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "104,000 km",
    priceNGN: 82_000_000,
    image: landCruiser,
    badge: "Timeless",
    featured: true,
    description:
      "The legendary Land Cruiser V8 — 8 seats, KDSS, multi-terrain select, built to outlast anything.",
  },
  {
    id: "tesla-model-3-2020",
    name: "Tesla Model 3 Long Range 2020",
    brand: "Tesla",
    model: "Model 3",
    bodyType: "Electric",
    year: 2020,
    fuel: "Electric",
    transmission: "Automatic",
    mileage: "62,000 km",
    priceNGN: 45_000_000,
    image: model3,
    badge: "Zero Emission",
    description:
      "Model 3 Long Range Dual Motor AWD — 500km range, Autopilot, over-the-air software updates.",
  },
];

export const vehicles: Vehicle[] = rawVehicles.map((v) => ({
  ...v,
  price: formatNaira(v.priceNGN),
}));

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
