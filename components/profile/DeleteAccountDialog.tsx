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
    } catch (error: any) {
      goeyToast.error(
        error.response?.data?.message ||
          "Failed to initiate account deletion. Please try again.",
      );
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="bg-transparent border border-[#ff2d2d]/30  hover:bg-[#ff2d2d] hover:text-white transition-all w-full sm:w-auto"
        >
          <Trash2 className="size-4 mr-2" />
          Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#111] border-white/10 text-white sm:max-w-md [&>button>svg]:text-[#888]">
        <DialogHeader>
          <DialogTitle>Confirm Account Deletion</DialogTitle>
          <DialogDescription className="text-[#888] mt-2">
            An email will be sent to your email address to confirm deletion.
            Note: please check your spam folder if you do not find it.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 sm:justify-end gap-2 ">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsDeleteDialogOpen(false)}
            className="bg-transparent border-white/10 text-white hover:bg-white/10 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onDeleteAccountConfirm}
            disabled={isDeleting}
            className="bg-[#ff2d2d] text-white hover:bg-[#ff2d2d]/90"
          >
            {isDeleting ? "Sending email..." : "Confirm Deletion"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountDialog;
