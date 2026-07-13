import { motion } from "framer-motion";
import { UserIcon } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUser } from "@/context/UserContext";
import { goeyToast } from "goey-toast";
import { updateProfile } from "@/services/profile";
import { Save } from "lucide-react";
import { z } from "zod";
import { useEffect } from "react";
type ProfileValues = z.infer<typeof profileSchema>;
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

const InfoUpdate = () => {
  const { user, refetchUser } = useUser();
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    setValue,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
    },
  });
  const onProfileUpdate = async (data: ProfileValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    try {
      await updateProfile(formData);
      goeyToast.success("Display name updated");
      refetchUser();
    } catch {
      goeyToast.error("Failed to update profile");
    }
  };
  useEffect(() => {
    setValue("name", user?.name || "");
  }, [setValue, user]);
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="border-2 border-foreground bg-card p-6"
    >
      <h2 className="text-foreground text-lg font-medium flex items-center gap-2 mb-6">
        <UserIcon className="size-4 text-primary" /> Display Settings
      </h2>

      <form
        onSubmit={handleProfileSubmit(onProfileUpdate)}
        className="space-y-4"
      >
        <div>
          <Label
            htmlFor="name"
            className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block"
          >
            Display Name
          </Label>
          <Input
            id="name"
            {...registerProfile("name")}
            className="bg-background border-input text-foreground focus-visible:ring-primary/20"
          />
          {profileErrors.name && (
            <p className="mt-1.5 text-xs text-destructive" role="alert">
              {profileErrors.name.message}
            </p>
          )}
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={isProfileSubmitting}
            className="border-2 border-foreground bg-secondary text-foreground hover:bg-background"
          >
            <Save className="size-4 mr-2" />
            {isProfileSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </motion.section>
  );
};

export default InfoUpdate;
