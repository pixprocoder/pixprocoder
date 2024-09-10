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
  useGetPostLikeQuery,
  useGetSinglePostQuery,
  usePostLikeMutation,
} from "@/src/redux/api/posts/PostApiSlice";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

import { formatDateToUTC, formatTimeToUTC } from "@/src/utils/FormatDate";
import { useContext, useEffect, useState } from "react";
import CommentBox from "../../_components/CommentBox";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks/hooks";
import { toggleLike, setLike } from "@/src/redux/features/post/LikeSlice";
import { useToast } from "@/src/components/ui/use-toast";
import LoadingPage from "../../loading";

const SingleBlogPage = ({ params }: any) => {
  const dispatch = useAppDispatch();
  const { user } = useContext(AuthContext);
  const { toast } = useToast();
  const { isLiked } = useAppSelector((state) => state.like);
  const { data: post } = useGetSinglePostQuery(params.id);
  const { data: comments } = useGetCommentQuery(params.id);
  const { data: totalLikeCount } = useGetPostLikeQuery(params.id);
  const [postLike, { isLoading, isSuccess }] = usePostLikeMutation({});

  // Handling Like
  const handleLike = async () => {
    try {
      if (user?.uid) {
        const result = await postLike({
          id: params.id,
          data: { liked: !isLiked, userId: user.uid },
        });

        const updatedLike = result?.data?.data?.data?.isLiked;
        if (updatedLike !== undefined) {
          dispatch(setLike(updatedLike));
        } else {
          dispatch(toggleLike(params.id));
        }
      } else {
        toast({
          variant: "outline",
          description: "Please Login First",
        });
        return;
      }
    } catch (error) {
      console.error("Error updating like status", error);
    }
  };

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

        {/* like feature */}
        <div className="flex items-center gap-3 justify-center mt-2">
          <Button onClick={handleLike}>
            {isLiked ? (
              <>
                <motion.div
                  className="flex gap-2 items-center"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }} // Pulse effect
                  transition={{ duration: 0.3 }}
                >
                  <FaHeart className="text-red-500" />
                  <span>Liked</span>
                </motion.div>
              </>
            ) : (
              <motion.div
                className="flex gap-2 items-center "
                initial={{ scale: 1 }}
                animate={{ scale: [1.2, 1] }} // Shrink effect when unliked
                transition={{ duration: 0.3 }}
              >
                <FaRegHeart />
                <span>Like</span>
              </motion.div>
            )}
          </Button>
          {isLoading ? (
            "...."
          ) : (
            <p>
              {totalLikeCount?.data?.likes}{" "}
              <span>{totalLikeCount?.data?.likes <= 1 ? "Like" : "Likes"}</span>
            </p>
          )}
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
              key={comment._id}
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
