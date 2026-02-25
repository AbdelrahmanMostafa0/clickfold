"use client";
import { useEffect, useState } from "react";
import { userLinks } from "@/services/links";
import { goeyToast } from "goey-toast";
import LinksTable from "./LinksTable";
import MyLinksHeader from "./MyLinksHeader";
import LinksPagination from "./LinksPagination";

const MyLinksPage = () => {
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<string>("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchLinks = async () => {
      setLoading(true);
      try {
        const response = await userLinks({
          page,
          limit: 10,
          sortBy: sort,
        });
        if (response?.success && response?.data?.links) {
          setLinks(response.data.links);
          setTotalPages(response.data.pagination?.pages || 1);
        } else {
          goeyToast.error("Failed to load links");
        }
      } catch (error) {
        goeyToast.error("Failed to fetch links");
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
    <div className="w-full space-y-6 py-24 min-h-screen max-w-6xl mx-auto px-4">
      <MyLinksHeader sort={sort} setSort={handleSortChange} />
      <LinksTable links={links} loading={loading} />
      {totalPages > 1 && (
        <LinksPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default MyLinksPage;
