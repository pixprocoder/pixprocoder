import { useForm } from "react-hook-form";
import { getBaseURL } from "@/src/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CommentApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: getBaseURL() }),
  endpoints: (builder) => ({
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/posts/comment/${id}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostCommentMutation } = CommentApiSlice;
