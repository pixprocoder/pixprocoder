import { getBaseURL } from './../../../utils/index';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const PostApiSlice = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: getBaseURL() }),
  tagTypes: ['Comment', 'Like', 'Post'],
  endpoints: (builder) => ({
    // Get all posts
    getPosts: builder.query({
      query: () => '/posts',
      transformResponse: (response: any) => {
        return response.data;
      },
      providesTags: ['Post'],
    }),

    // Get single post by ID or slug
    getSinglePost: builder.query({
      query: (id) => `/posts/${id}`,
    }),

    // Get post by slug specifically
    getPostBySlug: builder.query({
      query: (slug) => `/posts/slug/${slug}`,
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
      invalidatesTags: ['Post'],
    }),

    // Like endpoints
    togglePostLike: builder.mutation({
      query: ({ postId, data }) => ({
        url: `/posts/like/${postId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Like'],
    }),

    getPostLikes: builder.query({
      query: ({ postId, userId }) => {
        const params = userId ? `?userId=${userId}` : '';
        return `/posts/like/${postId}${params}`;
      },
      providesTags: ['Like'],
    }),

    // Comment endpoints
    postComment: builder.mutation({
      query: ({ postId, data }) => ({
        url: `/posts/${postId}/comments`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Comment'],
    }),

    getComments: builder.query({
      query: ({ postId, sort = 'desc', page = 1, limit = 10 }) =>
        `/posts/${postId}/comments?sort=${sort}&page=${page}&limit=${limit}`,
      providesTags: ['Comment'],
    }),

    updateComment: builder.mutation({
      query: ({ commentId, data }) => ({
        url: `/comments/${commentId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Comment'],
    }),

    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/comments/${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetSinglePostQuery,
  useGetPostBySlugQuery,
  useGetCommentsQuery,
  usePostCommentMutation,
  useTogglePostLikeMutation,
  useGetPostLikesQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useCreatePostMutation,
} = PostApiSlice;
