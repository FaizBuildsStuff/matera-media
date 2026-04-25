import page from "./page";
import hero from "./sections/hero";
import workShowcase, { workItem } from "./sections/workShowcase";
import howItWorks, { processStep } from "./sections/howItWorks";
import pricing, { pricingPlan } from "./sections/pricing";
import faq, { faqItem } from "./sections/faq";
import calendlyWidget from "./sections/calendlyWidget";
import testimonials, { testimonialItem } from "./sections/testimonials";
import servicePlan from "./sections/servicePlan";
import problemSolutionItem from "./sections/problemSolutionItem";
import resultItem from "./sections/resultItem";
import servicePage from "./servicePage";
import legalPage from "./legalPage";
import inquiry from "./inquiry";
import careersPage from "./sections/careersPage";
// New Imports
import careers, { careerRole } from "./sections/careers";
import siteSettings from "./siteSettings";

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
  testimonialItem,
  testimonials,
  servicePlan,
  problemSolutionItem,
  resultItem,
  servicePage,
  legalPage,
  inquiry,
  careersPage, // Add this
  careerRole,  // Add this
  siteSettings,
];