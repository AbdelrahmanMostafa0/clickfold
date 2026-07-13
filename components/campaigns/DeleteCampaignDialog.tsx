"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
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
import { goeyToast } from "goey-toast";
import { deleteCampaign } from "@/services/campaigns";
import { getApiErrorMessage } from "@/lib/utils";

export default function DeleteCampaignDialog({
  campaignId,
  campaignName,
  onDeleted,
}: {
  campaignId: string;
  campaignName: string;
  onDeleted: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteCampaign(campaignId);
      goeyToast.success("Campaign deleted");
      setOpen(false);
      onDeleted();
    } catch (error: unknown) {
      goeyToast.error(getApiErrorMessage(error, "Failed to delete campaign"));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="size-8 p-0 text-[#888] hover:text-[#ff2d2d] hover:bg-[#ff2d2d]/10"
        >
          <Trash2 className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#111] border-white/10 text-white sm:max-w-md [&>button>svg]:text-[#888]">
        <DialogHeader>
          <DialogTitle>Delete &quot;{campaignName}&quot;?</DialogTitle>
          <DialogDescription className="text-[#888] mt-2">
            Links in this campaign won&apos;t be deleted — they&apos;ll just
            no longer be grouped under this campaign.
          </DialogDescription>
        </DialogHeader>
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
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-[#ff2d2d] text-white hover:bg-[#ff2d2d]/90"
          >
            {isDeleting ? "Deleting..." : "Delete Campaign"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
