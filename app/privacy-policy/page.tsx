import { client } from "@/lib/sanity";
import { legalPageQuery } from "@/lib/queries";
import { Footer } from "@/components/Footer";
import { SectionMerge } from "@/components/SectionMerge";

const BG_BASE = "#05180D";
const BG_SEC = "#062017";

const DEFAULT_SECTIONS = [
  { _key: "c1", heading: "1. Information we collect", body: "Contact details: name, email, company, and messages you send via forms or scheduling tools.\nUsage data: pages viewed, time on site, and basic device/browser info.\nCookies: small files used to improve site experience and measure performance." },
  { _key: "c2", heading: "2. How we use your information", body: "To respond to inquiries and provide requested services.\nTo schedule calls and communicate about projects.\nTo improve our website, offers, and user experience.\nTo comply with legal obligations and prevent fraud/abuse." },
  { _key: "c3", heading: "3. Sharing your information", body: "We do not sell your personal information. We may share data with trusted service providers that help us operate the website and deliver services (e.g. hosting, analytics, scheduling tools). These providers are only permitted to use your data to perform services for us." },
  { _key: "c4", heading: "4. Third-party services", body: "Our site may include embedded tools (e.g., Calendly) or links to third-party platforms. Their privacy practices are governed by their own policies." },
  { _key: "c5", heading: "5. Data retention", body: "We retain information for as long as necessary to provide services, meet contractual obligations, or comply with legal requirements." },
  { _key: "c6", heading: "6. Security", body: "We take reasonable measures to protect your information. No method of transmission or storage is 100% secure." },
  { _key: "c7", heading: "7. Your choices", body: "You may request access, correction, or deletion of your personal information where applicable. You can disable cookies in your browser settings." },
  { _key: "c8", heading: "8. Contact us", body: "For privacy questions or requests, contact us at privacy@materamedia.com" },
];

export default async function PrivacyPolicyPage() {
  const content = await client.fetch<{ title?: string; subtitle?: string; lastUpdated?: string; content?: { _key?: string; heading?: string; body?: string }[] } | null>(legalPageQuery, { slug: "privacy-policy" });
  const title = content?.title ?? "Your privacy matters.";
  const subtitle = content?.subtitle ?? "This Privacy Policy explains how Matera Media collects, uses, and protects your information when you use our website and services.";
  const lastUpdated = content?.lastUpdated ? new Date(content.lastUpdated).toLocaleDateString() : new Date().toLocaleDateString();
  const sections = (content?.content?.length ? content.content : DEFAULT_SECTIONS) as { _key?: string; heading?: string; body?: string }[];

  return (
    <div className="flex flex-col min-h-screen bg-[#05180D]">
      <main className="grow">
        <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-[#05180D]">
          <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.18),transparent_45%)]" />
          <div className="absolute -right-24 top-24 w-[520px] h-[520px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
          <SectionMerge toColor={BG_SEC} />

          <div className="relative max-w-4xl mx-auto z-10">
            <p className="text-emerald-300/80 text-xs font-medium tracking-[0.2em] uppercase mb-6">
              Privacy Policy
            </p>
            <h1 className="text-5xl md:text-6xl font-instrument-sans font-medium text-white tracking-tight leading-[0.95]">
              {title}
            </h1>
            <p className="text-white/60 text-lg font-light leading-relaxed mt-8">
              {subtitle}
            </p>
            <p className="text-white/35 text-sm font-light mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>
        </section>

        <section className="relative py-20 px-6 bg-[#062017]">
          <SectionMerge toColor={BG_BASE} />
          <div className="relative z-10 max-w-4xl mx-auto rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-10 md:p-12">
            <div className="space-y-10 text-white/70 font-light leading-relaxed">
              <div>
                <h2 className="text-white text-2xl md:text-3xl font-medium mb-4">
                  1. Information we collect
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <span className="text-white/90 font-medium">
                      Contact details:
                    </span>{" "}
                    name, email, company, and messages you send via forms or
                    scheduling tools.
                  </li>
                  <li>
                    <span className="text-white/90 font-medium">
                      Usage data:
                    </span>{" "}
                    pages viewed, time on site, and basic device/browser info.
                  </li>
                  <li>
                    <span className="text-white/90 font-medium">
                      Cookies:
                    </span>{" "}
                    small files used to improve site experience and measure
                    performance.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-white text-2xl md:text-3xl font-medium mb-4">
                  2. How we use your information
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To respond to inquiries and provide requested services.</li>
                  <li>To schedule calls and communicate about projects.</li>
                  <li>
                    To improve our website, offers, and user experience.
                  </li>
                  <li>
                    To comply with legal obligations and prevent fraud/abuse.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-white text-2xl md:text-3xl font-medium mb-4">
                  3. Sharing your information
                </h2>
                <p>
                  We do not sell your personal information. We may share data
                  with trusted service providers that help us operate the
                  website and deliver services (for example: hosting, analytics,
                  scheduling tools). These providers are only permitted to use
                  your data to perform services for us.
                </p>
              </div>

              <div>
                <h2 className="text-white text-2xl md:text-3xl font-medium mb-4">
                  4. Third-party services
                </h2>
                <p>
                  Our site may include embedded tools (e.g., Calendly) or links
                  to third-party platforms. Their privacy practices are governed
                  by their own policies. We recommend reviewing those policies
                  if you use those services.
                </p>
              </div>

              <div>
                <h2 className="text-white text-2xl md:text-3xl font-medium mb-4">
                  5. Data retention
                </h2>
                <p>
                  We retain information for as long as necessary to provide
                  services, meet contractual obligations, or comply with legal
                  requirements. We may also retain aggregated, non-identifying
                  analytics data.
                </p>
              </div>

              <div>
                <h2 className="text-white text-2xl md:text-3xl font-medium mb-4">
                  6. Security
                </h2>
                <p>
                  We take reasonable measures to protect your information.
                  However, no method of transmission or storage is 100% secure,
                  and we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="text-white text-2xl md:text-3xl font-medium mb-4">
                  7. Your choices
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    You may request access, correction, or deletion of your
                    personal information where applicable.
                  </li>
                  <li>
                    You can disable cookies in your browser settings (some
                    features may not work as intended).
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-white text-2xl md:text-3xl font-medium mb-4">
                  8. Contact us
                </h2>
                <p>
                  For privacy questions or requests, contact us at{" "}
                  <span className="text-white/90 font-medium">
                    privacy@materamedia.com
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

