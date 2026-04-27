"use client";

import React, { useState } from "react";
import { Plus, Trash2, ArrowUp, ArrowDown, Settings2 } from "lucide-react";
import { useVisualEditing } from "./VisualEditingProvider";
import { cn } from "@/lib/utils";
import { AddItemDialog, Field } from "./AddItemDialog";

interface AddRemoveControlsProps {
  id: string;
  field: string;
  itemKey?: string;
  onAdd?: (data?: Record<string, any>) => void;
  onRemove?: () => void;
  className?: string;
  label?: string;
  newItemTemplate?: Record<string, any>;
  fields?: Field[];
  initialData?: Record<string, any>;
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
  fields,
  initialData,
}: AddRemoveControlsProps) {
  const { isEditMode, addItem, removeItem, moveItem, updateItem } = useVisualEditing();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  if (!isEditMode) return null;

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (fields && fields.length > 0) {
      setIsDialogOpen(true);
    } else {
      handleAdd();
    }
  };

  const handleAdd = (data?: Record<string, any>) => {
    if (onAdd) {
      onAdd(data);
    } else {
      const template = data || newItemTemplate || {
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
  const handleMove = (e: React.MouseEvent, direction: 'up' | 'down') => {
    e.stopPropagation();
    if (itemKey) {
      moveItem(id, field, itemKey, direction);
    }
  };

  const handleEdit = (data: Record<string, any>) => {
    if (itemKey) {
      updateItem(id, field, itemKey, data);
    }
  };

  // Show "Add" button when no itemKey is given (or onAdd is explicitly set)
  if (!itemKey) {
    return (
      <>
        <button
          onClick={handleAddClick}
          className={cn(
            "flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-tighter hover:bg-emerald-500 hover:text-black transition-all group/add shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]",
            className
          )}
        >
          <Plus className="w-3 h-3 group-hover/add:scale-125 transition-transform" /> Add {label}
        </button>

        {fields && (
          <AddItemDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onSave={handleAdd}
            fields={fields}
            title={`Add ${label}`}
            description={`Enter the details for the new ${label.toLowerCase()} below.`}
          />
        )}
      </>
    );
  }

  // Show "Remove" and "Move" buttons when an itemKey is provided
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {fields && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); setIsEditDialogOpen(true); }}
            className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all shadow-[0_0_10px_rgba(16,185,129,0.1)]"
            title="Edit Details"
          >
            <Settings2 className="w-3 h-3" />
          </button>
          <AddItemDialog
            isOpen={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
            onSave={handleEdit}
            fields={fields}
            initialData={initialData}
            title={`Edit ${label}`}
            description={`Update the details for this ${label.toLowerCase()} below.`}
          />
        </>
      )}
      <button
        onClick={(e) => handleMove(e, 'up')}
        className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition-all shadow-[0_0_10px_rgba(59,130,246,0.1)] hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
        title="Move Up"
      >
        <ArrowUp className="w-3 h-3" />
      </button>
      <button
        onClick={(e) => handleMove(e, 'down')}
        className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition-all shadow-[0_0_10px_rgba(59,130,246,0.1)] hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
        title="Move Down"
      >
        <ArrowDown className="w-3 h-3" />
      </button>
      <button
        onClick={handleRemove}
        className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-[0_0_10px_rgba(239,68,68,0.1)] hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
        title="Remove"
      >
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  );
}
