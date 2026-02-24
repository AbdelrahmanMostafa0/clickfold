import { motion } from "framer-motion";
import { Lock, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const UnAutorithed = () => {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-24 noise-bg relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md mx-auto relative"
      >
        <div className="bg-[#111] border border-white/5 rounded-xl p-8 relative overflow-hidden text-center">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="mx-auto w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6"
          >
            <Lock className="size-7 text-[#ff2d2d]" />
          </motion.div>

          <h1
            className="text-2xl sm:text-3xl text-white mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Authentication Required
          </h1>
          <p className="text-[#666] text-sm mb-8 leading-relaxed">
            You need to be logged in to create and manage your b8lnks. Join us
            to start setting traps!
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/login?callbackUrl=/create" className="flex-1">
              <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all">
                <LogIn className="size-4 mr-2" />
                Log in
              </Button>
            </Link>
            <Link href="/signup?callbackUrl=/create" className="flex-1">
              <Button className="w-full bg-[#ff2d2d] hover:bg-[#ff2d2d]/90 text-white shadow-[0_0_15px_rgba(255,45,45,0.3)] hover:shadow-[0_0_20px_rgba(255,45,45,0.5)] transition-all">
                <UserPlus className="size-4 mr-2" />
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default UnAutorithed;
