"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Sparkles, X, Settings } from "lucide-react";
import Image from "next/image";
import { useVisualEditing } from "./visual-editing/VisualEditingProvider";
import { EditableText } from "./visual-editing/EditableText";
import { AddRemoveControls } from "./visual-editing/AddRemoveControls";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_CATEGORIES = [
  { title: "Ad Creatives", slug: "ad-creatives" },
  { title: "Organic Content / YouTube", slug: "organic-content" },
  { title: "SaaS Videos", slug: "saas-videos" },
];

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

interface Category {
  title: string;
  slug: string;
}

interface WorkItem {
  id: string;
  title: string;
  category: string;
  tags: string[];
  image?: string;
  videoUrl?: string; // YouTube
  uploadThingUrl?: string; // UploadThing
  directVideoUrl?: string; // Sanity Upload
  videoSource?: "file" | "youtube" | "none" | "uploadthing";
  link?: string;
}

const DEFAULT_WORKS: WorkItem[] = [
  { id: "1", title: "Meta UGC Ad", category: "Ad Creatives", tags: ["UGC", "15s"], videoUrl: "https://www.youtube.com/shorts/dQw4w9WgXcQ" },
];

type WorkShowcaseContent = {
  title?: string;
  highlightedWord?: string;
  description?: string;
  categories?: Category[];
  items?: Array<{
    _key: string;
    title?: string;
    category?: string;
    tags?: string[];
    image?: string;
    videoUrl?: string;
    uploadThingUrl?: string;
    directVideoUrl?: string;
    videoSource?: "file" | "youtube" | "none" | "uploadthing";
    link?: string;
  }>;
};


export const WorkShowcase = ({
  content,
  initialCategory,
}: {
  content?: WorkShowcaseContent & { _documentId?: string; _sectionKey?: string };
  initialCategory?: string;
}) => {
  const documentId = content?._documentId;
  const sectionKey = content?._sectionKey;

  const title = content?.title ?? "Selected";
  const highlightedWord = content?.highlightedWord ?? "Works";
  const description = content?.description ?? "Shorts & reels that drive results. Filter by category.";

  const { getLiveItems, isEditMode } = useVisualEditing();

  // Get Categories
  const rawCategories = content?.categories || [];
  const categories: Category[] = getLiveItems(
    documentId || "",
    sectionKey ? `sections[_key == "${sectionKey}"].categories` : "categories",
    rawCategories
  ).length > 0 ? getLiveItems(
    documentId || "",
    sectionKey ? `sections[_key == "${sectionKey}"].categories` : "categories",
    rawCategories
  ) : DEFAULT_CATEGORIES;

  // Get Items
  const originalItems = content?.items || [];
  const items = getLiveItems(
    documentId || "",
    sectionKey ? `sections[_key == "${sectionKey}"].items` : "items",
    originalItems
  );

  const works: WorkItem[] = (
    items.length > 0
      ? items.map((i: any, idx: number) => ({
        id: i._key || String(idx),
        title: i.title ?? "",
        category: i.category ?? (categories[0]?.title || "Ad Creatives"),
        tags: i.tags ?? [],
        image: i.image,
        videoUrl: i.videoUrl,
        uploadThingUrl: i.uploadThingUrl,
        directVideoUrl: i.directVideoUrl,
        videoSource: i.videoSource,
        link: i.link,
      }))
      : DEFAULT_WORKS
  ).filter((w) => w.title);

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory ?? categories[0]?.slug ?? "ad-creatives");
  const [isInitialMount, setIsInitialMount] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const reelContainerRef = useRef<HTMLDivElement>(null);
  const gridWrapperRef = useRef<HTMLDivElement>(null);

  const activeCategoryTitle = categories.find(c => c.slug === activeCategory)?.title || categories[0]?.title;
  const filteredWorks = works.filter((w) => w.category === activeCategoryTitle);

  const handleCategoryClick = (slug: string) => {
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
    const targets = items.length > 0 ? Array.from(items) : emptyState ? [emptyState] : [];
    if (targets.length === 0) return;

    if (isInitialMount) {
      setIsInitialMount(false);
      const ctx = gsap.context(() => {
        gsap.fromTo(targets, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: "power3.out", scrollTrigger: { trigger: wrapper, start: "top 88%", end: "top 50%", scrub: 1.5 } });
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

  const workItemFields = [
    { name: "title", label: "Title", type: "string" as const, placeholder: "e.g. Meta UGC Ad" },
    {
      name: "category",
      label: "Category",
      type: "select" as const,
      options: categories.map(c => ({ label: c.title, value: c.title }))
    },
    {
      name: "videoSource",
      label: "Video Source",
      type: "select" as const,
      options: [
        { label: "UploadThing", value: "uploadthing" },
        { label: "YouTube", value: "youtube" },
        { label: "Sanity File", value: "file" },
        { label: "None", value: "none" },
      ]
    },
    { name: "uploadThingUrl", label: "Upload Video (UploadThing)", type: "video-upload" as const },
    { name: "videoUrl", label: "YouTube URL", type: "string" as const, placeholder: "https://..." },
    { name: "tags", label: "Tags", type: "array" as const, placeholder: "e.g. UGC" },
  ];

  return (
    <section ref={sectionRef} id="work" className="py-16 md:py-20 px-6  relative min-h-screen font-satoshi">

      {/* --- SEAMLESS MASK OVERLAYS (Disabled to allow glow bleed) --- */}
      <link href="https://api.fontshare.com/v2/css?f[]=satoshi@700,701&display=swap" rel="stylesheet" />

      {/* ── Powerful Static Fractal Rift Showcase Background ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Top Bleed Rift */}
        <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[120%] h-[400px] bg-emerald-500/[0.06] blur-[140px] rounded-[100%] rotate-[5deg] z-0" />

        {/* Central Ambient Glow */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[110%] h-[600px] bg-emerald-500/[0.08] blur-[160px] rounded-[100%] rotate-[-8deg] z-0" />
        
        {/* Opposing High-Intensity Static Rifts */}
        <div className="absolute top-[30%] right-[-10%] w-[80%] h-[500px] bg-lime-400/[0.06] blur-[140px] rounded-[100%] rotate-[18deg] z-0" />
        <div className="absolute bottom-[10%] left-[-15%] w-[90%] h-[600px] bg-emerald-600/[0.08] blur-[150px] rounded-[100%] rotate-[-22deg] z-0" />
        
        {/* Depth Spark */}
        <div className="absolute top-[50%] left-[20%] w-[350px] h-[350px] bg-emerald-400/[0.12] blur-[100px] rounded-full z-0" />

        {/* Bottom Bleed Rift */}
        <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[130%] h-[450px] bg-lime-500/[0.04] blur-[130px] rounded-[100%] rotate-[-10deg] z-0" />

        {/* Textured Overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        
        <div className="absolute -left-20 top-40 opacity-[0.02] select-none">
          <img src="/Logo.png" alt="Matera Media" className="w-[600px] h-auto object-contain" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-30">
        <div ref={headerRef} className="mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tighter font-satoshi flex items-center gap-3 md:gap-4 whitespace-pre-wrap leading-[1.05]">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white/80/80 animate-pulse shrink-0" />

            <span className="relative flex items-center">
              {documentId ? (
                <EditableText id={documentId} field="title" sectionKey={sectionKey} value={title} as="span" />
              ) : (
                title
              )}
              {highlightedWord && (
                <span className="text-white/80 italic font-medium ml-2 md:ml-3 px-1">
                  {documentId ? (
                    <EditableText id={documentId} field="highlightedWord" sectionKey={sectionKey} value={highlightedWord} as="span" />
                  ) : (
                    highlightedWord
                  )}
                </span>
              )}
            </span>
          </h2>
          <div className="text-white/40 max-w-xl font-normal text-lg leading-relaxed whitespace-pre-wrap">
            {documentId ? (
              <EditableText id={documentId} field="description" sectionKey={sectionKey} value={description} />
            ) : (
              description
            )}
          </div>
          {documentId && (
            <div className="mt-8">
              <AddRemoveControls
                id={documentId}
                field={sectionKey ? `sections[_key == "${sectionKey}"].items` : "items"}
                label="Work Item"
                fields={workItemFields}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <aside ref={leftRef} className="lg:w-72 shrink-0">
            <nav className="sticky top-32 space-y-2">
              <div className="flex items-center justify-between mb-8 pl-1">
                <p className="text-white/20 text-[9px] font-bold tracking-[0.4em] uppercase">Filter by category</p>
                {documentId && isEditMode && (
                  <div className="group relative">
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white/80 text-[10px] font-bold uppercase tracking-widest hover:bg-white text-black hover:text-black transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                      <Settings className="w-3 h-3" />
                      Manage
                    </button>
                    <div className="absolute left-0 top-full mt-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <div className=" border border-white/10 rounded-xl p-4 shadow-2xl min-w-[200px]">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/80/70 mb-4">Manage Categories</p>
                        <AddRemoveControls
                          id={documentId}
                          field={sectionKey ? `sections[_key == "${sectionKey}"].categories` : "categories"}
                          label="Category"
                          fields={[
                            { name: "title", label: "Title", type: "string", placeholder: "e.g. Motion Graphics" },
                            { name: "slug", label: "Slug", type: "string", placeholder: "e.g. motion-graphics" },
                          ]}
                        />
                        <div className="mt-4 space-y-3">
                          {categories.map((cat, idx) => (
                            <div key={idx} className="flex items-center justify-between group/cat bg-white/5 p-2 rounded-lg border border-white/5 hover:border-white/20 transition-all">
                              <span className="text-xs font-medium text-white/60">{cat.title}</span>
                              <AddRemoveControls
                                id={documentId}
                                field={sectionKey ? `sections[_key == "${sectionKey}"].categories` : "categories"}
                                itemKey={(cat as any)._key}
                                label="Category"
                                initialData={cat}
                                fields={[
                                  { name: "title", label: "Title", type: "string", placeholder: "e.g. Motion Graphics" },
                                  { name: "slug", label: "Slug", type: "string", placeholder: "e.g. motion-graphics" },
                                ]}
                                className="scale-90 origin-right"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={`relative block w-full text-left px-7 py-4 rounded-full text-[13px] font-bold tracking-tight transition-all duration-300 active:scale-[0.98] ${activeCategory === cat.slug
                    ? "text-black bg-white shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.04] border border-white/5"
                    }`}
                >
                  <span className="relative">{cat.title}</span>
                </button>
              ))}
            </nav>
          </aside>

          <div ref={rightRef} className="flex-1 min-w-0 overflow-hidden">
            <div ref={gridWrapperRef} className="relative">
              <div ref={reelContainerRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
                {filteredWorks.length > 0 ? (
                  filteredWorks.map((work) => (
                    <ReelCard
                      key={work.id}
                      work={work}
                      documentId={documentId}
                      sectionKey={sectionKey}
                      categories={categories}
                    />
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

function ReelCard({
  work,
  documentId,
  sectionKey,
  categories
}: {
  work: WorkItem;
  documentId?: string;
  sectionKey?: string;
  categories: Category[];
}) {
  const { isEditMode } = useVisualEditing();
  const [isCurrentlyPlaying, setIsCurrentlyPlaying] = useState(false);
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

  const workItemFields = [
    { name: "title", label: "Title", type: "string" as const, placeholder: "e.g. Meta UGC Ad" },
    {
      name: "category",
      label: "Category",
      type: "select" as const,
      options: categories.map(c => ({ label: c.title, value: c.title }))
    },
    {
      name: "videoSource",
      label: "Video Source",
      type: "select" as const,
      options: [
        { label: "UploadThing", value: "uploadthing" },
        { label: "YouTube", value: "youtube" },
        { label: "Sanity File", value: "file" },
        { label: "None", value: "none" },
      ]
    },
    { name: "uploadThingUrl", label: "Video Upload (UploadThing)", type: "video-upload" as const },
    { name: "videoUrl", label: "YouTube URL", type: "string" as const, placeholder: "https://..." },
    { name: "tags", label: "Tags", type: "array" as const, placeholder: "e.g. UGC" },
  ];

  return (
    <div className="reel-item group relative">
      <div
        className="relative aspect-[9/16] rounded-[1.5rem] overflow-hidden bg-white/5 border border-white/10 cursor-pointer transition-all duration-500 group-hover:border-white/20"
        onClick={!isCurrentlyPlaying ? handlePlayClick : undefined}
      >

        {/* --- IN-PLACE VIDEO PLAYER --- */}
        {isCurrentlyPlaying ? (
          <div className="absolute inset-0 size-full bg-black animate-in fade-in duration-500">
            {work.videoSource === "uploadthing" && work.uploadThingUrl ? (
              <video
                src={work.uploadThingUrl}
                className="size-full object-cover"
                controls
                autoPlay
                loop
                playsInline
              />
            ) : work.videoSource === "file" && work.directVideoUrl ? (
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
            {work.videoSource === "uploadthing" && work.uploadThingUrl ? (
              <div className="absolute inset-0 size-full">
                <video
                  src={`${work.uploadThingUrl}#t=0.1`}
                  preload="metadata"
                  muted
                  playsInline
                  className="size-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
            ) : work.videoSource === "file" && work.directVideoUrl ? (
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
              <div className="absolute inset-0 bg-white/5" />
            )}

            {/* Glass Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />

            {/* Center Play Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex size-14 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl opacity-0 scale-50 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
                <Play className="ml-1 size-6 fill-white text-white/80" />
              </div>
            </div>

            {/* Footer Info */}
            <div className="absolute bottom-6 left-6 right-6 space-y-2 pointer-events-none">
              <div className="flex flex-wrap gap-1.5">
                {work.tags?.slice(0, 2).map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-white/10 text-[8px] font-bold uppercase tracking-widest text-white/50">
                    {documentId ? (
                      <EditableText
                        id={documentId}
                        field={`items[_key == "${work.id}"].tags[${idx}]`}
                        sectionKey={sectionKey}
                        value={tag}
                        as="span"
                      />
                    ) : tag}
                  </span>
                ))}
              </div>
              <h3 className="text-sm font-bold tracking-tight text-white leading-tight whitespace-pre-wrap">
                {documentId ? (
                  <EditableText
                    id={documentId}
                    field={`items[_key == "${work.id}"].title`}
                    sectionKey={sectionKey}
                    value={work.title}
                    as="span"
                  />
                ) : work.title}
              </h3>
            </div>

            {/* Edit Controls Overlay */}
            {documentId && (
              <div className={`absolute top-4 right-4 z-40 transition-opacity ${isEditMode ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                <div className="bg-black/60 backdrop-blur-md p-1.5 rounded-xl border border-white/10 shadow-xl">
                  <AddRemoveControls
                    id={documentId}
                    field={sectionKey ? `sections[_key == "${sectionKey}"].items` : "items"}
                    itemKey={work.id}
                    label="Work Item"
                    initialData={work}
                    fields={workItemFields}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

