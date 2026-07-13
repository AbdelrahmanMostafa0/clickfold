import { ArrowLeft, SearchX } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LinkNotFound() {
  return (
    <main id="main-content" className="min-h-screen px-4 py-28 noise-bg sm:py-36">
      <section className="mx-auto max-w-4xl border-2 border-foreground bg-card hard-shadow">
        <div className="grid sm:grid-cols-[180px_1fr]">
          <div className="flex min-h-40 items-center justify-center border-b-2 border-foreground bg-primary sm:border-b-0 sm:border-r-2">
            <SearchX className="size-16 text-primary-foreground" strokeWidth={1.5} />
          </div>
          <div className="p-8 sm:p-12">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">Route status / 404</p>
            <h1 className="text-5xl leading-none sm:text-7xl" style={{ fontFamily: "var(--font-display)" }}>Nothing at this turn.</h1>
            <p className="mt-5 max-w-xl leading-7 text-muted-foreground">The campaign route does not exist, or its owner removed it. Check the address before trying again.</p>
            <Link href="/" className="mt-8 inline-block">
              <Button className="border-2 border-foreground bg-foreground text-background"><ArrowLeft className="size-4" />Back to Clickfold</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
