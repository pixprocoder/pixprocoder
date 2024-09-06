import { getBaseURL } from "./../../../utils/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PostApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: getBaseURL() }),
  tagTypes: ["comment"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
    }),
    getSinglePost: builder.query({
      query: (id) => `/posts/${id}`,
    }),

    //  Comments
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/posts/comment/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["comment"],
    }),
    getComment: builder.query({
      query: (id) => `/posts/comment/${id}`,
      providesTags: ["comment"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetSinglePostQuery,
  useGetCommentQuery,
  usePostCommentMutation,
} = PostApiSlice;
