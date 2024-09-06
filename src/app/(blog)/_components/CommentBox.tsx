"use client";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import { useToast } from "@/src/components/ui/use-toast";
import { AuthContext } from "@/src/providers/AuthProviders";
import { usePostCommentMutation } from "@/src/redux/api/comment/CommentApiSlice";
import { useRouter } from "next/navigation";
import React, { useContext, useRef, useState } from "react";

function CommentBox({ id }: { id: string }) {
  const { user } = useContext(AuthContext);
  const { toast } = useToast();
  const [comment, setComment] = useState("");

  const [postComment] = usePostCommentMutation();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!user?.email) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "You Must Need To Login!",
      });
      return;
    }
    if (comment === "") {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "You Must Write Something :(",
      });
      return;
    }

    const postId = id;
    const options = {
      postId,
      author: user?.displayName || user?.email,
      content: comment,
    };

    postComment({ id: postId, data: options });

    setComment("");
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
