import { getBaseURL } from './../../../utils/index';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const PostApiSlice = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: getBaseURL() }),
  tagTypes: ['comment', 'postLike', 'post'],
  endpoints: (builder) => ({
    // get posts
    getPosts: builder.query({
      query: () => '/posts',
      transformResponse: (response: any) => {
        return response.data;
      },
      providesTags: ['post'],
    }),
    getSinglePost: builder.query({
      query: (id) => `/posts/${id}`,
    }),

    // Create Post
    createPost: builder.mutation({
      query(body) {
        return {
          url: `/posts/create-post`,
          method: 'POST',
          body,
        };
      },
    }),

    // PostLike endpoint
    postLike: builder.mutation({
      query: ({ id, data }) => ({
        url: `/posts/like/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['postLike'],
    }),
    getPostLike: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: ['postLike'],
    }),

    //  Comments
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/posts/comment/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comment'],
    }),
    getComment: builder.query({
      query: ({ id, sort }) => `/posts/comment/${id}?sort=${sort}`,
      providesTags: ['comment'],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetSinglePostQuery,
  useGetCommentQuery,
  usePostCommentMutation,
  usePostLikeMutation,
  useGetPostLikeQuery,
  useCreatePostMutation,
} = PostApiSlice;
