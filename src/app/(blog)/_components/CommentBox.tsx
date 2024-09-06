"use client";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import { useToast } from "@/src/components/ui/use-toast";
import { AuthContext } from "@/src/providers/AuthProviders";
import { useRouter } from "next/navigation";
import React, { useContext, useRef, useState } from "react";

function CommentBox() {
  const { user } = useContext(AuthContext);
  console.log(user);
  // const router = useRouter();
  const [comment, setComment] = useState("");
  const { toast } = useToast();

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
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-2">
      <Textarea
        onChange={(e: any) => setComment(e.target.value)}
        value={comment}
        className="text-gray-600 mb-2 bg-gray-900"
        placeholder="Write Your Thought"
      />
      <Button type="submit">Post</Button>
    </form>
  );
}

export default CommentBox;
