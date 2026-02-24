import { Camera, Upload, Save } from "lucide-react";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useUser } from "@/context/UserContext";
import { updateProfile } from "@/services/profile";
import { toast } from "sonner";

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
    const formData = new FormData();
    formData.append("avatar", avatarFile);
    try {
      const { data } = await updateProfile(formData);
      toast.success("Avatar updated successfully");
      refetchUser();
    } catch (error) {
      toast.error("Failed to update avatar");
    } finally {
      setAvatarPreview(null);
      setAvatarFile(null);
    }
  };
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an valid image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
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
      className="bg-[#111] border border-white/5 rounded-xl p-6"
    >
      <h2 className="text-white text-lg font-medium flex items-center gap-2 mb-6">
        <Camera className="size-4 text-[#ff2d2d]" /> Profile Picture
      </h2>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative group">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-white/10 flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
            {avatarPreview || user?.avatar ? (
              <img
                src={avatarPreview || (user?.avatar as string) || ""}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl font-bold text-[#ff2d2d]">
                {userInitials}
              </span>
            )}
          </div>
          {/* Overlay upload button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all cursor-pointer border border-[#ff2d2d]/0 group-hover:border-[#ff2d2d]/50"
          >
            <Camera className="size-6 text-white" />
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
          <p className="text-[#888] text-sm mb-3">
            Upload a new avatar. Recommended size: 256x256px.
            <br />
            PNG, JPG, or WebP. Max 5MB.
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#0a0a0a] border-white/10 text-white hover:bg-white/5"
            >
              <Upload className="size-4 mr-2" />
              Browse File
            </Button>
            {avatarFile && (
              <Button
                type="button"
                onClick={onAvatarUpload}
                disabled={isAvatarSubmitting}
                className="bg-[#ff2d2d] hover:bg-[#ff2d2d]/90 text-white glow-red transition-all"
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
