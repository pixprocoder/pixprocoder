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
            font-size: 0.875rem; /* 14px */
            line-height: 1.7; /* Better readability */
            margin-bottom: 0.75rem;
          }
          .blog-content :where(h1, h2, h3, h4, h5, h6) {
            margin-top: 1.5rem;
            margin-bottom: 1rem;
          }
          .blog-content :where(ul, ol) {
            margin-bottom: 1rem;
          }
          .blog-content :where(pre, code) {
            font-size: 0.75rem; /* 12px for code blocks */
          }
          .blog-content pre {
            padding: 0.75rem;
            border-radius: 0.5rem;
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
