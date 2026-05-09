'use client'

import { EditableButton } from "@/components/visual-editing/EditableButton";
import { EditableText } from "@/components/visual-editing/EditableText";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";

const Page = ({ content }: { content?: any }) => {
    const documentId = content?._documentId;
    const sectionKey = content?._sectionKey;

    const topText =
        content?.topText || "SERVICE FOUNDERS & INFO ENTREPRENEURS!";

    const headline =
        content?.headline ||
        "We help B2B Brands and Content Creators scale their revenue through Organic Content and Motion Ad Creatives";

    const ctaPrimary = content?.ctaPrimary || "Book a Strategy Call";

    const ctaLink = content?.ctaPrimaryLink || "#";

    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section
            ref={containerRef}
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6"
        >
            {/* ───────────────── PERFECT LUXURY CINEMATIC BACKGROUND ───────────────── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">

                {/* Deep Base */}
                <div className="absolute inset-0 bg-[#020202]" />

                {/* MAIN GIANT ATMOSPHERE */}
                <div
                    className="absolute left-1/2 top-[-55%] -translate-x-1/2"
                    style={{
                        width: "3200px",
                        height: "3200px",
                        background:
                            "radial-gradient(circle, rgba(16,185,129,0.24) 0%, rgba(16,185,129,0.14) 14%, rgba(16,185,129,0.07) 30%, rgba(16,185,129,0.03) 46%, rgba(16,185,129,0.015) 58%, transparent 78%)",
                        filter: "blur(320px)",
                        opacity: 1,
                        transform: "translate3d(-50%,0,0)",
                    }}
                />

                {/* SECONDARY SOFT GLOW */}
                <div
                    className="absolute left-1/2 top-[-18%] -translate-x-1/2"
                    style={{
                        width: "2400px",
                        height: "2400px",
                        background:
                            "radial-gradient(circle, rgba(110,231,183,0.16) 0%, rgba(52,211,153,0.07) 24%, rgba(16,185,129,0.03) 40%, transparent 76%)",
                        filter: "blur(340px)",
                        opacity: 0.95,
                    }}
                />

                {/* MAIN SPOTLIGHT */}
                <div
                    className="absolute left-1/2 top-[-10%] -translate-x-1/2"
                    style={{
                        width: "62%",
                        height: "155%",
                        background:
                            "radial-gradient(ellipse 50% 76% at 50% 18%, rgba(16,185,129,0.22) 0%, rgba(16,185,129,0.11) 24%, rgba(16,185,129,0.05) 42%, rgba(16,185,129,0.02) 58%, transparent 82%)",
                        filter: "blur(260px)",
                        opacity: 1,
                    }}
                />

                {/* INNER LUXURY CORE */}
                <div
                    className="absolute left-1/2 top-[0%] -translate-x-1/2"
                    style={{
                        width: "1200px",
                        height: "1200px",
                        background:
                            "radial-gradient(circle, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.018) 28%, transparent 72%)",
                        filter: "blur(180px)",
                        opacity: 0.85,
                    }}
                />

                {/* SIDE GLOW LEFT */}
                <div
                    className="absolute left-[-15%] top-[5%]"
                    style={{
                        width: "1600px",
                        height: "2200px",
                        background:
                            "radial-gradient(circle, rgba(16,185,129,0.08) 0%, rgba(16,185,129,0.035) 34%, rgba(16,185,129,0.015) 52%, transparent 80%)",
                        filter: "blur(360px)",
                        opacity: 0.9,
                        transform: "rotate(8deg)",
                    }}
                />

                {/* SIDE GLOW RIGHT */}
                <div
                    className="absolute right-[-15%] top-[5%]"
                    style={{
                        width: "1600px",
                        height: "2200px",
                        background:
                            "radial-gradient(circle, rgba(16,185,129,0.08) 0%, rgba(16,185,129,0.035) 34%, rgba(16,185,129,0.015) 52%, transparent 80%)",
                        filter: "blur(360px)",
                        opacity: 0.9,
                        transform: "rotate(-8deg)",
                    }}
                />

                {/* BOTTOM AMBIENT DEPTH */}
                <div
                    className="absolute left-1/2 bottom-[-50%] -translate-x-1/2"
                    style={{
                        width: "2400px",
                        height: "1400px",
                        background:
                            "radial-gradient(circle, rgba(16,185,129,0.06) 0%, rgba(16,185,129,0.02) 40%, transparent 78%)",
                        filter: "blur(300px)",
                        opacity: 0.9,
                    }}
                />

                {/* TOP WHITE BLOOM */}
                <div
                    className="absolute left-1/2 top-[-25%] -translate-x-1/2"
                    style={{
                        width: "1600px",
                        height: "900px",
                        background:
                            "radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 38%, transparent 78%)",
                        filter: "blur(240px)",
                        opacity: 0.7,
                    }}
                />

                {/* EXTRA CENTER ATMOSPHERE */}
                <div
                    className="absolute left-1/2 top-[18%] -translate-x-1/2"
                    style={{
                        width: "900px",
                        height: "900px",
                        background:
                            "radial-gradient(circle, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.008) 38%, transparent 74%)",
                        filter: "blur(140px)",
                        opacity: 0.6,
                    }}
                />

                {/* PREMIUM GRAIN */}
                <div
                    className="absolute inset-0 opacity-[0.022] mix-blend-soft-light"
                    style={{
                        backgroundImage:
                            "url('https://grainy-gradients.vercel.app/noise.svg')",
                        backgroundSize: "360px 360px",
                    }}
                />

            </div>

            {/* ───────────────── Content ───────────────── */}
            <div className="relative z-10 flex max-w-[950px] flex-col items-center text-center">

                {/* Top Text */}
                <div className="mb-6">
                    <span className="font-satoshi text-[10px] font-bold uppercase tracking-[0.28em] text-white/45 sm:text-[11px]">
                        {documentId ? (
                            <EditableText
                                id={documentId}
                                field="topText"
                                sectionKey={sectionKey}
                                value={topText}
                                as="span"
                            />
                        ) : (
                            topText
                        )}
                    </span>
                </div>

                {/* Heading */}
                <h1 className="max-w-[950px] font-satoshi text-[3.2rem] font-bold leading-[0.92] tracking-[-0.06em] text-white sm:text-6xl md:text-7xl lg:text-[6.5rem]">
                    {documentId ? (
                        <EditableText
                            id={documentId}
                            field="headline"
                            sectionKey={sectionKey}
                            value={headline}
                            as="span"
                        />
                    ) : (
                        headline
                    )}
                </h1>

                {/* CTA */}
                <div className="mt-10">
                    {documentId ? (
                        <EditableButton
                            id={documentId}
                            textField="ctaPrimary"
                            linkField="ctaPrimaryLink"
                            sectionKey={sectionKey}
                            text={ctaPrimary}
                            link={ctaLink}
                            className="group"
                        >
                            <div className="group flex items-center rounded-full bg-white p-1.5 pr-6 transition-all duration-300 hover:scale-[1.02]">

                                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-black">
                                    <ArrowRight className="h-4 w-4 stroke-[3px] text-white" />
                                </div>

                                <span className="font-satoshi text-[0.95rem] font-bold tracking-tight text-black">
                                    {ctaPrimary}
                                </span>

                            </div>
                        </EditableButton>
                    ) : (
                        <Link href={ctaLink}>
                            <div className="group flex items-center rounded-full bg-white p-1.5 pr-6 transition-all duration-300 hover:scale-[1.02]">

                                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-black">
                                    <ArrowRight className="h-4 w-4 stroke-[3px] text-white" />
                                </div>

                                <span className="font-satoshi text-[0.95rem] font-bold tracking-tight text-black">
                                    {ctaPrimary}
                                </span>

                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Page;