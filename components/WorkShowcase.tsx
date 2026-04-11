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
  videoUrl?: string; // YouTube
  directVideoUrl?: string; // Sanity Upload
  videoSource?: "file" | "youtube" | "none";
  link?: string;
}

const DEFAULT_WORKS: WorkItem[] = [
  { id: "1", title: "Meta UGC Ad", category: "Ad Creatives", categorySlug: "ad-creatives", tags: ["UGC", "15s"], videoUrl: "https://www.youtube.com/shorts/dQw4w9WgXcQ" },
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
    directVideoUrl?: string; // Mapped from videoFile.asset->url in GROQ
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
  const title = content?.title ?? "Selected";
  const highlightedWord = content?.highlightedWord ?? "Works";
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
      : DEFAULT_WORKS
  ).filter((w) => w.title);

  const [activeCategory, setActiveCategory] = useState<CategorySlug>(initialCategory ?? "ad-creatives");
  const [isInitialMount, setIsInitialMount] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const reelContainerRef = useRef<HTMLDivElement>(null);
  const gridWrapperRef = useRef<HTMLDivElement>(null);

  const filteredWorks = works.filter((w) => w.categorySlug === activeCategory);

  const handleCategoryClick = (slug: CategorySlug) => {
    if (slug === activeCategory) return;
    setActiveCategory(slug);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: headerRef.current, start: "top 85%" } });
      gsap.fromTo(leftRef.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: leftRef.current, start: "top 85%", end: "top 20%" } });
      gsap.fromTo(rightRef.current, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: rightRef.current, start: "top 85%", end: "top 20%" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!reelContainerRef.current || !gridWrapperRef.current) return;

    const items = reelContainerRef.current.querySelectorAll(".reel-item");
    const emptyState = reelContainerRef.current.querySelector(".reel-empty-state");
    const wrapper = gridWrapperRef.current;
    const targets = items.length > 0 ? items : emptyState;
    if (!targets || (Array.isArray(targets) && targets.length === 0)) return;

    if (isInitialMount) {
      setIsInitialMount(false);
      const ctx = gsap.context(() => {
        gsap.fromTo(targets, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, stagger: Array.isArray(targets) ? 0.06 : 0, ease: "power3.out", scrollTrigger: { trigger: wrapper, start: "top 88%", end: "top 50%", scrub: 1.5 } });
      }, reelContainerRef);
      return () => ctx.revert();
    }

    gsap.set(targets, { x: -80, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(targets, {
      x: 0,
      opacity: 1,
      duration: 0.65,
      stagger: items.length > 0 ? { each: 0.07, from: "start" } : 0,
      overwrite: true,
    });

    return () => tl.kill();
  }, [activeCategory, filteredWorks.length, isInitialMount]);

  return (
    <section ref={sectionRef} id="work" className="py-32 px-6 bg-[#05180D] relative overflow-hidden min-h-screen font-satoshi">

      {/* --- SEAMLESS MASK OVERLAYS --- */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#05180D] to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#05180D] to-transparent z-20 pointer-events-none" />
      <link href="https://api.fontshare.com/v2/css?f[]=satoshi@700,701&display=swap" rel="stylesheet" />

      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -left-20 top-40 opacity-[0.02] pointer-events-none select-none">
        <img src="/Logo.png" alt="Matera Media" className="w-[600px] h-auto object-contain" />
      </div>

      <div className="max-w-7xl mx-auto relative z-30">
        <div ref={headerRef} className="mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tighter font-satoshi flex items-center gap-3 md:gap-4 whitespace-pre-wrap leading-[1.05]">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-emerald-400/80 animate-pulse shrink-0" />

            <span className="relative">
              {title}
              {highlightedWord && (
                <span className="text-emerald-400 italic font-medium ml-2 md:ml-3 px-1">
                  {highlightedWord}
                </span>
              )}
            </span>
          </h2>
          <p className="text-white/40 max-w-xl font-normal text-lg leading-relaxed whitespace-pre-wrap">{description}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <aside ref={leftRef} className="lg:w-72 shrink-0">
            <nav className="sticky top-32 space-y-2">
              <p className="text-white/20 text-[9px] font-bold tracking-[0.4em] uppercase mb-8 pl-1">Protocol / Filter</p>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={`relative block w-full text-left px-7 py-4 rounded-full text-[13px] font-bold tracking-tight transition-all duration-300 active:scale-[0.98] ${activeCategory === cat.slug
                    ? "text-black bg-white shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.04] border border-white/5"
                    }`}
                >
                  <span className="relative">{cat.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          <div ref={rightRef} className="flex-1 min-w-0 overflow-hidden">
            <div ref={gridWrapperRef} className="relative">
              <div ref={reelContainerRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
                {filteredWorks.length > 0 ? (
                  filteredWorks.map((work) => (
                    <ReelCard key={work.id} work={work} />
                  ))
                ) : (
                  <div className="reel-empty-state col-span-full py-24 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/5 border border-white/10 mb-6">
                      <Play className="w-8 h-8 text-white/30" />
                    </div>
                    <p className="text-white/40 font-light">No reels in this category yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function ReelCard({ work }: { work: WorkItem }) {
  const [isCurrentlyPlaying, setIsCurrentlyPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const youtubeVideoId = work.videoUrl ? getYouTubeVideoId(work.videoUrl) : null;

  // Handle Play Action
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCurrentlyPlaying(true);
  };

  // Handle Stop/Reset Action
  const handleStopVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCurrentlyPlaying(false);
  };

  return (
    <div className="reel-item group relative">
      <div
        className="relative aspect-[9/16] rounded-[1.5rem] overflow-hidden bg-white/5 border border-white/10 cursor-pointer transition-all duration-500 group-hover:border-emerald-500/30"
        onClick={!isCurrentlyPlaying ? handlePlayClick : undefined}
      >

        {/* --- IN-PLACE VIDEO PLAYER --- */}
        {isCurrentlyPlaying ? (
          <div className="absolute inset-0 size-full bg-black animate-in fade-in duration-500">
            {work.videoSource === "file" && work.directVideoUrl ? (
              <video
                src={work.directVideoUrl}
                className="size-full object-cover"
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

            {/* In-place Close Button (Only shows on hover when playing) */}
            <button
              onClick={handleStopVideo}
              className="absolute top-4 right-4 z-20 flex size-10 items-center justify-center rounded-full bg-black/60 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-black"
            >
              <X className="size-5" />
            </button>
          </div>
        ) : (
          /* --- THUMBNAIL / PREVIEW LAYER --- */
          <>
            {work.videoSource === "file" && work.directVideoUrl ? (
              <div className="absolute inset-0 size-full">
                <video
                  src={`${work.directVideoUrl}#t=0.1`}
                  preload="metadata"
                  muted
                  playsInline
                  className="size-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
            ) : work.image ? (
              <Image src={work.image} alt={work.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
            ) : youtubeVideoId ? (
              <img
                src={`https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`}
                className="size-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt=""
                onError={(e) => ((e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`)}
              />
            ) : (
              <div className="absolute inset-0 bg-emerald-950/20" />
            )}

            {/* Glass Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#05180D] via-transparent to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />

            {/* Center Play Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex size-14 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl opacity-0 scale-50 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
                <Play className="ml-1 size-6 fill-emerald-400 text-emerald-400" />
              </div>
            </div>

            {/* Footer Info */}
            <div className="absolute bottom-6 left-6 right-6 space-y-2 pointer-events-none">
              <div className="flex flex-wrap gap-1.5">
                {work.tags?.slice(0, 2).map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-white/10 text-[8px] font-bold uppercase tracking-widest text-white/50">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-sm font-bold tracking-tight text-white leading-tight whitespace-pre-wrap">
                {work.title}
              </h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
}