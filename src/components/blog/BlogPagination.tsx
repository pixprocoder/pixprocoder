import { blogListHref } from '@/src/lib/blog-listing';
import { cn } from '@/src/lib/utils';
import Link from 'next/link';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

export function BlogPagination({
  tag,
  currentPage,
  totalPages,
}: {
  tag?: string;
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const prevHref = blogListHref({ tag, page: currentPage - 1 });
  const nextHref = blogListHref({ tag, page: currentPage + 1 });

  return (
    <nav
      aria-label="Blog pages"
      className="mt-14 flex items-center justify-center gap-2"
    >
      {currentPage > 1 ? (
        <Link
          href={prevHref}
          className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          aria-label="Previous page"
        >
          <FiArrowLeft className="size-4" />
        </Link>
      ) : (
        <span className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-muted-foreground/30">
          <FiArrowLeft className="size-4" />
        </span>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={blogListHref({ tag, page })}
          aria-current={page === currentPage ? 'page' : undefined}
          className={cn(
            'inline-flex size-10 items-center justify-center rounded-xl border text-sm font-medium transition-colors',
            page === currentPage
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground',
          )}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages ? (
        <Link
          href={nextHref}
          className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          aria-label="Next page"
        >
          <FiArrowRight className="size-4" />
        </Link>
      ) : (
        <span className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-muted-foreground/30">
          <FiArrowRight className="size-4" />
        </span>
      )}
    </nav>
  );
}
