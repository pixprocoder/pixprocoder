import { cache } from 'react';
import path from 'path';
import { promises as fsPromises } from 'fs';
import grayMatter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const BLOG_DIR = path.join(process.cwd(), 'src/content');

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
  filePath?: string;
}

// Get all blog post paths by walking the directory tree
export function getAllBlogPostPaths(): string[] {
  const paths: string[] = [];

  function walkDir(dir: string) {
    try {
      const files = require('fs').readdirSync(dir);

      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = require('fs').statSync(filePath);

        if (stat.isDirectory()) {
          walkDir(filePath);
        } else if (file === 'page.mdx') {
          // Store relative path from BLOG_DIR
          const relativePath = path.relative(BLOG_DIR, filePath);
          paths.push(relativePath);
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${dir}:`, error);
    }
  }

  walkDir(BLOG_DIR);
  return paths;
}

export const getBlogPostBySlug = cache(
  async (slug: string): Promise<BlogPost | null> => {
    try {
      // Get all blog post paths
      const allPaths = getAllBlogPostPaths();

      console.log(`Searching for slug: ${slug}`);
      console.log(`Found ${allPaths.length} blog posts`);

      for (const relativePath of allPaths) {
        const filePath = path.join(BLOG_DIR, relativePath);

        try {
          const source = await fsPromises.readFile(filePath, 'utf8');
          const { content, data } = grayMatter(source);

          // Check if this post's slug matches
          const postSlug =
            data.slug || path.basename(path.dirname(relativePath));

          if (postSlug === slug) {
            const meta: BlogPostMeta = {
              title: data.title || 'Untitled',
              slug: postSlug,
              date: data.date || new Date().toISOString().split('T')[0],
              author: data.author || 'Samsul Kobir',
              excerpt: data.excerpt || '',
              tags: Array.isArray(data.tags) ? data.tags : [],
              thumbnail: data.thumbnail,
              published: data.published ?? true,
            };

            // Only return if published
            if (!meta.published) {
              console.log(`Post "${slug}" found but not published`);
              return null;
            }

            const { code } = await bundleMDX({
              source: content,
              mdxOptions: (options) => {
                options.remarkPlugins = [
                  ...(options.remarkPlugins || []),
                  remarkGfm,
                ];
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

            console.log(`Successfully loaded post: ${slug}`);
            return {
              slug: postSlug,
              meta,
              content: code,
              filePath: relativePath,
            };
          }
        } catch (error) {
          console.error(`Error reading ${filePath}:`, error);
          continue;
        }
      }

      console.error(`Blog post with slug "${slug}" not found`);
      return null;
    } catch (error) {
      console.error(`Error in getBlogPostBySlug for "${slug}":`, error);
      return null;
    }
  },
);

// Get all published blog posts (cached)
export const getAllBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const paths = getAllBlogPostPaths();
  const posts: BlogPost[] = [];

  console.log(`Loading ${paths.length} blog posts from ${BLOG_DIR}`);

  for (const relativePath of paths) {
    const filePath = path.join(BLOG_DIR, relativePath);

    try {
      const source = await fsPromises.readFile(filePath, 'utf8');
      const { content, data } = grayMatter(source);

      const slug = data.slug || path.basename(path.dirname(relativePath));

      const meta: BlogPostMeta = {
        title: data.title || 'Untitled',
        slug,
        date: data.date || new Date().toISOString().split('T')[0],
        author: data.author || 'Samsul Kobir',
        excerpt: data.excerpt || '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        thumbnail: data.thumbnail,
        published: data.published ?? true,
      };

      // Only include published posts
      if (meta.published) {
        const { code } = await bundleMDX({
          source: content,
          mdxOptions: (options) => {
            options.remarkPlugins = [
              ...(options.remarkPlugins || []),
              remarkGfm,
            ];
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

        posts.push({
          slug,
          meta,
          content: code,
          filePath: relativePath,
        });
      }
    } catch (err) {
      console.error(`Error processing ${filePath}:`, err);
      continue;
    }
  }

  // Sort by date (newest first)
  posts.sort(
    (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime(),
  );

  console.log(`Successfully loaded ${posts.length} published posts`);
  return posts;
});

// Lightweight version - only loads metadata without bundling MDX
export const getAllBlogPostsMeta = cache(
  async (): Promise<
    { slug: string; meta: BlogPostMeta; filePath: string }[]
  > => {
    const paths = getAllBlogPostPaths();
    const posts = [];

    for (const relativePath of paths) {
      const filePath = path.join(BLOG_DIR, relativePath);

      try {
        const source = await fsPromises.readFile(filePath, 'utf8');
        const { data } = grayMatter(source);

        const slug = data.slug || path.basename(path.dirname(relativePath));

        const meta: BlogPostMeta = {
          title: data.title || 'Untitled',
          slug,
          date: data.date || new Date().toISOString().split('T')[0],
          author: data.author || 'Samsul Kobir',
          excerpt: data.excerpt || '',
          tags: Array.isArray(data.tags) ? data.tags : [],
          thumbnail: data.thumbnail,
          published: data.published ?? true,
        };

        if (meta.published) {
          posts.push({
            slug,
            meta,
            filePath: relativePath,
          });
        }
      } catch (err) {
        console.error(`Error reading metadata from ${filePath}:`, err);
        continue;
      }
    }

    posts.sort(
      (a, b) =>
        new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime(),
    );

    return posts;
  },
);

// Helper: Get posts by year
export async function getBlogPostsByYear(year: string): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter((post) => post.meta.date.startsWith(year));
}

// Helper: Get posts by year and month
export async function getBlogPostsByYearMonth(
  year: string,
  month: string,
): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  const yearMonth = `${year}-${month.padStart(2, '0')}`;
  return allPosts.filter((post) => post.meta.date.startsWith(yearMonth));
}
