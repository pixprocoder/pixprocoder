import {
  useEditor,
  EditorContent,
  FloatingMenu as TiptapFloatingMenu,
  BubbleMenu as TiptapBubbleMenu,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import DOMPurify from 'dompurify';
import { all, createLowlight } from 'lowlight';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useCallback, useEffect, useState } from 'react';
import { FiImage, FiCode, FiLink, FiType } from 'react-icons/fi';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';

// extensions tip tap
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { Youtube } from '@tiptap/extension-youtube';
import { CharacterCount } from '@tiptap/extension-character-count';
import { Typography } from '@tiptap/extension-typography';

// Highlight.js languages
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';

const lowlight = createLowlight(all);
lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('js', js);
lowlight.register('ts', ts);

const RichTextEditor = ({
  onChange,
  className,
  initialContent = '',
}: {
  onChange: (content: string) => void;
  className?: string;
  initialContent?: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        codeBlock: false,
      }),
      Placeholder.configure({
        placeholder: 'Start writing your post... (Press / for commands)',
      }),
      Image.extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            alt: { default: null },
            title: { default: null },
            class: { default: 'rounded-lg mx-auto my-4' },
          };
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary hover:underline',
          rel: 'noopener noreferrer',
        },
      }),
      Underline,
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'bg-muted p-4 rounded-lg font-mono text-sm',
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      Youtube.configure({
        inline: false,
      }),
      CharacterCount,
      Typography,
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: `prose dark:prose-invert max-w-none focus:outline-none ${className}`,
      },
      transformPastedHTML(html) {
        return DOMPurify.sanitize(html, {
          ALLOWED_TAGS: [
            'p',
            'br',
            'h2',
            'h3',
            'strong',
            'em',
            'ul',
            'ol',
            'li',
            'a',
            'img',
            'pre',
            'code',
          ],
          ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'target'],
        });
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
      setWordCount(editor.storage.characterCount?.words());
    },
  });

  const addImage = useCallback(
    (url: string) => {
      if (!editor) return;
      editor.chain().focus().setImage({ src: url }).run();
    },
    [editor],
  );

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const { url } = await response.json();
      addImage(url);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted || !editor) {
    return <div className="p-4 bg-muted/50 rounded-lg">Loading editor...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <FiType className="mr-2" /> Format
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onSelect={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
              >
                Heading 2
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
              >
                Heading 3
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => editor.chain().focus().toggleBulletList().run()}
              >
                Bullet List
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() =>
                  editor.chain().focus().toggleOrderedList().run()
                }
              >
                Numbered List
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Input
            type="file"
            accept="image/*"
            className="hidden"
            id="image-upload"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleImageUpload(e.target.files[0]);
              }
            }}
          />
          <Button variant="outline" size="sm" asChild>
            <label htmlFor="image-upload">
              <FiImage className="mr-2" />
              {isUploading ? 'Uploading...' : 'Upload Image'}
            </label>
          </Button>
        </div>

        <Badge variant="outline">{wordCount} words</Badge>
      </div>

      <div className="border rounded-lg p-4 bg-background">
        <TiptapFloatingMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="flex gap-1 p-1 bg-background border rounded-lg shadow-lg"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            H2
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            H3
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            List
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const url = window.prompt('Enter image URL');
              if (url) editor.chain().focus().setImage({ src: url }).run();
            }}
          >
            <FiImage className="w-4 h-4" />
          </Button>
        </TiptapFloatingMenu>

        <TiptapBubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="flex gap-1 p-1 bg-background border rounded-lg shadow-lg"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            Bold
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            Italic
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleCode().run()}
          >
            Code
          </Button>
        </TiptapBubbleMenu>

        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
