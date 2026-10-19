import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pager({ page, pages, from, to, total, onPage }: { page: number; pages: number; from: number; to: number; total: number; onPage: (p: number) => void }) {
  return (
    <div className="flex items-center justify-between border-t border-border px-4 py-3 text-sm text-muted-foreground">
      <span>
        {total === 0 ? "No results" : <>Showing <span className="font-medium text-foreground">{from}–{to}</span> of {total}</>}
      </span>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled={page <= 1} onClick={() => onPage(page - 1)} aria-label="Previous page">
          <ChevronLeft />
        </Button>
        <span className="px-2">Page {page} of {pages}</span>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled={page >= pages} onClick={() => onPage(page + 1)} aria-label="Next page">
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
