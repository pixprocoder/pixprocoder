import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

interface Post {
  slug: string;
}

interface SyncResponse {
  success: boolean;
  synced: number;
  message: string;
}

async function syncPosts(): Promise<void> {
  try {
    const contentDir = path.join(process.cwd(), 'src/content');
    const posts: Post[] = [];

    // Function to recursively read all markdown files
    const getAllMarkdownFiles = (dir: string): void => {
      console.log(`📂 Reading directory: ${dir}`);
      const items = fs.readdirSync(dir);
      console.log(`   Found items: ${items.join(', ')}`);

      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          console.log(`   📁 Entering subdirectory: ${item}`);
          // Recursively read subdirectories
          getAllMarkdownFiles(fullPath);
        } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
          console.log(`   📄 Found markdown file: ${item}`);
          // Read markdown file
          const content = fs.readFileSync(fullPath, 'utf-8');
          const { data } = matter(content);

          // Extract slug from frontmatter or filename
          const slug = data.slug || item.replace(/\.(md|mdx)$/, '');

          console.log(`   ✅ Added post with slug: ${slug}`);
          posts.push({ slug });
        }
      }
    };

    // Start reading from content directory
    getAllMarkdownFiles(contentDir);

    console.log(`\n📁 Total found: ${posts.length} posts`);
    console.log('Slugs:', posts.map((p) => p.slug).join(', '));

    if (posts.length === 0) {
      console.warn('⚠️  No posts found! Check your content directory path.');
      return;
    }

    // Send to your backend API
    const response = await fetch('http://localhost:3003/api/v1/posts/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_POST_SYNC_SECRET}`,
      },
      body: JSON.stringify({ posts }),
    });

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
}

syncPosts();
