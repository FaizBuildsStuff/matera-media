"use client";

import React, { useState } from "react";
import { useVisualEditing } from "./VisualEditingProvider";
import { cn } from "@/lib/utils";
import { ImagePlus, Link2 } from "lucide-react";

interface EditableImageProps {
  id: string;
  field: string;
  sectionKey?: string;
  value: string; // The URL of the image
  className?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export function EditableImage({ id, field, sectionKey, value, className, alt, width, height }: EditableImageProps) {
  const { isEditMode, addChange } = useVisualEditing();
  const [localValue, setLocalValue] = useState(value);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleUrlChange = () => {
    const newUrl = prompt("Enter new image URL:", localValue);
    if (newUrl && newUrl !== localValue) {
      setLocalValue(newUrl);
      const finalField = sectionKey ? `sections[_key == "${sectionKey}"].${field}` : field;
      addChange(id, finalField, newUrl);
    }
  };

  if (!isEditMode) {
    return <img src={value} className={className} alt={alt} width={width} height={height} />;
  }

  return (
    <div className="group relative inline-block">
      <div
        className={cn(
          "absolute -inset-2 z-10 hidden rounded-md border-2 border-dashed border-blue-400 bg-blue-50/5 pointer-events-none group-hover:block",
          isEditMode && "border-solid border-blue-500"
        )}
      />
      
      <img src={localValue} className={className} alt={alt} width={width} height={height} />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-lg">
        <button
          onClick={handleUrlChange}
          className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-xl hover:bg-blue-700 transition-transform active:scale-95"
        >
          <Link2 className="h-4 w-4" />
          Replace Image URL
        </button>
      </div>

      <div className="absolute -top-6 left-0 hidden group-hover:block z-20">
        <span className="rounded bg-blue-500 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-tight">
          Edit {field}
        </span>
      </div>
    </div>
  );
}
