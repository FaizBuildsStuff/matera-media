"use client";

import React, { useState, useEffect, useRef } from "react";
import { useVisualEditing } from "./VisualEditingProvider";
import { cn } from "@/lib/utils";

interface EditableTextProps {
  id: string;
  field: string;
  sectionKey?: string;
  value: string;
  className?: string;
  as?: React.ElementType;
}

export function EditableText({ id, field, sectionKey, value, className, as: Component = "div" }: EditableTextProps) {
  const { isEditMode, addChange } = useVisualEditing();
  const [localValue, setLocalValue] = useState(value);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleBlur = () => {
    if (contentRef.current) {
      const newValue = contentRef.current.innerText;
      if (newValue !== value) {
        setLocalValue(newValue);
        const finalField = sectionKey ? `sections[_key == "${sectionKey}"].${field}` : field;
        addChange(id, finalField, newValue);
      }
    }
  };

  if (!isEditMode) {
    return <Component className={className}>{value}</Component>;
  }

  return (
    <div className="group relative">
      {/* Border: always shown on mobile (touch), hover-only on desktop */}
      <div
        className={cn(
          "absolute -inset-1 z-10 rounded-md border-2 border-dashed border-blue-500/40 bg-blue-50/5 pointer-events-none",
          "opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
        )}
      />
      {/* Edit badge: always shown on mobile, hover-only on desktop */}
      <div className="absolute -top-5 left-0 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
        <span className="rounded bg-blue-500 px-1.5 py-0.5 text-[9px] font-bold text-white uppercase tracking-tight shadow-lg">
          Tap to edit
        </span>
      </div>
      <Component
        ref={contentRef}
        contentEditable
        suppressContentEditableWarning
        onBlur={handleBlur}
        className={cn(
          className,
          "outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:rounded-sm cursor-text"
        )}
      >
        {localValue}
      </Component>
    </div>
  );
}
