import { getAllBlogPosts, getBlogPostBySlug } from '@/src/lib/blog-helpers';
import { notFound } from 'next/navigation';
import SingleBlogPageClient from './SingleBlogPageClient';

export default async function SingleBlogPage({ params }: { params: any }) {
  const { slug } = await params;

  // Try to find by searching through all blog posts for a matching slug in frontmatter
  const allBlogPosts = await getAllBlogPosts();
  const blogPost = allBlogPosts.find((post) => post.meta.slug === slug);

  if (!blogPost) {
    // If not found directly, try to match the ID as a path
    const blogPostByPath = await getBlogPostBySlug(slug);
    if (blogPostByPath) {
      return <SingleBlogPageClient blogPost={blogPostByPath} />;
    }
    notFound();
  }

  return <SingleBlogPageClient blogPost={blogPost} />;
}
