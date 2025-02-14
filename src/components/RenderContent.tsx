// components/RenderContent.tsx
import * as DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi'; // Install react-icons

import Image from 'next/image';

export default function RenderContent({ content }: { content: string }) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // 1. Sanitize HTML
  const sanitizedHTML = DOMPurify.default.sanitize(content, {
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: [
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
    ],
  });

  // 2. Parse and replace elements
  const options = {
    replace: (domNode: any) => {
      if (domNode.name === 'img') {
        const { src, alt } = domNode.attribs;
        return (
          <Image
            src={src}
            alt={alt || 'Post image'}
            width={800}
            height={500}
            className="rounded-lg my-6 mx-auto"
            priority
          />
        );
      }

      if (domNode.name === 'pre') {
        const codeContent = domNode.children[0]?.children[0]?.data || '';
        const language =
          domNode.children[0]?.attribs.class?.replace('language-', '') || '';

        return (
          <div className="relative group">
            <button
              onClick={() => handleCopy(codeContent)}
              className="absolute right-2 top-2 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors tooltip"
              data-tip={copiedCode === codeContent ? 'Copied!' : 'Copy code'}
              aria-label="Copy code"
            >
              {copiedCode === codeContent ? (
                <FiCheck className="text-green-400 w-5 h-5" />
              ) : (
                <FiCopy className="text-gray-300 w-5 h-5" />
              )}
            </button>

            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus}
              className="rounded-lg my-6 text-sm"
              PreTag="div"
              showLineNumbers
            >
              {codeContent}
            </SyntaxHighlighter>
          </div>
        );
      }
    },
  };

  // 3. Render with proper styling
  return (
    <div className="prose dark:prose-invert max-w-none">
      {parse(sanitizedHTML, options)}
    </div>
  );
}
