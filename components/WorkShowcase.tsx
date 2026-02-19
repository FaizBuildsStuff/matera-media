"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Play } from "lucide-react";
import Image from "next/image";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  
  // Handle various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

interface WorkItem {
    id: string;
    title: string;
    category: string;
    tags: string[];
    image?: string;
    videoUrl?: string;
    link?: string;
}

const DEFAULT_WORKS: WorkItem[] = [
    { id: "1", title: "Luma Interface", category: "Product Design", tags: ["UI/UX", "Motion"] },
    { id: "2", title: "Apex Finance", category: "Brand Identiy", tags: ["Branding", "Strategy"] },
    { id: "3", title: "Nvidia Reveal", category: "Commercial", tags: ["3D Animation", "VFX"] },
    { id: "4", title: "Flow State", category: "Art Direction", tags: ["Concept", "Visuals"] },
];

type WorkShowcaseContent = {
    title?: string;
    highlightedWord?: string;
    description?: string;
    items?: Array<{ 
        _key: string; 
        title?: string; 
        category?: string; 
        tags?: string[]; 
        image?: string;
        videoUrl?: string;
        link?: string;
    }>;
};

export const WorkShowcase = ({ content }: { content?: WorkShowcaseContent }) => {
    const title = content?.title ?? "Selected";
    const highlightedWord = content?.highlightedWord ?? "Works";
    const description = content?.description ?? "A curated selection of projects that define our approach to digital storytelling and visual excellence.";
    const works: WorkItem[] = (content?.items && content.items.length > 0
        ? content.items.map((i, idx) => ({
            id: i._key || String(idx),
            title: i.title ?? "",
            category: i.category ?? "",
            tags: i.tags ?? [],
            image: i.image,
            videoUrl: i.videoUrl,
            link: i.link,
          }))
        : DEFAULT_WORKS
    ).filter((w) => w.title);
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
            gsap.fromTo(headerRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 85%",
                    }
                }
            );

            // Grid Items Animation
            const items = gridRef.current?.querySelectorAll(".work-item");
            if (items) {
                gsap.fromTo(items,
                    { y: 60, opacity: 0, scale: 0.95 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: "top 80%",
                        }
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="work" className="py-32 px-6 bg-[#05180D] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -left-20 top-40 opacity-[0.03] pointer-events-none select-none">
                <img src="/Logo.png" alt="Matera Media Logo" className="w-[600px] h-auto object-contain" />
            </div>

            <div className="max-w-7xl mx-auto">
                <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-instrument-sans font-medium text-white mb-4">
                            {title} <span className="font-instrument-serif italic text-emerald-400">{highlightedWord}</span>
                        </h2>
                        <p className="text-white/60 max-w-md font-light">
                            {description}
                        </p>
                    </div>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {works.map((work) => {
                        const youtubeVideoId = work.videoUrl ? getYouTubeVideoId(work.videoUrl) : null;
                        const hasVideo = !!youtubeVideoId;
                        const hasImage = !!work.image;
                        
                        return (
                            <WorkItemCard 
                                key={work.id} 
                                work={work} 
                                youtubeVideoId={youtubeVideoId}
                                hasVideo={hasVideo}
                                hasImage={hasImage}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

function WorkItemCard({ 
    work, 
    youtubeVideoId, 
    hasVideo, 
    hasImage 
}: { 
    work: WorkItem; 
    youtubeVideoId: string | null; 
    hasVideo: boolean; 
    hasImage: boolean;
}) {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    
    const handleClick = () => {
        if (work.link) {
            window.open(work.link, '_blank');
        } else if (hasVideo && youtubeVideoId) {
            setIsVideoPlaying(true);
        }
    };
    
    const handleOpenYouTube = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (youtubeVideoId) {
            window.open(`https://www.youtube.com/watch?v=${youtubeVideoId}`, '_blank');
        }
    };
    
    return (
        <div className="work-item group cursor-pointer">
            {/* Card Media */}
            <div 
                className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white/5 border border-white/10 mb-6 transition-all duration-500 group-hover:border-white/20 group-hover:shadow-2xl group-hover:shadow-emerald-900/20"
                onClick={handleClick}
            >
                {hasVideo && isVideoPlaying ? (
                    // YouTube Video Embed
                    <div className="absolute inset-0 w-full h-full">
                        <iframe
                            className="absolute inset-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                            title={work.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            frameBorder="0"
                        />
                        <div className="absolute bottom-2 right-2 z-10">
                            <button
                                onClick={handleOpenYouTube}
                                className="px-2 py-1 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded text-white text-xs transition-colors border border-white/20"
                            >
                                YouTube
                            </button>
                        </div>
                    </div>
                ) : hasVideo && youtubeVideoId ? (
                    // Video Thumbnail
                    <>
                        <img
                            src={`https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`}
                            alt={work.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`;
                            }}
                        />
                        <div className="absolute inset-0 bg-[#0A2215]/50 group-hover:bg-[#0A2215]/30 transition-colors duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-500 delay-100">
                                <Play className="w-6 h-6 text-white fill-white ml-1" />
                            </div>
                        </div>
                    </>
                ) : hasImage ? (
                    // Sanity Image
                    <>
                        <Image
                            src={work.image!}
                            alt={work.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-[#0A2215]/50 group-hover:bg-[#0A2215]/30 transition-colors duration-500" />
                        {work.link && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-500 delay-100">
                                    <ArrowUpRight className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    // Placeholder
                    <>
                        <div className="absolute inset-0 bg-[#0A2215]/50 group-hover:bg-[#0A2215]/30 transition-colors duration-500" />
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-500 delay-100">
                                <Play className="w-6 h-6 text-white fill-white ml-1" />
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Card Content */}
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-2xl text-white font-medium mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                        {work.title}
                    </h3>
                    <p className="text-white/50 text-sm mb-3">{work.category}</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-end max-w-[50%]">
                    {work.tags.map((tag) => (
                        <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border-white/5 transition-all text-[10px] tracking-wide uppercase px-2 py-0.5"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    );
}
