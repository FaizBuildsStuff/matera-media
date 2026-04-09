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
            { label: "Careers", href: "/careers" },
            { label: "Privacy", href: "/privacy-policy" },
        ],
        []
    );

    return (
        /* The root header is transparent and absolute */
        <header className="absolute top-0 left-0 right-0 z-50 font-satoshi bg-transparent pt-4">
            
            {/* This inner DIV is the actual header bar. 
               It has the background, the border, and the 'cut' look on the sides.
            */}
            <div className="max-w-6xl mx-auto h-16 bg-[#05180D] border border-white/10 rounded-full px-6 md:px-10 flex items-center justify-between shadow-2xl backdrop-blur-xl">
                
                {/* LEFT: LOGO */}
                <Link
                    href="/"
                    className="flex items-center gap-2.5 group"
                    onClick={() => setMobileOpen(false)}
                >
                    <Image
                        src="/Logo.png"
                        alt="Matera Media"
                        width={30}
                        height={30}
                        className="w-7 h-7 object-contain grayscale brightness-200 transition-all duration-500"
                        priority
                    />
                    <span className="text-white font-bold tracking-tight text-xs uppercase">
                        Matera Media
                    </span>
                </Link>

                {/* RIGHT CLUSTER */}
                <div className="flex items-center gap-8">
                    <nav className="hidden lg:flex items-center gap-6">
                        {links.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`text-[10px] uppercase font-bold tracking-[0.15em] transition-all duration-300 hover:text-white ${
                                        isActive ? "text-emerald-500" : "text-white/40"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link href="/book" className="hidden sm:block group relative">
                            <button className="relative flex items-center gap-3 px-6 py-2.5 bg-white text-black text-[9px] font-black uppercase tracking-[0.15em] rounded-full transition-all active:scale-95 hover:bg-emerald-50">
                                Book A Call
                                <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center transition-transform group-hover:rotate-45">
                                    <ArrowRight className="w-2.5 h-2.5 text-white" />
                                </div>
                            </button>
                        </Link>

                        <button
                            type="button"
                            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-full border border-white/10 text-white"
                            onClick={() => setMobileOpen((v) => !v)}
                        >
                            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE OVERLAY */}
            {mobileOpen && (
                <div className="lg:hidden max-w-6xl mx-auto mt-2 rounded-2xl bg-[#05180D] border border-white/10 overflow-hidden">
                    <div className="px-8 py-10 flex flex-col gap-6 text-center">
                        {links.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={`text-lg font-bold uppercase tracking-widest transition-colors ${
                                    pathname === item.href ? "text-emerald-500" : "text-white/60"
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};