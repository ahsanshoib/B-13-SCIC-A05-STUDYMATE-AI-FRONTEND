import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Subjects } from "@/components/landing/Subjects";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { Newsletter } from "@/components/landing/Newsletter";
import { CTA } from "@/components/landing/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Subjects />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <CTA />
    </>
  );
}