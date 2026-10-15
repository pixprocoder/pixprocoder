'use client';

import { Button } from '@/src/components/ui/button';
import { Textarea } from '@/src/components/ui/textarea';
import { useToast } from '@/src/components/ui/use-toast';
import { usePostComment } from '@/src/hooks/api/use-posts';
import { AuthContext } from '@/src/providers/AuthProviders';
import { useContext, useState } from 'react';

function CommentBox({ id }: { id: string }) {
  const { user } = useContext(AuthContext);
  const { toast } = useToast();
  const [comment, setComment] = useState('');
  const { mutateAsync: postComment, isPending: isLoading } = usePostComment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email) {
      toast({
        title: 'Log in required',
        description: 'You need to be signed in to comment.',
      });
      return;
    }
    if (comment.trim() === '') {
      toast({
        title: 'Comment is empty',
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
      toast({
        title: 'Posted',
        description: 'Your comment is live.',
      });
      setComment('');
    } catch {
      toast({
        title: 'Error',
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
