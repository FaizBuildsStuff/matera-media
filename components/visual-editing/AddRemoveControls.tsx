"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { useVisualEditing } from "./VisualEditingProvider";
import { cn } from "@/lib/utils";

interface AddRemoveControlsProps {
  id: string;
  field: string;
  itemKey?: string;
  onAdd?: () => void;
  onRemove?: () => void;
  className?: string;
  label?: string;
  newItemTemplate?: Record<string, any>;
}

export function AddRemoveControls({
  id,
  field,
  itemKey,
  onAdd,
  onRemove,
  className,
  label = "Item",
  newItemTemplate,
}: AddRemoveControlsProps) {
  const { isEditMode, addItem, removeItem } = useVisualEditing();

  if (!isEditMode) return null;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAdd) {
      onAdd();
    } else {
      const template = newItemTemplate || {
        title: `New ${label}`,
        description: `Description for new ${label}`,
        name: `New ${label}`,
      };
      addItem(id, field, template);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove();
    } else if (itemKey) {
      removeItem(id, field, itemKey);
    }
  };

  // Show "Add" button when no itemKey is given (or onAdd is explicitly set)
  if (!itemKey) {
    return (
      <button
        onClick={handleAdd}
        className={cn(
          "flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-tighter hover:bg-emerald-500 hover:text-black transition-all",
          className
        )}
      >
        <Plus className="w-3 h-3" /> Add {label}
      </button>
    );
  }

  // Show "Remove" button when an itemKey is provided
  return (
    <button
      onClick={handleRemove}
      className={cn(
        "flex items-center gap-1 rounded-full bg-red-500/20 px-2 py-1 text-[10px] font-bold text-red-400 uppercase tracking-tighter hover:bg-red-500 hover:text-white transition-all",
        className
      )}
    >
      <Trash2 className="w-3 h-3" />
    </button>
  );
}
