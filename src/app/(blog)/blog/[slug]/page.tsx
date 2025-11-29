import { getBlogPostBySlug } from '@/src/lib/blog-helpers';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SingleBlogPageClient from './SingleBlogPageClient';

interface SingleBlogPageProps {
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
  const blogPost = await getBlogPostBySlug(slug);

  if (!blogPost || !blogPost.meta.published) {
    return {};
  }

  const { meta } = blogPost;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pixprocoder.com';
  const fullUrl = `${siteUrl}/blog/${meta.slug}`;
  const fullThumbnailUrl = meta.thumbnail
    ? (meta.thumbnail.startsWith('http')
        ? meta.thumbnail
        : `${siteUrl}${meta.thumbnail.startsWith('/') ? meta.thumbnail : `/${meta.thumbnail}`}`)
    : `${siteUrl}/web-dev.png`;

  return {
    title: `${meta.title} - PixProcoder`,
    description: meta.excerpt,
    openGraph: {
      title: meta.title,
      description: meta.excerpt,
      url: fullUrl,
      siteName: 'PixProcoder',
      images: [
        {
          url: fullThumbnailUrl,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: meta.date,
      authors: [meta.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.excerpt,
      images: [fullThumbnailUrl],
    },
  };
}

export default async function SingleBlogPage({ params }: SingleBlogPageProps) {
  const { slug } = await params;

  const blogPost = await getBlogPostBySlug(slug);

  if (!blogPost || !blogPost.meta.published) {
    notFound();
  }

  return <SingleBlogPageClient blogPost={blogPost} />;
}
