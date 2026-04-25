"use client";

import React, { useState, useEffect, useRef } from "react";
import { useVisualEditing } from "./VisualEditingProvider";
import { cn } from "@/lib/utils";

interface EditableTextProps {
  id: string;
  field: string;
  sectionKey?: string; // If provided, updates a section in an array
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
      <div
        className={cn(
          "absolute -inset-2 z-10 hidden rounded-md border-2 border-dashed border-blue-400 bg-blue-50/5 pointer-events-none group-hover:block",
          isEditMode && "border-solid border-blue-500"
        )}
      />
      <div className="absolute -top-6 left-0 hidden group-hover:block z-20">
        <span className="rounded bg-blue-500 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-tight shadow-lg">
          Edit
        </span>
      </div>
      <Component
        ref={contentRef}
        contentEditable
        suppressContentEditableWarning
        onBlur={handleBlur}
        className={cn(
          className,
          "outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:rounded-sm",
          isEditMode && "cursor-text hover:bg-slate-50/50"
        )}
      >
        {localValue}
      </Component>
    </div>
  );
}
