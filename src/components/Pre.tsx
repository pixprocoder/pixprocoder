'use client';
import React from 'react';
import { CopyButton } from './CopyButton';

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactNode;
}

export function Pre({ children, ...props }: PreProps) {
  const ref = React.useRef<HTMLPreElement>(null);
  const codeElement = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === 'code',
  ) as
    | React.ReactElement<{ children: React.ReactNode; className?: string }>
    | undefined;

  const languageMatch = codeElement?.props.className?.match(/language-(\w+)/);
  const language = languageMatch ? languageMatch[1] : 'text';
  const displayLanguage = language === 'mdx' ? 'jsx' : language;

  const codeContent =
    typeof codeElement?.props.children === 'string'
      ? codeElement.props.children
      : Array.isArray(codeElement?.props.children)
        ? codeElement.props.children?.join('')
        : String(codeElement?.props.children || '');

  return (
<div className="relative group my-6 rounded-lg overflow-hidden">
        <div className="absolute right-4 top-4 flex gap-2 z-10">
          <span className="text-xs font-mono px-2 py-1 rounded bg-gray-800/80 text-gray-200">
            {displayLanguage}
          </span>
          <div className="opacity-80 group-hover:opacity-100 transition-opacity">
            <CopyButton value={codeContent || ''} />
          </div>
        </div>

        <pre
          {...props}
          ref={ref}
          className="bg-gray-900 text-gray-50 rounded-lg p-0 my-0 overflow-x-auto text-sm border border-gray-700"
        >
          <code className={codeElement?.props.className}>{children}</code>
        </pre>
      </div>
  );
}
