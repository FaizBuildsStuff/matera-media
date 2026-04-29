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
  moveItem: (id: string, field: string, key: string, direction: 'up' | 'down') => void;
  updateItem: (id: string, field: string, key: string, data: Record<string, any>) => void;
  getLiveItems: <T>(id: string, field: string, originalItems: T[] | null | undefined) => T[];
  getLiveValue: <T>(id: string, field: string, defaultValue: T) => T;
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

  const moveItem = useCallback((id: string, field: string, key: string, direction: 'up' | 'down') => {
    setPendingChanges((prev) => {
      return [...prev, {
        id,
        move: { path: `${field}[_key == "${key}"]`, direction } as any
      }];
    });
  }, []);

  const updateItem = useCallback((id: string, field: string, key: string, data: Record<string, any>) => {
    setPendingChanges((prev) => {
      const setPatches: Record<string, any> = {};
      Object.entries(data).forEach(([attr, value]) => {
        setPatches[`${field}[_key == "${key}"].${attr}`] = value;
      });
      return [...prev, { id, set: setPatches }];
    });
  }, []);

  const getLiveItems = useCallback(<T,>(id: string, field: string, originalItems: T[] | null | undefined): T[] => {
    let items = originalItems ? [...originalItems] : [];
    
    // Apply patches for this id
    pendingChanges.filter(p => p.id === id).forEach(patch => {
      if (patch.insert && (patch.insert as any).after === `${field}[-1]`) {
        items = [...items, ...(patch.insert as any).items];
      }
      if (patch.set) {
        Object.entries(patch.set).forEach(([path, value]) => {
          if (path.startsWith(field)) {
            const subPath = path.substring(field.length);
            const keyMatch = subPath.match(/\[_key == "([^"]+)"\]/);
            if (keyMatch) {
              const key = keyMatch[1];
              const attr = path.split("].").pop();
              if (attr) {
                items = items.map((item: any) => 
                  item._key === key ? { ...item, [attr]: value } : item
                );
              }
            }
          }
        });
      }
      if (patch.unset) {
        patch.unset.forEach(path => {
          if (path.startsWith(field)) {
            const subPath = path.substring(field.length);
            const keyMatch = subPath.match(/\[_key == "([^"]+)"\]/);
            if (keyMatch) {
              const key = keyMatch[1];
              items = items.filter((item: any) => item._key !== key);
            }
          }
        });
      }
      if ((patch as any).move && (patch as any).move.path.startsWith(field)) {
        const movePath = (patch as any).move.path;
        const direction = (patch as any).move.direction;
        const subPath = movePath.substring(field.length);
        const keyMatch = subPath.match(/\[_key == "([^"]+)"\]/);
        if (keyMatch) {
          const key = keyMatch[1];
          const index = items.findIndex((item: any) => item._key === key);
          if (index !== -1) {
            const newIndex = direction === 'up' ? index - 1 : index + 1;
            if (newIndex >= 0 && newIndex < items.length) {
              const [movedItem] = items.splice(index, 1);
              items.splice(newIndex, 0, movedItem);
            }
          }
        }
      }
    });
    
    return items;
  }, [pendingChanges]);

  const getLiveValue = useCallback(<T,>(id: string, field: string, defaultValue: T): T => {
    const patch = pendingChanges.find(p => p.id === id && p.set && p.set[field] !== undefined);
    return patch ? patch.set![field] : defaultValue;
  }, [pendingChanges]);

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
        moveItem,
        updateItem,
        getLiveItems,
        getLiveValue,
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
