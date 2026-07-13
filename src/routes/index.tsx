import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/home/Navbar";
import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { Brands } from "@/components/home/Brands";
import { FeaturedVehicles } from "@/components/home/FeaturedVehicles";
import { WhyVeliq } from "@/components/home/WhyVeliq";
import { Articles } from "@/components/home/Articles";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/home/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Veliq — Find Your Next Car With Confidence" },
      {
        name: "description",
        content:
          "Discover expert buying guides, compare vehicles, and explore the best cars for your budget. Veliq is the premium way to research and find your next car.",
      },
      { property: "og:title", content: "Veliq — Find Your Next Car With Confidence" },
      {
        property: "og:description",
        content:
          "Expert reviews, honest comparisons and premium car buying guides — all in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <Brands />
        <FeaturedVehicles />
        <WhyVeliq />
        <Articles />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
