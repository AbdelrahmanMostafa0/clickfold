import React from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X } from "lucide-react";

const OgInputs = ({
  register,
  errors,
  imagePreview,
  handleDrop,
  fileInputRef,
  handleImageSelect,
  removeImage,
  imageError,
  ogImage,
}: any) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden space-y-6"
    >
      {/* ── OG Title ── */}
      <div>
        <Label
          htmlFor="ogTitle"
          className="text-[#888] text-xs uppercase tracking-wider mb-2 block"
        >
          OG Title <span className="text-[#ff2d2d]">*</span>
        </Label>
        <Input
          id="ogTitle"
          placeholder="Introducing our Summer Sale"
          className="bg-[#0a0a0a] border-white/8 text-white placeholder:text-[#333] focus-visible:border-[#00ff88]/50 focus-visible:ring-[#00ff88]/20"
          {...register("ogTitle")}
        />
        {errors.ogTitle && (
          <p className="text-[#ff2d2d] text-xs mt-1.5">
            {errors.ogTitle.message}
          </p>
        )}
      </div>

      {/* ── OG Description ── */}
      <div>
        <Label
          htmlFor="ogDescription"
          className="text-[#888] text-xs uppercase tracking-wider mb-2 block"
        >
          OG Description <span className="text-[#ff2d2d]">*</span>
        </Label>
        <Textarea
          id="ogDescription"
          placeholder="20% off everything, this week only."
          rows={3}
          className="bg-[#0a0a0a] border-white/8 text-white placeholder:text-[#333] focus-visible:border-[#00ff88]/50 focus-visible:ring-[#00ff88]/20 resize-none"
          {...register("ogDescription")}
        />
        {errors.ogDescription && (
          <p className="text-[#ff2d2d] text-xs mt-1.5">
            {errors.ogDescription.message}
          </p>
        )}
      </div>

      {/* ── OG Image Upload ── */}
      <div>
        <Label className="text-[#888] text-xs uppercase tracking-wider mb-2 block">
          OG Image <span className="text-[#ff2d2d]">*</span>
        </Label>

        {imagePreview ? (
          <div className="relative group rounded-lg overflow-hidden border border-white/8">
            <img
              src={imagePreview}
              alt="OG preview"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={removeImage}
                className="bg-[#ff2d2d] text-white rounded-full p-2 hover:bg-[#ff2d2d]/80 transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="absolute bottom-2 left-2 bg-black/70 rounded px-2 py-1">
              <span className="text-[10px] ">{ogImage?.name}</span>
            </div>
          </div>
        ) : (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-[#00ff88]/30 hover:bg-[#00ff88]/2 transition-all group ${
              imageError ? "border-[#ff2d2d]/50" : "border-white/8"
            }`}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center group-hover:bg-[#00ff88]/10 transition-colors">
                <Upload className="size-5 text-[#555] group-hover:text-[#00ff88] transition-colors" />
              </div>
              <div>
                <p className="text-sm ">
                  Drop an image here or{" "}
                  <span className="text-[#00ff88] underline underline-offset-2">
                    browse
                  </span>
                </p>
                <p className="text-[10px] text-[#444] mt-1">
                  PNG, JPG, WebP — Max 5MB
                </p>
              </div>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageSelect(file);
          }}
        />
        {imageError && (
          <p className="text-[#ff2d2d] text-xs mt-1.5">{imageError}</p>
        )}
      </div>
    </motion.div>
  );
};

export default OgInputs;
