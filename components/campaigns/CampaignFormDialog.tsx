"use client";

import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { goeyToast } from "goey-toast";
import { createCampaign, updateCampaign } from "@/services/campaigns";
import type { Campaign } from "@/types/campaign";
import { getApiErrorMessage } from "@/lib/utils";

export default function CampaignFormDialog({
  campaign,
  onSaved,
}: {
  campaign?: Campaign;
  onSaved: () => void;
}) {
  const isEdit = !!campaign;
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(campaign?.name ?? "");
  const [description, setDescription] = useState(campaign?.description ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setName(campaign?.name ?? "");
      setDescription(campaign?.description ?? "");
    }
    setOpen(nextOpen);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      goeyToast.error("Name is required");
      return;
    }
    setIsSubmitting(true);
    try {
      if (isEdit) {
        await updateCampaign(campaign._id, { name, description });
        goeyToast.success("Campaign updated");
      } else {
        await createCampaign({ name, description });
        goeyToast.success("Campaign created");
      }
      setOpen(false);
      onSaved();
    } catch (error: unknown) {
      goeyToast.error(getApiErrorMessage(error, "Failed to save campaign"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button
            variant="ghost"
            className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-secondary"
            aria-label={`Edit ${campaign.name}`}
          >
            <Pencil className="size-4" />
          </Button>
        ) : (
          <Button className="hard-shadow min-h-11 border border-foreground bg-primary px-4 text-primary-foreground hover:bg-primary/90">
            <Plus className="size-4 mr-1.5" />
            New campaign
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-card border-border text-foreground sm:max-w-md [&>button>svg]:text-muted-foreground">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black tracking-[-0.035em]">{isEdit ? "Edit campaign" : "New campaign"}</DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            {isEdit
              ? "Update the campaign name and working note."
              : "Group related routes so their activity reads as one effort."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div>
            <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block">
              Campaign name
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Summer Sale 2026"
              className="bg-background border-input text-foreground focus-visible:ring-primary/20"
            />
          </div>
          <div>
            <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block">
              Description
            </Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional notes about this campaign"
              className="bg-background border-input text-foreground focus-visible:ring-primary/20"
            />
          </div>
        </div>
        <DialogFooter className="mt-4 sm:justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="bg-transparent border-border text-foreground hover:bg-secondary hover:text-foreground"
          >
            Keep editing
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isSubmitting ? "Saving…" : isEdit ? "Save campaign" : "Create campaign"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
