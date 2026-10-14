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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!user?.email) {
      toast({
        title: 'Login Require',
        description: 'You Must Need To Login!',
        className: `toast-warning`,
      });
      return;
    }
    if (comment === '') {
      toast({
        title: 'Required!',
        description: 'This field cannot be Empty',
        className: `toast-error`,
      });
      return;
    }

    try {
      await postComment({
        slug: id,
        data: {
          content: comment,
          authorId: user?.uid,
        },
      });
      toast({
        title: 'Success 🎉',
        description: 'Post Added Successfully 🚀',
        className: `toast-success`,
      });
      setComment('');
    } catch {
      toast({
        title: 'Error ',
        description: 'Failed to add comment',
        className: `toast-error`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-2">
      <Textarea
        onChange={(e: any) => setComment(e.target.value)}
        value={comment}
        className="text-foreground mb-2 bg-background"
        placeholder="Write Your Thought"
      />
      <div className="flex justify-start">
        <Button className="primary-btn" type="submit">
          {isLoading ? 'adding comment...' : 'Post Comment'}
        </Button>
      </div>
    </form>
  );
}

export default CommentBox;
