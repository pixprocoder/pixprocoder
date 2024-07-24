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

const SingleBlogPage = ({ params }: any) => {
  const [post, setPost] = useState({});
  console.log(post);

  useEffect(() => {
    axios("https://pixprocoder-backend.vercel.app/api/v1/posts").then((res) => {
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
          <Image
            className="w-full rounded-lg"
            width={500}
            height={500}
            src={post.image}
            alt="img"
          />
        </div>

        {/* Content */}
        <div className="mt-4">
          <p className="text-gray-400 font-light">
            {post.content}
            As of my last knowledge update in September 2021, Figma's keyboard
            shortcuts can change with updates to the software. However, as of
            that time, there wasn't a default keyboard shortcut to specifically
            show or hide the grid in Figma. To manipulate the grid visibility,
            you might need to use the menus or manually set the grid properties
            in the right sidebar. Here's how you can do it without a keyboard
            shortcut: Show Grid: Go to the "View" menu at the top. Hover over
            "Layout Grids". Click on the type of grid you want to show (Column,
            Row, etc.). Hide Grid: Go to the "View" menu at the top. Hover over
            "Layout Grids". Click on the type of grid that is currently selected
            to toggle it off. Remember that keyboard shortcuts can change with
            software updates, so it's a good idea to check Figma's official
            documentation or the software's settings to see if there have been
            any changes or if you can customize shortcuts based on your
            preferences. As of my last knowledge update in September 2021,
            Figma's keyboard shortcuts can change with updates to the software.
            However, as of that time, there wasn't a default keyboard shortcut
            to specifically show or hide the grid in Figma. To manipulate the
            grid visibility, you might need to use the menus or manually set the
            grid properties in the right sidebar. Here's how you can do it
            without a keyboard shortcut:
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleBlogPage;
