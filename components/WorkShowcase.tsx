"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Sparkles } from "lucide-react";
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
  const c = category.toLowerCase();
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
  link?: string;
}

const DEFAULT_WORKS: WorkItem[] = [
  { id: "1", title: "Meta UGC Ad", category: "Ad Creatives", categorySlug: "ad-creatives", tags: ["UGC", "15s"], videoUrl: "https://www.youtube.com/shorts/dQw4w9WgXcQ" },
  { id: "2", title: "TikTok Performance", category: "Ad Creatives", categorySlug: "ad-creatives", tags: ["Hook", "6s"] },
  { id: "3", title: "YouTube Short", category: "Organic Content", categorySlug: "organic-content", tags: ["Vertical", "60s"] },
  { id: "4", title: "Creator Reel", category: "Organic Content", categorySlug: "organic-content", tags: ["Behind Scenes"] },
  { id: "5", title: "Product Demo", category: "SaaS Videos", categorySlug: "saas-videos", tags: ["Explainer"] },
  { id: "6", title: "Feature Launch", category: "SaaS Videos", categorySlug: "saas-videos", tags: ["30s"] },
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

  // Initial scroll-in animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: headerRef.current, start: "top 85%" } });
      gsap.fromTo(leftRef.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: leftRef.current, start: "top 85%", end: "top 20%" } });
      gsap.fromTo(rightRef.current, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: rightRef.current, start: "top 85%", end: "top 20%" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Category-switch: content slides in from left, cards cascade with stagger
  useEffect(() => {
    if (!reelContainerRef.current || !gridWrapperRef.current) return;

    const items = reelContainerRef.current.querySelectorAll(".reel-item");
    const emptyState = reelContainerRef.current.querySelector(".reel-empty-state");
    const wrapper = gridWrapperRef.current;
    const targets = items.length > 0 ? items : emptyState;
    if (!targets || (Array.isArray(targets) && targets.length === 0)) return;

    // On first mount, use scroll-based reveal; on category change, use click-based animation
    if (isInitialMount) {
      setIsInitialMount(false);
      const ctx = gsap.context(() => {
        gsap.fromTo(targets, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, stagger: Array.isArray(targets) ? 0.06 : 0, ease: "power3.out", scrollTrigger: { trigger: wrapper, start: "top 88%", end: "top 50%", scrub: 1.5 } });
      }, reelContainerRef);
      return () => ctx.revert();
    }

    // Category change: content opens from left with stagger
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
    <section ref={sectionRef} id="work" className="py-32 px-6 bg-[#05180D] relative overflow-hidden min-h-screen">
      {/* Ambient backgrounds */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -left-20 top-40 opacity-[0.02] pointer-events-none select-none">
        <img src="/Logo.png" alt="Matera Media" className="w-[600px] h-auto object-contain" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={headerRef} className="mb-20">
          <p className="text-emerald-400/80 text-xs font-medium tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Portfolio
          </p>
          <h2 className="text-4xl md:text-6xl font-instrument-sans font-medium text-white mb-6 tracking-tight">
            {title} <span className="font-instrument-serif italic text-emerald-400/90">{highlightedWord}</span>
          </h2>
          <p className="text-white/50 max-w-xl font-light text-lg leading-relaxed">{description}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left - Categories */}
          <aside ref={leftRef} className="lg:w-72 shrink-0">
            <nav className="sticky top-32 space-y-0.5">
              <p className="text-white/30 text-xs font-medium tracking-widest uppercase mb-6 pl-1">Filter</p>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={`relative block w-full text-left px-6 py-4 rounded-2xl text-base font-medium transition-all duration-300 active:scale-[0.98] ${
                    activeCategory === cat.slug
                      ? "text-white bg-white/[0.08] border border-white/10 shadow-lg shadow-emerald-950/20"
                      : "text-white/40 hover:text-white/70 hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  {activeCategory === cat.slug && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-gradient-to-b from-emerald-400 to-emerald-600" />
                  )}
                  <span className="relative pl-1">{cat.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Right - Reels Grid */}
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
                  <p className="text-white/25 text-sm mt-2">Add content from Sanity Studio</p>
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
  const [isPlaying, setIsPlaying] = useState(false);
  const youtubeVideoId = work.videoUrl ? getYouTubeVideoId(work.videoUrl) : null;

  const handleClick = () => {
    if (work.link) window.open(work.link, "_blank");
    else if (youtubeVideoId) setIsPlaying(true);
  };

  const handleOpenYouTube = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (youtubeVideoId) window.open(`https://www.youtube.com/watch?v=${youtubeVideoId}`, "_blank");
  };

  return (
    <div className="reel-item group">
      <div
        className="relative aspect-[9/16] rounded-[1.25rem] overflow-hidden bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm cursor-pointer transition-all duration-500 hover:border-emerald-500/20 hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.15)] hover:scale-[1.02]"
        onClick={handleClick}
      >
        {youtubeVideoId && isPlaying ? (
          <div className="absolute inset-0">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeVideoId}`}
              title={work.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              frameBorder="0"
            />
            <button
              onClick={handleOpenYouTube}
              className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-lg text-white text-xs font-medium border border-white/10 hover:bg-black/90 transition-colors"
            >
              YouTube
            </button>
          </div>
        ) : youtubeVideoId ? (
          <>
            <img
              src={`https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`}
              alt={work.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => ((e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                <Play className="w-7 h-7 text-white fill-white ml-1" />
              </div>
            </div>
          </>
        ) : work.image ? (
          <>
            <Image src={work.image} alt={work.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                <Play className="w-7 h-7 text-white fill-white ml-1" />
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/[0.04] to-transparent">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <Play className="w-7 h-7 text-white/40 fill-white/20 ml-1" />
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {work.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] text-white/70 uppercase tracking-wider font-medium">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-white font-medium text-sm tracking-tight">{work.title}</h3>
        </div>
      </div>
    </div>
  );
}
