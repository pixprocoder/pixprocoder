'use client';
import { getMDXComponent } from 'mdx-bundler/client';
import { Pre } from './Pre';

interface BlogContentRendererProps {
  code: string;
}

// Define components for MDX content
const MDXComponents = {
  pre: Pre,
  // Add more components as needed
};

export function BlogContentRenderer({ code }: BlogContentRendererProps) {
  if (!code) {
    return <div>No content to render</div>;
  }

  try {
    // Use the getMDXComponent function from mdx-bundler/client to properly
    // handle the JSX runtime and other dependencies that MDX needs
    const Component = getMDXComponent(code);

    return (
      <>
        <div className="blog-content prose dark:prose-invert max-w-none">
          <Component components={MDXComponents} />
        </div>
        <style jsx global>{`
          .blog-content :where(p, li) {
            font-size: 1.0625rem;
            line-height: 1.8;
            margin-bottom: 1.15rem;
          }
          .blog-content :where(h1, h2, h3, h4, h5, h6) {
            letter-spacing: -0.025em;
            margin-top: 2rem;
            margin-bottom: 0.85rem;
          }
          .blog-content :where(ul, ol) {
            margin-bottom: 1.25rem;
          }
          .blog-content :where(pre, code) {
            font-size: 0.875rem;
          }
          .blog-content pre {
            border: 1px solid var(--border);
            border-radius: 0.75rem;
            padding: 1rem;
          }
        `}</style>
      </>
    );
  } catch (error) {
    console.error('Error rendering MDX content:', error);
    return (
      <div className="text-red-500">Error: {(error as Error).message}</div>
    );
  }
}
