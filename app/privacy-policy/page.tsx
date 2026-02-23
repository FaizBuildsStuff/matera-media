import { client } from "@/lib/sanity";
import { legalPageQuery } from "@/lib/queries";
import { Footer } from "@/components/Footer";
import { ShieldCheck, Info, Eye, Lock, RefreshCw } from "lucide-react";

const DEFAULT_SECTIONS = [
  { _key: "c1", heading: "1. Information we collect", icon: <Info className="w-5 h-5" />, body: "Contact details: name, email, company, and messages you send via forms or scheduling tools.\nUsage data: pages viewed, time on site, and basic device/browser info.\nCookies: small files used to improve site experience and measure performance." },
  { _key: "c2", heading: "2. How we use your information", icon: <RefreshCw className="w-5 h-5" />, body: "To respond to inquiries and provide requested services.\nTo schedule calls and communicate about projects.\nTo improve our website, offers, and user experience.\nTo comply with legal obligations and prevent fraud/abuse." },
  { _key: "c3", heading: "3. Sharing your information", icon: <Eye className="w-5 h-5" />, body: "We do not sell your personal information. We may share data with trusted service providers that help us operate the website and deliver services (e.g. hosting, analytics, scheduling tools). These providers are only permitted to use your data to perform services for us." },
  { _key: "c4", heading: "4. Third-party services", icon: <ShieldCheck className="w-5 h-5" />, body: "Our site may include embedded tools (e.g., Calendly) or links to third-party platforms. Their privacy practices are governed by their own policies." },
  { _key: "c5", heading: "5. Data retention", icon: <Lock className="w-5 h-5" />, body: "We retain information for as long as necessary to provide services, meet contractual obligations, or comply with legal requirements." },
];

export default async function PrivacyPolicyPage() {
  const content = await client.fetch<{ title?: string; subtitle?: string; lastUpdated?: string; content?: any[] } | null>(legalPageQuery, { slug: "privacy-policy" });
  
  const title = content?.title ?? "Privacy & Transparency.";
  const subtitle = content?.subtitle ?? "We value your trust. This policy outlines how Matera Media handles your data with the highest standards of integrity.";
  const lastUpdated = content?.lastUpdated ? new Date(content.lastUpdated).toLocaleDateString() : new Date().toLocaleDateString();
  const sections = content?.content?.length ? content.content : DEFAULT_SECTIONS;

  return (
    <div className="flex flex-col min-h-screen bg-[#05180D] selection:bg-emerald-500/30">
      <main className="grow">
        
        {/* --- CENTERED HERO SECTION --- */}
        <section className="relative pt-44 pb-32 px-6 overflow-hidden border-b border-white/5">
          {/* Background Ambient Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />
          
          <div className="relative max-w-4xl mx-auto z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-white/60 text-[10px] uppercase tracking-[0.3em] font-bold">Legal Standards 2026</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-instrument-sans font-medium text-white tracking-tight leading-[1.1] mb-8">
              {title}
            </h1>
            
            <p className="text-white/50 text-xl font-light leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>
            
            <div className="mt-12 flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-white/10" />
              <p className="text-white/30 text-xs uppercase tracking-widest font-medium">
                Last modified — {lastUpdated}
              </p>
              <div className="h-px w-12 bg-white/10" />
            </div>
          </div>
        </section>

        {/* --- MODERN AESTHETIC CONTENT SECTION --- */}
        <section className="relative py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
              
              {/* Left Side: Sticky Intro or Index */}
              <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                <h2 className="text-white font-instrument-sans text-2xl mb-6">Overview</h2>
                <p className="text-white/40 text-sm font-light leading-relaxed mb-8">
                  Our commitment is to be transparent about the data we collect and how it is used to provide you with a world-class experience.
                </p>
                <div className="space-y-4">
                  {sections.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-white/20 hover:text-emerald-400 transition-colors cursor-pointer group">
                      <span className="text-[10px] font-bold font-mono">0{idx + 1}</span>
                      <span className="text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">{s.heading?.split('.')[1] || s.heading}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: Editorial Content */}
              <div className="lg:col-span-8 space-y-24">
                {sections.map((section, idx) => (
                  <div key={section._key || idx} className="group relative">
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-500">
                           {section.icon || <ShieldCheck className="w-5 h-5" />}
                         </div>
                         <h3 className="text-white text-2xl md:text-3xl font-instrument-sans font-medium tracking-tight">
                           {section.heading}
                         </h3>
                      </div>
                      
                      <div className="pl-14">
                        <p className="text-white/60 text-lg font-light leading-relaxed whitespace-pre-line">
                          {section.body}
                        </p>
                      </div>
                    </div>
                    {/* Architectural Accent Line */}
                    <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                ))}

                {/* --- PROFESSIONAL FOOTER CALLOUT --- */}
                <div className="mt-32 p-12 rounded-[2.5rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] -translate-y-1/2 translate-x-1/2" />
                  <h4 className="text-white text-2xl font-instrument-sans mb-4 relative z-10">Have questions about your data?</h4>
                  <p className="text-white/40 text-lg font-light mb-8 relative z-10">
                    Our legal team is here to assist with any clarification regarding our privacy practices.
                  </p>
                  <a 
                    href="mailto:privacy@materamedia.com" 
                    className="inline-flex items-center gap-2 text-white font-medium hover:text-emerald-400 transition-colors relative z-10"
                  >
                    privacy@materamedia.com
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}