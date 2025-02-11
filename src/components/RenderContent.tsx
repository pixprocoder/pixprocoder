// components/RenderContent.tsx
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Image from 'next/image';

export default function RenderContent({ content }: { content: string }) {
  // 1. Sanitize HTML
  const sanitizedHTML = DOMPurify.sanitize(content, {
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
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            className="rounded-lg my-6 text-sm"
            PreTag="div"
          >
            {codeContent}
          </SyntaxHighlighter>
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
