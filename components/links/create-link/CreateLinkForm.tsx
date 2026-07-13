"use client";

import { useState, useRef, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Link2,
  Sparkles,
  Loader2,
  Globe,
  EyeOff,
  Palette,
  ChevronDown,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { suggestedSlugs } from "@/data/slugs";
import { createLink } from "@/services/links";
import { getCampaigns } from "@/services/campaigns";
import type { Campaign } from "@/types/campaign";
import { getApiErrorMessage } from "@/lib/utils";
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
    campaignId: z.string().optional(),
    tags: z.string().optional(),
    utmSource: z.string().optional(),
    utmMedium: z.string().optional(),
    utmCampaign: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.ogMode === "custom") {
      if (!data.ogTitle || data.ogTitle.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Preview title is required",
          path: ["ogTitle"],
        });
      }
      if (!data.ogDescription || data.ogDescription.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Preview description is required",
          path: ["ogDescription"],
        });
      }
    }
  });

export type FormValues = z.infer<typeof schema>;

type OgMode = "custom" | "original" | "none";

const ogModeOptions: {
  value: OgMode;
  label: string;
  icon: React.ReactNode;
  description: string;
}[] = [
  {
    value: "custom",
    label: "Custom preview",
    icon: <Palette className="size-3.5" />,
    description: "Art-direct the card people see when this link is shared.",
  },
  {
    value: "original",
    label: "Destination preview",
    icon: <Globe className="size-3.5" />,
    description: "Reuse the title, description, and image from the destination.",
  },
  {
    value: "none",
    label: "No preview",
    icon: <EyeOff className="size-3.5" />,
    description: "Keep the route plain and skip a social share card.",
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

function buildDestinationWithUtm(
  destination: string,
  utm: { utmSource?: string; utmMedium?: string; utmCampaign?: string },
) {
  try {
    const url = new URL(destination);
    if (utm.utmSource) url.searchParams.set("utm_source", utm.utmSource);
    if (utm.utmMedium) url.searchParams.set("utm_medium", utm.utmMedium);
    if (utm.utmCampaign) url.searchParams.set("utm_campaign", utm.utmCampaign);
    return url.toString();
  } catch {
    return destination;
  }
}

export default function CreateLinkForm() {
  const [ogImage, setOgImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slugFocused, setSlugFocused] = useState(false);
  const [createdLink, setCreatedLink] = useState<CreatedLinkData | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [showUtm, setShowUtm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const slugContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCampaigns().then((res) => {
      if (res?.success) setCampaigns(res.data as Campaign[]);
    });
  }, []);

  const {
    register,
    handleSubmit,
    control,
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
      campaignId: "",
      tags: "",
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
    },
  });

  const slugValue = useWatch({ control, name: "slug" });
  const ogMode = useWatch({ control, name: "ogMode" });

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
      const finalDestination = buildDestinationWithUtm(values.destination, {
        utmSource: values.utmSource,
        utmMedium: values.utmMedium,
        utmCampaign: values.utmCampaign,
      });

      const formData = new FormData();
      formData.append("slug", values.slug);
      formData.append("destination", finalDestination);
      formData.append("ogMode", values.ogMode);

      if (values.ogMode === "custom") {
        if (values.ogTitle) formData.append("ogTitle", values.ogTitle);
        if (values.ogDescription)
          formData.append("ogDescription", values.ogDescription);
        if (ogImage) formData.append("ogImage", ogImage);
      }

      if (values.campaignId) formData.append("campaignId", values.campaignId);
      if (values.tags) formData.append("tags", values.tags);

      const res = await createLink(formData);
      console.log(res);

      // Build the created link data for success view
      const linkData: CreatedLinkData = {
        slug: values.slug,
        destination: finalDestination,
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
      goeyToast.success("Campaign route is live");
    } catch (error: unknown) {
      goeyToast.error(getApiErrorMessage(error, "Failed to create link"));
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
      className="mx-auto w-full max-w-3xl"
    >
      <div className="relative border-2 border-foreground bg-card p-6 hard-shadow sm:p-9">
        {/* Header */}
        <div className="relative mb-9 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Route builder / 01
          </p>
          <h1
            className="mb-3 text-4xl leading-none text-foreground sm:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Build a campaign link.
          </h1>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Give the route a memorable path, add clean campaign signals, then decide exactly how it should look when shared.
          </p>
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
              className="mb-2 block text-xs font-bold uppercase tracking-wider"
            >
              Link path <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
                clickfold.app/
              </span>
              <Input
                id="slug"
                placeholder="summer-sale"
                className="pl-[100px] bg-background border-input text-foreground placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-primary/20"
                {...register("slug")}
                onFocus={() => setSlugFocused(true)}
                autoComplete="off"
              />
            </div>
            {errors.slug && (
              <p className="mt-1.5 text-xs text-destructive" role="alert">
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
                  className="absolute z-20 left-0 right-0 mt-1 max-h-48 overflow-y-auto border-2 border-foreground bg-background hard-shadow"
                >
                  <div className="p-1.5">
                    <div className="flex items-center gap-1.5 px-2 py-1.5 mb-1">
                      <Sparkles className="size-3 text-success" />
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
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
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-secondary hover:text-primary"
                      >
                        <Link2 className="size-3 text-muted-foreground" />
                        <span className="text-muted-foreground">clickfold.app/</span>
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
              className="mb-2 block text-xs font-bold uppercase tracking-wider"
            >
              Where it leads <span className="text-destructive">*</span>
            </Label>
            <Input
              id="destination"
              placeholder="https://youtube.com/watch?v=dQw4w9WgXcQ"
              className="bg-background border-input text-foreground placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-primary/20"
              {...register("destination")}
            />
            {errors.destination && (
              <p className="mt-1.5 text-xs text-destructive" role="alert">
                {errors.destination.message}
              </p>
            )}
          </motion.div>

          {/* ── Campaign & Tags ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.22 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div>
              <Label
                htmlFor="campaignId"
                className="mb-2 block text-xs font-bold uppercase tracking-wider"
              >
                Campaign
              </Label>
              <select
                id="campaignId"
                {...register("campaignId")}
                className="h-10 w-full rounded-sm border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
              >
                <option value="">No campaign</option>
                {campaigns.map((campaign) => (
                  <option key={campaign._id} value={campaign._id}>
                    {campaign.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label
                htmlFor="tags"
                className="mb-2 block text-xs font-bold uppercase tracking-wider"
              >
                Tags
              </Label>
              <Input
                id="tags"
                placeholder="launch, email, q3"
                className="bg-background border-input text-foreground placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-primary/20"
                {...register("tags")}
              />
            </div>
          </motion.div>

          {/* ── UTM Parameters (collapsible) ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.24 }}
          >
            <button
              type="button"
              onClick={() => setShowUtm((prev) => !prev)}
              className="flex w-full items-center justify-between border-y border-border py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              Campaign tracking
              <ChevronDown
                className={`size-3.5 transition-transform ${showUtm ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {showUtm && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
                    <div>
                      <Label
                        htmlFor="utmSource"
                        className=" text-xs uppercase tracking-wider mb-2 block"
                      >
                        Source
                      </Label>
                      <Input
                        id="utmSource"
                        placeholder="newsletter"
                        className="bg-background border-input text-foreground placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-primary/20"
                        {...register("utmSource")}
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="utmMedium"
                        className=" text-xs uppercase tracking-wider mb-2 block"
                      >
                        Medium
                      </Label>
                      <Input
                        id="utmMedium"
                        placeholder="email"
                        className="bg-background border-input text-foreground placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-primary/20"
                        {...register("utmMedium")}
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="utmCampaign"
                        className=" text-xs uppercase tracking-wider mb-2 block"
                      >
                        Campaign Tag
                      </Label>
                      <Input
                        id="utmCampaign"
                        placeholder="july-launch"
                        className="bg-background border-input text-foreground placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-primary/20"
                        {...register("utmCampaign")}
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2">
                    These signals are added to the destination so campaign traffic stays attributable.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── OG Divider with Mode Toggle ── */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card px-3 text-[10px] uppercase tracking-widest">
                Share preview
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
                    className={`relative flex min-h-24 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-sm border p-3 text-center transition-all ${
                      isActive
                        ? "border-foreground bg-secondary text-foreground"
                        : "border-input bg-background  hover:border-foreground/20 hover:bg-background/80"
                    }`}
                  >
                    <div
                      className={`flex size-7 items-center justify-center rounded-sm transition-colors ${
                        isActive
                          ? "bg-foreground text-background"
                          : "bg-secondary text-muted-foreground"
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
            <p className="mt-3 text-center text-xs text-muted-foreground">
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
              className="h-12 w-full border-2 border-foreground bg-primary font-bold text-primary-foreground hard-shadow transition-transform hover:-translate-y-0.5 hover:bg-primary/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Building route…
                </>
              ) : (
                <>
                  <Link2 className="size-4" />
                  Build campaign link
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}
