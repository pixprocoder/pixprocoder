'use client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/ui/avatar';
import { BlogPostMeta } from '@/src/types';
import { formatDateToUTCShort } from '@/src/utils/FormatDate';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiCalendar, FiClock, FiLayers } from 'react-icons/fi';

interface BlogCardProps {
  blog: BlogPostMeta;
  isLoading?: boolean;
}

export const BlogCard = ({ blog, isLoading }: BlogCardProps) => {
  if (isLoading) {
    return (
      <div className="h-[450px] rounded-xl border border-border bg-muted/20 animate-pulse" />
    );
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group flex flex-col h-full bg-background border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/5"
    >
      <Link href={`/blog/${blog.slug}`} className="flex flex-col h-full">
        {/* Repository-style Header */}
        <div className="px-5 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiLayers size={14} className="text-primary" />
            <span className="text-[10px] font-mono font-bold text-foreground uppercase tracking-tight">
              {blog.tags?.[0] || 'engineering'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
            <span className="text-[9px] font-mono font-bold text-primary uppercase tracking-tighter italic">article_v1.0</span>
          </div>
        </div>

        {/* Thumbnail */}
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={blog?.thumbnail || '/web-dev.png'}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow space-y-4">
          {/* Metadata */}
          <div className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <FiCalendar className="text-primary" />
              <span>{formatDateToUTCShort(blog.date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FiClock className="text-primary" />
              <span>5 min read</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground text-sm line-clamp-3 flex-grow leading-relaxed">
            {blog.excerpt}
          </p>

          {/* Footer Info */}
          <div className="pt-4 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6 border border-border">
                <AvatarImage src={blog.authorProfile} />
                <AvatarFallback className="text-[8px]">{blog.author?.[0] || 'S'}</AvatarFallback>
              </Avatar>
              <span className="text-[10px] font-mono text-muted-foreground truncate max-w-[100px]">
                @{blog.author?.toLowerCase().replace(' ', '_') || 'pixprocoder'}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-primary group-hover:gap-2 transition-all">
              <span>READ_MORE</span>
              <FiArrowRight size={12} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
