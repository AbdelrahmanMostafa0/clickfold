import {
  AlertTriangle,
  XCircle,
  Info,
  Trophy,
  Bomb,
  Bug,
  Skull,
} from "lucide-react";
const POPUP_MESSAGES = [
  {
    title: "SYSTEM WARNING",
    message: "CRITICAL ERROR: Reality matrix destabilizing.",
    icon: Skull,
    color: "text-red-500",
  },
  {
    title: "CONGRATULATIONS!",
    message: "You are the 1,000,000th visitor! Click here to claim your prize!",
    icon: Trophy,
    color: "text-yellow-500",
  },
  {
    title: "SECURITY ALERT",
    message: "Suspicious activity detected in Sector 7G.",
    icon: AlertTriangle,
    color: "text-orange-500",
  },
  {
    title: "VIRUS DETECTED",
    message: "Downloading more RAM to compensate...",
    icon: Bug,
    color: "text-green-500",
  },
  {
    title: "FATAL EXCEPTION",
    message: "Error 404: Brain not found.",
    icon: XCircle,
    color: "text-red-500",
  },
  {
    title: "HOT SINGLES",
    message: "Hot single boolean variables in your area area looking to pair!",
    icon: Info,
    color: "text-pink-500",
  },
  {
    title: "SELF DESTRUCT",
    message: "Self destruct sequence initiated. Have a nice day.",
    icon: Bomb,
    color: "text-red-600",
  },
  {
    title: "YOU WON!!",
    message:
      "🎉 Claim your FREE iPhone 15 Pro Max now! Offer expires in 2:00 mins.",
    icon: Trophy,
    color: "text-blue-500",
  },
  {
    title: "URGENT UPDATE",
    message:
      "Your Adobe Flash Player is outdated. Install now or PC will explode.",
    icon: AlertTriangle,
    color: "text-red-500",
  },
  {
    title: "$$$ MAKE MONEY FAST $$$",
    message: "Local mom discovers ONE WEIRD TRICK to earn $10,000/day.",
    icon: Info,
    color: "text-green-600",
  },
  {
    title: "MESSAGE FROM ADMIN",
    message: "Why are you looking at this link? We know what you did.",
    icon: Skull,
    color: "text-black",
  },
];

export { POPUP_MESSAGES };
