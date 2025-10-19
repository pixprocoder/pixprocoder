import { promises as fsPromises } from 'fs';
import { glob } from 'glob';
import grayMatter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import path from 'path';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const BLOG_DIR = path.join(process.cwd(), '/src/content');

export interface BlogPostMeta {
  title: string;
  slug: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  thumbnail?: string;
  published: boolean;
}

export interface BlogPost {
  slug: string;
  meta: BlogPostMeta;
  content: string;
}

export function getAllBlogPostPaths(): string[] {
  const pattern = path.join(BLOG_DIR, '**', 'page.mdx');
  const filePaths = glob.sync(pattern);

  return filePaths.map((filePath) => {
    const relativePath = path.relative(BLOG_DIR, filePath).replace(/\\/g, '/');
    const parts = relativePath.split('/');
    const directoryBasedSlug = parts.slice(0, -1).join('/');
    const dateAndTitleSlug = directoryBasedSlug.replace(/\//g, '-');
    return dateAndTitleSlug;
  });
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  try {
    // Convert the date-title format (2025-10-slug) back to directory format (2025/10/slug)
    // Only convert the first 2 dashes (for year and month) to slashes
    const parts = slug.split('-');
    if (parts.length < 3) {
      // If there are fewer than 3 parts, we can't have a year-month-slug format
      console.error(`Invalid slug format: ${slug}`);
      return null;
    }
    // Take the first two parts (year and month) and join them with slashes,
    // then join the rest as the folder name
    const yearMonth = parts.slice(0, 2).join('/');
    const folderName = parts.slice(2).join('-');
    const directoryPath = `${yearMonth}/${folderName}`;
    const filePath = path.join(BLOG_DIR, directoryPath, 'page.mdx');

    await fsPromises.access(filePath);
    const source = await fsPromises.readFile(filePath, 'utf8');
    const { content, data } = grayMatter(source);

    const meta: BlogPostMeta = {
      title: data.title || 'Untitled',
      slug: data.slug || slug,
      date: data.date || new Date().toISOString().split('T')[0],
      author: data.author || 'Samsul Kobir',
      excerpt: data.excerpt || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      thumbnail: data.thumbnail,
      published: data.published ?? true,
    };

    const { code } = await bundleMDX({
      source: content,
      mdxOptions: (options) => {
        options.remarkPlugins = [...(options.remarkPlugins || []), remarkGfm];
        options.rehypePlugins = [
          ...(options.rehypePlugins || []),
          [
            rehypeHighlight,
            {
              detect: true,
              ignoreMissing: true,
            },
          ],
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              properties: {
                className: ['anchor'],
              },
            },
          ],
        ];
        return options;
      },
    });

    return {
      slug,
      meta,
      content: code,
    };
  } catch (error) {
    // Convert the date-title format (2025-10-slug) back to directory format (2025/10/slug)
    // Only convert the first 2 dashes (for year and month) to slashes
    const parts = slug.split('-');
    if (parts.length < 3) {
      // If there are fewer than 3 parts, we can't have a year-month-slug format
      const directoryPath = slug.replace(/-/g, '/');
    } else {
      // Take the first two parts (year and month) and join them with slashes,
      // then join the rest as the folder name
      const yearMonth = parts.slice(0, 2).join('/');
      const folderName = parts.slice(2).join('-');
      var directoryPath = `${yearMonth}/${folderName}`;
    }

    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      console.error(
        `Blog post not found: ${path.join(BLOG_DIR, directoryPath, 'page.mdx')}`,
      );
      return null;
    }
    console.error(
      `Error reading blog post ${slug} (path: ${directoryPath}):`,
      error,
    );
    return null;
  }
}

export async function getAllBlogPostsMeta(): Promise<
  { slug: string; meta: BlogPostMeta }[]
> {
  const paths = getAllBlogPostPaths();
  const posts = [];

  for (const blogPath of paths) {
    // Convert the date-title format back to directory format to find the file
    // Only convert the first 2 dashes (for year and month) to slashes
    const parts = blogPath.split('-');
    let directoryPath;

    if (parts.length < 3) {
      // If there are fewer than 3 parts, convert all dashes to slashes
      directoryPath = blogPath.replace(/-/g, '/');
    } else {
      // Take the first two parts (year and month) and join them with slashes,
      // then join the rest as the folder name
      const yearMonth = parts.slice(0, 2).join('/');
      const folderName = parts.slice(2).join('-');
      directoryPath = `${yearMonth}/${folderName}`;
    }

    const filePath = path.join(BLOG_DIR, directoryPath, 'page.mdx');

    try {
      await fsPromises.access(filePath);
      const source = await fsPromises.readFile(filePath, 'utf8');
      const { data } = grayMatter(source);

      const meta: BlogPostMeta = {
        title: data.title || 'Untitled',
        slug: data.slug || blogPath,
        date: data.date || new Date().toISOString().split('T')[0],
        author: data.author || 'Samsul Kobir',
        excerpt: data.excerpt || '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        thumbnail: data.thumbnail,
        published: data.published ?? true,
      };

      if (meta.published) {
        posts.push({
          slug: blogPath,
          meta,
        });
      }
    } catch {
      continue;
    }
  }

  posts.sort(
    (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime(),
  );

  return posts;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const paths = getAllBlogPostPaths();
  const posts = [];

  for (const blogPath of paths) {
    const post = await getBlogPostBySlug(blogPath);
    if (post && post.meta.published) {
      posts.push(post);
    }
  }

  posts.sort(
    (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime(),
  );

  return posts;
}
