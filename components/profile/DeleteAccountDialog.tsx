import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Trash2 } from "lucide-react";
import { goeyToast } from "goey-toast";
import { deleteAccount } from "@/services/profile";
import { getApiErrorMessage } from "@/lib/utils";
const DeleteAccountDialog = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const onDeleteAccountConfirm = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteAccount();
      goeyToast.success(
        res?.message ||
          "An email has been sent to confirm deletion. Please check your spam folder.",
      );
      setIsDeleteDialogOpen(false);
    } catch (error: unknown) {
      goeyToast.error(getApiErrorMessage(error, "Failed to initiate account deletion. Please try again."));
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="w-full border-2 border-destructive bg-transparent text-destructive transition-all hover:bg-destructive hover:text-destructive-foreground sm:w-auto"
        >
          <Trash2 className="size-4 mr-2" />
          Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card text-foreground sm:max-w-md [&>button>svg]:text-muted-foreground">
        <DialogHeader>
          <DialogTitle>Request account deletion?</DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            We will email you a final confirmation link. Nothing is deleted until you use that link; check spam if it does not arrive.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 sm:justify-end gap-2 ">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsDeleteDialogOpen(false)}
            className="bg-transparent border-border text-foreground hover:bg-secondary hover:text-foreground"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onDeleteAccountConfirm}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Sending confirmation…" : "Send confirmation email"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountDialog;
