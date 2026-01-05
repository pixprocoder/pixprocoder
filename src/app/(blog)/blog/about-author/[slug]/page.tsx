import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/ui/avatar';
import { Badge } from '@/src/components/ui/badge';
import { getBlogPostsByAuthorId } from '@/src/lib/blog-helpers';
import { ArrowLeft, Calendar, FileText } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface AuthorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const authorPosts = await getBlogPostsByAuthorId(slug);

  if (!authorPosts || authorPosts.length === 0) {
    return { title: 'Author Not Found - PixProcoder' };
  }

  const authorInfo = authorPosts[0].meta;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pixprocoder.com';
  const fullUrl = `${siteUrl}/author/${slug}`;
  const ogImage = authorInfo.authorProfile?.startsWith('http')
    ? authorInfo.authorProfile
    : `${siteUrl}${authorInfo.authorProfile}`;

  return {
    title: `${authorInfo.author} - Author at PixProcoder`,
    description: `Read all ${authorPosts.length} articles published by ${authorInfo.author} on pixprocoder website.`,
    openGraph: {
      title: `${authorInfo.author} | PixProcoder`,
      url: fullUrl,
      images: [
        {
          url: ogImage as string,
          width: 400,
          height: 400,
          alt: authorInfo.author,
        },
      ],
      type: 'profile',
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  console.log(slug);

  // Use the optimized function to get posts specifically for this authorId/slug
  const authorPosts = await getBlogPostsByAuthorId(slug);

  if (!authorPosts || authorPosts.length === 0) {
    notFound();
  }

  // Extract author info from the metadata of the first post
  const authorInfo = authorPosts[0].meta;
  const authorNameDisplay = authorInfo.author;
  const authorProfile = authorInfo.authorProfile || '/profile.png';

  // Calculate stats based on the returned posts
  const totalPosts = authorPosts.length;
  const uniqueTags = new Set(authorPosts.flatMap((post) => post.meta.tags));
  const firstPostYear = new Date(
    Math.min(...authorPosts.map((p) => new Date(p.meta.date).getTime())),
  ).getFullYear();

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all posts
        </Link>

        {/* Author Header */}
        <div className="flex items-start gap-6 mb-12">
          <Avatar className="w-24 h-24 ring-2 ring-border">
            <AvatarImage src={authorProfile} alt={authorNameDisplay} />
            <AvatarFallback className="text-xl">
              {authorNameDisplay
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{authorNameDisplay}</h1>
            <p className="text-muted-foreground mb-4">
              {totalPosts} {totalPosts === 1 ? 'post' : 'posts'} • Writing since{' '}
              {firstPostYear}
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                <span>{totalPosts} articles</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>•</span>
                <span>{uniqueTags.size} topics</span>
              </div>
            </div>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-8">
          <h2 className="text-xl font-semibold">All Posts</h2>

          <div className="space-y-6">
            {authorPosts.map((post) => (
              <article
                key={post.slug}
                className="group border-b border-border pb-6 last:border-0"
              >
                <Link href={`/blog/${post.slug}`} className="block space-y-3">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {post.meta.title}
                  </h3>

                  <p className="text-muted-foreground line-clamp-2">
                    {post.meta.excerpt}
                  </p>

                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex flex-wrap gap-2">
                      {post.meta.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="text-xs font-normal"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <time className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.meta.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
