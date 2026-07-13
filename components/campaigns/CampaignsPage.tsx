"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Link2, Loader2, MousePointerClick } from "lucide-react";
import { getCampaigns } from "@/services/campaigns";
import type { Campaign } from "@/types/campaign";
import CampaignFormDialog from "./CampaignFormDialog";
import DeleteCampaignDialog from "./DeleteCampaignDialog";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCampaigns = useCallback(async () => {
    const response = await getCampaigns();
    if (response?.success) setCampaigns(response.data as Campaign[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    // The campaign API is client-authenticated, so the initial fetch belongs after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchCampaigns();
  }, [fetchCampaigns]);

  return (
    <main id="main-content" className="studio-grid min-h-screen px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="grid gap-8 border-b-2 border-foreground pb-9 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <span className="eyebrow">Campaign index</span>
            <h1 className="mt-6 text-5xl font-black leading-none tracking-[-0.055em] sm:text-6xl">Keep the routes together.</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">Group email, social, partner, and QR links under the effort they belong to.</p>
          </div>
          <CampaignFormDialog onSaved={fetchCampaigns} />
        </header>

        {loading ? (
          <div className="flex min-h-72 items-center justify-center gap-3 font-bold">
            <Loader2 className="size-5 animate-spin text-primary" /> Reading campaign index…
          </div>
        ) : campaigns.length === 0 ? (
          <section className="mt-10 grid gap-8 border-2 border-foreground bg-card p-7 sm:p-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-primary">Empty index</p>
              <h2 className="mt-4 max-w-[12ch] text-4xl font-black tracking-[-0.045em]">Your first campaign gives every link a shared context.</h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">Name the effort, then assign links as you build them. Their results will roll up here.</p>
            </div>
            <CampaignFormDialog onSaved={fetchCampaigns} />
          </section>
        ) : (
          <section className="border-b-2 border-foreground" aria-label="Campaigns">
            {campaigns.map((campaign, index) => (
              <article key={campaign._id} className="grid gap-5 border-b border-border py-7 last:border-b-0 md:grid-cols-[3rem_1fr_auto] md:items-center">
                <span className="data-number text-sm font-black text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                <div className="min-w-0">
                  <Link href={`/campaigns/${campaign._id}`} className="text-2xl font-black tracking-[-0.035em] hover:text-primary">{campaign.name}</Link>
                  {campaign.description && <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{campaign.description}</p>}
                  <div className="mt-4 flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Link2 className="size-3.5 text-accent" />{campaign.linksCount ?? 0} links</span>
                    <span className="flex items-center gap-1.5"><MousePointerClick className="size-3.5 text-success" />{(campaign.totalClicks ?? 0).toLocaleString()} clicks</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 justify-self-start md:justify-self-end">
                  <CampaignFormDialog campaign={campaign} onSaved={fetchCampaigns} />
                  <DeleteCampaignDialog campaignId={campaign._id} campaignName={campaign.name} onDeleted={fetchCampaigns} />
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
