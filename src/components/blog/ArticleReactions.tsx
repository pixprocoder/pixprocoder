'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { useToast } from '@/src/components/ui/use-toast';
import { cn } from '@/src/lib/utils';
import { Bookmark, Check, Copy, Eye, Heart, MessageSquare, Share2 } from 'lucide-react';
import { forwardRef, type ReactNode, useState } from 'react';
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
  className?: string;
  showComments?: boolean;
  shareSide?: 'top' | 'bottom';
};

const ActionButton = forwardRef<
  HTMLButtonElement,
  {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    active?: boolean;
    children: ReactNode;
  }
>(function ActionButton(
  { label, onClick, disabled, active, children },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex min-h-11 min-w-11 flex-col items-center justify-center gap-0.5 rounded-xl px-3 text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground disabled:opacity-50',
        active && 'text-primary',
      )}
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
  className,
  showComments = true,
  shareSide = 'bottom',
}: ArticleReactionsProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => `${window.location.origin}/blog/${slug}`;

  const networks = [
    {
      name: 'X',
      href: (url: string) =>
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareTitle)}`,
      icon: FaXTwitter,
    },
    {
      name: 'LinkedIn',
      href: (url: string) =>
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      icon: FaLinkedin,
    },
    {
      name: 'Facebook',
      href: (url: string) =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      icon: FaFacebookF,
    },
    {
      name: 'WhatsApp',
      href: (url: string) =>
        `https://api.whatsapp.com/send?text=${encodeURIComponent(
          shareDescription ? `${shareTitle} — ${shareDescription}` : shareTitle,
        )}%20${encodeURIComponent(url)}`,
      icon: FaWhatsapp,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      toast({ description: 'Link copied.' });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ description: 'Could not copy the link.' });
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

      <ActionButton label="Bookmark" onClick={onBookmark}>
        <Bookmark className="size-4" />
        <span>Save</span>
      </ActionButton>

      <DropdownMenu>
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
          className="w-52 rounded-xl border-border p-1"
        >
          {networks.map((network) => (
            <DropdownMenuItem
              key={network.name}
              className="cursor-pointer gap-2.5 rounded-lg"
              onSelect={() => {
                window.open(
                  network.href(getShareUrl()),
                  '_blank',
                  'noopener,noreferrer,width=640,height=480',
                );
              }}
            >
              <network.icon className="size-4" />
              {network.name}
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
