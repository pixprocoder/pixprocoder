import { getAllBlogPostsMeta } from '@/src/lib/blog-helpers';

export default async function BlogPage() {
  const posts = await getAllBlogPostsMeta();

  return (
    <section>
      <h1>About author</h1>
    </section>
  );
}
