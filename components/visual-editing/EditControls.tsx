"use client";

import React from "react";
import { useVisualEditing } from "./VisualEditingProvider";
import { Edit2, Save, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function EditControls() {
  const { isAdmin, isEditMode, toggleEditMode, saveChanges, isSaving, hasChanges } = useVisualEditing();

  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end gap-3">
      <AnimatePresence>
        {isEditMode && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="flex flex-col gap-3"
          >
            {hasChanges && (
              <button
                onClick={saveChanges}
                disabled={isSaving}
                className="flex h-12 items-center gap-2 rounded-full bg-emerald-500 px-6 font-medium text-white shadow-lg transition-all hover:bg-emerald-600 active:scale-95 disabled:opacity-50"
              >
                {isSaving ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Save className="h-5 w-5" />
                )}
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            )}
            
            <button
              onClick={toggleEditMode}
              className="flex h-12 items-center gap-2 rounded-full bg-white px-6 font-medium text-slate-900 shadow-lg ring-1 ring-slate-200 transition-all hover:bg-slate-50 active:scale-95"
            >
              <X className="h-5 w-5" />
              Cancel
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!isEditMode && (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleEditMode}
          className="flex h-14 items-center gap-2 rounded-full bg-slate-900 px-8 font-semibold text-white shadow-2xl transition-colors hover:bg-slate-800"
        >
          <Edit2 className="h-5 w-5" />
          Edit Site
        </motion.button>
      )}
      
      {isEditMode && (
        <div className="rounded-full bg-blue-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg animate-pulse">
          Edit Mode Active
        </div>
      )}
    </div>
  );
}
