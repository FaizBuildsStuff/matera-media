"use client";

import React from "react";
import { ShieldCheck, Mail, ArrowUpRight, Globe, Lock, Smartphone, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="flex flex-col min-h-screen bg-[#05180D] selection:bg-emerald-500/30 text-white" style={{ fontFamily: "'Satoshi', sans-serif" }}>
      <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,401,900&display=swap" rel="stylesheet" />
      
      <main className="grow">
        {/* --- LUXURY HERO SECTION --- */}
        <section className="relative pt-44 pb-32 px-6 overflow-hidden bg-[#051A0E] z-30">
          {/* --- SMOOTHER WHITE SPOTLIGHTS --- */}
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-white/[0.03] blur-[160px] rounded-full pointer-events-none z-0" />
          <div className="absolute top-[-10%] right-[-15%] w-[40%] h-[40%] bg-white/[0.03] blur-[140px] rounded-full pointer-events-none z-0" />

          {/* Central Atmosphere */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[700px] bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.08),transparent_70%)] pointer-events-none z-0" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none z-0" />
          
          <div className="relative max-w-5xl mx-auto z-40 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md mb-10"
            >
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400/80 text-[9px] uppercase tracking-[0.3em] font-bold">Privacy Protocol</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-10"
            >
              Privacy <span className="italic font-normal text-emerald-500" style={{ fontFamily: "Satoshi, sans-serif" }}>Policy.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/40 text-lg md:text-2xl font-normal leading-relaxed max-w-3xl mx-auto mb-16 tracking-tight"
            >
              Matera Media (“we,” “our,” or “us”) respects your privacy. This policy explains how we collect, protect, and handle your information with total transparency.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex items-center justify-center gap-6"
            >
              <div className="h-px w-10 bg-white/10" />
              <p className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-bold">
                Revised — {lastUpdated}
              </p>
              <div className="h-px w-10 bg-white/10" />
            </motion.div>
          </div>

          {/* Bottom Blend Mask */}
          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#051A0E] via-[#051A0E] to-transparent pointer-events-none z-20" />
        </section>

        {/* --- EDITORIAL CONTENT SECTION --- */}
        <section className="relative py-24 px-6 bg-[#051A0E] z-10 overflow-hidden">
          {/* --- TOP CONNECTION MASK --- */}
          <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#051A0E] via-[#051A0E] to-transparent pointer-events-none z-20" />

          {/* --- MATCHING WHITE SPOTLIGHTS --- */}
          <div className="absolute top-[10%] left-[-15%] w-[50%] h-[50%] bg-white/[0.02] blur-[160px] rounded-full pointer-events-none z-0" />
          <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-white/[0.02] blur-[140px] rounded-full pointer-events-none z-0" />

          <div className="max-w-6xl mx-auto relative z-30">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              
              {/* Sidebar Navigation */}
              <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-12">
                <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl shadow-[0_0_40px_rgba(255,255,255,0.02)]">
                  <p className="text-white/40 text-xs leading-relaxed font-medium">
                    By using our website or services, you agree to the practices described in this Privacy Policy. We take reasonable technical measures to safeguard your data.
                  </p>
                </div>
                
                <div className="space-y-4 pl-4">
                  <div className="flex items-center gap-3 text-emerald-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">Encrypted Data</span>
                  </div>
                  <div className="flex items-center gap-3 text-emerald-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">No Data Selling</span>
                  </div>
                </div>
              </div>

              {/* Content Flow */}
              <div className="lg:col-span-8 space-y-24">
                
                {/* 1. Collection */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-emerald-400 shadow-sm transition-all hover:border-emerald-500/30">
                      <Globe className="w-4 h-4" />
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight">Information We Collect</h3>
                  </div>
                  <div className="md:pl-14 space-y-6 text-white/40 text-lg font-normal leading-relaxed tracking-tight">
                    <p>
                      <strong className="text-white font-bold block mb-2 lg:inline lg:mr-2">Personal Information:</strong>
                      Includes Name, Email address, Phone number, Company name, and any information submitted through forms, emails, messages, or scheduling tools.
                    </p>
                    <p>
                      <strong className="text-white font-bold block mb-2 lg:inline lg:mr-2">Automatically Collected:</strong>
                      Comprises your IP address, browser type, device info, pages visited, and interaction data gathered using cookies and analytics tools.
                    </p>
                  </div>
                </div>

                {/* 2. Usage */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-emerald-400 shadow-sm transition-all hover:border-emerald-500/30">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight">How We Use Your Information</h3>
                  </div>
                  <div className="md:pl-14 text-white/40 text-lg font-normal leading-relaxed tracking-tight">
                    <p>
                      We use your information to communicate regarding inquiries, proposals, and support; schedule and conduct meetings; deliver our services; and improve our website performance.
                    </p>
                  </div>
                </div>

                {/* 3. SMS & Sharing */}
                <div className="grid md:grid-cols-2 gap-10">
                   <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl transition-all hover:bg-white/[0.04]">
                      <Smartphone className="w-5 h-5 text-emerald-400 mb-6" />
                      <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-[10px]">Phone & SMS</h4>
                      <p className="text-white/40 text-sm leading-relaxed font-normal">
                        Standard rates may apply. We do not sell, rent, or share phone numbers for marketing. Opt out anytime.
                      </p>
                   </div>
                   <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl transition-all hover:bg-white/[0.04]">
                      <Lock className="w-5 h-5 text-emerald-400 mb-6" />
                      <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-[10px]">Data Sharing</h4>
                      <p className="text-white/40 text-sm leading-relaxed font-normal">
                        We do not sell your personal information. We only share data with trusted providers required to deliver our services.
                      </p>
                   </div>
                </div>

                {/* 4. Rights */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-emerald-400 shadow-sm transition-all hover:border-emerald-500/30">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight">Your Rights</h3>
                  </div>
                  <div className="md:pl-14 text-white/40 text-lg font-normal leading-relaxed tracking-tight">
                    <p>
                      You may request access, correction, or deletion of personal data and opt out of communications by contacting us at our official email below. Our website may contain links to third-party sites; we are not responsible for their privacy practices.
                    </p>
                  </div>
                </div>

                {/* --- CONTACT CALLOUT --- */}
                <div className="mt-32 p-12 rounded-[3.5rem] bg-gradient-to-br from-emerald-500/5 via-emerald-500/[0.02] to-transparent border border-emerald-500/20 relative overflow-hidden group text-center shadow-[0_0_60px_rgba(16,185,129,0.05)]">
                  <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-all translate-x-3 group-hover:translate-x-0">
                    <ArrowUpRight className="w-6 h-6 text-emerald-500/50" />
                  </div>
                  
                  {/* Internal Spotlights for the callout */}
                  <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/[0.01] blur-[100px] pointer-events-none" />
                  
                  <h4 className="text-white text-3xl md:text-4xl font-black mb-4 relative z-10 tracking-tighter">Contact Information</h4>
                  <p className="text-white/40 text-lg font-normal mb-10 relative z-10 leading-relaxed max-w-lg mx-auto">
                    Matera Media — Focused on Transparency.
                  </p>
                  <a 
                    href="mailto:materamedia@gmail.com" 
                    className="inline-flex items-center gap-3 h-14 px-10 rounded-full bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all active:scale-95 relative z-10 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                  >
                    <Mail className="w-4 h-4" />
                    Email Abdullah
                  </a>
                  <div className="mt-8 text-white/20 text-[10px] font-black uppercase tracking-[0.4em] relative z-10">
                    materamedia@gmail.com
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Blend Mask */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#051A0E] via-[#051A0E]/80 to-transparent pointer-events-none z-20" />
        </section>
      </main>
    </div>
  );
}