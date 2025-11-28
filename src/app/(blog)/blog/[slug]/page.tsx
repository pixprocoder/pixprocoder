import { getBlogPostBySlug } from '@/src/lib/blog-helpers';
import { notFound } from 'next/navigation';
import SingleBlogPageClient from './SingleBlogPageClient';

export default async function SingleBlogPage({ params }: { params: any }) {
  const { slug } = await params;

  const blogPost = await getBlogPostBySlug(slug);

  if (!blogPost || !blogPost.meta.published) {
    notFound();
  }

  return <SingleBlogPageClient blogPost={blogPost} />;
}
