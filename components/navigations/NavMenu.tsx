"use client";

import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  Link2,
  BarChart3,
  Megaphone,
  LogOut,
  Menu,
  Info,
} from "lucide-react";
import { userLogout } from "@/services/auth";
import { useRouter } from "next/router";

function UserAvatar({ className }: { className?: string }) {
  const { user } = useUser();

  return (
    <Avatar className={className}>
      <AvatarImage src={user?.avatar || ""} alt={user?.name || "User"} />
      <AvatarFallback className="bg-[#1a1a1a] text-[#ff2d2d] text-xs font-semibold border border-white/10">
        {user?.name
          ? user.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)
          : "?"}
      </AvatarFallback>
    </Avatar>
  );
}

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/profile/my-links", label: "My Links", icon: Link2 },
  { href: "/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/about", label: "About", icon: Info },
];

export default function NavMenu() {
  const { user, isLoading, refetchUser } = useUser();
  const isSignedIn = !!user && !isLoading;
  //   const router = useRouter();

  const handleLogout = async () => {
    await userLogout();
    refetchUser();
    // router.push("/");
  };
  return (
    <>
      {/* Desktop */}
      <div className="hidden sm:flex items-center gap-4">
        {isLoading ? (
          <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
        ) : isSignedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="outline-none rounded-full ring-2 ring-transparent hover:ring-[#ff2d2d]/50 transition-all">
                <UserAvatar />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-52 bg-[#0a0a0a] border border-white/10 text-white"
            >
              <DropdownMenuLabel className="font-normal">
                <p className="text-sm font-semibold truncate">{user.name}</p>
                <p className="text-xs text-[#666] truncate">{user.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                <DropdownMenuItem
                  key={href}
                  asChild
                  className="cursor-pointer text-[#aaa] focus:text-white focus:bg-white/5"
                >
                  <Link href={href} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[#ff2d2d]" />
                    {label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-[#666] focus:text-red-400 focus:bg-white/5"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link
              href="/about"
              className="text-sm text-[#888] hover:text-white transition-colors mr-4"
            >
              About
            </Link>
            <Link
              href="/signup"
              className="text-sm text-[#888] hover:text-white transition-colors"
            >
              Sign up
            </Link>
            <Link
              href="/login"
              className="text-sm px-4 py-2 border border-[#ff2d2d]/30 text-[#ff2d2d] hover:bg-[#ff2d2d]/10 rounded transition-all"
            >
              Log in
            </Link>
          </>
        )}
      </div>

      {/* Mobile */}
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            {isSignedIn ? (
              <button aria-label="Open menu">
                <UserAvatar />
              </button>
            ) : (
              <button className="text-white p-2" aria-label="Menu">
                <Menu className="w-5 h-5" />
              </button>
            )}
          </SheetTrigger>

          <SheetContent
            side="right"
            className="bg-[#0a0a0a] border-l border-white/10 flex flex-col"
          >
            <SheetHeader className="border-b border-white/10 pb-4">
              {isSignedIn ? (
                <div className="flex items-center gap-3">
                  <UserAvatar className="size-10!" />
                  <div className="flex flex-col min-w-0">
                    <SheetTitle className="text-white text-sm font-semibold truncate">
                      {user.name}
                    </SheetTitle>
                    <SheetDescription className="text-[#666] text-xs truncate">
                      {user.email}
                    </SheetDescription>
                  </div>
                </div>
              ) : (
                <div>
                  <SheetTitle className="text-white text-lg">Menu</SheetTitle>
                  <SheetDescription className="text-[#666] text-xs">
                    Navigate LinkPulse
                  </SheetDescription>
                </div>
              )}
            </SheetHeader>

            {/* Navigation Links */}
            {!isSignedIn && (
              <nav className="flex flex-col gap-1 px-2 py-4 flex-1">
                <SheetClose asChild>
                  <Link
                    href="/about"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#aaa] hover:text-white hover:bg-white/5 transition-all"
                  >
                    <Info className="w-4 h-4 text-[#ff2d2d]" />
                    About
                  </Link>
                </SheetClose>
              </nav>
            )}

            {isSignedIn && (
              <nav className="flex flex-col gap-1 px-2 py-4 flex-1">
                {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                  <SheetClose asChild key={href}>
                    <Link
                      href={href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#aaa] hover:text-white hover:bg-white/5 transition-all"
                    >
                      <Icon className="w-4 h-4 text-[#ff2d2d]" />
                      {label}
                    </Link>
                  </SheetClose>
                ))}

                <div className="border-t border-white/10 mt-4 pt-4">
                  <SheetClose asChild>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#666] hover:text-red-400 hover:bg-white/5 transition-all w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      Log out
                    </button>
                  </SheetClose>
                </div>
              </nav>
            )}

            {/* Footer: Login/Register for unauthenticated users */}
            {!isSignedIn && (
              <SheetFooter className="border-t border-white/10 gap-3">
                <SheetClose asChild>
                  <Link
                    href="/login"
                    className="flex-1 text-center text-sm px-4 py-2.5 border border-[#ff2d2d]/30 text-[#ff2d2d] hover:bg-[#ff2d2d]/10 rounded-lg transition-all"
                  >
                    Log in
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/signup"
                    className="flex-1 text-center text-sm px-4 py-2.5 bg-[#ff2d2d] text-white hover:bg-[#ff2d2d]/90 rounded-lg transition-all"
                  >
                    Sign up
                  </Link>
                </SheetClose>
              </SheetFooter>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
