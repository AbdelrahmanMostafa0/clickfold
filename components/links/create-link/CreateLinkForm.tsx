"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  X,
  Image as ImageIcon,
  Link2,
  Sparkles,
  Loader2,
  Globe,
  EyeOff,
  Palette,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { suggestedSlugs } from "@/data/slugs";
import { createLink } from "@/services/links";
import { goeyToast } from "goey-toast";
import SuccessView from "./SuccessView";
import OgInputs from "./OgInputs";

const schema = z
  .object({
    slug: z
      .string()
      .min(1, "Slug is required")
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Only lowercase letters, numbers, and hyphens",
      ),
    destination: z
      .string()
      .min(1, "Destination URL is required")
      .url("Must be a valid URL"),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    ogMode: z.enum(["custom", "original", "none"]),
  })
  .superRefine((data, ctx) => {
    if (data.ogMode === "custom") {
      if (!data.ogTitle || data.ogTitle.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "OG Title is required in custom mode",
          path: ["ogTitle"],
        });
      }
      if (!data.ogDescription || data.ogDescription.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "OG Description is required in custom mode",
          path: ["ogDescription"],
        });
      }
    }
  });

type FormValues = z.infer<typeof schema>;

type OgMode = "custom" | "original" | "none";

const ogModeOptions: {
  value: OgMode;
  label: string;
  icon: React.ReactNode;
  description: string;
}[] = [
  {
    value: "custom",
    label: "Custom",
    icon: <Palette className="size-3.5" />,
    description: "Set your own OG metadata",
  },
  {
    value: "original",
    label: "Use Original",
    icon: <Globe className="size-3.5" />,
    description: "Use destination page's OG data",
  },
  {
    value: "none",
    label: "No OG",
    icon: <EyeOff className="size-3.5" />,
    description: "Disable all OG metadata",
  },
];

interface CreatedLinkData {
  slug: string;
  destination: string;
  ogMode: OgMode;
  og?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

export default function CreateLinkForm() {
  const [ogImage, setOgImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slugFocused, setSlugFocused] = useState(false);
  const [createdLink, setCreatedLink] = useState<CreatedLinkData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const slugContainerRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      slug: "",
      destination: "",
      ogTitle: "",
      ogDescription: "",
      ogMode: "custom",
    },
  });

  const slugValue = watch("slug");
  const ogMode = watch("ogMode");

  /* Filter suggestions */
  const filteredSuggestions = slugValue
    ? suggestedSlugs.filter(
        (s) => s.includes(slugValue.toLowerCase()) && s !== slugValue,
      )
    : suggestedSlugs;

  const showSuggestions = slugFocused && filteredSuggestions.length > 0;

  /* Close dropdown on outside click */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        slugContainerRef.current &&
        !slugContainerRef.current.contains(e.target as Node)
      ) {
        setSlugFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Image handlers */
  function handleImageSelect(file: File) {
    if (!file.type.startsWith("image/")) {
      goeyToast.error("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      goeyToast.error("Image must be less than 5MB");
      return;
    }
    setOgImage(file);
    setImagePreview(URL.createObjectURL(file));
    setImageError(null);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImageSelect(file);
  }

  function removeImage() {
    setOgImage(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  /* Submit */
  async function onSubmit(values: FormValues) {
    if (values.ogMode === "custom" && !ogImage) {
      setImageError("OG Image is required in custom mode");
      return;
    }
    setImageError(null);
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("slug", values.slug);
      formData.append("destination", values.destination);
      formData.append("ogMode", values.ogMode);

      if (values.ogMode === "custom") {
        if (values.ogTitle) formData.append("ogTitle", values.ogTitle);
        if (values.ogDescription)
          formData.append("ogDescription", values.ogDescription);
        if (ogImage) formData.append("ogImage", ogImage);
      }

      const res = await createLink(formData);
      console.log(res);

      // Build the created link data for success view
      const linkData: CreatedLinkData = {
        slug: values.slug,
        destination: values.destination,
        ogMode: values.ogMode,
      };

      if (values.ogMode === "custom") {
        linkData.og = {
          title: values.ogTitle || undefined,
          description: values.ogDescription || undefined,
          image: imagePreview || undefined,
        };
      }

      setCreatedLink(linkData);
      goeyToast.success("Link created successfully!");
    } catch (error: any) {
      console.log(error.response.data.message);
      goeyToast.error(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCreateAnother() {
    setCreatedLink(null);
    reset();
    removeImage();
  }

  /* Success View */
  if (createdLink) {
    return (
      <SuccessView link={createdLink} onCreateAnother={handleCreateAnother} />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-xl mx-auto"
    >
      <div className="bg-[#111] border border-white/5 rounded-xl p-6 sm:p-8 relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#ff2d2d]/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#00ff88]/3 rounded-full blur-[80px] pointer-events-none" />

        {/* Header */}
        <div className="relative mb-8">
          <h1
            className="text-3xl sm:text-4xl text-white mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Create a <span className="text-[#ff2d2d] glow-red-text">link</span>
          </h1>
          <p className=" text-sm">Set the destination and customize how it looks when shared.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-6">
          {/* ── Slug ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            ref={slugContainerRef}
            className="relative"
          >
            <Label
              htmlFor="slug"
              className=" text-xs uppercase tracking-wider mb-2 block"
            >
              Slug <span className="text-[#ff2d2d]">*</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444] text-sm pointer-events-none">
                linkpulse.app/
              </span>
              <Input
                id="slug"
                placeholder="summer-sale"
                className="pl-[100px] bg-[#0a0a0a] border-white/8 text-white placeholder:text-[#333] focus-visible:border-[#ff2d2d]/50 focus-visible:ring-[#ff2d2d]/20"
                {...register("slug")}
                onFocus={() => setSlugFocused(true)}
                autoComplete="off"
              />
            </div>
            {errors.slug && (
              <p className="text-[#ff2d2d] text-xs mt-1.5">
                {errors.slug.message}
              </p>
            )}

            {/* Slug suggestions dropdown */}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute z-20 left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-[#0a0a0a] border border-white/8 rounded-lg shadow-xl"
                >
                  <div className="p-1.5">
                    <div className="flex items-center gap-1.5 px-2 py-1.5 mb-1">
                      <Sparkles className="size-3 text-[#00ff88]" />
                      <span className="text-[10px] uppercase tracking-wider text-[#555]">
                        Suggestions
                      </span>
                    </div>
                    {filteredSuggestions.map((slug) => (
                      <button
                        key={slug}
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setValue("slug", slug, { shouldValidate: true });
                          setSlugFocused(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-md text-sm  hover:bg-[#1a1a1a] hover:text-[#ff2d2d] transition-colors flex items-center gap-2"
                      >
                        <Link2 className="size-3 text-[#444]" />
                        <span className="text-[#444]">linkpulse.app/</span>
                        <span>{slug}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Destination ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Label
              htmlFor="destination"
              className=" text-xs uppercase tracking-wider mb-2 block"
            >
              Destination URL <span className="text-[#ff2d2d]">*</span>
            </Label>
            <Input
              id="destination"
              placeholder="https://youtube.com/watch?v=dQw4w9WgXcQ"
              className="bg-[#0a0a0a] border-white/8 text-white placeholder:text-[#333] focus-visible:border-[#ff2d2d]/50 focus-visible:ring-[#ff2d2d]/20"
              {...register("destination")}
            />
            {errors.destination && (
              <p className="text-[#ff2d2d] text-xs mt-1.5">
                {errors.destination.message}
              </p>
            )}
          </motion.div>

          {/* ── OG Divider with Mode Toggle ── */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#111] px-3 text-[10px] uppercase tracking-widest">
                OG Meta
              </span>
            </div>
          </div>

          {/* ── OG Mode Selector ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="grid grid-cols-3 gap-2">
              {ogModeOptions.map((option) => {
                const isActive = ogMode === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setValue("ogMode", option.value, { shouldValidate: true })
                    }
                    className={`relative flex flex-col items-center gap-1.5 rounded-lg border p-3 transition-all cursor-pointer ${
                      isActive
                        ? "border-[#00ff88]/40 bg-[#00ff88]/5 text-white"
                        : "border-white/8 bg-[#0a0a0a]  hover:border-white/15 hover:bg-[#0a0a0a]/80"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-[#00ff88]/15 text-[#00ff88]"
                          : "bg-white/5 text-[#555]"
                      }`}
                    >
                      {option.icon}
                    </div>
                    <span className="text-[11px] font-medium">
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] mt-2 text-center">
              {ogModeOptions.find((o) => o.value === ogMode)?.description}
            </p>
          </motion.div>

          {/* ── OG Fields (only when custom) ── */}
          <AnimatePresence>
            {ogMode === "custom" && (
              <OgInputs
                register={register}
                errors={errors}
                imagePreview={imagePreview}
                handleDrop={handleDrop}
                fileInputRef={fileInputRef}
                handleImageSelect={handleImageSelect}
                removeImage={removeImage}
                imageError={imageError}
                ogImage={ogImage}
              />
            )}
          </AnimatePresence>

          {/* ── Submit ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pt-2"
          >
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-[#ff2d2d] hover:bg-[#ff2d2d]/90 text-white font-semibold glow-red transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Creating…
                </>
              ) : (
                <>
                  <Link2 className="size-4" />
                  Create Link
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}
