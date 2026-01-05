import { readdirSync, readFileSync, statSync } from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

const contentDir = join(process.cwd(), 'src/content');

const getAllMarkdownFiles = (dir: string, posts: string[]): void => {
  const items = readdirSync(dir);

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
      posts.push({ slug });
    }
  }
};

const posts: string[] = [];
getAllMarkdownFiles(contentDir, posts);

if (posts.length === 0) {
  console.warn('⚠️  No posts found! Check your content directory path.');
  process.exit(0);
}

try {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3003/api/v1'}/posts/sync `,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_POST_SYNC_SECRET}`,
      },
      body: JSON.stringify({ posts }),
    },
  );
  console.log(response);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Sync failed: ${error}`);
  }

  const result = await response.json();
  console.log(`   📝 Total synced: ${result.synced}`);
  if (result.created) console.log(`   ➕ Created: ${result.created}`);
  if (result.updated) console.log(`   🔄 Updated: ${result.updated}`);
  if (result.deleted) console.log(`   🗑️  Deleted: ${result.deleted}`);
} catch (error) {
  console.error('❌ Sync error:', error);
  process.exit(1);
}
