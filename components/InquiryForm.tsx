"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight, Check, Loader2 } from "lucide-react";

const STEPS = [
  { id: 1, label: "Contact", short: "Contact" },
  { id: 2, label: "Project", short: "Project" },
  { id: 3, label: "Details", short: "Details" },
];

type InquiryFormProps = {
  title?: string;
  subtitle?: string;
  sourcePage: string;
};

export function InquiryForm({ title, subtitle, sourcePage }: InquiryFormProps) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    serviceInterest: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const update = (key: string, value: string) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const canProceedStep1 = formData.name.trim() && formData.email.trim();
  const canProceedStep2 = !!formData.serviceInterest;

  const handleNext = () => {
    if (step < 3) setStep((s) => s + 1);
    else handleSubmit();
  };

  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = async () => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          sourcePage,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section
        id="schedule"
        className="relative py-40 px-6 bg-[#05180D] overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px] bg-emerald-500/15 pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 mb-8">
            <Check className="w-10 h-10" strokeWidth={2} />
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Thank you for reaching out
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            We&apos;ve received your inquiry and will get back to you within 24 hours.
          </p>
        </div>
      </section>
    );
  }

  const defaultTitle = "Let's start a conversation.";
  const defaultSubtitle =
    "Share a few details and we'll reach out to discuss how we can help.";

  return (
    <section
      id="schedule"
      className="relative py-40 px-6 bg-[#05180D] overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px] bg-emerald-500/12 pointer-events-none" />
      <div className="absolute top-20 right-20 w-[280px] h-[280px] bg-teal-400/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="flex justify-center mb-10">
          <Image
            src="/Logo.png"
            alt="Matera Media"
            width={80}
            height={80}
            className="opacity-90"
          />
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
            {title ?? defaultTitle}
          </h2>
          <p className="text-white/60 text-lg">
            {subtitle ?? defaultSubtitle}
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex justify-center gap-2 mb-10">
          {STEPS.map((s) => (
            <div key={s.id} className="flex items-center">
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  step > s.id
                    ? "bg-emerald-500/30 text-emerald-300"
                    : step === s.id
                      ? "bg-emerald-500/25 text-white ring-2 ring-emerald-400/50"
                      : "bg-white/5 text-white/40"
                )}
              >
                {step > s.id ? <Check className="w-4 h-4" /> : s.id}
              </div>
              {s.id < 3 && (
                <div
                  className={cn(
                    "w-8 h-0.5 mx-0.5 rounded transition-colors",
                    step > s.id ? "bg-emerald-500/40" : "bg-white/10"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 md:p-10">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Full name <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="John Smith"
                  className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Work email <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="john@company.com"
                  className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Company / Brand
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => update("company", e.target.value)}
                  placeholder="Acme Inc."
                  className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/30 transition-all"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Service interest <span className="text-emerald-400">*</span>
                </label>
                <select
                  value={formData.serviceInterest}
                  onChange={(e) => update("serviceInterest", e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/30 transition-all [&>option]:bg-[#05180D]"
                >
                  <option value="">Select a service</option>
                  <option value="ad-creatives">Ad Creatives</option>
                  <option value="organic-content-youtube">Organic Content / YouTube</option>
                  <option value="saas-videos">SaaS Videos</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Budget range
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => update("budget", e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/30 transition-all [&>option]:bg-[#05180D]"
                >
                  <option value="">Select budget</option>
                  <option value="under-2k">Under $2k/mo</option>
                  <option value="2k-5k">$2k – $5k/mo</option>
                  <option value="5k-10k">$5k – $10k/mo</option>
                  <option value="10k-plus">$10k+/mo</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Timeline
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => update("timeline", e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/30 transition-all [&>option]:bg-[#05180D]"
                >
                  <option value="">Select timeline</option>
                  <option value="asap">ASAP</option>
                  <option value="2-weeks">Within 2 weeks</option>
                  <option value="1-month">Within 1 month</option>
                  <option value="3-months">Within 3 months</option>
                  <option value="exploring">Exploring options</option>
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Tell us about your project
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Goals, challenges, or anything you'd like us to know..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/30 transition-all resize-none"
                />
              </div>
            </div>
          )}

          {status === "error" && (
            <p className="mt-4 text-sm text-red-400">
              Something went wrong. Please try again.
            </p>
          )}

          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={status === "submitting"}
                className="h-12 px-6 rounded-xl border-white/15 bg-white/5 text-white hover:bg-white/10"
              >
                Back
              </Button>
            )}
            <Button
              type="button"
              onClick={handleNext}
              disabled={
                status === "submitting" ||
                (step === 1 && !canProceedStep1) ||
                (step === 2 && !canProceedStep2)
              }
              className="h-12 px-8 rounded-xl bg-emerald-500 text-[#05180D] hover:bg-emerald-400 transition-colors flex-1"
            >
              {status === "submitting" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : step === 3 ? (
                "Submit"
              ) : (
                <>
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
