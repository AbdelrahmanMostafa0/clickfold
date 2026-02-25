"use client";

import { useEffect, useState } from "react";
import { redirectLink } from "@/services/links";
import { Link } from "@/types/link";
import LinkNotFound from "./LinkNotFound";
import LinkInactive from "./LinkInactive";
import RedirectWithPopups from "./RedirectWithPopups";

const LinkRedirectClient = ({ slug }: { slug: string }) => {
  const [link, setLink] = useState<Link | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const res = await redirectLink(slug);
        const data: Link | null = res?.data ?? null;

        if (!data) {
          setNotFound(true);
          return;
        }

        setLink(data);

        // Normal redirect (no popups)
        if (data.isActive && !data.susPopups) {
          window.location.href = data.destination;
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLink();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center noise-bg">
        <div className="w-8 h-8 border-2 border-[#ff2d2d] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (notFound || !link) {
    return <LinkNotFound />;
  }

  if (!link.isActive) {
    return <LinkInactive />;
  }

  if (link.susPopups) {
    return <RedirectWithPopups link={link} />;
  }

  // Fallback while redirect happens
  return (
    <main className="min-h-screen flex items-center justify-center noise-bg">
      <div className="w-8 h-8 border-2 border-[#ff2d2d] border-t-transparent rounded-full animate-spin" />
    </main>
  );
};

export default LinkRedirectClient;
