import { Camera, Upload, Save } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useUser } from "@/context/UserContext";
import { updateAvatar } from "@/services/profile";
import { goeyToast } from "goey-toast";

interface AvatarUpdateProps {
  avatarPreview: string | null;
  setAvatarPreview: (avatarPreview: string | null) => void;
  userInitials: string;
}
const AvatarUpdate = ({
  avatarPreview,
  setAvatarPreview,
  userInitials,
}: AvatarUpdateProps) => {
  const { user = { avatar: null }, refetchUser } = useUser();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [isAvatarSubmitting, setIsAvatarSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onAvatarUpload = async () => {
    if (!avatarFile) return;
    setIsAvatarSubmitting(true);
    const formData = new FormData();
    formData.append("avatar", avatarFile);
    try {
      await updateAvatar(formData);
      goeyToast.success("Avatar updated successfully");
      refetchUser();
    } catch {
      goeyToast.error("Failed to update avatar");
    } finally {
      setIsAvatarSubmitting(false);
      setAvatarPreview(null);
      setAvatarFile(null);
    }
  };
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      goeyToast.error("Please select an valid image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      goeyToast.error("Image must be less than 5MB");
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="border-2 border-foreground bg-card p-6"
    >
      <h2 className="text-foreground text-lg font-medium flex items-center gap-2 mb-6">
        <Camera className="size-4 text-primary" /> Profile Picture
      </h2>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative group">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-border flex items-center justify-center overflow-hidden bg-background">
            {avatarPreview || user?.avatar ? (
              <Image
                src={avatarPreview || (user?.avatar as string) || ""}
                alt="Avatar"
                width={112}
                height={112}
                unoptimized
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl font-bold text-primary">
                {userInitials}
              </span>
            )}
          </div>
          {/* Overlay upload button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Choose profile picture"
            className="absolute -bottom-1 -right-1 flex size-10 cursor-pointer items-center justify-center rounded-full border-2 border-foreground bg-primary text-primary-foreground"
          >
            <Camera className="size-5" />
          </button>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleAvatarChange}
          />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <p className="text-muted-foreground text-sm mb-3">
            Upload a new avatar. Recommended size: 256x256px.
            <br />
            PNG, JPG, or WebP. Max 5MB.
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="bg-background border-border text-foreground hover:bg-secondary"
            >
              <Upload className="size-4 mr-2" />
              Browse File
            </Button>
            {avatarFile && (
              <Button
                type="button"
                onClick={onAvatarUpload}
                disabled={isAvatarSubmitting}
                className="border-2 border-foreground bg-primary text-primary-foreground hard-shadow transition-transform hover:-translate-y-0.5 hover:bg-primary/90"
              >
                <Save className="size-4 mr-2" />
                {isAvatarSubmitting ? "Uploading..." : "Save Image"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AvatarUpdate;
