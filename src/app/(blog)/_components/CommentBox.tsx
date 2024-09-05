import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import React from "react";

function CommentBox() {
  return (
    <div className="mb-2">
      <Textarea
        className="text-gray-600 mb-2 bg-gray-900"
        placeholder="Write Your Thought"
      />
      <Button>Post</Button>
    </div>
  );
}

export default CommentBox;
