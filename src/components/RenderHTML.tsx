// components/RenderHTML.tsx
import DOMPurify from 'dompurify';

export default function RenderHTML({ content }: { content: string }) {
  const sanitizedHTML = DOMPurify.sanitize(content);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
}
