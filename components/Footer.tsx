'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Mail, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="w-full bg-[#05180D] border-t border-white/5 relative overflow-hidden">
            {/* --- BACKGROUND DESIGN ELEMENTS --- */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
                {/* Large Scale Subtle Watermark */}
                <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black text-white/[0.015] uppercase tracking-tighter whitespace-nowrap">
                    MATERA MEDIA
                </h2>
                
                {/* Depth Glows */}
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]" />
                <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                {/* --- CENTERED BRANDING & NAVIGATION --- */}
                <div className="py-24 flex flex-col items-center">
                    {/* Centered Logo with Refined Treatment */}
                    <Link href="/" className="mb-12 hover:opacity-80 transition-opacity duration-500">
                        <Image
                            src="/Logo.png"
                            alt="Matera Media Logo"
                            width={160}
                            height={160}
                            className="w-auto h-14 grayscale brightness-200"
                        />
                    </Link>

                    {/* Minimalist Navigation Grid */}
                    <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-16">
                        {[
                            { name: 'Home', url: '/' },
                            { name: 'Ad Creatives', url: '/ad-creatives' },
                            { name: 'YouTube Growth', url: '/organic-content-youtube' },
                            { name: 'SaaS Videos', url: '/saas-videos' },
                            { name: 'Privacy', url: '/privacy-policy' },
                        ].map((item) => (
                            <Link 
                                key={item.name} 
                                href={item.url} 
                                className="text-white/30 hover:text-white transition-all duration-300 text-[11px] font-bold uppercase tracking-[0.25em]"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Social Circle Links - High Contrast */}
                    <div className="flex gap-5">
                        {[
                            { icon: <Twitter className="w-4 h-4" />, url: '#' },
                            { icon: <Linkedin className="w-4 h-4" />, url: '#' },
                            { icon: <Instagram className="w-4 h-4" />, url: '#' },
                            { icon: <Youtube className="w-4 h-4" />, url: '#' },
                            { icon: <Mail className="w-4 h-4" />, url: '#' },
                        ].map((social, idx) => (
                            <Link 
                                key={idx} 
                                href={social.url} 
                                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 hover:bg-white hover:text-black hover:border-white transition-all duration-700 transform hover:-translate-y-1"
                            >
                                {social.icon}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* --- BOTTOM LEGAL STRIP --- */}
                <div className="pt-8 pb-12 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5">
                    {/* Copyright & Slogan */}
                    <div className="flex flex-col items-center md:items-start gap-1">
                        <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase font-black">
                            © {new Date().getFullYear()} MATERA MEDIA
                        </p>
                        <p className="text-white/10 text-[9px] tracking-widest uppercase font-bold">
                            Engineered for Attention & Revenue
                        </p>
                    </div>
                    
                    {/* Legal Links */}
                    <div className="flex gap-12">
                        <Link href="/privacy-policy" className="text-white/10 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-white/10 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">Terms of Service</Link>
                    </div>

                    {/* Status Marker */}
                    <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02]">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        <span className="text-white/20 text-[10px] font-bold uppercase tracking-tighter">Availability: Q1 2026</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};