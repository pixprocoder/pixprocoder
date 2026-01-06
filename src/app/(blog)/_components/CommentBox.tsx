'use client';
import { Button } from '@/src/components/ui/button';
import { Textarea } from '@/src/components/ui/textarea';
import { useToast } from '@/src/components/ui/use-toast';
import { AuthContext } from '@/src/providers/AuthProviders';
import { usePostCommentMutation } from '@/src/redux/api/posts/PostApiSlice';
import { useContext, useState } from 'react';

function CommentBox({ id }: { id: string }) {
  const { user } = useContext(AuthContext);
  const { toast } = useToast();
  const [comment, setComment] = useState('');

  const [postComment, { isSuccess, isError, isLoading }] =
    usePostCommentMutation();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!user?.email) {
      toast({
        title: 'Login Require',
        description: 'You Must Need To Login!',
        className: `toast-warning`,
      });

      setComment('');
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

    postComment({
      slug: id,
      data: {
        content: comment,
        authorId: user?.uid,
      },
    });
    if (isSuccess) {
      toast({
        title: 'Success 🎉',
        description: 'Post Added Successfully 🚀',
        className: `toast-success`,
      });
      setComment('');
    }

    if (isError) {
      toast({
        title: 'Error ',
        description: 'Failed to add comment',
        className: `toast-error`,
      });
      setComment('');
    }
    setComment('');
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
