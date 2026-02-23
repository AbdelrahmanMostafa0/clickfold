"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Image as ImageIcon, Link2, Sparkles, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { suggestedSlugs } from "@/data/slugs";
import { createLink } from "@/services/links";
import { toast } from "sonner";

/* ── Schema ── */
const schema = z.object({
    slug: z
        .string()
        .min(1, "Slug is required")
        .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            "Only lowercase letters, numbers, and hyphens"
        ),
    destination: z
        .string()
        .min(1, "Destination URL is required")
        .url("Must be a valid URL"),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

/* ── Component ── */
export default function CreateLinkForm() {
    const [ogImage, setOgImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [slugFocused, setSlugFocused] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const slugContainerRef = useRef<HTMLDivElement>(null);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            slug: "",
            destination: "",
            ogTitle: "",
            ogDescription: "",
        },
    });

    const slugValue = watch("slug");

    /* Filter suggestions */
    const filteredSuggestions = slugValue
        ? suggestedSlugs.filter(
            (s) => s.includes(slugValue.toLowerCase()) && s !== slugValue
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
            toast.error("Please select an image file");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be less than 5MB");
            return;
        }
        setOgImage(file);
        setImagePreview(URL.createObjectURL(file));
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
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("slug", values.slug);
            formData.append("destination", values.destination);
            if (values.ogTitle) formData.append("ogTitle", values.ogTitle);
            if (values.ogDescription)
                formData.append("ogDescription", values.ogDescription);
            if (ogImage) formData.append("ogImage", ogImage);

            await createLink(formData);
            toast.success("Link created successfully!");
        } catch {
            toast.error("Failed to create link. Try again.");
        } finally {
            setIsSubmitting(false);
        }
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
                        Create a <span className="text-[#ff2d2d] glow-red-text">b8lnk</span>
                    </h1>
                    <p className="text-[#666] text-sm">
                        Set the trap. Choose your bait wisely.
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
                        <Label htmlFor="slug" className="text-[#888] text-xs uppercase tracking-wider mb-2 block">
                            Slug <span className="text-[#ff2d2d]">*</span>
                        </Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444] text-sm pointer-events-none">
                                b8lnk.com/
                            </span>
                            <Input
                                id="slug"
                                placeholder="free-iphone-claim"
                                className="pl-[100px] bg-[#0a0a0a] border-white/8 text-white placeholder:text-[#333] focus-visible:border-[#ff2d2d]/50 focus-visible:ring-[#ff2d2d]/20"
                                {...register("slug")}
                                onFocus={() => setSlugFocused(true)}
                                autoComplete="off"
                            />
                        </div>
                        {errors.slug && (
                            <p className="text-[#ff2d2d] text-xs mt-1.5">{errors.slug.message}</p>
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
                                                className="w-full text-left px-3 py-2 rounded-md text-sm text-[#888] hover:bg-[#1a1a1a] hover:text-[#ff2d2d] transition-colors flex items-center gap-2"
                                            >
                                                <Link2 className="size-3 text-[#444]" />
                                                <span className="text-[#444]">b8lnk.com/</span>
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
                        <Label htmlFor="destination" className="text-[#888] text-xs uppercase tracking-wider mb-2 block">
                            Destination URL <span className="text-[#ff2d2d]">*</span>
                        </Label>
                        <Input
                            id="destination"
                            placeholder="https://youtube.com/watch?v=dQw4w9WgXcQ"
                            className="bg-[#0a0a0a] border-white/8 text-white placeholder:text-[#333] focus-visible:border-[#ff2d2d]/50 focus-visible:ring-[#ff2d2d]/20"
                            {...register("destination")}
                        />
                        {errors.destination && (
                            <p className="text-[#ff2d2d] text-xs mt-1.5">{errors.destination.message}</p>
                        )}
                    </motion.div>

                    {/* ── Divider ── */}
                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-[#111] px-3 text-[10px] uppercase tracking-widest text-[#444]">
                                OG Meta — optional
                            </span>
                        </div>
                    </div>

                    {/* ── OG Title ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Label htmlFor="ogTitle" className="text-[#888] text-xs uppercase tracking-wider mb-2 block">
                            OG Title
                        </Label>
                        <Input
                            id="ogTitle"
                            placeholder="You Won a Free iPhone 16 Pro"
                            className="bg-[#0a0a0a] border-white/8 text-white placeholder:text-[#333] focus-visible:border-[#00ff88]/50 focus-visible:ring-[#00ff88]/20"
                            {...register("ogTitle")}
                        />
                    </motion.div>

                    {/* ── OG Description ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 }}
                    >
                        <Label htmlFor="ogDescription" className="text-[#888] text-xs uppercase tracking-wider mb-2 block">
                            OG Description
                        </Label>
                        <Textarea
                            id="ogDescription"
                            placeholder="Click to claim your prize before it expires…"
                            rows={3}
                            className="bg-[#0a0a0a] border-white/8 text-white placeholder:text-[#333] focus-visible:border-[#00ff88]/50 focus-visible:ring-[#00ff88]/20 resize-none"
                            {...register("ogDescription")}
                        />
                    </motion.div>

                    {/* ── OG Image Upload ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Label className="text-[#888] text-xs uppercase tracking-wider mb-2 block">
                            OG Image
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
                                    <span className="text-[10px] text-[#888]">{ogImage?.name}</span>
                                </div>
                            </div>
                        ) : (
                            <div
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-white/8 rounded-lg p-8 text-center cursor-pointer hover:border-[#00ff88]/30 hover:bg-[#00ff88]/2 transition-all group"
                            >
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center group-hover:bg-[#00ff88]/10 transition-colors">
                                        <Upload className="size-5 text-[#555] group-hover:text-[#00ff88] transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#888]">
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
                    </motion.div>

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
                                    Create b8lnk
                                </>
                            )}
                        </Button>
                    </motion.div>
                </form>
            </div>
        </motion.div>
    );
}
