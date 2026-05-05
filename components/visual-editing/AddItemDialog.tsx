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
import { Plus, Video, CheckCircle2, Loader2 } from "lucide-react";
import { UploadButton } from "@/lib/uploadthing";

export interface Field {
  name: string;
  label: string;
  type: "string" | "text" | "number" | "boolean" | "array" | "select" | "video-upload" | "image-upload";
  placeholder?: string;
  defaultValue?: any;
  options?: { label: string; value: string }[];
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
  const [isUploading, setIsUploading] = useState(false);

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
      <DialogContent className="sm:max-w-[500px]  border-white/10 text-white shadow-[0_0_50px_rgba(255,255,255,0.1)] max-h-[90vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <div className="p-2 rounded-xl bg-white/10 border border-white/20">
              <Plus className="w-5 h-5 text-white/80" />
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
                <Label htmlFor={field.name} className="text-xs font-black uppercase tracking-widest text-white/80/70">
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
                    className="bg-white/5 border-white/10 focus:border-white/20/50 min-h-[100px] transition-all resize-none text-white"
                  />
                ) : field.type === "select" ? (
                  <div className="relative">
                    <select
                      id={field.name}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-white/20/50 transition-all appearance-none"
                    >
                      <option value="" disabled className="">Select {field.label}</option>
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value} className="">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                ) : field.type === "video-upload" || field.type === "image-upload" ? (
                  <div className="space-y-3">
                    {formData[field.name] ? (
                      <div className="p-3 bg-white/10 border border-white/20 rounded-md flex items-center justify-between">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <CheckCircle2 className="w-4 h-4 text-white/80 shrink-0" />
                          <span className="text-xs text-white/80 truncate font-medium">
                            {field.type === "video-upload" ? "Video" : "Image"} uploaded successfully
                          </span>
                        </div>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleChange(field.name, "")}
                          className="h-7 text-[10px] text-red-400 hover:text-red-300 hover:bg-red-400/10"
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/10 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all">
                        <div className="mb-4 p-3 rounded-full bg-white/5 text-white/40">
                          {isUploading ? (
                            <Loader2 className="w-6 h-6 animate-spin text-white/80" />
                          ) : field.type === "video-upload" ? (
                            <Video className="w-6 h-6" />
                          ) : (
                            <Plus className="w-6 h-6" />
                          )}
                        </div>
                        <UploadButton
                          endpoint={field.type === "video-upload" ? "videoUploader" : "imageUploader"}
                          onUploadProgress={() => setIsUploading(true)}
                          onClientUploadComplete={(res) => {
                            if (res?.[0]) {
                              // Use ufsUrl if available (new standard), fallback to url
                              const fileUrl = (res[0] as any).ufsUrl || res[0].url;
                              handleChange(field.name, fileUrl);
                            }
                            setIsUploading(false);
                          }}
                          onUploadError={(error: Error) => {
                            alert(`ERROR! ${error.message}`);
                            setIsUploading(false);
                          }}
                          appearance={{
                            button: "bg-white text-black hover:bg-white/90 text-black font-bold text-xs py-2 px-4 rounded-lg shadow-lg transition-all",
                            allowedContent: "text-[10px] text-white/30 uppercase tracking-widest mt-2",
                          }}
                        />
                      </div>
                    )}
                    <Input
                      placeholder={`Or paste direct ${field.type === "video-upload" ? "video" : "image"} URL here...`}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="bg-white/5 border-white/10 focus:border-white/20/50 transition-all text-xs text-white"
                    />
                  </div>
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
                          className="bg-white/5 border-white/10 text-white"
                          placeholder={`Item ${idx + 1}`}
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
                      className="w-full bg-white/5 border-white/10 text-xs py-1 h-8 text-white/60 hover:text-white"
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
                    className="bg-white/5 border-white/10 focus:border-white/20/50 transition-all text-white"
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
              disabled={isUploading}
              className="bg-white text-black hover:bg-white/90 text-black font-bold px-8 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all active:scale-95 disabled:opacity-50"
            >
              {isUploading ? "Uploading..." : initialData ? "Save Changes" : `Add ${title.replace("Add ", "")}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

