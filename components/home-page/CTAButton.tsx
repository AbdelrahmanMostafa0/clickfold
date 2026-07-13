"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

const CTAButton = () => {
  const { user } = useUser();
  const router = useRouter();
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      onClick={() => {
        if (user) {
          router.push("/create");
        } else {
          router.push("/signup?callbackUrl=/create");
        }
      }}
      className="px-8 py-4 w-fit mx-auto bg-[#ff2d2d] hover:bg-[#e62626] text-white text-lg rounded-lg transition-colors glow-red"
      style={{
        fontFamily: "var(--font-display)",
        letterSpacing: "0.05em",
      }}
    >
      {user ? "Create New Link" : "Create My First Link"}
    </motion.button>
  );
};

export default CTAButton;
