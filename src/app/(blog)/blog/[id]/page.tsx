"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { format } from "date-fns";
import { getBaseURL } from "@/src/utils";
import CommentBox from "../../_components/CommentBox";

const SingleBlogPage = ({ params }: any) => {
  const [post, setPost] = useState({});

  useEffect(() => {
    axios(`${getBaseURL()}/posts`).then((res) => {
      const postData = res.data?.data.filter((d: any) => d.id === params.id);
      setPost(postData[0]);
    });
  }, []);

  const formatDateString = (dateString: any) => {
    const date = new Date(dateString);
    const formattedDate = format(date, "yy/MM/dd");
    const formattedTime = format(date, "H:mm:ss");
    return { formattedDate, formattedTime };
  };

  const { formattedDate, formattedTime } = post.createdAt
    ? formatDateString(post.createdAt)
    : { formattedDate: "", formattedTime: "" };

  return (
    <section className="container mx-auto">
      <div className="w-full lg:w-2/4 mx-auto">
        <h1 className="text-left lg:text-center text-3xl lg:text-5xl font-bold  my-6">
          {post?.title}
        </h1>
        {/* Avatar */}
        <div className="flex gap-3 items-center mb-4">
          <Avatar>
            <AvatarImage src={post.image} />
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
            src={post.image}
            alt="img"
          />
        </div>

        {/* Content */}
        <div className="mt-4">
          <p className="text-gray-400 font-light">{post.content}</p>
        </div>
        <hr className=" my-2" />
        <div className="mt-4">
          <h1>Write Comment</h1>
          <CommentBox />
        </div>
      </div>
    </section>
  );
};

export default SingleBlogPage;
