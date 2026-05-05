'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Mail, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import { EditableText } from './visual-editing/EditableText';
import { EditableButton } from './visual-editing/EditableButton';
import { AddRemoveControls } from './visual-editing/AddRemoveControls';

interface FooterSettings {
    _id?: string;
    logo?: string;
    footerLinks?: Array<{ _key: string; label: string; href: string }>;
    socialLinks?: Array<{ _key: string; platform: string; url: string }>;
    copyright?: string;
    slogan?: string;
}

export const Footer = ({ settings }: { settings?: FooterSettings }) => {
    const documentId = settings?._id;

    const defaultLinks = [
        { _key: '1', label: 'Home', href: '/' },
        { _key: '2', label: 'Ad Creatives', href: '/ad-creatives' },
        { _key: '3', label: 'Organic/YouTube Growth', href: '/organic-content-youtube' },
        { _key: '4', label: 'SaaS Videos', href: '/saas-videos' },
        { _key: '5', label: 'Privacy', href: '/privacy-policy' },
    ];

    const defaultSocials = [
        { _key: 's1', platform: 'twitter', url: '#' },
        { _key: 's2', platform: 'linkedin', url: '#' },
        { _key: 's3', platform: 'instagram', url: '#' },
        { _key: 's4', platform: 'youtube', url: '#' },
        { _key: 's5', platform: 'email', url: 'mailto:info@materamedia.com' },
    ];

    const links = settings?.footerLinks || defaultLinks;
    const socials = settings?.socialLinks || defaultSocials;
    const logoUrl = settings?.logo || "/Logo.png";
    const copyright = settings?.copyright || "MATERA MEDIA";
    const slogan = settings?.slogan || "Engineered for Attention & Revenue";

    const getSocialIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'twitter': return <Twitter className="w-4 h-4" />;
            case 'linkedin': return <Linkedin className="w-4 h-4" />;
            case 'instagram': return <Instagram className="w-4 h-4" />;
            case 'youtube': return <Youtube className="w-4 h-4" />;
            case 'email': return <Mail className="w-4 h-4" />;
            default: return <Mail className="w-4 h-4" />;
        }
    };

    return (
        <footer className="w-full bg-[#050505] relative overflow-hidden">
            {/* --- BACKGROUND DESIGN ELEMENTS --- */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
                {/* Large Scale Subtle Watermark */}
                <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-bold text-white/[0.015] uppercase tracking-tight whitespace-nowrap">
                    {documentId ? (
                        <EditableText id={documentId} field="copyright" value={copyright} as="span" />
                    ) : copyright}
                </h2>

                {/* Depth Glows */}
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]" />
                <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* --- CENTERED BRANDING & NAVIGATION --- */}
                <div className="pt-12 pb-24 flex flex-col items-center">
                    {/* Centered Logo with Refined Treatment */}
                    <Link href="/" className="mb-12 hover:opacity-80 transition-opacity duration-500">
                        <Image
                            src={logoUrl}
                            alt={`${copyright} Logo`}
                            width={160}
                            height={160}
                            className="w-auto h-14 grayscale brightness-200"
                        />
                    </Link>

                    {/* Minimalist Navigation Grid */}
                    <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-16">
                        {links.map((item) => (
                            <div key={item._key || item.label} className="group/link relative">
                                {documentId ? (
                                    <>
                                        <EditableButton
                                            id={documentId}
                                            textField={`footerLinks[_key == "${item._key}"].label`}
                                            linkField={`footerLinks[_key == "${item._key}"].href`}
                                            text={item.label}
                                            link={item.href}
                                        >
                                            <div className="text-white/30 hover:text-white transition-all duration-300 text-[11px] font-bold uppercase tracking-[0.25em] cursor-pointer">
                                                {item.label}
                                            </div>
                                        </EditableButton>
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover/link:opacity-100 transition-opacity">
                                            <AddRemoveControls
                                                id={documentId}
                                                field="footerLinks"
                                                itemKey={item._key}
                                                label="Link"
                                                initialData={item}
                                                fields={[
                                                    { name: "label", label: "Label", type: "string", placeholder: "Home" },
                                                    { name: "href", label: "URL", type: "string", placeholder: "/" }
                                                ]}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="text-white/30 hover:text-white transition-all duration-300 text-[11px] font-bold uppercase tracking-[0.25em]"
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                        {documentId && (
                            <AddRemoveControls
                                id={documentId}
                                field="footerLinks"
                                label="Link"
                                fields={[
                                    { name: "label", label: "Label", type: "string", placeholder: "Home" },
                                    { name: "href", label: "URL", type: "string", placeholder: "/" }
                                ]}
                            />
                        )}
                    </div>

                    {/* Social Circle Links - High Contrast */}
                    <div className="flex gap-5">
                        {socials.map((social, idx) => (
                            <div key={social._key || idx} className="group/social relative">
                                {documentId ? (
                                    <>
                                        <EditableButton
                                            id={documentId}
                                            textField={`socialLinks[_key == "${social._key}"].platform`}
                                            linkField={`socialLinks[_key == "${social._key}"].url`}
                                            text={social.platform}
                                            link={social.url}
                                        >
                                            <div className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 hover:bg-white hover:text-black hover:border-white transition-all duration-700 transform hover:-translate-y-1 cursor-pointer">
                                                {getSocialIcon(social.platform)}
                                            </div>
                                        </EditableButton>
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover/social:opacity-100 transition-opacity">
                                            <AddRemoveControls
                                                id={documentId}
                                                field="socialLinks"
                                                itemKey={social._key}
                                                label="Social"
                                                initialData={social}
                                                fields={[
                                                    { name: "platform", label: "Platform", type: "string", placeholder: "twitter" },
                                                    { name: "url", label: "URL", type: "string", placeholder: "https://..." }
                                                ]}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        href={social.url}
                                        className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 hover:bg-white hover:text-black hover:border-white transition-all duration-700 transform hover:-translate-y-1"
                                    >
                                        {getSocialIcon(social.platform)}
                                    </Link>
                                )}
                            </div>
                        ))}
                        {documentId && (
                            <AddRemoveControls
                                id={documentId}
                                field="socialLinks"
                                label="Social"
                                fields={[
                                    { name: "platform", label: "Platform", type: "string", placeholder: "twitter" },
                                    { name: "url", label: "URL", type: "string", placeholder: "https://..." }
                                ]}
                            />
                        )}
                    </div>
                </div>

                {/* --- BOTTOM LEGAL STRIP --- */}
                <div className="pt-8 pb-12 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5">
                    {/* Copyright & Slogan */}
                    <div className="flex flex-col items-center md:items-start gap-1">
                        <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase font-bold">
                            © {new Date().getFullYear()} {documentId ? (
                                <EditableText id={documentId} field="copyright" value={copyright} as="span" />
                            ) : copyright}
                        </p>
                        <p className="text-white/10 text-[9px] tracking-widest uppercase font-normal">
                            {documentId ? (
                                <EditableText id={documentId} field="slogan" value={slogan} as="span" />
                            ) : slogan}
                        </p>
                    </div>

                    {/* Legal Links */}
                    <div className="flex gap-12">
                        <Link href="/privacy-policy" className="text-white/10 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
;