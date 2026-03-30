import { getAllBlogPostsMeta } from '@/src/lib/blog-helpers';
import { BlogCard } from '../_components/BlogCard';
import { FiTerminal, FiFilter, FiSearch } from 'react-icons/fi';
import SelectCategoryPage from '@/src/components/shared/SelectCategory';

export default async function BlogPage() {
  const posts = await getAllBlogPostsMeta();

  return (
    <div className="bg-background min-h-screen">
      <section className="container mx-auto py-12 md:py-20">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-xs font-mono text-primary">
              <FiTerminal size={14} />
              <span>~/insights/articles</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Technical <span className="text-primary font-mono italic">insights.</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg md:text-xl">
              Deep dives into modern web architecture, full-stack engineering, and the future of digital product development.
            </p>
          </div>

          {/* Technical Filter Bar */}
          <div className="flex items-center gap-3 bg-muted/20 p-2 rounded-xl border border-border">
             <div className="flex items-center gap-2 px-3 text-muted-foreground">
                <FiFilter size={16} />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Filter:</span>
             </div>
             <SelectCategoryPage />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.map((post, index) => (
            <BlogCard
              key={post.slug || index}
              blog={post.meta}
              isLoading={false}
            />
          ))}
        </div>

        {/* Empty State */}
        {posts?.length === 0 && (
          <div className="py-40 text-center space-y-4">
             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/20 border border-border text-muted-foreground mb-4">
                <FiSearch size={24} />
             </div>
             <h3 className="text-xl font-bold">No logs found</h3>
             <p className="text-muted-foreground font-mono text-sm">Query returned 0 results for the current filter.</p>
          </div>
        )}
      </section>
    </div>
  );
}
