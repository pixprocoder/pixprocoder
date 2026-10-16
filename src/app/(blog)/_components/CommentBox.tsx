'use client';

import { Button } from '@/src/components/ui/button';
import { Textarea } from '@/src/components/ui/textarea';
import { loginHref } from '@/src/lib/auth-redirect';
import { usePostComment } from '@/src/hooks/api/use-posts';
import { AuthContext } from '@/src/providers/AuthProviders';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { toast } from 'sonner';

function CommentBox({ id }: { id: string }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [comment, setComment] = useState('');
  const { mutateAsync: postComment, isPending: isLoading } = usePostComment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email) {
      toast.info('Log in required', {
        description: 'You need to be signed in to comment.',
        action: {
          label: 'Sign in',
          onClick: () => router.push(loginHref(`/blog/${id}`)),
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
        slug: id,
        data: {
          content: comment.trim(),
          authorId: user?.uid,
        },
      });
      toast.success('Posted', {
        description: 'Your comment is live.',
      });
      setComment('');
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
        className="min-h-28 rounded-xl border-border bg-background text-sm text-foreground"
        placeholder={
          user ? 'Write a comment…' : 'Log in to join the conversation'
        }
      />
      <div className="flex justify-end">
        <Button className="rounded-xl" type="submit" disabled={isLoading}>
          {isLoading ? 'Posting…' : 'Post comment'}
        </Button>
      </div>
    </form>
  );
}

export default CommentBox;
