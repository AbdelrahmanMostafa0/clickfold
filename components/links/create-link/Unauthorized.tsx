import { ArrowRight, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Unauthorized() {
  return (
    <main id="main-content" className="min-h-screen px-4 py-28 noise-bg sm:py-36">
      <section className="mx-auto grid max-w-5xl border-2 border-foreground bg-card hard-shadow lg:grid-cols-[1.15fr_.85fr]">
        <div className="border-b-2 border-foreground p-8 lg:border-b-0 lg:border-r-2 sm:p-12">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-primary">Studio access</p>
          <h1 className="max-w-xl text-5xl leading-[.92] sm:text-7xl" style={{ fontFamily: "var(--font-display)" }}>
            Your routes need a workspace.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">
            Sign in to build campaign links, shape their share previews, and keep every click attached to the right idea.
          </p>
        </div>
        <div className="flex flex-col justify-between bg-secondary p-8 sm:p-12">
          <div className="mb-12 flex size-14 items-center justify-center border-2 border-foreground bg-background">
            <LockKeyhole className="size-6 text-primary" />
          </div>
          <div className="space-y-3">
            <Link href="/login?callbackUrl=/create" className="block">
              <Button className="h-12 w-full border-2 border-foreground bg-primary font-bold text-primary-foreground hard-shadow">
                Enter your studio <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/signup?callbackUrl=/create" className="block">
              <Button variant="outline" className="h-12 w-full border-2 border-foreground bg-background font-bold">
                Create a workspace
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
