'use client';
import type { Element } from 'domhandler/lib/node';
import DOMPurify from 'dompurify';
import parse, { HTMLReactParserOptions, domToReact } from 'html-react-parser';
import dynamic from 'next/dynamic';
import React, { useMemo, useState } from 'react';
import { FiAlertTriangle, FiCheck, FiCopy } from 'react-icons/fi';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';

// Lazy load syntax highlighter for better performance
const SyntaxHighlighter = dynamic(
  () => import('react-syntax-highlighter').then((mod) => mod.Prism),
  {
    ssr: false,
    loading: () => (
      <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg my-6 text-sm">
        <code>Loading code...</code>
      </pre>
    ),
  },
);

// Custom error boundary component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg my-6">
          <FiAlertTriangle className="inline mr-2" />
          Error rendering content
        </div>
      );
    }
    return this.props.children;
  }
}

interface RenderContentProps {
  content: string;
}

export default function RenderContent({ content }: RenderContentProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleImageError = (src: string) => {
    setImageErrors((prev) => new Set(prev.add(src)));
  };

  const sanitizedHTML = useMemo(() => {
    return DOMPurify.sanitize(content, {
      USE_PROFILES: { html: true },
      ALLOWED_TAGS: [
        'h1',
        'h2',
        'h3',
        'h4',
        'p',
        'strong',
        'em',
        'ul',
        'ol',
        'li',
        'a',
        'img',
        'pre',
        'code',
        'blockquote',
        'table',
        'thead',
        'tbody',
        'tr',
        'th',
        'td',
      ],
      ALLOWED_ATTR: ['src', 'alt', 'href', 'title', 'class', 'id'],
      FORBID_ATTR: ['style', 'onclick'],
    });
  }, [content]);

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode.type === 'tag' && (domNode as Element).name === 'img') {
        const { src, alt } = (domNode as Element).attribs;
        if (imageErrors.has(src)) return null;

        return (
          <div className="my-6 mx-auto relative aspect-video w-full max-w-3xl">
            <img
              src={src}
              alt={alt || 'Post image'}
              className="rounded-lg object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              onError={() => handleImageError(src)}
            />
          </div>
        );
      }

      if (domNode.type === 'tag' && (domNode as Element).name === 'pre') {
        const codeElement = (domNode as Element).children.find(
          (child) => child.type === 'tag' && child.name === 'code',
        ) as Element | undefined;

        const codeContent = codeElement?.children[0]?.data || '';
        const languageMatch =
          codeElement?.attribs.class?.match(/language-(\w+)/);
        const language = languageMatch ? languageMatch[1] : 'text';

        return (
          <div className="relative group my-6">
            <div className="absolute right-4 top-4 flex gap-2">
              <span className="text-sm text-gray-300 font-mono">
                {language}
              </span>
              <button
                onClick={() => handleCopy(codeContent)}
                className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/80 transition-colors"
                aria-label={
                  copiedCode === codeContent ? 'Copied!' : 'Copy code'
                }
              >
                {copiedCode === codeContent ? (
                  <FiCheck className="text-green-400 w-5 h-5" />
                ) : (
                  <FiCopy className="text-gray-300 w-5 h-5" />
                )}
              </button>
            </div>

            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus}
              className="rounded-lg text-sm"
              PreTag="div"
              showLineNumbers
              wrapLines
            >
              {codeContent}
            </SyntaxHighlighter>
          </div>
        );
      }

      // Add table styling
      if (domNode.type === 'tag' && (domNode as Element).name === 'table') {
        return (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border-collapse">
              {domToReact(domNode.children, options)}
            </table>
          </div>
        );
      }

      // Add blockquote styling
      if (
        domNode.type === 'tag' &&
        (domNode as Element).name === 'blockquote'
      ) {
        return (
          <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-gray-600 dark:text-gray-300">
            {domToReact(domNode.children, options)}
          </blockquote>
        );
      }
    },
  };

  return (
    <ErrorBoundary>
      <div className="prose dark:prose-invert max-w-none">
        {parse(sanitizedHTML, options)}

        {/* Add custom styles */}
        <style jsx global>{`
          .prose table {
            border-collapse: collapse;
            width: 100%;
          }

          .prose th,
          .prose td {
            border: 1px solid #e5e7eb;
            padding: 0.75rem;
            text-align: left;
          }

          .prose th {
            background-color: #f3f4f6;
            font-weight: 600;
          }

          .dark .prose th {
            background-color: #374151;
          }

          .prose a {
            text-decoration: none;
            font-weight: 500;
            color: #3b82f6;
          }

          .prose a:hover {
            text-decoration: underline;
          }
        `}</style>
      </div>
    </ErrorBoundary>
  );
}
