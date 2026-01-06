import { SectionBanner } from '@/src/components/shared/SectionBanner';
import SelectCategoryPage from '@/src/components/shared/SelectCategory';
import { getAllBlogPostsMeta } from '@/src/lib/blog-helpers';
import { BlogCard } from '../_components/BlogCard';

export default async function BlogPage() {
  const posts = await getAllBlogPostsMeta();

  return (
    <section className="container mx-auto min-h-screen py-14 px-4">
      <SectionBanner>Latest Articles</SectionBanner>

      <div className="mb-12 flex items-center justify-between">
        <h2 className="text-2xl font-medium">Explore by Category</h2>
        <SelectCategoryPage />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post, index) => (
          <BlogCard
            key={post.slug || index}
            blog={post.meta}
            isLoading={false}
          />
        ))}
      </div>
    </section>
  );
}
