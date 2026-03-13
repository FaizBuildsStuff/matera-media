"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Sparkles, X } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  { id: "ad-creatives", label: "Ad Creatives", slug: "ad-creatives" },
  { id: "organic-content", label: "Organic Content / YouTube", slug: "organic-content" },
  { id: "saas-videos", label: "SaaS Videos", slug: "saas-videos" },
] as const;

type CategorySlug = (typeof CATEGORIES)[number]["slug"];

function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

function mapCategoryToSlug(category: string): CategorySlug {
  const c = category?.toLowerCase() || "";
  if (c.includes("ad") || c.includes("creative")) return "ad-creatives";
  if (c.includes("organic") || c.includes("youtube") || c.includes("content")) return "organic-content";
  if (c.includes("saas") || c.includes("software")) return "saas-videos";
  return "ad-creatives";
}

interface WorkItem {
  id: string;
  title: string;
  category: string;
  categorySlug: CategorySlug;
  tags: string[];
  image?: string;
  videoUrl?: string;
  directVideoUrl?: string;
  videoSource?: "file" | "youtube" | "none";
  link?: string;
}

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
    directVideoUrl?: string;
    videoSource?: "file" | "youtube" | "none";
    link?: string;
  }>;
};

export const WorkShowcase = ({
  content,
  initialCategory,
}: {
  content?: WorkShowcaseContent;
  initialCategory?: CategorySlug;
}) => {
  const description = content?.description ?? "Shorts & reels that drive results. Filter by category.";
  
  const works: WorkItem[] = (
    content?.items && content.items.length > 0
      ? content.items.map((i, idx) => ({
          id: i._key || String(idx),
          title: i.title ?? "",
          category: i.category ?? "Ad Creatives",
          categorySlug: mapCategoryToSlug(i.category ?? "Ad Creatives"),
          tags: i.tags ?? [],
          image: i.image,
          videoUrl: i.videoUrl,
          directVideoUrl: i.directVideoUrl,
          videoSource: i.videoSource,
          link: i.link,
        }))
      : []
  ).filter((w) => w.title);

  const [activeCategory, setActiveCategory] = useState<CategorySlug>(initialCategory ?? "ad-creatives");
  const [isInitialMount, setIsInitialMount] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const reelContainerRef = useRef<HTMLDivElement>(null);

  const filteredWorks = works.filter((w) => w.categorySlug === activeCategory);

  const handleCategoryClick = (slug: CategorySlug) => {
    if (slug === activeCategory) return;
    setActiveCategory(slug);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: headerRef.current, start: "top 85%" } });
      gsap.fromTo(leftRef.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: leftRef.current, start: "top 85%" } });
      gsap.fromTo(rightRef.current, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: rightRef.current, start: "top 85%" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!reelContainerRef.current) return;
    const items = reelContainerRef.current.querySelectorAll(".reel-item");
    if (items.length === 0) return;

    if (isInitialMount) {
      setIsInitialMount(false);
      const ctx = gsap.context(() => {
        gsap.fromTo(items, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: "power3.out", scrollTrigger: { trigger: reelContainerRef.current, start: "top 88%" } });
      }, reelContainerRef);
      return () => ctx.revert();
    }

    gsap.fromTo(items, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out", overwrite: true });
  }, [activeCategory, filteredWorks.length, isInitialMount]);

  return (
    <section ref={sectionRef} id="work" className="min-h-screen relative overflow-hidden bg-[#05180D] px-6 py-32 font-satoshi">
      <link href="https://api.fontshare.com/v2/css?f[]=satoshi@700,701&display=swap" rel="stylesheet" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={headerRef} className="mb-20">
          <p className="mb-4 flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-emerald-400/80">
            <Sparkles className="size-3.5" />
            Portfolio
          </p>
          <p className="max-w-xl text-lg font-light leading-relaxed text-white/50">{description}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <aside ref={leftRef} className="lg:w-72 shrink-0">
            <nav className="sticky top-32 space-y-0.5">
              <p className="mb-6 pl-1 text-xs font-medium tracking-widest uppercase text-white/30">Filter</p>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={`relative block w-full rounded-2xl border px-6 py-4 text-left text-base font-medium transition-all duration-300 ${activeCategory === cat.slug
                      ? "border-white/10 bg-white/8 text-white"
                      : "border-transparent text-white/40 hover:bg-white/4 hover:text-white/70"
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </nav>
          </aside>

          <div ref={rightRef} className="flex-1">
            <div ref={reelContainerRef} className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
              {filteredWorks.map((work) => (
                <ReelCard key={work.id} work={work} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function ReelCard({ work }: { work: WorkItem }) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const youtubeVideoId = work.videoUrl ? getYouTubeVideoId(work.videoUrl) : null;

  // Modern Hover-to-Play logic for the card preview
  const handleMouseEnter = () => {
    if (videoRef.current && work.videoSource === "file") {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && work.videoSource === "file") {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <>
      <div 
        className="reel-item group relative" 
        onClick={() => setIsOverlayOpen(true)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="aspect-9/16 relative cursor-pointer overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 transition-all duration-500 group-hover:border-emerald-500/40 group-hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.2)]">
          
          {/* --- MEDIA LAYER --- */}
          {work.videoSource === "file" && work.directVideoUrl ? (
            <div className="absolute inset-0 size-full">
              <video 
                ref={videoRef}
                src={`${work.directVideoUrl}#t=0.1`}
                preload="metadata"
                muted
                loop
                playsInline
                className="size-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>
          ) : work.image ? (
            <Image src={work.image} alt={work.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
          ) : youtubeVideoId ? (
            <img src={`https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`} className="size-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="" />
          ) : (
            <div className="absolute inset-0 bg-emerald-950/20" />
          )}

          {/* --- GLASS OVERLAY --- */}
          <div className="absolute inset-0 bg-linear-to-t from-[#05180D] via-transparent to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />
          
          {/* --- CENTER PLAY ACTION --- */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex size-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-2xl opacity-0 scale-50 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
              <Play className="ml-1 size-7 fill-emerald-400 text-emerald-400" />
            </div>
          </div>

          {/* --- FOOTER INFO --- */}
          <div className="absolute bottom-8 left-8 right-8 space-y-2">
            <div className="flex items-center gap-2">
                <div className="h-px w-4 bg-emerald-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                   {work.category}
                </span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white font-satoshi leading-tight">
              {work.title}
            </h3>
          </div>
        </div>
      </div>

      {/* --- PREMIUM FULLSCREEN DIALOG --- */}
      {isOverlayOpen && (
        <div className="z-100 fixed inset-0 flex items-center justify-center bg-[#05180D]/95 p-6 backdrop-blur-3xl animate-in fade-in duration-300">
          
          {/* Backplate to close */}
          <div className="absolute inset-0" onClick={() => setIsOverlayOpen(false)} />

          {/* Magnetic Close Button */}
          <button 
            onClick={() => setIsOverlayOpen(false)} 
            className="absolute top-10 right-10 z-110 flex size-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-white hover:text-black hover:scale-110 active:scale-95"
          >
            <X className="size-6" />
          </button>
          
          {/* Video Container */}
          <div className="aspect-9/16 relative w-full max-w-[420px] overflow-hidden rounded-[3rem] border border-white/10 bg-black shadow-[0_0_100px_-20px_rgba(16,185,129,0.3)] animate-in zoom-in-95 duration-500">
            {work.videoSource === "file" && work.directVideoUrl ? (
              <video 
                src={work.directVideoUrl} 
                className="size-full object-contain" 
                controls 
                autoPlay 
                loop 
                playsInline
              />
            ) : youtubeVideoId ? (
              <iframe 
                className="size-full" 
                src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`} 
                allow="autoplay; encrypted-media" 
                allowFullScreen 
              />
            ) : (
                <div className="flex items-center justify-center size-full text-white/20">Source Not Found</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}