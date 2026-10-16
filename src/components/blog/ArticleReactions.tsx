'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { cn } from '@/src/lib/utils';
import {
  Bookmark,
  Check,
  Copy,
  Eye,
  Heart,
  MessageSquare,
  Share2,
} from 'lucide-react';
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
  useEffect,
  useState,
} from 'react';
import { FaFacebookF, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

type ArticleReactionsProps = {
  liked: boolean;
  likeCount: number;
  likePending?: boolean;
  viewCount: number;
  commentCount: number;
  slug: string;
  shareTitle: string;
  shareDescription?: string;
  onLike: () => void;
  onBookmark: () => void;
  saved?: boolean;
  bookmarkPending?: boolean;
  className?: string;
  showComments?: boolean;
  shareSide?: 'top' | 'bottom';
};

const ActionButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
    active?: boolean;
    children: ReactNode;
  }
>(function ActionButton(
  { label, active, className, children, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      className={cn(
        'inline-flex min-h-11 min-w-11 flex-col items-center justify-center gap-0.5 rounded-xl px-3 text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground disabled:opacity-50',
        active && 'text-primary',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});

export function ArticleReactions({
  liked,
  likeCount,
  likePending,
  viewCount,
  commentCount,
  slug,
  shareTitle,
  shareDescription,
  onLike,
  onBookmark,
  saved = false,
  bookmarkPending,
  className,
  showComments = true,
  shareSide = 'bottom',
}: ArticleReactionsProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState(`https://www.pixprocoder.com/blog/${slug}`);

  useEffect(() => {
    setShareUrl(`${window.location.origin}/blog/${slug}`);
  }, [slug]);

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(shareTitle);
  const encodedText = encodeURIComponent(
    shareDescription ? `${shareTitle} — ${shareDescription}` : shareTitle,
  );

  const networks = [
    {
      name: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: FaXTwitter,
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: FaLinkedin,
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: FaFacebookF,
    },
    {
      name: 'WhatsApp',
      href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
      icon: FaWhatsapp,
    },
  ];

  const copyLink = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const input = document.createElement('textarea');
        input.value = shareUrl;
        input.setAttribute('readonly', '');
        input.style.position = 'fixed';
        input.style.left = '-9999px';
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        input.remove();
      }
      setCopied(true);
      toast.success('Link copied');
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Could not copy the link');
    }
  };

  return (
    <div
      className={cn(
        'flex items-center justify-around sm:justify-end sm:gap-1',
        className,
      )}
    >
      <div
        className="inline-flex min-h-11 min-w-11 flex-col items-center justify-center gap-0.5 px-3 text-xs text-muted-foreground"
        title={`${viewCount} views`}
      >
        <Eye className="size-4" aria-hidden />
        <span className="tabular-nums">{viewCount}</span>
        <span className="sr-only">{viewCount} views</span>
      </div>

      <ActionButton
        label={liked ? 'Unlike' : 'Like'}
        onClick={onLike}
        disabled={likePending}
        active={liked}
      >
        <Heart className={cn('size-4', liked && 'fill-primary')} />
        <span className="tabular-nums">{likeCount}</span>
      </ActionButton>

      {showComments && (
        <a
          href="#comments"
          aria-label="Jump to comments"
          className="inline-flex min-h-11 min-w-11 flex-col items-center justify-center gap-0.5 rounded-xl px-3 text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
        >
          <MessageSquare className="size-4" />
          <span className="tabular-nums">{commentCount}</span>
        </a>
      )}

      <ActionButton
        label={saved ? 'Unsave' : 'Save'}
        onClick={onBookmark}
        disabled={bookmarkPending}
        active={saved}
      >
        <Bookmark className={cn('size-4', saved && 'fill-primary')} />
        <span>{saved ? 'Saved' : 'Save'}</span>
      </ActionButton>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <ActionButton label="Share">
            <Share2 className="size-4" />
            <span>Share</span>
          </ActionButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          side={shareSide}
          sideOffset={8}
          className="z-[120] w-52 rounded-xl border-border p-1"
        >
          {networks.map((network) => (
            <DropdownMenuItem key={network.name} asChild>
              <a
                href={network.href}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer gap-2.5 rounded-lg"
              >
                <network.icon className="size-4" />
                {network.name}
              </a>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer gap-2.5 rounded-lg"
            onSelect={(event) => {
              event.preventDefault();
              copyLink();
            }}
          >
            {copied ? (
              <Check className="size-4 text-primary" />
            ) : (
              <Copy className="size-4" />
            )}
            {copied ? 'Copied' : 'Copy link'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
