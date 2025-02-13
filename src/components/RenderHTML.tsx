// components/RenderHTML.tsx
import DOMPurify from 'dompurify';
const options = {
  replace: (domNode) => {
    // ... existing replacements

    if (domNode.name === 'div' && domNode.attribs.class?.includes('alert')) {
      return (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 my-4">
          {domNode.children[0]?.data}
        </div>
      );
    }
  },
};

export default function RenderHTML({ content }: { content: string }) {
  const sanitizedHTML = DOMPurify.sanitize(content);
  return (
    <div className="prose dark:prose-invert max-w-none">
      {parse(sanitizedHTML, options)}
    </div>
  );
}
