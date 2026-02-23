'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import React, { useMemo, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

export const Header = () => {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const links = useMemo(
        () => [
            { label: "Ad Creatives", href: "/ad-creatives" },
            { label: "YouTube", href: "/organic-content-youtube" },
            { label: "SaaS Videos", href: "/saas-videos" },
            { label: "Privacy", href: "/privacy-policy" },
        ],
        []
    );

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            {/* High-End Backdrop */}
            <div className="absolute inset-0 bg-[#05180D]/80 backdrop-blur-xl border-b border-white/5" />

            {/* We use max-w-6xl instead of 7xl to bring the logo and nav 
               closer to the center from left and right. 
            */}
            <div className="relative max-w-6xl mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
                
                {/* LEFT: LOGO */}
                <Link
                    href="/"
                    className="flex items-center gap-3 group"
                    onClick={() => setMobileOpen(false)}
                >
                    <Image
                        src="/Logo.png"
                        alt="Matera Media"
                        width={42}
                        height={42}
                        className="w-8 h-8 md:w-9 md:h-9 object-contain grayscale brightness-200 group-hover:grayscale-0 transition-all duration-500"
                        priority
                    />
                    {/* font-semibold instead of font-bold for a cleaner look */}
                    <span className="hidden sm:inline text-white font-instrument-sans font-semibold tracking-tight text-base">
                        Matera Media
                    </span>
                </Link>

                {/* RIGHT CLUSTER: NAV & BUTTON */}
                <div className="flex items-center gap-8 md:gap-10">
                    <nav className="hidden lg:flex items-center gap-7">
                        {links.map((item) => {
                            const isActive = pathname?.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`text-[10px] uppercase font-bold tracking-[0.15em] transition-all duration-300 hover:text-white ${
                                        isActive ? "text-emerald-400" : "text-white/40"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link href="#schedule" className="hidden sm:block group relative">
                            {/* Subtle Glow */}
                            <div className="absolute -inset-1 bg-white/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <button className="relative flex items-center gap-3 px-5 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-[0.1em] rounded-full transition-all active:scale-95 group-hover:bg-emerald-50">
                                Book A Call
                                <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center transition-transform group-hover:rotate-45">
                                    <ArrowRight className="w-2.5 h-2.5 text-white" />
                                </div>
                            </button>
                        </Link>

                        {/* Mobile Menu Icon */}
                        <button
                            type="button"
                            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/5 text-white"
                            onClick={() => setMobileOpen((v) => !v)}
                        >
                            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE OVERLAY */}
            {mobileOpen && (
                <div className="lg:hidden relative border-b border-white/5 bg-[#05180D]/98 backdrop-blur-2xl">
                    <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col gap-6">
                        {links.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="text-xl font-instrument-sans font-medium text-white/60"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="h-px w-full bg-white/5 my-2" />
                        <Link 
                            href="#schedule" 
                            className="flex items-center justify-center h-12 bg-white text-black text-sm font-bold rounded-xl"
                            onClick={() => setMobileOpen(false)}
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};