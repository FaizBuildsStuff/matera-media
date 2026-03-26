"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowUpRight, 
  Users, 
  Globe, 
  Zap, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Briefcase 
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

// --- TYPES ---
export type CareersPageProps = {
  content?: {
    label?: string;
    title?: string;
    highlightedWord?: string;
    description?: string;
    items?: Array<{
      title: string;
      department: string;
      location: string;
      type: string;
      link: string;
    }>;
  };
};

const OPEN_ROLES_FALLBACK = [
  {
    title: "Senior Motion Designer",
    department: "Creative",
    location: "Remote / Dubai",
    type: "Full-Time",
    link: "/careers/motion-designer",
  },
  {
    title: "SaaS Growth Strategist",
    department: "Strategy",
    location: "Remote",
    type: "Full-Time",
    link: "/careers/growth-strategist",
  },
];

const CULTURE_PILLARS = [
  {
    icon: Globe,
    title: "Remote Sovereignty",
    desc: "We focus on high-fidelity output, not hours logged. Work from anywhere.",
  },
  {
    icon: Zap,
    title: "A-Player Environment",
    desc: "Collaborate with specialists who are obsessed with performance and craft.",
  },
  {
    icon: ShieldCheck,
    title: "Long-Term Equity",
    desc: "We invest in our talent's growth with health, wellness, and performance bonuses.",
  },
];

export default function CareersPageClient({ content }: CareersPageProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);

  const label = content?.label ?? "Join the team";
  const titleText = content?.title ?? "Do the best work of your career.";
  const highlightedWord = content?.highlightedWord ?? "career.";
  const description = content?.description ?? "Matera Media is a focused team of specialists. We skip the corporate red tape to produce world-class results.";
  
  const roles = content?.items && content.items.length > 0 
    ? content.items 
    : OPEN_ROLES_FALLBACK;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sophisticated Header Reveal
      gsap.fromTo(headerRef.current,
        { y: 30, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "expo.out" }
      );

      // Staggered Role Reveal
      gsap.fromTo(".role-row",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: rolesRef.current,
            start: "top 90%",
          }
        }
      );

      // Pillar Entrance
      gsap.fromTo(".culture-card",
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".culture-grid",
            start: "top 90%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [content]);

  return (
    <div ref={sectionRef} className="relative overflow-hidden pt-16 md:pt-24 bg-[#05180D]">
      {/* Atmospheric Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 py-20 px-6">
        
        {/* --- HEADER --- */}
        <div ref={headerRef} className="mb-20 md:mb-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 mb-6 md:mb-10">
            <Users className="size-3 text-emerald-400" />
            <span className="text-[9px] md:text-[10px] text-emerald-400 font-bold uppercase tracking-[0.3em] font-satoshi">
              {label}
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-medium text-white mb-6 md:mb-10 tracking-tight leading-[1.1] font-instrument-sans">
            {titleText.includes(highlightedWord) ? (
              <>
                {titleText.split(highlightedWord)[0]}
                <span 
                  style={{ fontFamily: "'Satoshi', sans-serif", fontStyle: "italic", fontWeight: 700 }} 
                  className="text-emerald-400 block sm:inline"
                >
                  {highlightedWord}
                </span>
                {titleText.split(highlightedWord)[1]}
              </>
            ) : (
              titleText
            )}
          </h1>
          
          <p className="text-white/40 text-base md:text-xl max-w-xl mx-auto font-light leading-relaxed font-satoshi px-4 whitespace-pre-wrap">
            {description}
          </p>
        </div>

        {/* --- CULTURE GRID --- */}
        <div className="culture-grid grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-32">
          {CULTURE_PILLARS.map((pillar, i) => (
            <div key={i} className="culture-card p-8 rounded-[2rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl transition-all duration-500 group">
              <div className="size-12 rounded-2xl bg-emerald-500/5 flex items-center justify-center mb-6 border border-emerald-500/10 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
                <pillar.icon className="size-4" />
              </div>
              <h3 className="text-white text-lg font-medium mb-3 font-satoshi">{pillar.title}</h3>
              <p className="text-white/30 text-sm leading-relaxed font-light font-satoshi">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* --- JOB LISTINGS --- */}
        <div ref={rolesRef} className="space-y-6">
          <div className="flex items-center justify-between mb-10 px-2 border-b border-white/5 pb-6">
            <h3 className="text-white text-lg md:text-xl font-medium flex items-center gap-3 font-satoshi">
              <Briefcase className="size-4 text-emerald-400" />
              Open Positions
            </h3>
            <span className="text-white/20 text-[9px] font-bold uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">
              {roles.length} Roles
            </span>
          </div>

          <div className="space-y-4">
            {roles.map((role, i) => (
              <Link href={role.link || "#"} key={i} className="role-row group block" target="_blank">
                <div className="relative p-6 md:p-10 rounded-[2.5rem] bg-white/[0.01] border border-white/5 hover:border-emerald-500/30 transition-all duration-700 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[8px] font-bold uppercase tracking-widest font-satoshi">
                          {role.department}
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-white/5 text-white/40 text-[8px] font-bold uppercase tracking-widest font-satoshi">
                          {role.type}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-4xl font-medium text-white tracking-tight group-hover:text-emerald-400 transition-colors duration-500 font-satoshi">
                        {role.title}
                      </h2>
                    </div>

                    <div className="flex items-center justify-between gap-6 border-t border-white/5 pt-6 md:border-0 md:pt-0">
                      <div className="text-left md:text-right text-white/30 text-[11px] font-satoshi space-y-1">
                        <div className="flex items-center md:justify-end gap-2">
                          <MapPin className="size-3 text-emerald-500/50" /> {role.location}
                        </div>
                        <div className="flex items-center md:justify-end gap-2">
                          <Clock className="size-3 text-emerald-500/50" /> Instant Start
                        </div>
                      </div>
                      <div className="size-14 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-500 shadow-2xl shadow-emerald-500/0 group-hover:shadow-emerald-500/20">
                        <ArrowUpRight className="size-6 text-white group-hover:text-black transition-transform duration-500 group-hover:scale-110" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* --- CALL TO ACTION --- */}
        <div className="mt-32 p-8 md:p-16 rounded-[3rem] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-emerald-500/5 blur-[100px] pointer-events-none" />
          <h4 className="text-white text-2xl md:text-3xl font-medium mb-4 font-satoshi tracking-tight">Don't see your role?</h4>
          <p className="text-white/40 text-sm md:text-base mb-10 max-w-sm font-light font-satoshi leading-relaxed">We’re always looking for obsessed creators and strategists to join our orbit.</p>
          
          <Link 
            href="https://materamedia.notion.site/2faab7440f4e80a4a05fd95c009a25d7?v=2faab7440f4e80ea89ff000c37ef4e5b&source=copy_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="h-14 px-10 rounded-full bg-white text-black font-bold uppercase tracking-[0.15em] text-[10px] hover:bg-emerald-400 hover:scale-105 transition-all duration-500 shadow-xl shadow-black/20">
              Get in touch
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}