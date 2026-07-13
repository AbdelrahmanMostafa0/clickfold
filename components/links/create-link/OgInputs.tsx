import React from "react";
import Image from "next/image";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X } from "lucide-react";
import type { FormValues } from "./CreateLinkForm";

interface OgInputsProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  imagePreview: string | null;
  handleDrop: (e: React.DragEvent) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleImageSelect: (file: File) => void;
  removeImage: () => void;
  imageError: string | null;
  ogImage: File | null;
}

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
}: OgInputsProps) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden space-y-6"
    >
      {/* ── Preview title ── */}
      <div>
        <Label
          htmlFor="ogTitle"
          className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block"
        >
          Preview title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="ogTitle"
          placeholder="Introducing our Summer Sale"
          className="bg-background border-input text-foreground placeholder:text-muted-foreground focus-visible:border-success/50 focus-visible:ring-success/20"
          {...register("ogTitle")}
        />
        {errors.ogTitle && (
          <p className="mt-1.5 text-xs text-destructive" role="alert">
            {errors.ogTitle.message}
          </p>
        )}
      </div>

      {/* ── Preview description ── */}
      <div>
        <Label
          htmlFor="ogDescription"
          className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block"
        >
          Preview description <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="ogDescription"
          placeholder="20% off everything, this week only."
          rows={3}
          className="bg-background border-input text-foreground placeholder:text-muted-foreground focus-visible:border-success/50 focus-visible:ring-success/20 resize-none"
          {...register("ogDescription")}
        />
        {errors.ogDescription && (
          <p className="mt-1.5 text-xs text-destructive" role="alert">
            {errors.ogDescription.message}
          </p>
        )}
      </div>

      {/* ── Preview artwork ── */}
      <div>
        <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block">
          Preview artwork <span className="text-destructive">*</span>
        </Label>

        {imagePreview ? (
          <div className="relative overflow-hidden border-2 border-foreground">
            <Image
              src={imagePreview}
              alt="OG preview"
              width={1200}
              height={630}
              unoptimized
              className="w-full h-48 object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              aria-label="Remove preview artwork"
              className="absolute right-2 top-2 border-2 border-foreground bg-primary p-2 text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              <X className="size-4" />
            </button>
            <div className="absolute bottom-2 left-2 border border-foreground bg-background px-2 py-1">
              <span className="text-[10px] font-bold">{ogImage?.name}</span>
            </div>
          </div>
        ) : (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") fileInputRef.current?.click();
            }}
            className={`group cursor-pointer border-2 border-dashed p-8 text-center transition-all hover:border-foreground hover:bg-secondary ${
              imageError ? "border-destructive" : "border-input"
            }`}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="flex size-12 items-center justify-center border border-foreground bg-secondary transition-colors group-hover:bg-background">
                <Upload className="size-5 text-muted-foreground group-hover:text-success transition-colors" />
              </div>
              <div>
                <p className="text-sm ">
                  Drop an image here or{" "}
                  <span className="text-success underline underline-offset-2">
                    browse
                  </span>
                </p>
                <p className="text-[10px] text-muted-foreground mt-1">
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
        {imageError && <p className="mt-1.5 text-xs text-destructive" role="alert">{imageError}</p>}
      </div>
    </motion.div>
  );
};

export default OgInputs;
