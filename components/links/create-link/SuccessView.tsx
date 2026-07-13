"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Check, Copy, EyeOff, Globe, Plus } from "lucide-react";
import { goeyToast } from "goey-toast";
import { Button } from "@/components/ui/button";
import QrCodeCard from "@/components/links/QrCodeCard";

interface SuccessViewProps {
  link: {
    slug: string;
    destination: string;
    ogMode: "custom" | "original" | "none";
    og?: { title?: string; description?: string; image?: string };
  };
  onCreateAnother: () => void;
}

export default function SuccessView({ link, onCreateAnother }: SuccessViewProps) {
  const shortUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/l/${link.slug}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    goeyToast.success("Route copied");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mx-auto w-full max-w-4xl"
      aria-labelledby="route-live-title"
    >
      <div className="border-2 border-foreground bg-card hard-shadow">
        <header className="grid gap-6 border-b-2 border-foreground p-6 sm:grid-cols-[1fr_auto] sm:items-end sm:p-9">
          <div>
            <div className="mb-4 flex size-10 items-center justify-center border-2 border-foreground bg-success text-success-foreground">
              <Check className="size-5" aria-hidden="true" />
            </div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-success">
              Published / ready to move
            </p>
            <h1 id="route-live-title" className="text-4xl leading-none sm:text-6xl" style={{ fontFamily: "var(--font-display)" }}>
              Route is live.
            </h1>
          </div>
          <Button onClick={onCreateAnother} variant="outline" className="border-2 border-foreground bg-background">
            <Plus className="size-4" />
            Build another
          </Button>
        </header>

        <div className="grid lg:grid-cols-[1.25fr_.75fr]">
          <div className="border-b-2 border-foreground p-6 lg:border-b-0 lg:border-r-2 sm:p-9">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Share route</p>
            <div className="flex flex-col gap-3 border-2 border-foreground bg-primary p-4 text-primary-foreground sm:flex-row sm:items-center sm:justify-between">
              <span className="min-w-0 truncate font-bold">{shortUrl.replace(/^https?:\/\//, "")}</span>
              <Button type="button" size="sm" onClick={copyToClipboard} className="shrink-0 border border-foreground bg-background text-foreground hover:bg-secondary">
                <Copy className="size-3.5" />
                Copy
              </Button>
            </div>
            <a href={link.destination} target="_blank" rel="noreferrer" className="mt-3 flex min-w-0 items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
              <span className="truncate">Destination: {link.destination}</span>
              <ArrowUpRight className="size-3 shrink-0" />
            </a>

            <div className="mt-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Share preview</p>
              {link.ogMode === "custom" ? (
                <div className="overflow-hidden border-2 border-foreground bg-background">
                  {link.og?.image && <Image src={link.og.image} alt="Campaign share preview" width={1200} height={630} unoptimized className="h-52 w-full object-cover" />}
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-primary">clickfold.app</p>
                    <h2 className="text-xl leading-tight" style={{ fontFamily: "var(--font-display)" }}>{link.og?.title || link.slug}</h2>
                    {link.og?.description && <p className="mt-2 text-sm leading-6 text-muted-foreground">{link.og.description}</p>}
                  </div>
                </div>
              ) : (
                <div className="flex gap-4 border-2 border-foreground bg-secondary p-5">
                  <div className="flex size-10 shrink-0 items-center justify-center border border-foreground bg-background">
                    {link.ogMode === "original" ? <Globe className="size-5 text-accent" /> : <EyeOff className="size-5 text-muted-foreground" />}
                  </div>
                  <div>
                    <h2 className="font-bold">{link.ogMode === "original" ? "Destination preview is on" : "Share preview is off"}</h2>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {link.ogMode === "original" ? "Shared posts will inherit the destination page’s title, description, and artwork." : "Shared posts will use a plain route without a custom card."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <aside className="p-6 sm:p-9">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Move it offline</p>
            <QrCodeCard url={shortUrl} slug={link.slug} />
          </aside>
        </div>
      </div>
    </motion.section>
  );
}
