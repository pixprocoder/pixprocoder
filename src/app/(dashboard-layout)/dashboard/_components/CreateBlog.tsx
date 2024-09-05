"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { useState } from "react";
import { useForm } from "react-hook-form";

function CreateBlog() {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValueError, setSelectedValueError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: (postData) => {
      return axios.post(
        "http://localhost:3003/api/v1/posts/create-post",
        postData,
        {
          headers: {
            "Content-Type": "application/json", // Ensure content type is JSON
          },
        }
      );
    },
    onSuccess: (res) => {
      console.log("Post created successfully!", res.data);
      reset();
    },
    onError: (error) => {
      console.error("Error creating post:", error);
    },
  });

  const onSubmit = (data: any) => {
    if (!selectedValue) {
      setSelectedValueError("This field is required");
      return;
    } else {
      setSelectedValueError("");
    }

    // converting str to boolean

    const isPublished = (str: string) => {
      if (str.toLowerCase() === "true") return true;
      else if (str.toLowerCase() === "false") return false;
      return null; // Or handle invalid input as needed
    };
    const postData: any = {
      title: data?.title,
      content: data?.content,
      image: data?.imageURL,
      published: isPublished(selectedValue),
      // Assume `published` is a form field or custom value
    };

    // Call the mutation to send data to the backend
    mutation.mutate(postData);
  };

  return (
    <div>
      <h1 className="text-center text-blue-500 text-xl my-3">Wite Blog here</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Input
              {...register("title", { required: true })}
              aria-invalid={errors.title ? "true" : "false"}
              type="text"
              className="text-black"
              placeholder="Title"
            />
            {errors.title && (
              <p className="text-xs text-red-500" role="alert">
                This Field is required
              </p>
            )}
          </div>

          <div>
            <Textarea
              {...register("content", { required: true })}
              aria-invalid={errors.content ? "true" : "false"}
              className="text-black"
              placeholder="Content"
            />
            {errors.content && (
              <p className="text-xs text-red-500" role="alert">
                This Field is required
              </p>
            )}
          </div>
          <div>
            {" "}
            <Input
              {...register("imageURL", { required: true })}
              className="text-black"
              aria-invalid={errors.imageURL ? "true" : "false"}
              placeholder="ImageURL"
            />
            {errors.imageURL && (
              <p className="text-xs text-red-500" role="alert">
                This Field is required
              </p>
            )}
          </div>
          <div>
            <Select onValueChange={(value) => setSelectedValue(value)}>
              <SelectTrigger className="w-full ">
                <SelectValue placeholder="Published?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="text-white" value="true">
                  True
                </SelectItem>
                <SelectItem className="text-white" value="false">
                  False
                </SelectItem>
              </SelectContent>
            </Select>
            {selectedValueError && (
              <p className="text-red-500 text-xs">{selectedValueError}</p>
            )}
          </div>
        </div>
        <Button className="w-full mt-4" type="submit">
          Post
        </Button>
      </form>
    </div>
  );
}

export default CreateBlog;
