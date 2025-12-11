import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

interface Post {
  slug: string;
}

interface SyncResponse {
  success: boolean;
  synced: number;
  message: string;
}

const contentDir = join(process.cwd(), 'src/content');

const getAllMarkdownFiles = (dir: string, posts: Post[]): void => {
  const items = readdirSync(dir);
  console.log(`   Found items: ${items.join(', ')}`);

  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      getAllMarkdownFiles(fullPath, posts);
    } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
      console.log(`   📄 Found markdown file: ${item}`);

      const content = readFileSync(fullPath, 'utf-8');
      const { data } = matter(content);

      const slug = data.slug || item.replace(/\.(md|mdx)$/, '');

      console.log(`   ✅ Added post with slug: ${slug}`);
      posts.push({ slug });
    }
  }
};

const posts: Post[] = [];
getAllMarkdownFiles(contentDir, posts);

console.log(`\n📁 Total found: ${posts.length} posts`);
console.log('Slugs:', posts.map((p) => p.slug).join(', '));

if (posts.length === 0) {
  console.warn('⚠️  No posts found! Check your content directory path.');
  process.exit(0);
}

try {
  const response = await fetch(
    'https://pixprocoder-backend.onrender.com/api/v1/posts/sync',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ef91f0068c703f8ed088239f35cb47c4224099fa6dd33easdf543d55faefdee5efd40cf9ae1edsdfasdfasdf12a845862043b46390d3ab7b0d4ed35906eb91629663949e9df476cd`,
      },
      body: JSON.stringify({ posts }),
    },
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Sync failed: ${error}`);
  }

  const result: SyncResponse = await response.json();
  console.log(`✅ Successfully synced ${result.synced} posts to database`);
} catch (error) {
  console.error('❌ Sync error:', error);
  process.exit(1);
}
