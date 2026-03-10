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

// Fallback data if Sanity is empty
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
  {
    title: "Performance Video Editor",
    department: "Production",
    location: "Remote",
    type: "Contract",
    link: "/careers/video-editor",
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

// 1. Defined the TypeScript Interface for Sanity content
export type CareersSectionType = {
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

export const CareersSection = ({ content }: { content?: CareersSectionType }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);

  // 2. Mapping Sanity fields to variables with Fallbacks
  const label = content?.label ?? "Join the team";
  const titleText = content?.title ?? "Scale the Future.";
  const highlightedWord = content?.highlightedWord ?? "Future.";
  const description = content?.description ?? "We’re hiring high-performance individuals to help us build the next generation of SaaS growth systems.";
  
  const roles = content?.items && content.items.length > 0 
    ? content.items 
    : OPEN_ROLES_FALLBACK;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
          }
        }
      );

      // Roles Staggered Entry
      gsap.fromTo(".role-row",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rolesRef.current,
            start: "top 85%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [content]); // Re-run if content updates

  return (
    <section 
      ref={sectionRef} 
      id="careers" 
      className="py-32 px-6 bg-[#05180D] relative overflow-hidden border-t border-white/5"
    >
      <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,401,700,701&display=swap" rel="stylesheet" />

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-10%,rgba(16,185,129,0.05),transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* --- DYNAMIC HEADER --- */}
        <div ref={headerRef} className="mb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10 mb-8">
            <Users className="size-3 text-emerald-400" />
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-[0.2em] font-satoshi">{label}</span>
          </div>
          
          <h2 className="text-5xl md:text-8xl font-medium text-white mb-8 tracking-tighter font-instrument-sans">
            {titleText.includes(highlightedWord) ? (
              <>
                {titleText.split(highlightedWord)[0]}
                <span style={{ fontFamily: "'Satoshi', sans-serif", fontStyle: "italic", fontWeight: 700 }} className="text-emerald-400">
                  {highlightedWord}
                </span>
                {titleText.split(highlightedWord)[1]}
              </>
            ) : (
              titleText
            )}
          </h2>
          
          <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed font-satoshi">
            {description}
          </p>
        </div>

        {/* --- CULTURE GRID --- */}
        <div className="grid md:grid-cols-3 gap-6 mb-32">
          {CULTURE_PILLARS.map((pillar, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 transition-all duration-500 group">
              <div className="size-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                <pillar.icon className="size-4" />
              </div>
              <h3 className="text-white text-lg font-medium mb-3 font-satoshi">{pillar.title}</h3>
              <p className="text-white/30 text-sm leading-relaxed font-light font-satoshi">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* --- DYNAMIC JOB LISTINGS --- */}
        <div ref={rolesRef} className="space-y-4">
          <div className="flex items-center justify-between mb-8 px-4 border-b border-white/5 pb-4">
            <h3 className="text-white text-xl font-medium flex items-center gap-3 font-satoshi">
              <Briefcase className="size-4 text-emerald-500" />
              Open Positions
            </h3>
            <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest">{roles.length} active roles</span>
          </div>

          <div className="divide-y divide-white/5">
            {roles.map((role, i) => (
              <Link 
                href={role.link} 
                key={i} 
                className="role-row group block py-10 transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-emerald-500 text-[9px] font-bold uppercase tracking-[0.2em] font-satoshi">{role.department}</span>
                      <span className="text-white/20 font-light">—</span>
                      <span className="text-white/40 text-[9px] font-bold uppercase tracking-[0.2em] font-satoshi">{role.type}</span>
                    </div>
                    <h4 className="text-white text-3xl md:text-4xl font-medium tracking-tight group-hover:text-emerald-400 transition-colors font-satoshi">
                      {role.title}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-10">
                    <div className="text-right hidden sm:block">
                      <div className="flex items-center gap-2 text-white/30 text-xs font-satoshi mb-1">
                        <MapPin className="size-3" />
                        {role.location}
                      </div>
                      <div className="flex items-center gap-2 text-white/30 text-xs font-satoshi">
                        <Clock className="size-3" />
                        Instant Start Available
                      </div>
                    </div>
                    <div className="size-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-500">
                      <ArrowUpRight className="size-5 text-white group-hover:text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* --- GENERAL APPLICATION --- */}
        <div className="mt-24 p-12 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 flex flex-col items-center text-center">
           <h4 className="text-white text-2xl font-medium mb-4 font-satoshi tracking-tight">Don't see your specific role?</h4>
           <p className="text-white/40 text-sm mb-10 max-w-sm font-light font-satoshi">We’re always interested in meeting exceptional creative and technical talent.</p>
           <Button className="h-12 px-10 rounded-full bg-white text-black font-bold uppercase tracking-widest text-[10px] hover:bg-emerald-400 transition-all active:scale-95 shadow-xl">
             Send General Application
           </Button>
        </div>
      </div>
    </section>
  );
};