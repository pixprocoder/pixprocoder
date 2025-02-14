// components/RichTextEditor.tsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight/lib/core';
import DOMPurify from 'dompurify';
import { all, createLowlight } from 'lowlight';
const lowlight = createLowlight(all);
// Correct language imports
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';

// Register languages
lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('js', js);
lowlight.register('ts', ts);

const RichTextEditor = ({
  onChange,
  className,
}: {
  onChange: (content: string) => void;
  className?: string;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      Placeholder.configure({
        placeholder: 'Start writing your post...',
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg mx-auto my-4',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'bg-gray-800 text-gray-100 p-4 rounded-lg',
        },
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: `prose dark:prose-invert max-w-none focus:outline-none ${className}`,
      },
      transformPastedHTML(html) {
        return DOMPurify.sanitize(html);
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="text-white">
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
