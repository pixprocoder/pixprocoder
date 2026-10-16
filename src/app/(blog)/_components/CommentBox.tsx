'use client';

import { Button } from '@/src/components/ui/button';
import { Textarea } from '@/src/components/ui/textarea';
import { usePostComment } from '@/src/hooks/api/use-posts';
import { loginHref } from '@/src/lib/auth-redirect';
import { mentionPrefix } from '@/src/lib/comment-limits';
import { AuthContext } from '@/src/providers/AuthProviders';
import { useRouter } from 'next/navigation';
import { useContext, useLayoutEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

type CommentBoxProps = {
  slug: string;
  parentId?: string | null;
  placeholder?: string;
  mention?: string | null;
  compact?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  disabledReason?: string;
  onCancel?: () => void;
  onPosted?: () => void;
};

function CommentBox({
  slug,
  parentId,
  placeholder,
  mention,
  compact,
  autoFocus,
  disabled,
  disabledReason,
  onCancel,
  onPosted,
}: CommentBoxProps) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const initial = mention ? mentionPrefix(mention) : '';
  const [comment, setComment] = useState(initial);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { mutateAsync: postComment, isPending: isLoading } = usePostComment();

  useLayoutEffect(() => {
    if (!autoFocus) return;
    const el = textareaRef.current;
    if (!el) return;
    el.focus();
    const end = el.value.length;
    el.setSelectionRange(end, end);
  }, [autoFocus, mention]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) {
      toast.warning(disabledReason || 'This thread is full');
      return;
    }
    if (!user?.email) {
      toast.info('Log in required', {
        description: 'You need to be signed in to comment.',
        action: {
          label: 'Sign in',
          onClick: () => router.push(loginHref(`/blog/${slug}`)),
        },
      });
      return;
    }
    if (comment.trim() === '') {
      toast.warning('Comment is empty', {
        description: 'Write something before posting.',
      });
      return;
    }

    try {
      await postComment({
        slug,
        data: {
          content: comment.trim(),
          authorId: user.uid,
          parentId: parentId ?? null,
        },
      });
      toast.success(parentId ? 'Reply posted' : 'Posted', {
        description: parentId ? 'Added to the thread.' : 'Your comment is live.',
      });
      setComment(mention ? mentionPrefix(mention) : '');
      onPosted?.();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Could not add that comment.';
      toast.error('Could not post', { description: message });
    }
  };

  if (disabled) {
    return (
      <p className="rounded-xl border border-border px-3 py-3 text-sm text-muted-foreground">
        {disabledReason || 'This thread has reached 10 replies.'}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        ref={textareaRef}
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        className={`rounded-xl border-border bg-background text-sm text-foreground ${
          compact ? 'min-h-20' : 'min-h-28'
        }`}
        placeholder={
          placeholder ||
          (user ? 'Write a comment…' : 'Log in to join the conversation')
        }
      />
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            className="rounded-xl"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        <Button className="rounded-xl" type="submit" disabled={isLoading}>
          {isLoading ? 'Posting…' : parentId ? 'Reply' : 'Post comment'}
        </Button>
      </div>
    </form>
  );
}

export default CommentBox;
