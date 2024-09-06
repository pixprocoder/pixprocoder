"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { AuthContext } from "@/src/providers/AuthProviders";
import {
  useGetCommentQuery,
  useGetSinglePostQuery,
} from "@/src/redux/api/posts/PostApiSlice";
import { formatDateToUTC, formatTimeToUTC } from "@/src/utils/FormatDate";
import { useContext } from "react";
import CommentBox from "../../_components/CommentBox";

const SingleBlogPage = ({ params }: any) => {
  const { user } = useContext(AuthContext);
  const { data: post } = useGetSinglePostQuery(params.id);
  const { data: comments } = useGetCommentQuery(params.id);
  console.log(post);

  return (
    <section className="container mx-auto">
      <div className="w-full lg:w-2/4 mx-auto">
        <h1 className="text-left lg:text-center text-3xl lg:text-5xl font-bold  my-6">
          {post?.data?.title}
        </h1>
        {/* Avatar */}
        <div className="flex gap-3 items-center mb-4">
          <Avatar>
            <AvatarImage src={post?.data?.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex  gap-2">
            <p className="text-white font-bold text-base">Kobir</p>
            <p className="text-gray-300 text-sm flex gap-2 items-center">
              {post?.data?.createdAt && formatDateToUTC(post?.data?.createdAt)}{" "}
              <small className="text-xs">at</small>
              <small>
                {post?.data?.createdAt &&
                  formatTimeToUTC(post?.data?.createdAt)}
              </small>
            </p>
          </div>
        </div>

        <div className="">
          <img
            className="w-full rounded-lg"
            width={500}
            height={500}
            src={post?.data?.image}
            alt="img"
          />
        </div>

        {/* Content */}
        <div className="mt-4">
          <p className="text-gray-400 font-light">{post?.data?.content}</p>
        </div>
        <hr className=" my-2" />
        <div className="mt-4 bg-gray-700 rounded-lg p-4">
          <h1 className="text-lg text-gray-100 ">Leave A Comment</h1>
          <CommentBox id={params.id} />
        </div>
        {/* Show comments */}
        <p className="text-sm mt-4">
          <span>{comments?.data?.length > 1 ? "Comments" : "Comment"}</span>: (
          {comments?.data?.length ? comments?.data?.length : "No Comment Found"}
          ){" "}
        </p>
        <hr className="mb-4" />
        <div className="flex flex-col gap-2">
          {comments?.data?.map((comment: any) => (
            <div
              key={comment.postId}
              className="bg-gray-800 rounded-lg flex flex-col p-2 gap-4"
            >
              <div className="flex gap-2 items-center">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={user?.photoURL} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-sm">{comment?.author}</p>
                  <small className="text-gray-400 text-xs flex gap-2">
                    {formatDateToUTC(comment?.createdAt)}
                  </small>
                </div>
              </div>
              <p className="text-xs ml-6 border-l-2 border-gray-600  px-2 ">
                {comment?.content}
              </p>
              <div className="ml-8">
                <Button className="  w-12 h-8 text-xs   bg-gradient-to-r from-blue-500 to-purple-500  hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 transition duration-300">
                  Reply
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SingleBlogPage;
