'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import React, { useMemo, useState } from "react";
import { Menu, X } from "lucide-react";

export const Header = () => {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const links = useMemo(
        () => [
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Ad Creatives", href: "/ad-creatives" },
            { label: "Organic Content/YouTube", href: "/organic-content-youtube" },
            { label: "SaaS Videos", href: "/saas-videos" },
        ],
        []
    );

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <div className="absolute inset-0 bg-[#05180D]/70 backdrop-blur-xl border-b border-white/5" />

            <div className="relative max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-3 hover:opacity-90 transition-opacity"
                    onClick={() => setMobileOpen(false)}
                >
                    <Image
                        src="/Logo.png"
                        alt="Matera Media"
                        width={56}
                        height={56}
                        className="w-10 h-10 md:w-12 md:h-12 object-contain drop-shadow-xl"
                        priority
                    />
                    <span className="hidden sm:inline text-white font-instrument-sans font-medium tracking-tight">
                        Matera Media
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    {links.map((item) => {
                        const isActive =
                            item.href === "/"
                                ? pathname === "/"
                                : pathname?.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-sm font-light transition-colors ${isActive
                                    ? "text-emerald-300"
                                    : "text-white/60 hover:text-white"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <button
                    type="button"
                    className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                    aria-expanded={mobileOpen}
                    onClick={() => setMobileOpen((v) => !v)}
                >
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen ? (
                <div className="md:hidden relative border-b border-white/5 bg-[#05180D]/95 backdrop-blur-xl">
                    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
                        {links.map((item) => {
                            const isActive =
                                item.href === "/"
                                    ? pathname === "/"
                                    : pathname?.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`py-2 text-base transition-colors ${isActive
                                        ? "text-emerald-300"
                                        : "text-white/70 hover:text-white"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </header>
    );
};
