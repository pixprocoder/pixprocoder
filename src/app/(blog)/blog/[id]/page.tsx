"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { useGetSinglePostQuery } from "@/src/redux/api/posts/PostApiSlice";
import { format } from "date-fns";
import CommentBox from "../../_components/CommentBox";
import { useGetCommentQuery } from "@/src/redux/api/posts/PostApiSlice";

const SingleBlogPage = ({ params }: any) => {
  const { data: post } = useGetSinglePostQuery(params.id);
  const { data: comments } = useGetCommentQuery(params.id);
  console.log("comments", comments);

  //todo: format data with date fns
  const formatDateString = (dateString: any) => {
    const date = new Date(dateString);
    const formattedDate = format(date, "yy/MM/dd");
    const formattedTime = format(date, "H:mm:ss");
    return { formattedDate, formattedTime };
  };

  const { formattedDate, formattedTime } = post?.data?.createdAt
    ? formatDateString(post?.data?.createdAt)
    : { formattedDate: "", formattedTime: "" };

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
            <p className="text-white flex gap-2">
              {formattedDate}
              <small>{formattedTime}</small>
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
        <div className="mt-4">
          <h1 className="text-lg text-gray-300">Leave A Comment</h1>
          <CommentBox id={params.id} />
        </div>
        {/* Show comments */}
        <div className="flex flex-col gap-2">
          {comments?.data?.map((comment) => (
            <div className="bg-gray-800 rounded-lg flex flex-col p-2 gap-4">
              <div className="flex gap-2 items-center">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={post?.data?.image} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-sm">{comment?.author}</p>
              </div>
              <p className="text-xs ">{comment?.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SingleBlogPage;
