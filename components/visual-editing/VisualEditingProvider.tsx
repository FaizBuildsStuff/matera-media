"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Patch {
  id: string;
  set?: Record<string, any>;
  insert?: {
    after: string;
    items: any[];
  } | {
    before: string;
    items: any[];
  } | {
    replace: string;
    items: any[];
  };
  unset?: string[];
}

interface VisualEditingContextType {
  isAdmin: boolean;
  isEditMode: boolean;
  toggleEditMode: () => void;
  pendingChanges: Patch[];
  addChange: (id: string, field: string, value: any) => void;
  addItem: (id: string, field: string, item: any) => void;
  removeItem: (id: string, field: string, key: string) => void;
  saveChanges: () => Promise<void>;
  isSaving: boolean;
  hasChanges: boolean;
}

const VisualEditingContext = createContext<VisualEditingContextType | undefined>(undefined);

export function VisualEditingProvider({
  children,
  isAdmin: initialIsAdmin,
}: {
  children: React.ReactNode;
  isAdmin: boolean;
}) {
  const [isAdmin] = useState(initialIsAdmin);
  const [isEditMode, setIsEditMode] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<Patch[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const toggleEditMode = useCallback(() => {
    if (!isAdmin) return;
    setIsEditMode((prev) => !prev);
  }, [isAdmin]);

  const addChange = useCallback((id: string, field: string, value: any) => {
    setPendingChanges((prev) => {
      const existingPatchIndex = prev.findIndex((p) => p.id === id);
      if (existingPatchIndex > -1) {
        const newPatches = [...prev];
        newPatches[existingPatchIndex] = {
          ...newPatches[existingPatchIndex],
          set: { ...(newPatches[existingPatchIndex].set || {}), [field]: value },
        };
        return newPatches;
      }
      return [...prev, { id, set: { [field]: value } }];
    });
  }, []);

  const addItem = useCallback((id: string, field: string, item: any) => {
    setPendingChanges((prev) => {
      // For arrays, we use insert. Simple implementation: add to end.
      // We assume 'field' is the array path, e.g. 'plans' or 'sections'
      return [...prev, {
        id,
        insert: {
          after: `${field}[-1]`,
          items: [{ ...item, _key: Math.random().toString(36).substring(2, 11) }]
        }
      }];
    });
  }, []);

  const removeItem = useCallback((id: string, field: string, key: string) => {
    setPendingChanges((prev) => {
      const path = `${field}[_key == "${key}"]`;
      return [...prev, {
        id,
        unset: [path]
      }];
    });
  }, []);

  const saveChanges = useCallback(async () => {
    if (pendingChanges.length === 0) return;

    setIsSaving(true);
    try {
      const response = await fetch("/api/sanity/patch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patches: pendingChanges }),
      });

      if (response.ok) {
        setPendingChanges([]);
        setIsEditMode(false);
        router.refresh(); // Refetch data
      } else {
        console.error("Failed to save changes");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
      setIsSaving(false);
    }
  }, [pendingChanges, router]);

  // Keyboard shortcut 'E' to toggle edit mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "e" && isAdmin && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        toggleEditMode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAdmin, toggleEditMode]);

  return (
    <VisualEditingContext.Provider
      value={{
        isAdmin,
        isEditMode,
        toggleEditMode,
        pendingChanges,
        addChange,
        addItem,
        removeItem,
        saveChanges,
        isSaving,
        hasChanges: pendingChanges.length > 0,
      }}
    >
      {children}
    </VisualEditingContext.Provider>
  );
}

export function useVisualEditing() {
  const context = useContext(VisualEditingContext);
  if (context === undefined) {
    throw new Error("useVisualEditing must be used within a VisualEditingProvider");
  }
  return context;
}
