'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import React, { useMemo, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
        /* The root header is absolute */
        <header className="absolute top-0 left-0 right-0 z-50 font-satoshi bg-transparent pt-4 px-4 md:px-6">

            <div className="max-w-[90%] xl:max-w-[1400px] mx-auto relative h-16 bg-[#05180D]/80 border border-white/10 rounded-full px-5 md:px-10 flex items-center justify-between shadow-2xl backdrop-blur-xl z-50">

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
                    <span className="text-white font-bold tracking-tight text-sm uppercase">
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
                                    className={`relative text-xs uppercase font-bold tracking-[0.15em] transition-all duration-300 hover:text-white ${isActive ? "text-emerald-500" : "text-white/70"
                                        }`}
                                >
                                    {item.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="header-active-tab"
                                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)]"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-3">
                        <Link href="#schedule" className="hidden sm:block group relative">
                            <button className="relative flex items-center gap-3 px-6 py-2.5 bg-white text-black text-[11px] md:text-xs font-black uppercase tracking-[0.15em] rounded-full transition-all active:scale-95 hover:bg-emerald-50">
                                Book A Call
                                <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center transition-transform group-hover:rotate-45">
                                    <ArrowRight className="w-2.5 h-2.5 text-white" />
                                </div>
                            </button>
                        </Link>

                        <button
                            type="button"
                            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/5 text-white transition-all active:scale-90"
                            onClick={() => setMobileOpen((v) => !v)}
                        >
                            <AnimatePresence mode="wait">
                                {mobileOpen ? (
                                    <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                                        <X className="w-4 h-4" />
                                    </motion.div>
                                ) : (
                                    <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                                        <Menu className="w-4 h-4" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE FLOATING OVERLAY */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10, filter: "blur(10px)", scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                        exit={{ opacity: 0, y: -10, filter: "blur(10px)", scale: 0.95 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:hidden absolute top-[calc(100%+16px)] left-4 right-4 max-w-6xl mx-auto rounded-[2rem] bg-[#051A0E]/95 backdrop-blur-3xl border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden z-40"
                    >
                        <div className="flex flex-col p-8 gap-6 justify-center">
                            {links.map((item, idx) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`block text-xl uppercase font-black tracking-widest transition-all ${
                                            pathname === item.href 
                                            ? "text-emerald-400 pl-4 border-l-2 border-emerald-400" 
                                            : "text-white/60 hover:text-white hover:pl-2"
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                            
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.4, delay: links.length * 0.05, ease: "easeOut" }}
                                className="mt-4 pt-6 border-t border-white/10"
                            >
                                <Link href="#schedule" onClick={() => setMobileOpen(false)} className="group flex items-center justify-between w-full p-4 rounded-2xl bg-white text-[#051A0E]">
                                    <span className="text-sm font-black uppercase tracking-widest">Book A Call</span>
                                    <div className="w-8 h-8 rounded-full bg-[#051A0E] flex items-center justify-center transition-transform group-hover:-rotate-45">
                                        <ArrowRight className="w-4 h-4 text-emerald-400 stroke-[3]" />
                                    </div>
                                </Link>
                            </motion.div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};