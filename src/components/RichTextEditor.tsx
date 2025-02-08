import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

const RichTextEditor = ({
  onChange,
  className,
}: {
  onChange: (content: string) => void;
  className?: string;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing your post...',
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: `prose dark:prose-invert max-w-none focus:outline-none ${className}`,
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
