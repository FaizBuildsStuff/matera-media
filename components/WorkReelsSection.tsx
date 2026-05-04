"use client";

import React, { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Play, Volume2 } from "lucide-react";
import Image from "next/image";
import { useVisualEditing } from "./visual-editing/VisualEditingProvider";
import { EditableText } from "./visual-editing/EditableText";
import { EditableButton } from "./visual-editing/EditableButton";
import { AddRemoveControls } from "./visual-editing/AddRemoveControls";

// --- Reel Card Component ---
const ReelCard = ({ item, isPlaying, onToggle, documentId }: { item: any; isPlaying: boolean; onToggle: () => void; documentId?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isEditMode } = useVisualEditing();

  React.useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(e => console.log("Auto-play blocked", e));
        videoRef.current.muted = false;
      } else {
        videoRef.current.pause();
        videoRef.current.muted = true;
      }
    }
  }, [isPlaying]);

  const videoUrl = item.videoSource === "uploadthing" ? item.uploadThingUrl : (item.videoSource === "file" ? item.directVideoUrl : null);
  const youtubeVideoId = item.videoSource === "youtube" ? item.videoUrl?.split('v=')[1]?.split('&')[0] : null;

  const workItemFields = [
    { name: "title", label: "Reel Title", type: "string" as const, placeholder: "e.g. Performance Ad" },
    { name: "category", label: "Category", type: "string" as const, placeholder: "e.g. Motion Design" },
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
    { name: "videoUrl", label: "YouTube URL", type: "string" as const, placeholder: "https://youtube.com/..." },
    { name: "tags", label: "Tags", type: "array" as const, placeholder: "e.g. UGC" },
  ];

  return (
    <div
      onClick={onToggle}
      className="snap-center shrink-0 w-[240px] md:w-[280px] h-[440px] md:h-[500px] bg-white/2 rounded-[2rem] border border-white/10 relative overflow-hidden group cursor-pointer shadow-2xl transition-all duration-500 hover:border-emerald-500/20"
    >
      <div className="absolute inset-0 z-0">
        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl + "#t=0.1"}
            className={`w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-50 group-hover:opacity-70'}`}
            preload="metadata"
            loop
            playsInline
          />
        ) : item.image ? (
          <Image src={item.image} alt={item.title} fill className="object-cover opacity-50 group-hover:opacity-70 transition-opacity" />
        ) : youtubeVideoId ? (
          <img
            src={`https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`}
            className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity"
            alt=""
            onError={(e) => (e.currentTarget.src = `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`)}
          />
        ) : (
          <div className="w-full h-full bg-emerald-950/20" />
        )}
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent z-10" />

      <div className="absolute inset-0 flex items-center justify-center z-20">
        {!isPlaying && (
          <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 duration-300">
            <Play className="fill-current w-4 h-4 ml-1" />
          </div>
        )}
      </div>

      {documentId && (
        <div className={`absolute top-3 right-3 z-40 transition-opacity ${isEditMode ? "opacity-100" : "opacity-0 group-hover:opacity-100 md:group-hover:opacity-100"}`}>
          <div className="bg-black/60 backdrop-blur-md p-1.5 rounded-xl border border-white/10 shadow-xl">
            <AddRemoveControls
              id={documentId}
              field="work.items"
              itemKey={item._key}
              label="Reel"
              initialData={item}
              fields={workItemFields}
            />
          </div>
        </div>
      )}

      <div className="absolute bottom-8 left-8 right-8 z-20 pointer-events-none">
        <p className="text-emerald-400 text-[9px] font-black uppercase tracking-widest mb-1.5">
          {documentId ? (
            <EditableText id={documentId} field={`work.items[_key == "${item._key}"].category`} value={item.category} as="span" />
          ) : item.category}
        </p>
        <h4 className="text-white text-lg font-bold tracking-tight mb-2 leading-tight">
          {documentId ? (
            <EditableText id={documentId} field={`work.items[_key == "${item._key}"].title`} value={item.title} as="span" />
          ) : item.title}
        </h4>
        {isPlaying && (
          <div className="flex items-center gap-2 text-white/50 text-[8px] uppercase tracking-widest font-bold">
            <Volume2 className="w-2.5 h-2.5 text-emerald-400" />
            Playing
          </div>
        )}
      </div>

      {isPlaying && youtubeVideoId && (
        <div className="absolute inset-0 z-40 bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=0&controls=0&loop=1&playlist=${youtubeVideoId}`}
            className="w-full h-full"
            allow="autoplay"
          />
        </div>
      )}
    </div>
  );
};

export const WorkReelsSection = ({ workData, documentId }: { workData?: any; documentId?: string }) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const { getLiveItems } = useVisualEditing();

  const title = workData?.title || "Our Work";
  const label = workData?.description || "Industry-leading production.";
  const originalItems = workData?.items || [];
  const items = getLiveItems(documentId || "", "work.items", originalItems);

  return (
    <section className="relative -mt-px pt-24 pb-20 px-6 bg-[#051A0E] overflow-hidden border-none z-10">
      <div className="absolute top-0 left-0 w-full h-48 bg-linear-to-b from-[#051A0E] via-[#051A0E] to-transparent pointer-events-none z-20" />
      <div className="absolute top-[10%] left-[-15%] w-[50%] h-[50%] bg-white/2 blur-[160px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-white/2 blur-[140px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-30">
        <div className="mb-10">
          {/* Heading — always left-aligned */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
                {documentId ? (
                  <EditableText id={documentId} field="work.title" value={title} as="span" />
                ) : title}
              </h2>
              <div className="text-emerald-400 text-lg italic font-semibold opacity-80">
                {documentId ? (
                  <EditableText id={documentId} field="work.description" value={label} />
                ) : label}
              </div>
              {documentId && (
                <div className="mt-4">
                  <AddRemoveControls
                    id={documentId}
                    field="work.items"
                    label="Reel"
                    fields={[
                      { name: "title", label: "Reel Title", type: "string" as const, placeholder: "e.g. Performance Ad" },
                      { name: "category", label: "Category", type: "string" as const, placeholder: "e.g. Motion Design" },
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
                      { name: "videoUrl", label: "YouTube URL", type: "string" as const, placeholder: "https://youtube.com/..." },
                      { name: "tags", label: "Tags", type: "array" as const, placeholder: "e.g. UGC" },
                    ]}
                  />
                </div>
              )}
            </div>
            {/* Arrow nav — right on sm+, below heading on xs */}
            <div className="flex gap-3 shrink-0">
              <button onClick={() => scroll('left')} className="p-4 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button onClick={() => scroll('right')} className="p-4 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4">
          {items.map((item: any, i: number) => (
            <ReelCard
              key={item._key || i}
              item={item}
              documentId={documentId}
              isPlaying={playingId === (item._key || String(i))}
              onToggle={() => setPlayingId(playingId === (item._key || String(i)) ? null : (item._key || String(i)))}
            />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-[#051A0E] via-[#051A0E]/80 to-transparent pointer-events-none z-20" />
    </section>
  );
};
