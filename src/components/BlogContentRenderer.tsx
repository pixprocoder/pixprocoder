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
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <Component components={MDXComponents} />
      </div>
    );
  } catch (error) {
    console.error('Error rendering MDX content:', error);
    return (
      <div className="text-red-500">Error: {(error as Error).message}</div>
    );
  }
}
