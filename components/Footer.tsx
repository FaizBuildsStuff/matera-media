'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="w-full bg-[#05180D] border-t border-white/5 relative overflow-hidden">

            {/* Background Gradient */}
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 py-20 pb-12">

                {/* Top Section - CTA */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 border-b border-white/5 pb-16">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-instrument-sans font-medium text-white mb-4">
                            Have a project in mind?
                        </h2>
                        <p className="text-white/50 text-lg font-light">
                            Let's create something extraordinary together.
                        </p>
                    </div>
                    <Link href="/#schedule" className="mt-8 md:mt-0 group flex items-center gap-3 bg-white text-[#05180D] px-8 py-4 rounded-full font-medium transition-all hover:bg-emerald-400 hover:scale-105">
                        Start a Project
                        <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45" />
                    </Link>
                </div>

                {/* Middle Section - Links */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
                    {/* Brand Column */}
                    <div className="md:col-span-4 flex flex-col gap-6">
                        <Link href="/" className="block w-fit hover:opacity-80 transition-opacity">
                            <Image
                                src="/Logo.png"
                                alt="Matera Media Logo"
                                width={120}
                                height={120}
                                className="w-auto h-16 object-contain"
                            />
                        </Link>
                        <p className="text-white/40 font-light leading-relaxed max-w-sm">
                            We help B2B Brands and Creators to Grow and Hit Revenue with Organic Content and Motion Ad Creatives.
                        </p>
                    </div>

                    {/* Navigation Column */}
                    <div className="md:col-span-2 md:col-start-6">
                        <h3 className="text-white font-medium mb-6">Menu</h3>
                        <ul className="flex flex-col gap-4">
                            {[
                                { name: 'Home', url: '/' },
                                { name: 'Ad Creatives', url: '/ad-creatives' },
                                { name: 'Organic Content/YouTube', url: '/organic-content-youtube' },
                                { name: 'SaaS Videos', url: '/saas-videos' },
                                { name: 'Privacy Policy', url: '/privacy-policy' },
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link href={item.url} className="text-white/50 hover:text-emerald-400 transition-colors text-sm font-light">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Column */}
                    <div className="md:col-span-3">
                        <h3 className="text-white font-medium mb-6">Connect</h3>
                        <ul className="flex flex-col gap-4">
                            {[
                                { name: 'Twitter / X', url: '#' },
                                { name: 'LinkedIn', url: '#' },
                                { name: 'Instagram', url: '#' },
                                { name: 'YouTube', url: '#' },
                            ].map((social) => (
                                <li key={social.name}>
                                    <Link href={social.url} className="text-white/50 hover:text-emerald-400 transition-colors text-sm font-light flex items-center gap-2 group">
                                        {social.name}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section - Legal */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
                    <p className="text-white/30 text-sm font-light mb-4 md:mb-0">
                        © {new Date().getFullYear()} Matera Media. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        <Link href="/privacy-policy" className="text-white/30 hover:text-white text-sm font-light transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-white/30 hover:text-white text-sm font-light transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
