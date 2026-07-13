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
          className="size-8 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10"
          aria-label={`Delete ${campaignName}`}
        >
          <Trash2 className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border text-foreground sm:max-w-md [&>button>svg]:text-muted-foreground">
        <DialogHeader>
          <DialogTitle>Delete &quot;{campaignName}&quot;?</DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            Links in this campaign won&apos;t be deleted — they&apos;ll just
            no longer be grouped under this campaign.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 sm:justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="bg-transparent border-border text-foreground hover:bg-secondary hover:text-foreground"
          >
            Keep campaign
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isDeleting ? "Deleting…" : "Delete campaign"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
