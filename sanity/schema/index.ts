import page from "./page";
import hero from "./sections/hero";
import workShowcase, { workItem } from "./sections/workShowcase";
import howItWorks, { processStep } from "./sections/howItWorks";
import pricing, { pricingPlan } from "./sections/pricing";
import faq, { faqItem } from "./sections/faq";
import calendlyWidget from "./sections/calendlyWidget";
import testimonials from "./sections/testimonials";

export const schemaTypes = [
  page,
  hero,
  workItem,
  workShowcase,
  processStep,
  howItWorks,
  pricingPlan,
  pricing,
  faqItem,
  faq,
  calendlyWidget,
  testimonials,
];
