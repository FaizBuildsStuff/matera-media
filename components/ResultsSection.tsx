"use client";

import React from "react";
import Image from "next/image";
import { useVisualEditing } from "./visual-editing/VisualEditingProvider";
import { EditableText } from "./visual-editing/EditableText";
import { AddRemoveControls } from "./visual-editing/AddRemoveControls";

interface ResultsSectionProps {
  items: any[];
  title: string;
  documentId?: string;
  label?: string;
}

export const ResultsSection = ({ items: originalItems, title, documentId, label = "Our Results" }: ResultsSectionProps) => {
  const { getLiveItems } = useVisualEditing();
  const items = getLiveItems(documentId || "", "results", originalItems);

  const resultFields = [
    { name: "label", label: "Metric Name", type: "string" as const, placeholder: "e.g. ROAS" },
    { name: "value", label: "Value", type: "string" as const, placeholder: "e.g. 12.5x" },
    { name: "title", label: "Client Name", type: "string" as const, placeholder: "e.g. Acme Corp" },
    { name: "uploadThingUrl", label: "Upload Video Proof", type: "video-upload" as const },
    { name: "imageUrl", label: "Upload Image Proof", type: "image-upload" as const },
  ];

  return (
    <section className="relative -mt-px py-24 px-6 bg-[#051A0E] overflow-hidden text-center border-none z-10">
      <div className="absolute top-0 left-0 w-full h-48 bg-linear-to-b from-[#051A0E] via-[#051A0E] to-transparent pointer-events-none z-20" />
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[60%] h-[50%] bg-white/3 blur-[160px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[40%] bg-white/2 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-30">
        <div className="flex flex-col items-center mb-16">
          <div className="flex justify-between items-center w-full max-w-xs mb-4">
            <span className="text-emerald-500 text-[10px] font-bold tracking-[0.4em] uppercase mx-auto">
              {documentId ? (
                <EditableText id={documentId} field="resultsLabel" value={label} as="span" />
              ) : label}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight whitespace-pre-wrap">
            {documentId ? (
              <EditableText id={documentId} field="resultsTitle" value={title} as="span" />
            ) : title}
          </h2>
          {documentId && (
            <div className="mt-8">
              <AddRemoveControls 
                id={documentId} 
                field="results" 
                label="Result" 
                fields={resultFields}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items?.map((item: any, i: number) => (
            <div key={item._key || i} className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 group">
              {item.uploadThingUrl ? (
                <video
                  src={item.uploadThingUrl + "#t=0.1"}
                  className="absolute inset-0 size-full object-cover opacity-70 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
                  muted
                  playsInline
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0.1;
                  }}
                />
              ) : item.imageUrl ? (
                // UploadThing image (uploaded via edit mode)
                <img
                  src={item.imageUrl}
                  alt={item.label || "Result Proof"}
                  className="absolute inset-0 size-full object-cover opacity-70 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
                />
              ) : item.image ? (
                // Sanity image (uploaded via Sanity Studio)
                <Image
                  src={item.image}
                  alt={item.label || "Result Proof"}
                  fill
                  className="object-cover opacity-70 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-emerald-950/20" />
              )}
              
              {documentId && (
                <div className="absolute top-4 right-4 z-40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black/60 backdrop-blur-md p-1.5 rounded-xl border border-white/10 shadow-xl">
                    <AddRemoveControls 
                      id={documentId} 
                      field="results" 
                      itemKey={item._key} 
                      label="Result"
                      initialData={item}
                      fields={resultFields}
                    />
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 text-left pointer-events-none">
                <p className="text-white font-bold text-lg">
                    {documentId ? (
                        <EditableText id={documentId} field={`results[_key == "${item._key}"].label`} value={item.label} as="span" />
                    ) : item.label}
                </p>
                <p className="text-emerald-400 font-bold text-2xl">
                    {documentId ? (
                        <EditableText id={documentId} field={`results[_key == "${item._key}"].value`} value={item.value} as="span" />
                    ) : item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-[#051A0E] via-[#051A0E]/80 to-transparent pointer-events-none z-20" />
    </section>
  );
};
