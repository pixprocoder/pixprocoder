'use client';
import { useTheme } from 'next-themes';
import React from 'react';
import { CopyButton } from './CopyButton';

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactNode;
}

export function Pre({ children, ...props }: PreProps) {
  const { theme } = useTheme();
  const ref = React.useRef<HTMLPreElement>(null);
  const codeElement = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === 'code',
  ) as
    | React.ReactElement<{ children: React.ReactNode; className?: string }>
    | undefined;

  // Extract language from className (e.g., className="language-javascript")
  const languageMatch = codeElement?.props.className?.match(/language-(\w+)/);
  const language = languageMatch ? languageMatch[1] : 'text';

  // Default to a more generic language if 'mdx' was specified
  const displayLanguage = language === 'mdx' ? 'jsx' : language;

  const codeContent =
    typeof codeElement?.props.children === 'string'
      ? codeElement.props.children
      : Array.isArray(codeElement?.props.children)
        ? codeElement.props.children?.join('')
        : String(codeElement?.props.children || '');

  // Set background and text colors based on theme
  const bgClass = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const textClass = theme === 'dark' ? 'text-gray-50' : 'text-gray-800';
  const borderClass = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const langBgClass = theme === 'dark' ? 'bg-gray-800/80' : 'bg-gray-200/80';
  const langTextClass = theme === 'dark' ? 'text-gray-200' : 'text-gray-700';

  return (
    <div className="relative group my-6 rounded-lg overflow-hidden">
      <div className="absolute right-4 top-4 flex gap-2 z-10">
        <span
          className={`text-xs font-mono px-2 py-1 rounded ${langBgClass} ${langTextClass}`}
        >
          {displayLanguage}
        </span>
        <div className=" opacity-80 group-hover:opacity-100 transition-opacity">
          <CopyButton value={codeContent || ''} />
        </div>
      </div>

      <pre
        {...props}
        ref={ref}
        className={`${bgClass} ${textClass} rounded-lg p-0 my-0 overflow-x-auto text-sm border ${borderClass}`}
      >
        <code className={codeElement?.props.className}>{children}</code>
      </pre>
    </div>
  );
}
