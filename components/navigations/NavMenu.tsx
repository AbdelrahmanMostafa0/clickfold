"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
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
  BarChart3,
  Info,
  Link2,
  LogOut,
  Megaphone,
  Menu,
  User,
} from "lucide-react";
import { userLogout } from "@/services/auth";

const NAV_LINKS = [
  { href: "/dashboard", label: "Overview", icon: BarChart3 },
  { href: "/profile/my-links", label: "Links", icon: Link2 },
  { href: "/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/about", label: "About", icon: Info },
];

function UserAvatar({ className = "" }: { className?: string }) {
  const { user } = useUser();
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((name: string) => name[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <Avatar className={className}>
      <AvatarImage src={user?.avatar || ""} alt={user?.name || "User"} />
      <AvatarFallback className="border border-foreground bg-primary text-xs font-bold text-primary-foreground">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}

function NavItem({
  href,
  label,
  icon: Icon,
  mobile = false,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  mobile?: boolean;
}) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-3 text-sm font-semibold transition-colors ${
        mobile ? "min-h-11 px-3 py-2" : "px-2 py-1"
      } ${
        active
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon className="size-4" />
      {label}
    </Link>
  );
}

export default function NavMenu() {
  const { user, isLoading, refetchUser } = useUser();
  const isSignedIn = Boolean(user) && !isLoading;

  const handleLogout = async () => {
    await userLogout();
    refetchUser();
  };

  return (
    <>
      <div className="hidden items-center gap-4 sm:flex">
        {isLoading ? (
          <div className="size-9 animate-pulse bg-secondary" aria-label="Loading account" />
        ) : user ? (
          <>
            <Link
              href="/create"
              className="hard-shadow border border-foreground bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
            >
              Build a link
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring">
                  <UserAvatar />
                  <span className="sr-only">Open account menu</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 border-border bg-popover text-popover-foreground">
                <DropdownMenuLabel className="font-normal">
                  <p className="truncate text-sm font-bold">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {NAV_LINKS.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <NavItem {...item} />
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                >
                  <LogOut className="mr-2 size-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link href="/about" className="text-sm font-semibold text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link href="/login" className="text-sm font-semibold text-muted-foreground hover:text-foreground">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="hard-shadow border border-foreground bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
            >
              Start creating
            </Link>
          </>
        )}
      </div>

      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex size-11 items-center justify-center border border-foreground bg-card" aria-label="Open menu">
              {isSignedIn ? <UserAvatar className="size-8" /> : <Menu className="size-5" />}
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col border-border bg-background text-foreground">
            <SheetHeader className="border-b border-border pb-5 text-left">
              <SheetTitle className="font-display text-2xl font-black">
                {user ? user.name : "Campaign desk"}
              </SheetTitle>
              <SheetDescription className="text-muted-foreground">
                {user ? user.email : "Build, share, and read every link."}
              </SheetDescription>
            </SheetHeader>

            <nav className="flex flex-1 flex-col gap-1 py-5" aria-label="Mobile navigation">
              {(isSignedIn ? NAV_LINKS : NAV_LINKS.filter((item) => item.href === "/about")).map((item) => (
                <SheetClose asChild key={item.href}>
                  <NavItem {...item} mobile />
                </SheetClose>
              ))}
              {isSignedIn && (
                <SheetClose asChild>
                  <Link
                    href="/create"
                    className="mt-4 flex min-h-11 items-center justify-center border border-foreground bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
                  >
                    Build a link
                  </Link>
                </SheetClose>
              )}
            </nav>

            <SheetFooter className="border-t border-border pt-5">
              {isSignedIn ? (
                <SheetClose asChild>
                  <button
                    onClick={handleLogout}
                    className="flex min-h-11 w-full items-center gap-3 px-3 text-sm font-semibold text-destructive"
                  >
                    <LogOut className="size-4" />
                    Sign out
                  </button>
                </SheetClose>
              ) : (
                <div className="grid w-full grid-cols-2 gap-3">
                  <SheetClose asChild>
                    <Link href="/login" className="flex min-h-11 items-center justify-center border border-foreground font-bold">
                      Sign in
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/signup" className="flex min-h-11 items-center justify-center border border-primary bg-primary font-bold text-primary-foreground">
                      Create account
                    </Link>
                  </SheetClose>
                </div>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
