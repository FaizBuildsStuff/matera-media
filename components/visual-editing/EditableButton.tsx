"use client";

import React, { useState } from "react";
import { useVisualEditing } from "./VisualEditingProvider";
import { cn } from "@/lib/utils";
import { Link2 } from "lucide-react";

interface EditableButtonProps {
  id: string;
  textField: string;
  linkField: string;
  sectionKey?: string;
  text: string;
  link: string;
  className?: string;
  children?: React.ReactNode;
}

export function EditableButton({ 
  id, 
  textField, 
  linkField, 
  sectionKey, 
  text, 
  link, 
  className,
  children 
}: EditableButtonProps) {
  const { isEditMode, addChange } = useVisualEditing();
  const [localText, setLocalText] = useState(text);
  const [localLink, setLocalLink] = useState(link);

  const handleTextChange = (e: React.FocusEvent<HTMLSpanElement>) => {
    const newText = e.target.innerText;
    if (newText !== text) {
      setLocalText(newText);
      const finalField = sectionKey ? `sections[_key == "${sectionKey}"].${textField}` : textField;
      addChange(id, finalField, newText);
    }
  };

  const handleLinkChange = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newLink = prompt("Enter button URL:", localLink);
    if (newLink !== null && newLink !== link) {
      setLocalLink(newLink);
      const finalField = sectionKey ? `sections[_key == "${sectionKey}"].${linkField}` : linkField;
      addChange(id, finalField, newLink);
    }
  };

  if (!isEditMode) {
    return (
      <a href={link} className={className}>
        {children || text}
      </a>
    );
  }

  return (
    <div className="group relative inline-block">
      <div className={cn(
        "absolute -inset-1 z-10 hidden rounded-md border border-dashed border-blue-400 bg-blue-50/5 pointer-events-none group-hover:block",
        isEditMode && "border-solid border-blue-500"
      )} />
      
      <div className="absolute -top-7 right-0 hidden group-hover:flex gap-1 z-20">
        <button
          onClick={handleLinkChange}
          className="rounded bg-blue-600 p-1 text-white hover:bg-blue-700 transition-colors"
          title="Edit Link"
        >
          <Link2 className="h-3 w-3" />
        </button>
        <span className="rounded bg-blue-500 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-tight">
          Button
        </span>
      </div>

      <div className={className}>
        {children ? (
          <div className="relative group/edit">
            {children}
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={handleTextChange}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/edit:opacity-100 bg-emerald-500/80 text-black font-black text-xs uppercase tracking-widest cursor-text rounded-full backdrop-blur-sm z-30 transition-all"
            >
              {localText}
            </span>
          </div>
        ) : (
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={handleTextChange}
            className="outline-none cursor-text text-inherit"
          >
            {localText}
          </span>
        )}
      </div>
    </div>
  );
}
