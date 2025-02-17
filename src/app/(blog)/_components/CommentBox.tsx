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

  const [postComment, { isSuccess, isError }] = usePostCommentMutation();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!user?.email) {
      toast({
        description: 'You Must Need To Login!',
        className: `toast-error`, // Apply the custom class
      });

      setComment('');
      return;
    }
    if (comment === '') {
      toast({
        description: 'This field is cannot be Empty ∅',
        className: `toast-error`, // Apply the custom class
      });
      return;
    }

    const postId = id;
    const options = {
      postId,
      author: user?.email,
      content: comment,
    };

    postComment({ id: postId, data: options });
    setTimeout(() => {
      toast({
        title: 'Congratulations 🎉',
        description: 'Post Added Successfully 🚀',
        className: `toast-success`, // Apply the custom class
      });
    }, 1000);

    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-2">
      <Textarea
        onChange={(e: any) => setComment(e.target.value)}
        value={comment}
        className="text-white mb-2 bg-gray-900"
        placeholder="Write Your Thought"
      />
      <div className="flex justify-start">
        <Button
          className="bg-gradient-to-r from-blue-500 to-purple-500  hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 transition duration-300"
          type="submit"
        >
          Post Comment
        </Button>
      </div>
    </form>
  );
}

export default CommentBox;
