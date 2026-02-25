import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLink, Copy, Trash2, Edit, MoreHorizontal } from "lucide-react";
import { goeyToast } from "goey-toast";
import { Link } from "@/types/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
const LinksTable = ({
  links,
  loading,
}: {
  links: Link[];
  loading: boolean;
}) => {
  const copyToClipboard = (slug: string) => {
    const shortUrl = `${window.location.origin}/l/${slug}`;
    navigator.clipboard.writeText(shortUrl);
    goeyToast.success("Link copied to clipboard");
  };
  return (
    <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden">
      <Table>
        <TableHeader className="bg-white/5 border-b border-white/5">
          <TableRow className="border-white/5 hover:bg-transparent">
            <TableHead className="text-[#888]">Link Info</TableHead>
            <TableHead className="text-[#888]">Shortlink</TableHead>
            <TableHead className="text-[#888]">Clicks</TableHead>
            <TableHead className="text-[#888]">Date Added</TableHead>
            <TableHead className="text-[#888]">Status</TableHead>
            <TableHead className="text-right text-[#888]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow className="border-white/5">
              <TableCell colSpan={6} className="h-32 text-center text-[#888]">
                Loading links...
              </TableCell>
            </TableRow>
          ) : links.length === 0 ? (
            <TableRow className="border-white/5">
              <TableCell colSpan={6} className="h-32 text-center text-[#888]">
                No links found. Create one to get started!
              </TableCell>
            </TableRow>
          ) : (
            links.map((link) => (
              <TableRow
                key={link._id}
                className="border-white/5 hover:bg-white/5 group border-b"
              >
                <TableCell>
                  <div className="flex flex-col max-w-[200px] sm:max-w-[300px]">
                    <span className="font-medium text-white truncate">
                      {link.og?.title || link.slug}
                    </span>
                    <a
                      href={link.destination}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#888] truncate hover:text-[#ff2d2d] transition-colors flex items-center gap-1 mt-1"
                    >
                      {link.destination}
                      <ExternalLink className="size-3 shrink-0" />
                    </a>
                  </div>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => copyToClipboard(link.slug)}
                    className="text-white hover:text-[#ff2d2d] transition-colors flex items-center gap-2 cursor-pointer group/copy"
                  >
                    /l/{link.slug}
                    <Copy className="size-3 opacity-0 group-hover/copy:opacity-100 transition-opacity" />
                  </button>
                </TableCell>
                <TableCell className="text-white">
                  <span className="bg-white/10 px-2.5 py-1 rounded-full text-xs font-medium">
                    {link.clicks || 0}
                  </span>
                </TableCell>
                <TableCell className="text-[#888] text-sm whitespace-nowrap">
                  {new Date(link.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  {link.isActive ? (
                    <span className="text-green-500 bg-green-500/10 px-2 py-1 rounded-full text-xs font-medium border border-green-500/20">
                      Active
                    </span>
                  ) : (
                    <span className="text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-full text-xs font-medium border border-yellow-500/20">
                      Inactive
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="size-8 p-0 text-[#888] hover:text-white hover:bg-white/10"
                      >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-[#1a1a1a] border-white/10 text-white min-w-[160px]"
                    >
                      <DropdownMenuLabel className="text-[#888] text-xs font-normal">
                        Actions
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-white/10" />
                      <DropdownMenuItem
                        className="hover:bg-white/10 cursor-pointer focus:bg-white/10 focus:text-white"
                        onClick={() => copyToClipboard(link.slug)}
                      >
                        <Copy className="size-4 mr-2" />
                        Copy Link
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-white/10 cursor-pointer focus:bg-white/10 focus:text-white">
                        <Edit className="size-4 mr-2" />
                        Edit Link
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-white/10" />
                      <DropdownMenuItem className="text-[#ff2d2d] hover:bg-[#ff2d2d]/10 hover:text-[#ff2d2d] focus:bg-[#ff2d2d]/10 focus:text-[#ff2d2d] cursor-pointer">
                        <Trash2 className="size-4 mr-2" />
                        Delete Link
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LinksTable;
