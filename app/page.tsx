import { Hero } from "@/components/Hero";
import { WorkShowcase } from "@/components/WorkShowcase";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import Pricing from "@/components/pricing";

import { CalendlyWidget } from "@/components/CalendlyWidget";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#05180D]">
      <main className="flex-grow">
        <Hero />
        <WorkShowcase />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <CalendlyWidget />
      </main>
      <Footer />
    </div>
  );
}
