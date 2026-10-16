'use client';

import { Button } from '@/src/components/ui/button';
import { Textarea } from '@/src/components/ui/textarea';
import { usePostComment } from '@/src/hooks/api/use-posts';
import { loginHref } from '@/src/lib/auth-redirect';
import { AuthContext } from '@/src/providers/AuthProviders';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { toast } from 'sonner';

type CommentBoxProps = {
  slug: string;
  parentId?: string | null;
  placeholder?: string;
  mention?: string | null;
  compact?: boolean;
  autoFocus?: boolean;
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
  onCancel,
  onPosted,
}: CommentBoxProps) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [comment, setComment] = useState(mention ? `@${mention} ` : '');
  const { mutateAsync: postComment, isPending: isLoading } = usePostComment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      setComment('');
      onPosted?.();
    } catch {
      toast.error('Could not post', {
        description: 'Could not add that comment.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        autoFocus={autoFocus}
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
