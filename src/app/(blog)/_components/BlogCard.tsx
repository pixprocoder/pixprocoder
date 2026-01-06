'use client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/ui/avatar';
import { Badge } from '@/src/components/ui/badge';
import { Card, CardContent } from '@/src/components/ui/card';
import { BlogPost, BlogPostMeta } from '@/src/types';
import { formatDateToUTCShort } from '@/src/utils/FormatDate';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
  blog: BlogPostMeta;
  isLoading?: boolean;
}

export const BlogCard = ({ blog, isLoading }: BlogCardProps) => {
  if (isLoading) {
    return (
      <Card className="h-full overflow-hidden border-border bg-background/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className="aspect-video w-full bg-muted/50" />
          <div className="p-6 space-y-4">
            <div className="h-6 w-3/4 bg-muted/50 rounded" />
            <div className="h-4 w-full bg-muted/50 rounded" />
            <div className="h-4 w-5/6 bg-muted/50 rounded" />
            <div className="flex items-center justify-between">
              <div className="h-4 w-20 bg-muted/50 rounded" />
              <div className="h-6 w-6 bg-muted/50 rounded-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div whileHover={{ y: -5 }} className="h-full">
      <Card className="h-full overflow-hidden border-border bg-background/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          {/* Thumbnail */}
          <div className="relative aspect-video w-full">
            <Image
              src={blog?.thumbnail || '/web-dev.png'}
              alt={blog.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Tags */}
            {/* {blog.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag: string) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs bg-background/50 backdrop-blur"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )} */}
            {/* Author and Date */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <Link href={`/blog/about-author/${blog.authorId}`}>
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={blog.authorProfile} />
                    <AvatarFallback>{blog.author?.[0] || 'S'}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5">
                    <span className="hover:underline hover:text-primary">
                      {blog.author || 'MD Samsul Kobir'}
                    </span>
                    <span className="text-xs">
                      {formatDateToUTCShort(blog.date)}
                    </span>
                  </div>
                </div>
              </Link>
              {/* <span>{new Date(blog.date).toLocaleDateString()}</span> */}
              <Badge>New</Badge>
            </div>
            <hr />
            {/* Title */}
            <Link
              href={`/blog/${blog.slug}`}
              className="text-lg font-semibold line-clamp-2
               hover:text-primary/80 transition-colors hover:underline
              "
            >
              {blog.title}
            </Link>

            {/* Excerpt */}
            <p className="text-muted-foreground text-sm line-clamp-3">
              {blog.excerpt}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
