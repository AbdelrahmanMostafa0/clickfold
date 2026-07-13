"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (open) {
      setName(campaign?.name ?? "");
      setDescription(campaign?.description ?? "");
    }
  }, [open, campaign]);

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button
            variant="ghost"
            className="size-8 p-0 text-[#888] hover:text-white hover:bg-white/10"
          >
            <Pencil className="size-4" />
          </Button>
        ) : (
          <Button className="bg-[#ff2d2d] hover:bg-[#ff2d2d]/90 text-white">
            <Plus className="size-4 mr-1.5" />
            New Campaign
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-[#111] border-white/10 text-white sm:max-w-md [&>button>svg]:text-[#888]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Campaign" : "New Campaign"}</DialogTitle>
          <DialogDescription className="text-[#888] mt-2">
            {isEdit
              ? "Update this campaign's name and description."
              : "Group related links together to track them as one campaign."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div>
            <Label className="text-[#888] text-xs uppercase tracking-wider mb-2 block">
              Name
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Summer Sale 2026"
              className="bg-[#0a0a0a] border-white/8 text-white focus-visible:ring-[#ff2d2d]/20"
            />
          </div>
          <div>
            <Label className="text-[#888] text-xs uppercase tracking-wider mb-2 block">
              Description
            </Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional notes about this campaign"
              className="bg-[#0a0a0a] border-white/8 text-white focus-visible:ring-[#ff2d2d]/20"
            />
          </div>
        </div>
        <DialogFooter className="mt-4 sm:justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="bg-transparent border-white/10 text-white hover:bg-white/10 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-[#ff2d2d] text-white hover:bg-[#ff2d2d]/90"
          >
            {isSubmitting ? "Saving..." : isEdit ? "Save Changes" : "Create Campaign"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
