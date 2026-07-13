"use client";

import { useEffect, useState } from "react";
import { goeyToast } from "goey-toast";
import { userLinks } from "@/services/links";
import type { Link } from "@/types/link";
import LinksTable from "./LinksTable";
import MyLinksHeader from "./MyLinksHeader";
import LinksPagination from "./LinksPagination";

export default function MyLinksPage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchLinks = async () => {
      setLoading(true);
      try {
        const response = await userLinks({ page, limit: 10, sortBy: sort });
        if (response?.success && response?.data?.links) {
          setLinks(response.data.links as Link[]);
          setTotalPages(response.data.pagination?.pages || 1);
        } else {
          goeyToast.error("We couldn't load your links. Try refreshing the page.");
        }
      } catch {
        goeyToast.error("We couldn't reach your link index. Check your connection and try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, [sort, page]);

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
    setPage(1);
  };

  return (
    <main id="main-content" className="studio-grid min-h-screen px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <MyLinksHeader sort={sort} setSort={handleSortChange} />
        <LinksTable links={links} loading={loading} />
        {totalPages > 1 && <LinksPagination page={page} totalPages={totalPages} onPageChange={setPage} />}
      </div>
    </main>
  );
}
