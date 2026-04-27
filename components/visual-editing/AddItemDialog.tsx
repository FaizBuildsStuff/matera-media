"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";

export interface Field {
  name: string;
  label: string;
  type: "string" | "text" | "number" | "boolean" | "array";
  placeholder?: string;
  defaultValue?: any;
}

interface AddItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Record<string, any>) => void;
  fields: Field[];
  title: string;
  description?: string;
  initialData?: Record<string, any>;
}

export function AddItemDialog({
  isOpen,
  onClose,
  onSave,
  fields,
  title,
  description,
  initialData,
}: AddItemDialogProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (isOpen) {
      // Initialize form with initialData or default values
      const data: Record<string, any> = {};
      fields.forEach((field) => {
        data[field.name] = initialData?.[field.name] ?? field.defaultValue ?? (field.type === "boolean" ? false : field.type === "array" ? [] : "");
      });
      setFormData(data);
    }
  }, [isOpen, fields, initialData]);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] bg-[#051A0E] border-white/10 text-white shadow-[0_0_50px_rgba(16,185,129,0.1)]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Plus className="w-5 h-5 text-emerald-400" />
            </div>
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-white/40 font-medium">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid gap-5">
            {fields.map((field) => (
              <div key={field.name} className="grid gap-2">
                <Label htmlFor={field.name} className="text-xs font-black uppercase tracking-widest text-emerald-400/70">
                  {field.label}
                </Label>
                {field.type === "boolean" ? (
                  <div className="flex items-center space-x-2 bg-white/5 border border-white/10 p-3 rounded-md">
                    <Switch
                      id={field.name}
                      checked={formData[field.name] || false}
                      onCheckedChange={(checked: boolean) => handleChange(field.name, checked)}
                    />
                    <Label htmlFor={field.name} className="text-sm font-medium text-white cursor-pointer">
                      {field.placeholder || "Enable this option"}
                    </Label>
                  </div>
                ) : field.type === "text" ? (
                  <Textarea
                    id={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="bg-white/5 border-white/10 focus:border-emerald-500/50 min-h-[100px] transition-all resize-none"
                  />
                ) : field.type === "array" ? (
                  <div className="space-y-2">
                    {(formData[field.name] || []).map((val: string, idx: number) => (
                      <div key={idx} className="flex gap-2">
                        <Input
                          value={val}
                          onChange={(e) => {
                            const newArr = [...(formData[field.name] || [])];
                            newArr[idx] = e.target.value;
                            handleChange(field.name, newArr);
                          }}
                          className="bg-white/5 border-white/10"
                          placeholder={`Feature ${idx + 1}`}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => {
                            const newArr = (formData[field.name] || []).filter((_: any, i: number) => i !== idx);
                            handleChange(field.name, newArr);
                          }}
                          className="px-2 text-red-400 hover:text-red-500 hover:bg-red-500/10"
                        >
                          &times;
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const newArr = [...(formData[field.name] || []), ""];
                        handleChange(field.name, newArr);
                      }}
                      className="w-full bg-white/5 border-white/10 text-xs py-1 h-8"
                    >
                      + Add Item
                    </Button>
                  </div>
                ) : (
                  <Input
                    id={field.name}
                    type={field.type === "number" ? "number" : "text"}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="bg-white/5 border-white/10 focus:border-emerald-500/50 transition-all"
                  />
                )}
              </div>
            ))}
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-transparent border-white/10 text-white/60 hover:bg-white/5 hover:text-white rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all active:scale-95"
            >
              {initialData ? "Save Changes" : `Add ${title.replace("Add ", "")}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
